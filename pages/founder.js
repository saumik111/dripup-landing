import Head from "next/head";
import BackNavbar from "@/components/BackNavbar";
import { useDesignLabValue } from "@/components/DesignLab";

const INK = "#111318";
const INK_SOFT = "#252832";
const TEXT_SECONDARY = "#4F5B6B";
const OUTLINE = "rgba(214,224,242,0.78)";
const FONT_HEADING = '"EB Garamond", Georgia, serif';
const FONT_BODY = '"Inter", sans-serif';

const contactOptions = [
  {
    label: "WhatsApp",
    value: "+91 89745 43406",
    href: "https://wa.me/918974543406",
    external: true,
    accent: "#25D366",
    icon: "whatsapp",
  },
  {
    label: "LinkedIn",
    value: "saumik-modak",
    href: "https://www.linkedin.com/in/saumik-modak-3a791b274/",
    external: true,
    accent: "#0A66C2",
    icon: "linkedin",
  },
  {
    label: "Phone",
    value: "+91 89745 43406",
    href: "tel:+918974543406",
    external: false,
    accent: INK,
    icon: "phone",
  },
  {
    label: "Email",
    value: "saumikmodak97@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=saumikmodak97@gmail.com",
    external: true,
    accent: "#536B9B",
    icon: "email",
  },
];

