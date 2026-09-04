"use client";

import { useEffect, useRef } from "react";

/**
 * requestAnimationFrame loop. Calls cb(dt) with dt in seconds.
 * Pauses while the tab is hidden and resets the clock on return.
 */
export function useRaf(cb: (dt: number) => void, active = true) {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      cbRef.current(dt);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (!document.hidden) last = performance.now();
    };

    raf = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active]);
}
