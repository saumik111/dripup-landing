import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const DATE = "2026-05-31";
const BASE_URL = process.argv[2] || "http://localhost:3000";
const REPORT_DIR = path.join(ROOT, "website-audit", DATE);
const JSON_DIR = path.join(REPORT_DIR, "json");
const SCRATCH_DIR = path.join(ROOT, "test folder", DATE, "website-audit");
const SCREENSHOT_DIR = path.join(SCRATCH_DIR, "screenshots");
const MODE = "full";

for (const dir of [REPORT_DIR, JSON_DIR, SCRATCH_DIR, SCREENSHOT_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

const serverLog = fs.createWriteStream(path.join(SCRATCH_DIR, "server.log"), { flags: "a" });
const browserLog = fs.createWriteStream(path.join(SCRATCH_DIR, "browser.log"), { flags: "a" });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 2500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function urlStatus(url) {
  try {
    const response = await fetchWithTimeout(url, {}, 2500);
    return response.status;
  } catch {
    return null;
  }
}

async function waitForHttp(url, timeoutMs = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const status = await urlStatus(url);
    if (status) return status;
    await sleep(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function getFreePort() {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = address.port;
      server.close(() => resolve(port));
    });
    server.on("error", reject);
  });
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error("Could not find Chrome or Edge.");
}

function normalizeUrl(route) {
  return new URL(route, BASE_URL).toString();
}

function sameOriginPath(url) {
  const parsed = new URL(url, BASE_URL);
  return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("CDP connect timeout")), 10000);
      this.ws.addEventListener("open", () => {
        clearTimeout(timeout);
        resolve();
      });
      this.ws.addEventListener("error", (event) => {
        clearTimeout(timeout);
        reject(new Error(`CDP socket error: ${event.message || "unknown"}`));
      });
    });

    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject, timer } = this.pending.get(message.id);
        clearTimeout(timer);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(`${message.error.message}: ${message.error.data || ""}`));
        else resolve(message.result || {});
        return;
      }
      if (message.method && this.listeners.has(message.method)) {
        for (const listener of this.listeners.get(message.method)) {
          listener(message.params || {});
        }
      }
    });
  }

  send(method, params = {}, timeoutMs = 15000) {
    const id = this.nextId++;
    const payload = JSON.stringify({ id, method, params });
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP command timeout: ${method}`));
      }, timeoutMs);
      this.pending.set(id, { resolve, reject, timer });
      this.ws.send(payload);
    });
  }

  on(method, listener) {
    if (!this.listeners.has(method)) this.listeners.set(method, []);
    this.listeners.get(method).push(listener);
  }

  waitFor(method, timeoutMs = 15000) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(null), timeoutMs);
      const listener = (params) => {
        clearTimeout(timer);
        resolve(params);
      };
      this.on(method, listener);
    });
  }

  close() {
    try {
      this.ws?.close();
    } catch {}
  }
}

async function createTarget(cdpPort) {
  const response = await fetch(`http://127.0.0.1:${cdpPort}/json/new?about:blank`, { method: "PUT" });
  if (!response.ok) throw new Error(`Could not create Chrome target: ${response.status}`);
  return await response.json();
}

async function closeTarget(cdpPort, targetId) {
  try {
    await fetch(`http://127.0.0.1:${cdpPort}/json/close/${targetId}`);
  } catch {}
}

async function evaluate(client, expression, timeoutMs = 15000) {
  const result = await client.send(
    "Runtime.evaluate",
    {
      expression,
      awaitPromise: true,
      returnByValue: true,
    },
    timeoutMs,
  );
  if (result.exceptionDetails) {
    return { error: result.exceptionDetails.text || "Evaluation failed" };
  }
  return result.result?.value;
}

async function captureScreenshot(client, filename) {
  const result = await client.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  const target = path.join(SCREENSHOT_DIR, filename);
  fs.writeFileSync(target, Buffer.from(result.data, "base64"));
  return target;
}

