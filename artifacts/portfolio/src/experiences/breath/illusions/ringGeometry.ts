/**
 * One source of truth for the ritual's ring geometry.
 *
 * The drift field lays its scalloped bands on a self-similar geometric
 * progression: each band is a fixed fraction taller than the one inside it,
 * so the pattern stays equally dense at every scale and runs all the way
 * into the still point, like the classic pulsing-tunnel plates. The round-3
 * mandala settles onto a thinned subset of the SAME circles, so the carried
 * afterimage still finds familiar radii among the stars.
 */
export const DRIFT_CORE_RADIUS = 7; // innermost band; the pattern reaches in this far
export const DRIFT_BAND_RATIO = 1.13; // outward growth per band

export function driftBandRadii(maxRadius: number): number[] {
  const radii: number[] = [];
  for (let r = DRIFT_CORE_RADIUS; r < maxRadius; r *= DRIFT_BAND_RATIO) {
    radii.push(r);
  }
  return radii;
}

export function mandalaRingRadii(maxRadius: number): number[] {
  // Every third drift band, thinned so the gaussian star-bands (sigma ~13px)
  // read as separate rings instead of merging near the center.
  const rings: number[] = [];
  const bands = driftBandRadii(maxRadius);
  for (let i = 0; i < bands.length; i += 3) {
    const r = bands[i];
    if (r < 60) continue;
    if (rings.length > 0 && r - rings[rings.length - 1] < 34) continue;
    rings.push(r);
  }
  return rings;
}
