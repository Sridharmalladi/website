/**
 * The scroll timeline, sunrise to sunset.
 *
 * Every stop stays in a low-luminance register: the sky moves through night,
 * dawn, noon haze and dusk without ever going bright enough to fight the white
 * type sitting on top of it. Three colours per stop — top of sky, mid, horizon —
 * plus where the sun sits and how warm it burns.
 */
export interface SkyStop {
  /** scroll progress, 0 = top of page, 1 = bottom */
  at: number;
  /** top, middle, horizon */
  sky: [string, string, string];
  /** sun position as a percentage of the viewport */
  sun: { x: number; y: number };
  /** sun disc and its halo */
  disc: string;
  halo: string;
  /** how visible the stars are at this point */
  stars: number;
}

export const SKY: SkyStop[] = [
  {
    at: 0,
    sky: ["#080a1c", "#141433", "#2a1f45"],
    sun: { x: 84, y: 96 },
    disc: "#ff9a5c",
    halo: "rgba(255, 138, 74, 0.34)",
    stars: 0.9,
  },
  {
    at: 0.34,
    sky: ["#1d1a3d", "#4a2f5c", "#b85f6a"],
    sun: { x: 66, y: 58 },
    disc: "#ffb774",
    halo: "rgba(255, 150, 90, 0.4)",
    stars: 0.35,
  },
  {
    at: 0.62,
    sky: ["#2b2b55", "#5d4272", "#c98079"],
    sun: { x: 42, y: 30 },
    disc: "#ffd9a3",
    halo: "rgba(255, 196, 140, 0.4)",
    stars: 0.08,
  },
  {
    at: 1,
    sky: ["#100e26", "#3a2148", "#8d4560"],
    sun: { x: 14, y: 84 },
    disc: "#ff8a5c",
    halo: "rgba(255, 110, 80, 0.36)",
    stars: 0.55,
  },
];
