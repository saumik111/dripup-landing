import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FONT_HEADING = '"EB Garamond", Georgia, serif';
const FONT_BODY = '"Inter", sans-serif';
const INK = "#111318";
const INK_SOFT = "#252832";
const SURFACE = "#FFFFFF";
const SURFACE_SOFT = "#F8FAFF";
const SURFACE_TEXT = "#F7F9FF";
const TEXT_SECONDARY = "#4F5B6B";
const OUTLINE = "rgba(214,224,242,0.78)";
const ACCENT = "#536B9B";

const CARDS = [
  {
    bg: "#D8E2FF",
    text: INK,
    muted: INK,
    heading: "Create",
    subline: "studio-free product photoshoots",
    ui: "photoshoots",
    zIndex: 5,
  },
  {
    bg: "#BDF0DC",
    text: INK,
    muted: INK,
    heading: "Expand your reach",
    subline: "SEO & GEO optimized listings",
    ui: "listings",
    zIndex: 4,
  },
  {
    bg: "#FFE066",
    text: INK,
    muted: INK,
    heading: "Control the chaos",
    subline: "everything that matters, right in front of you",
    ui: "insights",
    zIndex: 3,
  },
  {
    bg: "#FFB090",
    text: INK,
    muted: INK,
    heading: "Grow with confidence",
    subline: "know exactly how your brand is performing",
    ui: "analytics",
    zIndex: 2,
  },
  {
    bg: "#111318",
    text: SURFACE_TEXT,
    muted: "#D8DEEA",
    heading: "Watch it in action",
    subline: "see exactly what drip up can do for your store",
    ui: "analytics",
    zIndex: 1,
  },
];

function PhotoshootsUI() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", gap: 10, flex: 1 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, background: "rgba(83,107,155,0.10)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "50%", height: "50%", background: "rgba(83,107,155,0.16)", borderRadius: 6 }} />
          </div>
        ))}
      </div>
      <div style={{ background: INK, borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: SURFACE_TEXT, fontWeight: 500 }}>Ready to publish</span>
        <div style={{ background: SURFACE_TEXT, borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: INK, fontFamily: FONT_BODY }}>Publish</div>
      </div>
    </div>
  );
}

function ListingsUI() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", height: "100%", justifyContent: "center" }}>
      {["Product title optimised for search", "SEO-ready description written", "Tags & keywords generated"].map((line, i) => (
        <div key={i} style={{ background: "rgba(83,107,155,0.10)", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 18, height: 18, borderRadius: 99, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2.5" stroke={SURFACE_TEXT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: INK, fontWeight: 500 }}>{line}</span>
        </div>
      ))}
      <div style={{ background: INK, borderRadius: 8, padding: "10px", textAlign: "center", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 500, color: SURFACE_TEXT, marginTop: 4 }}>Push to Shopify</div>
    </div>
  );
}

function InsightsUI() {
  const alerts = [
    { dot: "#E8673A", text: "3 products missing photos" },
    { dot: "#D4A843", text: "Low stock: Cotton Kurta (2 left)" },
    { dot: ACCENT, text: "Best seller: Block Print Saree" },
    { dot: "#667386", text: "12 orders pending fulfillment" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", height: "100%", justifyContent: "center" }}>
      {alerts.map((a) => (
        <div key={a.text} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.68)", borderRadius: 8, padding: "10px 14px", border: `1px solid ${OUTLINE}` }}>
          <div style={{ width: 8, height: 8, borderRadius: 99, background: a.dot, flexShrink: 0 }} />
          <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: INK, flex: 1, fontWeight: 500 }}>{a.text}</span>
          <div style={{ padding: "3px 10px", borderRadius: 99, border: `1px solid ${OUTLINE}`, fontSize: 11, fontWeight: 600, color: INK, fontFamily: FONT_BODY }}>Fix</div>
        </div>
      ))}
    </div>
  );
}

