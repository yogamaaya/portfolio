import { useEffect } from "react";
import { AudioProvider } from "./breath/AudioContext";
import HeroSection from "./breath/HeroSection";
import KriyaSection from "./breath/KriyaSection";
import MantraPopOutSection from "./breath/MantraPopOutSection";
import RenderingSection from "./breath/RenderingSection";
import BookLandingSection from "./breath/BookLandingSection";
import Footer from "./Footer";

export default function BreathPage() {
  useEffect(() => {
    document.title = "The Breath of Your Self, You Are Being Breathed";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "You have never taken a breath. Every breath has taken you. An initiation into the pulse that renders the world, from The Breath of Your Self by Snigdha Motadaka.",
    );
  }, []);

  return (
    <AudioProvider>
      <div className="relative bg-background text-foreground min-h-[100dvh] font-sans selection:bg-primary/30">
        
        <HeroSection />
        <KriyaSection />
        <MantraPopOutSection />
        <RenderingSection />
        <BookLandingSection />
        
        <Footer />
      </div>
    </AudioProvider>
  );
}
