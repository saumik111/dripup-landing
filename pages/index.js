import { useRef, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeatureCards from "@/components/FeatureCards";
import CTASection from "@/components/CTASection";

export default function Home() {
  const heroVideoRef = useRef(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  return (
    <main style={{ background: "#F5F0E8", overflowX: "hidden" }}>
      <HeroSection videoRef={heroVideoRef} />

      {/* z-index 5 so these sections slide over the fixed image + canvas */}
      <div style={{ position: "relative", zIndex: 5, background: "#F5F0E8" }}>
        <ProblemSection />
        <SolutionSection />
        <FeatureCards onReady={() => setCtaVisible(true)} />
        <CTASection videoRef={heroVideoRef} visible={ctaVisible} />
      </div>
    </main>
  );
}
