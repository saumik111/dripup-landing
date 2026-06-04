import Link from "next/link";
import { useRouter } from "next/router";
import { useDesignLabValue } from "@/components/DesignLab";

const FONT = '"Inter", sans-serif';
const INK = "#111318";
const INK_SOFT = "#252832";
const SURFACE = "#F7F9FF";

function normalizeBackHref(value, fallback) {
  if (typeof value !== "string" || !value.startsWith("/")) return fallback;
  if (value.startsWith("//")) return fallback;
  return value;
}

export default function BackNavbar({ fallbackHref = "/" }) {
  const router = useRouter();
  const from = Array.isArray(router.query.from) ? router.query.from[0] : router.query.from;
  const backHref = normalizeBackHref(from, fallbackHref);
  const logoText = useDesignLabValue("backNavbar", "logoText", "Drip Up");
  const backLabel = useDesignLabValue("backNavbar", "backLabel", "← Back");
  const ink = useDesignLabValue("backNavbar", "ink", INK);
  const inkSoft = useDesignLabValue("backNavbar", "inkSoft", INK_SOFT);
  const buttonText = useDesignLabValue("backNavbar", "buttonText", SURFACE);
  const height = useDesignLabValue("backNavbar", "height", 64);
  const paddingX = useDesignLabValue("backNavbar", "paddingX", 40);
  const fontSize = useDesignLabValue("backNavbar", "fontSize", 15);
  const buttonWidth = useDesignLabValue("backNavbar", "buttonWidth", 92);

  return (
    <nav
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
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        boxSizing: "border-box",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: FONT,
          fontWeight: 200,
          fontSize: 13,
          letterSpacing: "0.15em",
          color: ink,
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        {logoText}
      </Link>

      <Link
        href={backHref}
        style={{
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
          minWidth: buttonWidth,
          height: 36,
          background: ink,
          color: buttonText,
          padding: "0 18px",
          transition: "background 0.25s ease, transform 0.25s ease",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.background = inkSoft;
          event.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.background = ink;
          event.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {backLabel}
      </Link>
    </nav>
  );
}
