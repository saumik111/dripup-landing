import Link from "next/link";
import { useRouter } from "next/router";

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

  return (
    <nav
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
      <Link
        href="/"
        style={{
          fontFamily: FONT,
          fontWeight: 200,
          fontSize: 13,
          letterSpacing: "0.15em",
          color: INK,
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        Drip Up
      </Link>

      <Link
        href={backHref}
        style={{
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: 15,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
          borderRadius: 99,
          minWidth: 92,
          height: 36,
          background: INK,
          color: SURFACE,
          padding: "0 18px",
          transition: "background 0.25s ease, transform 0.25s ease",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.background = INK_SOFT;
          event.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.background = INK;
          event.currentTarget.style.transform = "translateY(0)";
        }}
      >
        ← Back
      </Link>
    </nav>
  );
}
