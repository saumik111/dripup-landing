import { useEffect, useRef } from "react";

// Exact IronHill config
const CONFIG = {
  color: "#F5F0E8",
  spread: 0.5,
  speed: 2,
};

function hexToRgb(hex) {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return res
    ? { r: parseInt(res[1], 16) / 255, g: parseInt(res[2], 16) / 255, b: parseInt(res[3], 16) / 255 }
    : { r: 1, g: 1, b: 1 };
}

// Exact IronHill shaders
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
    const rgb = hexToRgb(CONFIG.color);

    async function init() {
      const THREE = await import("three");

      const hero = heroRef?.current;
      if (!hero || killed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });

      // Canvas is sized to the hero element — same as IronHill
      function resize() {
        const w = hero.offsetWidth;
        const h = hero.offsetHeight;
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        if (material) material.uniforms.uResolution.value.set(w, h);
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
          uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
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

      // Exact IronHill scroll math:
      // maxScroll = hero height - window height (scroll distance until hero bottom hits viewport bottom)
      // progress = (scrollY / maxScroll) * speed, clamped to 1.1
      function onScroll() {
        const maxScroll = hero.offsetHeight - window.innerHeight;
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

  // KEY: canvas is positioned at BOTTOM of hero, full width, viewport height
  // This matches IronHill's CSS: position:absolute; bottom:0; width:100%; height:100vh
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
}
