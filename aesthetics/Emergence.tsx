"use client";

import { useEffect } from "react";

/**
 * Runs the focus effect: which product is lit, and where its caption flies in
 * from.
 *
 * This used to be plain CSS :hover, which latches. If the pointer leaves the
 * window without crossing the edge of a tile, which is what happens when you
 * switch tab, click through to a project, or use the keyboard, the browser
 * keeps the last hover state and the page stays dark until you go back and
 * wave the pointer over that tile again. So the state is explicit instead: a
 * class on the cell, a class on the body, and every way out of the page clears
 * both.
 *
 * It also parks the caption on top of the tile before it is shown, by writing
 * the gap between the tile and the caption's resting place onto the cell, which
 * is what makes the sentence look like it came out of the picture. Measured on
 * hover, so there are no scroll or resize listeners.
 */
export default function Emergence() {
  useEffect(() => {
    const shelf = document.querySelector<HTMLElement>(".tiles");
    if (!shelf) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let lit: HTMLElement | null = null;

    const aim = (cell: HTMLElement) => {
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

    const clear = () => {
      if (lit) lit.classList.remove("is-lit");
      lit = null;
      document.body.classList.remove("has-lit");
    };

    const light = (cell: HTMLElement) => {
      if (lit === cell) return;
      if (lit) lit.classList.remove("is-lit");
      lit = cell;
      aim(cell);
      cell.classList.add("is-lit");
      document.body.classList.add("has-lit");
    };

    const onEnter = (event: Event) => {
      const cell = (event.target as HTMLElement | null)?.closest<HTMLElement>(".cell");
      // the gaps between tiles count as leaving
      if (cell) light(cell);
      else clear();
    };

    const onLeaveFocus = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (!next || !shelf.contains(next)) clear();
    };

    const onHidden = () => {
      if (document.hidden) clear();
    };

    shelf.addEventListener("pointerover", onEnter);
    shelf.addEventListener("pointerleave", clear);
    shelf.addEventListener("focusin", onEnter);
    shelf.addEventListener("focusout", onLeaveFocus as EventListener);
    // every way the pointer can leave without crossing a tile edge
    document.addEventListener("mouseleave", clear);
    document.addEventListener("visibilitychange", onHidden);
    window.addEventListener("blur", clear);
    window.addEventListener("pageshow", clear);

    return () => {
      shelf.removeEventListener("pointerover", onEnter);
      shelf.removeEventListener("pointerleave", clear);
      shelf.removeEventListener("focusin", onEnter);
      shelf.removeEventListener("focusout", onLeaveFocus as EventListener);
      document.removeEventListener("mouseleave", clear);
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("blur", clear);
      window.removeEventListener("pageshow", clear);
      clear();
    };
  }, []);

  return null;
}
