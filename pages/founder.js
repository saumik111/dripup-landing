import Head from "next/head";
import { useState } from "react";
import BackNavbar from "@/components/BackNavbar";

const INK = "#111318";
const INK_SOFT = "#252832";
const TEXT_SECONDARY = "#4F5B6B";
const OUTLINE = "rgba(214,224,242,0.78)";
const FONT_HEADING = '"EB Garamond", Georgia, serif';
const FONT_BODY = '"Inter", sans-serif';

export default function Founder() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Head>
        <title>Contact the founder | Drip Up</title>
      </Head>
      <BackNavbar fallbackHref="/" />
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #F0F4FF, #FAFAFA)",
          padding: "136px 20px 72px",
          color: INK,
        }}
      >
        <section
          style={{
            width: "min(980px, 100%)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(28px, 6vw, 72px)",
            alignItems: "center",
          }}
        >
          <div>
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
              Founder note
            </p>
            <h1
              style={{
                margin: 0,
                fontFamily: FONT_HEADING,
                fontSize: "clamp(3.1rem, 8vw, 5.8rem)",
                lineHeight: 0.96,
                fontWeight: 500,
                letterSpacing: 0,
              }}
            >
              Talk to the person building Drip Up.
            </h1>
            <p
              style={{
                margin: "28px 0 0",
                maxWidth: 540,
                fontFamily: FONT_BODY,
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 1.65,
                color: TEXT_SECONDARY,
              }}
            >
              Use this when you want to ask about the product direction, share what your store needs, or shape the early version before it opens wider.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
            style={{
              background: "rgba(255,255,255,0.72)",
              border: `1px solid ${OUTLINE}`,
              borderRadius: 18,
              boxShadow: "0 22px 60px rgba(10,20,60,0.10)",
              padding: "clamp(22px, 4vw, 34px)",
              display: "grid",
              gap: 16,
            }}
          >
            <label style={labelStyle}>
              Your name
              <input required type="text" placeholder="Name" style={fieldStyle} />
            </label>
            <label style={labelStyle}>
              Email
              <input required type="email" placeholder="you@brand.com" style={fieldStyle} />
            </label>
            <label style={labelStyle}>
              Note
              <textarea
                required
                rows={5}
                placeholder="What should the founder know?"
                style={{ ...fieldStyle, resize: "vertical", minHeight: 132 }}
              />
            </label>
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(event) => (event.currentTarget.style.background = INK_SOFT)}
              onMouseLeave={(event) => (event.currentTarget.style.background = INK)}
            >
              Prepare founder note
            </button>
            {sent && (
              <p style={{ margin: 0, fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.5, color: TEXT_SECONDARY }}>
                Founder note prepared in this preview. The live site can connect this to the founder inbox before launch.
              </p>
            )}
          </form>
        </section>
      </main>
    </>
  );
}

const labelStyle = {
  display: "grid",
  gap: 8,
  fontFamily: FONT_BODY,
  fontWeight: 600,
  color: INK,
};

const fieldStyle = {
  width: "100%",
  border: `1px solid ${OUTLINE}`,
  borderRadius: 12,
  background: "rgba(255,255,255,0.86)",
  padding: "13px 14px",
  fontFamily: FONT_BODY,
  fontSize: 15,
  lineHeight: 1.4,
  color: INK,
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  minHeight: 48,
  border: 0,
  borderRadius: 99,
  background: INK,
  color: "#F7F9FF",
  fontFamily: FONT_BODY,
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.2s ease",
};
