"use client";

import Frame, { FRAME_W } from "./Frame";

import type { ReactNode } from "react";
import About from "@/components/About";

interface Building {
  x: number;
  w: number;
  h: number;
  rows: number;
  cols: number;
  /** decorative rooftop: antenna mast or a stepped setback */
  cap?: "mast" | "step";
}

const GROUND = 762;

const FAR: Building[] = [
  { x: -30, w: 150, h: 300, rows: 8, cols: 3 },
  { x: 150, w: 110, h: 220, rows: 6, cols: 2 },
  { x: 290, w: 170, h: 360, rows: 9, cols: 3, cap: "mast" },
  { x: 490, w: 120, h: 250, rows: 7, cols: 2 },
  { x: 640, w: 190, h: 410, rows: 10, cols: 3, cap: "step" },
  { x: 860, w: 130, h: 270, rows: 7, cols: 2 },
  { x: 1020, w: 175, h: 350, rows: 9, cols: 3 },
  { x: 1225, w: 120, h: 240, rows: 6, cols: 2, cap: "mast" },
  { x: 1375, w: 165, h: 330, rows: 8, cols: 3 },
  { x: 1560, w: 120, h: 260, rows: 7, cols: 2 },
];

const NEAR: Building[] = [
  { x: -50, w: 200, h: 235, rows: 6, cols: 4 },
  { x: 180, w: 150, h: 180, rows: 4, cols: 3 },
  { x: 360, w: 240, h: 300, rows: 7, cols: 5, cap: "step" },
  { x: 630, w: 165, h: 205, rows: 5, cols: 3 },
  { x: 825, w: 225, h: 275, rows: 6, cols: 4, cap: "mast" },
  { x: 1080, w: 175, h: 195, rows: 5, cols: 3 },
  { x: 1285, w: 215, h: 285, rows: 7, cols: 4 },
  { x: 1530, w: 155, h: 215, rows: 5, cols: 3 },
];

function windows(b: Building, seed: number, dim: boolean): ReactNode[] {
  const pad = 11;
  const gx = (b.w - pad * 2) / b.cols;
  const gy = (b.h - pad * 2) / b.rows;
  const out: ReactNode[] = [];
  for (let r = 0; r < b.rows; r++) {
    for (let c = 0; c < b.cols; c++) {
      const i = r * b.cols + c;
      if ((i * 7 + seed * 5) % 4 === 0) continue; // unlit apartment
      const delay = ((i * 13 + seed * 19) % 90) / 10;
      out.push(
        <rect
          key={i}
          x={b.x + pad + c * gx}
          y={GROUND - b.h + pad + r * gy}
          width={Math.max(3, gx * 0.5)}
          height={Math.max(3, gy * 0.46)}
          rx="1"
          fill="var(--city-window)"
          opacity={dim ? 0.42 : 0.85}
          className="anim"
          style={{ animation: `twinkle ${7 + (i % 5)}s ease-in-out ${delay}s infinite` }}
        />,
      );
    }
  }
  return out;
}

function cap(b: Building, stroke: string): ReactNode {
  const top = GROUND - b.h;
  if (b.cap === "mast") {
    return (
      <g>
        <rect x={b.x + b.w / 2 - 2} y={top - 46} width="4" height="46" fill={stroke} />
        <circle cx={b.x + b.w / 2} cy={top - 50} r="4" fill="var(--accent)" opacity="0.9" />
      </g>
    );
  }
  if (b.cap === "step") {
    return (
      <rect x={b.x + b.w * 0.22} y={top - 34} width={b.w * 0.56} height="34" fill={stroke} />
    );
  }
  return null;
}

const CARS = [
  { lane: 786, dur: 3.6, delay: 0, rev: false, body: "#ff5a8a", roof: "#3a1030" },
  { lane: 786, dur: 4.6, delay: -2.1, rev: false, body: "#ffd166", roof: "#4a3510" },
  { lane: 816, dur: 4, delay: -1.2, rev: true, body: "#7c5cff", roof: "#241a3a" },
  { lane: 816, dur: 5.2, delay: -3.4, rev: true, body: "#59e0d0", roof: "#0f3b38" },
];

