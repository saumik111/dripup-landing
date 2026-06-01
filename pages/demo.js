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
  const [phone, setPhone] = useState("+91 ");
  const [errors, setErrors] = useState({});

  function handlePhoneChange(event) {
    const rawValue = event.target.value;
    const startsWithPlus = rawValue.trim().startsWith("+");
    const digits = rawValue.replace(/\D/g, "");
    const nextValue = `${startsWithPlus || digits ? "+" : ""}${digits}`.replace(/^\+91/, "+91 ");

    setPhone(nextValue);
    setErrors((currentErrors) => ({ ...currentErrors, phone: "" }));
  }

  function validatePhone(value) {
    const compactValue = value.replace(/\s/g, "");
    const digits = compactValue.replace(/\D/g, "");

    if (!digits) return "Phone number is required";
    if (!compactValue.startsWith("+")) return "Start with country code";
    if (digits.startsWith("91") && digits.length !== 12) return "Use +91 and 10 digits";
    if (digits.length < 8 || digits.length > 15) return "Enter a valid phone number";
    return "";
  }

  function validateEmail(value) {
    const email = value.trim();

    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email";
    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextErrors = {
      name: formData.get("name")?.toString().trim() ? "" : "Name is required",
      email: validateEmail(formData.get("email")?.toString() || ""),
      phone: validatePhone(phone),
      brand: formData.get("brand")?.toString().trim() ? "" : "Brand name is required",
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitted(true);
  }

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

        <section className="earlyContent" aria-labelledby="early-title">
          <div className="copyBlock">
            <h1 id="early-title">
              <span>Built just for </span>
              <em>your brand</em>
            </h1>
            <p>Get access to Drip Up early</p>
          </div>

          <div className={`flipShell ${submitted ? "isSubmitted" : ""}`}>
            <form
              className="glassForm flipFace flipFront"
              noValidate
              onSubmit={handleSubmit}
            >
              <label className={errors.name ? "hasError" : ""}>
                Name
                <input
                  required
                  type="text"
                  name="name"
                  placeholder={errors.name || "Your name"}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  onChange={() => setErrors((currentErrors) => ({ ...currentErrors, name: "" }))}
                />
                {errors.name && <span className="fieldError">{errors.name}</span>}
              </label>
              <label className={errors.email ? "hasError" : ""}>
                Email
                <input
                  required
                  type="email"
                  name="email"
                  placeholder={errors.email || "you@brand.com"}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  onChange={() => setErrors((currentErrors) => ({ ...currentErrors, email: "" }))}
                />
                {errors.email && <span className="fieldError">{errors.email}</span>}
              </label>
              <label className={errors.phone ? "hasError" : ""}>
                Phone number
                <input
                  required
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={errors.phone || "+91 98765 43210"}
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <span className="fieldError">{errors.phone}</span>}
              </label>
              <label className={errors.brand ? "hasError" : ""}>
                Brand name
                <input
                  required
                  type="text"
                  name="brand"
                  placeholder={errors.brand || "Your brand name"}
                  autoComplete="organization"
                  aria-invalid={Boolean(errors.brand)}
                  onChange={() => setErrors((currentErrors) => ({ ...currentErrors, brand: "" }))}
                />
                {errors.brand && <span className="fieldError">{errors.brand}</span>}
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
              <p>Perfect, we will reach out to you soon !!!</p>
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
          padding: 110px 20px 58px;
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
          opacity: 1;
          filter: saturate(1.04);
        }

        .earlyContent {
          position: relative;
          z-index: 1;
          width: min(560px, 100%);
          margin: 0 auto;
          display: grid;
          justify-items: center;
          gap: clamp(26px, 4.5vw, 38px);
          text-align: center;
        }

        .copyBlock h1 {
          margin: 0;
          font-family: ${FONT_HEADING};
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .copyBlock h1 span,
        .copyBlock h1 em {
          display: inline;
        }

        .copyBlock h1 em {
          font-style: italic;
          font-weight: 500;
          font-size: inherit;
          line-height: inherit;
        }

        .copyBlock p {
          margin: 22px 0 0;
          font-family: ${FONT_BODY};
          font-size: clamp(1rem, 2vw, 1.15rem);
          font-weight: 500;
          line-height: 1.5;
          color: ${TEXT_SECONDARY};
        }

        .flipShell {
          position: relative;
          width: min(480px, 100%);
          min-height: 548px;
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
          background: linear-gradient(to right, rgba(240, 244, 255, 0.97), rgba(250, 250, 250, 0.97));
          border: 1px solid rgba(214, 224, 242, 0.92);
          border-radius: 20px;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9) inset,
            0 28px 80px rgba(20, 34, 70, 0.2),
            0 8px 24px rgba(20, 34, 70, 0.1);
          padding: clamp(24px, 4vw, 36px);
        }

        .glassForm label {
          display: grid;
          gap: 8px;
          margin: 0 0 18px;
          text-align: left;
          font-family: ${FONT_BODY};
          font-size: 15px;
          font-weight: 600;
          line-height: 1.4;
          color: ${INK};
        }

        .glassForm input {
          width: 100%;
          border: 1px solid rgba(205, 218, 240, 0.96);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.88);
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

        .glassForm .hasError input {
          border-color: rgba(210, 70, 72, 0.62);
          background: rgba(255, 255, 255, 0.96);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.88) inset,
            0 0 0 4px rgba(210, 70, 72, 0.08);
        }

        .glassForm .hasError input::placeholder {
          color: rgba(156, 45, 47, 0.84);
        }

        .fieldError {
          margin-top: -2px;
          font-family: ${FONT_BODY};
          font-size: 12px;
          font-weight: 500;
          line-height: 1.35;
          color: rgba(156, 45, 47, 0.9);
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
          margin-top: 4px;
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
          font-size: clamp(2.35rem, 5.8vw, 3.9rem);
          font-style: italic;
          font-weight: 400;
          line-height: 1.03;
          letter-spacing: 0;
          color: ${INK};
          text-wrap: balance;
        }

        @media (max-width: 700px) {
          .earlyPage {
            padding: 100px 18px 40px;
            align-items: flex-start;
          }

          .pageImage img {
            object-position: center bottom;
          }

          .earlyContent {
            gap: 26px;
          }

          .flipShell {
            min-height: 540px;
          }

        }
      `}</style>
    </>
  );
}
