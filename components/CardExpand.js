import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CardExpand() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    // Center the card initially
    gsap.set(card, { xPercent: -50, yPercent: -50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=700",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    // Expand from card shape to full screen
    tl.to(card, {
      width: "100vw",
      height: "100vh",
      top: "0%",
      left: "0%",
      xPercent: 0,
      yPercent: 0,
      borderRadius: 0,
      ease: "power2.inOut",
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#F5F0E8", // cream outside the card
        overflow: "hidden",
      }}
    >
      {/* Card — starts as card shape, clips image inside, expands to full screen */}
      <div
        ref={cardRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "65%",
          height: "60%",
          borderRadius: "1rem",
          overflow: "hidden", // this is the clipping mask
          boxShadow: "0 4px 40px rgba(28,28,26,0.12)",
          border: "1px solid rgba(200,195,185,0.4)",
        }}
      >
        {/* Hero image — fills the card, expands with it */}
        <img
          src="/images/hero-bg.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </section>
  );
}
