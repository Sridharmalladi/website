"use client";

import type { ReactNode } from "react";

/**
 * The whole journey as ONE continuous SVG strip: outer planets -> Earth -> sky
 * -> city -> subway -> fossil beds -> core. A single background gradient spans
 * the full height so there are no seams between zones.
 *
 * Animation rule: an element that needs a fixed position AND a CSS animation
 * gets an OUTER <g transform> for placement and an INNER <g> for the animation —
 * an animated CSS transform would otherwise replace the SVG one.
 */

const W = 1200;
const H = 7000;

const GROUND = 3400; // street level
const ROAD_BOTTOM = 3540;
const RAIL_Y = 4230;
const DOME_CY = 7650;
const DOME_R = 800; // dome crown lands at y = 6850

/* ---------------------------------------------------------------- helpers -- */

function bezPoint(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number,
): [number, number] {
  const u = 1 - t;
  const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0];
  const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1];
  return [x, y];
}

/** A filled bone shaft: capsule with independently sized ends. */
function Bone({
  x1,
  y1,
  x2,
  y2,
  w = 10,
  w2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  w?: number;
  w2?: number;
}) {
  const r1 = w / 2;
  const r2 = (w2 ?? w) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const d =
    `M ${x1 + nx * r1} ${y1 + ny * r1} ` +
    `L ${x2 + nx * r2} ${y2 + ny * r2} ` +
    `A ${r2} ${r2} 0 0 1 ${x2 - nx * r2} ${y2 - ny * r2} ` +
    `L ${x1 - nx * r1} ${y1 - ny * r1} ` +
    `A ${r1} ${r1} 0 0 1 ${x1 + nx * r1} ${y1 + ny * r1} Z`;
  return <path d={d} fill="url(#bone)" stroke="var(--bone-line)" strokeWidth="1.5" />;
}

/* ----------------------------------------------------------------- space -- */

const STARS = Array.from({ length: 110 }, (_, i) => ({
  x: (i * 173 + 31) % W,
  y: (i * 149 + 17) % 1780,
  r: 0.6 + ((i * 29) % 6) * 0.26,
  o: 0.3 + ((i * 13) % 6) * 0.1,
  d: (i * 0.37) % 5,
}));

/** Outer planets first (small = far), arriving at Earth (large = near). */
function Space() {
  return (
    <>
      <ellipse cx="250" cy="300" rx="440" ry="330" fill="url(#neb-a)" />
      <ellipse cx="980" cy="1000" rx="430" ry="340" fill="url(#neb-b)" />

      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#fff"
          opacity={s.o}
          className="anim"
          style={{ animation: `twinkle ${3 + (i % 4)}s ease-in-out ${s.d}s infinite` }}
        />
      ))}

      {/* Neptune — furthest, so smallest */}
      <g>
        <circle cx="300" cy="170" r="17" fill="url(#neptune)" />
        <circle cx="300" cy="170" r="17" fill="none" stroke="#a8c8ff" strokeWidth="0.6" opacity="0.35" />
      </g>

      {/* Uranus */}
      <g>
        <circle cx="905" cy="330" r="25" fill="url(#uranus)" />
        <g transform="rotate(80 905 330)">
          <ellipse cx="905" cy="330" rx="41" ry="9" fill="none" stroke="#bfe8ee" strokeWidth="1.6" opacity="0.5" />
        </g>
      </g>

      {/* Saturn */}
      <g>
        <g transform="rotate(-18 400 620)">
          <ellipse cx="400" cy="620" rx="118" ry="28" fill="none" stroke="url(#ring)" strokeWidth="13" />
        </g>
        <circle cx="400" cy="620" r="58" fill="url(#saturn)" />
        <g clipPath="url(#saturn-clip)" opacity="0.3">
          <ellipse cx="400" cy="596" rx="70" ry="7" fill="#8a6023" />
          <ellipse cx="400" cy="628" rx="70" ry="6" fill="#fff0c0" opacity="0.5" />
          <ellipse cx="400" cy="652" rx="70" ry="8" fill="#8a6023" />
        </g>
        <g transform="rotate(-18 400 620)">
          <path d="M 282 620 A 118 28 0 0 0 518 620" fill="none" stroke="url(#ring)" strokeWidth="13" />
        </g>
      </g>

      {/* Jupiter — banded, with the Great Red Spot */}
      <g>
        <circle cx="855" cy="915" r="92" fill="url(#jupiter)" />
        <g clipPath="url(#jupiter-clip)">
          <ellipse cx="855" cy="858" rx="110" ry="12" fill="#c99b6a" opacity="0.55" />
          <ellipse cx="855" cy="888" rx="110" ry="9" fill="#f2dcc0" opacity="0.45" />
          <ellipse cx="855" cy="924" rx="110" ry="13" fill="#b8814f" opacity="0.5" />
          <ellipse cx="855" cy="956" rx="110" ry="10" fill="#f2dcc0" opacity="0.4" />
          <ellipse cx="855" cy="982" rx="110" ry="12" fill="#c99b6a" opacity="0.5" />
          <ellipse cx="812" cy="944" rx="26" ry="15" fill="#d4553a" opacity="0.85" />
        </g>
      </g>

      {/* Mars — rusty, with a polar cap */}
      <g>
        <circle cx="255" cy="1195" r="46" fill="url(#mars)" />
        <g clipPath="url(#mars-clip)">
          <ellipse cx="255" cy="1157" rx="26" ry="10" fill="#f6f0e8" opacity="0.8" />
          <ellipse cx="238" cy="1205" rx="18" ry="11" fill="#8a3a20" opacity="0.45" />
          <ellipse cx="276" cy="1224" rx="13" ry="8" fill="#8a3a20" opacity="0.4" />
        </g>
      </g>

      {/* Earth — nearest, so largest; we arrive here */}
      <g>
        <circle cx="740" cy="1520" r="176" fill="url(#earth-halo)" opacity="0.55" />
        <circle cx="740" cy="1520" r="132" fill="url(#earth)" />
        <g clipPath="url(#earth-clip)">
          {/* landmasses */}
          <path d="M660 1436 C 700 1420, 742 1438, 736 1470 C 730 1500, 686 1508, 664 1490 C 646 1476, 640 1450, 660 1436 Z" fill="#3f9e6a" opacity="0.9" />
          <path d="M770 1462 C 810 1450, 848 1470, 840 1500 C 832 1526, 792 1530, 774 1512 C 760 1498, 756 1472, 770 1462 Z" fill="#3f9e6a" opacity="0.85" />
          <path d="M690 1548 C 726 1538, 760 1560, 750 1592 C 740 1622, 700 1628, 682 1606 C 668 1588, 672 1560, 690 1548 Z" fill="#46a874" opacity="0.85" />
          <path d="M812 1560 C 842 1554, 866 1576, 856 1600 C 846 1622, 814 1624, 802 1606 C 792 1590, 796 1566, 812 1560 Z" fill="#3f9e6a" opacity="0.8" />
          {/* cloud bands */}
          <ellipse cx="700" cy="1478" rx="88" ry="15" fill="#fff" opacity="0.28" />
          <ellipse cx="790" cy="1540" rx="96" ry="13" fill="#fff" opacity="0.22" />
          <ellipse cx="716" cy="1600" rx="74" ry="12" fill="#fff" opacity="0.2" />
        </g>
        <circle cx="740" cy="1520" r="132" fill="none" stroke="#bfe4ff" strokeWidth="2" opacity="0.35" />
      </g>
    </>
  );
}

