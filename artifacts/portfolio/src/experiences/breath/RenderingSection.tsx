import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { useAudio } from "./AudioContext";
import { CharFade } from "./CharFade";

const BEATS = [
  "In the silence of the Void, I am the potential energy of sound.",
  "I am Sarasvatī. The compiler of this story, and of all stories.",
  "First the tremor. Then the tone. Then the word. This universe is a sentence still being spoken, and you are one of its sounds.",
  "So when I say surrender, I am not asking you to give up. I am asking you to let go into the cycle that has carried you since your first cry. The breath.",
  "Beneath everything runs a pulse. Spanda. The heartbeat of awareness.",
  "Your breath is where you feel it. The swell, the turn, the release. The pulse of the universe, sensed from the inside as energy moving through you.",
  "You watched this happen minutes ago. The spirals stopped, and the drift kept going. Consciousness held the shape and kept it alive. The world is held the same way. A vibration, sustained in awareness.",
  "And among the stars, you saw rings no one drew. Your mind pulled them out of the noise, because the impressions were already in you.",
  "Karma is not reward and punishment. Karma is cache. What has run often runs easily, and what runs easily, runs again.",
  "Retrieve a pattern consciously, and you can rewrite it. Retrieve it unconsciously, and the pattern runs you.",
  "Return to your breath. Feel the swell rise in you. That feeling is a current, and a current can be modeled. Power is the current of feeling divided by the square of your resistance.",
  "Resistance is squared. Halve it, and power quadruples. Bring it to zero, and power loses its ceiling. Feel everything. Resist nothing. That is the most powerful state there is, and it opens only by letting go.",
  "Surrender is not defeat. It is remembering: you never took a single breath. You were always the one being breathed.",
  "You did not arrive here by accident. You were breathed here, to remember all of this. And a remembering this large fades, unless it is grounded in something you can hold."
];

export default function RenderingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { playNarration, stopNarration } = useAudio();
  const [activeBeat, setActiveBeat] = useState(-1);
  const lastPlayedBeat = useRef(-1);
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    let settleTimer: number | null = null;
    let pendingIndex = -2;

    const commit = (index: number) => {
      settleTimer = null;
      pendingIndex = -2;
      setActiveBeat(index);
      if (lastPlayedBeat.current !== index) {
        const numStr = (index + 1).toString().padStart(2, "0");
        // v=2: beat 11 was re-recorded; bust any cached copies of the set.
        playNarration(`${baseUrl}/breath-assets/audio/render-${numStr}.mp3?v=2`);
        lastPlayedBeat.current = index;
      }
    };

    const unsub = scrollYProgress.on("change", (v) => {
      // mapping scroll to the beats + a buffer at the end
      const totalSteps = BEATS.length + 1;
      const index = Math.floor(v * totalSteps);
      // v <= 0 means the user has scrolled back above the section — treat as outside
      const inSection = v > 0 && index >= 0 && index < BEATS.length;

      if (!inSection) {
        if (settleTimer !== null) {
          clearTimeout(settleTimer);
          settleTimer = null;
        }
        pendingIndex = -2;
        setActiveBeat(-1);
        if (lastPlayedBeat.current !== -1) {
          stopNarration();
          lastPlayedBeat.current = -1;
        }
        return;
      }

      if (index === lastPlayedBeat.current) {
        // Settled back onto the already-active beat: cancel any pending switch.
        if (settleTimer !== null) {
          clearTimeout(settleTimer);
          settleTimer = null;
          pendingIndex = -2;
        }
        return;
      }

      // Commit a beat only once the scroll has rested inside its band for a
      // moment. A fast flick then glides over the in-between lines instead of
      // strobing every one of them for a few unreadable milliseconds.
      if (index !== pendingIndex) {
        pendingIndex = index;
        if (settleTimer !== null) clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => commit(index), 180);
      }
    });

    return () => {
      if (settleTimer !== null) clearTimeout(settleTimer);
      unsub();
      stopNarration();
    };
  }, [scrollYProgress, playNarration, stopNarration, baseUrl]);

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: `${(BEATS.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden">

        {/* Particle / Light Effect in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 mix-blend-screen">
           <motion.div
             animate={{ opacity: activeBeat >= 0 ? 0.3 : 0, scale: activeBeat >= 0 ? 1 + (activeBeat / BEATS.length) : 1 }}
             transition={{ duration: 1 }}
             className="w-[60vw] h-[60vw] rounded-full bg-primary/20 blur-[100px]"
           />
        </div>

        <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center justify-center h-full">
          {BEATS.map((beat, i) => {
            const isActive = i === activeBeat;
            const isPast = i < activeBeat;
            const isPBeat = i === 10; // 0-indexed: the equation beat
            const isClimaxBeat = i === BEATS.length - 2; // "Surrender is not defeat"

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : (isPast ? -40 : 40),
                  scale: isActive ? (isClimaxBeat ? 1.1 : 1) : 0.95
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              >
                {isActive && (
                  <div className={`font-serif italic text-2xl md:text-4xl leading-relaxed text-white/90 drop-shadow-lg max-w-3xl ${isClimaxBeat ? 'text-primary-foreground font-semibold' : ''}`}
                     data-testid={`text-rendering-beat-${i}`}>
                    <CharFade text={beat} stagger={0.045} />
                  </div>
                )}
                {isActive && isPBeat && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="mt-8 font-mono text-xl tracking-widest text-primary/70"
                  >
                    <CharFade text="P = I / R²" delay={0.5} />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
