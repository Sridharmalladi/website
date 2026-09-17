/**
 * The scroll timeline for the midnight range.
 *
 * Realism here comes from value structure, not detail: distant ridges are
 * lighter and hazier because there is more air in front of them, near ridges
 * fall to almost black, and the mist sits *between* the layers rather than on
 * top of them. Nothing in the scene is ever brighter than the type.
 */
export interface MidnightStop {
  /** scroll progress, 0 = top of page, 1 = bottom */
  at: number;
  /** sky gradient: zenith, middle, the glow just above the ridgeline */
  sky: [string, string, string];
  /** how far each ridge has drifted, in viewport percent — far moves least */
  drift: [number, number, number];
  /** star field visibility */
  stars: number;
  /**
   * The moon. `y` is viewport percent; `nudge` is a small horizontal drift in
   * pixels. It is NOT free to roam: CSS parks it in the margin beside the text
   * column, because a disc this bright passing behind body copy destroys the
   * contrast (measured at 1.18:1 when it was positioned freely).
   */
  moon: { nudge: number; y: number; opacity: number };
}

/** Ridge fills, far to near. Each is a top-lit gradient over a darker base. */
export const RIDGES = [
  { top: "#2b3550", base: "#141b2e", opacity: 0.92, rim: "#9fb6e0", rimOpacity: 0.3 },
  { top: "#1b2338", base: "#0c111f", opacity: 0.96, rim: "#8aa0cc", rimOpacity: 0.22 },
  { top: "#0d1220", base: "#05070e", opacity: 1, rim: "#6e83ad", rimOpacity: 0.16 },
] as const;

export const MIDNIGHT: MidnightStop[] = [
  {
    at: 0,
    sky: ["#03040c", "#070c1c", "#132038"],
    drift: [0, 0, 0],
    stars: 0.95,
    moon: { nudge: 0, y: 16, opacity: 0.9 },
  },
  {
    at: 0.5,
    sky: ["#04050e", "#080e20", "#16263f"],
    drift: [1.4, 3.2, 6],
    stars: 0.8,
    moon: { nudge: -14, y: 12, opacity: 0.8 },
  },
  {
    at: 1,
    sky: ["#05060f", "#0a1124", "#1b2d48"],
    drift: [2.6, 6, 11],
    stars: 0.62,
    moon: { nudge: -26, y: 7, opacity: 0.66 },
  },
];

/** Held still for anyone browsing with reduced motion on. */
export const RESTING = MIDNIGHT[1];
