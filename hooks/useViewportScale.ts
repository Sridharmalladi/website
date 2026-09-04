"use client";

import { useEffect, useState } from "react";

export interface Fit {
  scale: number;
  /** centering offset in CSS px */
  ox: number;
  oy: number;
  vw: number;
  vh: number;
}

/** Fit a worldW x worldH stage into the viewport (contain), centered. */
export function useViewportScale(worldW: number, worldH: number): Fit {
  const [fit, setFit] = useState<Fit>({
    scale: 1,
    ox: 0,
    oy: 0,
    vw: worldW,
    vh: worldH,
  });

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.min(vw / worldW, vh / worldH);
      setFit({
        scale,
        ox: (vw - worldW * scale) / 2,
        oy: (vh - worldH * scale) / 2,
        vw,
        vh,
      });
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, [worldW, worldH]);

  return fit;
}
