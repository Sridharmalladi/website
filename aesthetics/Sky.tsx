"use client";

import { useEffect, useState } from "react";
import { hourInChicago, orbAt, skyAt } from "./palette";

/**
 * The valley behind the page: a sky that changes with the clock in
 * America/Chicago, a sun or moon riding its arc across it, mist drifting
 * sideways, three ridges receding into haze, and blossom coming down.
 *
 * Everything is a div or a path — no images, no canvas, no library. The whole
 * thing is painted at low opacity and sits behind the shelf, so it reads as
 * weather rather than as a picture competing with the work.
 */

/**
 * The ridges, back to front. Each summit is a spire: two straight flanks that
 * climb out of the saddle beside it and a short curve over the tip. Straight
 * sides are the whole point — smoothing the whole outline turns karst into
 * rolling hills, which is the wrong film entirely.
 *
 * `x` is the summit, `y` its height, `w` the width of its base, `saddle` how
 * low the valley to its right drops. All in the 1440x360 box the SVG stretches.
 */
type Peak = { x: number; y: number; w: number; saddle: number };

const RIDGES: { name: string; peaks: Peak[] }[] = [
  {
    name: "far",
    peaks: [
      { x: 48, y: 150, w: 120, saddle: 236 },
      { x: 186, y: 104, w: 132, saddle: 244 },
      { x: 330, y: 158, w: 108, saddle: 232 },
      { x: 470, y: 88, w: 146, saddle: 246 },
      { x: 628, y: 146, w: 116, saddle: 230 },
      { x: 768, y: 112, w: 138, saddle: 242 },
      { x: 918, y: 162, w: 104, saddle: 234 },
      { x: 1054, y: 94, w: 142, saddle: 244 },
      { x: 1208, y: 152, w: 122, saddle: 236 },
      { x: 1352, y: 110, w: 134, saddle: 240 },
    ],
  },
  {
    name: "mid",
    peaks: [
      { x: 92, y: 204, w: 168, saddle: 286 },
      { x: 272, y: 160, w: 186, saddle: 292 },
      { x: 470, y: 212, w: 156, saddle: 284 },
      { x: 652, y: 172, w: 192, saddle: 290 },
      { x: 856, y: 206, w: 164, saddle: 286 },
      { x: 1040, y: 156, w: 198, saddle: 292 },
      { x: 1248, y: 210, w: 170, saddle: 284 },
      { x: 1420, y: 168, w: 180, saddle: 288 },
    ],
  },
  {
    name: "near",
    peaks: [
      { x: 70, y: 266, w: 240, saddle: 328 },
      { x: 336, y: 238, w: 268, saddle: 332 },
      { x: 620, y: 272, w: 250, saddle: 326 },
      { x: 892, y: 244, w: 276, saddle: 330 },
      { x: 1176, y: 268, w: 244, saddle: 328 },
      { x: 1420, y: 248, w: 236, saddle: 330 },
    ],
  },
];

/** One ridge: out of each saddle, up a straight flank, over the tip, down. */
const ridgePath = (peaks: Peak[]) => {
  const floor = 360;
  let d = `M-40,${peaks[0].saddle}`;
  for (const { x, y, w, saddle } of peaks) {
    const half = w / 2;
    const tip = Math.min(18, (saddle - y) * 0.22);
    d += ` L${x - half},${saddle}`;
    d += ` L${x - half * 0.16},${y + tip}`;
    d += ` Q${x},${y} ${x + half * 0.16},${y + tip}`;
    d += ` L${x + half},${saddle}`;
  }
  d += ` L1480,${peaks[peaks.length - 1].saddle} L1480,${floor} L-40,${floor} Z`;
  return d;
};

/**
 * Blossom. Fixed values rather than random ones, so the server and the browser
 * draw the same petals and nothing has to be re-rendered on hydration.
 */
const PETALS = [
  { left: 4, delay: 0, dur: 19, size: 9, drift: 60, spin: 200 },
  { left: 13, delay: 6, dur: 24, size: 7, drift: -48, spin: -260 },
  { left: 22, delay: 12, dur: 21, size: 10, drift: 74, spin: 180 },
  { left: 31, delay: 3, dur: 27, size: 6, drift: -66, spin: 300 },
  { left: 40, delay: 16, dur: 20, size: 8, drift: 52, spin: -220 },
  { left: 49, delay: 9, dur: 25, size: 11, drift: -80, spin: 240 },
  { left: 58, delay: 20, dur: 22, size: 7, drift: 68, spin: -180 },
  { left: 67, delay: 2, dur: 28, size: 9, drift: -54, spin: 280 },
  { left: 76, delay: 14, dur: 23, size: 6, drift: 84, spin: -300 },
  { left: 85, delay: 8, dur: 26, size: 10, drift: -62, spin: 210 },
  { left: 94, delay: 18, dur: 21, size: 8, drift: 46, spin: -240 },
];

export default function Sky() {
  // Null until the browser has read the clock, so the markup rendered at build
  // time and the first client render agree.
  const [vars, setVars] = useState<React.CSSProperties | undefined>(undefined);
  const [moon, setMoon] = useState(true);

  useEffect(() => {
    const paint = () => {
      const hour = hourInChicago();
      const sky = skyAt(hour);
      const orb = orbAt(hour);
      setMoon(orb.moon);
      setVars({
        "--sky-high": sky.high,
        "--sky-horizon": sky.horizon,
        "--sky-haze": sky.haze,
        "--sky-ridge-far": sky.ridgeFar,
        "--sky-ridge-mid": sky.ridgeMid,
        "--sky-ridge-near": sky.ridgeNear,
        "--sky-cloud": sky.cloud,
        "--sky-petal": sky.petal,
        "--sky-orb": sky.orb,
        "--sky-orb-glow": sky.orbGlow,
        "--sky-orb-x": `${orb.x}%`,
        "--sky-orb-y": `${orb.y}%`,
      } as React.CSSProperties);
    };

    paint();
    // A minute is plenty: the slowest thing here is the sun, and it takes
    // thirteen hours to cross.
    const tick = window.setInterval(paint, 60_000);
    return () => window.clearInterval(tick);
  }, []);

  return (
    <div className="sky" style={vars} data-lit={vars ? "yes" : "no"} aria-hidden>
      <div className="sky__wash" />
      <div className={`sky__orb${moon ? " sky__orb--moon" : ""}`} />
      <div className="sky__mist sky__mist--high" />
      <div className="sky__mist sky__mist--low" />

      <svg className="sky__ridges" viewBox="0 0 1440 360" preserveAspectRatio="none">
        {RIDGES.map((r) => (
          <path key={r.name} className={`sky__ridge sky__ridge--${r.name}`} d={ridgePath(r.peaks)} />
        ))}
      </svg>

      {/* holds the page's contrast whatever the sky is doing */}
      <div className="sky__scrim" />

      <div className="sky__petals">
        {PETALS.map((p, i) => (
          <span
            key={i}
            className="sky__petal"
            style={
              {
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size * 0.72}px`,
                animationDelay: `-${p.delay}s`,
                animationDuration: `${p.dur}s`,
                "--drift": `${p.drift}px`,
                "--spin": `${p.spin}deg`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
