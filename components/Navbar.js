import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FONT = '"Inter", sans-serif';

function ExpandButton({ shortLabel, fullLabel, href, dark }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: FONT,
        fontWeight: 200,
        fontSize: 15,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderRadius: 99,
        padding: dark ? "8px 16px" : "8px 0px",
        background: dark ? "transparent" : "#1A3D35",
        color: dark ? "#1C1C1A" : "#F5F0E8",
        transition: "padding 0.3s ease, background 0.3s ease, color 0.25s ease, box-shadow 0.3s ease",
        position: "relative",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        const shortEl = el.querySelector(".short");
        const fullEl = el.querySelector(".full");
        shortEl.style.opacity = "0";
        shortEl.style.maxWidth = "0";
        shortEl.style.overflow = "hidden";
        fullEl.style.opacity = "1";
        fullEl.style.maxWidth = "300px";
        if (dark) {
          el.style.background = "rgba(28,28,26,0.88)";
          el.style.color = "#F5F0E8";
          el.style.backdropFilter = "blur(8px)";
          el.style.WebkitBackdropFilter = "blur(8px)";
          el.style.padding = "8px 20px";
          el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.18)";
        } else {
          el.style.background = "#2D5E52";
          el.style.padding = "8px 20px";
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        const shortEl = el.querySelector(".short");
        const fullEl = el.querySelector(".full");
        shortEl.style.opacity = "1";
        shortEl.style.maxWidth = "100px";
        fullEl.style.opacity = "0";
        fullEl.style.maxWidth = "0";
        if (dark) {
          el.style.background = "transparent";
          el.style.color = "#1C1C1A";
          el.style.backdropFilter = "none";
          el.style.WebkitBackdropFilter = "none";
          el.style.padding = "8px 16px";
          el.style.boxShadow = "none";
        } else {
          el.style.background = "#1A3D35";
          el.style.padding = "8px 20px";
        }
      }}
    >
      <span
        className="short"
        style={{
          display: "inline-block",
          maxWidth: "100px",
          opacity: 1,
          transition: "opacity 0.2s ease, max-width 0.3s ease",
          overflow: "hidden",
        }}
      >
        {shortLabel}
      </span>
      <span
        className="full"
        style={{
          display: "inline-block",
          maxWidth: 0,
          opacity: 0,
          transition: "opacity 0.25s ease 0.05s, max-width 0.3s ease",
          overflow: "hidden",
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
