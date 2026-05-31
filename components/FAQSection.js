import { useState } from "react";

const FAQS = [
  {
    question: "Who is Drip Up built for?",
    answer:
      "Drip Up is built for e-commerce and D2C brands that want to hand off the repetitive selling work like listings, images, pricing and store ops, and focus on growing the brand.",
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

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      aria-labelledby="faq-heading"
      style={{
        position: "relative",
        zIndex: 4,
        width: "100%",
        background: "linear-gradient(to right, #F0F4FF, #FAFAFA)",
        padding: "clamp(96px, 12vw, 160px) 20px clamp(112px, 13vw, 176px)",
      }}
    >
      <div
        style={{
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
      </div>
    </section>
  );
}
