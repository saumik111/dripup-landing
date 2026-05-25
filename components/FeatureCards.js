import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    bg: "#F0EBE0",
    heading: "Create",
    subline: "Studio-free product photoshoots",
    ui: "photoshoots",
  },
  {
    bg: "#E8E2D4",
    heading: "Expand your reach",
    subline: "with SEO & GEO optimized product listings",
    ui: "listings",
  },
  {
    bg: "#DFD9CC",
    heading: "Control the chaos",
    subline: "everything that matters, right in front of you",
    ui: "insights",
  },
  {
    bg: "#D6D0C3",
    heading: "Grow with confidence",
    subline: "Know exactly how your brand is performing",
    ui: "analytics",
  },
];

function PhotoshootsUI() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", gap: 10 }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              aspectRatio: "3/4",
              background: "rgba(26,61,53,0.08)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "60%", height: "60%", background: "rgba(26,61,53,0.12)", borderRadius: 6 }} />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#1A3D35",
          borderRadius: 10,
          padding: "10px 16px",
        }}
      >
        <span style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 13, color: "#F5F0E8", fontWeight: 500 }}>
          Ready to publish
        </span>
        <div style={{ padding: "5px 16px", background: "#F5F0E8", borderRadius: 99, fontSize: 12, fontWeight: 500, color: "#1A3D35", fontFamily: "Geist, Inter, sans-serif" }}>
          Publish
        </div>
      </div>
    </div>
  );
}

function ListingsUI() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      {["Product title optimised for search", "SEO-ready description written", "Tags & keywords generated"].map((line, i) => (
        <div
          key={i}
          style={{
            background: "rgba(26,61,53,0.07)",
            borderRadius: 8,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 20, height: 20, borderRadius: 99, background: "#1A3D35", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 13, color: "#1C1C1A", fontWeight: 400 }}>
            {line}
          </span>
        </div>
      ))}
      <div
        style={{
          height: 36,
          background: "#1A3D35",
          borderRadius: 8,
          marginTop: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Geist, Inter, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: "#F5F0E8",
        }}
      >
        Push to Shopify
      </div>
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
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
      {alerts.map((a) => (
        <div
          key={a.text}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,255,255,0.6)",
            borderRadius: 8,
            padding: "10px 14px",
            border: "0.5px solid rgba(200,195,185,0.4)",
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: 99, background: a.dot, flexShrink: 0 }} />
          <span style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 13, color: "#1C1C1A", flex: 1 }}>
            {a.text}
          </span>
          <div
            style={{
              padding: "3px 10px",
              borderRadius: 99,
              border: "0.5px solid rgba(26,61,53,0.3)",
              fontSize: 11,
              fontWeight: 500,
              color: "#1A3D35",
              fontFamily: "Geist, Inter, sans-serif",
              cursor: "default",
            }}
          >
            Fix
          </div>
        </div>
      ))}
    </div>
  );
}

function AnalyticsUI() {
  const reports = [
    { label: "Brand Audit Report", date: "May 2025" },
    { label: "Competitor & Trend Scan", date: "May 2025" },
    { label: "New Meta Ads Strategy", date: "Apr 2025" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid rgba(200,195,185,0.4)",
          marginBottom: 8,
        }}
      >
        {["Summary", "Insights", "Artifacts"].map((tab, i) => (
          <div
            key={tab}
            style={{
              padding: "8px 14px",
              fontFamily: "Geist, Inter, sans-serif",
              fontSize: 12,
              fontWeight: i === 2 ? 500 : 400,
              color: i === 2 ? "#1C1C1A" : "#6B6860",
              borderBottom: i === 2 ? "2px solid #1A3D35" : "2px solid transparent",
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      {reports.map((r) => (
        <div
          key={r.label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid rgba(200,195,185,0.25)",
          }}
        >
          <span style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 13, color: "#1C1C1A" }}>{r.label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 11, color: "#6B6860" }}>{r.date}</span>
            <div style={{ padding: "3px 10px", borderRadius: 99, border: "0.5px solid rgba(26,61,53,0.3)", fontSize: 11, color: "#1A3D35", fontFamily: "Geist, Inter, sans-serif" }}>
              ↓
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const UI_MAP = {
  photoshoots: <PhotoshootsUI />,
  listings: <ListingsUI />,
  insights: <InsightsUI />,
  analytics: <AnalyticsUI />,
};

export default function FeatureCards({ onReady }) {
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cards = cardRefs.current;

    // Cards 1-3 start off-screen bottom; card 0 is the base (already visible)
    gsap.set(cards.slice(1), { y: "100vh" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 0.6,
        onLeave: () => onReady && onReady(),
      },
    });

    cards.slice(1).forEach((card) => {
      tl.to(card, { y: 0, ease: "power3.out", duration: 1 }, "+=0.2");
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [onReady]);

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%", height: "100vh" }}>
      {CARDS.map((card, i) => (
        <div
          key={i}
          ref={(el) => (cardRefs.current[i] = el)}
          style={{
            position: "absolute",
            inset: 0,
            background: card.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "128px 40px",
            willChange: "transform",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 1200,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* Left — text */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2
                style={{
                  fontFamily: "Geist, Inter, sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: "#1C1C1A",
                }}
              >
                {card.heading}
              </h2>
              <p
                style={{
                  fontFamily: "Geist, Inter, sans-serif",
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "#6B6860",
                  maxWidth: 360,
                }}
              >
                {card.subline}
              </p>
            </div>

            {/* Right — product UI */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(200,195,185,0.5)",
                borderRadius: 16,
                boxShadow: "0 4px 32px rgba(28,28,26,0.07)",
                padding: 24,
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              {UI_MAP[card.ui]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
