import { useEffect, useRef } from "react";
import { driftBandRadii } from "./ringGeometry";

/**
 * Anomalous-motion field in the spirit of Kitaoka's drifting-wave plates,
 * in two zones that share one self-similar geometry:
 *
 * - Outer field: contiguous scalloped bands carrying the four-luminance
 *   drift sequence (near-black, violet, white, cyan). Adjacent bands run
 *   the sequence in opposite directions, so the field ripples and
 *   counter-rotates while not a single pixel moves.
 * - Inner zone (near the still point): sparse, spaced rings floating on
 *   black. Every other band stays dark, the palette hardens to full black
 *   and full white, and each ring is twisted a few degrees further than
 *   the one outside it, so the scallop crests chain into spirals that
 *   wind down to the core.
 *
 * Drawn ONCE per resize; the motion is manufactured by the viewer's retina.
 */
export function StaticDriftIllusion({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastW = 0;
    let lastH = 0;

    const draw = () => {
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);
      lastW = width;
      lastH = height;
      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.hypot(cx, cy) + 40;

      ctx.fillStyle = "#05020a";
      ctx.fillRect(0, 0, width, height);

      // Drift sequences: the eye reads illusory motion in the direction
      // dark -> violet -> light -> cyan. The inner zone pushes the same
      // sequence to pure black and pure white for a harder snap.
      const seqOuter = ["#0b0514", "#8b45e0", "#f6f2ff", "#48ddd2"];
      const seqInner = ["#000000", "#9b30ff", "#ffffff", "#2ff2e4"];

      // Fixed number of scallop arms at every radius, so crests line up
      // ring-to-ring; inside the sparse zone each ring gets extra twist,
      // bending those chains into spirals.
      const ARMS = 36;
      const TWIST_STEP = 0.035; // radians of extra twist per band, inward

      const INNER_LIMIT = Math.min(cx, cy) * 0.62;

      const radii = driftBandRadii(maxRadius);
      let boundaryIndex = radii.findIndex((r) => r >= INNER_LIMIT);
      if (boundaryIndex === -1) boundaryIndex = radii.length;

      for (let bandIndex = 0; bandIndex < radii.length; bandIndex++) {
        const r = radii[bandIndex];
        const inner = bandIndex < boundaryIndex;
        // Sparse zone: every other band stays dark, so the rings float
        // spaced apart instead of tiling the disc.
        if (inner && bandIndex % 2 === 1) continue;

        const nextR =
          bandIndex + 1 < radii.length
            ? radii[bandIndex + 1]
            : r + (r - radii[bandIndex - 1]);
        const bandH = nextR - r;
        // Scallop depth scales with the band, so the waves stay self-similar
        // from the huge outer swells down to the shimmer around the core.
        const amp = Math.min(26, Math.max(0.6, bandH * 0.42));

        const units = Math.max(12, Math.round((2 * Math.PI * r) / 18));
        const unitAngle = (2 * Math.PI) / units;
        const subAngle = unitAngle / 4;
        const reversed = inner
          ? (bandIndex / 2) % 2 === 1
          : bandIndex % 2 === 1;
        const twist = inner ? (boundaryIndex - bandIndex) * TWIST_STEP : 0;
        const offset = (reversed ? unitAngle / 2 : 0) + twist;
        const seq = inner ? seqInner : seqOuter;

        // Outer bands overlap a hair to avoid seams; inner rings stay
        // narrower than the space they own so black shows between them.
        ctx.lineWidth = inner
          ? Math.max(1.2, bandH * 0.95)
          : bandH + Math.max(1, Math.min(4, bandH * 0.5));

        for (let u = 0; u < units; u++) {
          const mid = offset + (u + 0.5) * unitAngle;
          // Sharpened sine: flat crests, quick crossings, chevron-like.
          const wave = Math.sin(mid * ARMS);
          const wobble = Math.sign(wave) * Math.pow(Math.abs(wave), 0.6) * amp;
          for (let s = 0; s < 4; s++) {
            const colorIndex = reversed ? 3 - s : s;
            const a0 = offset + u * unitAngle + s * subAngle;
            ctx.beginPath();
            ctx.strokeStyle = seq[colorIndex];
            ctx.arc(cx, cy, r + bandH / 2 + wobble, a0, a0 + subAngle + 0.004);
            ctx.stroke();
          }
        }
      }

      // A pin-hole of dark at the exact center: just enough for the point
      // of light to read. The pattern owns everything else.
      const eye = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26);
      eye.addColorStop(0, "rgba(5,2,10,1)");
      eye.addColorStop(0.6, "rgba(5,2,10,0.9)");
      eye.addColorStop(1, "rgba(5,2,10,0)");
      ctx.fillStyle = eye;
      ctx.beginPath();
      ctx.arc(cx, cy, 27, 0, Math.PI * 2);
      ctx.fill();

      // Soften the outer corners back into the void.
      const vignette = ctx.createRadialGradient(
        cx,
        cy,
        Math.min(cx, cy) * 0.8,
        cx,
        cy,
        maxRadius,
      );
      vignette.addColorStop(0, "rgba(5,2,10,0)");
      vignette.addColorStop(1, "rgba(5,2,10,0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    // Mobile browsers fire resize continuously while the URL bar collapses
    // and expands during scroll. Redrawing thousands of stroked arcs
    // synchronously for each of those events can stall the main thread hard
    // enough that the browser kills and reloads the page. Only a real size
    // change (width, or a large height jump) earns a repaint, debounced.
    let resizeTimer: number | null = null;
    const scheduleDraw = () => {
      if (
        window.innerWidth === lastW &&
        Math.abs(window.innerHeight - lastH) < 160
      ) {
        return;
      }
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(draw, 200);
    };

    draw();
    window.addEventListener("resize", scheduleDraw);
    return () => {
      window.removeEventListener("resize", scheduleDraw);
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${active ? "opacity-100" : "opacity-0"}`}
      data-testid="canvas-drift-illusion"
    />
  );
}