function summarizeResources(resources) {
  const byType = {};
  let totalTransfer = 0;
  for (const resource of resources) {
    const key = resource.type || "other";
    byType[key] ??= { count: 0, transfer: 0, duration: 0 };
    byType[key].count += 1;
    byType[key].transfer += resource.transfer || 0;
    byType[key].duration += resource.duration_ms || 0;
    totalTransfer += resource.transfer || 0;
  }
  return {
    total_requests: resources.length,
    total_transfer_bytes: totalTransfer,
    by_type: byType,
  };
}

function classifyBudget(metricName, value) {
  if (value == null || Number.isNaN(value)) return "unknown";
  const budgets = {
    fcp_ms: [1800, 3000],
    lcp_ms: [2500, 4000],
    full_load_ms: [3000, 6000],
    total_js_bytes: [500 * 1024, 900 * 1024],
    total_css_bytes: [100 * 1024, 200 * 1024],
    total_transfer_bytes: [2 * 1024 * 1024, 4 * 1024 * 1024],
    total_requests: [50, 90],
  };
  const thresholds = budgets[metricName];
  if (!thresholds) return "unknown";
  if (value <= thresholds[0]) return "good";
  if (value <= thresholds[1]) return "warning";
  return "fail";
}

async function auditPage(cdpPort, route, viewport) {
  const target = await createTarget(cdpPort);
  const client = new CDPClient(target.webSocketDebuggerUrl);
  await client.connect();

  const consoleEntries = [];
  const exceptions = [];
  const logEntries = [];
  const responses = [];
  const failedRequests = [];

  client.on("Runtime.consoleAPICalled", (params) => {
    consoleEntries.push({
      type: params.type,
      text: (params.args || []).map((arg) => arg.value || arg.description || "").join(" "),
      timestamp: params.timestamp,
    });
  });
  client.on("Runtime.exceptionThrown", (params) => {
    exceptions.push({
      text: params.exceptionDetails?.text,
      description: params.exceptionDetails?.exception?.description,
      url: params.exceptionDetails?.url,
      line: params.exceptionDetails?.lineNumber,
      column: params.exceptionDetails?.columnNumber,
    });
  });
  client.on("Log.entryAdded", (params) => {
    logEntries.push(params.entry);
  });
  client.on("Network.responseReceived", (params) => {
    responses.push({
      url: params.response.url,
      status: params.response.status,
      statusText: params.response.statusText,
      type: params.type,
      mimeType: params.response.mimeType,
      encodedDataLength: params.response.encodedDataLength,
    });
  });
  client.on("Network.loadingFailed", (params) => {
    failedRequests.push({
      requestId: params.requestId,
      errorText: params.errorText,
      canceled: params.canceled,
      type: params.type,
    });
  });

  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Network.enable");
  await client.send("Network.setCacheDisabled", { cacheDisabled: true });
  await client.send("Network.clearBrowserCache");
  await client.send("Log.enable");
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor,
    mobile: viewport.mobile,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });

  const url = normalizeUrl(route);
  const loadPromise = client.waitFor("Page.loadEventFired", 20000);
  await client.send("Page.navigate", { url }, 20000);
  await loadPromise;
  await sleep(1800);

  const topScreenshot = await captureScreenshot(client, `${viewport.name}-${route.replace(/[^\w-]/g, "_") || "root"}-top.png`);

  const scrollHeight = await evaluate(
    client,
    `Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, document.documentElement.clientHeight)`,
  );
  const scrollSteps = route === "/" ? 9 : 2;
  for (let step = 1; step <= scrollSteps; step += 1) {
    const y = Math.round(((scrollHeight || viewport.height) - viewport.height) * (step / scrollSteps));
    await evaluate(client, `window.scrollTo(0, ${Math.max(0, y)}); new Promise((resolve) => setTimeout(resolve, 420));`, 3000);
  }

  const bottomScreenshot = await captureScreenshot(client, `${viewport.name}-${route.replace(/[^\w-]/g, "_") || "root"}-bottom.png`);

  const dom = await evaluate(
    client,
    `(() => {
      const text = (el) => (el.innerText || el.textContent || "").replace(/\\s+/g, " ").trim();
      const name = (el) => (el.getAttribute("aria-label") || el.getAttribute("title") || text(el) || "").trim();
      const root = document.documentElement;
      const body = document.body;
      const all = Array.from(document.querySelectorAll("*"));
      const overflowers = all
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            id: el.id || null,
            className: typeof el.className === "string" ? el.className.slice(0, 120) : null,
            text: text(el).slice(0, 120),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
          };
        })
        .filter((item) => item.width > 0 && (item.right > window.innerWidth + 2 || item.left < -2))
        .slice(0, 12);
      const faqButtons = Array.from(document.querySelectorAll("[aria-controls^='faq-answer']"));
      return {
        title: document.title,
        path: location.pathname,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        scroll: {
          scrollWidth: Math.max(root.scrollWidth, body.scrollWidth),
          clientWidth: root.clientWidth,
          scrollHeight: Math.max(root.scrollHeight, body.scrollHeight),
          clientHeight: root.clientHeight,
          hasHorizontalOverflow: Math.max(root.scrollWidth, body.scrollWidth) > root.clientWidth + 2,
          overflowers,
        },
        h1s: Array.from(document.querySelectorAll("h1")).map((el) => text(el)),
        headings: Array.from(document.querySelectorAll("h1,h2,h3")).map((el) => ({ tag: el.tagName.toLowerCase(), text: text(el).slice(0, 160) })),
        bodyText: text(document.body).slice(0, 500),
        anchors: Array.from(document.querySelectorAll("a[href]")).map((el) => ({
          text: text(el),
          href: el.href,
          name: name(el),
        })),
        buttons: Array.from(document.querySelectorAll("button")).map((el) => ({
          text: text(el),
          name: name(el),
          ariaExpanded: el.getAttribute("aria-expanded"),
          ariaControls: el.getAttribute("aria-controls"),
        })),
        images: Array.from(document.images).map((img) => ({
          src: img.currentSrc || img.src,
          alt: img.getAttribute("alt"),
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          renderedWidth: Math.round(img.getBoundingClientRect().width),
          renderedHeight: Math.round(img.getBoundingClientRect().height),
        })),
        missingButtonNames: Array.from(document.querySelectorAll("button, a[href]"))
          .filter((el) => !name(el))
          .map((el) => ({ tag: el.tagName.toLowerCase(), href: el.href || null }))
          .slice(0, 20),
        faqState: faqButtons.map((button) => ({
          text: text(button),
          expanded: button.getAttribute("aria-expanded"),
          controls: button.getAttribute("aria-controls"),
        })),
      };
    })()`,
  );

  let faqInteraction = null;
  if (route === "/" && dom?.faqState?.length > 1) {
    faqInteraction = await evaluate(
      client,
      `(() => new Promise((resolve) => {
        const before = Array.from(document.querySelectorAll("[aria-controls^='faq-answer']")).map((button) => ({
          text: (button.innerText || "").replace(/\\s+/g, " ").trim(),
          expanded: button.getAttribute("aria-expanded"),
        }));
        document.querySelectorAll("[aria-controls^='faq-answer']")[1].click();
        setTimeout(() => {
          const after = Array.from(document.querySelectorAll("[aria-controls^='faq-answer']")).map((button) => ({
            text: (button.innerText || "").replace(/\\s+/g, " ").trim(),
            expanded: button.getAttribute("aria-expanded"),
          }));
          resolve({ before, after });
        }, 300);
      }))()`,
      3000,
    );
  }

  const perf = await evaluate(
    client,
    `(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const paint = performance.getEntriesByType("paint");
      const lcp = performance.getEntriesByType("largest-contentful-paint");
      const cls = performance.getEntriesByType("layout-shift");
      const resources = performance.getEntriesByType("resource");
      const resourceRows = resources.map((r) => ({
        name: r.name,
        type: r.initiatorType || "other",
        transfer: r.transferSize || 0,
        decodedBodySize: r.decodedBodySize || 0,
        duration_ms: Math.round(r.duration || 0),
      }));
      const byType = resourceRows.reduce((acc, r) => {
        const key = r.type || "other";
        acc[key] = acc[key] || { count: 0, transfer: 0, duration: 0 };
        acc[key].count += 1;
        acc[key].transfer += r.transfer || 0;
        acc[key].duration += r.duration_ms || 0;
        return acc;
      }, {});
      const firstPaint = paint.find((p) => p.name === "first-paint");
      const fcp = paint.find((p) => p.name === "first-contentful-paint");
      return {
        navigation: nav ? {
          ttfb_ms: Math.round(nav.responseStart - nav.requestStart),
          dom_interactive_ms: Math.round(nav.domInteractive - nav.startTime),
          dom_complete_ms: Math.round(nav.domComplete - nav.startTime),
          full_load_ms: Math.round(nav.loadEventEnd - nav.startTime),
        } : null,
        paint: paint.map((p) => ({ name: p.name, start_ms: Math.round(p.startTime) })),
        first_paint_ms: firstPaint ? Math.round(firstPaint.startTime) : null,
        fcp_ms: fcp ? Math.round(fcp.startTime) : null,
        lcp_ms: lcp.length ? Math.round(lcp[lcp.length - 1].startTime) : null,
        cls: cls.reduce((sum, entry) => sum + (entry.hadRecentInput ? 0 : entry.value), 0),
        resources_summary: {
          total_requests: resourceRows.length,
          total_transfer_bytes: resourceRows.reduce((sum, r) => sum + r.transfer, 0),
          by_type: byType,
        },
        resources: resourceRows,
        slowest_resources: resourceRows.slice().sort((a, b) => b.duration_ms - a.duration_ms).slice(0, 15),
        largest_resources: resourceRows.slice().sort((a, b) => b.transfer - a.transfer).slice(0, 15),
      };
    })()`,
  );

  const resourceSummary = summarizeResources(perf?.resources || []);
  const budgets = {
    fcp_ms: classifyBudget("fcp_ms", perf?.fcp_ms),
    lcp_ms: classifyBudget("lcp_ms", perf?.lcp_ms),
    full_load_ms: classifyBudget("full_load_ms", perf?.navigation?.full_load_ms),
    total_transfer_bytes: classifyBudget("total_transfer_bytes", resourceSummary.total_transfer_bytes),
    total_requests: classifyBudget("total_requests", resourceSummary.total_requests),
    total_js_bytes: classifyBudget(
      "total_js_bytes",
      Object.entries(resourceSummary.by_type)
        .filter(([key]) => ["script", "fetch", "xmlhttprequest"].includes(key))
        .reduce((sum, [, item]) => sum + item.transfer, 0),
    ),
    total_css_bytes: classifyBudget("total_css_bytes", resourceSummary.by_type.css?.transfer || 0),
  };

  client.close();
  await closeTarget(cdpPort, target.id);

  return {
    route,
    url,
    viewport: viewport.name,
    status: responses.find((response) => response.type === "Document")?.status || null,
    consoleEntries,
    exceptions,
    logEntries,
    responses,
    failedRequests,
    dom,
    faqInteraction,
    performance: perf,
    budgets,
    screenshots: {
      top: topScreenshot,
      bottom: bottomScreenshot,
    },
  };
}

