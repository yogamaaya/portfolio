import { useAudio } from "./AudioContext";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { CharFade } from "./CharFade";

export default function HeroSection() {
  const { started, startExperience, muted, toggleMute } = useAudio();

  const handleBegin = () => {
    startExperience();
    document.getElementById('kriya-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

      {started && (
        <button
          onClick={toggleMute}
          className="fixed top-6 right-6 z-50 text-white/50 hover:text-white/80 transition-colors p-2"
          data-testid="button-mute-toggle"
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      <div className="max-w-2xl mx-auto text-center z-10">
        <h1 className="font-serif italic text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-white mb-8">
          <CharFade text="YOU ARE BEING BREATHED." data-testid="text-headline" delay={0.2} />
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/70 font-light leading-relaxed mb-12 max-w-xl mx-auto">
          <CharFade text="Every few seconds the universe inhales you back, and exhales you into existence again. You have never taken a breath. Every breath has taken you. Nothing here asks to be believed. It asks to be breathed. Go slowly." delay={1.5} stagger={0.025} />
        </p>

        <p className="text-sm tracking-widest uppercase text-primary-foreground/40 mb-16">
          <CharFade text="The Breath of Your Self, Snigdha Motadaka" delay={6.5} />
        </p>

        {!started && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 7.5 }}
            onClick={handleBegin}
            data-testid="button-begin"
            className="group relative px-8 py-3 rounded-full overflow-hidden transition-all duration-700"
          >
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
            <div className="absolute inset-0 border border-primary/30 rounded-full group-hover:border-primary/60 transition-colors" />
            <span className="relative z-10 font-serif italic text-xl tracking-widest text-primary-foreground/80 group-hover:text-white transition-colors">
              begin
            </span>
          </motion.button>
        )}
      </div>
    </section>
  );
}
