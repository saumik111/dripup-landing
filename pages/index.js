import HeroSection from "@/components/HeroSection";
import StickyCards from "@/components/StickyCards";
import Navbar from "@/components/Navbar";
import { useRef } from "react";

export default function Home() {
  const heroVideoRef = useRef(null);

  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F0E8", overflowX: "hidden" }}>
        <HeroSection videoRef={heroVideoRef} />
        <div style={{ position: "relative", zIndex: 5, background: "#F5F0E8" }}>
          <StickyCards />
        </div>
      </main>
    </>
  );
}
