"use client";

import type { ReactNode } from "react";

/**
 * The whole journey as ONE continuous SVG strip: space -> sky -> surface ->
 * subway -> fossils -> core. Single background gradient over the full height,
 * so there are no seams between zones. The strip is 1200 units wide and scales
 * with its column; the page background shows either side of it.
 *
 * Animation rule used throughout: an element that needs a fixed position AND a
 * CSS animation gets an OUTER <g transform> for placement and an INNER <g> for
 * the animation — a CSS transform would otherwise replace the SVG one.
 */

const W = 1200;
const H = 7000;

const GROUND = 3060; // street level
const ROAD_BOTTOM = 3200;
const RAIL_Y = 4090;
const DOME_CY = 7620;
const DOME_R = 760; // dome crown lands at y = 6860

/* ----------------------------------------------------------------- space -- */

const STARS = Array.from({ length: 70 }, (_, i) => ({
  x: (i * 173 + 31) % W,
  y: (i * 97 + 17) % 1040,
  r: 0.7 + ((i * 29) % 6) * 0.28,
  o: 0.35 + ((i * 13) % 6) * 0.1,
  d: (i * 0.37) % 5,
}));

function Space() {
  return (
    <>
      <ellipse cx="250" cy="230" rx="440" ry="300" fill="url(#neb-a)" />
      <ellipse cx="980" cy="700" rx="420" ry="290" fill="url(#neb-b)" />

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

      {[
        [180, 150, 1],
        [640, 90, 0.7],
        [1040, 520, 0.85],
      ].map(([x, y, s], i) => (
        <g
          key={i}
          transform={`translate(${x} ${y}) scale(${s})`}
          className="anim"
          style={{ animation: `twinkle ${4 + i}s ease-in-out ${i * 1.2}s infinite` }}
        >
          <path
            d="M0 -13 L2 -2 L13 0 L2 2 L0 13 L-2 2 L-13 0 L-2 -2 Z"
            fill="#fff"
            opacity="0.9"
          />
        </g>
      ))}

      {/* ringed planet */}
      <g transform="rotate(-17 880 300)">
        <ellipse cx="880" cy="300" rx="196" ry="48" fill="none" stroke="url(#ring)" strokeWidth="15" />
      </g>
      <circle cx="880" cy="300" r="106" fill="url(#planet)" />
      <g clipPath="url(#planet-clip)" opacity="0.28">
        <ellipse cx="880" cy="252" rx="120" ry="13" fill="#2a0f22" />
        <ellipse cx="880" cy="306" rx="120" ry="10" fill="#ffd0a0" opacity="0.55" />
        <ellipse cx="880" cy="348" rx="120" ry="16" fill="#2a0f22" />
      </g>
      <g transform="rotate(-17 880 300)">
        <path d="M 684 300 A 196 48 0 0 0 1076 300" fill="none" stroke="url(#ring)" strokeWidth="15" />
      </g>

      {/* moon */}
      <circle cx="250" cy="700" r="54" fill="url(#moon)" />
      <g fill="#5d5972" opacity="0.5">
        <circle cx="231" cy="680" r="11" />
        <circle cx="264" cy="712" r="8" />
        <circle cx="238" cy="728" r="5" />
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
  { y: 1290, s: 1, dur: 9, delay: 0, tint: "#3b2340" },
  { y: 1620, s: 0.62, dur: 13, delay: -4, tint: "#4a2f52" },
  { y: 1150, s: 0.42, dur: 17, delay: -9, tint: "#56395e" },
];

const CLOUDS = [
  { x: 180, y: 1780, s: 1.1, dur: 11, o: 0.9 },
  { x: 620, y: 1660, s: 0.7, dur: 9, o: 0.75 },
  { x: 950, y: 1900, s: 1, dur: 13, o: 0.85 },
  { x: 300, y: 2020, s: 0.8, dur: 12, o: 0.8 },
  { x: 820, y: 2090, s: 1.25, dur: 15, o: 0.6 },
  { x: 1080, y: 1720, s: 0.55, dur: 8, o: 0.7 },
];

function Sky() {
  return (
    <>
      {/* sun — anchored, never animates */}
      <circle cx="900" cy="1560" r="280" fill="url(#sun-glow)" />
      <circle cx="900" cy="1560" r="84" fill="url(#sun)" />

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

/** Rooftop chimney with rising smoke. */
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
          style={{ animation: `smoke-rise ${7}s ease-out ${-i * 1.75}s infinite` }}
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

/** A pedestrian with a swinging walk cycle. */
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

      {/* street */}
      <rect x="0" y={GROUND} width={W} height={ROAD_BOTTOM - GROUND} fill="var(--road)" />
      <rect x="0" y={GROUND} width={W} height="3" fill="#fff" opacity="0.08" />
      {Array.from({ length: 16 }, (_, i) => (
        <rect key={i} x={i * 78 + 8} y={GROUND + 56} width="40" height="3" fill="#ffe6a8" opacity="0.26" />
      ))}

      {/* lamps */}
      {[110, 430, 750, 1070].map((x, i) => (
        <g key={i}>
          <rect x={x} y={GROUND - 74} width="4" height="74" fill="#3a2a52" />
          <rect x={x - 15} y={GROUND - 78} width="34" height="5" rx="2" fill="#3a2a52" />
          <circle cx={x + 2} cy={GROUND - 70} r="40" fill="url(#lamp)" />
        </g>
      ))}

      {/* pedestrians */}
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

      {/* traffic */}
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

/* ------------------------------------------------------------- underground -- */

function Carriage({ x, seed }: { x: number; seed: number }) {
  const CW = 250;
  const top = 3830;
  const h = 165;
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y={top} width={CW} height={h} rx="13" fill="url(#train)" />
      <rect x="6" y={top - 7} width={CW - 12} height="14" rx="6" fill="var(--train-roof)" />
      <rect x="0" y={top + h - 18} width={CW} height="18" rx="5" fill="#2a1020" opacity="0.85" />
      {Array.from({ length: 4 }, (_, i) => {
        const wx = 20 + i * 57;
        return (
          <g key={i}>
            <rect x={wx} y={top + 26} width="44" height="46" rx="6" fill="var(--train-window)" opacity="0.92" />
            {(i + seed) % 3 !== 0 && (
              <g fill="#5a3520" opacity="0.75">
                <circle cx={wx + 22} cy={top + 47} r="8" />
                <path d={`M${wx + 11} ${top + 72} a11 13 0 0 1 22 0 Z`} />
              </g>
            )}
          </g>
        );
      })}
      {[44, CW - 78].map((bx, i) => (
        <g key={i}>
          <rect x={bx} y={top + h} width="34" height="12" rx="4" fill="#1a0d14" />
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
  const top = 3830;
  const h = 165;
  return (
    <>
      {/* roots and pipes in the shallow soil */}
      {[
        "M120 3210 C 150 3270, 90 3320, 130 3400",
        "M420 3205 C 460 3260, 400 3300, 440 3380",
        "M900 3210 C 860 3280, 940 3320, 890 3400",
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#4a3520" strokeWidth="5" opacity="0.55" strokeLinecap="round" />
      ))}
      <rect x="640" y="3230" width="420" height="14" rx="7" fill="#3a2b1e" opacity="0.7" />
      <rect x="200" y="3300" width="320" height="12" rx="6" fill="#3a2b1e" opacity="0.6" />

      {/* tunnel vault */}
      <path d={`M -40 4400 L -40 3620 A 640 340 0 0 1 1240 3620 L 1240 4400 Z`} fill="#31201a" opacity="0.6" />
      <path d={`M 40 4400 L 40 3660 A 560 300 0 0 1 1160 3660 L 1160 4400 Z`} fill="var(--tunnel-deep)" />

      {/* ceiling lamps */}
      {Array.from({ length: 6 }, (_, i) => {
        const x = 130 + i * 190;
        return (
          <g key={i}>
            <circle cx={x} cy="3560" r="60" fill="url(#tunnel-lamp)" />
            <rect x={x - 18} y="3550" width="36" height="8" rx="4" fill="#ffdca0" opacity="0.9" />
          </g>
        );
      })}

      {/* ribs */}
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={70 + i * 170} y="3680" width="9" height="720" fill="#3d2820" opacity="0.45" />
      ))}

      {/* track bed */}
      <rect x="0" y={RAIL_Y - 6} width={W} height="150" fill="#1c120e" />
      {Array.from({ length: 26 }, (_, i) => (
        <rect key={i} x={i * 47} y={RAIL_Y + 12} width="30" height="8" rx="2" fill="#33241b" />
      ))}
      <rect x="0" y={RAIL_Y + 4} width={W} height="5" fill="var(--rail)" />
      <rect x="0" y={RAIL_Y + 28} width={W} height="5" fill="var(--rail)" opacity="0.7" />

      {/* speed streaks */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(0 ${3790 + i * 46})`}>
          <g className="anim" style={{ animation: `speed-line 2.2s linear ${-i * 0.28}s infinite` }}>
            <rect x="0" y="0" width="200" height="4" rx="2" fill="#ff8fae" />
          </g>
        </g>
      ))}

      {/* the train */}
      <g className="anim" style={{ animation: "train-x 5s linear infinite" }}>
        <Carriage x={0} seed={2} />
        <Carriage x={262} seed={1} />
        <Carriage x={524} seed={3} />
        <g transform="translate(786 0)">
          <path
            d={`M0 ${top} L196 ${top} C 228 ${top}, 252 ${top + 30}, 256 ${top + 64}
                L256 ${top + h - 12} A 12 12 0 0 1 244 ${top + h} L0 ${top + h} Z`}
            fill="url(#train)"
          />
          <rect x="6" y={top - 7} width="212" height="14" rx="6" fill="var(--train-roof)" />
          <path
            d={`M196 ${top + 20} C 220 ${top + 22}, 235 ${top + 40}, 239 ${top + 66} L196 ${top + 66} Z`}
            fill="var(--train-window)"
            opacity="0.95"
          />
          <circle cx="213" cy={top + 50} r="8" fill="#5a3520" opacity="0.8" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={24 + i * 56} y={top + 26} width="42" height="46" rx="6" fill="var(--train-window)" opacity="0.9" />
          ))}
          <circle cx="246" cy={top + 104} r="8" fill="#fff6cf" />
          <circle cx="246" cy={top + 130} r="5" fill="#fff6cf" opacity="0.8" />
          <path d={`M250 ${top + 90} L470 ${top + 52} L470 ${top + 160} L250 ${top + 120} Z`} fill="url(#headlamp)" />
          <rect x="0" y={top + h - 18} width="248" height="18" rx="5" fill="#2a1020" opacity="0.85" />
          {[46, 176].map((bx, i) => (
            <g key={i}>
              <rect x={bx} y={top + h} width="38" height="12" rx="4" fill="#1a0d14" />
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

/* ---------------------------------------------------------------- fossils -- */

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

const DUST = Array.from({ length: 26 }, (_, i) => ({
  x: (i * 149 + 30) % W,
  y: 4460 + ((i * 71) % 1180),
  r: 1.2 + ((i * 13) % 4) * 0.5,
  d: (i * 0.8) % 9,
  dur: 15 + (i % 6) * 3,
}));

/** Side-view theropod skeleton, facing left. Origin sits at the hip. */
function Dinosaur() {
  const S = "var(--fossil-mark)";
  return (
    <g stroke={S} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* tail + spine + neck */}
      <path
        d="M470 30 C 380 6, 300 -14, 210 -34 C 140 -50, 60 -66, -10 -78 C -80 -90, -140 -104, -190 -120"
        strokeWidth="9"
      />
      {/* neck vertebrae ticks */}
      {[-30, -70, -110, -150].map((x, i) => (
        <line key={i} x1={x} y1={-80 - i * 10} x2={x + 6} y2={-96 - i * 10} strokeWidth="5" />
      ))}
      {/* skull */}
      <g transform="translate(-250 -140) rotate(-8)">
        <path d="M0 0 C 20 -26, 78 -30, 118 -16 L132 -2 L118 8 L20 12 C 6 12, -4 8, 0 0 Z" strokeWidth="7" />
        <path d="M18 14 L126 6 L130 20 L26 26 C 14 26, 12 20, 18 14 Z" strokeWidth="6" />
        <circle cx="40" cy="-10" r="9" strokeWidth="5" />
        <path d="M92 -14 L100 -6" strokeWidth="4" />
        {/* teeth */}
        {[46, 62, 78, 94, 110].map((x, i) => (
          <path key={i} d={`M${x} 10 L${x + 4} 20`} strokeWidth="3.5" />
        ))}
      </g>
      {/* ribcage */}
      {[10, 55, 100, 145, 190].map((x, i) => (
        <path
          key={i}
          d={`M${x} ${-70 + i * 8} C ${x - 26} ${10 + i * 6}, ${x + 16} ${86 + i * 5}, ${x - 4} ${120 + i * 4}`}
          strokeWidth="6"
        />
      ))}
      {/* forelimb */}
      <path d="M40 30 L14 74 L34 96" strokeWidth="5" />
      {/* hind limb */}
      <path d="M300 10 L322 118 L272 176 L296 236" strokeWidth="9" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M296 236 L${332 + i * 16} ${250 + i * 6}`} strokeWidth="5" />
      ))}
      {/* pelvis */}
      <path d="M262 -6 L330 22" strokeWidth="7" />
    </g>
  );
}

