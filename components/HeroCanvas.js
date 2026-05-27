import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uProgress;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Value noise
  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  // FBM — 5 octaves
  float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 5; i++) {
      val += amp * noise(p * freq);
      freq *= 2.0;
      amp *= 0.5;
    }
    return val;
  }

  void main() {
    // Cover-fit UV: map texture to fill viewport without stretching
    vec2 texUv = vUv;
    float aspect = uResolution.x / uResolution.y;
    float imgAspect = 1.0; // square-ish — adjust if image is portrait/landscape
    if (aspect > imgAspect) {
      float scale = aspect / imgAspect;
      texUv.y = (texUv.y - 0.5) / scale + 0.5;
    } else {
      float scale = imgAspect / aspect;
      texUv.x = (texUv.x - 0.5) / scale + 0.5;
    }

    vec4 texColor = texture2D(uTexture, texUv);

    // Organic dissolve from top to bottom
    float n = fbm(vUv * 3.5);
    float threshold = vUv.y + (n * 0.45) - (uProgress * 1.6);
    float alpha = smoothstep(0.0, 0.12, threshold);

    gl_FragColor = vec4(texColor.rgb, texColor.a * alpha);
  }
`;

export default function HeroCanvas({ heroRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, material, animId;
    let killed = false;

    async function init() {
      const THREE = await import("three");

      const canvas = canvasRef.current;
      if (!canvas) return;

      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Scene + orthographic camera
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      // Full-screen plane
      const geometry = new THREE.PlaneGeometry(2, 2);

      // Load texture
      const loader = new THREE.TextureLoader();
      loader.load("/images/hero-bg.png", (texture) => {
        if (killed) return;

        material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTexture: { value: texture },
            uProgress: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          },
          transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Render loop
        function render() {
          if (killed) return;
          animId = requestAnimationFrame(render);
          renderer.render(scene, camera);
        }
        render();

        // ScrollTrigger — progress drives the dissolve
        if (heroRef?.current) {
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              if (material) material.uniforms.uProgress.value = self.progress;
            },
          });
        }
      });

      // Resize handler
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
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
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
