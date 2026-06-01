import Head from "next/head";
import { useState } from "react";
import BackNavbar from "@/components/BackNavbar";

const INK = "#111318";
const INK_SOFT = "#252832";
const TEXT_SECONDARY = "#4F5B6B";
const OUTLINE = "rgba(214,224,242,0.78)";
const FONT_HEADING = '"EB Garamond", Georgia, serif';
const FONT_BODY = '"Inter", sans-serif';

export default function Demo() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Head>
        <title>Get early access | Drip Up</title>
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
            width: "min(1040px, 100%)",
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
              Early access
            </p>
            <h1
              style={{
                margin: 0,
                fontFamily: FONT_HEADING,
                fontSize: "clamp(3.2rem, 8vw, 6rem)",
                lineHeight: 0.96,
                fontWeight: 500,
                letterSpacing: 0,
              }}
            >
              Let Drip Up start with your store.
            </h1>
            <p
              style={{
                margin: "28px 0 0",
                maxWidth: 560,
                fontFamily: FONT_BODY,
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 1.65,
                color: TEXT_SECONDARY,
              }}
            >
              Share the store you want help with. During onboarding, Drip Up connects to Shopify, reviews the work in front of it, and asks before anything goes live.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
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
            <label style={{ display: "grid", gap: 8, fontFamily: FONT_BODY, fontWeight: 600, color: INK }}>
              Store URL
              <input
                required
                type="url"
                placeholder="https://yourstore.com"
                style={fieldStyle}
              />
            </label>
            <label style={{ display: "grid", gap: 8, fontFamily: FONT_BODY, fontWeight: 600, color: INK }}>
              Work email
              <input
                required
                type="email"
                placeholder="you@brand.com"
                style={fieldStyle}
              />
            </label>
            <label style={{ display: "grid", gap: 8, fontFamily: FONT_BODY, fontWeight: 600, color: INK }}>
              What should Drip Up take over first?
              <textarea
                required
                rows={4}
                placeholder="Listings, images, pricing, store ops, campaign artifacts..."
                style={{ ...fieldStyle, resize: "vertical", minHeight: 120 }}
              />
            </label>
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(event) => (event.currentTarget.style.background = INK_SOFT)}
              onMouseLeave={(event) => (event.currentTarget.style.background = INK)}
            >
              Get my early access
            </button>
            {submitted && (
              <p style={{ margin: 0, fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.5, color: TEXT_SECONDARY }}>
                Request captured in this preview. The live handoff can now connect this form to the onboarding inbox.
              </p>
            )}
          </form>
        </section>
      </main>
    </>
  );
}

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
