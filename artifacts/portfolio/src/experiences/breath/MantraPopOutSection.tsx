import { useState } from "react";
import { useAudio } from "./AudioContext";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { CharFade } from "./CharFade";

export default function MantraPopOutSection() {
  const { playSfx } = useAudio();
  const [step, setStep] = useState(0);
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

  const handlePlayFirst = () => {
    playSfx(`${baseUrl}/breath-assets/audio/mantra-garbled.mp3`);
    if (step === 0) setStep(1);
  };

  const handleReveal = () => {
    setStep(2);
  };

  const handlePlaySecond = () => {
    playSfx(`${baseUrl}/breath-assets/audio/mantra-garbled.mp3`);
    if (step === 2) setStep(3);
  };

  const handlePlayClear = () => {
    playSfx(`${baseUrl}/breath-assets/audio/mantra-clear.mp3`);
  };

  return (
    <section id="mantra-section" className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24 bg-background relative border-t border-primary/5 z-20">
      <div className="absolute top-4 left-6 max-w-sm">
        <p className="text-[10px] text-primary-foreground/30 font-mono leading-tight">
          Sine-wave speech (Remez et al., Science, 1981) <br/>
          Noise-vocoded speech (Davis et al., 2005)
        </p>
      </div>

      <div className="max-w-2xl w-full flex flex-col items-center space-y-16">
        
        {/* Step 0/1: First Play */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="font-serif italic text-xl text-primary-foreground/80">
            <CharFade text="Listen. What is this voice saying?" delay={0.2} />
          </div>
          <button
            onClick={handlePlayFirst}
            className="w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center hover:bg-primary/10 transition-colors"
            data-testid="button-play-garbled-1"
          >
            <Play className="ml-1 text-primary-foreground/70" size={24} />
          </button>
        </div>

        {/* Step 1: Hold that */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="text-primary-foreground/60 tracking-wider">
              <CharFade text="Nothing? Noise? Hold that." />
            </div>
            {step === 1 && (
              <button
                onClick={handleReveal}
                className="px-6 py-2 border border-primary/20 rounded hover:bg-primary/5 transition-colors text-sm text-primary-foreground/80 tracking-widest"
                data-testid="button-reveal-mantra"
              >
                Reveal the pattern
              </button>
            )}
          </motion.div>
        )}

        {/* Step 2: The Text */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center space-y-12"
          >
            <h2 className="font-serif italic text-3xl md:text-5xl text-white font-medium leading-snug max-w-xl">
              <CharFade text='"Surrender. Let the universe breathe through you."' />
            </h2>

            <div className="flex flex-col items-center space-y-6 pt-8 border-t border-primary/10 w-full">
              <div className="font-serif italic text-xl text-primary-foreground/80">
                <CharFade text="Now listen again." />
              </div>
              <button
                onClick={handlePlaySecond}
                className="w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center hover:bg-primary/20 bg-primary/5 transition-colors"
                data-testid="button-play-garbled-2"
              >
                <Play className="ml-1 text-primary-foreground" size={24} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Conclusion */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center text-center space-y-12 pt-12"
          >
            <button
              onClick={handlePlayClear}
              className="text-xs tracking-[0.2em] text-primary/60 hover:text-primary uppercase transition-colors"
              data-testid="button-play-clear"
            >
              [ Hear it unveiled ]
            </button>

            <div className="text-lg md:text-xl text-primary-foreground/70 font-light max-w-xl leading-relaxed">
              <CharFade text="The sound never changed. You did. Knowledge is the decryption key of perception. Now watch it render a world." />
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