/* ------------------------------------------------------------------- sky -- */

function Airliner({ tint }: { tint: string }) {
  return (
    <g fill={tint}>
      <rect x="-300" y="-2" width="210" height="4" rx="2" fill="url(#trail)" />
      <path d="M-38 -4 L-70 -40 L-53 -40 L-15 -4 Z" opacity="0.92" />
      <path d="M-38 4 L-70 40 L-53 40 L-15 4 Z" opacity="0.92" />
      <path d="M-80 -6 L-97 -34 L-86 -34 L-70 -6 Z" />
      <path d="M-80 -2 L-101 -17 L-90 -17 L-74 -2 Z" opacity="0.85" />
      <path d="M-80 2 L-101 17 L-90 17 L-74 2 Z" opacity="0.85" />
      <path d="M2 0 C -6 -8, -32 -10, -59 -10 L-82 -10 L-91 0 L-82 10 L-59 10 C -32 10, -6 8, 2 0 Z" />
      <rect x="-53" y="-25" width="21" height="9" rx="4.5" opacity="0.9" />
      <rect x="-53" y="16" width="21" height="9" rx="4.5" opacity="0.9" />
    </g>
  );
}

const PLANES = [
  { y: 2190, s: 1, dur: 9, delay: 0, tint: "#3b2340" },
  { y: 2430, s: 0.62, dur: 13, delay: -4, tint: "#4a2f52" },
  { y: 2060, s: 0.42, dur: 17, delay: -9, tint: "#56395e" },
];

const CLOUDS = [
  { x: 180, y: 2560, s: 1.1, dur: 11, o: 0.9 },
  { x: 620, y: 2470, s: 0.7, dur: 9, o: 0.75 },
  { x: 950, y: 2640, s: 1, dur: 13, o: 0.85 },
  { x: 300, y: 2700, s: 0.8, dur: 12, o: 0.8 },
  { x: 820, y: 2760, s: 1.25, dur: 15, o: 0.6 },
  { x: 1080, y: 2520, s: 0.55, dur: 8, o: 0.7 },
];

const SUN_X = 900;
const SUN_Y = 2120;
const SUN_R = 96;

/** Granulation cells, sunspots and looping prominences on the solar limb. */
function Sun() {
  const granules = Array.from({ length: 46 }, (_, i) => {
    const a = (i * 137.5 * Math.PI) / 180;
    const rad = Math.sqrt((i + 0.5) / 46) * (SUN_R - 12);
    return {
      x: SUN_X + Math.cos(a) * rad,
      y: SUN_Y + Math.sin(a) * rad,
      r: 5 + ((i * 7) % 5),
      d: (i * 0.23) % 4,
    };
  });

  // prominences: loops anchored on the limb
  const loops = [
    { a: -0.5, h: 78, w: 0.36 },
    { a: 0.55, h: 62, w: 0.3 },
    { a: 2.3, h: 90, w: 0.4 },
    { a: 3.6, h: 54, w: 0.28 },
    { a: 4.9, h: 70, w: 0.34 },
  ].map((l, i) => {
    const a1 = l.a - l.w;
    const a2 = l.a + l.w;
    const p1 = [SUN_X + Math.cos(a1) * (SUN_R - 4), SUN_Y + Math.sin(a1) * (SUN_R - 4)];
    const p2 = [SUN_X + Math.cos(a2) * (SUN_R - 4), SUN_Y + Math.sin(a2) * (SUN_R - 4)];
    const cm = [SUN_X + Math.cos(l.a) * (SUN_R + l.h * 1.6), SUN_Y + Math.sin(l.a) * (SUN_R + l.h * 1.6)];
    return { d: `M ${p1[0]} ${p1[1]} Q ${cm[0]} ${cm[1]} ${p2[0]} ${p2[1]}`, i };
  });

  return (
    <g>
      <circle cx={SUN_X} cy={SUN_Y} r={SUN_R * 3.2} fill="url(#sun-glow)" />
      <circle cx={SUN_X} cy={SUN_Y} r={SUN_R} fill="url(#sun)" />

      {/* convective granulation */}
      <g clipPath="url(#sun-clip)">
        {granules.map((g, i) => (
          <circle
            key={i}
            cx={g.x}
            cy={g.y}
            r={g.r}
            fill="#fff6c8"
            className="anim"
            style={{ animation: `granule ${3 + (i % 4)}s ease-in-out ${g.d}s infinite` }}
          />
        ))}
        {/* sunspots with penumbra */}
        <g opacity="0.75">
          <ellipse cx={SUN_X - 34} cy={SUN_Y + 16} rx="21" ry="14" fill="#c97a1e" opacity="0.7" />
          <ellipse cx={SUN_X - 34} cy={SUN_Y + 16} rx="11" ry="7" fill="#7a3d08" />
          <ellipse cx={SUN_X + 40} cy={SUN_Y - 30} rx="15" ry="10" fill="#c97a1e" opacity="0.7" />
          <ellipse cx={SUN_X + 40} cy={SUN_Y - 30} rx="8" ry="5" fill="#7a3d08" />
        </g>
      </g>

      {/* prominences / flares arcing off the limb */}
      {loops.map((l) => (
        <path
          key={l.i}
          d={l.d}
          fill="none"
          stroke="url(#flare)"
          strokeWidth="11"
          strokeLinecap="round"
          className="anim"
          style={{ animation: `flare-flicker ${4 + (l.i % 3)}s ease-in-out ${-l.i * 0.9}s infinite` }}
        />
      ))}
      <circle cx={SUN_X} cy={SUN_Y} r={SUN_R + 5} fill="none" stroke="#ffd98a" strokeWidth="3" opacity="0.45" />
    </g>
  );
}