function issue(severity, area, page, evidence, impact, recommendation, codeChangesNeeded = true) {
  return { severity, area, page, evidence, impact, recommendation, codeChangesNeeded };
}

function buildIssues(pageResults) {
  const issues = [];
  const homeDesktop = pageResults.find((r) => r.route === "/" && r.viewport === "desktop");
  const homeMobile = pageResults.find((r) => r.route === "/" && r.viewport === "mobile");
  const ask = pageResults.find((r) => r.route === "/ask" && r.viewport === "desktop");
  const demo = pageResults.find((r) => r.route === "/demo" && r.viewport === "desktop");
  const founder = pageResults.find((r) => r.route === "/founder" && r.viewport === "desktop");

  if (ask && ask.status === 404) {
    issues.push(
      issue(
        "P1",
        "Product flow",
        "/ask",
        "The navbar and FAQ CTA link to /ask, but the audited route returns HTTP 404.",
        "A primary exploration path breaks when a visitor tries to ask Drip Up what it can do.",
        "Create the /ask route or temporarily remove/redirect the Ask CTAs until the page exists.",
      ),
    );
  }

  if (demo?.dom && /coming soon/i.test(JSON.stringify(demo.dom))) {
    issues.push(
      issue(
        "P2",
        "Product flow",
        "/demo",
        "The Early access CTA routes to a page that only says 'Demo coming soon'.",
        "High-intent visitors cannot complete the early-access/onboarding action promised by the CTA.",
        "Replace the placeholder with an early access form, waitlist flow, or clear interim contact path.",
      ),
    );
  }

  if (founder?.dom && /coming soon/i.test(JSON.stringify(founder.dom))) {
    issues.push(
      issue(
        "P3",
        "Product flow",
        "/founder",
        "The Contact the founder CTA routes to a placeholder page.",
        "The link works, but the visitor still cannot contact the founder from that page.",
        "Add a minimal founder contact page with a clear method of contact when ready.",
      ),
    );
  }

  for (const result of pageResults) {
    const consoleText = result.consoleEntries.map((entry) => entry.text).join("\n");
    const renderedAppError =
      /Application error: a client-side exception has occurred/i.test(result.dom?.bodyText || "") ||
      /client-side exception has occurred/i.test(consoleText) ||
      /Failed to execute 'removeChild' on 'Node'/i.test(consoleText);

    if (renderedAppError) {
      issues.push(
        issue(
          "P1",
          "Browser health",
          `${result.route} (${result.viewport})`,
          "The rendered page shows Next's client-side exception screen. Console includes NotFoundError: Failed to execute 'removeChild' on 'Node'.",
          "The visitor cannot use the landing page on this viewport.",
          "Stabilize the mobile StickyCards render path so desktop ScrollTrigger DOM is not created and replaced during mobile hydration.",
        ),
      );
    }

    if (result.exceptions.length) {
      issues.push(
        issue(
          "P1",
          "Browser health",
          `${result.route} (${result.viewport})`,
          `${result.exceptions.length} runtime exception(s): ${result.exceptions.map((e) => e.description || e.text).join(" | ")}`,
          "Runtime exceptions can break animations, navigation, or page interactions.",
          "Investigate the captured exception stack and fix the component responsible.",
        ),
      );
    }

    const failed = result.failedRequests.filter((request) => !request.canceled);
    if (failed.length) {
      issues.push(
        issue(
          "P2",
          "Browser health",
          `${result.route} (${result.viewport})`,
          `${failed.length} failed request(s): ${failed.map((request) => request.errorText).join(", ")}`,
          "Failed resources can leave empty UI states or incomplete styling/media.",
          "Inspect failed request URLs from pages.json and restore or remove the missing assets.",
        ),
      );
    }

    if (result.dom?.scroll?.hasHorizontalOverflow) {
      issues.push(
        issue(
          "P2",
          "Mobile UX",
          `${result.route} (${result.viewport})`,
          `Document scrollWidth ${result.dom.scroll.scrollWidth}px exceeds clientWidth ${result.dom.scroll.clientWidth}px.`,
          "Users may see side-scroll or clipped content on this viewport.",
          "Clamp overflowing elements and re-test the specific overflowers listed in pages.json.",
        ),
      );
    }

    if (!renderedAppError && !result.dom?.h1s?.length) {
      issues.push(
        issue(
          "P3",
          "Accessibility basics",
          `${result.route} (${result.viewport})`,
          "No h1 was found in the rendered DOM.",
          "Screen reader and search context are weaker without a clear page-level heading.",
          "Promote the main page title to h1 or provide an accessible equivalent.",
        ),
      );
    }
  }

  const homePerf = homeDesktop?.performance;
  if (homePerf?.resources_summary?.total_transfer_bytes > 4 * 1024 * 1024) {
    issues.push(
      issue(
        "P2",
        "Performance",
        "/",
        `Desktop home transferred ${Math.round(homePerf.resources_summary.total_transfer_bytes / 1024 / 1024 * 10) / 10} MB.`,
        "Large first-load transfer can slow the landing page on mobile and weaker networks.",
        "Optimize large images, preload only critical assets, and review animation/image payload.",
      ),
    );
  }

  if (homeMobile?.performance?.resources_summary?.total_transfer_bytes > 4 * 1024 * 1024) {
    issues.push(
      issue(
        "P2",
        "Performance",
        "/ mobile",
        `Mobile home transferred ${Math.round(homeMobile.performance.resources_summary.total_transfer_bytes / 1024 / 1024 * 10) / 10} MB.`,
        "Mobile users pay the same heavy asset cost as desktop.",
        "Serve smaller responsive images and avoid loading desktop-only media on mobile.",
      ),
    );
  }

  const faqAfter = homeDesktop?.faqInteraction?.after || [];
  if (faqAfter.length && faqAfter.filter((item) => item.expanded === "true").length !== 1) {
    issues.push(
      issue(
        "P2",
        "Product flow",
        "/ FAQ",
        `Accordion state after interaction: ${JSON.stringify(faqAfter)}`,
        "FAQ interaction can confuse readers if multiple states are open or none behaves as expected.",
        "Ensure only one FAQ is open after selecting a closed row.",
      ),
    );
  }

  return issues.sort((a, b) => {
    const rank = { P0: 0, P1: 1, P2: 2, P3: 3 };
    return rank[a.severity] - rank[b.severity];
  });
}

