import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FILL_COLOR = { r: 245 / 255, g: 240 / 255, b: 232 / 255 };

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

  // 5 octaves for fine, intricate edge detail
  float fbm(vec2 p) {
    float v = 0.0;
    v += noise(p * 1.0) * 0.5;
    v += noise(p * 2.0) * 0.25;
    v += noise(p * 4.0) * 0.125;
    v += noise(p * 8.0) * 0.0625;
    v += noise(p * 16.0) * 0.03125;
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Aspect-correct UV so noise isn't stretched horizontally
    vec2 adjustedUV = vec2(uv.x * (uResolution.x / uResolution.y), uv.y);

    float noiseValue = fbm(adjustedUV * 10.0);

    // Bottom-to-top wipe: low uv.y (bottom) fills first, moves upward
    float threshold = uv.y + (noiseValue * 0.5) - (uProgress * 1.5);

    // Inverted smoothstep: alpha=0 at start everywhere, cream rises from bottom
    float alpha = 1.0 - smoothstep(0.0, 0.05, threshold);

    gl_FragColor = vec4(uColor, alpha);
  }
`;

export default function HeroCanvas({ heroRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef?.current;
    if (!canvas || !hero) return;

    let renderer, material, animId, killed = false;

    async function init() {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uColor: { value: new THREE.Vector3(FILL_COLOR.r, FILL_COLOR.g, FILL_COLOR.b) },
        },
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      function animate() {
        if (killed) return;
        animId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();

      // Trigger on hero section — starts the instant hero top hits viewport top
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (material) material.uniforms.uProgress.value = self.progress;
        },
      });

      function onResize() {
        if (!renderer || !material) return;
        renderer.setSize(window.innerWidth, window.innerHeight);
        material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      }
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
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
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
}
