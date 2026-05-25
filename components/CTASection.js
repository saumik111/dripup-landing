import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FONT = '"Figtree", sans-serif';

export default function CTASection({ videoRef, visible }) {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!visible || hasAnimated.current) return;
    hasAnimated.current = true;

    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power3.out" });

    if (videoRef?.current) {
      gsap.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power3.out" });
    }

    gsap.fromTo(
      panelRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.3 }
    );
  }, [visible, videoRef]);

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", opacity: 0 }}
    >
      <video
        autoPlay muted loop playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        src="/videos/hero-bg.mp4"
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", zIndex: 1 }} />

      <div
        ref={panelRef}
        style={{
          position: "relative", zIndex: 10,
          background: "rgba(245, 240, 232, 0.65)",
          backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          border: "0.5px solid rgba(200, 195, 185, 0.4)",
          borderRadius: 24, padding: "56px 64px",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 12, opacity: 0, maxWidth: 560,
          width: "calc(100% - 80px)", textAlign: "center",
        }}
      >
        <h2 style={{ fontFamily: '"EB Garamond", Georgia, serif', fontStyle: "normal", fontSize: "clamp(28px, 3vw, 48px)", fontWeight: 500, lineHeight: 1.1, color: "#1C1C1A" }}>
          Tell Drip Up what to do
        </h2>
        <p style={{ fontFamily: FONT, fontSize: "clamp(20px, 2vw, 32px)", fontWeight: 400, lineHeight: 1.2, color: "#1C1C1A" }}>
          And it manages the rest
        </p>
        <a
          href="/demo"
          style={{
            marginTop: 24, display: "inline-block",
            background: "#1A3D35", color: "#F5F0E8",
            borderRadius: 99, padding: "12px 32px",
            fontFamily: FONT, fontSize: 16, fontWeight: 500,
            textDecoration: "none", transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2D5E52")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1A3D35")}
        >
          Watch it in action
        </a>
      </div>
    </section>
  );
}
