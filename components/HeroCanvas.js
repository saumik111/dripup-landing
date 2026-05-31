import { useEffect, useRef } from "react";

const CONFIG = {
  colorStart: "#F0F4FF",
  colorEnd: "#FAFAFA",
  spread: 0.5,
  speed: 0.8,
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16) / 255, g: parseInt(result[2], 16) / 255, b: parseInt(result[3], 16) / 255 }
    : { r: 0.96, g: 0.94, b: 0.91 };
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// EXACT source shader — note: noiseValue * uSpread (not + uSpread)
const fragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColorStart;
  uniform vec3 uColorEnd;
  uniform float uSpread;
  varying vec2 vUv;

  float Hash(vec2 p) {
    vec3 p2 = vec3(p.xy, 1.0);
    return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
  }

  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f *= f * (3.0 - 2.0 * f);
    return mix(
      mix(Hash(i + vec2(0.0, 0.0)), Hash(i + vec2(1.0, 0.0)), f.x),
      mix(Hash(i + vec2(0.0, 1.0)), Hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += noise(p * 1.0) * 0.5;
    v += noise(p * 2.0) * 0.25;
    v += noise(p * 4.0) * 0.125;
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);

    float dissolveEdge = uv.y - uProgress * 1.2;
    float noiseValue = fbm(centeredUv * 15.0);
    float d = dissolveEdge + noiseValue * uSpread;

    float pixelSize = 1.0 / uResolution.y;
    float alpha = 1.0 - smoothstep(-pixelSize, pixelSize, d);

    vec3 gradientColor = mix(uColorStart, uColorEnd, uv.x);
    gl_FragColor = vec4(gradientColor, alpha);
  }
`;

function isWebGLSupported() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function HeroCanvas({ heroRef }) {
  const canvasRef = useRef(null);
  const fallbackRef = useRef(null);

  useEffect(() => {
    // If WebGL is unavailable, show CSS gradient fallback and skip Three.js entirely
    if (!isWebGLSupported()) {
      console.warn("[HeroCanvas] WebGL not available — using CSS gradient fallback.");
      if (fallbackRef.current) fallbackRef.current.style.display = "block";
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer, material, animId, killed = false;
    const rgbStart = hexToRgb(CONFIG.colorStart);
    const rgbEnd = hexToRgb(CONFIG.colorEnd);

    async function init() {
      const THREE = await import("three");
      const hero = heroRef?.current;
      if (!hero || killed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      } catch (e) {
        console.warn("[HeroCanvas] WebGLRenderer init failed — using CSS gradient fallback.", e);
        if (fallbackRef.current) fallbackRef.current.style.display = "block";
        return;
      }

      function resize() {
        renderer.setSize(hero.offsetWidth, hero.offsetHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        if (material) material.uniforms.uResolution.value.set(hero.offsetWidth, hero.offsetHeight);
      }
      resize();
      window.addEventListener("resize", resize);

      const geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(hero.offsetWidth, hero.offsetHeight) },
          uColorStart: { value: new THREE.Vector3(rgbStart.r, rgbStart.g, rgbStart.b) },
          uColorEnd: { value: new THREE.Vector3(rgbEnd.r, rgbEnd.g, rgbEnd.b) },
          uSpread: { value: CONFIG.spread },
        },
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      let scrollProgress = 0;

      function animate() {
        if (killed) return;
        animId = requestAnimationFrame(animate);
        material.uniforms.uProgress.value = scrollProgress;
        renderer.render(scene, camera);
      }
      animate();

      function onScroll() {
        const heroHeight = hero.offsetHeight;
        const windowHeight = window.innerHeight;
        const maxScroll = heroHeight - windowHeight;
        if (maxScroll <= 0) return;
        scrollProgress = Math.min((window.scrollY / maxScroll) * CONFIG.speed, 1.1);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    init();

    return () => {
      killed = true;
      cancelAnimationFrame(animId);
      renderer?.dispose();
    };
  }, [heroRef]);

  return (
    <>
      {/* WebGL canvas — primary dissolve */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />
      {/* CSS gradient fallback — shown only when WebGL is unavailable */}
      <div
        ref={fallbackRef}
        style={{
          display: "none",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 20,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent 0%, transparent 30%, #F0F4FF 70%, #FAFAFA 100%)",
        }}
      />
    </>
  );
}
