import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useDesignLabValue } from "@/components/DesignLab";

const FONT = '"Inter", sans-serif';
const INK = "#111318";
const INK_SOFT = "#252832";
const SURFACE = "#F7F9FF";

function ExpandButton({ shortLabel, fullLabel, href, dark }) {
  const [hovered, setHovered] = useState(false);
  const fontSize = useDesignLabValue("navbar", "fontSize", 15);
  const ink = useDesignLabValue("navbar", "ink", INK);
  const inkSoft = useDesignLabValue("navbar", "inkSoft", INK_SOFT);
  const buttonText = useDesignLabValue("navbar", "buttonText", SURFACE);
  const buttonHeight = useDesignLabValue("navbar", "buttonHeight", 36);
  const hoverWidthAsk = useDesignLabValue("navbar", "hoverWidthAsk", 220);
  const hoverWidthEarly = useDesignLabValue("navbar", "hoverWidthEarly", 200);

  const baseStyle = {
    fontFamily: FONT,
    fontWeight: 500,
    fontSize,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    whiteSpace: "nowrap",
    borderRadius: 99,
    cursor: "pointer",
    position: "relative",
    height: buttonHeight,
    transition: "width 0.35s cubic-bezier(0.4,0,0.2,1), background 0.25s ease, box-shadow 0.25s ease",
    width: hovered ? (dark ? hoverWidthAsk : hoverWidthEarly) : (dark ? 48 : 140),
    background: hovered ? inkSoft : (dark ? "transparent" : ink),
    color: dark ? (hovered ? buttonText : ink) : buttonText,
    padding: 0,
  };

  return (
    <Link
      href={href}
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Short label — fades out on hover */}
      <span
        style={{
          position: "absolute",
          fontWeight: 600,
          fontSize,
          transition: "opacity 0.15s ease",
          opacity: hovered ? 0 : 1,
          pointerEvents: "none",
          letterSpacing: "0.01em",
        }}
      >
        {shortLabel}
      </span>

      {/* Full label — fades in after short fades out */}
      <span
        style={{
          position: "absolute",
          fontWeight: 500,
          fontSize: Math.max(12, fontSize - 1),
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
    </Link>
  );
}

export default function Navbar() {
  const navRef = useRef(null);
  const logoText = useDesignLabValue("navbar", "logoText", "Drip Up");
  const logoLetterSpacing = useDesignLabValue("navbar", "logoLetterSpacing", 0.15);
  const ink = useDesignLabValue("navbar", "ink", INK);
  const height = useDesignLabValue("navbar", "height", 64);
  const paddingX = useDesignLabValue("navbar", "paddingX", 40);
  const gap = useDesignLabValue("navbar", "gap", 16);
  const backgroundAlpha = useDesignLabValue("navbar", "backgroundAlpha", 0.06);
  const askShortLabel = useDesignLabValue("navbar", "askShortLabel", "Ask");
  const askFullLabel = useDesignLabValue("navbar", "askFullLabel", "Ask Drip Up what it can do");
  const earlyShortLabel = useDesignLabValue("navbar", "earlyShortLabel", "Early access");
  const earlyFullLabel = useDesignLabValue("navbar", "earlyFullLabel", "Get my early access");

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { yPercent: 0 });

    let lastScrollY = window.scrollY;
    let ticking = false;
    let forceVisible = false;

    function onScroll() {
      if (forceVisible) return;
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollingDown = currentScrollY > lastScrollY;

          if (currentScrollY <= 80) {
            gsap.to(nav, { yPercent: 0, duration: 0.5, ease: "power2.out", overwrite: true });
          } else if (scrollingDown) {
            gsap.to(nav, { yPercent: -100, duration: 0.45, ease: "power2.inOut", overwrite: true });
          } else {
            gsap.to(nav, { yPercent: 0, duration: 0.5, ease: "power2.out", overwrite: true });
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    }

    function onCardExpanded() {
      forceVisible = true;
      gsap.to(nav, { yPercent: 0, duration: 0.5, ease: "power2.out", overwrite: true });
    }

    function onCardCollapsed() {
      forceVisible = false;
      lastScrollY = window.scrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("cardExpanded", onCardExpanded);
    window.addEventListener("cardCollapsed", onCardCollapsed);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("cardExpanded", onCardExpanded);
      window.removeEventListener("cardCollapsed", onCardCollapsed);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${paddingX}px`,
        background: `rgba(255, 255, 255, ${backgroundAlpha})`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: FONT,
          fontWeight: 200,
          fontSize: 13,
          letterSpacing: `${logoLetterSpacing}em`,
          color: ink,
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        {logoText}
      </Link>

      {/* Nav items */}
      <div style={{ display: "flex", alignItems: "center", gap }}>
        <ExpandButton
          shortLabel={askShortLabel}
          fullLabel={askFullLabel}
          href="/ask"
          dark={true}
        />
        <ExpandButton
          shortLabel={earlyShortLabel}
          fullLabel={earlyFullLabel}
          href="/demo"
          dark={false}
        />
      </div>
    </nav>
  );
}