function Sky() {
  return (
    <>
      <Sun />

      {PLANES.map((p, i) => (
        <g key={i} transform={`translate(0 ${p.y})`}>
          <g className="anim" style={{ animation: `fly-x ${p.dur}s linear ${p.delay}s infinite` }}>
            <g transform={`scale(${p.s})`}>
              <Airliner tint={p.tint} />
            </g>
          </g>
        </g>
      ))}

      {CLOUDS.map((c, i) => (
        <g key={i} transform={`translate(0 ${c.y})`}>
          <g className="anim" style={{ animation: `cloud-drift ${c.dur}s linear ${-i * 1.6}s infinite` }}>
            <g transform={`translate(${c.x} 0) scale(${c.s})`} fill="url(#cloud)" opacity={c.o}>
              <ellipse cx="0" cy="6" rx="92" ry="23" />
              <ellipse cx="-42" cy="0" rx="44" ry="23" />
              <ellipse cx="6" cy="-14" rx="54" ry="29" />
              <ellipse cx="52" cy="-2" rx="42" ry="21" />
            </g>
          </g>
        </g>
      ))}
    </>
  );
}

/* --------------------------------------------------------------- surface -- */

interface Building {
  x: number;
  w: number;
  h: number;
  rows: number;
  cols: number;
  cap?: "mast" | "step" | "stack";
}

const FAR: Building[] = [
  { x: -20, w: 120, h: 300, rows: 8, cols: 3 },
  { x: 120, w: 90, h: 220, rows: 6, cols: 2 },
  { x: 230, w: 140, h: 380, rows: 9, cols: 3, cap: "mast" },
  { x: 390, w: 100, h: 250, rows: 7, cols: 2 },
  { x: 510, w: 155, h: 430, rows: 10, cols: 3, cap: "step" },
  { x: 685, w: 105, h: 270, rows: 7, cols: 2 },
  { x: 810, w: 145, h: 360, rows: 9, cols: 3 },
  { x: 975, w: 100, h: 240, rows: 6, cols: 2, cap: "mast" },
  { x: 1095, w: 135, h: 330, rows: 8, cols: 3 },
];

const NEAR: Building[] = [
  { x: -40, w: 170, h: 250, rows: 6, cols: 4, cap: "stack" },
  { x: 150, w: 125, h: 185, rows: 4, cols: 3 },
  { x: 295, w: 195, h: 315, rows: 7, cols: 4, cap: "step" },
  { x: 510, w: 135, h: 210, rows: 5, cols: 3 },
  { x: 665, w: 185, h: 290, rows: 6, cols: 4, cap: "stack" },
  { x: 870, w: 145, h: 200, rows: 5, cols: 3 },
  { x: 1035, w: 180, h: 300, rows: 7, cols: 4, cap: "mast" },
];

function windows(b: Building, seed: number, dim: boolean): ReactNode[] {
  const pad = 10;
  const gx = (b.w - pad * 2) / b.cols;
  const gy = (b.h - pad * 2) / b.rows;
  const out: ReactNode[] = [];
  for (let r = 0; r < b.rows; r++) {
    for (let c = 0; c < b.cols; c++) {
      const i = r * b.cols + c;
      if ((i * 7 + seed * 5) % 4 === 0) continue;
      out.push(
        <rect
          key={i}
          x={b.x + pad + c * gx}
          y={GROUND - b.h + pad + r * gy}
          width={Math.max(3, gx * 0.5)}
          height={Math.max(3, gy * 0.44)}
          rx="1"
          fill="var(--city-window)"
          opacity={dim ? 0.4 : 0.85}
          className="anim"
          style={{
            animation: `twinkle ${7 + (i % 5)}s ease-in-out ${((i * 13 + seed * 19) % 90) / 10}s infinite`,
          }}
        />,
      );
    }
  }
  return out;
}

function Smoke({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-9" y="-26" width="18" height="26" fill="#241a3a" />
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cy="-30"
          r="11"
          fill="#cbb8d8"
          className="anim"
          style={{ animation: `smoke-rise 7s ease-out ${-i * 1.75}s infinite` }}
        />
      ))}
    </g>
  );
}

function cap(b: Building, stroke: string): ReactNode {
  const top = GROUND - b.h;
  if (b.cap === "mast")
    return (
      <g>
        <rect x={b.x + b.w / 2 - 2} y={top - 44} width="4" height="44" fill={stroke} />
        <circle cx={b.x + b.w / 2} cy={top - 48} r="4" fill="var(--accent)" />
      </g>
    );
  if (b.cap === "step")
    return <rect x={b.x + b.w * 0.24} y={top - 30} width={b.w * 0.52} height="30" fill={stroke} />;
  if (b.cap === "stack") return <Smoke x={b.x + b.w * 0.72} y={top} />;
  return null;
}

const CARS = [
  { lane: GROUND + 34, dur: 3.6, delay: 0, rev: false, body: "#ff5a8a", roof: "#3a1030" },
  { lane: GROUND + 34, dur: 4.8, delay: -2.1, rev: false, body: "#ffd166", roof: "#4a3510" },
  { lane: GROUND + 76, dur: 4.2, delay: -1.2, rev: true, body: "#7c5cff", roof: "#241a3a" },
  { lane: GROUND + 76, dur: 5.4, delay: -3.4, rev: true, body: "#59e0d0", roof: "#0f3b38" },
];

function Walker({ tint }: { tint: string }) {
  return (
    <g fill={tint}>
      <circle cx="0" cy="-30" r="5.4" />
      <rect x="-4" y="-24" width="8" height="15" rx="3" />
      <rect
        className="anim leg"
        x="-4"
        y="-10"
        width="3.4"
        height="11"
        rx="1.5"
        style={{ animation: "leg-a 0.62s ease-in-out infinite" }}
      />
      <rect
        className="anim leg"
        x="0.6"
        y="-10"
        width="3.4"
        height="11"
        rx="1.5"
        style={{ animation: "leg-b 0.62s ease-in-out infinite" }}
      />
    </g>
  );
}

const PEOPLE = [
  { dur: 22, delay: 0, rev: false, s: 1, tint: "var(--person)" },
  { dur: 27, delay: -6, rev: false, s: 0.86, tint: "#22143b" },
  { dur: 31, delay: -14, rev: false, s: 1.06, tint: "#1a1030" },
  { dur: 25, delay: -3, rev: true, s: 0.94, tint: "#22143b" },
  { dur: 34, delay: -18, rev: true, s: 1, tint: "var(--person)" },
];

