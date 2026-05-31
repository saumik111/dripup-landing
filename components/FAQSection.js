import { useState } from "react";

const FAQS = [
  {
    question: "Is Drip Up for my kind of store?",
    answer:
      "If you run an e-commerce or D2C brand and spend more time on your online store operations, Drip Up is built for you. It takes over the repetitive selling work so you can focus on growing your brand.",
  },
  {
    question: "How do I get started?",
    answer:
      'Click "Get my early access", enter your store URL during onboarding, and approve the permissions Shopify asks for. That\'s it, Drip Up is ready to work with you.',
  },
  {
    question: "Will it make changes to my store without me approving?",
    answer:
      "Drip Up shows you what it's about to do before anything goes live. It acts only when you tell it to. You stay in control.",
  },
  {
    question: "Is my store data safe?",
    answer:
      "Everything is encrypted end to end. Your store data, credentials, and brand information are yours. We can't see them either.",
  },
];

const INK = "#111318";
const TEXT_SECONDARY = "#4F5B6B";
const OUTLINE = "rgba(214,224,242,0.78)";
const FONT_HEADING = '"EB Garamond", Georgia, serif';
const FONT_BODY = '"Inter", sans-serif';
const INK_SOFT = "#252832";
const SURFACE_TEXT = "#F7F9FF";
const FAQ_BACKGROUND = "linear-gradient(to right, #F0F4FF, #FAFAFA)";
const FAQ_FADE_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.16) 28%, rgba(0,0,0,0.68) 50%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      aria-labelledby="faq-heading"
      style={{
        position: "relative",
        zIndex: 8,
        width: "100%",
        marginTop: "clamp(-96px, -7vw, -48px)",
        background: FAQ_BACKGROUND,
        padding: "clamp(96px, 12vw, 160px) 20px clamp(112px, 13vw, 176px)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "clamp(56px, 6vw, 80px)",
          height: "clamp(180px, 22vw, 340px)",
          transform: "translateY(-100%)",
          pointerEvents: "none",
          background: FAQ_BACKGROUND,
          WebkitMaskImage: FAQ_FADE_MASK,
          maskImage: FAQ_FADE_MASK,
        }}
      />
      <div
        style={{
          position: "relative",
          width: "min(860px, calc(100vw - 40px))",
          margin: "0 auto",
        }}
      >
        <h2
          id="faq-heading"
          style={{
            margin: "0 0 clamp(42px, 6vw, 68px)",
            fontFamily: FONT_HEADING,
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            lineHeight: 1.05,
            fontWeight: 500,
            color: INK,
            textAlign: "center",
            letterSpacing: 0,
          }}
        >
          Your questions, answered.
        </h2>

        <div style={{ borderTop: `1px solid ${OUTLINE}` }}>
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            const buttonId = `faq-question-${index}`;

            return (
              <div key={item.question} style={{ borderBottom: `1px solid ${OUTLINE}` }}>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  style={{
                    width: "100%",
                    appearance: "none",
                    border: 0,
                    background: "transparent",
                    padding: "24px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 24,
                    cursor: "pointer",
                    textAlign: "left",
                    color: INK,
                    fontFamily: FONT_BODY,
                    fontSize: "clamp(1rem, 2vw, 1.18rem)",
                    lineHeight: 1.35,
                    fontWeight: 500,
                  }}
                >
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: `1px solid ${OUTLINE}`,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: INK,
                      fontFamily: FONT_BODY,
                      fontSize: 18,
                      fontWeight: 400,
                      lineHeight: 1,
                    }}
                  >
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  style={{
                    padding: isOpen ? "0 56px 28px 0" : 0,
                    color: TEXT_SECONDARY,
                    fontFamily: FONT_BODY,
                    fontSize: "clamp(0.98rem, 1.8vw, 1.12rem)",
                    lineHeight: 1.65,
                    fontWeight: 400,
                  }}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "clamp(88px, 11vw, 132px)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: "0 0 clamp(28px, 4vw, 40px)",
              fontFamily: FONT_HEADING,
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              lineHeight: 1.05,
              fontWeight: 500,
              color: INK,
              textAlign: "center",
              letterSpacing: 0,
            }}
          >
            Got more questions?
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
              gap: "clamp(8px, 2vw, 14px)",
              width: "min(520px, 100%)",
              margin: "0 auto",
            }}
          >
            <a
              href="/ask"
              style={{
                flex: "1 1 0",
                minWidth: 0,
                minHeight: 48,
                borderRadius: 99,
                border: `1px solid ${OUTLINE}`,
                background: "transparent",
                color: INK,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px clamp(10px, 2.8vw, 22px)",
                fontFamily: FONT_BODY,
                fontSize: "clamp(0.72rem, 2.7vw, 0.95rem)",
                lineHeight: 1.15,
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                transition: "background 0.22s ease, color 0.22s ease, border-color 0.22s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = INK_SOFT;
                e.currentTarget.style.borderColor = INK_SOFT;
                e.currentTarget.style.color = SURFACE_TEXT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = OUTLINE;
                e.currentTarget.style.color = INK;
              }}
            >
              Ask Drip Up what it can do
            </a>
            <a
              href="/founder"
              style={{
                flex: "1 1 0",
                minWidth: 0,
                minHeight: 48,
                borderRadius: 99,
                border: `1px solid ${OUTLINE}`,
                background: "transparent",
                color: INK,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px clamp(10px, 2.8vw, 22px)",
                fontFamily: FONT_BODY,
                fontSize: "clamp(0.72rem, 2.7vw, 0.95rem)",
                lineHeight: 1.15,
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                transition: "background 0.22s ease, color 0.22s ease, border-color 0.22s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = INK_SOFT;
                e.currentTarget.style.borderColor = INK_SOFT;
                e.currentTarget.style.color = SURFACE_TEXT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = OUTLINE;
                e.currentTarget.style.color = INK;
              }}
            >
              Contact the founder
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
