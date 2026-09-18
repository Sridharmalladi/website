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
 * The ranges.
 *
 * Flat triangles in a hard colour read as clip art no matter how the outline is
 * drawn, so the work here is mostly in the rendering rather than the shape.
 * Each range is filled with a gradient that dissolves into the haze near its
 * own base, so the foot of every layer disappears into the mist instead of
 * ending on a line. The layers behind sit in more blur and closer to the colour
 * of the sky, which is what makes distance read.
 *
 * The outlines themselves are a few big masses rather than a row of identical
 * spikes: four or five forms per range, each with its own width and lean, and
 * the summits kept from rounding off by holding a point close on either side.
 * Everything comes from a fixed seed, so the shape is the same on the server
 * and in the browser.
 */
const lcg = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

type Range = {
  seed: number;
  /** how many masses across the whole width */
  count: number;
  /** summits land between these two heights */
  top: number;
  bottom: number;
  /** the line the feet of the range sit on */
  base: number;
};

const RANGES: { name: string; range: Range }[] = [
  { name: "far", range: { seed: 20260918, count: 6, top: 96, bottom: 176, base: 300 } },
  { name: "mid", range: { seed: 77731, count: 5, top: 168, bottom: 232, base: 332 } },
  { name: "near", range: { seed: 4242, count: 4, top: 236, bottom: 286, base: 360 } },
];

/** Catmull Rom through the points, written out as cubic curves. */
const through = (pts: [number, number][]) => {
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? pts[i + 1];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
};

const rangePath = ({ seed, count, top, bottom, base }: Range) => {
  const rand = lcg(seed);
  const span = 1600 / count;
  const pts: [number, number][] = [[-80, base]];
  let x = -80;

  for (let i = 0; i < count; i += 1) {
    const w = span * (0.72 + rand() * 0.6);
    const y = top + rand() * (bottom - top);
    const summit = x + w * (0.34 + rand() * 0.32);
    const drop = base - y;

    // the shoulders: held close to the summit so the curve stays a peak, and
    // set at different heights so the two flanks never match
    pts.push([summit - w * (0.2 + rand() * 0.1), y + drop * (0.34 + rand() * 0.2)]);
    pts.push([summit, y]);
    pts.push([summit + w * (0.2 + rand() * 0.12), y + drop * (0.36 + rand() * 0.22)]);

    x += w;
    // the saddle, which never quite reaches the floor
    pts.push([x, base - rand() * (drop * 0.18)]);
  }

  pts.push([1600, base]);
  return `${through(pts)} L1600,380 L-80,380 Z`;
};

/**
 * The treeline along the floor of the valley: a run of conifers of varied
 * height and width from the same seeded generator, drawn as one path so the
 * whole forest costs a single node.
 */
const treelinePath = (seed: number, count: number, floor: number) => {
  const rand = lcg(seed);
  const step = 1520 / count;
  let d = `M-40,${floor}`;
  let x = -40;

  for (let i = 0; i < count; i += 1) {
    const w = step * (0.6 + rand() * 0.9);
    const h = 16 + rand() * 28;
    const cx = x + w / 2;
    const top = floor - h;
    // a conifer: two steps down each flank rather than a plain triangle
    d += ` L${(cx - w * 0.16).toFixed(1)},${(top + h * 0.34).toFixed(1)}`;
    d += ` L${(cx - w * 0.07).toFixed(1)},${(top + h * 0.3).toFixed(1)}`;
    d += ` L${cx.toFixed(1)},${top.toFixed(1)}`;
    d += ` L${(cx + w * 0.07).toFixed(1)},${(top + h * 0.3).toFixed(1)}`;
    d += ` L${(cx + w * 0.16).toFixed(1)},${(top + h * 0.34).toFixed(1)}`;
    x += w;
    d += ` L${x.toFixed(1)},${floor}`;
  }

  return `${d} L1520,${floor} L1520,${floor + 60} L-40,${floor + 60} Z`;
};

