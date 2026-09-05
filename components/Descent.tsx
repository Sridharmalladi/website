"use client";

import { useRef, type ReactNode } from "react";
import { BANDS, STRIP_H, STRIP_W } from "@/config/bands";
import { useLiveBands } from "@/hooks/useLiveBands";
import { cn } from "@/lib/cn";

/**
 * The whole journey as ONE continuous SVG strip: outer planets -> sky
 * -> city -> subway -> fossil beds -> core. A single background gradient spans
 * the full height so there are no seams between zones.
 *
 * Animation rule: an element that needs a fixed position AND a CSS animation
 * gets an OUTER <g transform> for placement and an INNER <g> for the animation —
 * an animated CSS transform would otherwise replace the SVG one.
 */

const W = STRIP_W;
const H = STRIP_H;

/**
 * Scale: 20 strip units = 1 metre. Every object below is sized from its real
 * dimensions against that, so a person, a car, a lamp post, a train carriage
 * and the dinosaur are all in believable proportion to each other.
 */
const M = 20;
const PERSON_H = 1.75 * M; // 35

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

const STARS = Array.from({ length: 68 }, (_, i) => ({
  x: (i * 173 + 31) % W,
  y: (i * 149 + 17) % 1780,
  r: 0.6 + ((i * 29) % 6) * 0.26,
  o: 0.3 + ((i * 13) % 6) * 0.1,
  d: (i * 0.37) % 5,
}));

/**
 * Looking outward from Earth, so Earth itself isn't in frame — only the
 * planets beyond it. Kept to the sides and clear of the vertical band where
 * the name and copy sit.
 */
const SHOOTERS = [
  { x: 60, y: 210, rot: 24, dur: 9, delay: -2.4, len: 120 },
  { x: 520, y: 90, rot: 18, dur: 13, delay: -7.1, len: 90 },
  { x: 760, y: 700, rot: 30, dur: 11, delay: -4.6, len: 140 },
  { x: 120, y: 980, rot: 21, dur: 17, delay: -11.3, len: 100 },
  { x: 600, y: 1320, rot: 27, dur: 15, delay: -1.9, len: 115 },
  { x: 880, y: 1620, rot: 16, dur: 19, delay: -13.7, len: 80 },
  { x: 260, y: 1500, rot: 33, dur: 12, delay: -6.2, len: 130 },
];

function Space() {
  return (
    <>
      <ellipse cx="250" cy="300" rx="440" ry="330" fill="url(#neb-a)" />
      <ellipse cx="980" cy="1100" rx="430" ry="340" fill="url(#neb-b)" />

      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#fff"
          opacity={s.o}
          className="anim"
          style={{ animation: `twinkle ${2.6 + ((i * 7) % 9) * 0.4}s ease-in-out ${-((i * 3.7) % 11).toFixed(2)}s infinite` }}
        />
      ))}

      {/* shooting stars */}
      {SHOOTERS.map((sh, i) => (
        <g key={i} transform={`translate(${sh.x} ${sh.y}) rotate(${sh.rot})`}>
          <g className="anim" style={{ animation: `shoot ${sh.dur}s linear ${sh.delay}s infinite` }}>
            <rect x={-sh.len} y="-1.6" width={sh.len} height="3.2" rx="1.6" fill="url(#shoot-trail)" />
            <circle cx="0" cy="0" r="3" fill="#fff" />
          </g>
        </g>
      ))}

      {/* not from here */}
      {[
        { x: 470, y: 760, s: 1, dur: 9, delay: -2.6 },
        { x: 1040, y: 1290, s: 0.62, dur: 12, delay: -7.4 },
      ].map((u, i) => (
        <g key={`ufo${i}`} transform={`translate(${u.x} ${u.y}) scale(${u.s})`}>
          <g className="anim" style={{ animation: `hover-bob ${u.dur}s ease-in-out ${u.delay}s infinite` }}>
            <ellipse cx="0" cy="26" rx="54" ry="12" fill="url(#beam)" />
            <ellipse cx="0" cy="0" rx="46" ry="13" fill="url(#hull)" />
            <path d="M-24 -6 C -18 -22, 18 -22, 24 -6 Z" fill="url(#canopy)" />
            <ellipse cx="0" cy="4" rx="46" ry="6" fill="#1b2340" opacity="0.55" />
            {[-30, -14, 2, 18, 32].map((lx, k) => (
              <circle
                key={k}
                cx={lx}
                cy="6"
                r="3.4"
                fill="#8ffff0"
                className="anim"
                style={{ animation: `twinkle ${1.6 + k * 0.3}s ease-in-out ${-(k * 0.42)}s infinite` }}
              />
            ))}
          </g>
        </g>
      ))}

      {/* Mars — smallest and furthest left */}
      <g>
        <circle cx="185" cy="330" r="34" fill="url(#mars)" />
        <g clipPath="url(#mars-clip)">
          <ellipse cx="185" cy="302" rx="20" ry="8" fill="#f6f0e8" opacity="0.8" />
          <ellipse cx="172" cy="340" rx="13" ry="8" fill="#8a3a20" opacity="0.45" />
          <ellipse cx="200" cy="354" rx="10" ry="6" fill="#8a3a20" opacity="0.4" />
        </g>
      </g>

      {/* Jupiter — banded, with the Great Red Spot */}
      <g>
        <circle cx="975" cy="500" r="86" fill="url(#jupiter)" />
        <g clipPath="url(#jupiter-clip)">
          <ellipse cx="975" cy="450" rx="104" ry="11" fill="#c99b6a" opacity="0.55" />
          <ellipse cx="975" cy="478" rx="104" ry="9" fill="#f2dcc0" opacity="0.45" />
          <ellipse cx="975" cy="510" rx="104" ry="12" fill="#b8814f" opacity="0.5" />
          <ellipse cx="975" cy="540" rx="104" ry="9" fill="#f2dcc0" opacity="0.4" />
          <ellipse cx="975" cy="566" rx="104" ry="11" fill="#c99b6a" opacity="0.5" />
          <ellipse cx="935" cy="528" rx="24" ry="14" fill="#d4553a" opacity="0.85" />
        </g>
      </g>

      {/* Saturn — low and left, well below the name */}
      <g>
        <g transform="rotate(-18 285 1215)">
          <ellipse cx="285" cy="1215" rx="124" ry="30" fill="none" stroke="url(#ring)" strokeWidth="13" />
        </g>
        <circle cx="285" cy="1215" r="60" fill="url(#saturn)" />
        <g clipPath="url(#saturn-clip)" opacity="0.3">
          <ellipse cx="285" cy="1190" rx="72" ry="7" fill="#8a6023" />
          <ellipse cx="285" cy="1223" rx="72" ry="6" fill="#fff0c0" opacity="0.5" />
          <ellipse cx="285" cy="1248" rx="72" ry="8" fill="#8a6023" />
        </g>
        <g transform="rotate(-18 285 1215)">
          <path d="M 161 1215 A 124 30 0 0 0 409 1215" fill="none" stroke="url(#ring)" strokeWidth="13" />
        </g>
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
  { y: 2190, s: 1, dur: 9.4, delay: -3.7, tint: "#3b2340" },
  { y: 2430, s: 0.62, dur: 12.6, delay: -8.9, tint: "#4a2f52" },
  { y: 2060, s: 0.42, dur: 17.3, delay: -14.2, tint: "#56395e" },
];

