/**
 * The scroll timeline for the valley.
 *
 * Ink-wash mountains at dawn: layered jade and slate ridges losing themselves in
 * mist, warm light low on the horizon, and air moving across the frame from left
 * to right. Everything is held translucent — the scene is meant to sit behind
 * the type, not compete with it, so no layer here is fully opaque.
 */
export interface ValleyStop {
  /** scroll progress, 0 = top of page, 1 = bottom */
  at: number;
  /** sky wash: high, middle, and the warm band on the horizon */
  sky: [string, string, string];
  /** how far each ridge has drifted, in viewport percent — far moves least */
  drift: [number, number, number, number];
  /** the low sun's vertical place and strength */
  sun: { y: number; opacity: number };
  /** overall mist density */
  mist: number;
}

/**
 * Ridge washes, far to near. Opacity is low on purpose: laid over each other
 * they build up the way ink does on wet paper, and the paper still shows
 * through.
 */
export const RIDGES = [
  { top: "#6d8896", base: "#48606f", opacity: 0.34, rim: "#cfe3e2", rimOpacity: 0.26 },
  { top: "#4a6a6a", base: "#2f4550", opacity: 0.44, rim: "#a9c9c0", rimOpacity: 0.2 },
  { top: "#2f4a4b", base: "#1d2e38", opacity: 0.56, rim: "#82a89c", rimOpacity: 0.16 },
  { top: "#1b2c2f", base: "#101c24", opacity: 0.72, rim: "#5c7f77", rimOpacity: 0.12 },
] as const;

export const VALLEY: ValleyStop[] = [
  {
    at: 0,
    sky: ["#081219", "#0f2630", "#2e443f"],
    drift: [0, 0, 0, 0],
    sun: { y: 74, opacity: 0.5 },
    mist: 0.85,
  },
  {
    at: 0.5,
    sky: ["#091520", "#133038", "#4e5541"],
    drift: [1.2, 2.6, 4.4, 7],
    sun: { y: 68, opacity: 0.66 },
    mist: 1,
  },
  {
    at: 1,
    sky: ["#0b1720", "#173740", "#6b5745"],
    drift: [2.4, 5, 8.4, 13],
    sun: { y: 60, opacity: 0.8 },
    mist: 0.78,
  },
];

/** Held still for anyone browsing with reduced motion on. */
export const RESTING = VALLEY[1];
