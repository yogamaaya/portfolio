import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { mandalaRingRadii } from "./ringGeometry";

interface Dot {
  x: number;
  y: number;
  size: number;
  baseA: number;
  m: number; // mandala membership 0..1
  color: string;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Approximate gaussian jitter
function gauss(sigma: number) {
  return (Math.random() + Math.random() + Math.random() - 1.5) * 1.4 * sigma;
}

/**
 * A still field of star-grains. Hidden inside their density and brightness is
 * a faint mandala built from the SAME ring radii as the drift illusion the
 * viewer stared at two rounds ago, so the afterimage they carry wants to
 * settle onto it. We only provide the grains; consciousness does the
 * imprinting. When `reveal` flips true, one slow tween lets the mandala
 * breathe forward, still made of nothing but stars.
 *
 * The canvas is drawn once (and on resize). No continuous animation loop.
 */
export function MandalaNoiseIllusion({ reveal }: { reveal: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number | null>(null);
  const progressRef = useRef(0); // 0 = pure starfield, 1 = mandala breathing

  const drawField = (progress: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#05020a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const dots = dotsRef.current;
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const alpha =
        d.baseA * (1 - 0.3 * progress * (1 - d.m)) +
        d.m * (0.1 + 0.34 * progress);
      ctx.globalAlpha = Math.min(0.95, Math.max(0, alpha));
      ctx.fillStyle = d.color;
      ctx.fillRect(d.x, d.y, d.size, d.size);
    }
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let lastW = 0;
    let lastH = 0;

    const generate = () => {
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);
      lastW = width;
      lastH = height;
      const cx = width / 2;
      const cy = height / 2;

      // Shared geometry with StaticDriftIllusion: every third drift band,
      // same phase, so the carried afterimage settles onto familiar circles.
      const maxRadius = Math.max(width, height) * 0.7;
      const rings = mandalaRingRadii(maxRadius);

      const mandalaAt = (x: number, y: number) => {
        if (rings.length === 0) return 0;
        const dist = Math.hypot(x - cx, y - cy);
        let nearest = Infinity;
        for (let i = 0; i < rings.length; i++) {
          const d = Math.abs(dist - rings[i]);
          if (d < nearest) nearest = d;
        }
        const ringFactor = Math.exp(-(nearest * nearest) / (2 * 13 * 13));
        const theta = Math.atan2(y - cy, x - cx);
        const petal = 0.5 + 0.5 * Math.cos(12 * theta);
        return Math.min(1, ringFactor * (0.45 + 0.55 * petal));
      };

      const numDots = Math.min(2600, Math.floor((width * height) / 450));
      const dots: Dot[] = [];
      for (let i = 0; i < numDots; i++) {
        let x: number;
        let y: number;
        if (rings.length > 0 && Math.random() < 0.38) {
          // Seed a share of the grains near the remembered rings so the
          // structure lives in the density too, not just the brightness.
          const ring = rings[Math.floor(Math.random() * rings.length)];
          const radius = ring + gauss(11);
          const angle = Math.random() * Math.PI * 2;
          x = cx + Math.cos(angle) * radius;
          y = cy + Math.sin(angle) * radius;
        } else {
          x = Math.random() * width;
          y = Math.random() * height;
        }
        if (x < 0 || x >= width || y < 0 || y >= height) {
          x = Math.random() * width;
          y = Math.random() * height;
        }
        dots.push({
          x,
          y,
          size: 1.4 + Math.random() * 1.4,
          baseA: 0.05 + Math.random() * 0.22,
          m: mandalaAt(x, y),
          color: Math.random() < 0.2 ? "#c9b8ff" : "#ffffff",
        });
      }

      // A few brighter true stars, structureless, to keep the sky honest.
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        dots.push({
          x,
          y,
          size: 2 + Math.random() * 0.8,
          baseA: 0.5 + Math.random() * 0.2,
          m: 0,
          color: "#ffffff",
        });
      }

      dotsRef.current = dots;
      drawField(progressRef.current);
    };

    // Same guard as the drift field: URL-bar height jitter during mobile
    // scrolling must not regenerate and repaint the whole sky (which would
    // also visibly re-roll the stars). Debounced, real size changes only.
    let resizeTimer: number | null = null;
    const scheduleGenerate = () => {
      if (
        window.innerWidth === lastW &&
        Math.abs(window.innerHeight - lastH) < 160
      ) {
        return;
      }
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(generate, 200);
    };

    generate();
    window.addEventListener("resize", scheduleGenerate);
    return () => {
      window.removeEventListener("resize", scheduleGenerate);
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // The reveal: one slow tween, then the canvas is still again.
  useEffect(() => {
    if (!reveal) return;
    const startProgress = progressRef.current;
    const startTime = performance.now();
    const DURATION = 3000;
    const tick = (t: number) => {
      const raw = Math.min(1, (t - startTime) / DURATION);
      progressRef.current =
        startProgress + (1 - startProgress) * easeInOutCubic(raw);
      drawField(progressRef.current);
      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [reveal]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0 pointer-events-none"
      data-testid="canvas-mandala-illusion"
    />
  );
}