const PEOPLE = [60, 175, 300, 470, 620, 900, 1050, 1230, 1400, 1530].map((x, i) => ({
  x,
  h: 26 + (i % 3) * 5,
  tint: i % 2 === 0 ? "var(--person)" : "#22143b",
}));

/** Zone 3: street level — towers, traffic, people. Holds the About content. */
export default function Surface() {
  return (
    <section id="surface" className="px-4 py-10 sm:py-16">
      <Frame label="Surface" glow="radial-gradient(circle, #ff2e93, transparent 70%)">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="sf-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sky-5)" />
            <stop offset="28%" stopColor="var(--sky-4)" />
            <stop offset="60%" stopColor="#6b3a6a" />
            <stop offset="84%" stopColor="#2b1a33" />
            <stop offset="100%" stopColor="var(--soil)" />
          </linearGradient>
          <linearGradient id="sf-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a2f75" />
            <stop offset="100%" stopColor="var(--city-far)" />
          </linearGradient>
          <linearGradient id="sf-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a1a47" />
            <stop offset="100%" stopColor="var(--city-near)" />
          </linearGradient>
          <linearGradient id="sf-haze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff9dc4" stopOpacity="0" />
            <stop offset="100%" stopColor="#ff9dc4" stopOpacity="0.16" />
          </linearGradient>
          <radialGradient id="sf-lamp" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--city-window)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--city-window)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#sf-bg)" />

        {/* distant skyline */}
        <g opacity="0.62">
          {FAR.map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={GROUND - b.h} width={b.w} height={b.h} fill="url(#sf-far)" />
              {cap(b, "#4a2f75")}
              {windows(b, i + 1, true)}
            </g>
          ))}
        </g>

        {/* atmospheric haze separating the two rows */}
        <rect x="0" y="430" width="1600" height="332" fill="url(#sf-haze)" />

        {/* near skyline */}
        {NEAR.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={GROUND - b.h} width={b.w} height={b.h} fill="url(#sf-near)" />
            {cap(b, "#2a1a47")}
            {windows(b, i + 20, false)}
          </g>
        ))}

        {/* street */}
        <rect x="0" y={GROUND} width="1600" height="138" fill="var(--road)" />
        <rect x="0" y={GROUND} width="1600" height="3" fill="#ffffff" opacity="0.08" />
        {Array.from({ length: 20 }, (_, i) => (
          <rect key={i} x={i * 84 + 10} y={GROUND + 46} width="44" height="3" fill="#ffe6a8" opacity="0.28" />
        ))}

        {/* street lamps */}
        {[120, 520, 920, 1320].map((x, i) => (
          <g key={i}>
            <rect x={x} y={GROUND - 78} width="4" height="78" fill="#3a2a52" />
            <rect x={x - 16} y={GROUND - 82} width="36" height="5" rx="2" fill="#3a2a52" />
            <circle cx={x + 2} cy={GROUND - 74} r="42" fill="url(#sf-lamp)" />
          </g>
        ))}

        {/* pedestrians */}
        {PEOPLE.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${GROUND - p.h})`} fill={p.tint}>
            <circle cx="5" cy="0" r="4.6" />
            <path d={`M0 5 L10 5 L9 ${p.h - 8} L6 ${p.h - 8} L5 14 L4 ${p.h - 8} L1 ${p.h - 8} Z`} />
          </g>
        ))}

        {/* traffic */}
        {CARS.map((c, i) => (
          <g
            key={i}
            transform={`translate(0 ${c.lane})`}
            className="anim"
            style={{
              animation: `${c.rev ? "car-drive-rev" : "car-drive"} ${c.dur}s linear ${c.delay}s infinite`,
            }}
          >
            <g transform={c.rev ? "scale(-1,1) translate(-44 0)" : undefined}>
              <rect x="0" y="6" width="46" height="13" rx="5" fill={c.body} />
              <path d="M11 6 L15 -2 L31 -2 L36 6 Z" fill={c.roof} />
              <circle cx="12" cy="20" r="4.2" fill="#0d0716" />
              <circle cx="35" cy="20" r="4.2" fill="#0d0716" />
              <circle cx="45" cy="12" r="2.6" fill="#fff4c4" />
            </g>
          </g>
        ))}
      </svg>
      </Frame>

      <div className={`mx-auto mt-12 ${FRAME_W} text-center`}>
        <About />
      </div>
    </section>
  );
}