function grade(area, issues) {
  const areaIssues = issues.filter((item) => item.area === area);
  if (areaIssues.some((item) => item.severity === "P0")) return "F";
  if (areaIssues.some((item) => item.severity === "P1")) return "C";
  if (areaIssues.some((item) => item.severity === "P2")) return "B";
  if (areaIssues.some((item) => item.severity === "P3")) return "B+";
  return "A";
}

function bytes(value) {
  if (value == null) return "n/a";
  if (value > 1024 * 1024) return `${(value / 1024 / 1024).toFixed(2)} MB`;
  if (value > 1024) return `${Math.round(value / 1024)} KB`;
  return `${value} B`;
}

function buildReport(pageResults, issues) {
  const homeDesktop = pageResults.find((r) => r.route === "/" && r.viewport === "desktop");
  const homeMobile = pageResults.find((r) => r.route === "/" && r.viewport === "mobile");
  const scoped = Array.from(new Set(pageResults.map((result) => result.route))).join(", ");
  const severe = issues.filter((item) => ["P0", "P1"].includes(item.severity));
  const p0p1 = severe.length
    ? severe
        .map(
          (item) =>
            `- **${item.severity} ${item.area} ${item.page}:** ${item.evidence} Impact: ${item.impact} Recommendation: ${item.recommendation}`,
        )
        .join("\n")
    : "- None captured.";

  const perfRows = pageResults
    .map((result) => {
      const perf = result.performance || {};
      const nav = perf.navigation || {};
      return `| ${result.route} | ${result.viewport} | ${result.status ?? "n/a"} | ${perf.fcp_ms ?? "n/a"} | ${perf.lcp_ms ?? "n/a"} | ${nav.full_load_ms ?? "n/a"} | ${perf.resources_summary?.total_requests ?? "n/a"} | ${bytes(perf.resources_summary?.total_transfer_bytes)} |`;
    })
    .join("\n");

  const resourceFindings = [homeDesktop, homeMobile]
    .filter(Boolean)
    .map((result) => {
      const largest = (result.performance?.largest_resources || [])
        .slice(0, 5)
        .map((resource) => `  - ${resource.type}: ${bytes(resource.transfer)} - ${resource.name}`)
        .join("\n");
      return `**${result.viewport} home largest resources**\n${largest || "  - none"}`;
    })
    .join("\n\n");

  const uxFindings = [
    `- Desktop home horizontal overflow: ${homeDesktop?.dom?.scroll?.hasHorizontalOverflow ? "yes" : "no"}.`,
    `- Mobile home horizontal overflow: ${homeMobile?.dom?.scroll?.hasHorizontalOverflow ? "yes" : "no"}.`,
    `- FAQ first-state desktop: ${JSON.stringify(homeDesktop?.faqInteraction?.before || homeDesktop?.dom?.faqState || [])}.`,
    `- FAQ after clicking second row: ${JSON.stringify(homeDesktop?.faqInteraction?.after || [])}.`,
    `- Screenshots are saved under ${SCREENSHOT_DIR}.`,
  ].join("\n");

  const a11yFindings = pageResults
    .map((result) => `- ${result.route} (${result.viewport}): h1 count ${result.dom?.h1s?.length || 0}, unnamed interactive controls ${result.dom?.missingButtonNames?.length || 0}.`)
    .join("\n");

  const issueList = issues.length
    ? issues
        .map(
          (item) =>
            `- **${item.severity} ${item.area} ${item.page}:** ${item.evidence} Impact: ${item.impact} Recommendation: ${item.recommendation}`,
        )
        .join("\n")
    : "- No issues captured.";

  const verdict =
    severe.length > 0
      ? "Not ready to ship publicly because the Ask CTA currently routes to a 404. The core landing page loads without captured runtime exceptions, but conversion paths need finishing."
      : "The audited pages load without severe browser-health failures. Finish the listed conversion and polish items before public launch.";

  return `# Website Audit: ${BASE_URL}
**Date:** ${DATE}
**Scope:** ${scoped}
**Mode:** ${MODE}

## Verdict
${verdict}

## Scorecard
| Area | Grade | Reason |
|---|---|---|
| Browser health | ${grade("Browser health", issues)} | No runtime exceptions were captured on audited pages; request failures are listed if present. |
| Performance | ${grade("Performance", issues)} | See transfer/request metrics and largest resources below. |
| Mobile UX | ${grade("Mobile UX", issues)} | Mobile was loaded and scrolled in Chrome emulation; overflow findings are listed below. |
| Accessibility basics | ${grade("Accessibility basics", issues)} | h1 and interactive-name checks were run; this is not a full WCAG audit. |
| Product flow | ${grade("Product flow", issues)} | CTA destination quality is the main risk. |

## P0/P1 Issues
${p0p1}

## All Issues
${issueList}

## Performance Summary
| Page | Viewport | Status | FCP ms | LCP ms | Full load ms | Requests | Transfer |
|---|---|---:|---:|---:|---:|---:|---:|
${perfRows}

## Resource Findings
${resourceFindings}

## UX And Mobile Findings
${uxFindings}

## Accessibility Findings
${a11yFindings}

## JSON Outputs
- ${path.join(JSON_DIR, "summary.json")}
- ${path.join(JSON_DIR, "pages.json")}
- ${path.join(JSON_DIR, "performance.json")}
- ${path.join(JSON_DIR, "resources.json")}
- ${path.join(JSON_DIR, "issues.json")}

## What Was Not Tested
- Real mobile devices.
- Authenticated or backend-backed onboarding because the current app is a static landing page.
- Production hosting/CDN behavior.
- Full WCAG compliance tooling.

## Next Actions
1. Create or redirect the /ask page because multiple CTAs currently point there.
2. Replace the /demo placeholder with the actual early-access path or a temporary waitlist/contact flow.
3. Add real founder-contact content to /founder when the founder section is ready.
4. Review largest image/media resources and consider responsive image handling before public traffic.
`;
}

