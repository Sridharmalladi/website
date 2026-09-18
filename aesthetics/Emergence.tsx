"use client";

import { useEffect } from "react";

/**
 * Tells each caption where its tile is, so the sentence looks like it came out
 * of the picture you are pointing at.
 *
 * The caption lives at a fixed spot low on the screen. Before it is shown, this
 * parks it on top of its own tile — small, blurred, out of focus — by writing
 * the offset between the two onto the cell as custom properties. The CSS does
 * the rest: on hover it travels back to zero, which reads as the text leaving
 * the tile and settling into place.
 *
 * Measured on hover rather than on load, so scrolling and resizing need no
 * listeners and nothing is recalculated while the page sits still.
 */
export default function Emergence() {
  useEffect(() => {
    const shelf = document.querySelector<HTMLElement>(".tiles");
    if (!shelf) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const aim = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const cell = target?.closest<HTMLElement>(".cell");
      if (!cell) return;

      const tile = cell.querySelector<HTMLElement>(".tile");
      const blurb = cell.querySelector<HTMLElement>(".cell__blurb");
      if (!tile || !blurb) return;

      const box = tile.getBoundingClientRect();
      // where the caption comes to rest: centred, and 9vh off the bottom
      const restX = window.innerWidth / 2;
      const restY = window.innerHeight * 0.91 - blurb.offsetHeight / 2;

      cell.style.setProperty("--ox", `${Math.round(box.left + box.width / 2 - restX)}px`);
      cell.style.setProperty("--oy", `${Math.round(box.top + box.height / 2 - restY)}px`);
    };

    shelf.addEventListener("pointerover", aim);
    shelf.addEventListener("focusin", aim);
    return () => {
      shelf.removeEventListener("pointerover", aim);
      shelf.removeEventListener("focusin", aim);
    };
  }, []);

  return null;
}
