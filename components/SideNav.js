import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ITEMS = [
  { id: "ask", label: "Ask\nDripUp" },
  { id: "try", label: "Try It" },
];

// Vertical positions of each item center within the panel
const ITEM_Y = { ask: 80, try: 180 };

export default function SideNav() {
  const panelRef = useRef(null);
  const bubbleRef = useRef(null);
  const labelRef = useRef(null);
  const [activeId, setActiveId] = useState("ask");
  const isAnimating = useRef(false);

  // Set initial bubble position
  useEffect(() => {
    if (!bubbleRef.current || !panelRef.current) return;
    gsap.set(bubbleRef.current, { y: ITEM_Y["ask"] - 36 }); // center bubble on item
  }, []);

  function handleClick(itemId) {
    if (itemId === activeId || isAnimating.current) return;
    isAnimating.current = true;

    const bubble = bubbleRef.current;
    const label = labelRef.current;
    const targetY = ITEM_Y[itemId] - 36;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setActiveId(itemId);
      },
    });

    tl
      // Phase 1: fade label, deflate bubble slightly
      .to(label, { opacity: 0, duration: 0.12, ease: "power2.in" }, 0)
      .to(bubble, { scale: 0.4, duration: 0.18, ease: "power2.in" }, 0)
      // Phase 2: travel to new position while small (blob travels)
      .to(bubble, { y: targetY, duration: 0.35, ease: "power2.inOut" }, 0.14)
      // Phase 3: inflate with overshoot + fade label in
      .to(bubble, { scale: 1.08, duration: 0.2, ease: "power2.out" }, 0.48)
      .to(bubble, { scale: 1, duration: 0.1, ease: "power2.inOut" }, 0.68)
      .to(label, { opacity: 1, duration: 0.16, ease: "power3.out" }, 0.54);
  }

  return (
    <>
      {/* Hidden SVG gooey filter */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Sidebar container */}
      <div
        style={{
          position: "fixed",
          right: 24,
          top: "calc(50vh - 130px)",
          zIndex: 100,
          // Gooey filter wrapper — must contain both panel and bubble
          filter: "url(#goo)",
        }}
      >
        {/* Panel */}
        <div
          ref={panelRef}
          style={{
            position: "relative",
            width: 64,
            height: 260,
            borderRadius: 32,
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            overflow: "visible",
          }}
        >
          {/* Nav item buttons */}
          {ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                top: ITEM_Y[item.id] - 18,
                height: 36,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 200,
                  fontSize: 11,
                  color: item.id === activeId ? "transparent" : "rgba(28,28,26,0.4)",
                  textAlign: "center",
                  lineHeight: 1.3,
                  whiteSpace: "pre-line",
                  transition: "color 0.2s",
                  pointerEvents: "none",
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Bubble — sibling to panel, gooey filter merges them */}
        <div
          ref={bubbleRef}
          style={{
            position: "absolute",
            top: 0,
            left: -36,
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#1A3D35",
            boxShadow: "0 0 24px 8px rgba(26,61,53,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <span
            ref={labelRef}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              fontSize: 11,
              color: "#F5F0E8",
              textAlign: "center",
              lineHeight: 1.3,
              whiteSpace: "pre-line",
              pointerEvents: "none",
            }}
          >
            {ITEMS.find((i) => i.id === activeId)?.label}
          </span>
        </div>
      </div>
    </>
  );
}
