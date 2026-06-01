import Head from "next/head";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const INK = "#111318";
const INK_SOFT = "#252832";
const TEXT_SECONDARY = "#4F5B6B";
const OUTLINE = "rgba(214,224,242,0.78)";
const FONT_HEADING = '"EB Garamond", Georgia, serif';
const FONT_BODY = '"Inter", sans-serif';

const EXAMPLES = [
  "I have 12 products missing photos. What should Drip Up do first?",
  "Rewrite my product listings so they are ready for Shopify search.",
  "Find what is blocking orders from going out today.",
];

export default function Ask() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;
    setAnswer(
      "Drip Up would turn that into a short action plan: inspect the store context, draft the change, show you the preview, and wait for approval before publishing.",
    );
  }

  return (
    <>
      <Head>
        <title>Ask Drip Up | Drip Up</title>
      </Head>
      <Navbar />
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
            Ask Drip Up
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: FONT_HEADING,
              fontSize: "clamp(3.1rem, 8vw, 6rem)",
              lineHeight: 0.96,
              fontWeight: 500,
              letterSpacing: 0,
            }}
          >
            See what it can do for your store.
          </h1>
          <p
            style={{
              margin: "26px auto 0",
              maxWidth: 620,
              fontFamily: FONT_BODY,
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              lineHeight: 1.65,
              color: TEXT_SECONDARY,
            }}
          >
            Type a selling task, a store problem, or a messy workflow. Drip Up turns it into the kind of action it would prepare for approval.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              margin: "48px auto 0",
              width: "min(760px, 100%)",
              background: "rgba(255,255,255,0.72)",
              border: `1px solid ${OUTLINE}`,
              borderRadius: 18,
              boxShadow: "0 22px 60px rgba(10,20,60,0.10)",
              padding: "clamp(18px, 4vw, 28px)",
              display: "grid",
              gap: 14,
              textAlign: "left",
            }}
          >
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={5}
              placeholder="Ask about listings, images, pricing, fulfillment, campaigns, or store ops..."
              style={{
                width: "100%",
                border: `1px solid ${OUTLINE}`,
                borderRadius: 14,
                background: "rgba(255,255,255,0.88)",
                padding: 16,
                fontFamily: FONT_BODY,
                fontSize: 16,
                lineHeight: 1.55,
                color: INK,
                outline: "none",
                resize: "vertical",
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {EXAMPLES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPrompt(item)}
                  style={{
                    border: `1px solid ${OUTLINE}`,
                    background: "transparent",
                    borderRadius: 999,
                    padding: "9px 12px",
                    fontFamily: FONT_BODY,
                    fontSize: 13,
                    fontWeight: 500,
                    color: INK,
                    cursor: "pointer",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(event) => (event.currentTarget.style.background = INK_SOFT)}
              onMouseLeave={(event) => (event.currentTarget.style.background = INK)}
            >
              Show me the first move
            </button>
            {answer && (
              <div
                style={{
                  border: `1px solid ${OUTLINE}`,
                  borderRadius: 14,
                  background: "rgba(248,250,255,0.86)",
                  padding: 18,
                  fontFamily: FONT_BODY,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: TEXT_SECONDARY,
                }}
              >
                {answer}
              </div>
            )}
          </form>
        </section>
      </main>
    </>
  );
}

const buttonStyle = {
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
