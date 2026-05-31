const fs = require('fs');
const path = require('path');
const port = 9339;
const url = 'http://localhost:3002/';
const captureDir = String.raw`C:\Users\saumi\Downloads\sellers website\dripup-landing\test folder\2026-05-31\frontend-design-review\captures`;
const jsonDir = String.raw`C:\Users\saumi\Downloads\sellers website\dripup-landing\test folder\2026-05-31\frontend-design-review\json`;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function getWsUrl() {
  const res = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  const page = await res.json();
  return page.webSocketDebuggerUrl;
}
async function runViewport(name, width, height, deviceScaleFactor = 1, mobile = false) {
  const wsUrl = await getWsUrl();
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result || {});
    }
  };
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const thisId = ++id;
    pending.set(thisId, { resolve, reject });
    ws.send(JSON.stringify({ id: thisId, method, params }));
  });
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor, mobile });
  await send('Page.navigate', { url });
  await new Promise(resolve => {
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Page.loadEventFired') {
        ws.removeEventListener?.('message', handler);
        resolve();
      }
    };
    ws.addEventListener?.('message', handler);
    setTimeout(resolve, 5000);
  });
  await sleep(2500);

  const metrics = await send('Runtime.evaluate', { expression: `(() => ({
    url: location.href,
    width: innerWidth,
    height: innerHeight,
    scrollHeight: document.documentElement.scrollHeight,
    bodyText: document.body.innerText,
    colors: Array.from(document.querySelectorAll('*')).map(el => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { tag: el.tagName, text: (el.innerText || '').slice(0, 80), color: s.color, backgroundColor: s.backgroundColor, fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    }).filter(x => x.w > 0 && x.h > 0).slice(0, 220)
  }))()`, returnByValue: true });
  fs.writeFileSync(path.join(jsonDir, `${name}_dom_inventory.json`), JSON.stringify(metrics.result.value, null, 2));

  const scrollHeight = metrics.result.value.scrollHeight;
  const positions = [0, Math.round(scrollHeight * 0.28), Math.round(scrollHeight * 0.52), Math.max(0, scrollHeight - height - 2)];
  const labels = ['top', 'hero-lower', 'cards', 'final'];
  for (let i = 0; i < positions.length; i++) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${positions[i]}); undefined` });
    await sleep(1200);
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
    fs.writeFileSync(path.join(captureDir, `${name}_${labels[i]}.png`), Buffer.from(shot.data, 'base64'));
  }
  ws.close();
}
await runViewport('desktop_1440x900', 1440, 900, 1, false);
await runViewport('mobile_390x844', 390, 844, 2, true);
console.log('captures complete');