/**
 * The tree on the outcrop — the one thing in those scenes you actually
 * remember. Drawn as strokes rather than filled outlines: a trunk that thickens
 * towards the root and leans out over the drop, limbs spreading wide and
 * thinning as they go, and a canopy of overlapping blossom that is far wider
 * than it is tall and sags at the edges. The petals coming down the page fall
 * from it.
 *
 * Coordinates are in a 280x300 box, ground at the bottom.
 */
const LIMBS: { d: string; w: number }[] = [
  // trunk, root to crown
  { d: "M138,300 C132,262 126,232 132,202 C136,182 142,168 150,152", w: 19 },
  // the two that carry the canopy
  { d: "M133,214 C110,204 88,196 62,190", w: 10 },
  { d: "M136,196 C162,186 190,178 216,174", w: 10 },
  // upper limbs
  { d: "M143,172 C126,156 112,146 94,138", w: 7 },
  { d: "M147,162 C167,146 187,138 208,132", w: 7 },
  { d: "M150,152 C150,138 149,128 145,116", w: 6 },
  // twigs
  { d: "M100,196 C88,184 78,176 66,170", w: 4 },
  { d: "M190,180 C202,170 212,164 224,160", w: 4 },
];

/** cx, cy, rx, ry, opacity — an irregular mass, widest through the middle. */
const CANOPY: [number, number, number, number, number][] = [
  [140, 131, 104, 42, 0.3],
  [82, 143, 58, 30, 0.26],
  [198, 139, 60, 30, 0.26],
  [112, 111, 62, 30, 0.28],
  [172, 115, 56, 28, 0.26],
  [140, 97, 46, 24, 0.22],
  [48, 157, 34, 19, 0.2],
  [232, 153, 32, 18, 0.19],
  [96, 165, 40, 19, 0.21],
  [186, 163, 38, 18, 0.2],
  [140, 155, 70, 23, 0.19],
  [66, 127, 28, 16, 0.17],
  [214, 123, 26, 15, 0.17],
];

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
        <defs>
          {RANGES.map(({ name, range }) => (
            <linearGradient
              key={name}
              id={`range-${name}`}
              x1="0"
              y1={range.top - 30}
              x2="0"
              y2={range.base + 10}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" className={`sky__stop sky__stop--${name}`} />
              <stop offset="58%" className={`sky__stop sky__stop--${name}`} />
              <stop offset="100%" className="sky__stop sky__stop--haze" />
            </linearGradient>
          ))}
        </defs>
        {RANGES.map((r) => (
          <path
            key={r.name}
            className={`sky__ridge sky__ridge--${r.name}`}
            fill={`url(#range-${r.name})`}
            d={rangePath(r.range)}
          />
        ))}
      </svg>

      <svg className="sky__treeline" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden>
        <defs>
          {/* the forest fades into the same haze the ranges do */}
          <linearGradient id="pines-far" x1="0" y1="52" x2="0" y2="118" gradientUnits="userSpaceOnUse">
            <stop offset="0%" className="sky__stop sky__stop--mid" />
            <stop offset="100%" className="sky__stop sky__stop--haze" />
          </linearGradient>
          <linearGradient id="pines-near" x1="0" y1="92" x2="0" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" className="sky__stop sky__stop--near" />
            <stop offset="70%" className="sky__stop sky__stop--near" />
            <stop offset="100%" className="sky__stop sky__stop--haze" />
          </linearGradient>
        </defs>
        <path className="sky__pines sky__pines--far" fill="url(#pines-far)" d={treelinePath(9911, 64, 92)} />
        <path className="sky__pines sky__pines--near" fill="url(#pines-near)" d={treelinePath(5522, 44, 126)} />
      </svg>

      <svg className="sky__tree" viewBox="0 0 280 300" aria-hidden>
        {/* the ledge it stands on, running off both edges */}
        <path
          className="sky__rock"
          d="M-10,300 L2,276 C34,262 78,254 132,256 C186,258 232,268 262,282 L272,300 Z"
        />
        {LIMBS.map((l, i) => (
          <path key={i} className="sky__limb" d={l.d} strokeWidth={l.w} />
        ))}
        {CANOPY.map(([cx, cy, rx, ry, o], i) => (
          <ellipse key={i} className="sky__bloom" cx={cx} cy={cy} rx={rx} ry={ry} opacity={o} />
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
