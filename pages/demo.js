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
        <meta
          name="description"
          content="Get access to Drip Up early for your brand."
        />
      </Head>
      <BackNavbar fallbackHref="/" />
      <main className="earlyPage">
        <picture className="pageImage" aria-hidden="true">
          <source media="(max-width: 700px)" srcSet="/images/last-card-bg-mobile.webp" type="image/webp" />
          <source srcSet="/images/last-card-bg-desktop.webp" type="image/webp" />
          <img src="/images/last-card-bg.png" alt="" />
        </picture>
        <div className="imageWash" aria-hidden="true" />

        <section className="earlyContent" aria-labelledby="early-title">
          <div className="copyBlock">
            <h1 id="early-title">Built just for your brand</h1>
            <p>Get access to Drip Up early</p>
          </div>

          <div className={`flipShell ${submitted ? "isSubmitted" : ""}`}>
            <form
              className="glassForm flipFace flipFront"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <label>
                Name
                <input required type="text" name="name" placeholder="Your name" autoComplete="name" />
              </label>
              <label>
                Email
                <input required type="email" name="email" placeholder="you@brand.com" autoComplete="email" />
              </label>
              <label>
                Phone number
                <input
                  required
                  type="tel"
                  name="phone"
                  defaultValue="+91 "
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="^\\+[0-9][0-9\\s()-]{6,}$"
                  title="Enter an international phone number starting with a country code, for example +91."
                />
              </label>
              <label>
                Brand name
                <input required type="text" name="brand" placeholder="Your brand name" autoComplete="organization" />
              </label>
              <button
                type="submit"
                onMouseEnter={(event) => (event.currentTarget.style.background = INK_SOFT)}
                onMouseLeave={(event) => (event.currentTarget.style.background = INK)}
              >
                Get my early access
              </button>
            </form>

            <div className="glassForm flipFace flipBack" aria-live="polite">
              <p>Perfect, we will be reaching out to you soon !!!</p>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .earlyPage {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          color: ${INK};
          background: linear-gradient(to right, #F0F4FF, #FAFAFA);
          padding: 112px 20px 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pageImage {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .pageImage img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center bottom;
          opacity: 0.84;
          filter: saturate(1.02);
        }

        .imageWash {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(to bottom, rgba(247, 249, 255, 0.56) 0%, rgba(247, 249, 255, 0.34) 42%, rgba(247, 249, 255, 0.62) 100%),
            linear-gradient(to right, rgba(240, 244, 255, 0.34), rgba(250, 250, 250, 0.24));
          backdrop-filter: blur(1.5px);
          -webkit-backdrop-filter: blur(1.5px);
        }

        .earlyContent {
          position: relative;
          z-index: 2;
          width: min(560px, 100%);
          margin: 0 auto;
          display: grid;
          justify-items: center;
          gap: clamp(28px, 5vw, 40px);
          text-align: center;
        }

        .copyBlock h1 {
          margin: 0;
          font-family: ${FONT_HEADING};
          font-size: clamp(3rem, 8vw, 5.9rem);
          font-weight: 500;
          line-height: 0.96;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .copyBlock p {
          margin: 18px 0 0;
          font-family: ${FONT_BODY};
          font-size: clamp(1rem, 2vw, 1.15rem);
          font-weight: 500;
          line-height: 1.5;
          color: ${TEXT_SECONDARY};
        }

        .flipShell {
          position: relative;
          width: min(480px, 100%);
          min-height: 428px;
          perspective: 1400px;
        }

        .flipFace {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          transition:
            transform 0.82s cubic-bezier(0.2, 0.72, 0.2, 1),
            opacity 0.28s ease;
          will-change: transform;
        }

        .flipFront {
          transform: rotateY(0deg);
        }

        .flipBack {
          transform: rotateY(180deg);
        }

        .flipShell.isSubmitted .flipFront {
          transform: rotateY(-180deg);
          opacity: 0;
        }

        .flipShell.isSubmitted .flipBack {
          transform: rotateY(0deg);
          opacity: 1;
        }

        .glassForm {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid ${OUTLINE};
          border-radius: 20px;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9) inset,
            0 28px 80px rgba(20, 34, 70, 0.18),
            0 8px 24px rgba(20, 34, 70, 0.08);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          padding: clamp(22px, 4vw, 34px);
        }

        .glassForm label {
          display: grid;
          gap: 8px;
          margin: 0 0 16px;
          text-align: left;
          font-family: ${FONT_BODY};
          font-size: 15px;
          font-weight: 600;
          line-height: 1.4;
          color: ${INK};
        }

        .glassForm input {
          width: 100%;
          border: 1px solid ${OUTLINE};
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.86);
          padding: 13px 14px;
          font-family: ${FONT_BODY};
          font-size: 15px;
          line-height: 1.4;
          color: ${INK};
          outline: none;
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.82) inset;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .glassForm input:focus {
          border-color: rgba(83, 107, 155, 0.58);
          background: rgba(255, 255, 255, 0.95);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.88) inset,
            0 0 0 4px rgba(83, 107, 155, 0.1);
        }

        .glassForm button {
          width: 100%;
          min-height: 50px;
          border: 0;
          border-radius: 99px;
          background: ${INK};
          color: #F7F9FF;
          font-family: ${FONT_BODY};
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .glassForm button:hover {
          transform: translateY(-1px);
        }

        .flipBack {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }

        .flipBack p {
          max-width: 360px;
          margin: 0;
          font-family: ${FONT_HEADING};
          font-size: clamp(2.4rem, 6vw, 4rem);
          font-style: italic;
          font-weight: 400;
          line-height: 1.03;
          letter-spacing: 0;
          color: ${INK};
          text-wrap: balance;
        }

        @media (max-width: 700px) {
          .earlyPage {
            padding: 104px 18px 42px;
            align-items: flex-start;
          }

          .pageImage img {
            object-position: center bottom;
          }

          .earlyContent {
            gap: 26px;
          }

          .flipShell {
            min-height: 414px;
          }
        }
      `}</style>
    </>
  );
}
