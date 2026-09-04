// The 3 "modes of view". Palettes live in globals.css keyed by [data-world].
// Components read CSS vars; this file is just identity + order + copy.
export type WorldId = "DAY" | "DUSK" | "NIGHT";

export interface World {
  id: WorldId;
  label: string;
  blurb: string;
}

export const worlds: World[] = [
  { id: "DAY", label: "DAY", blurb: "Bright and friendly. The default." },
  { id: "DUSK", label: "DUSK", blurb: "Hot pink sky. The loud one." },
  { id: "NIGHT", label: "NIGHT", blurb: "Indigo and neon. Arcade after dark." },
];

export const DEFAULT_WORLD: WorldId = "DAY";
export const WORLD_IDS = worlds.map((w) => w.id);