function Fossils() {
  return (
    <>
      {[4520, 4720, 4980, 5240, 5480, 5650].map((y, i) => (
        <path
          key={i}
          d={`M -40 ${y} Q 300 ${y - 18 + i * 5}, 600 ${y + 8} T 1240 ${y - 10}`}
          fill="none"
          stroke="var(--fossil-mark)"
          strokeWidth={i % 2 ? 2 : 4}
          opacity={i % 2 ? 0.3 : 0.5}
        />
      ))}

      {Array.from({ length: 110 }, (_, i) => (
        <circle
          key={i}
          cx={(i * 211 + 17) % W}
          cy={4420 + ((i * 137 + 41) % 1300)}
          r={0.8 + ((i * 7) % 3) * 0.4}
          fill="var(--fossil-mark)"
          opacity="0.16"
        />
      ))}

      <g transform="translate(600 5020) scale(1.05)">
        <Dinosaur />
      </g>

      {/* ammonite */}
      <g>
        <path d={spiral(190, 4620, 2.5, 5, 62, 80)} fill="none" stroke="var(--fossil-mark)" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* scattered bones */}
      <g stroke="var(--fossil-mark)" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.75">
        <path d="M900 5560 L1010 5590" />
        <circle cx="896" cy="5558" r="9" />
        <circle cx="1014" cy="5592" r="9" />
        <path d="M210 5420 L300 5390" />
        <circle cx="206" cy="5422" r="8" />
        <circle cx="304" cy="5388" r="8" />
      </g>

      {/* footprint trail */}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${170 + i * 90} ${5720 + (i % 2) * 26} l14 -20 l14 20 l-8 4 l-6 -8 l-6 8 Z`}
          fill="var(--fossil-mark)"
          opacity="0.3"
        />
      ))}

      {DUST.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill="#f6e6cc"
          opacity="0.28"
          className="anim"
          style={{ animation: `dust-drift ${d.dur}s ease-in-out ${-d.d}s infinite` }}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------- core -- */

const EMBERS = Array.from({ length: 26 }, (_, i) => ({
  x: 60 + ((i * 137) % 1080),
  y: 6600 + ((i * 53) % 320),
  r: 1.6 + ((i * 11) % 4) * 0.7,
  d: (i * 0.7) % 10,
  dur: 8 + (i % 5) * 2,
}));

function Core() {
  return (
    <>
      {/* magma veins reaching up out of the dome */}
      {[
        "M600 6860 L560 6660 L590 6500 L548 6320",
        "M600 6860 L672 6690 L640 6520 L690 6360",
        "M600 6860 L470 6740 L420 6600 L340 6520",
        "M600 6860 L744 6760 L806 6640 L900 6580",
        "M600 6860 L250 6820 L170 6700",
        "M600 6860 L980 6800 L1060 6690",
      ].map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="var(--core-mid)" strokeWidth="14" opacity="0.14" strokeLinecap="round" />
          <path d={d} fill="none" stroke="url(#vein)" strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}

      {/* heat haze above the dome */}
      <ellipse cx="600" cy={DOME_CY - DOME_R} rx="700" ry="330" fill="url(#core-halo)" />

      {/* the dome: the bottom of the world */}
      <g className="anim" style={{ animation: "soft-pulse 6s ease-in-out infinite" }}>
        <circle cx="600" cy={DOME_CY} r={DOME_R} fill="url(#dome)" />
        <circle cx="600" cy={DOME_CY} r={DOME_R - 46} fill="url(#dome-inner)" opacity="0.85" />
      </g>

      {/* crust cracks riding the dome surface */}
      {[-0.55, -0.28, 0, 0.28, 0.55].map((t, i) => {
        const a = -Math.PI / 2 + t;
        const x1 = 600 + Math.cos(a) * (DOME_R - 4);
        const y1 = DOME_CY + Math.sin(a) * (DOME_R - 4);
        const x2 = 600 + Math.cos(a) * (DOME_R - 120);
        const y2 = DOME_CY + Math.sin(a) * (DOME_R - 120);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffb257" strokeWidth="5" opacity="0.5" />;
      })}

      {EMBERS.map((e, i) => (
        <circle
          key={i}
          cx={e.x}
          cy={e.y}
          r={e.r}
          fill="var(--core-hot)"
          className="anim"
          style={{ animation: `ember-rise ${e.dur}s linear ${-e.d}s infinite` }}
        />
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
          <stop offset="0%" stopColor="#030309" />
          <stop offset="12%" stopColor="#0a0718" />
          <stop offset="16%" stopColor="#241344" />
          <stop offset="23%" stopColor="#6b3a8a" />
          <stop offset="28%" stopColor="#d95f9b" />
          <stop offset="31%" stopColor="#ffa9c2" />
          <stop offset="35%" stopColor="#7a4276" />
          <stop offset="41%" stopColor="#2b1a33" />
          <stop offset="44%" stopColor="#33220f" />
          <stop offset="49%" stopColor="#241812" />
          <stop offset="58%" stopColor="#150d08" />
          <stop offset="63%" stopColor="#2a1b11" />
          <stop offset="72%" stopColor="#3b2817" />
          <stop offset="80%" stopColor="#4d3421" />
          <stop offset="85%" stopColor="#5c2410" />
          <stop offset="91%" stopColor="#2b0a05" />
          <stop offset="100%" stopColor="#1b0502" />
        </linearGradient>

        <radialGradient id="neb-a" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="neb-b" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="planet" cx="34%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#ffb27a" />
          <stop offset="42%" stopColor="#d9663f" />
          <stop offset="78%" stopColor="#5c2036" />
          <stop offset="100%" stopColor="#1b0a1c" />
        </radialGradient>
        <radialGradient id="moon" cx="36%" cy="32%" r="76%">
          <stop offset="0%" stopColor="#e8e6f2" />
          <stop offset="60%" stopColor="#9d99b4" />
          <stop offset="100%" stopColor="#332f45" />
        </radialGradient>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffd8a8" stopOpacity="0.15" />
          <stop offset="35%" stopColor="#ffd8a8" stopOpacity="0.75" />
          <stop offset="65%" stopColor="#e2a3ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffd8a8" stopOpacity="0.15" />
        </linearGradient>
        <clipPath id="planet-clip">
          <circle cx="880" cy="300" r="106" />
        </clipPath>

        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sun-glow)" stopOpacity="0.8" />
          <stop offset="45%" stopColor="var(--sun-glow)" stopOpacity="0.26" />
          <stop offset="100%" stopColor="var(--sun-glow)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sun" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#fffdf2" />
          <stop offset="55%" stopColor="var(--sun)" />
          <stop offset="100%" stopColor="#ffc178" />
        </radialGradient>
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

        <radialGradient id="core-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--core-mid)" stopOpacity="0.42" />
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
          <stop offset="0%" stopColor="#fffbe8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffb257" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vein" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--core-hot)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--core-mid)" stopOpacity="0.12" />
        </linearGradient>
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