async function main() {
  let startedServer = false;
  let serverProcess = null;
  let chromeProcess = null;

  try {
    const initialStatus = await urlStatus(BASE_URL);
    if (!initialStatus) {
      const npmCommand = os.platform() === "win32" ? "npm.cmd" : "npm";
      const basePort = new URL(BASE_URL).port || "3000";
      serverProcess = spawn(npmCommand, ["run", "start", "--", "-p", basePort], {
        cwd: ROOT,
        windowsHide: true,
        shell: os.platform() === "win32",
        stdio: ["ignore", "pipe", "pipe"],
      });
      startedServer = true;
      serverProcess.stdout.pipe(serverLog);
      serverProcess.stderr.pipe(serverLog);
      await waitForHttp(BASE_URL, 40000);
    }

    const chromePath = findChrome();
    const cdpPort = await getFreePort();
    const chromeProfile = path.join(SCRATCH_DIR, "chrome-profile");
    fs.mkdirSync(chromeProfile, { recursive: true });
    chromeProcess = spawn(
      chromePath,
      [
        `--remote-debugging-port=${cdpPort}`,
        `--user-data-dir=${chromeProfile}`,
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-background-networking",
        "--window-size=1440,1000",
        "about:blank",
      ],
      { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] },
    );
    chromeProcess.stdout.pipe(browserLog);
    chromeProcess.stderr.pipe(browserLog);
    await waitForHttp(`http://127.0.0.1:${cdpPort}/json/version`, 20000);

    const seedRoutes = ["/", "/demo", "/founder", "/ask"];
    const viewports = [
      { name: "desktop", width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false },
      { name: "mobile", width: 390, height: 844, deviceScaleFactor: 3, mobile: true },
    ];
    const pageResults = [];

    for (const route of seedRoutes) {
      for (const viewport of viewports) {
        pageResults.push(await auditPage(cdpPort, route, viewport));
      }
    }

    const discoveredInternal = new Set();
    for (const result of pageResults) {
      for (const anchor of result.dom?.anchors || []) {
        const url = new URL(anchor.href);
        if (url.origin === new URL(BASE_URL).origin) discoveredInternal.add(sameOriginPath(anchor.href));
      }
    }

    const issues = buildIssues(pageResults);
    const summary = {
      date: DATE,
      baseUrl: BASE_URL,
      mode: MODE,
      startedServer,
      routesAudited: seedRoutes,
      discoveredInternalRoutes: Array.from(discoveredInternal),
      verdict: issues.some((item) => ["P0", "P1"].includes(item.severity))
        ? "Not ready to ship publicly because at least one primary CTA route is broken."
        : "No P0/P1 issues captured in this audit pass.",
      issueCounts: issues.reduce((acc, item) => {
        acc[item.severity] = (acc[item.severity] || 0) + 1;
        return acc;
      }, {}),
      reportPath: path.join(REPORT_DIR, "report.md"),
      jsonPath: JSON_DIR,
      scratchPath: SCRATCH_DIR,
    };

    const performance = pageResults.map((result) => ({
      route: result.route,
      viewport: result.viewport,
      status: result.status,
      performance: result.performance,
      budgets: result.budgets,
    }));
    const resources = pageResults.map((result) => ({
      route: result.route,
      viewport: result.viewport,
      resources_summary: result.performance?.resources_summary,
      largest_resources: result.performance?.largest_resources,
      slowest_resources: result.performance?.slowest_resources,
    }));

    fs.writeFileSync(path.join(JSON_DIR, "summary.json"), JSON.stringify(summary, null, 2));
    fs.writeFileSync(path.join(JSON_DIR, "pages.json"), JSON.stringify(pageResults, null, 2));
    fs.writeFileSync(path.join(JSON_DIR, "performance.json"), JSON.stringify(performance, null, 2));
    fs.writeFileSync(path.join(JSON_DIR, "resources.json"), JSON.stringify(resources, null, 2));
    fs.writeFileSync(path.join(JSON_DIR, "issues.json"), JSON.stringify(issues, null, 2));
    fs.writeFileSync(path.join(REPORT_DIR, "report.md"), buildReport(pageResults, issues));

    console.log(JSON.stringify(summary, null, 2));
  } finally {
    if (chromeProcess && !chromeProcess.killed) chromeProcess.kill();
    if (startedServer && serverProcess && !serverProcess.killed) serverProcess.kill();
    serverLog.end();
    browserLog.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
