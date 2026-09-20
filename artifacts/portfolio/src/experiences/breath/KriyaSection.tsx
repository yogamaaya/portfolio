import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useAudio } from "./AudioContext";
import { StaticDriftIllusion } from "./illusions/StaticDriftIllusion";
import { MandalaNoiseIllusion } from "./illusions/MandalaNoiseIllusion";

type KriyaPhase = "idle" | "settle" | "in" | "hold" | "out" | "reveal" | "done";

/**
 * One line, one place, one point of light. The gaze never travels: the
 * fixation dot sits at the exact center of the screen and every word of the
 * ritual appears just beneath it. The breath verb leads each line, the cue
 * follows it, and the illusion cues arrive only AFTER the hold they belong to.
 *
 * Four rounds of 4-7-8:
 *   1-2  the drift field. Two full breaths of staring, storing the rings.
 *   3    the void. The pattern cuts to a blank black screen for one full
 *        breath and the carried afterimage plays on the emptiness:
 *        "what isn't there still appears" lives HERE, nowhere else.
 *   4    the star field, secretly carrying the mandala of the same rings.
 */
function kriyaLine(round: number, phase: KriyaPhase): string {
  if (phase === "settle") return "be still. rest your eyes on the point of light.";
  if (phase === "reveal") return "the stars never held it. you did. your ears are next.";
  if (phase === "in") {
    if (round === 1) return "breathe in.";
    if (round === 2) return "breathe in. stare into the rings. do not blink.";
    if (round === 3) return "breathe in. the rings are gone.";
    return "breathe in. it is in you that the impressions remain and repeat.";
  }
  if (phase === "hold") {
    if (round === 1) return "hold. this image is not moving.";
    if (round === 2) return "hold.";
    if (round === 3) return "hold. what isn't there still appears.";
    return "hold. the rings you drank still spin in you. let them bloom among the stars.";
  }
  if (phase === "out") {
    if (round === 1) return "let go. the drift was always yours.";
    if (round === 2) return "let go. drink the rings in. they are about to leave.";
    if (round === 3) return "let go. the screen is empty. the rings are in you.";
    return "let go. reality is a blank screen you paint from past impressions.";
  }
  return "";
}

const FINAL_ROUND = 4;

