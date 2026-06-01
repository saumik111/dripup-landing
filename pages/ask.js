import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PageTransition from "@/components/PageTransition";

const MAX_MESSAGES_PER_DAY = 10;
const COUNT_KEY = "dripup_ask_count";
const DATE_KEY = "dripup_ask_date";

const INK = "#111318";
const INK_SOFT = "#252832";
const TEXT_MUTED = "#667386";
const TEXT_SECONDARY = "#4F5B6B";
const SURFACE_TEXT = "#F7F9FF";
const ACCENT = "#536B9B";
const OUTLINE = "rgba(214,224,242,0.78)";
const FONT_HEADING = '"EB Garamond", Georgia, serif';
const FONT_BODY = '"Inter", sans-serif';


// OPENING MESSAGE placeholder: replace this exact text when the launch copy is finalized.
const OPENING_MESSAGE =
  "Hey, glad you're here. We're building a way for D2C sellers to manage their entire store simply by chatting, no dashboards, no tools, just conversations. What would you like to know about what I can do?";


function createMessage(role, text, action = null) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    text,
    action,
  };
}

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readRemainingMessages() {
  if (typeof window === "undefined") return MAX_MESSAGES_PER_DAY;

  const today = getLocalDateKey();
  const storedDate = window.localStorage.getItem(DATE_KEY);
  const storedCount = Number(window.localStorage.getItem(COUNT_KEY));

  if (storedDate !== today || Number.isNaN(storedCount)) {
    window.localStorage.setItem(DATE_KEY, today);
    window.localStorage.setItem(COUNT_KEY, String(MAX_MESSAGES_PER_DAY));
    return MAX_MESSAGES_PER_DAY;
  }

  return Math.max(0, Math.min(MAX_MESSAGES_PER_DAY, storedCount));
}

function storeRemainingMessages(count) {
  const nextCount = Math.max(0, Math.min(MAX_MESSAGES_PER_DAY, count));
  window.localStorage.setItem(DATE_KEY, getLocalDateKey());
  window.localStorage.setItem(COUNT_KEY, String(nextCount));
  return nextCount;
}


async function getAiReply(messages, userText) {
  const response = await fetch("/api/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages, userText }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Ask request failed");
  }

  return {
    text: payload.text || "I could not answer that from here right now. Try again in a moment.",
    action: payload.action || null,
  };
}

