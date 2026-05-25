import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FONT = '"Figtree", sans-serif';

const chatItems = [
  {
    prompt: "List this product",
    response: "Listed your product across your store.",
  },
  {
    prompt: "What are my sales today?",
    response: "You've made ₹14,200 across 8 orders today.",
  },
  {
    prompt: "Generate a product image",
    response: "Studio-quality image ready to publish.",
  },
  {
    prompt: "Update price to ₹1,299",
    response: "Price updated on all variants.",
  },
];

export default function HeroSection({ videoRef }) {
  const promptRef = useRef(null);
  const responseRef = useRef(null);
  const rightImageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    function buildCycle(item) {
      tl.set([promptRef.current, responseRef.current, rightImageRef.current], {
        opacity: 0,
        y: 12,
      })
        .call(() => {
          if (promptRef.current) promptRef.current.textContent = item.prompt;
          if (responseRef.current) responseRef.current.textContent = item.response;
        })
        .to(promptRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(rightImageRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, "<")
        .to(responseRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "+=0.3")
        .to({}, { duration: 2 })
        .to([promptRef.current, responseRef.current, rightImageRef.current], { opacity: 0, duration: 0.4, ease: "power2.in" });
    }

    chatItems.forEach((item) => buildCycle(item));
    return () => tl.kill();
  }, []);

  return (
    <section
      style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
    >
      <img
        ref={videoRef}
        src="/images/hero-bg.png"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />

      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", zIndex: 1 }} />

      {/* Logo */}
      <div
        style={{
          position: "absolute", top: 32, left: 40, zIndex: 10,
          fontFamily: FONT, fontWeight: 600, fontSize: 15,
          letterSpacing: "0.15em", color: "#1C1C1A",
        }}
      >
        DRIP UP
      </div>

      {/* Main content column */}
      <div
        style={{
          position: "relative", zIndex: 10, width: "100%", maxWidth: 1200,
          padding: "0 40px", display: "flex", flexDirection: "column",
          alignItems: "center", gap: 24,
        }}
      >
        {/* H1 with EB Garamond italic accent on "simply" */}
        <h1
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontStyle: "normal",
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 500,
            lineHeight: 1.05,
            color: "#1C1C1A",
            textAlign: "center",
            maxWidth: 700,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Grow &amp; manage your e-commerce store<br />simply by chatting
        </h1>

        {/* Subline */}
        <p
          style={{
            fontFamily: FONT,
            fontSize: "clamp(16px, 1.6vw, 20px)",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "#1C1C1A",
            textAlign: "center",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Drip Up handles every operation in your online store<br />and turns your goals into outcomes — just tell it
        </p>

        {/* Glass panel */}
        <div
          style={{
            width: "100%", maxWidth: 860,
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.28)",
            borderRadius: 20,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.10)",
            padding: "40px 40px",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 32, minHeight: 280,
          }}
        >
          {/* Left — chat */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                ref={promptRef}
                style={{
                  background: "#1A3D35", color: "#F5F0E8",
                  borderRadius: "16px 16px 4px 16px", padding: "10px 16px",
                  fontFamily: FONT, fontSize: 15, fontWeight: 500,
                  maxWidth: "80%", opacity: 0,
                }}
              >
                List this product
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                ref={responseRef}
                style={{
                  background: "rgba(255,255,255,0.7)", color: "#1C1C1A",
                  borderRadius: "16px 16px 16px 4px", padding: "10px 16px",
                  fontFamily: FONT, fontSize: 15, fontWeight: 500,
                  maxWidth: "80%", opacity: 0,
                  border: "0.5px solid rgba(200,195,185,0.5)",
                }}
              >
                Listed your product across your store.
              </div>
            </div>
          </div>

          {/* Right — synced product UI */}
          <div
            ref={rightImageRef}
            style={{
              background: "rgba(255,255,255,0.55)",
              border: "0.5px solid rgba(200,195,185,0.5)",
              borderRadius: 16, display: "flex", alignItems: "center",
              justifyContent: "center", opacity: 0, minHeight: 180,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: 24, width: "100%" }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "100%", height: 36, background: "rgba(26,61,53,0.08)",
                    borderRadius: 8, display: "flex", alignItems: "center",
                    padding: "0 12px", gap: 8,
                  }}
                >
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: "rgba(26,61,53,0.15)" }} />
                  <div style={{ flex: 1, height: 8, background: "rgba(26,61,53,0.12)", borderRadius: 4 }} />
                  <div style={{ width: 48, height: 20, borderRadius: 99, background: "#1A3D35", opacity: 0.85 }} />
                </div>
              ))}
              <div
                style={{
                  marginTop: 4, width: "100%", height: 32, borderRadius: 8,
                  background: "#1A3D35", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "#F5F0E8",
                  fontSize: 12, fontWeight: 500, fontFamily: FONT,
                }}
              >
                Ready to publish
              </div>
            </div>
          </div>
        </div>

        {/* CTA chat input bar */}
        <a
          href="/demo"
          style={{
            display: "flex", alignItems: "center", width: "100%", maxWidth: 600,
            height: 52, background: "rgba(245, 240, 232, 0.75)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            border: "0.5px solid rgba(200, 195, 185, 0.5)",
            borderRadius: 99, padding: "0 20px", cursor: "text",
            textDecoration: "none", gap: 10,
          }}
        >
          <span style={{ flex: 1, fontFamily: FONT, fontSize: 15, fontWeight: 500, color: "#6B6860", userSelect: "none" }}>
            Tell me what….
          </span>
          <div
            style={{
              width: 32, height: 32, borderRadius: 99, background: "#1A3D35",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 12V2M2 7l5-5 5 5" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
}
