import HeroSection from "@/components/HeroSection";
import StickyCards from "@/components/StickyCards";
import Navbar from "@/components/Navbar";
import FAQSection from "@/components/FAQSection";
import PageTransition from "@/components/PageTransition";
import { useRef } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const heroVideoRef = useRef(null);
  const transitionRef = useRef(null);
  const router = useRouter();

  function navigateWithTransition(href) {
    if (!transitionRef.current) {
      router.push(href);
      return;
    }
    transitionRef.current.play(() => {
      router.push(href);
    });
  }

  return (
    <>
      <PageTransition ref={transitionRef} />
      <Navbar onAskClick={() => navigateWithTransition("/ask")} />
      <main style={{ background: "transparent", overflowX: "hidden" }}>
        <HeroSection videoRef={heroVideoRef} />
        <div style={{ position: "relative", zIndex: 5, background: "transparent" }}>
          <StickyCards />
        </div>
        <FAQSection />
      </main>
    </>
  );
}