export default function Ask() {
  const [messages, setMessages] = useState(() => [createMessage("ai", OPENING_MESSAGE)]);
  const [input, setInput] = useState("");
  const [remainingMessages, setRemainingMessages] = useState(MAX_MESSAGES_PER_DAY);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);
  const transitionRef = useRef(null);

  useEffect(() => {
    setRemainingMessages(readRemainingMessages());
    // Play reverse transition to reveal the page
    if (transitionRef.current) {
      transitionRef.current.reverse();
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanInput = input.trim();
    if (!cleanInput || isLoading || remainingMessages <= 0) return;

    const nextRemaining = storeRemainingMessages(remainingMessages - 1);
    const userMessage = createMessage("user", cleanInput);
    const previousMessages = messages;

    setInput("");
    setRemainingMessages(nextRemaining);
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setIsLoading(true);

    try {
      const aiReply = await getAiReply(previousMessages, cleanInput);
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("ai", aiReply.text, aiReply.action),
      ]);
    } catch (error) {
      console.error("Ask DripUp request error:", error);
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage(
          "ai",
          "I could not answer that from here right now. Try again in a moment, or use the founder contact path if this is urgent.",
          "contact_founder",
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  const hasMessagesLeft = remainingMessages > 0;

  return (
    <>
      <PageTransition ref={transitionRef} />
      <Head>
        <title>Ask Drip Up | Drip Up</title>
        <meta
          name="description"
          content="Ask Drip Up what it can do for your e-commerce store."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav className="askNav" aria-label="Ask Drip Up navigation">
        <Link href="/" className="askLogo">
          Drip Up
        </Link>
        <Link href="/" className="backLink">
          <span aria-hidden="true">{"\u2190"}</span> Back to home
        </Link>
      </nav>

      <main className="askPage">
        <div className="chatFrame">
          <section className="messageColumn" aria-label="Ask Drip Up chat">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`messageRow ${message.role === "user" ? "messageRowUser" : "messageRowAi"}`}
              >
                <div className={message.role === "user" ? "userMessage" : "aiMessage"}>
                  {message.text}
                  {message.action && <ActionLink action={message.action} />}
                </div>
              </article>
            ))}

            {isLoading && (
              <article className="messageRow messageRowAi" aria-live="polite">
                <div className="typingIndicator" aria-label="Drip Up is typing">
                  <span />
                  <span />
                  <span />
                </div>
              </article>
            )}

            <div ref={bottomRef} />
          </section>
        </div>
      </main>

      <footer className="inputDock" aria-label="Ask Drip Up input">
        <div className="inputDockInner">
          {hasMessagesLeft ? (
            <>
              <p className="messageCount">
                {remainingMessages} {remainingMessages === 1 ? "message" : "messages"} left today
              </p>
              <form className="inputPill" onSubmit={handleSubmit}>
                <input
                  aria-label="Message"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="tell me ..."
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={isLoading || !input.trim()}
                >
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V5M12 5L6.5 10.5M12 5L17.5 10.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </>
          ) : (
            <p className="outOfMessages">You are out of messages for today</p>
          )}
        </div>
      </footer>

      <style jsx global>{`
        .askNav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 64px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 0 40px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .askLogo {
          font-family: ${FONT_BODY};
          font-weight: 200;
          font-size: 13px;
          letter-spacing: 0.15em;
          color: ${INK};
          text-decoration: none;
          text-transform: uppercase;
          flex: 0 0 auto;
        }

        .backLink {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: ${FONT_BODY};
          font-weight: 400;
          font-size: 13px;
          line-height: 1;
          color: ${TEXT_SECONDARY};
          text-decoration: none;
          white-space: nowrap;
          min-width: 0;
          min-height: 36px;
          border-radius: 99px;
          padding: 0 18px;
          background: ${INK};
          color: ${SURFACE_TEXT};
          font-weight: 600;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease;
        }

        .backLink:hover {
          background: ${INK_SOFT};
          color: ${SURFACE_TEXT};
          transform: translateY(-1px);
        }

        .askPage {
          min-height: 100vh;
          color: ${INK};
          background: linear-gradient(to right, #F0F4FF, #FAFAFA);
          background-attachment: fixed;
        }

        .chatFrame {
          position: relative;
          width: min(980px, calc(100vw - 48px));
          min-height: 100vh;
          margin: 0 auto;
        }

        .chatFrame::before,
        .chatFrame::after {
          content: "";
          position: absolute;
          top: 64px;
          bottom: 0;
          width: 1px;
          border-left: 1px dashed rgba(83, 107, 155, 0.22);
          pointer-events: none;
        }

        .chatFrame::before {
          left: 0;
        }

        .chatFrame::after {
          right: 0;
        }

        .messageColumn {
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
          padding: 96px 24px 160px;
        }

        .messageRow {
          display: flex;
          margin: 0 0 30px;
        }

        .messageRowAi {
          justify-content: flex-start;
        }

        .messageRowUser {
          justify-content: flex-end;
        }

        .aiMessage {
          max-width: 85%;
          white-space: pre-wrap;
          font-family: ${FONT_HEADING};
          font-weight: 400;
          font-size: 18px;
          line-height: 1.7;
          color: ${INK};
          overflow-wrap: anywhere;
        }

        .userMessage {
          max-width: 82%;
          white-space: pre-wrap;
          font-family: ${FONT_BODY};
          font-weight: 500;
          font-size: 15px;
          line-height: 1.45;
          color: ${SURFACE_TEXT};
          background: ${INK};
          padding: 10px 18px;
          border-radius: 18px 18px 4px 18px;
          overflow-wrap: anywhere;
        }

        .actionLink {
          width: fit-content;
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 40px;
          border-radius: 99px;
          border: 1px solid ${OUTLINE};
          background: rgba(255, 255, 255, 0.42);
          color: ${INK};
          padding: 9px 16px;
          font-family: ${FONT_BODY};
          font-size: 13px;
          line-height: 1;
          font-weight: 600;
          text-decoration: none;
          transition:
            background 0.22s ease,
            border-color 0.22s ease,
            color 0.22s ease;
        }

        .actionLink:hover {
          background: ${INK_SOFT};
          border-color: ${INK_SOFT};
          color: ${SURFACE_TEXT};
        }

        .typingIndicator {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 31px;
        }

        .typingIndicator span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${ACCENT};
          opacity: 0.35;
          animation: dripupTyping 1.15s ease-in-out infinite;
        }

        .typingIndicator span:nth-child(2) {
          animation-delay: 0.16s;
        }

        .typingIndicator span:nth-child(3) {
          animation-delay: 0.32s;
        }

        .inputDock {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          z-index: 90;
          padding: 24px 24px 18px;
          background: linear-gradient(
            to top,
            rgba(250, 250, 250, 0.97) 0%,
            rgba(250, 250, 250, 0.92) 68%,
            rgba(250, 250, 250, 0) 100%
          );
        }

        .inputDockInner {
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
        }

        .messageCount {
          margin: 0 0 10px;
          text-align: right;
          font-family: ${FONT_BODY};
          font-weight: 400;
          font-size: 12px;
          line-height: 1.35;
          color: ${TEXT_MUTED};
        }

        .inputPill {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: 100%;
          min-height: 60px;
          border: 1px solid rgba(205, 218, 240, 0.95);
          border-radius: 99px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(247, 250, 255, 0.9) 100%);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 8px 9px 8px 20px;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.94) inset,
            0 18px 44px rgba(42, 58, 95, 0.14),
            0 4px 14px rgba(42, 58, 95, 0.08);
        }

        .inputPill input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          font-family: ${FONT_BODY};
          font-weight: 400;
          font-size: 15px;
          line-height: 1.4;
          color: ${INK};
        }

        .inputPill input::placeholder {
          color: #7A8798;
        }

        .inputPill button {
          width: 44px;
          height: 44px;
          flex: 0 0 44px;
          border: 0;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: ${INK};
          color: ${SURFACE_TEXT};
          cursor: pointer;
          transition:
            background 0.2s ease,
            opacity 0.2s ease,
            transform 0.2s ease;
        }

        .inputPill button:hover:not(:disabled) {
          background: ${INK_SOFT};
          transform: translateY(-1px);
        }

        .inputPill button:disabled {
          opacity: 1;
          cursor: default;
        }

        .outOfMessages {
          min-height: 60px;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ${FONT_BODY};
          font-weight: 400;
          font-size: 14px;
          line-height: 1.45;
          color: ${TEXT_MUTED};
          text-align: center;
        }

        @keyframes dripupTyping {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.32;
          }
          40% {
            transform: translateY(-5px);
            opacity: 0.9;
          }
        }

        @media (max-width: 700px) {
          .askNav {
            padding: 0 18px;
            gap: 12px;
          }

          .backLink {
            min-height: 34px;
            padding: 0 13px;
            font-size: 12px;
          }

          .chatFrame {
            width: 100%;
          }

          .chatFrame::before,
          .chatFrame::after {
            display: none;
          }

          .messageColumn {
            padding: 92px 20px 152px;
          }

          .messageRow {
            margin-bottom: 24px;
          }

          .aiMessage {
            max-width: 94%;
            font-size: 17px;
            line-height: 1.68;
          }

          .userMessage {
            max-width: 88%;
            font-size: 14px;
            padding: 10px 16px;
          }

          .inputDock {
            padding: 22px 18px 14px;
          }

          .messageCount {
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}

function ActionLink({ action }) {
  const href = action === "contact_founder" ? "/founder" : "/demo";
  const label = action === "contact_founder" ? "Contact the founder" : "Book demo";

  return (
    <Link href={href} className="actionLink">
      {label}
    </Link>
  );
}