const CLOUDS = [
  { x: 180, y: 2560, s: 1.1, dur: 11, o: 0.9 },
  { x: 620, y: 2470, s: 0.7, dur: 9, o: 0.75 },
  { x: 950, y: 2640, s: 1, dur: 13, o: 0.85 },
  { x: 300, y: 2700, s: 0.8, dur: 12, o: 0.8 },
  { x: 820, y: 2760, s: 1.25, dur: 15, o: 0.6 },
  { x: 1080, y: 2520, s: 0.55, dur: 8, o: 0.7 },
];

function Sky() {
  return (
    <>
      {PLANES.map((p, i) => (
        <g key={i} transform={`translate(0 ${p.y})`}>
          <g className="anim" style={{ animation: `fly-x ${p.dur}s linear ${p.delay}s infinite` }}>
            <g transform={`scale(${p.s})`}>
              <g className="anim" style={{ animation: `bank ${11 + i * 3}s ease-in-out ${-(i * 2.9 + 1.3)}s infinite` }}>
                <Airliner tint={p.tint} />
              </g>
            </g>
          </g>
        </g>
      ))}

      {CLOUDS.map((c, i) => (
        <g key={i} transform={`translate(0 ${c.y})`}>
          <g className="anim" style={{ animation: `cloud-drift ${c.dur}s linear ${-((i * 4.3 + 1.7) % c.dur).toFixed(2)}s infinite` }}>
            <g
              transform={`translate(${c.x} 0) scale(${c.s})`}
              fill="url(#cloud)"
              opacity={c.o}
              filter="url(#soft)"
            >
              {[
                { cx: 0, cy: 6, rx: 92, ry: 23, d: 13 },
                { cx: -42, cy: 0, rx: 44, ry: 23, d: 17 },
                { cx: 6, cy: -14, rx: 54, ry: 29, d: 21 },
                { cx: 52, cy: -2, rx: 42, ry: 21, d: 15 },
                { cx: -14, cy: 11, rx: 62, ry: 18, d: 19 },
              ].map((e, k) => (
                <ellipse
                  key={k}
                  cx={e.cx}
                  cy={e.cy}
                  rx={e.rx}
                  ry={e.ry}
                  className="anim"
                  style={{ animation: `puff ${e.d}s ease-in-out ${-(k * 3.1 + i * 1.7).toFixed(2)}s infinite` }}
                />
              ))}
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
  { x: 96, w: 78, h: 470, rows: 12, cols: 2, cap: "mast" },
  { x: 120, w: 90, h: 220, rows: 6, cols: 2 },
  { x: 230, w: 140, h: 380, rows: 9, cols: 3, cap: "mast" },
  { x: 390, w: 100, h: 250, rows: 7, cols: 2 },
  { x: 510, w: 155, h: 430, rows: 10, cols: 3, cap: "step" },
  { x: 685, w: 105, h: 270, rows: 7, cols: 2 },
  { x: 810, w: 145, h: 360, rows: 9, cols: 3 },
  { x: 975, w: 100, h: 240, rows: 6, cols: 2, cap: "mast" },
  { x: 1095, w: 135, h: 330, rows: 8, cols: 3 },
  { x: 452, w: 84, h: 520, rows: 13, cols: 2, cap: "mast" },
  { x: 762, w: 92, h: 486, rows: 12, cols: 2 },
  { x: 1180, w: 96, h: 400, rows: 10, cols: 2, cap: "step" },
];

const NEAR: Building[] = [
  { x: -40, w: 170, h: 250, rows: 6, cols: 4, cap: "stack" },
  { x: 150, w: 125, h: 185, rows: 4, cols: 3 },
  { x: 295, w: 195, h: 315, rows: 7, cols: 4, cap: "step" },
  { x: 510, w: 135, h: 210, rows: 5, cols: 3 },
  { x: 665, w: 185, h: 290, rows: 6, cols: 4, cap: "stack" },
  { x: 870, w: 145, h: 200, rows: 5, cols: 3 },
  { x: 1035, w: 180, h: 300, rows: 7, cols: 4, cap: "mast" },
  { x: 1225, w: 150, h: 360, rows: 8, cols: 3, cap: "stack" },
];

function windows(b: Building, seed: number, dim: boolean): ReactNode[] {
  const pad = 10;
  const gx = (b.w - pad * 2) / b.cols;
  const gy = (b.h - pad * 2) / b.rows;
  const out: ReactNode[] = [];
  for (let r = 0; r < b.rows; r++) {
    for (let c = 0; c < b.cols; c++) {
      const i = r * b.cols + c;
      if ((i * 7 + seed * 5) % 4 === 0) continue; // unlit
      // rooms aren't all the same bulb: mostly warm, a few cooler
      const cool = (i * 5 + seed * 3) % 7 === 0;
      const animated = (i * 5 + seed * 3) % 3 === 0;
      out.push(
        <rect
          key={i}
          x={b.x + pad + c * gx}
          y={GROUND - b.h + pad + r * gy}
          width={Math.max(3, gx * 0.52)}
          height={Math.max(3, gy * 0.46)}
          rx="1"
          fill={cool ? "#bcd8f0" : "var(--city-window)"}
          opacity={dim ? 0.4 : 0.82}
          className={animated ? "anim" : undefined}
          style={
            animated
              ? {
                  animation: `twinkle ${6.5 + ((i * 3 + seed) % 9) * 0.7}s ease-in-out ${-(((i * 13 + seed * 19) % 130) / 10)}s infinite`,
                }
              : undefined
          }
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
          style={{ animation: `smoke-rise ${6.6 + (i % 3) * 0.7}s ease-out ${-(i * 1.9 + 0.8)}s infinite` }}
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

type VehicleKind = "sedan" | "taxi" | "van" | "police" | "ambulance";

/** Wheels sit on the same baseline for every body, so the fleet lines up. */
function Wheels({ a, b }: { a: number; b: number }) {
  return (
    <>
      {[a, b].map((wx, i) => (
        <g key={i}>
          <circle cx={wx} cy="18" r="8.5" fill="#0d0716" />
          <circle cx={wx} cy="18" r="3.6" fill="#4a4058" />
        </g>
      ))}
    </>
  );
}

function Vehicle({ kind, body, roof }: { kind: VehicleKind; body: string; roof: string }) {
  const glass = "#9fd8ff";

  if (kind === "van" || kind === "ambulance") {
    const amb = kind === "ambulance";
    const L = amb ? 112 : 102;
    return (
      <g>
        {/* box body with a stepped-down cab */}
        <path
          d={`M0 -22 L${L - 34} -22 L${L - 34} -8 L${L - 6} 6 L${L} 6 L${L} 17 L0 17 Z`}
          fill={amb ? "#f2f4f8" : body}
        />
        <rect x={L - 32} y="-6" width="20" height="13" rx="2.5" fill={glass} opacity="0.5" />
        <rect x="6" y="-16" width="14" height="11" rx="2" fill={glass} opacity="0.28" />
        {amb ? (
          <>
            <rect x="20" y="-14" width="46" height="9" rx="2" fill="#e23a3a" />
            <g fill="#e23a3a">
              <rect x="36" y="-6" width="16" height="5" rx="1" />
              <rect x="41.5" y="-11.5" width="5" height="16" rx="1" />
            </g>
            {/* twin beacons, alternating */}
            <rect
              className="anim"
              x={L - 40}
              y="-27"
              width="9"
              height="5"
              rx="2"
              fill="#ff4d4d"
              style={{ animation: "beacon-a 0.9s steps(1) infinite" }}
            />
            <rect
              className="anim"
              x={L - 29}
              y="-27"
              width="9"
              height="5"
              rx="2"
              fill="#4db4ff"
              style={{ animation: "beacon-b 0.9s steps(1) infinite" }}
            />
          </>
        ) : (
          <rect x="18" y="-12" width="52" height="7" rx="2" fill={roof} opacity="0.6" />
        )}
        <Wheels a={24} b={L - 24} />
        <circle cx={L - 2} cy="9" r="3.4" fill="#fff4c4" />
        <rect x="0" y="6" width="4" height="5" rx="1.5" fill="#ff6060" />
      </g>
    );
  }

  // saloon shell shared by sedan, taxi and the patrol car
  return (
    <g>
      <rect x="0" y="-2" width="88" height="19" rx="8" fill={body} />
      <path d="M20 -2 L28 -19 L60 -19 L72 -2 Z" fill={roof} />
      <rect x="30" y="-16" width="15" height="12" rx="2" fill={glass} opacity="0.45" />
      <rect x="49" y="-16" width="16" height="12" rx="2" fill={glass} opacity="0.35" />
      {kind === "taxi" && (
        <>
          <rect x="36" y="-25" width="18" height="7" rx="2" fill="#ffd166" />
          <rect x="0" y="4" width="88" height="4" fill="#1c1626" opacity="0.35" />
        </>
      )}
      {kind === "police" && (
        <>
          <rect x="30" y="2" width="34" height="9" rx="2" fill="#f2f4f8" opacity="0.9" />
          <rect
            className="anim"
            x="32"
            y="-25"
            width="11"
            height="6"
            rx="2"
            fill="#4db4ff"
            style={{ animation: "beacon-a 0.8s steps(1) infinite" }}
          />
          <rect
            className="anim"
            x="45"
            y="-25"
            width="11"
            height="6"
            rx="2"
            fill="#ff4d4d"
            style={{ animation: "beacon-b 0.8s steps(1) infinite" }}
          />
        </>
      )}
      <Wheels a={22} b={68} />
      <circle cx="86" cy="8" r="3.6" fill="#fff4c4" />
      <rect x="0" y="5" width="4" height="5" rx="1.5" fill="#ff6060" />
    </g>
  );
}

/** Same traffic density as before — just a more varied fleet. */
const CARS: {
  lane: number;
  dur: number;
  delay: number;
  rev: boolean;
  kind: VehicleKind;
  body: string;
  roof: string;
}[] = [
  { lane: GROUND + 30, dur: 4.4, delay: -1.9, rev: false, kind: "sedan", body: "#ff5a8a", roof: "#3a1030" },
  { lane: GROUND + 30, dur: 5.6, delay: -3.4, rev: false, kind: "van", body: "#5f8ad8", roof: "#24365c" },
  { lane: GROUND + 30, dur: 6.4, delay: -5.2, rev: false, kind: "ambulance", body: "#f2f4f8", roof: "#f2f4f8" },
  { lane: GROUND + 84, dur: 4.9, delay: -2.6, rev: true, kind: "taxi", body: "#ffd166", roof: "#4a3510" },
  { lane: GROUND + 84, dur: 5.9, delay: -4.8, rev: true, kind: "police", body: "#25304a", roof: "#101725" },
];

function Walker({ tint, step, phase }: { tint: string; step: number; phase: number }) {
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
        style={{ animation: `leg-a ${step}s ease-in-out ${phase}s infinite` }}
      />
      <rect
        className="anim leg"
        x="0.6"
        y="-10"
        width="3.4"
        height="11"
        rx="1.5"
        style={{ animation: `leg-b ${step}s ease-in-out ${phase}s infinite` }}
      />
    </g>
  );
}

const PEOPLE = [
  { dur: 22, delay: -7.3, rev: false, s: 1, tint: "var(--person)", step: 0.62 },
  { dur: 27, delay: -18.4, rev: false, s: 0.86, tint: "#22143b", step: 0.55 },
  { dur: 31, delay: -3.1, rev: false, s: 1.06, tint: "#1a1030", step: 0.7 },
  { dur: 25, delay: -16.8, rev: true, s: 0.94, tint: "#22143b", step: 0.58 },
  { dur: 34, delay: -27.5, rev: true, s: 1, tint: "var(--person)", step: 0.66 },
];

/** A gull: wings beat on their own cycle, body rides a shallow glide. */
function Bird({ s = 1, beat, phase }: { s?: number; beat: number; phase: number }) {
  return (
    <g transform={`scale(${s})`}>
      <g className="anim" style={{ animation: `glide-y ${beat * 3.4}s ease-in-out ${phase}s infinite` }}>
        <path
          className="anim wing"
          d="M-1 0 C -6 -4, -11 -6, -15 -3 C -11 -1, -5 0, -1 1 Z"
          fill="#2f2140"
          style={{ animation: `flap-a ${beat}s ease-in-out ${phase}s infinite` }}
        />
        <path
          className="anim wing wing--r"
          d="M1 0 C 6 -4, 11 -6, 15 -3 C 11 -1, 5 0, 1 1 Z"
          fill="#2f2140"
          style={{ animation: `flap-b ${beat}s ease-in-out ${phase}s infinite` }}
        />
        <ellipse cx="0" cy="0" rx="3.4" ry="1.7" fill="#2f2140" />
        <path d="M3 -0.4 l3.4 0.6 l-3.4 0.8 Z" fill="#2f2140" />
      </g>
    </g>
  );
}

const BIRDS = [
  { y: 2320, s: 1, dur: 26, delay: -6.2, beat: 0.52, phase: -0.11 },
  { y: 2352, s: 0.8, dur: 26, delay: -4.1, beat: 0.58, phase: -0.34 },
  { y: 2298, s: 0.7, dur: 26, delay: -8.7, beat: 0.47, phase: -0.62 },
  { y: 2610, s: 0.9, dur: 34, delay: -19.3, beat: 0.55, phase: -0.2 },
  { y: 2648, s: 0.65, dur: 34, delay: -16.8, beat: 0.62, phase: -0.48 },
];

/** Someone flying a kite, string running up into the sky band. */
function KiteFlyer({ x }: { x: number }) {
  const y = GROUND - 2;
  return (
    <g>
      <path
        d={`M ${x + 6} ${y - PERSON_H * 0.75} C ${x + 70} ${y - 300}, ${x + 40} ${y - 560}, ${x + 96} ${y - 690}`}
        fill="none"
        stroke="#ffe9b0"
        strokeWidth="1.2"
        opacity="0.45"
      />
      <g transform={`translate(${x + 96} ${y - 700})`}>
        <g className="anim" style={{ animation: "kite-sway 7s ease-in-out -2.3s infinite" }}>
          <path d="M0 -20 L17 0 L0 26 L-17 0 Z" fill="#ff5a8a" />
          <path d="M0 -20 L0 26 M-17 0 L17 0" stroke="#2b1020" strokeWidth="1.4" />
          <path d="M0 26 q 10 14 -4 24 q 12 10 0 22" fill="none" stroke="#ffd166" strokeWidth="2" />
        </g>
      </g>
      <g transform={`translate(${x} ${y})`} fill="var(--person)">
        <circle cx="0" cy={-PERSON_H} r="5.2" />
        <rect x="-4.4" y={-PERSON_H + 6} width="9" height="15" rx="3.5" />
        {/* arm raised to the string */}
        <path d={`M4 ${-PERSON_H + 9} L12 ${-PERSON_H + 1}`} stroke="var(--person)" strokeWidth="3.4" strokeLinecap="round" />
        <rect x="-4.4" y={-PERSON_H + 20} width="3.6" height="15" rx="1.6" />
        <rect x="0.8" y={-PERSON_H + 20} width="3.6" height="15" rx="1.6" />
      </g>
    </g>
  );
}

/** Dog walker: handler, lead, and a small dog trotting ahead. */
function DogWalker({ tint }: { tint: string }) {
  return (
    <g fill={tint}>
      <circle cx="0" cy={-PERSON_H} r="5.2" />
      <rect x="-4.4" y={-PERSON_H + 6} width="9" height="15" rx="3.5" />
      <rect
        className="anim leg"
        x="-4.2"
        y={-PERSON_H + 20}
        width="3.6"
        height="15"
        rx="1.6"
        style={{ animation: "leg-a 0.68s ease-in-out -0.2s infinite" }}
      />
      <rect
        className="anim leg"
        x="0.8"
        y={-PERSON_H + 20}
        width="3.6"
        height="15"
        rx="1.6"
        style={{ animation: "leg-b 0.68s ease-in-out -0.2s infinite" }}
      />
      {/* lead */}
      <path
        d={`M6 ${-PERSON_H + 11} Q 20 ${-PERSON_H + 20}, 30 -13`}
        fill="none"
        stroke={tint}
        strokeWidth="1.4"
        opacity="0.8"
      />
      {/* dog: 0.55 m at the shoulder */}
      <g transform="translate(30 0)">
        <rect x="-9" y="-13" width="19" height="7" rx="3.4" />
        <circle cx="12" cy="-15" r="4.2" />
        <path d="M13 -19 l4 -5 l1 5 Z" />
        <path d="M-9 -12 q -6 -3 -7 -9" fill="none" stroke={tint} strokeWidth="2" strokeLinecap="round" />
        <rect x="-7" y="-7" width="2.6" height="7" rx="1.2" />
        <rect x="6" y="-7" width="2.6" height="7" rx="1.2" />
      </g>
    </g>
  );
}

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

      {[95, 385, 675, 965, 1155].map((x, i) => {
        const postH = 8 * M; // 8 m lamp standard
        const head = GROUND - postH;
        return (
          <g key={i}>
            {/* a lamp glows around itself and pools on the pavement — no hard
                cone sheet, which read as a solid triangle rather than light */}
            <ellipse cx={x + 26} cy={head - 10} rx="70" ry="54" fill="url(#lampglow)" />
            <ellipse cx={x + 22} cy={GROUND - 2} rx="104" ry="15" fill="url(#lamppool)" />
            <ellipse cx={x + 22} cy={GROUND - 2} rx="52" ry="8" fill="url(#lamppool)" />
            <rect x={x} y={head} width="5" height={postH} fill="#3a2a52" />
            <path d={`M ${x + 2} ${head} q 0 -14 22 -14`} fill="none" stroke="#3a2a52" strokeWidth="5" />
            <ellipse cx={x + 26} cy={head - 12} rx="13" ry="6" fill="#ffe9b0" />
          </g>
        );
      })}

      {PEOPLE.map((p, i) => (
        <g key={i} transform={`translate(0 ${GROUND - 2})`}>
          <g
            className="anim"
            style={{
              animation: `${p.rev ? "walk-x-rev" : "walk-x"} ${p.dur}s linear ${p.delay}s infinite`,
            }}
          >
            <g transform={`scale(${p.rev ? -p.s : p.s} ${p.s})`}>
              <Walker tint={p.tint} step={p.step} phase={-(i * 0.37)} />
            </g>
          </g>
        </g>
      ))}

      {/* birds riding the air above the rooftops */}
      {BIRDS.map((b, i) => (
        <g key={`bird${i}`} transform={`translate(0 ${b.y})`}>
          <g className="anim" style={{ animation: `fly-x ${b.dur}s linear ${b.delay}s infinite` }}>
            <g transform={`translate(${i * 46} 0)`}>
              <Bird s={b.s} beat={b.beat} phase={b.phase} />
            </g>
          </g>
        </g>
      ))}

      <KiteFlyer x={252} />

      {/* dog walker, crossing slower than the rest */}
      <g transform={`translate(0 ${GROUND - 2})`}>
        <g className="anim" style={{ animation: "walk-x 38s linear -12.4s infinite" }}>
          <DogWalker tint="#241640" />
        </g>
      </g>

      {CARS.map((c, i) => (
        <g key={i} transform={`translate(0 ${c.lane})`}>
          <g
            className="anim"
            style={{ animation: `${c.rev ? "car-x-rev" : "car-x"} ${c.dur}s linear ${c.delay}s infinite` }}
          >
            <g transform={c.rev ? "scale(-1,1) translate(-112 0)" : undefined}>
              <Vehicle kind={c.kind} body={c.body} roof={c.roof} />
            </g>
          </g>
        </g>
      ))}
    </>
  );
}

/* ------------------------------------------------------------ underground -- */

const TRAIN_TOP = 4138;
const TRAIN_H = 3.6 * M; // 72

const CAR_L = 18 * M; // 18 m carriage
const FAR_RAIL = 4128; // the line behind — same stock, just further away
const FAR_TOP = FAR_RAIL - TRAIN_H - 20;

/** One 18 m x 3.6 m carriage, wheels riding the rail. */
function Carriage({ x, seed, top = TRAIN_TOP, railY = RAIL_Y }: { x: number; seed: number; top?: number; railY?: number }) {
  const bottom = top + TRAIN_H;
  const wheelY = railY - 5;
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y={top} width={CAR_L} height={TRAIN_H} rx="10" fill="url(#train)" />
      <rect x="5" y={top - 5} width={CAR_L - 10} height="10" rx="5" fill="var(--train-roof)" />
      <rect x="0" y={bottom - 9} width={CAR_L} height="9" rx="3" fill="#2a1020" opacity="0.85" />
      {Array.from({ length: 6 }, (_, i) => {
        const wx = 26 + i * 52;
        return (
          <g key={i}>
            <rect x={wx} y={top + 14} width="30" height="26" rx="4" fill="var(--train-window)" opacity="0.92" />
            {(i + seed) % 3 !== 0 && (
              <g fill="#5a3520" opacity="0.75">
                <circle cx={wx + 15} cy={top + 25} r="5" />
                <path d={`M${wx + 7} ${top + 40} a8 9 0 0 1 16 0 Z`} />
              </g>
            )}
          </g>
        );
      })}
      <rect x={CAR_L - 26} y={top + 12} width="16" height={TRAIN_H - 26} rx="3" fill="#3a1526" opacity="0.6" />
      {[34, CAR_L - 66].map((bx, i) => (
        <g key={i}>
          <rect x={bx} y={bottom} width="32" height="8" rx="3" fill="#1a0d14" />
          <circle cx={bx + 8} cy={wheelY} r="9" fill="#241119" />
          <circle cx={bx + 8} cy={wheelY} r="3.4" fill="#4a2b38" />
          <circle cx={bx + 24} cy={wheelY} r="9" fill="#241119" />
          <circle cx={bx + 24} cy={wheelY} r="3.4" fill="#4a2b38" />
        </g>
      ))}
    </g>
  );
}

/** Cab car; shared by both services so the two trains are identical stock. */
function Locomotive({ top = TRAIN_TOP, railY = RAIL_Y }: { top?: number; railY?: number }) {
  return (
    <g transform={`translate(${(CAR_L + 8) * 3} 0)`}>
          <path
            d={`M0 ${top} L${CAR_L - 90} ${top} C ${CAR_L - 44} ${top}, ${CAR_L - 8} ${top + 20}, ${CAR_L} ${top + 40}
                L${CAR_L} ${top + TRAIN_H - 8} A 8 8 0 0 1 ${CAR_L - 8} ${top + TRAIN_H} L0 ${top + TRAIN_H} Z`}
            fill="url(#train)"
          />
          <rect x="5" y={top - 5} width={CAR_L - 96} height="10" rx="5" fill="var(--train-roof)" />
          <path
            d={`M${CAR_L - 86} ${top + 12} C ${CAR_L - 48} ${top + 14}, ${CAR_L - 20} ${top + 26}, ${CAR_L - 10} ${top + 42} L${CAR_L - 86} ${top + 42} Z`}
            fill="var(--train-window)"
            opacity="0.95"
          />
          <circle cx={CAR_L - 52} cy={top + 30} r="5" fill="#5a3520" opacity="0.8" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={26 + i * 52} y={top + 14} width="30" height="26" rx="4" fill="var(--train-window)" opacity="0.9" />
          ))}
          <circle cx={CAR_L - 14} cy={top + 56} r="5" fill="#fff6cf" />
          <path
            d={`M${CAR_L - 10} ${top + 46} L${CAR_L + 200} ${top + 20} L${CAR_L + 200} ${top + 92} L${CAR_L - 10} ${top + 66} Z`}
            fill="url(#headlamp)"
          />
          <rect x="0" y={top + TRAIN_H - 9} width={CAR_L - 8} height="9" rx="3" fill="#2a1020" opacity="0.85" />
          {[34, CAR_L - 76].map((bx, i) => (
            <g key={i}>
              <rect x={bx} y={top + TRAIN_H} width="34" height="8" rx="3" fill="#1a0d14" />
              <circle cx={bx + 9} cy={railY - 5} r="10" fill="#241119" />
              <circle cx={bx + 9} cy={railY - 5} r="3.6" fill="#4a2b38" />
              <circle cx={bx + 25} cy={railY - 5} r="10" fill="#241119" />
              <circle cx={bx + 25} cy={railY - 5} r="3.6" fill="#4a2b38" />
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

      <rect x="-40" y="3958" width="1280" height="602" fill="#31201a" opacity="0.6" />
      <rect x="20" y="3996" width="1160" height="564" fill="var(--tunnel-deep)" />
      {/* flat station ceiling: a straight slab with a service duct under it */}
      <rect x="20" y="3982" width="1160" height="16" fill="#3d2820" />
      <rect x="20" y="4004" width="1160" height="6" fill="#241812" opacity="0.8" />
      <rect x="150" y="4016" width="900" height="9" rx="4" fill="#33241b" opacity="0.7" />

      {Array.from({ length: 6 }, (_, i) => {
        const x = 130 + i * 190;
        return (
          <g key={i}>
            <circle cx={x} cy="3922" r="22" fill="url(#tunnel-lamp)" />
            <rect x={x - 11} y="3918" width="22" height="5" rx="2.5" fill="#ffdca0" opacity="0.85" />
          </g>
        );
      })}

      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={70 + i * 170} y="3990" width="9" height="570" fill="#3d2820" opacity="0.45" />
      ))}

      <rect x="0" y={RAIL_Y - 6} width={W} height="150" fill="#1c120e" />
      {Array.from({ length: 26 }, (_, i) => (
        <rect key={i} x={i * 47} y={RAIL_Y + 12} width="30" height="8" rx="2" fill="#33241b" />
      ))}
      <rect x="0" y={RAIL_Y + 4} width={W} height="5" fill="var(--rail)" />

      {/* far track, set higher and smaller so it reads as the line behind */}
      <rect x="0" y={FAR_RAIL - 4} width={W} height="46" fill="#1a110d" />
      {Array.from({ length: 30 }, (_, i) => (
        <rect key={`fs${i}`} x={i * 41} y={FAR_RAIL + 8} width="24" height="6" rx="2" fill="#2c1f17" />
      ))}
      <rect x="0" y={FAR_RAIL + 2} width={W} height="4" fill="var(--rail)" opacity="0.65" />

      {/* maintenance level below the ballast: walkway, cable trays, drain */}
      <rect x="0" y="4392" width={W} height="26" fill="#241812" />
      <rect x="0" y="4392" width={W} height="4" fill="#3d2820" opacity="0.8" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={`ct${i}`} x={20 + i * 132} y="4432" width="108" height="11" rx="4" fill="#33241b" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={`cw${i}`} x={26 + i * 132} y="4435" width="96" height="3" rx="1.5" fill="#5c452c" opacity="0.7" />
      ))}
      <rect x="-20" y="4468" width={W + 40} height="20" rx="10" fill="#2b2019" />
      <rect x="-20" y="4472" width={W + 40} height="5" rx="2.5" fill="#42301f" opacity="0.7" />
      {[150, 470, 790, 1090].map((x, i) => (
        <rect key={`fl${i}`} x={x} y="4462" width="14" height="32" rx="3" fill="#3d2820" />
      ))}
      <rect x="0" y="4512" width={W} height="10" fill="#1c130c" />
      {/* seepage collecting in the drain */}
      <ellipse cx="640" cy="4518" rx="180" ry="5" fill="#3e6b76" opacity="0.4" />

      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(0 ${3930 + i * 46})`}>
          <g className="anim" style={{ animation: `speed-line ${2.1 + i * 0.13}s linear ${-(1.3 + i * 0.41)}s infinite` }}>
            <rect x="0" y="0" width="200" height="4" rx="2" fill="#ff8fae" />
          </g>
        </g>
      ))}

      {/* opposite service on the far line — same stock, same size, mirrored */}
      <g opacity="0.86" className="anim" style={{ animation: "train-x-rev 7.4s linear -2.2s infinite" }}>
        <g transform={`translate(${(CAR_L + 8) * 4} 0) scale(-1 1)`}>
          <Carriage x={0} seed={4} top={FAR_TOP} railY={FAR_RAIL} />
          <Carriage x={CAR_L + 8} seed={5} top={FAR_TOP} railY={FAR_RAIL} />
          <Carriage x={(CAR_L + 8) * 2} seed={6} top={FAR_TOP} railY={FAR_RAIL} />
          <Locomotive top={FAR_TOP} railY={FAR_RAIL} />
        </g>
      </g>

      <g className="anim" style={{ animation: "train-x 5.2s linear -3.1s infinite" }}>
        <Carriage x={0} seed={2} />
        <Carriage x={CAR_L + 8} seed={1} />
        <Carriage x={(CAR_L + 8) * 2} seed={3} />
        <Locomotive />
      </g>
    </>
  );
}

/* --------------------------------------------------------------- fossils -- */

/**
 * Cartoon dig-site T. rex, in the style of the reference: every bone a clean,
 * separated shape — individual vertebrae beads down the spine and tail, an
 * open-jawed skull with a big orbit, a hooked ribcage, one tiny forelimb and
 * one heavy hind leg. Reads instantly, no anatomical clutter.
 */
function TRex() {
  const LINE = "var(--bone-line)";
  const fill = "url(#bone)";

  const tail = Array.from({ length: 17 }, (_, i) =>
    bezPoint([-14, 4], [-130, 30], [-268, 62], [-408, 74], i / 16),
  );
  const back = Array.from({ length: 7 }, (_, i) =>
    bezPoint([-6, 0], [30, -12], [72, -22], [112, -32], i / 6),
  );
  const neck = Array.from({ length: 7 }, (_, i) =>
    bezPoint([112, -32], [146, -52], [156, -92], [172, -126], i / 6),
  );

  /** A run of separated vertebra beads along a sampled curve. */
  const beads = (pts: [number, number][], size: (t: number) => number, key: string) =>
    pts.map((pt, i) => {
      const t = i / (pts.length - 1);
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      const ang = (Math.atan2(next[1] - prev[1], next[0] - prev[0]) * 180) / Math.PI;
      const r = size(t);
      return (
        <g key={`${key}${i}`} transform={`translate(${pt[0]} ${pt[1]}) rotate(${ang})`}>
          <rect
            x={-r * 0.62}
            y={-r}
            width={r * 1.24}
            height={r * 2}
            rx={r * 0.55}
            fill={fill}
            stroke={LINE}
            strokeWidth="1.6"
          />
        </g>
      );
    });

  return (
    <g>
      {/* tail — beads shrinking to a point */}
      {beads(tail as [number, number][], (t) => 13 - t * 8.5, "tl")}

      {/* ribcage: hooked ribs hanging off the back, clearly separated */}
      {back.slice(0, 6).map((p, i) => {
        const len = 96 - Math.abs(i - 2.2) * 11;
        return (
          <path
            key={`rb${i}`}
            d={`M ${p[0]} ${p[1] + 12} C ${p[0] - 26} ${p[1] + len * 0.55}, ${p[0] - 20} ${p[1] + len}, ${p[0] + 12} ${p[1] + len + 10}`}
            fill="none"
            stroke="url(#bone-stroke)"
            strokeWidth="7"
            strokeLinecap="round"
          />
        );
      })}

      {/* pelvis */}
      <path
        d="M-34 -22 C 6 -34, 46 -28, 54 -6 C 58 8, 40 20, 14 20 L-26 16 C -44 10, -46 -14, -34 -22 Z"
        fill={fill}
        stroke={LINE}
        strokeWidth="1.8"
      />

      {/* hind leg: femur, shin, foot with toes */}
      <Bone x1={22} y1={6} x2={54} y2={92} w={26} w2={17} />
      <Bone x1={54} y1={92} x2={16} y2={168} w={17} w2={12} />
      <Bone x1={16} y1={168} x2={44} y2={210} w={12} w2={9} />
      {[
        [96, 222],
        [86, 236],
        [58, 240],
      ].map(([tx, ty], i) => (
        <Bone key={i} x1={44} y1={210} x2={tx} y2={ty} w={9} w2={5} />
      ))}

      {/* tiny forelimb */}
      <Bone x1={104} y1={-6} x2={126} y2={34} w={9} w2={7} />
      <Bone x1={126} y1={34} x2={150} y2={52} w={7} w2={5} />
      {[0, 1].map((i) => (
        <Bone key={i} x1={150} y1={52} x2={168 + i * 6} y2={60 + i * 9} w={4} w2={2.5} />
      ))}

      {/* back + neck beads */}
      {beads(back as [number, number][], () => 14, "bk")}
      {beads(neck as [number, number][], (t) => 12 - t * 2, "nk")}

      {/* age: hairline cracks across the larger bones */}
      <g stroke="#4a3a22" strokeWidth="1.2" opacity="0.55" fill="none" strokeLinecap="round">
        <path d="M30 20 l7 9 l-4 8" />
        <path d="M40 108 l8 6" />
        <path d="M22 176 l-7 8" />
        <path d="M-70 26 l6 7" />
        <path d="M-186 48 l7 5" />
        <path d="M120 -22 l5 8" />
      </g>

      {/* pieces that have worked loose over time */}
      <g opacity="0.9">
        <g transform="translate(-268 96) rotate(28)">
          <rect x="-9" y="-5" width="18" height="10" rx="4.5" fill="url(#bone)" stroke="var(--bone-line)" strokeWidth="1.4" />
        </g>
        <g transform="translate(-140 112) rotate(-14)">
          <rect x="-7" y="-4" width="14" height="8" rx="3.6" fill="url(#bone)" stroke="var(--bone-line)" strokeWidth="1.4" />
        </g>
      </g>

      {/* skull, jaw open, facing right */}
      <g transform="translate(178 -140) rotate(-12)">
        {/* cranium + upper jaw */}
        <path
          d="M0 6 C -4 -14, 12 -30, 40 -34 C 74 -39, 104 -30, 116 -16
             L124 -4 L112 6 L96 8 L34 16 C 12 18, 2 16, 0 6 Z"
          fill={fill}
          stroke={LINE}
          strokeWidth="2"
        />
        {/* big cartoon orbit */}
        <circle cx="72" cy="-14" r="13" fill="#2f2013" opacity="0.85" />
        {/* nostril */}
        <ellipse cx="106" cy="-12" rx="6" ry="4" fill="#2f2013" opacity="0.7" />
        {/* upper teeth */}
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M ${34 + i * 13} 15 L ${37 + i * 13} 27 L ${40 + i * 13} 15 Z`} fill={fill} stroke={LINE} strokeWidth="1" />
        ))}
        {/* lower jaw, dropped open */}
        <g transform="translate(2 30) rotate(9)">
          <path
            d="M4 0 C 26 8, 82 6, 112 -2 L120 6 L112 16 C 80 24, 24 24, 6 16 C -2 12, -2 3, 4 0 Z"
            fill={fill}
            stroke={LINE}
            strokeWidth="1.8"
          />
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M ${28 + i * 14} 2 L ${31 + i * 14} -10 L ${34 + i * 14} 2 Z`} fill={fill} stroke={LINE} strokeWidth="1" />
          ))}
        </g>
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
      {/* the specimen sits alone in its own bed, nothing crossing it */}
      <g transform="translate(620 5230) scale(0.55)">
        <TRex />
      </g>

      {/* ammonite with septa */}
      <g transform="translate(0 0)">
        <path d={spiral(150, 4676, 2.5, 4, 34, 80)} fill="none" stroke="url(#bone-stroke)" strokeWidth="7" strokeLinecap="round" />
        {Array.from({ length: 11 }, (_, i) => {
          const t = 0.3 + (i / 11) * 0.7;
          const a = t * 2.5 * Math.PI * 2;
          const ro = 4 + (34 - 4) * t;
          const ri = ro * 0.58;
          return (
            <line
              key={i}
              x1={150 + ri * Math.cos(a)}
              y1={4676 + ri * Math.sin(a)}
              x2={150 + ro * Math.cos(a)}
              y2={4676 + ro * Math.sin(a)}
              stroke="var(--bone-shade)"
              strokeWidth="2"
              opacity="0.75"
            />
          );
        })}
      </g>

      {/* bivalves */}
      {[
        [340, 4690, 0.62],
        [880, 4700, 0.5],
        [1010, 5810, 0.62],
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
      <g transform="translate(300 5840) rotate(-12) scale(0.6)" stroke="var(--bone-shade)" fill="none" strokeLinecap="round">
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
      <g transform="translate(880 5620) rotate(6) scale(0.55)" stroke="var(--bone-line)" fill="none" strokeLinecap="round">
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

      {/* a limestone cave pocket — stalactites above, stalagmites below,
          with a shallow pool catching the drip */}
      <g>
        <path
          d="M760 4880 C 810 4826, 940 4812, 1030 4844 C 1104 4870, 1126 4936, 1096 4990
             C 1060 5054, 900 5070, 820 5030 C 762 5000, 736 4930, 760 4880 Z"
          fill="#120c08"
        />
        <path
          d="M760 4880 C 810 4826, 940 4812, 1030 4844 C 1104 4870, 1126 4936, 1096 4990
             C 1060 5054, 900 5070, 820 5030 C 762 5000, 736 4930, 760 4880 Z"
          fill="none"
          stroke="#6a4f31"
          strokeWidth="4"
          opacity="0.5"
        />
        {/* stalactites */}
        {[
          [806, 4866, 34],
          [846, 4850, 52],
          [890, 4842, 38],
          [934, 4844, 60],
          [980, 4854, 30],
          [1024, 4872, 44],
        ].map(([x, y, len], i) => (
          <path key={`sc${i}`} d={`M${x - 7} ${y} L${x + 7} ${y} L${x} ${y + len} Z`} fill="#8a6c47" opacity="0.9" />
        ))}
        {/* stalagmites */}
        {[
          [828, 5030, 30],
          [880, 5044, 44],
          [938, 5048, 34],
          [1000, 5034, 26],
        ].map(([x, y, len], i) => (
          <path key={`sg${i}`} d={`M${x - 8} ${y} L${x + 8} ${y} L${x} ${y - len} Z`} fill="#8a6c47" opacity="0.85" />
        ))}
        {/* pool */}
        <ellipse cx="920" cy="5040" rx="96" ry="11" fill="#3e6b76" opacity="0.55" />
        <ellipse cx="900" cy="5038" rx="34" ry="4" fill="#9fd8e4" opacity="0.35" />
        {/* a drip falling from the longest stalactite */}
        <circle
          cx="934"
          cy="4906"
          r="3"
          fill="#9fd8e4"
          className="anim"
          style={{ animation: "drip 4.6s ease-in -1.7s infinite" }}
        />
      </g>

      {/* trilobite */}
      <g transform="translate(240 5640) scale(0.62)" stroke="var(--bone-line)" fill="url(#bone)" strokeWidth="2.2">
        <path d="M-58 0 C -50 -34, 52 -34, 64 0 C 52 34, -50 34, -58 0 Z" />
        <path d="M-58 0 C -52 -20, -20 -22, -14 0 C -20 22, -52 20, -58 0 Z" />
        <line x1="-14" y1="-26" x2="-14" y2="26" />
        {[2, 16, 30, 44].map((x, i) => (
          <line key={i} x1={x} y1="-27" x2={x} y2="27" opacity="0.8" />
        ))}
      </g>

      {/* burrow trace fossils */}
      {[
        "M120 4820 C 160 4850, 120 4890, 170 4926",
        "M1040 5000 C 1080 5030, 1040 5068, 1086 5100",
      ].map((d, i) => (
        <path key={`bu${i}`} d={d} fill="none" stroke="#6a4f31" strokeWidth="7" opacity="0.35" strokeLinecap="round" />
      ))}

      {/* footprint trail */}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={`fp${i}`}
          d={`M${640 + i * 92} ${5880 + (i % 2) * 24} l14 -22 l14 22 l-8 5 l-6 -9 l-6 9 Z`}
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

/** Convection cells and flares on the crust of the core. No bubbles. */
function Core() {
  // granulation across the visible crown of the dome
  const cells = Array.from({ length: 34 }, (_, i) => {
    const t = (i / 34) * Math.PI * 2;
    const spread = -Math.PI / 2 + Math.sin(t * 1.7 + i) * 1.15;
    const depth = DOME_R - 30 - ((i * 37) % 190);
    return {
      x: 600 + Math.cos(spread) * depth,
      y: DOME_CY + Math.sin(spread) * depth,
      r: 16 + ((i * 11) % 5) * 7,
      dur: 4 + ((i * 5) % 7) * 0.8,
      delay: -((i * 3.3) % 13),
    };
  });

  return (
    <>
      <ellipse cx="600" cy={DOME_CY - DOME_R} rx="780" ry="400" fill="url(#core-halo)" />

      <circle cx="600" cy={DOME_CY} r={DOME_R} fill="url(#dome)" />

      <g clipPath="url(#dome-clip)">
        {cells.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={c.r}
            fill="#fff2b8"
            opacity="0.28"
            className="anim"
            style={{ animation: `granule ${c.dur}s ease-in-out ${c.delay}s infinite` }}
          />
        ))}
        {/* darker crust patches, the way spots sit on a hot surface */}
        <ellipse cx="470" cy={DOME_CY - DOME_R + 120} rx="70" ry="34" fill="#a12508" opacity="0.35" />
        <ellipse cx="806" cy={DOME_CY - DOME_R + 190} rx="54" ry="26" fill="#a12508" opacity="0.3" />
      </g>

      <circle cx="600" cy={DOME_CY} r={DOME_R - 60} fill="url(#dome-inner)" opacity="0.8" />
    </>
  );
}

/* ------------------------------------------------------------------ strip -- */

export default function Descent() {
  const hostRef = useRef<HTMLDivElement>(null);
  const live = useLiveBands(hostRef);

  // one band per scene, in the order they are drawn
  const scenes = [Space, Sky, Surface, Underground, Fossils, Core];

  return (
    <div ref={hostRef}>
    <svg
      className="block h-auto w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A cross-section descending from Mars, Jupiter and Saturn, through a sky of birds, clouds and airliners, down to a lit city street where people walk dogs and fly kites, then underground past a subway train, a limestone cave and a half-buried dinosaur skeleton, ending at the Earth's molten core."
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

        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfd6ea" />
          <stop offset="60%" stopColor="#8f9ab8" />
          <stop offset="100%" stopColor="#3e4560" />
        </linearGradient>
        <radialGradient id="canopy" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#d9fbff" />
          <stop offset="100%" stopColor="#4aa7bf" />
        </radialGradient>
        <radialGradient id="beam" cx="50%" cy="0%" r="90%">
          <stop offset="0%" stopColor="#8ffff0" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#8ffff0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="neb-a" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="neb-b" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
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
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffd8a8" stopOpacity="0.15" />
          <stop offset="35%" stopColor="#ffe8c0" stopOpacity="0.8" />
          <stop offset="65%" stopColor="#e2c39a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffd8a8" stopOpacity="0.15" />
        </linearGradient>
        <clipPath id="saturn-clip">
          <circle cx="285" cy="1215" r="60" />
        </clipPath>
        <clipPath id="jupiter-clip">
          <circle cx="975" cy="500" r="86" />
        </clipPath>
        <clipPath id="mars-clip">
          <circle cx="185" cy="330" r="34" />
        </clipPath>

        <linearGradient id="flare" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ffb03c" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff6fb" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#ffd9ec" stopOpacity="0.78" />
          <stop offset="100%" stopColor="#d99ec0" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="shoot-trail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.9" />
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

        <radialGradient id="lampglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe9b0" stopOpacity="0.42" />
          <stop offset="45%" stopColor="#ffd98a" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-40%" y="-80%" width="180%" height="260%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
        <radialGradient id="lamppool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe4a0" stopOpacity="0.26" />
          <stop offset="55%" stopColor="#ffe4a0" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffe4a0" stopOpacity="0" />
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
          <stop offset="0%" stopColor="#cfc3a4" />
          <stop offset="55%" stopColor="#a9986f" />
          <stop offset="100%" stopColor="#7d6c48" />
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
        <clipPath id="dome-clip">
          <circle cx="600" cy={DOME_CY} r={DOME_R} />
        </clipPath>
        <radialGradient id="dome-inner" cx="50%" cy="12%" r="45%">
          <stop offset="0%" stopColor="#fffbe8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffb257" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill="url(#strip)" />

      {scenes.map((Scene, i) => (
        <g key={BANDS[i].id} className={cn("band", live.has(i) && "band--live")}>
          <Scene />
        </g>
      ))}
    </svg>
    </div>
  );
}