function AnalyticsUI() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center" }}>
      <div style={{ display: "flex", borderBottom: `1px solid ${OUTLINE}`, marginBottom: 8 }}>
        {["Summary", "Insights", "Artifacts"].map((tab, i) => (
          <div key={tab} style={{ padding: "8px 14px", fontFamily: FONT_BODY, fontSize: 12, fontWeight: i === 2 ? 600 : 500, color: i === 2 ? INK : "#667386", borderBottom: i === 2 ? `2px solid ${INK}` : "2px solid transparent" }}>{tab}</div>
        ))}
      </div>
      {[
        { label: "Brand Audit Report", date: "May 2025" },
        { label: "Competitor & Trend Scan", date: "May 2025" },
        { label: "New Meta Ads Strategy", date: "Apr 2025" },
      ].map((r) => (
        <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${OUTLINE}` }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: INK, fontWeight: 500 }}>{r.label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: "#667386", fontWeight: 500 }}>{r.date}</span>
            <div style={{ padding: "3px 10px", borderRadius: 99, border: `1px solid ${OUTLINE}`, fontSize: 11, color: INK, fontFamily: FONT_BODY, fontWeight: 600 }}>↓</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const UI_MAP = { photoshoots: <PhotoshootsUI />, listings: <ListingsUI />, insights: <InsightsUI />, analytics: <AnalyticsUI /> };

// Mobile-specific stack animation — pinned section, scroll-driven card stack, mirrors desktop behaviour
function MobileStack() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const lastCardRef = useRef(null);
  const lastCardImageRef = useRef(null);
  const ctaHeadingWordsRef = useRef([]);
  const ctaPanelRef = useRef(null);
  const ctaButtonRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current;
    if (!section || !cards.length) return;

    const totalCards = cards.length;
    const segmentSize = 1 / totalCards;
    const cardYOffset = 3;
    const cardScaleStep = 0.05;
    const stackDist = window.innerHeight * 2.2;
    const expandDist = window.innerHeight * 0.5;
    const totalDist = stackDist + expandDist;

    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * cardYOffset,
        scale: 1 - i * cardScaleStep,
      });
    });

    if (lastCardImageRef.current) {
      gsap.set(lastCardImageRef.current, { scale: 1.15 });
    }

    let wasFullyExpanded = false;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${totalDist}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const totalProgress = self.progress;
        const stackFraction = stackDist / totalDist;
        const stackProgress = Math.min(totalProgress / stackFraction, 1);
        const expandProgress = Math.max(0, (totalProgress - stackFraction) / (1 - stackFraction));

        const isFullyExpanded = expandProgress >= 0.98;
        if (isFullyExpanded && !wasFullyExpanded) {
          window.dispatchEvent(new CustomEvent("cardExpanded"));
          wasFullyExpanded = true;
        } else if (!isFullyExpanded && wasFullyExpanded) {
          window.dispatchEvent(new CustomEvent("cardCollapsed"));
          wasFullyExpanded = false;
        }

        const activeIndex = Math.min(Math.floor(stackProgress / segmentSize), totalCards - 1);
        const segProgress = (stackProgress - activeIndex * segmentSize) / segmentSize;
        const lastIndex = totalCards - 1;

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            gsap.set(card, { yPercent: -250, rotationX: 30 });
          } else if (i === activeIndex) {
            if (i === lastIndex) {
              gsap.set(card, { yPercent: -50, rotationX: 0, scale: 1 });
            } else {
              gsap.set(card, {
                yPercent: gsap.utils.interpolate(-50, -200, segProgress),
                rotationX: gsap.utils.interpolate(0, 30, segProgress),
                scale: 1,
              });
            }
          } else {
            const behindIndex = i - activeIndex;
            gsap.set(card, {
              yPercent: -50 + (behindIndex - segProgress) * cardYOffset,
              rotationX: 0,
              scale: 1 - (behindIndex - segProgress) * cardScaleStep,
            });
          }
        });

        if (lastCardRef.current) {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          gsap.set(lastCardRef.current, {
            width: gsap.utils.interpolate(vw * 0.88, vw, expandProgress),
            height: gsap.utils.interpolate(vh * 0.62, vh, expandProgress),
            borderRadius: gsap.utils.interpolate(20, 0, expandProgress),
          });
        }

        if (lastCardImageRef.current) {
          gsap.set(lastCardImageRef.current, {
            scale: gsap.utils.interpolate(1.15, 1, expandProgress),
          });
        }

        const ctaProgress = Math.max(0, Math.min((expandProgress - 0.4) / 0.6, 1));
        const words = ctaHeadingWordsRef.current;
        if (words.length) {
          words.forEach((word, i) => {
            const a = i / words.length;
            const b = (i + 1) / words.length;
            let t = 0;
            if (ctaProgress >= b) t = 1;
            else if (ctaProgress >= a) t = (ctaProgress - a) / (b - a);
            gsap.set(word, { opacity: t, y: gsap.utils.interpolate(32, 0, t) });
          });
        }

        const panelOpacity = Math.max(0, (expandProgress - 0.7) / 0.3);
        if (ctaPanelRef.current) gsap.set(ctaPanelRef.current, { opacity: panelOpacity });
        if (ctaButtonRef.current) gsap.set(ctaButtonRef.current, { opacity: panelOpacity });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "transparent",
        perspective: "800px",
        overflow: "hidden",
      }}
    >
      {CARDS.map((card, i) => (
        <div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
            if (i === CARDS.length - 1) lastCardRef.current = el;
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "88%",
            height: "62%",
            display: "flex",
            flexDirection: "column",
            padding: i === CARDS.length - 1 ? 0 : "22px",
            borderRadius: "20px",
            overflow: i === CARDS.length - 1 ? "hidden" : "visible",
            background: card.bg,
            border: `1px solid ${i === CARDS.length - 1 ? "rgba(17,19,24,0.22)" : OUTLINE}`,
            boxShadow: "0 20px 52px rgba(10,20,60,0.20), 0 4px 14px rgba(10,20,60,0.10)",
            zIndex: card.zIndex,
            transformOrigin: "center bottom",
            willChange: "transform",
          }}
        >
          {i === CARDS.length - 1 ? (
            <img
              ref={lastCardImageRef}
              src="/images/last-card-bg.png"
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <>
              <span style={{ fontFamily: FONT_HEADING, fontStyle: "normal", fontWeight: 500, fontSize: 30, lineHeight: 1.05, color: card.text, display: "block" }}>
                {card.heading}
              </span>
              <span style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 14, lineHeight: 1.5, color: card.muted, display: "block", marginTop: 10 }}>
                {card.subline}
              </span>
              <div style={{ flex: 1, background: SURFACE, borderRadius: 14, overflow: "hidden", padding: 16, display: "flex", flexDirection: "column", marginTop: 16, border: `1px solid ${OUTLINE}`, boxShadow: "0 6px 18px rgba(10,20,60,0.07)" }}>
                {UI_MAP[card.ui]}
              </div>
            </>
          )}
        </div>
      ))}

      {/* CTA overlay */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%",
          zIndex: 20,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "14vh",
        }}
      >
        <div ref={ctaPanelRef} style={{ opacity: 0, pointerEvents: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ background: "rgba(255,255,255,0.76)", border: `1px solid ${OUTLINE}`, borderRadius: 999, padding: "7px 14px", fontFamily: FONT_BODY, fontSize: 12, fontWeight: 400, color: INK, letterSpacing: "0.01em", marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#BDF0DC", display: "inline-block", flexShrink: 0 }} />
            Free for 1 month
          </div>
        </div>

        <div style={{ textAlign: "center", maxWidth: "90vw", padding: "0 20px" }}>
          <span style={{ display: "block" }}>
            {["Tell", "Drip", "Up", "what", "to", "do"].map((word, i) => (
              <span key={`l1-${i}`} ref={(el) => { ctaHeadingWordsRef.current[i] = el; }}
                style={{ display: "inline-block", opacity: 0, fontFamily: FONT_HEADING, fontStyle: "normal", fontWeight: 500, fontSize: "clamp(1.6rem, 7vw, 2.4rem)", lineHeight: 1.15, color: INK, marginRight: "0.22em" }}>
                {word}
              </span>
            ))}
          </span>
          <span style={{ display: "block" }}>
            {["and", "it", "manages", "the", "rest"].map((word, i) => (
              <span key={`l2-${i}`} ref={(el) => { ctaHeadingWordsRef.current[6 + i] = el; }}
                style={{ display: "inline-block", opacity: 0, fontFamily: FONT_HEADING, fontStyle: "normal", fontWeight: 500, fontSize: "clamp(1.6rem, 7vw, 2.4rem)", lineHeight: 1.15, color: INK, marginRight: "0.22em" }}>
                {word}
              </span>
            ))}
          </span>
        </div>

        <div ref={ctaButtonRef} style={{ opacity: 0, marginTop: 32, pointerEvents: "auto" }}>
          <a href="/demo" style={{ display: "inline-block", background: INK, color: SURFACE_TEXT, borderRadius: 99, padding: "11px 28px", fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
            Get my early access
          </a>
        </div>
      </div>
    </section>
  );
}

export default function StickyCards() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const lastCardRef = useRef(null);
  const lastCardImageRef = useRef(null);
  const ctaHeadingWordsRef = useRef([]);
  const ctaPanelRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const [viewportMode, setViewportMode] = useState("desktop");

  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const update = () => setViewportMode(query.matches ? "mobile" : "desktop");
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current;
    if (viewportMode !== "desktop") return;
    if (!section || !cards.length) return;

    const totalCards = cards.length;
    const segmentSize = 1 / totalCards;
    const cardYOffset = 5;
    const cardScaleStep = 0.075;
    const stackDist = window.innerHeight * 2.5;
    const expandDist = window.innerHeight * 0.6;
    const totalDist = stackDist + expandDist;

    // Initial stacked positions
    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * cardYOffset,
        scale: 1 - i * cardScaleStep,
      });
    });

    // Set last card image initial zoom
    if (lastCardImageRef.current) {
      gsap.set(lastCardImageRef.current, { scale: 1.2 });
    }

    let wasFullyExpanded = false;

    const cardsTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${totalDist}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const totalProgress = self.progress;
        const stackFraction = stackDist / totalDist;
        const stackProgress = Math.min(totalProgress / stackFraction, 1);
        const expandProgress = Math.max(0, (totalProgress - stackFraction) / (1 - stackFraction));

        // Fire navbar lock/unlock events when expansion completes or reverses
        const isFullyExpanded = expandProgress >= 0.98;
        if (isFullyExpanded && !wasFullyExpanded) {
          window.dispatchEvent(new CustomEvent("cardExpanded"));
          wasFullyExpanded = true;
        } else if (!isFullyExpanded && wasFullyExpanded) {
          window.dispatchEvent(new CustomEvent("cardCollapsed"));
          wasFullyExpanded = false;
        }

        // Stacking phase
        const activeIndex = Math.min(Math.floor(stackProgress / segmentSize), totalCards - 1);
        const segProgress = (stackProgress - activeIndex * segmentSize) / segmentSize;
        const lastIndex = totalCards - 1;

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            gsap.set(card, { yPercent: -250, rotationX: 35 });
          } else if (i === activeIndex) {
            if (i === lastIndex) {
              gsap.set(card, { yPercent: -50, rotationX: 0, scale: 1 });
            } else {
              gsap.set(card, {
                yPercent: gsap.utils.interpolate(-50, -200, segProgress),
                rotationX: gsap.utils.interpolate(0, 35, segProgress),
                scale: 1,
              });
            }
          } else {
            const behindIndex = i - activeIndex;
            gsap.set(card, {
              yPercent: -50 + (behindIndex - segProgress) * cardYOffset,
              rotationX: 0,
              scale: 1 - (behindIndex - segProgress) * cardScaleStep,
            });
          }
        });

        // Expansion phase — width/height only, position anchor never changes
        // top:50% left:50% xPercent:-50 yPercent:-50 stays locked → grows from center
        if (lastCardRef.current) {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          gsap.set(lastCardRef.current, {
            width: gsap.utils.interpolate(vw * 0.65, vw, expandProgress),
            height: gsap.utils.interpolate(vh * 0.60, vh, expandProgress),
            borderRadius: gsap.utils.interpolate(16, 0, expandProgress),
          });
        }

        if (lastCardImageRef.current) {
          gsap.set(lastCardImageRef.current, {
            scale: gsap.utils.interpolate(1.2, 1, expandProgress),
          });
        }

        // CTA word reveal — starts halfway through expansion, completes at end
        const ctaProgress = Math.max(0, Math.min((expandProgress - 0.4) / 0.6, 1));
        const words = ctaHeadingWordsRef.current;
        if (words.length) {
          words.forEach((word, i) => {
            const a = i / words.length;
            const b = (i + 1) / words.length;
            let t = 0;
            if (ctaProgress >= b) t = 1;
            else if (ctaProgress >= a) t = (ctaProgress - a) / (b - a);
            const yVal = gsap.utils.interpolate(40, 0, t);
            gsap.set(word, { opacity: t, y: yVal });
          });
        }

        // Badge + button fade in at end of expansion
        const panelOpacity = Math.max(0, (expandProgress - 0.7) / 0.3);
        if (ctaPanelRef.current) {
          gsap.set(ctaPanelRef.current, { opacity: panelOpacity });
        }
        if (ctaButtonRef.current) {
          gsap.set(ctaButtonRef.current, { opacity: panelOpacity });
        }
      },
    });

    return () => cardsTrigger.kill();
  }, [viewportMode]);

  if (viewportMode === "mobile") {
    return <MobileStack />;
  }

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "transparent",
        perspective: "1000px",
        overflow: "hidden",
      }}
    >
      {CARDS.map((card, i) => (
        <div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
            if (i === CARDS.length - 1) lastCardRef.current = el;
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "65%",
            height: "60%",
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            padding: i === CARDS.length - 1 ? 0 : "2.5rem",
            borderRadius: "16px",
            overflow: i === CARDS.length - 1 ? "hidden" : "visible",
            background: card.bg,
            border: `1px solid ${i === CARDS.length - 1 ? "rgba(17,19,24,0.22)" : OUTLINE}`,
            boxShadow: "0 24px 64px rgba(10,20,60,0.22), 0 4px 16px rgba(10,20,60,0.10)",
            zIndex: card.zIndex,
            transformOrigin: "center bottom",
            willChange: "transform",
          }}
        >
          {/* Last card — hero image fills card, no text */}
          {i === CARDS.length - 1 ? (
            <img
              ref={lastCardImageRef}
              src="/images/last-card-bg.png"
              alt=""
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <>
              {/* Left col — text */}
              <div style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0.5rem 0.75rem" }}>
                <span style={{ fontFamily: FONT_HEADING, fontStyle: "normal", fontWeight: 500, fontSize: "clamp(32px, 3.2vw, 52px)", lineHeight: 1.02, color: card.text, display: "block" }}>
                  {card.heading}
                </span>
                <span style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: "clamp(14px, 1vw, 17px)", lineHeight: 1.5, letterSpacing: 0, color: card.muted, display: "block", marginTop: 18, maxWidth: 360 }}>
                  {card.subline}
                </span>
              </div>
              {/* Right col — UI mockup */}
              <div style={{ flex: 1, height: "100%", background: SURFACE, borderRadius: "1rem", overflow: "hidden", padding: 22, display: "flex", flexDirection: "column", border: `1px solid ${OUTLINE}`, boxShadow: "0 10px 26px rgba(30,45,78,0.08)" }}>
                {UI_MAP[card.ui]}
              </div>
            </>
          )}
        </div>
      ))}

      {/* CTA overlay — sits above expanded last card, animated in during expansion */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%",
          zIndex: 20,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "18vh",
        }}
      >
        {/* Badge — fades in with panel, sits above heading */}
        <div
          ref={ctaPanelRef}
          style={{
            opacity: 0,
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Badge pill */}
          <div
            style={{
              background: "rgba(255,255,255,0.76)",
              border: `1px solid ${OUTLINE}`,
              borderRadius: 999,
              padding: "8px 16px",
              fontFamily: '"Inter", sans-serif',
              fontSize: 13,
              fontWeight: 400,
              color: INK,
              letterSpacing: "0.01em",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#BDF0DC", display: "inline-block", flexShrink: 0 }} />
            Free for 1 month
          </div>
        </div>

        {/* Heading — word-by-word animation */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "min(95vw, 960px)",
            padding: "0 40px",
          }}
        >
          <span style={{ display: "block" }}>
            {["Tell", "Drip", "Up", "what", "to", "do"].map((word, i) => (
              <span
                key={`l1-${i}`}
                ref={(el) => { ctaHeadingWordsRef.current[i] = el; }}
                style={{
                  display: "inline-block", opacity: 0,
                  fontFamily: '"EB Garamond", Georgia, serif',
                  fontStyle: "normal", fontWeight: 500,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15,
                  color: INK, marginRight: "0.25em",
                }}
              >{word}</span>
            ))}
          </span>
          <span style={{ display: "block" }}>
            {["and", "it", "manages", "the", "rest"].map((word, i) => (
              <span
                key={`l2-${i}`}
                ref={(el) => { ctaHeadingWordsRef.current[6 + i] = el; }}
                style={{
                  display: "inline-block", opacity: 0,
                  fontFamily: '"EB Garamond", Georgia, serif',
                  fontStyle: "normal", fontWeight: 500,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15,
                  color: INK, marginRight: "0.25em",
                }}
              >{word}</span>
            ))}
          </span>
        </div>

        {/* Button — 40px below heading */}
        <div
          ref={ctaButtonRef}
          style={{
            opacity: 0,
            marginTop: 40,
            pointerEvents: "auto",
          }}
        >
          <a
            href="/demo"
            style={{
              display: "inline-block",
              background: INK,
              color: SURFACE_TEXT,
              borderRadius: 99,
              padding: "12px 32px",
              fontFamily: FONT_BODY,
              fontSize: 16,
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = INK_SOFT)}
            onMouseLeave={(e) => (e.currentTarget.style.background = INK)}
          >
            Get my early access
          </a>
        </div>
      </div>
    </section>
  );
}
