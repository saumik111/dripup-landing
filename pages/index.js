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
      {/* Stacking context: ProblemSection sits at bottom, hero overlays it */}
      <div style={{ position: "relative" }}>

        {/* ProblemSection underneath — always there, revealed as hero dissolves */}
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <ProblemSection />
        </div>

        {/* Hero overlays ProblemSection exactly, pulled up by -100vh */}
        <div style={{ position: "relative", zIndex: 2, marginTop: "-100vh" }}>
          <HeroSection videoRef={heroVideoRef} />
        </div>

      </div>

      <div style={{ position: "relative", zIndex: 5, background: "#F5F0E8" }}>
        <SolutionSection />
        <FeatureCards onReady={() => setCtaVisible(true)} />
        <CTASection videoRef={heroVideoRef} visible={ctaVisible} />
      </div>
    </main>
  );
}
