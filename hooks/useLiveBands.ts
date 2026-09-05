"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { BANDS, STRIP_H } from "@/config/bands";

/**
 * Which bands are near enough to the viewport to be worth animating.
 *
 * Every band used to animate all the time, including scenes thousands of pixels
 * off-screen — pure wasted compositing and battery. This returns the set of
 * band indices intersecting the viewport (plus a margin either side); anything
 * else gets its animations paused in CSS.
 *
 * State only changes when the set changes, so scrolling doesn't re-render.
 */
export function useLiveBands(ref: RefObject<HTMLElement | null>) {
  const [live, setLive] = useState<Set<number>>(() => new Set([0, 1]));
  const lastKey = useRef("0,1");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      if (rect.height === 0) return;

      const unit = rect.height / STRIP_H; // px per strip unit
      const topUnit = -rect.top / unit;
      const bottomUnit = (window.innerHeight - rect.top) / unit;
      const margin = 900;

      const next = new Set<number>();
      BANDS.forEach((b, i) => {
        if (b.to > topUnit - margin && b.from < bottomUnit + margin) next.add(i);
      });
      if (next.size === 0) next.add(0);

      const key = [...next].join(",");
      if (key !== lastKey.current) {
        lastKey.current = key;
        setLive(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return live;
}
