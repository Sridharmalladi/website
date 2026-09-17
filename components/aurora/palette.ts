/**
 * The scroll timeline for the aurora field.
 *
 * Three ribbons of light over a near-black ground. Each stop says where every
 * ribbon sits (viewport percentages) and what colour it burns; `useTransform`
 * interpolates between the stops as the page scrolls.
 *
 * Opacity is deliberately capped low — the ribbons sit under white type, and
 * anything brighter starts failing the contrast check in the test pass. The
 * working ceiling over this ground is about 0.42 — measured, not guessed.
 */
export interface Ribbon {
  /** centre of the ribbon, as a percentage of the viewport */
  x: number;
  y: number;
  color: string;
  opacity: number;
}

export interface AuroraStop {
  /** scroll progress, 0 = top of page, 1 = bottom */
  at: number;
  /** ground gradient: top, bottom */
  ground: [string, string];
  /** always three, always in the same order, so they interpolate cleanly */
  ribbons: [Ribbon, Ribbon, Ribbon];
}

export const AURORA: AuroraStop[] = [
  {
    at: 0,
    ground: ["#08070f", "#0d0a1a"],
    ribbons: [
      { x: 78, y: 18, color: "#a32c73", opacity: 0.386 },
      { x: 18, y: 46, color: "#4436a8", opacity: 0.414 },
      { x: 52, y: 92, color: "#c2702f", opacity: 0.193 },
    ],
  },
  {
    at: 0.4,
    ground: ["#07080f", "#0a0c1c"],
    ribbons: [
      { x: 62, y: 34, color: "#8e2f79", opacity: 0.359 },
      { x: 34, y: 62, color: "#1f6f86", opacity: 0.42 },
      { x: 70, y: 96, color: "#9c5d2c", opacity: 0.166 },
    ],
  },
  {
    at: 0.7,
    ground: ["#070911", "#0a0d1e"],
    ribbons: [
      { x: 30, y: 24, color: "#236f8c", opacity: 0.42 },
      { x: 74, y: 70, color: "#5b3a9e", opacity: 0.386 },
      { x: 40, y: 98, color: "#8a5230", opacity: 0.166 },
    ],
  },
  {
    at: 1,
    ground: ["#090711", "#120b18"],
    ribbons: [
      { x: 20, y: 40, color: "#7a2f6e", opacity: 0.304 },
      { x: 66, y: 56, color: "#3b3c92", opacity: 0.331 },
      { x: 48, y: 88, color: "#c07535", opacity: 0.304 },
    ],
  },
];

/** Held still for anyone browsing with reduced motion on. */
export const RESTING = AURORA[1];
