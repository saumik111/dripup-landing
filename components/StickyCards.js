import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FONT_HEADING = '"EB Garamond", Georgia, serif';
const FONT_BODY = '"Inter", sans-serif';

const CARDS = [
  {
    bg: "#F0EBE0",
    heading: "Create",
    subline: "studio-free product photoshoots",
    ui: "photoshoots",
    zIndex: 5,
  },
  {
    bg: "#E8E2D4",
    heading: "Expand your reach",
    subline: "SEO & GEO optimized listings",
    ui: "listings",
    zIndex: 4,
  },
  {
    bg: "#DFD9CC",
    heading: "Control the chaos",
    subline: "everything that matters,\nright in front of you",
    ui: "insights",
    zIndex: 3,
  },
  {
    bg: "#D6D0C3",
    heading: "Grow with confidence",
    subline: "know exactly how your\nbrand is performing",
    ui: "analytics",
    zIndex: 2,
  },
  {
    bg: "#CCC6B8",
    heading: "Watch it in action",
    subline: "see exactly what drip up\ncan do for your store",
    ui: "analytics",
    zIndex: 1,
  },
];

function PhotoshootsUI() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", gap: 10, flex: 1 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, background: "rgba(26,61,53,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "50%", height: "50%", background: "rgba(26,61,53,0.15)", borderRadius: 6 }} />
          </div>
        ))}
      </div>
      <div style={{ background: "#1A3D35", borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: "#F5F0E8", fontWeight: 500 }}>Ready to publish</span>
        <div style={{ background: "#F5F0E8", borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 500, color: "#1A3D35", fontFamily: FONT_BODY }}>Publish</div>
      </div>
    </div>
  );
}

function ListingsUI() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", height: "100%", justifyContent: "center" }}>
      {["Product title optimised for search", "SEO-ready description written", "Tags & keywords generated"].map((line, i) => (
        <div key={i} style={{ background: "rgba(26,61,53,0.08)", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 18, height: 18, borderRadius: 99, background: "#1A3D35", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2.5" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: "#1C1C1A", fontWeight: 500 }}>{line}</span>
        </div>
      ))}
      <div style={{ background: "#1A3D35", borderRadius: 8, padding: "10px", textAlign: "center", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 500, color: "#F5F0E8", marginTop: 4 }}>Push to Shopify</div>
    </div>
  );
}

function InsightsUI() {
  const alerts = [
    { dot: "#E8673A", text: "3 products missing photos" },
    { dot: "#D4A843", text: "Low stock: Cotton Kurta (2 left)" },
    { dot: "#1A3D35", text: "Best seller: Block Print Saree" },
    { dot: "#6B6860", text: "12 orders pending fulfillment" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", height: "100%", justifyContent: "center" }}>
      {alerts.map((a) => (
        <div key={a.text} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.6)", borderRadius: 8, padding: "10px 14px", border: "0.5px solid rgba(200,195,185,0.4)" }}>
          <div style={{ width: 8, height: 8, borderRadius: 99, background: a.dot, flexShrink: 0 }} />
          <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: "#1C1C1A", flex: 1, fontWeight: 500 }}>{a.text}</span>
          <div style={{ padding: "3px 10px", borderRadius: 99, border: "0.5px solid rgba(26,61,53,0.3)", fontSize: 11, fontWeight: 500, color: "#1A3D35", fontFamily: FONT_BODY }}>Fix</div>
        </div>
      ))}
    </div>
  );
}

function AnalyticsUI() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center" }}>
      <div style={{ display: "flex", borderBottom: "1px solid rgba(200,195,185,0.4)", marginBottom: 8 }}>
        {["Summary", "Insights", "Artifacts"].map((tab, i) => (
          <div key={tab} style={{ padding: "8px 14px", fontFamily: FONT_BODY, fontSize: 12, fontWeight: i === 2 ? 600 : 500, color: i === 2 ? "#1C1C1A" : "#6B6860", borderBottom: i === 2 ? "2px solid #1A3D35" : "2px solid transparent" }}>{tab}</div>
        ))}
      </div>
      {[
        { label: "Brand Audit Report", date: "May 2025" },
        { label: "Competitor & Trend Scan", date: "May 2025" },
        { label: "New Meta Ads Strategy", date: "Apr 2025" },
      ].map((r) => (
        <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(200,195,185,0.25)" }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: "#1C1C1A", fontWeight: 500 }}>{r.label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: "#6B6860", fontWeight: 500 }}>{r.date}</span>
            <div style={{ padding: "3px 10px", borderRadius: 99, border: "0.5px solid rgba(26,61,53,0.3)", fontSize: 11, color: "#1A3D35", fontFamily: FONT_BODY, fontWeight: 500 }}>↓</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const UI_MAP = { photoshoots: <PhotoshootsUI />, listings: <ListingsUI />, insights: <InsightsUI />, analytics: <AnalyticsUI /> };

export default function StickyCards() {
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

    ScrollTrigger.create({
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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#F5F0E8",
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
            border: "1px solid rgba(200,195,185,0.4)",
            boxShadow: "0 4px 40px rgba(28,28,26,0.08)",
            zIndex: card.zIndex,
            transformOrigin: "center bottom",
            willChange: "transform",
          }}
        >
          {/* Last card — hero image fills card, no text */}
          {i === CARDS.length - 1 ? (
            <img
              ref={lastCardImageRef}
              src="/images/hero-bg.png"
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
              <div style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0.5rem" }}>
                <span style={{ fontFamily: FONT_HEADING, fontStyle: "normal", fontWeight: 500, fontSize: "clamp(28px, 3vw, 48px)", lineHeight: 1.0, color: "#1C1C1A", display: "block" }}>
                  {card.heading}
                </span>
                <span style={{ fontFamily: FONT_BODY, fontWeight: 200, fontSize: "clamp(17.5px, 1.875vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#1C1C1A", display: "block", marginTop: 4, whiteSpace: "pre-line" }}>
                  {card.subline}
                </span>
              </div>
              {/* Right col — UI mockup */}
              <div style={{ flex: 1, height: "100%", background: "#FFFFFF", borderRadius: "0.75rem", overflow: "hidden", padding: 20, display: "flex", flexDirection: "column" }}>
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
          justifyContent: "center",
          paddingTop: "8vh",
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
              background: "rgba(28,28,26,0.07)",
              border: "1px solid rgba(28,28,26,0.15)",
              borderRadius: 999,
              padding: "8px 16px",
              fontFamily: '"Inter", sans-serif',
              fontSize: 13,
              fontWeight: 400,
              color: "#1C1C1A",
              letterSpacing: "0.01em",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1A3D35", display: "inline-block", flexShrink: 0 }} />
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
                  color: "#1C1C1A", marginRight: "0.25em",
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
                  color: "#1C1C1A", marginRight: "0.25em",
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
              background: "#1A3D35",
              color: "#F5F0E8",
              borderRadius: 99,
              padding: "12px 32px",
              fontFamily: '"Figtree", sans-serif',
              fontSize: 16,
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2D5E52")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1A3D35")}
          >
            Try it with your store
          </a>
        </div>
      </div>
    </section>
  );
}
