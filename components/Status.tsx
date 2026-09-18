"use client";

import { useEffect, useState } from "react";
import { blockAt, type Block } from "@/config/day";
import { hourInChicago } from "@/aesthetics/palette";

/**
 * The line at the top of the page that says what I am probably doing.
 *
 * It picks the block of the day from the clock in Chicago, then keeps cycling
 * through that block's words till the block ends. The word changes on a timer
 * and not on a render, so the page stays still otherwise.
 *
 * The cycling word is hidden from screen readers, because a word that keeps
 * changing is noise when it is read out. They get the block's label once,
 * which is the part that actually carries meaning.
 */
const EVERY = 3600;

export default function Status() {
  const [block, setBlock] = useState<Block | null>(null);
  const [at, setAt] = useState(0);

  // Read the clock only in the browser, so the page Next exports and the first
  // render in the browser are the same.
  useEffect(() => {
    const read = () => {
      const now = blockAt(hourInChicago());
      setBlock((was) => {
        if (!was || was.label !== now.label || was.from !== now.from) setAt(0);
        return now;
      });
    };

    read();
    const clock = window.setInterval(read, 60_000);
    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    if (!block) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spin = window.setInterval(() => {
      setAt((i) => (i + 1) % block.words.length);
    }, EVERY);
    return () => window.clearInterval(spin);
  }, [block]);

  if (!block) return null;

  const word = block.words[at % block.words.length];

  return (
    <p className="status">
      <span className="status__dot" aria-hidden />
      <span className="status__lead">right now sridhar is probably</span>
      <span className="status__word" key={`${block.from}-${at}`} aria-hidden>
        {word}
      </span>
      <span className="sr-only">{block.label}</span>
    </p>
  );
}