function Surface() {
  return (
    <>
      <g opacity="0.6">
        {FAR.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={GROUND - b.h} width={b.w} height={b.h} fill="url(#far)" />
            {cap(b, "#4a2f75")}
            {windows(b, i + 1, true)}
          </g>
        ))}
      </g>

      <rect x="0" y={GROUND - 460} width={W} height="460" fill="url(#haze)" />

      {NEAR.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={GROUND - b.h} width={b.w} height={b.h} fill="url(#near)" />
          {cap(b, "#2a1a47")}
          {windows(b, i + 20, false)}
        </g>
      ))}

      <rect x="0" y={GROUND} width={W} height={ROAD_BOTTOM - GROUND} fill="var(--road)" />
      <rect x="0" y={GROUND} width={W} height="3" fill="#fff" opacity="0.08" />
      {Array.from({ length: 16 }, (_, i) => (
        <rect key={i} x={i * 78 + 8} y={GROUND + 56} width="40" height="3" fill="#ffe6a8" opacity="0.26" />
      ))}

      {[110, 430, 750, 1070].map((x, i) => (
        <g key={i}>
          <rect x={x} y={GROUND - 74} width="4" height="74" fill="#3a2a52" />
          <rect x={x - 15} y={GROUND - 78} width="34" height="5" rx="2" fill="#3a2a52" />
          <circle cx={x + 2} cy={GROUND - 70} r="40" fill="url(#lamp)" />
        </g>
      ))}

      {PEOPLE.map((p, i) => (
        <g key={i} transform={`translate(0 ${GROUND - 2})`}>
          <g
            className="anim"
            style={{
              animation: `${p.rev ? "walk-x-rev" : "walk-x"} ${p.dur}s linear ${p.delay}s infinite`,
            }}
          >
            <g transform={`scale(${p.rev ? -p.s : p.s} ${p.s})`}>
              <Walker tint={p.tint} />
            </g>
          </g>
        </g>
      ))}

      {CARS.map((c, i) => (
        <g key={i} transform={`translate(0 ${c.lane})`}>
          <g
            className="anim"
            style={{ animation: `${c.rev ? "car-x-rev" : "car-x"} ${c.dur}s linear ${c.delay}s infinite` }}
          >
            <g transform={c.rev ? "scale(-1,1) translate(-44 0)" : undefined}>
              <rect x="0" y="0" width="44" height="12" rx="5" fill={c.body} />
              <path d="M10 0 L14 -8 L30 -8 L35 0 Z" fill={c.roof} />
              <circle cx="11" cy="13" r="4" fill="#0d0716" />
              <circle cx="33" cy="13" r="4" fill="#0d0716" />
              <circle cx="43" cy="6" r="2.4" fill="#fff4c4" />
            </g>
          </g>
        </g>
      ))}
    </>
  );
}

/* ------------------------------------------------------------ underground -- */

const TRAIN_TOP = 3970;
const TRAIN_H = 165;

function Carriage({ x, seed }: { x: number; seed: number }) {
  const CW = 250;
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y={TRAIN_TOP} width={CW} height={TRAIN_H} rx="13" fill="url(#train)" />
      <rect x="6" y={TRAIN_TOP - 7} width={CW - 12} height="14" rx="6" fill="var(--train-roof)" />
      <rect x="0" y={TRAIN_TOP + TRAIN_H - 18} width={CW} height="18" rx="5" fill="#2a1020" opacity="0.85" />
      {Array.from({ length: 4 }, (_, i) => {
        const wx = 20 + i * 57;
        return (
          <g key={i}>
            <rect x={wx} y={TRAIN_TOP + 26} width="44" height="46" rx="6" fill="var(--train-window)" opacity="0.92" />
            {(i + seed) % 3 !== 0 && (
              <g fill="#5a3520" opacity="0.75">
                <circle cx={wx + 22} cy={TRAIN_TOP + 47} r="8" />
                <path d={`M${wx + 11} ${TRAIN_TOP + 72} a11 13 0 0 1 22 0 Z`} />
              </g>
            )}
          </g>
        );
      })}
      {[44, CW - 78].map((bx, i) => (
        <g key={i}>
          <rect x={bx} y={TRAIN_TOP + TRAIN_H} width="34" height="12" rx="4" fill="#1a0d14" />
          <circle cx={bx + 8} cy={RAIL_Y - 7} r="13" fill="#241119" />
          <circle cx={bx + 8} cy={RAIL_Y - 7} r="5" fill="#4a2b38" />
          <circle cx={bx + 26} cy={RAIL_Y - 7} r="13" fill="#241119" />
          <circle cx={bx + 26} cy={RAIL_Y - 7} r="5" fill="#4a2b38" />
        </g>
      ))}
    </g>
  );
}

