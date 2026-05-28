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
  const cubeRef = useRef(null);
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

  // Line-by-line opacity reveal — IronHill exact method, two lines
  useEffect(() => {
    const container = heroContentRef.current;
    if (!container) return;

    const lines = Array.from(container.querySelectorAll(".reveal-line"));
    if (!lines.length) return;

    // Start invisible
    lines.forEach((l) => { l.style.opacity = 0; });

    async function setup() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: container,
        start: "top 25%",
        end: "center center",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const total = lines.length;
          lines.forEach((line, index) => {
            const a = index / total;
            const b = (index + 1) / total;
            let opacity = 0;
            if (progress >= b) opacity = 1;
            else if (progress >= a) opacity = (progress - a) / (b - a);
            gsap.to(line, { opacity, duration: 0.1, overwrite: true });
          });
        },
      });
    }
    setup();

    return () => {};
  }, []);

  // Cube face roll — pinned, scrub-linked, reversible
  useEffect(() => {
    const cube = cubeRef.current;
    const container = heroContentRef.current;
    if (!cube || !container) return;

    async function setup() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const wordRevealEl = container.querySelector(".cube-front");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "center center",
          end: "+=500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Fade out word-reveal text, fade in cube (same position)
      tl.to(wordRevealEl, { opacity: 0, duration: 0.15 }, 0)
        .to(cube, { opacity: 1, duration: 0.15 }, 0)
        // 2. Wind-up
        .to(cube, { rotationX: -8, ease: "power1.out", duration: 0.15 })
        // 3. Full 90° roll
        .to(cube, { rotationX: 90, ease: "power3.inOut", duration: 0.7 });
    }
    setup();
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


      {/* Logo — above canvas */}
      <div
        style={{
          position: "absolute", top: 32, left: 40, zIndex: 30,
          fontFamily: FONT, fontWeight: 600, fontSize: 15,
          letterSpacing: "0.15em", color: "#1C1C1A",
        }}
      >
        DRIP UP
      </div>

      {/* Heading — z:1, below canvas so it gets dissolved */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: "12vh", pointerEvents: "none" }}>
        <div style={{ width: "100%", maxWidth: 1200, padding: "0 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
        </div>
      </div>{/* end heading wrapper */}

      {/* Panel + CTA — z:3, above image/overlay but below canvas, gets dissolved */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: "36vh" }}>
      <div style={{ width: "100%", maxWidth: 1200, padding: "0 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

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
      </div>{/* end panel inner column */}
      </div>{/* end panel wrapper */}

      {/* hero-content — position absolute, bottom 0, height 125vh */}
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
          zIndex: 30,
          padding: "0 40px",
          textAlign: "center",
        }}
      >
        {/* Word reveal text — same height as cube, text vertically centered */}
        <div
          className="cube-front"
          style={{
            position: "absolute",
            width: "calc(100% - 80px)", maxWidth: 900,
            height: "clamp(120px, 12vw, 160px)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            fontFamily: '"EB Garamond", Georgia, serif', fontStyle: "normal",
            fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 500, lineHeight: 1.3, color: "#1C1C1A",
            textAlign: "center",
          }}
        >
          <div style={{ display: "block", textAlign: "center" }}>
            {"We handle the boring work,".split(" ").map((w, i) => (
              <span key={`l1-${i}`} className="reveal-line" style={{ display: "inline", opacity: 0 }}>{w} </span>
            ))}
          </div>
          <div style={{ display: "block", textAlign: "center" }}>
            {"so you can focus on".split(" ").map((w, i) => (
              <span key={`l2-${i}`} className="reveal-line" style={{ display: "inline", opacity: 0 }}>{w} </span>
            ))}
            <span className="reveal-line" style={{ display: "inline", opacity: 0 }}><em>growing</em></span>
          </div>
        </div>

        {/* Cube — position absolute, same spot as word-reveal, hidden until swap */}
        <div style={{ position: "absolute", perspective: "900px", width: "calc(100% - 80px)", maxWidth: 900, display: "flex", justifyContent: "center" }}>
          <div
            ref={cubeRef}
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(120px, 12vw, 160px)",
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
              opacity: 0,
            }}
          >
            {/* Front face — identical layout to word-reveal div */}
            <div style={{
              position: "absolute", width: "100%", height: "100%",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
              textAlign: "center",
              transform: "rotateX(0deg) translateZ(0px)",
              fontFamily: '"EB Garamond", Georgia, serif', fontStyle: "normal",
              fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 500, lineHeight: 1.3, color: "#1C1C1A",
            }}>
              <span style={{ display: "block" }}>We handle the boring work,</span>
              <span style={{ display: "block" }}>so you can focus on <em>growing</em></span>
            </div>

            {/* Bottom face — same layout */}
            <div style={{
              position: "absolute", width: "100%", height: "100%",
              backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
              textAlign: "center",
              transform: "rotateX(-90deg) translateZ(0px)",
              fontFamily: '"EB Garamond", Georgia, serif', fontStyle: "normal",
              fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 500, lineHeight: 1.3, color: "#1C1C1A",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ display: "block", textAlign: "center" }}>Drip Up plugs into your Shopify store<br />and takes over all the repetitive tasks.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
