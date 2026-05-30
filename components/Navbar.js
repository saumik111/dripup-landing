import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const FONT = '"Inter", sans-serif';

function ExpandButton({ shortLabel, fullLabel, href, dark }) {
  const [hovered, setHovered] = useState(false);

  const baseStyle = {
    fontFamily: FONT,
    fontWeight: 200,
    fontSize: 15,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    whiteSpace: "nowrap",
    borderRadius: 99,
    cursor: "pointer",
    position: "relative",
    // Fixed height so it never changes vertically
    height: 36,
    // Transition width + background
    transition: "width 0.35s cubic-bezier(0.4,0,0.2,1), background 0.25s ease, box-shadow 0.25s ease",
    // Width: collapsed vs expanded
    width: hovered ? (dark ? 220 : 220) : (dark ? 48 : 72),
    background: hovered
      ? dark ? "rgba(28,28,26,0.88)" : "#2D5E52"
      : dark ? "transparent" : "#1A3D35",
    color: dark ? (hovered ? "#F5F0E8" : "#1C1C1A") : "#F5F0E8",
    backdropFilter: hovered && dark ? "blur(8px)" : "none",
    WebkitBackdropFilter: hovered && dark ? "blur(8px)" : "none",
    boxShadow: hovered && dark ? "0 2px 16px rgba(0,0,0,0.18)" : "none",
    padding: 0,
  };

  return (
    <a
      href={href}
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Short label — fades out on hover */}
      <span
        style={{
          position: "absolute",
          fontWeight: dark ? 200 : 600,
          fontSize: 15,
          transition: "opacity 0.15s ease",
          opacity: hovered ? 0 : 1,
          pointerEvents: "none",
          letterSpacing: dark ? "0.01em" : "0",
        }}
      >
        {shortLabel}
      </span>

      {/* Full label — fades in after short fades out */}
      <span
        style={{
          position: "absolute",
          fontWeight: 200,
          fontSize: 14,
          transition: "opacity 0.2s ease 0.12s",
          opacity: hovered ? 1 : 0,
          pointerEvents: "none",
          letterSpacing: "0.01em",
          padding: "0 16px",
          textAlign: "center",
        }}
      >
        {fullLabel}
      </span>
    </a>
  );
}

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
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <ExpandButton
          shortLabel="Ask"
          fullLabel="Ask Drip Up what it can do"
          href="/ask"
          dark={true}
        />
        <ExpandButton
          shortLabel="Try it"
          fullLabel="Try it now with your store"
          href="/demo"
          dark={false}
        />
      </div>
    </nav>
  );
}