export default function Founder() {
  const headingSize = useDesignLabValue("founder", "headingSize", "clamp(2rem, 4vw, 3.5rem)");
  const pageBg = useDesignLabValue("founder", "pageBg", "linear-gradient(to right, #F0F4FF, #FAFAFA)");
  const cardBg = useDesignLabValue("founder", "cardBg", "linear-gradient(to right, rgba(240, 244, 255, 0.94), rgba(250, 250, 250, 0.96))");
  const cardRadius = useDesignLabValue("founder", "cardRadius", 18);
  const cardGap = useDesignLabValue("founder", "cardGap", 16);
  const headingBefore = useDesignLabValue("founder", "headingBefore", "I'd love to hear ");
  const headingItalic = useDesignLabValue("founder", "headingItalic", "from you!");
  const labelOverrides = {
    WhatsApp: useDesignLabValue("founder", "whatsappLabel", "WhatsApp"),
    LinkedIn: useDesignLabValue("founder", "linkedinLabel", "LinkedIn"),
    Phone: useDesignLabValue("founder", "phoneLabel", "Phone"),
    Email: useDesignLabValue("founder", "emailLabel", "Email"),
  };

  return (
    <>
      <Head>
        <title>Contact the founder | Drip Up</title>
        <meta name="description" content="Reach Saumik directly through WhatsApp, LinkedIn, or phone." />
      </Head>

      <BackNavbar fallbackHref="/" />

      <main className="founderPage">
        <section className="founderInner" aria-labelledby="founder-title">
          <h1 id="founder-title">
            {headingBefore}<em>{headingItalic}</em>
          </h1>

          <div className="contactGrid" aria-label="Founder contact options">
            {contactOptions.map((option) => (
              <a
                key={option.label}
                className="contactCard"
                href={option.href}
                target={option.external ? "_blank" : undefined}
                rel={option.external ? "noopener noreferrer" : undefined}
                style={{ "--accent": option.accent }}
              >
                <span className="iconWrap" aria-hidden="true">
                  <ContactIcon type={option.icon} />
                </span>
                <span className="contactText">
                  <span className="contactLabel">{labelOverrides[option.label] || option.label}</span>
                  <span className="contactValue">{option.value}</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        .founderPage {
          min-height: 100vh;
          padding: 136px 20px 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${INK};
          background: ${pageBg};
          background-attachment: fixed;
        }

        .founderInner {
          width: min(980px, 100%);
          margin: 0 auto;
          display: grid;
          justify-items: center;
          gap: clamp(34px, 6vw, 56px);
          text-align: center;
        }

        h1 {
          max-width: 760px;
          margin: 0;
          font-family: ${FONT_HEADING};
          font-size: ${headingSize};
          line-height: 1.15;
          font-weight: 500;
          letter-spacing: 0;
          text-wrap: balance;
        }

        h1 em {
          font-style: italic;
          font-weight: 500;
        }

        .contactGrid {
          width: min(760px, 100%);
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: ${cardGap}px;
        }

        .contactCard {
          min-height: 168px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          padding: 24px 18px;
          border: 1px solid ${OUTLINE};
          border-radius: ${cardRadius}px;
          background: ${cardBg};
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9) inset,
            0 22px 60px rgba(20, 34, 70, 0.12),
            0 6px 18px rgba(20, 34, 70, 0.06);
          color: ${INK};
          text-decoration: none;
          transition:
            transform 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease,
            background 0.22s ease;
        }

        .contactCard:hover {
          transform: translateY(-4px);
          border-color: rgba(83, 107, 155, 0.48);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.94) inset,
            0 30px 76px rgba(20, 34, 70, 0.16),
            0 10px 26px rgba(20, 34, 70, 0.08);
        }

        .iconWrap {
          width: 52px;
          height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          color: var(--accent);
          box-shadow: 0 10px 24px rgba(20, 34, 70, 0.08);
        }

        .iconWrap :global(svg) {
          width: 28px;
          height: 28px;
          display: block;
        }

        .contactText {
          display: grid;
          gap: 7px;
          min-width: 0;
        }

        .contactLabel {
          font-family: ${FONT_BODY};
          font-size: 15px;
          line-height: 1.2;
          font-weight: 700;
          color: ${INK};
        }

        .contactValue {
          font-family: ${FONT_BODY};
          font-size: 13px;
          line-height: 1.35;
          font-weight: 500;
          color: ${TEXT_SECONDARY};
          overflow-wrap: anywhere;
        }

        @media (max-width: 900px) {
          .contactGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .founderPage {
            padding: 112px 18px 48px;
            align-items: flex-start;
          }

          .contactGrid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .contactCard {
            min-height: 92px;
            flex-direction: row;
            justify-content: flex-start;
            gap: 16px;
            padding: 18px;
            text-align: left;
          }

          .iconWrap {
            width: 48px;
            height: 48px;
            flex: 0 0 48px;
          }
        }
      `}</style>
    </>
  );
}

function ContactIcon({ type }) {
  if (type === "whatsapp") {
    return (
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3.2c-7.02 0-12.73 5.7-12.73 12.7 0 2.25.59 4.45 1.72 6.39L3.2 28.8l6.67-1.75a12.72 12.72 0 0 0 6.15 1.57h.01c7.02 0 12.73-5.7 12.73-12.71 0-3.39-1.32-6.58-3.73-8.98a12.63 12.63 0 0 0-9.01-3.73Zm.01 23.27h-.01c-1.86 0-3.69-.5-5.29-1.45l-.38-.23-3.96 1.04 1.06-3.86-.25-.4a10.56 10.56 0 0 1-1.62-5.67c0-5.8 4.69-10.51 10.45-10.51 2.8 0 5.42 1.09 7.4 3.07a10.4 10.4 0 0 1 3.06 7.45c0 5.81-4.69 10.56-10.46 10.56Zm5.73-7.9c-.31-.16-1.85-.91-2.13-1.02-.29-.1-.5-.15-.7.16-.21.31-.8 1.02-.98 1.22-.18.21-.36.23-.67.08-.31-.16-1.32-.49-2.51-1.55-.93-.83-1.56-1.85-1.74-2.16-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.15-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.7-1.7-.96-2.33-.25-.61-.51-.53-.7-.54h-.6c-.21 0-.54.08-.82.39-.28.31-1.08 1.06-1.08 2.58s1.11 2.99 1.26 3.2c.16.21 2.18 3.33 5.29 4.67.74.32 1.32.51 1.77.65.74.24 1.42.2 1.96.12.6-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.36Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M27.2 4H4.8A.8.8 0 0 0 4 4.8v22.4c0 .44.36.8.8.8h22.4a.8.8 0 0 0 .8-.8V4.8a.8.8 0 0 0-.8-.8ZM11.12 24.16H7.56V12.74h3.56v11.42ZM9.34 11.18a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm14.82 12.98h-3.55V18.6c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.65h-3.55V12.74h3.41v1.56h.05c.47-.9 1.64-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.26Z" />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6.5 8.5h19a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 4 21V11a2.5 2.5 0 0 1 2.5-2.5Z" />
        <path d="m5 10 11 8 11-8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.92 25.36c-7.1-2.98-11.3-7.18-14.28-14.28-.64-1.53.08-3.29 1.58-3.96l2.04-.91c1.19-.53 2.59-.12 3.31.97l1.14 1.72c.58.88.52 2.04-.15 2.85l-.85 1.02c1.17 2.36 3.16 4.35 5.52 5.52l1.02-.85c.81-.67 1.97-.73 2.85-.15l1.72 1.14c1.09.72 1.5 2.12.97 3.31l-.91 2.04c-.67 1.5-2.43 2.22-3.96 1.58Z" />
    </svg>
  );
}
