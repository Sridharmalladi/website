// Virtual world is WORLD_W x WORLD_H units; the stage scales it to fit.
// Origin top-left, y increases downward (screen space) — physics flips as needed.
export const WORLD_W = 1280;
export const WORLD_H = 720;

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type ZoneKind = "about" | "links" | "worlds";

export interface Zone {
  id: ZoneKind;
  title: string;
  /** solid you can stand on; also the trigger area for the zone card */
  platform: Rect;
}

export const GROUND: Rect = { x: -200, y: 640, w: WORLD_W + 400, h: 200 };

export const zones: Zone[] = [
  { id: "about", title: "ABOUT", platform: { x: 150, y: 486, w: 300, h: 24 } },
  { id: "links", title: "LINKS", platform: { x: 560, y: 372, w: 260, h: 24 } },
  { id: "worlds", title: "WORLDS", platform: { x: 950, y: 512, w: 240, h: 24 } },
];

export const PLATFORMS: Rect[] = [GROUND, ...zones.map((z) => z.platform)];

export const PLAYER_SPAWN = { x: 70, y: 560 };
export const PLAYER_SIZE = { w: 34, h: 46 };