function Underground() {
  return (
    <>
      {[
        "M120 3550 C 150 3610, 90 3660, 130 3740",
        "M420 3545 C 460 3600, 400 3640, 440 3720",
        "M900 3550 C 860 3620, 940 3660, 890 3740",
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#4a3520" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
      ))}
      <rect x="640" y="3570" width="420" height="14" rx="7" fill="#3a2b1e" opacity="0.7" />
      <rect x="200" y="3640" width="320" height="12" rx="6" fill="#3a2b1e" opacity="0.6" />

      <path d="M -40 4540 L -40 3760 A 640 340 0 0 1 1240 3760 L 1240 4540 Z" fill="#31201a" opacity="0.6" />
      <path d="M 40 4540 L 40 3800 A 560 300 0 0 1 1160 3800 L 1160 4540 Z" fill="var(--tunnel-deep)" />

      {Array.from({ length: 6 }, (_, i) => {
        const x = 130 + i * 190;
        return (
          <g key={i}>
            <circle cx={x} cy="3700" r="60" fill="url(#tunnel-lamp)" />
            <rect x={x - 18} y="3690" width="36" height="8" rx="4" fill="#ffdca0" opacity="0.9" />
          </g>
        );
      })}

      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={70 + i * 170} y="3820" width="9" height="720" fill="#3d2820" opacity="0.45" />
      ))}

      <rect x="0" y={RAIL_Y - 6} width={W} height="150" fill="#1c120e" />
      {Array.from({ length: 26 }, (_, i) => (
        <rect key={i} x={i * 47} y={RAIL_Y + 12} width="30" height="8" rx="2" fill="#33241b" />
      ))}
      <rect x="0" y={RAIL_Y + 4} width={W} height="5" fill="var(--rail)" />
      <rect x="0" y={RAIL_Y + 28} width={W} height="5" fill="var(--rail)" opacity="0.7" />

      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(0 ${3930 + i * 46})`}>
          <g className="anim" style={{ animation: `speed-line 2.2s linear ${-i * 0.28}s infinite` }}>
            <rect x="0" y="0" width="200" height="4" rx="2" fill="#ff8fae" />
          </g>
        </g>
      ))}

      <g className="anim" style={{ animation: "train-x 5s linear infinite" }}>
        <Carriage x={0} seed={2} />
        <Carriage x={262} seed={1} />
        <Carriage x={524} seed={3} />
        <g transform="translate(786 0)">
          <path
            d={`M0 ${TRAIN_TOP} L196 ${TRAIN_TOP} C 228 ${TRAIN_TOP}, 252 ${TRAIN_TOP + 30}, 256 ${TRAIN_TOP + 64}
                L256 ${TRAIN_TOP + TRAIN_H - 12} A 12 12 0 0 1 244 ${TRAIN_TOP + TRAIN_H} L0 ${TRAIN_TOP + TRAIN_H} Z`}
            fill="url(#train)"
          />
          <rect x="6" y={TRAIN_TOP - 7} width="212" height="14" rx="6" fill="var(--train-roof)" />
          <path
            d={`M196 ${TRAIN_TOP + 20} C 220 ${TRAIN_TOP + 22}, 235 ${TRAIN_TOP + 40}, 239 ${TRAIN_TOP + 66} L196 ${TRAIN_TOP + 66} Z`}
            fill="var(--train-window)"
            opacity="0.95"
          />
          <circle cx="213" cy={TRAIN_TOP + 50} r="8" fill="#5a3520" opacity="0.8" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={24 + i * 56} y={TRAIN_TOP + 26} width="42" height="46" rx="6" fill="var(--train-window)" opacity="0.9" />
          ))}
          <circle cx="246" cy={TRAIN_TOP + 104} r="8" fill="#fff6cf" />
          <circle cx="246" cy={TRAIN_TOP + 130} r="5" fill="#fff6cf" opacity="0.8" />
          <path d={`M250 ${TRAIN_TOP + 90} L470 ${TRAIN_TOP + 52} L470 ${TRAIN_TOP + 160} L250 ${TRAIN_TOP + 120} Z`} fill="url(#headlamp)" />
          <rect x="0" y={TRAIN_TOP + TRAIN_H - 18} width="248" height="18" rx="5" fill="#2a1020" opacity="0.85" />
          {[46, 176].map((bx, i) => (
            <g key={i}>
              <rect x={bx} y={TRAIN_TOP + TRAIN_H} width="38" height="12" rx="4" fill="#1a0d14" />
              <circle cx={bx + 9} cy={RAIL_Y - 7} r="14" fill="#241119" />
              <circle cx={bx + 9} cy={RAIL_Y - 7} r="5" fill="#4a2b38" />
              <circle cx={bx + 29} cy={RAIL_Y - 7} r="14" fill="#241119" />
              <circle cx={bx + 29} cy={RAIL_Y - 7} r="5" fill="#4a2b38" />
            </g>
          ))}
        </g>
      </g>
    </>
  );
}

/* --------------------------------------------------------------- fossils -- */

/**
 * Articulated theropod skeleton, side view, facing left. Built from real
 * elements: skull with fenestrae, cervical/dorsal/sacral/caudal vertebrae with
 * neural spines, ribcage, gastralia, scapula, forelimb, three-part pelvis and
 * hind limb with metatarsus and pedal claws.
 */
function Theropod() {
  const LINE = "var(--bone-line)";

  // vertebral column, sampled off three curves
  const neck = Array.from({ length: 8 }, (_, i) =>
    bezPoint([236, 44], [286, -22], [352, -40], [420, -22], i / 7),
  );
  const dorsal = Array.from({ length: 9 }, (_, i) =>
    bezPoint([420, -22], [478, -8], [536, 0], [604, 6], i / 8),
  );
  const tail = Array.from({ length: 16 }, (_, i) =>
    bezPoint([604, 6], [742, 34], [880, 92], [1078, 190], i / 15),
  );

  const vert = (
    pts: [number, number][],
    size: (t: number) => number,
    spine: (t: number) => number,
    key: string,
  ) =>
    pts.map((p, i) => {
      const t = i / (pts.length - 1);
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      const ang = (Math.atan2(next[1] - prev[1], next[0] - prev[0]) * 180) / Math.PI;
      const s = size(t);
      const sp = spine(t);
      return (
        <g key={`${key}${i}`} transform={`translate(${p[0]} ${p[1]}) rotate(${ang})`}>
          {sp > 2 && (
            <path
              d={`M ${-s * 0.3} ${-s * 0.34} L ${-s * 0.16} ${-s * 0.34 - sp} L ${s * 0.16} ${-s * 0.34 - sp} L ${s * 0.3} ${-s * 0.34} Z`}
              fill="url(#bone)"
              stroke={LINE}
              strokeWidth="1.4"
            />
          )}
          <rect
            x={-s * 0.52}
            y={-s * 0.34}
            width={s * 1.04}
            height={s * 0.68}
            rx={s * 0.2}
            fill="url(#bone)"
            stroke={LINE}
            strokeWidth="1.5"
          />
        </g>
      );
    });

  return (
    <g>
      {/* ---- tail, dorsal, neck ---- */}
      {vert(tail as [number, number][], (t) => 30 - t * 20, (t) => Math.max(0, 26 - t * 26), "t")}
      {vert(dorsal as [number, number][], () => 34, () => 52, "d")}
      {vert(neck as [number, number][], (t) => 32 - t * 4, (t) => 16 + t * 14, "c")}

      {/* ---- ribcage ---- */}
      {dorsal.slice(0, 8).map((p, i) => (
        <path
          key={`r${i}`}
          d={`M ${p[0]} ${p[1] + 14} C ${p[0] - 30 + i * 4} ${p[1] + 92}, ${p[0] + 22} ${p[1] + 168}, ${p[0] - 8 + i * 3} ${p[1] + 210}`}
          fill="none"
          stroke="url(#bone-stroke)"
          strokeWidth="9"
          strokeLinecap="round"
        />
      ))}
      {/* gastralia (belly ribs) */}
      {Array.from({ length: 7 }, (_, i) => (
        <path
          key={`g${i}`}
          d={`M ${430 + i * 26} 214 Q ${455 + i * 26} 232, ${492 + i * 26} 220`}
          fill="none"
          stroke="url(#bone-stroke)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.9"
        />
      ))}

      {/* ---- pectoral girdle + forelimb ---- */}
      <path
        d="M416 6 C 396 44, 388 84, 396 116 L420 112 C 412 80, 418 44, 436 14 Z"
        fill="url(#bone)"
        stroke={LINE}
        strokeWidth="1.5"
      />
      <Bone x1={404} y1={112} x2={378} y2={166} w={14} w2={11} />
      <Bone x1={378} y1={166} x2={398} y2={206} w={10} w2={8} />
      {[0, 1, 2].map((i) => (
        <Bone key={i} x1={398} y1={206} x2={374 + i * 14} y2={232 + i * 6} w={6} w2={3} />
      ))}

      {/* ---- pelvis: ilium, pubis, ischium ---- */}
      <path
        d="M560 -12 C 616 -30, 686 -22, 706 6 C 716 22, 700 40, 664 44 L586 40 C 562 34, 552 6, 560 -12 Z"
        fill="url(#bone)"
        stroke={LINE}
        strokeWidth="1.6"
      />
      <Bone x1={612} y1={40} x2={556} y2={188} w={15} w2={11} />
      <path d="M540 182 L586 196 L578 214 L532 200 Z" fill="url(#bone)" stroke={LINE} strokeWidth="1.5" />
      <Bone x1={664} y1={42} x2={706} y2={158} w={13} w2={9} />

      {/* ---- hind limb ---- */}
      <Bone x1={640} y1={30} x2={676} y2={196} w={30} w2={20} />
      <Bone x1={676} y1={196} x2={628} y2={334} w={20} w2={14} />
      <Bone x1={686} y1={200} x2={648} y2={330} w={8} w2={6} />
      <Bone x1={628} y1={334} x2={664} y2={422} w={15} w2={11} />
      <Bone x1={636} y1={338} x2={672} y2={420} w={7} w2={6} />
      {[
        [714, 446],
        [700, 462],
        [672, 468],
      ].map(([tx, ty], i) => (
        <g key={i}>
          <Bone x1={664} y1={422} x2={tx} y2={ty} w={9} w2={5} />
          <path
            d={`M ${tx} ${ty} q 16 2 22 12 q -14 -2 -22 -4 Z`}
            fill="url(#bone)"
            stroke={LINE}
            strokeWidth="1.2"
          />
        </g>
      ))}
      {/* backward-pointing hallux */}
      <Bone x1={664} y1={422} x2={634} y2={438} w={7} w2={4} />

      {/* ---- skull ---- */}
      <g transform="translate(96 30) rotate(-7)">
        {/* cranium + maxilla */}
        <path
          d="M14 22 C 6 4, 24 -22, 62 -34 C 104 -47, 158 -44, 186 -30
             C 204 -21, 212 -6, 208 10 L196 24 L150 30 L60 36 C 32 38, 20 34, 14 22 Z"
          fill="url(#bone)"
          stroke={LINE}
          strokeWidth="2"
        />
        {/* naris */}
        <ellipse cx="46" cy="-8" rx="12" ry="7" fill="#2a1b11" opacity="0.75" transform="rotate(-14 46 -8)" />
        {/* antorbital fenestra */}
        <path d="M86 -10 L124 -18 L132 4 L92 10 Z" fill="#2a1b11" opacity="0.75" />
        {/* orbit */}
        <circle cx="162" cy="-12" r="15" fill="#2a1b11" opacity="0.8" />
        {/* infratemporal fenestra */}
        <path d="M182 -6 L200 -2 L196 16 L180 12 Z" fill="#2a1b11" opacity="0.7" />
        {/* maxillary teeth */}
        {Array.from({ length: 11 }, (_, i) => (
          <path
            key={i}
            d={`M ${26 + i * 13} 34 L ${30 + i * 13} 50 L ${34 + i * 13} 34 Z`}
            fill="url(#bone)"
            stroke={LINE}
            strokeWidth="1"
          />
        ))}
        {/* mandible */}
        <path
          d="M18 46 C 40 56, 120 52, 196 40 L206 50 L200 62 C 120 74, 44 74, 22 62 C 12 58, 12 50, 18 46 Z"
          fill="url(#bone)"
          stroke={LINE}
          strokeWidth="2"
        />
        <path d="M120 52 L162 48 L160 62 L120 64 Z" fill="#2a1b11" opacity="0.55" />
        {/* dentary teeth */}
        {Array.from({ length: 10 }, (_, i) => (
          <path
            key={`d${i}`}
            d={`M ${34 + i * 14} 48 L ${38 + i * 14} 32 L ${42 + i * 14} 48 Z`}
            fill="url(#bone)"
            stroke={LINE}
            strokeWidth="1"
          />
        ))}
      </g>
    </g>
  );
}

const DUST = Array.from({ length: 26 }, (_, i) => ({
  x: (i * 149 + 30) % W,
  y: 4620 + ((i * 71) % 1180),
  r: 1.2 + ((i * 13) % 4) * 0.5,
  d: (i * 0.8) % 9,
  dur: 15 + (i % 6) * 3,
}));

function spiral(cx: number, cy: number, turns: number, r0: number, r1: number, steps: number) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * Math.PI * 2;
    const r = r0 + (r1 - r0) * t;
    d += `${i === 0 ? "M" : "L"} ${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)} `;
  }
  return d;
}

/** What a real cross-section through fossil beds actually holds. */
function Fossils() {
  return (
    <>
      {/* bedding planes */}
      {[4600, 4760, 5000, 5260, 5520, 5760].map((y, i) => (
        <path
          key={i}
          d={`M -40 ${y} Q 300 ${y - 18 + i * 5}, 600 ${y + 8} T 1240 ${y - 10}`}
          fill="none"
          stroke="var(--fossil-mark)"
          strokeWidth={i % 2 ? 2 : 4}
          opacity={i % 2 ? 0.28 : 0.48}
        />
      ))}

      {/* a shell-hash bed */}
      {Array.from({ length: 34 }, (_, i) => (
        <ellipse
          key={`sh${i}`}
          cx={(i * 71 + 20) % W}
          cy={4772 + ((i * 29) % 22)}
          rx={5 + ((i * 3) % 4)}
          ry="2.4"
          fill="var(--bone-shade)"
          opacity="0.4"
          transform={`rotate(${(i * 37) % 60 - 30} ${(i * 71 + 20) % W} ${4772 + ((i * 29) % 22)})`}
        />
      ))}

      {/* mineral grain */}
      {Array.from({ length: 120 }, (_, i) => (
        <circle
          key={`gr${i}`}
          cx={(i * 211 + 17) % W}
          cy={4560 + ((i * 137 + 41) % 1320)}
          r={0.8 + ((i * 7) % 3) * 0.4}
          fill="var(--fossil-mark)"
          opacity="0.16"
        />
      ))}

      {/* concretions */}
      {[
        [980, 4680, 26],
        [140, 5560, 20],
        [1090, 5620, 16],
      ].map(([x, y, r], i) => (
        <circle key={`c${i}`} cx={x} cy={y} r={r} fill="#5a4028" opacity="0.4" />
      ))}

      {/* the main specimen */}
      <g transform="translate(60 4990) scale(0.98)">
        <Theropod />
      </g>

      {/* ammonite with septa */}
      <g transform="translate(0 0)">
        <path d={spiral(168, 4640, 2.5, 5, 54, 80)} fill="none" stroke="url(#bone-stroke)" strokeWidth="7" strokeLinecap="round" />
        {Array.from({ length: 11 }, (_, i) => {
          const t = 0.28 + (i / 11) * 0.72;
          const a = t * 2.5 * Math.PI * 2;
          const ro = 5 + (54 - 5) * t;
          const ri = ro * 0.58;
          return (
            <line
              key={i}
              x1={168 + ri * Math.cos(a)}
              y1={4640 + ri * Math.sin(a)}
              x2={168 + ro * Math.cos(a)}
              y2={4640 + ro * Math.sin(a)}
              stroke="var(--bone-shade)"
              strokeWidth="2"
              opacity="0.75"
            />
          );
        })}
      </g>

      {/* bivalves */}
      {[
        [430, 4700, 1],
        [700, 4660, 0.8],
        [1010, 5490, 1.1],
      ].map(([x, y, s], i) => (
        <g key={`bv${i}`} transform={`translate(${x} ${y}) scale(${s})`}>
          <path
            d="M0 0 C 16 -20, 46 -20, 60 0 C 46 14, 16 14, 0 0 Z"
            fill="url(#bone)"
            stroke="var(--bone-line)"
            strokeWidth="1.6"
            opacity="0.85"
          />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M30 -14 Q ${16 + k * 9} -2, ${12 + k * 12} 8`} fill="none" stroke="var(--bone-line)" strokeWidth="1" opacity="0.55" />
          ))}
        </g>
      ))}

      {/* fern frond */}
      <g transform="translate(940 5760) rotate(-12)" stroke="var(--bone-shade)" fill="none" strokeLinecap="round">
        <path d="M0 0 C 40 -30, 96 -46, 150 -50" strokeWidth="4" />
        {Array.from({ length: 12 }, (_, i) => {
          const t = i / 11;
          const x = 150 * t + 6 * Math.sin(t * 3);
          const y = -50 * t * (1 - 0.15 * t);
          const l = 22 * (1 - t * 0.6);
          return (
            <g key={i}>
              <path d={`M${x} ${y} q ${l * 0.4} ${-l * 0.7} ${l} ${-l * 0.5}`} strokeWidth="2.2" />
              <path d={`M${x} ${y} q ${l * 0.4} ${l * 0.6} ${l * 0.9} ${l * 0.4}`} strokeWidth="2.2" />
            </g>
          );
        })}
      </g>

      {/* fish with vertebral column */}
      <g transform="translate(210 5340) rotate(6)" stroke="var(--bone-line)" fill="none" strokeLinecap="round">
        <path d="M0 0 C 24 -26, 96 -30, 150 0 C 96 30, 24 26, 0 0 Z" strokeWidth="2.4" fill="url(#bone)" opacity="0.75" />
        <line x1="14" y1="0" x2="146" y2="0" strokeWidth="3" />
        {Array.from({ length: 12 }, (_, i) => {
          const x = 20 + i * 10;
          const s = 12 - Math.abs(i - 5.5) * 1.4;
          return (
            <g key={i}>
              <line x1={x} y1="0" x2={x - 4} y2={-s} strokeWidth="1.8" />
              <line x1={x} y1="0" x2={x - 4} y2={s} strokeWidth="1.8" />
            </g>
          );
        })}
        <circle cx="14" cy="-4" r="4" strokeWidth="1.8" />
        <path d="M150 0 L176 -18 L170 0 L176 18 Z" strokeWidth="2.2" />
      </g>

      {/* burrow trace fossils */}
      {[
        "M300 5180 C 340 5210, 300 5250, 350 5286",
        "M820 5220 C 860 5250, 820 5288, 866 5320",
      ].map((d, i) => (
        <path key={`bu${i}`} d={d} fill="none" stroke="#6a4f31" strokeWidth="7" opacity="0.35" strokeLinecap="round" />
      ))}

      {/* footprint trail */}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={`fp${i}`}
          d={`M${150 + i * 96} ${5860 + (i % 2) * 26} l14 -22 l14 22 l-8 5 l-6 -9 l-6 9 Z`}
          fill="var(--fossil-mark)"
          opacity="0.32"
        />
      ))}

      {DUST.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill="#f6e6cc"
          opacity="0.26"
          className="anim"
          style={{ animation: `dust-drift ${d.dur}s ease-in-out ${-d.d}s infinite` }}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------- core -- */

const BUBBLES = Array.from({ length: 30 }, (_, i) => ({
  x: 50 + ((i * 137) % 1100),
  y: 6760 + ((i * 53) % 260),
  r: 5 + ((i * 11) % 5) * 3.4,
  d: (i * 0.6) % 11,
  dur: 9 + (i % 6) * 2,
}));

/** No radiating lines — just a molten dome with bubbles boiling up out of it. */
function Core() {
  return (
    <>
      <ellipse cx="600" cy={DOME_CY - DOME_R} rx="760" ry="380" fill="url(#core-halo)" />

      <g className="anim" style={{ animation: "soft-pulse 6s ease-in-out infinite" }}>
        <circle cx="600" cy={DOME_CY} r={DOME_R} fill="url(#dome)" />
        <circle cx="600" cy={DOME_CY} r={DOME_R - 50} fill="url(#dome-inner)" opacity="0.85" />
      </g>

      {/* convection blisters sitting on the dome surface */}
      {[-0.62, -0.38, -0.14, 0.12, 0.36, 0.6].map((t, i) => {
        const a = -Math.PI / 2 + t;
        const cx = 600 + Math.cos(a) * (DOME_R - 26);
        const cy = DOME_CY + Math.sin(a) * (DOME_R - 26);
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={20 + (i % 3) * 8}
            fill="#ffcf7a"
            opacity="0.4"
            className="anim"
            style={{ animation: `soft-pulse ${4 + (i % 3)}s ease-in-out ${-i * 0.7}s infinite` }}
          />
        );
      })}

      {/* bubbles rising off the core */}
      {BUBBLES.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y})`}>
          <g className="anim" style={{ animation: `bubble-rise ${b.dur}s ease-out ${-b.d}s infinite` }}>
            <circle r={b.r} fill="url(#bubble)" />
          </g>
        </g>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ strip -- */

export default function Descent() {
  return (
    <svg
      className="block h-auto w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        {/* ONE gradient for the whole descent — this is what removes the seams */}
        <linearGradient id="strip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020208" />
          <stop offset="14%" stopColor="#05040e" />
          <stop offset="22%" stopColor="#080615" />
          <stop offset="26%" stopColor="#241344" />
          <stop offset="30%" stopColor="#6b3a8a" />
          <stop offset="34%" stopColor="#d95f9b" />
          <stop offset="37.5%" stopColor="#ffa9c2" />
          <stop offset="41%" stopColor="#7a4276" />
          <stop offset="46%" stopColor="#2b1a33" />
          <stop offset="48.6%" stopColor="#33220f" />
          <stop offset="52%" stopColor="#241812" />
          <stop offset="60%" stopColor="#150d08" />
          <stop offset="65%" stopColor="#2a1b11" />
          <stop offset="74%" stopColor="#3b2817" />
          <stop offset="82%" stopColor="#4d3421" />
          <stop offset="86%" stopColor="#5c2410" />
          <stop offset="92%" stopColor="#2b0a05" />
          <stop offset="100%" stopColor="#1b0502" />
        </linearGradient>

        <radialGradient id="neb-a" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="neb-b" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="neptune" cx="36%" cy="30%" r="76%">
          <stop offset="0%" stopColor="#6fa8ff" />
          <stop offset="60%" stopColor="#2a54c0" />
          <stop offset="100%" stopColor="#0a1638" />
        </radialGradient>
        <radialGradient id="uranus" cx="36%" cy="30%" r="76%">
          <stop offset="0%" stopColor="#c8f4f2" />
          <stop offset="60%" stopColor="#69c4c8" />
          <stop offset="100%" stopColor="#173a44" />
        </radialGradient>
        <radialGradient id="saturn" cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ffe9b8" />
          <stop offset="55%" stopColor="#d9a95e" />
          <stop offset="100%" stopColor="#4a2c12" />
        </radialGradient>
        <radialGradient id="jupiter" cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ffe2c0" />
          <stop offset="52%" stopColor="#cf9a63" />
          <stop offset="100%" stopColor="#4a2a16" />
        </radialGradient>
        <radialGradient id="mars" cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ff9a6a" />
          <stop offset="55%" stopColor="#c2542a" />
          <stop offset="100%" stopColor="#3d1408" />
        </radialGradient>
        <radialGradient id="earth" cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#7cc6ff" />
          <stop offset="52%" stopColor="#2a6fd0" />
          <stop offset="100%" stopColor="#08183a" />
        </radialGradient>
        <radialGradient id="earth-halo" cx="50%" cy="50%" r="50%">
          <stop offset="62%" stopColor="#6fc0ff" stopOpacity="0" />
          <stop offset="82%" stopColor="#6fc0ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6fc0ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffd8a8" stopOpacity="0.15" />
          <stop offset="35%" stopColor="#ffe8c0" stopOpacity="0.8" />
          <stop offset="65%" stopColor="#e2c39a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffd8a8" stopOpacity="0.15" />
        </linearGradient>
        <clipPath id="saturn-clip">
          <circle cx="400" cy="620" r="58" />
        </clipPath>
        <clipPath id="jupiter-clip">
          <circle cx="855" cy="915" r="92" />
        </clipPath>
        <clipPath id="mars-clip">
          <circle cx="255" cy="1195" r="46" />
        </clipPath>
        <clipPath id="earth-clip">
          <circle cx="740" cy="1520" r="132" />
        </clipPath>

        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sun-glow)" stopOpacity="0.75" />
          <stop offset="42%" stopColor="var(--sun-glow)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--sun-glow)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sun" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#fffdf2" />
          <stop offset="52%" stopColor="var(--sun)" />
          <stop offset="100%" stopColor="#ff9e3c" />
        </radialGradient>
        <linearGradient id="flare" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ffb03c" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0.1" />
        </linearGradient>
        <clipPath id="sun-clip">
          <circle cx={SUN_X} cy={SUN_Y} r={SUN_R} />
        </clipPath>

        <linearGradient id="cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff6fb" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#ffd9ec" stopOpacity="0.78" />
          <stop offset="100%" stopColor="#d99ec0" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="trail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.32" />
        </linearGradient>

        <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a2f75" />
          <stop offset="100%" stopColor="var(--city-far)" />
        </linearGradient>
        <linearGradient id="near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1a47" />
          <stop offset="100%" stopColor="var(--city-near)" />
        </linearGradient>
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff9dc4" stopOpacity="0" />
          <stop offset="100%" stopColor="#ff9dc4" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="lamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--city-window)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--city-window)" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="train" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff5f80" />
          <stop offset="45%" stopColor="var(--train-body)" />
          <stop offset="100%" stopColor="#8e1533" />
        </linearGradient>
        <radialGradient id="tunnel-lamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffdca0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffdca0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="headlamp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff3c0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff3c0" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="bone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--bone)" />
          <stop offset="100%" stopColor="var(--bone-shade)" />
        </linearGradient>
        <linearGradient id="bone-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--bone)" />
          <stop offset="100%" stopColor="#9c8557" />
        </linearGradient>

        <radialGradient id="core-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--core-mid)" stopOpacity="0.4" />
          <stop offset="60%" stopColor="var(--core-mid)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--core-mid)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dome" cx="50%" cy="16%" r="62%">
          <stop offset="0%" stopColor="var(--core-center)" />
          <stop offset="30%" stopColor="var(--core-hot)" />
          <stop offset="62%" stopColor="var(--core-mid)" />
          <stop offset="100%" stopColor="#a12508" />
        </radialGradient>
        <radialGradient id="dome-inner" cx="50%" cy="12%" r="45%">
          <stop offset="0%" stopColor="#fffbe8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffb257" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bubble" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#fff3c4" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#ffa53c" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0.12" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill="url(#strip)" />

      <Space />
      <Sky />
      <Surface />
      <Underground />
      <Fossils />
      <Core />
    </svg>
  );
}
