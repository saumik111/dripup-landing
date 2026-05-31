const INK = "#111318";
const TEXT_SECONDARY = "#4F5B6B";
const FONT_HEADING = '"EB Garamond", Georgia, serif';
const FONT_BODY = '"Inter", sans-serif';

export default function Founder() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #F0F4FF, #FAFAFA)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        color: INK,
      }}
    >
      <section
        style={{
          width: "min(720px, 100%)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: "0 0 18px",
            fontFamily: FONT_BODY,
            fontSize: 13,
            lineHeight: 1.4,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: TEXT_SECONDARY,
          }}
        >
          Drip Up
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: FONT_HEADING,
            fontSize: "clamp(3rem, 8vw, 5.6rem)",
            lineHeight: 0.96,
            fontWeight: 500,
            letterSpacing: 0,
          }}
        >
          Founder page coming soon.
        </h1>
        <p
          style={{
            margin: "28px auto 0",
            maxWidth: 520,
            fontFamily: FONT_BODY,
            fontSize: "clamp(1rem, 2vw, 1.18rem)",
            lineHeight: 1.65,
            fontWeight: 400,
            color: TEXT_SECONDARY,
          }}
        >
          We will shape this page next: the story, the structure, and the right way to reach the person building Drip Up.
        </p>
      </section>
    </main>
  );
}
