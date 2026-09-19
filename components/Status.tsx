"use client";

import { useEffect, useState } from "react";
import { blockAt, type Block } from "@/config/day";
import { hourInChicago } from "@/aesthetics/palette";

/**
 * The one line above the masthead that says what I am probably doing: a
 * static lead in, then a word that types itself out, holds, and backspaces
 * into the next one for as long as the block of the day runs.
 *
 * It picks the block of the day from the clock in Chicago. Typing is driven
 * by its own chain of timeouts rather than a fixed interval, because typing
 * and deleting run at different speeds and the hold in between is longer
 * than either.
 *
 * The typed word is hidden from screen readers, because a word that keeps
 * being typed and deleted is noise when it is read out. They get the
 * block's label once, which is the part that actually carries meaning.
 */
const TYPE_MS = 55;
const DELETE_MS = 32;
const HOLD_MS = 1500;
const GAP_MS = 300;

export default function Status() {
  const [block, setBlock] = useState<Block | null>(null);
  const [display, setDisplay] = useState("");

  // Read the clock only in the browser, so the page Next exports and the first
  // render in the browser are the same.
  useEffect(() => {
    const read = () => setBlock(blockAt(hourInChicago()));
    read();
    const clock = window.setInterval(read, 60_000);
    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    if (!block) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(block.words[0]);
      return;
    }

    let cancelled = false;
    let timer: number;
    let wordAt = 0;

    const typeWord = () => {
      if (cancelled) return;
      const word = block.words[wordAt % block.words.length];
      let i = 0;

      const typeStep = () => {
        if (cancelled) return;
        i++;
        setDisplay(word.slice(0, i));
        timer = window.setTimeout(
          i < word.length ? typeStep : deleteWord,
          i < word.length ? TYPE_MS : HOLD_MS,
        );
      };

      const deleteWord = () => {
        if (cancelled) return;
        let j = word.length;

        const deleteStep = () => {
          if (cancelled) return;
          j--;
          setDisplay(word.slice(0, j));
          if (j > 0) {
            timer = window.setTimeout(deleteStep, DELETE_MS);
          } else {
            wordAt++;
            timer = window.setTimeout(typeWord, GAP_MS);
          }
        };

        deleteStep();
      };

      typeStep();
    };

    typeWord();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [block]);

  if (!block) return null;

  const widest = Math.max(...block.words.map((w) => w.length));

  return (
    <p className="status">
      <span className="status__dot" aria-hidden />
      <span className="status__lead">right now sridhar is probably</span>
      <span className="status__word" style={{ minWidth: `${widest}ch` }} aria-hidden>
        {display}
        <span className="status__cursor" aria-hidden />
      </span>
      <span className="sr-only">{block.label}</span>
    </p>
  );
}
