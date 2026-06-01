import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

// Character dissolve transition — top to bottom
// Plays on navigate-to-ask, reverses on ask page mount
// Adapted from codegrid-kvs-studio-image-reveal (scroll → time-based)

const CELL_SIZE = 16;
const DISSOLVE_COLOR = "#ff6426";
const CHARACTERS = "DRIP UP DRIP UP DRIP UP DRIP UP";
const SPREAD_ABOVE = 0.2;
const SPREAD_BELOW = 0.2;
const SCATTER_INTENSITY = 0.12;
const SOLID_CORE_RADIUS = 0.03;
const MIN_SCATTER_AT_CENTER = 0.3;
const VISIBILITY_THRESHOLD = 0.65;

function hashFromPosition(row, col, seed) {
  const raw = Math.sin(row * seed + col * (seed * 2.45)) * 43758.5453;
  return raw - Math.floor(raw);
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

const PageTransition = forwardRef(function PageTransition(_, ref) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    cells: [],
    elements: [],
    visibilityRandom: [],
    scatterOffset: [],
    animId: null,
    active: false,
  });

  useImperativeHandle(ref, () => ({
    // Play: top-to-bottom fill, then call onDone
    play(onDone) {
      const container = containerRef.current;
      if (!container) return;
      buildGrid(container);
      container.style.display = "block";
      container.style.opacity = "1";
      animate(0, 1, 900, onDone);
    },
    // Reverse: top-to-bottom clear, reveal page underneath
    reverse(onDone) {
      const container = containerRef.current;
      if (!container) return;
      buildGrid(container);
      container.style.display = "block";
      container.style.opacity = "1";
      // Start fully covered, then dissolve away
      showAllCells();
      animate(1, 0, 900, () => {
        if (container) container.style.display = "none";
        if (onDone) onDone();
      });
    },
  }));

  function buildGrid(container) {
    const s = stateRef.current;
    // Clear existing
    container.innerHTML = "";
    s.cells = [];
    s.elements = [];
    s.visibilityRandom = [];
    s.scatterOffset = [];

    const cols = Math.ceil(window.innerWidth / CELL_SIZE);
    const rows = Math.ceil(window.innerHeight / CELL_SIZE);
    const fontSize = Math.round(CELL_SIZE * 0.7);
    const chars = CHARACTERS.split("");

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = document.createElement("div");
        cell.style.cssText = `
          position: absolute;
          left: ${col * CELL_SIZE}px;
          top: ${row * CELL_SIZE}px;
          width: ${CELL_SIZE}px;
          height: ${CELL_SIZE}px;
          font-size: ${fontSize}px;
          font-family: 'Inter', monospace;
          font-weight: 600;
          color: ${DISSOLVE_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          visibility: hidden;
          user-select: none;
          pointer-events: none;
        `;
        cell.textContent = chars[(row * cols + col) % chars.length];
        container.appendChild(cell);

        s.cells.push({ row, col, normalizedY: (row + 0.5) / rows });
        s.elements.push(cell);
        s.visibilityRandom.push(hashFromPosition(row, col, 127.1));
        s.scatterOffset.push(
          (hashFromPosition(row, col, 269.3) - 0.5) * SCATTER_INTENSITY
        );
      }
    }
  }

  function updateBand(bandCenterY) {
    const s = stateRef.current;
    for (let i = 0; i < s.cells.length; i++) {
      const cell = s.cells[i];
      const rawDistance = Math.abs(cell.normalizedY - bandCenterY);
      const scatterStrength = clamp(
        MIN_SCATTER_AT_CENTER,
        1,
        rawDistance / SOLID_CORE_RADIUS
      );
      const scattered =
        cell.normalizedY - bandCenterY + s.scatterOffset[i] * scatterStrength;
      const normalizedDistance =
        scattered >= 0
          ? scattered / SPREAD_BELOW
          : Math.abs(scattered) / SPREAD_ABOVE;

      if (normalizedDistance >= 1) {
        s.elements[i].style.visibility = "hidden";
        continue;
      }
      const density = (1 - normalizedDistance) * (1 - normalizedDistance);
      s.elements[i].style.visibility =
        density > s.visibilityRandom[i] * VISIBILITY_THRESHOLD
          ? "visible"
          : "hidden";
    }
  }

  function showAllCells() {
    const s = stateRef.current;
    for (let i = 0; i < s.elements.length; i++) {
      s.elements[i].style.visibility = "visible";
    }
  }

  function hideAllCells() {
    const s = stateRef.current;
    for (let i = 0; i < s.elements.length; i++) {
      s.elements[i].style.visibility = "hidden";
    }
  }

  function animate(fromProgress, toProgress, duration, onDone) {
    const s = stateRef.current;
    if (s.animId) cancelAnimationFrame(s.animId);

    const totalRange = 1 + SPREAD_ABOVE + SPREAD_BELOW;
    const start = performance.now();

    function frame(now) {
      const elapsed = now - start;
      const t = clamp(elapsed / duration, 0, 1);
      // ease in-out cubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const progress = fromProgress + (toProgress - fromProgress) * eased;

      const bandCenterY = -SPREAD_ABOVE + progress * totalRange;

      if (progress <= 0) {
        hideAllCells();
      } else if (progress >= 1) {
        showAllCells();
      } else {
        updateBand(bandCenterY);
      }

      if (t < 1) {
        s.animId = requestAnimationFrame(frame);
      } else {
        s.animId = null;
        if (onDone) onDone();
      }
    }

    s.animId = requestAnimationFrame(frame);
  }

  useEffect(() => {
    return () => {
      const s = stateRef.current;
      if (s.animId) cancelAnimationFrame(s.animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "none",
        background: "linear-gradient(to right, #F0F4FF, #FAFAFA)",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
});

export default PageTransition;
