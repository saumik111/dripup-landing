import { useEffect, useRef } from "react";

const FILL_COLOR = { r: 245 / 255, g: 240 / 255, b: 232 / 255 };
const SPEED = 1.5;
const SPREAD = 0.5;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColor;
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
    float d = dissolveEdge + noiseValue + uSpread;

    float pixelSize = 1.0 / uResolution.y;
    float alpha = 1.0 - smoothstep(-pixelSize, pixelSize, d);

    gl_FragColor = vec4(uColor, alpha);
  }
`;

export default function HeroCanvas({ heroRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer, material, animId, killed = false;

    async function init() {
      const THREE = await import("three");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const hero = heroRef?.current;
      if (!hero || killed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(hero.offsetWidth, hero.offsetHeight);

      const geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(hero.offsetWidth, hero.offsetHeight) },
          uColor: { value: new THREE.Vector3(FILL_COLOR.r, FILL_COLOR.g, FILL_COLOR.b) },
          uSpread: { value: SPREAD },
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

      // Progress = how far hero top has scrolled past viewport top
      // Full dissolve completes by the time hero scrolls fully off screen
      function onScroll() {
        const rect = hero.getBoundingClientRect();
        const traveled = -rect.top;
        const total = hero.offsetHeight;
        if (total <= 0) return;
        const raw = traveled / total; // 0 to 1 over full hero height

        // 0–20%: nothing, 20–80%: full dissolve plays, remapped to 0–1
        const start = 0.20;
        const end = 0.80;
        const remapped = Math.max(0, Math.min((raw - start) / (end - start), 1));
        scrollProgress = remapped * 1.5; // 1.5 = SPEED to ensure full coverage
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      function onResize() {
        if (!renderer || !material) return;
        renderer.setSize(hero.offsetWidth, hero.offsetHeight);
        material.uniforms.uResolution.value.set(hero.offsetWidth, hero.offsetHeight);
      }
      window.addEventListener("resize", onResize);
    }

    init();

    return () => {
      killed = true;
      cancelAnimationFrame(animId);
      renderer?.dispose();
    };
  }, [heroRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
}