export default function KriyaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const { started, playSfx } = useAudio();
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

  const [phase, setPhase] = useState<KriyaPhase>("idle");
  const [round, setRound] = useState(1);
  const [auraScale, setAuraScale] = useState(1);
  const [auraDuration, setAuraDuration] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const phaseRef = useRef(phase);
  const roundRef = useRef(round);
  const remainingTimeRef = useRef<number>(0);
  const lastTickTimeRef = useRef<number>(performance.now());
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
    roundRef.current = round;
  }, [phase, round]);

  useEffect(() => {
    if (!started) return;

    let isTabActive = !document.hidden;
    const handleVisibility = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        // rAF was suspended while hidden; restart the clock so the
        // hidden duration is never applied to the countdown.
        lastTickTimeRef.current = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const advancePhase = () => {
      const p = phaseRef.current;
      const r = roundRef.current;

      if (p === "idle") {
        setPhase("settle");
        remainingTimeRef.current = 3000;
      } else if (p === "settle") {
        setPhase("in");
        setAuraScale(1.8);
        setAuraDuration(4);
        remainingTimeRef.current = 4000;
      } else if (p === "in") {
        setPhase("hold");
        setAuraScale(1.8);
        setAuraDuration(7);
        remainingTimeRef.current = 7000;
      } else if (p === "hold") {
        setPhase("out");
        setAuraScale(1.0);
        setAuraDuration(8);
        remainingTimeRef.current = 8000;
      } else if (p === "out") {
        if (r < FINAL_ROUND) {
          playSfx(`${baseUrl}/breath-assets/audio/bowl.mp3`);
          setRound(r + 1);
          setPhase("in");
          setAuraScale(1.8);
          setAuraDuration(4);
          remainingTimeRef.current = 4000;
        } else {
          setPhase("reveal");
          remainingTimeRef.current = 5000;
        }
      } else if (p === "reveal") {
        setPhase("done");
        document.getElementById("mantra-section")?.scrollIntoView({ behavior: "smooth" });
      }
    };

    const tick = (time: number) => {
      // The ritual has ended: let the loop die instead of spinning at
      // 60fps for as long as the page stays open.
      if (phaseRef.current === "done") {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);

      // Clamp so throttled/suspended frames can never fast-forward the breath.
      const delta = Math.min(time - lastTickTimeRef.current, 100);
      lastTickTimeRef.current = time;

      if (!isInView || !isTabActive) return;

      if (phaseRef.current === "idle") {
        advancePhase();
        return;
      }

      if (remainingTimeRef.current > 0) {
        remainingTimeRef.current -= delta;
        if (remainingTimeRef.current <= 0) {
          advancePhase();
        }
      }
    };

    lastTickTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [started, isInView, baseUrl, playSfx]);

  const lineText = kriyaLine(round, phase);
  const lineWords = lineText.split(/\s+/).filter(Boolean);
  const displayWord = lineWords[wordIndex] ?? "";

  useEffect(() => {
    setWordIndex(0);
    if (lineWords.length <= 1) return;

    const wordTimer = window.setInterval(() => {
      setWordIndex((current) => {
        if (current >= lineWords.length - 1) {
          window.clearInterval(wordTimer);
          return current;
        }
        return current + 1;
      });
    }, 380);

    return () => window.clearInterval(wordTimer);
  }, [lineText, lineWords.length]);

  // The aura steps aside for the illusions: dimmed over the drift field,
  // almost out during the void round so the afterimage owns the dark, low
  // over the star field.
  const driftVisible = phase !== "idle" && phase !== "done" && round <= 2;
  let auraOpacity = driftVisible ? 0.35 : 1;
  if (round === 3) auraOpacity = 0.12;
  if (round === 4) auraOpacity = phase === "reveal" ? 0.12 : 0.3;

  return (
    <section id="kriya-section" ref={containerRef} className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-[#05020a]">

      {/* Rounds 1 and 2: the drift field holds through two full 4-7-8 breaths. */}
      {phase !== "idle" && phase !== "done" && round <= 2 && (
        <StaticDriftIllusion active />
      )}
      {/* Round 3 deliberately renders NOTHING: a blank black screen for one
          full breath, where what the eyes stored plays back on its own. */}
      {/* Round 4: the star field secretly carrying the mandala of those rings. */}
      {round === 4 && phase !== "done" && (
        <MandalaNoiseIllusion reveal={phase === "reveal"} />
      )}

      <motion.div
        animate={{ opacity: auraOpacity }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <motion.div
          animate={{ scale: auraScale }}
          transition={{ duration: auraDuration, ease: "linear" }}
          className="absolute w-[20vw] h-[20vw] rounded-full blur-[80px] bg-primary/30"
        />
        <motion.div
          animate={{ scale: auraScale }}
          transition={{ duration: auraDuration, ease: "linear" }}
          className="absolute w-[40vw] h-[40vw] rounded-full border border-primary/20"
        />
      </motion.div>

      {/* The fixation point. The gaze lives here for the whole kriya. */}
      {phase !== "idle" && phase !== "done" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[5px] h-[5px] rounded-full bg-white/60 shadow-[0_0_0_3px_rgba(5,2,10,0.75),0_0_12px_rgba(255,255,255,0.4)] pointer-events-none"
          data-testid="dot-fixation"
        />
      )}

      {/* One word occupies the fixation point at a steady reading cadence. */}
      <div className="absolute inset-0 z-40 flex items-center justify-center px-6 pointer-events-none">
        <AnimatePresence mode="wait">
          {displayWord && (
            <motion.span
              key={`${round}-${phase}-${wordIndex}-${displayWord}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.12 }}
              className="relative min-w-[10ch] text-center font-serif italic text-2xl md:text-3xl leading-none text-white/90 [text-shadow:0_0_22px_rgba(5,2,10,1),0_0_9px_rgba(255,255,255,0.24)]"
              data-testid="text-kriya-word"
            >
              {displayWord}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
