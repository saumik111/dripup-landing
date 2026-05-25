import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FONT = '"Figtree", sans-serif';

export default function SolutionSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        opacity: 0, y: 24, stagger: 0.1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 75%" },
      });
      gsap.from(cardRef.current, {
        opacity: 0, y: 32, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%", background: "#F5F0E8", padding: "128px 40px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 48,
      }}
    >
      <div ref={textRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
        <h2 style={{ fontFamily: '"EB Garamond", Georgia, serif', fontStyle: "normal", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 500, lineHeight: 1.1, color: "#1C1C1A", maxWidth: 640 }}>
          Chat with Drip Up like you chat with your manager
        </h2>
        <p style={{ fontFamily: FONT, fontSize: 18, fontWeight: 400, lineHeight: 1.6, color: "#1C1C1A", maxWidth: 480 }}>
          Drip Up plugs into your Shopify store and takes over all the repetitive work
        </p>
      </div>

      <div
        ref={cardRef}
        style={{
          width: "100%", maxWidth: 720, background: "#FFFFFF",
          border: "1px solid rgba(200, 195, 185, 0.5)", borderRadius: 16,
          boxShadow: "0 8px 40px rgba(28,28,26,0.08)", overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(200, 195, 185, 0.4)", padding: "0 24px" }}>
          {["Summary", "Insights", "Artifacts"].map((tab, i) => (
            <div
              key={tab}
              style={{
                padding: "14px 20px", fontFamily: FONT, fontSize: 14,
                fontWeight: i === 0 ? 600 : 500,
                color: i === 0 ? "#1C1C1A" : "#6B6860",
                borderBottom: i === 0 ? "2px solid #1A3D35" : "2px solid transparent",
                cursor: "default",
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        <div style={{ padding: "24px" }}>
          {[
            { label: "Brand Audit Report", date: "May 2025", color: "#1A3D35" },
            { label: "Competitor & Trend Scan", date: "May 2025", color: "#2D5E52" },
            { label: "New Meta Ads Strategy", date: "Apr 2025", color: "#1A3D35" },
          ].map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(200,195,185,0.3)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: item.color, flexShrink: 0 }} />
                <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 500, color: "#1C1C1A" }}>{item.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: "#6B6860" }}>{item.date}</span>
                <div style={{ padding: "5px 14px", background: "transparent", border: "1px solid rgba(26,61,53,0.3)", borderRadius: 99, fontFamily: FONT, fontSize: 12, fontWeight: 500, color: "#1A3D35", cursor: "default" }}>
                  Download
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
