import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TAGS = [
  "List this product",
  "Update the price",
  "Reply to this customer",
  "Write a product description",
  "Restock this SKU",
  "Fix this image",
  "Check my orders",
  "Update my inventory",
  "Create a discount code",
  "Add size guide",
  "Fix SEO title",
  "Reply to review",
  "Generate product photo",
  "Check my analytics",
  "Upload new variant",
];

const TAG_POSITIONS = [
  { x: -38, y: -42, rotate: -8 },
  { x: 32, y: -48, rotate: 5 },
  { x: -55, y: -20, rotate: -12 },
  { x: 48, y: -18, rotate: 9 },
  { x: -42, y: 10, rotate: 6 },
  { x: 44, y: 14, rotate: -7 },
  { x: -30, y: 38, rotate: 11 },
  { x: 28, y: 42, rotate: -5 },
  { x: -58, y: 28, rotate: -14 },
  { x: 55, y: 32, rotate: 4 },
  { x: -18, y: -56, rotate: -3 },
  { x: 16, y: -60, rotate: 7 },
  { x: -62, y: -5, rotate: -10 },
  { x: 60, y: -2, rotate: 8 },
  { x: 0, y: 58, rotate: -6 },
];

export default function ProblemSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const tagsContainerRef = useRef(null);
  const tagRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const tags = tagRefs.current;

    // Set initial state — tags invisible at centre
    gsap.set(tags, { opacity: 0, x: 0, y: 0, scale: 0.6, rotation: 0 });

    // Trigger 1 — scatter tags out from centre
    ScrollTrigger.create({
      trigger: section,
      start: "top 40%",
      once: true,
      onEnter: () => {
        tags.forEach((tag, i) => {
          const pos = TAG_POSITIONS[i % TAG_POSITIONS.length];
          gsap.to(tag, {
            opacity: 1,
            x: `${pos.x}vw`,
            y: `${pos.y}vh`,
            scale: 1,
            rotation: pos.rotate,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.04,
          });
        });
      },
    });

    // Trigger 2 — explosion out + fade section
    ScrollTrigger.create({
      trigger: section,
      start: "80% center",
      once: true,
      onEnter: () => {
        tags.forEach((tag, i) => {
          const angle = (i / tags.length) * Math.PI * 2;
          const dist = 160 + Math.random() * 60;
          gsap.to(tag, {
            x: Math.cos(angle) * dist + "vw",
            y: Math.sin(angle) * dist + "vh",
            opacity: 0,
            scale: 0.4,
            duration: 0.55,
            ease: "power3.in",
            delay: i * 0.02,
          });
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#F5F0E8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "128px 40px",
        overflow: "hidden",
      }}
    >
      {/* Headline */}
      <div
        ref={headlineRef}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: '"Figtree", sans-serif',
            fontSize: "clamp(32px, 4.5vw, 64px)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: "#1C1C1A",
          }}
        >
          Your ambitions can&apos;t wait
        </h2>
        <h2
          style={{
            fontFamily: '"Figtree", sans-serif',
            fontSize: "clamp(32px, 4.5vw, 64px)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: "#6B6860",
            marginTop: 8,
          }}
        >
          But admin work eats your entire day
        </h2>
      </div>

      {/* Tags layer — absolute, centred, positioned relative to centre */}
      <div
        ref={tagsContainerRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {TAGS.map((tag, i) => (
          <div
            key={tag}
            ref={(el) => (tagRefs.current[i] = el)}
            style={{
              position: "absolute",
              background: "#1A3D35",
              color: "#F5F0E8",
              borderRadius: 4,
              padding: "6px 14px",
              fontFamily: '"Figtree", sans-serif',
              fontSize: 13,
              fontWeight: 500,
              whiteSpace: "nowrap",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </section>
  );
}
