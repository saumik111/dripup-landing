import { useRef, useState } from "react";
import HeroSection from "@/components/HeroSection";
import HeroCanvas from "@/components/HeroCanvas";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeatureCards from "@/components/FeatureCards";
import CTASection from "@/components/CTASection";

export default function Home() {
  const heroVideoRef = useRef(null);
  const heroRef = useRef(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  return (
    <main style={{ background: "#F5F0E8", overflowX: "hidden" }}>
      {/* Fixed canvas — sits behind everything, dissolves on scroll */}
      <HeroCanvas heroRef={heroRef} />

      <HeroSection videoRef={heroVideoRef} heroRef={heroRef} />

      {/* position:relative + zIndex so sections scroll over the fixed canvas */}
      <div style={{ position: "relative", zIndex: 5, background: "#F5F0E8" }}>
        <ProblemSection />
        <SolutionSection />
        <FeatureCards onReady={() => setCtaVisible(true)} />
        <CTASection videoRef={heroVideoRef} visible={ctaVisible} />
      </div>
    </main>
  );
}
