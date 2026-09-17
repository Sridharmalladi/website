/**
 * Single source of truth for the strip's geometry.
 *
 * The artwork and the copy both derive their positions from this map, so a
 * change to one can't silently drift away from the other. Previously the copy
 * carried hand-typed percentages that had to be kept in sync by hand.
 */

export const STRIP_W = 1200;
export const STRIP_H = 6870;

export interface Band {
  id: string;
  /** strip-unit range this band occupies */
  from: number;
  to: number;
}

export const BANDS: Band[] = [
  { id: "space", from: 0, to: 1800 },
  { id: "sky", from: 1800, to: 2700 },
  { id: "surface", from: 2700, to: 3560 },
  { id: "subway", from: 3560, to: 4560 },
  { id: "fossils", from: 4560, to: 5620 },
  { id: "core", from: 5620, to: 6870 },
];

/**
 * Copy placement no longer lives here: the blocks are positioned from CSS
 * custom properties (--at-about, --at-work, --at-contact in globals.css) so
 * they can be tuned per breakpoint against the artwork's own height.
 */
