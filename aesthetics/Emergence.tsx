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
 * It used to measure the gap between a tile and the caption's resting place as
 * well, so the sentence could fly out of the picture. The words arrive at once
 * now, so there is nothing left to measure there.
 *
 * It does still measure one thing: which half of the shelf the hovered tile
 * sits in, so the two lines of text never land back on top of the shelf
 * itself. A tile in the top half gets its words at the bottom of the screen.
 * A tile in the bottom half gets them at the top. A tile sitting across the
 * middle counts as top half, so the words stay at the bottom by default and
 * only flip up once the tile has genuinely crossed into the lower half.
 *
 * This is measured against the shelf's own top and bottom, not the browser
 * window's. Measuring against the window means the halfway line moves every
 * time the window is resized or the page scrolls, and on some pages a late
 * layout shift, such as a web font swapping in a moment after first paint,
 * can nudge a tile across that line on its own — which reads as the caption
 * jumping from the bottom to the top on its own, with no second hover to
 * explain it. The shelf's own bounds do not move for reasons like that, so
 * the half a tile is in stays decided the moment it is decided.
 */
export default function Emergence() {
  useEffect(() => {
    const shelf = document.querySelector<HTMLElement>(".tiles");
    if (!shelf) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let lit: HTMLElement | null = null;

    const clear = () => {
      if (lit) lit.classList.remove("is-lit");
      lit = null;
      document.body.classList.remove("has-lit");
      document.body.classList.remove("info-top");
    };

    const light = (cell: HTMLElement) => {
      if (lit === cell) return;
      if (lit) lit.classList.remove("is-lit");
      lit = cell;
      cell.classList.add("is-lit");
      document.body.classList.add("has-lit");

      // the tile's own centre decides which half it is in, not the pointer,
      // so the text does not jump around as the pointer moves inside one
      // tile. Measured against the shelf's own bounds, not the window's; see
      // the note above this function for why.
      const box = cell.getBoundingClientRect();
      const shelfBox = shelf.getBoundingClientRect();
      const shelfMid = shelfBox.top + shelfBox.height / 2;
      const inBottomHalf = box.top + box.height / 2 > shelfMid;
      document.body.classList.toggle("info-top", inBottomHalf);
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
