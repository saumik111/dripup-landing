import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FONT_HEADING = '"EB Garamond", Georgia, serif';
const FONT_BODY = '"Figtree", sans-serif';

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

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current;
    if (!section || !cards.length) return;

    const totalCards = cards.length;
    const segmentSize = 1 / totalCards;
    const cardYOffset = 5;
    const cardScaleStep = 0.075;

    // Initial stacked positions — exact source
    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * cardYOffset,
        scale: 1 - i * cardScaleStep,
      });
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 2.5}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeIndex = Math.min(Math.floor(progress / segmentSize), totalCards - 1);
        const segProgress = (progress - activeIndex * segmentSize) / segmentSize;

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            gsap.set(card, { yPercent: -250, rotationX: 35 });
          } else if (i === activeIndex) {
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -200, segProgress),
              rotationX: gsap.utils.interpolate(0, 35, segProgress),
              scale: 1,
            });
          } else {
            const behindIndex = i - activeIndex;
            gsap.set(card, {
              yPercent: -50 + (behindIndex - segProgress) * cardYOffset,
              rotationX: 0,
              scale: 1 - (behindIndex - segProgress) * cardScaleStep,
            });
          }
        });
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
          ref={(el) => (cardRefs.current[i] = el)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "65%",
            height: "60%",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "2.5rem",
            borderRadius: "1rem",
            background: card.bg,
            border: "1px solid rgba(200,195,185,0.4)",
            boxShadow: "0 4px 40px rgba(28,28,26,0.08)",
            zIndex: card.zIndex,
            transformOrigin: "center bottom",
            willChange: "transform",
          }}
        >
          {/* Left col — text */}
          <div style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0.5rem" }}>
            {/* Heading — full phrase, EB Garamond */}
            <span style={{ fontFamily: FONT_HEADING, fontStyle: "normal", fontWeight: 500, fontSize: "clamp(28px, 3vw, 48px)", lineHeight: 1.1, color: "#1C1C1A", display: "block" }}>
              {card.heading}
            </span>
            {/* Subline — Figtree 300, same color, 1.333 ratio smaller, pre-line for forced breaks */}
            <span style={{ fontFamily: FONT_BODY, fontWeight: 200, fontSize: "clamp(21px, 2.25vw, 36px)", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#1C1C1A", display: "block", marginTop: 8, whiteSpace: "pre-line" }}>
              {card.subline}
            </span>
          </div>

          {/* Right col — UI mockup */}
          <div style={{ flex: 1, height: "100%", background: "#FFFFFF", borderRadius: "0.75rem", overflow: "hidden", padding: 20, display: "flex", flexDirection: "column" }}>
            {UI_MAP[card.ui]}
          </div>
        </div>
      ))}
    </section>
  );
}
