import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CharFadeProps {
  text: string;
  className?: string;
  delay?: number;
  /** Seconds between each character. Bigger = slower materialization. */
  stagger?: number;
  "data-testid"?: string;
}

export function CharFade({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  "data-testid": testId,
}: CharFadeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  // Split text into words, then words into characters.
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  // Opacity + transform only: both run on the compositor. A per-character
  // `filter: blur()` animation forces the browser to repaint hundreds of
  // layers every frame across the whole page, which is heavy enough to get
  // the tab killed and reloaded on weaker devices.
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: "easeOut" as const },
    },
    hidden: {
      opacity: 0,
      y: 6,
      transition: { duration: 0.5, ease: "easeIn" as const },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`${className} inline-block`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      data-testid={testId}
      style={{ display: "inline-block" }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIndex) => (
            <motion.span key={charIndex} variants={child} className="inline-block">
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
