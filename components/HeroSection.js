import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroCanvas from "@/components/HeroCanvas";

const FONT = '"Figtree", sans-serif';

const SWAPPING_WORDS = ["shopify store", "online store"];

function setLetters(container, word) {
  container.innerHTML = word
    .split("")
    .map((ch) => `<span style="display:inline-block">${ch === " " ? " " : ch}</span>`)
    .join("");
  return Array.from(container.querySelectorAll("span"));
}

const chatItems = [
  { prompt: "List this product", response: "Listed your product across your store." },
  { prompt: "What are my sales today?", response: "You've made ₹14,200 across 8 orders today." },
  { prompt: "Generate a product image", response: "Studio-quality image ready to publish." },
  { prompt: "Update price to ₹1,299", response: "Price updated on all variants." },
];

export default function HeroSection({ videoRef }) {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const promptRef = useRef(null);
  const responseRef = useRef(null);
  const rightImageRef = useRef(null);
  const swapRef = useRef(null);
  const headingRef = useRef(null);

  // Word swap + one-time entrance animation
  useEffect(() => {
    const container = swapRef.current;
    const heading = headingRef.current;
    if (!container || !heading) return;

    let killed = false;
    let idx = 0;

    // Measure all words invisibly, average widths, lock container permanently
    const widths = SWAPPING_WORDS.map((word) => {
      const letters = setLetters(container, word);
      gsap.set(letters, { opacity: 0 });
      return container.offsetWidth;
    });
    const avgWidth = widths.reduce((a, b) => a + b, 0) / widths.length;
    container.innerHTML = "";
    container.style.width = avgWidth + "px";
    container.style.flexShrink = "0";

    // playWord — normal loop cycle (enter → hold → dip → exit → repeat)
    function playWord() {
      if (killed) return;
      const word = SWAPPING_WORDS[idx];
      const letters = setLetters(container, word);
      gsap.set(letters, { y: 20, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          if (killed) return;
          idx = (idx + 1) % SWAPPING_WORDS.length;
          playWord();
        },
      });

      tl
        .to(letters, { y: 0, opacity: 1, duration: 0.38, ease: "power3.out", stagger: 0.05 })
        .to({}, { duration: 3.2 })
        .to(letters, { y: 5, duration: 0.14, ease: "power1.in", stagger: 0 })
        .to(letters, { y: -24, opacity: 0, duration: 0.28, ease: "power2.in", stagger: 0.04 });
    }

    // holdThenLoop — first word already visible, skip enter, go straight to hold
    function holdThenLoop() {
      if (killed) return;
      const word = SWAPPING_WORDS[idx];
      const letters = Array.from(container.querySelectorAll("span"));

      const tl = gsap.timeline({
        onComplete: () => {
          if (killed) return;
          idx = (idx + 1) % SWAPPING_WORDS.length;
          playWord();
        },
      });

      tl
        .to({}, { duration: 2.5 })
        .to(letters, { y: 5, duration: 0.14, ease: "power1.in", stagger: 0 })
        .to(letters, { y: -24, opacity: 0, duration: 0.28, ease: "power2.in", stagger: 0.04 });
    }

    // One-time entrance — collect all [data-word] spans in DOM order
    // This includes: Grow, &, manage, your, [swapRef], simply, by, chatting
    gsap.set(heading, { opacity: 1 });

    // Set first word into container, hidden
    setLetters(container, SWAPPING_WORDS[0]);
    const allWords = Array.from(heading.querySelectorAll("span[data-word]"));
    gsap.set(allWords, { y: 48, opacity: 0 });

    gsap.to(allWords, {
      y: 0,
      opacity: 1,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.08,
      delay: 0.2,
      onComplete: () => { if (!killed) holdThenLoop(); },
    });

    return () => { killed = true; };
  }, []);

  // Word-by-word reveal on hero-content — exact transcript method
  useEffect(() => {
    const container = heroContentRef.current;
    if (!container) return;

    const h2 = container.querySelector("h2");
    if (!h2) return;

    const MUTED = "#C8C4BC";
    const DARK  = "#1C1C1A";

    // Preserve <br> line breaks while splitting into word spans
    const rawHTML = h2.innerHTML;
    const lines = rawHTML.split(/<br\s*\/?>/i);
    h2.innerHTML = lines.map((line) =>
      line.trim().split(/\s+/).filter(Boolean)
        .map((w) => `<span style="display:inline-block;color:${MUTED}">${w}</span>`)
        .join(" ")
    ).join("<br />");
    const wordEls = Array.from(h2.querySelectorAll("span"));

    async function setup() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: container,
        start: "top 30%",
        end: "top -20%",
        onUpdate(self) {
          const progress = self.progress;
          const total = wordEls.length;
          wordEls.forEach((word, i) => {
            const a = i / total;
            const b = (i + 1) / total;
            let t = 0;
            if (progress >= b) t = 1;
            else if (progress >= a) t = (progress - a) / (b - a);
            // Smooth color interpolation between muted and dark
            const r = Math.round(200 + (28 - 200) * t);
            const g = Math.round(196 + (28 - 196) * t);
            const bv = Math.round(188 + (26 - 188) * t);
            word.style.color = `rgb(${r},${g},${bv})`;
          });
        },
      });
    }
    setup();

    return () => {};
  }, []);

  // Glass panel chat loop
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    function buildCycle(item) {
      tl.set([promptRef.current, responseRef.current, rightImageRef.current], { opacity: 0, y: 12 })
        .call(() => {
          if (promptRef.current) promptRef.current.textContent = item.prompt;
          if (responseRef.current) responseRef.current.textContent = item.response;
        })
        .to(promptRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(rightImageRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, "<")
        .to(responseRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "+=0.3")
        .to({}, { duration: 2 })
        .to([promptRef.current, responseRef.current, rightImageRef.current], { opacity: 0, duration: 0.4, ease: "power2.in" });
    }

    chatItems.forEach((item) => buildCycle(item));
    return () => tl.kill();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{ position: "relative", width: "100%", height: "175vh", overflow: "hidden" }}
    >
      {/* Background image — scrolls with the section */}
      <img
        ref={videoRef}
        src="/images/hero-bg.png"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", zIndex: 1 }} />

      {/* Dissolve canvas — positioned at BOTTOM of hero, one viewport tall */}
      <HeroCanvas heroRef={heroRef} />


      {/* Content — pinned to first viewport, exact source: hero-header is position:absolute height:100vh */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

      {/* Logo */}
      <div
        style={{
          position: "absolute", top: 32, left: 40, zIndex: 10,
          fontFamily: FONT, fontWeight: 600, fontSize: 15,
          letterSpacing: "0.15em", color: "#1C1C1A",
        }}
      >
        DRIP UP
      </div>

      {/* Main content column */}
      <div
        style={{
          position: "relative", zIndex: 10, width: "100%", maxWidth: 1200,
          padding: "0 40px", display: "flex", flexDirection: "column",
          alignItems: "center", gap: 24,
        }}
      >
        <h1
          ref={headingRef}
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontStyle: "normal",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 500,
            lineHeight: 1.15,
            color: "#1C1C1A",
            textAlign: "center",
            maxWidth: "min(95vw, 960px)",
            marginLeft: "auto",
            marginRight: "auto",
            opacity: 0,
          }}
        >
          {/* Line 1 — each word is its own span for entrance stagger */}
          <span style={{ display: "flex", justifyContent: "center", alignItems: "baseline", whiteSpace: "nowrap" }}>
            {["Grow", "&", "manage", "your"].map((w, i) => (
              <span key={i} data-word style={{ display: "inline-block" }}>
                {w}&nbsp;
              </span>
            ))}
            <span
              ref={swapRef}
              data-word
              style={{ display: "inline-block", verticalAlign: "bottom" }}
            />
          </span>
          {/* Line 2 — each word is its own span */}
          <span style={{ display: "flex", justifyContent: "center", alignItems: "baseline", whiteSpace: "nowrap", marginTop: "0.1em" }}>
            {["simply", "by", "chatting"].map((w, i) => (
              <span key={i} data-word style={{ display: "inline-block" }}>
                {i < 2 ? <>{w}&nbsp;</> : w}
              </span>
            ))}
          </span>
        </h1>

        {/* Glass panel */}
        <div
          style={{
            width: "100%", maxWidth: 860,
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.28)",
            borderRadius: 20,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.10)",
            padding: "40px 40px",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 32, minHeight: 280,
          }}
        >
          {/* Left — chat */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                ref={promptRef}
                style={{
                  background: "#1A3D35", color: "#F5F0E8",
                  borderRadius: "16px 16px 4px 16px", padding: "10px 16px",
                  fontFamily: FONT, fontSize: 15, fontWeight: 500,
                  maxWidth: "80%", opacity: 0,
                }}
              >
                List this product
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                ref={responseRef}
                style={{
                  background: "rgba(255,255,255,0.7)", color: "#1C1C1A",
                  borderRadius: "16px 16px 16px 4px", padding: "10px 16px",
                  fontFamily: FONT, fontSize: 15, fontWeight: 500,
                  maxWidth: "80%", opacity: 0,
                  border: "0.5px solid rgba(200,195,185,0.5)",
                }}
              >
                Listed your product across your store.
              </div>
            </div>
          </div>

          {/* Right — synced product UI */}
          <div
            ref={rightImageRef}
            style={{
              background: "rgba(255,255,255,0.55)",
              border: "0.5px solid rgba(200,195,185,0.5)",
              borderRadius: 16, display: "flex", alignItems: "center",
              justifyContent: "center", opacity: 0, minHeight: 180,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: 24, width: "100%" }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "100%", height: 36, background: "rgba(26,61,53,0.08)",
                    borderRadius: 8, display: "flex", alignItems: "center",
                    padding: "0 12px", gap: 8,
                  }}
                >
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: "rgba(26,61,53,0.15)" }} />
                  <div style={{ flex: 1, height: 8, background: "rgba(26,61,53,0.12)", borderRadius: 4 }} />
                  <div style={{ width: 48, height: 20, borderRadius: 99, background: "#1A3D35", opacity: 0.85 }} />
                </div>
              ))}
              <div
                style={{
                  marginTop: 4, width: "100%", height: 32, borderRadius: 8,
                  background: "#1A3D35", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "#F5F0E8",
                  fontSize: 12, fontWeight: 500, fontFamily: FONT,
                }}
              >
                Ready to publish
              </div>
            </div>
          </div>
        </div>

        {/* CTA chat input bar */}
        <a
          href="/demo"
          style={{
            display: "flex", alignItems: "center", width: "100%", maxWidth: 600,
            height: 52, background: "rgba(245, 240, 232, 0.75)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            border: "0.5px solid rgba(200, 195, 185, 0.5)",
            borderRadius: 99, padding: "0 20px", cursor: "text",
            textDecoration: "none", gap: 10,
          }}
        >
          <span style={{ flex: 1, fontFamily: FONT, fontSize: 15, fontWeight: 500, color: "#6B6860", userSelect: "none" }}>
            Tell me what….
          </span>
          <div
            style={{
              width: 32, height: 32, borderRadius: 99, background: "#1A3D35",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 12V2M2 7l5-5 5 5" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>
      </div>{/* end main content column */}
      </div>{/* end content wrapper */}

      {/* hero-content — exact source: position absolute, bottom 0, height 125vh */}
      <div
        ref={heroContentRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "125vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          padding: "0 40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontStyle: "normal",
            fontSize: "clamp(32px, 4.5vw, 64px)",
            fontWeight: 500,
            lineHeight: 1.2,
            color: "#1C1C1A",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          We handle the boring work,<br />so you can focus on growing
        </h2>
      </div>
    </section>
  );
}
