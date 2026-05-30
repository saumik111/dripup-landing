import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FONT = '"Inter", sans-serif';

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { yPercent: 0 });

    let lastScrollY = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollingDown = currentScrollY > lastScrollY;

          if (currentScrollY <= 80) {
            // Always show near top
            gsap.to(nav, { yPercent: 0, duration: 0.35, ease: "power3.out", overwrite: true });
          } else if (scrollingDown) {
            gsap.to(nav, { yPercent: -100, duration: 0.3, ease: "power2.in", overwrite: true });
          } else {
            gsap.to(nav, { yPercent: 0, duration: 0.35, ease: "power3.out", overwrite: true });
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 64,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <a
        href="/"
        style={{
          fontFamily: FONT,
          fontWeight: 200,
          fontSize: 13,
          letterSpacing: "0.15em",
          color: "#1C1C1A",
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        Drip Up
      </a>

      {/* Nav items */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <a
          href="#"
          style={{
            fontFamily: FONT,
            fontWeight: 200,
            fontSize: 15,
            color: "#1C1C1A",
            textDecoration: "none",
          }}
        >
          Ask Drip Up
        </a>
        <a
          href="#"
          style={{
            fontFamily: FONT,
            fontWeight: 200,
            fontSize: 15,
            color: "#F5F0E8",
            background: "#1A3D35",
            borderRadius: 99,
            padding: "8px 20px",
            textDecoration: "none",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2D5E52")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1A3D35")}
        >
          Try it
        </a>
      </div>
    </nav>
  );
}
