"use client";

import type { ReactNode } from "react";

/**
 * Flat-illustration animated skyline behind the hero — dusk sky, sun, drifting
 * clouds, a plane, twinkling windows. All deterministic (no Math.random) so
 * server and client markup match; motion is pure CSS, frozen under
 * prefers-reduced-motion via .cityscape-anim rules in globals.css.
 */

interface Building {
  x: number;
  w: number;
  h: number;
  color: string;
  rows: number;
  cols: number;
}

const FAR: Building[] = [
  { x: -40, w: 160, h: 260, color: "var(--city-building-far)", rows: 5, cols: 3 },
  { x: 140, w: 120, h: 210, color: "var(--city-building-far)", rows: 4, cols: 2 },
  { x: 300, w: 190, h: 300, color: "var(--city-building-far)", rows: 6, cols: 3 },
  { x: 520, w: 140, h: 230, color: "var(--city-building-far)", rows: 5, cols: 2 },
  { x: 700, w: 220, h: 320, color: "var(--city-building-far)", rows: 6, cols: 4 },
  { x: 960, w: 150, h: 240, color: "var(--city-building-far)", rows: 5, cols: 2 },
  { x: 1140, w: 200, h: 290, color: "var(--city-building-far)", rows: 6, cols: 3 },
  { x: 1380, w: 170, h: 250, color: "var(--city-building-far)", rows: 5, cols: 2 },
  { x: 1580, w: 130, h: 210, color: "var(--city-building-far)", rows: 4, cols: 2 },
];

const NEAR: Building[] = [
  { x: -60, w: 220, h: 180, color: "var(--city-building-near)", rows: 4, cols: 4 },
  { x: 180, w: 160, h: 140, color: "var(--city-building-near)", rows: 3, cols: 3 },
  { x: 420, w: 260, h: 220, color: "var(--city-building-near)", rows: 5, cols: 5 },
  { x: 760, w: 180, h: 160, color: "var(--city-building-near)", rows: 4, cols: 3 },
  { x: 1000, w: 240, h: 200, color: "var(--city-building-near)", rows: 4, cols: 4 },
  { x: 1300, w: 200, h: 170, color: "var(--city-building-near)", rows: 4, cols: 3 },
  { x: 1560, w: 160, h: 150, color: "var(--city-building-near)", rows: 3, cols: 3 },
];

const GROUND = 780;

function Windows({ b, seed }: { b: Building; seed: number }) {
  const pad = 14;
  const gx = (b.w - pad * 2) / b.cols;
  const gy = (b.h - pad * 2) / b.rows;
  const cells: ReactNode[] = [];
  for (let r = 0; r < b.rows; r++) {
    for (let c = 0; c < b.cols; c++) {
      const i = r * b.cols + c;
      // deterministic pseudo-pattern: skip some windows, stagger the rest
      const lit = (i * 7 + seed * 3) % 5 !== 0;
      if (!lit) continue;
      const delay = ((i * 11 + seed * 17) % 60) / 10; // 0..6s
      cells.push(
        <rect
          key={i}
          x={b.x + pad + c * gx}
          y={GROUND - b.h + pad + r * gy}
          width={gx * 0.55}
          height={gy * 0.55}
          fill="var(--city-window)"
          className="cityscape-anim"
          style={{ animation: `twinkle 5s ease-in-out ${delay}s infinite` }}
        />,
      );
    }
  }
  return <>{cells}</>;
}

export default function Cityscape() {
  return (
    <svg
      className="cityscape absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--city-sky-top)" />
          <stop offset="55%" stopColor="var(--city-sky-mid)" />
          <stop offset="100%" stopColor="var(--city-sky-bot)" />
        </linearGradient>
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--city-sun-glow)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--city-sun-glow)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#sky)" />

      {/* sun */}
      <g className="cityscape-anim" style={{ animation: "sun-pulse 6s ease-in-out infinite" }}>
        <circle cx="1180" cy="260" r="180" fill="url(#sun-glow)" />
        <circle cx="1180" cy="260" r="86" fill="var(--city-sun)" />
      </g>

      {/* clouds */}
      <g opacity="0.8">
        {[
          { cx: 220, cy: 150, s: 1, dur: 90 },
          { cx: 640, cy: 90, s: 0.7, dur: 120 },
          { cx: 980, cy: 170, s: 0.9, dur: 100 },
          { cx: 1420, cy: 110, s: 0.6, dur: 140 },
        ].map((c, i) => (
          <g
            key={i}
            className="cityscape-anim"
            style={{
              animation: `cloud-drift ${c.dur}s linear infinite`,
              animationDelay: `${-i * 20}s`,
            }}
          >
            <g transform={`translate(${c.cx} ${c.cy}) scale(${c.s})`} fill="var(--city-cloud)">
              <ellipse cx="0" cy="0" rx="70" ry="22" />
              <ellipse cx="40" cy="-10" rx="46" ry="18" />
              <ellipse cx="-40" cy="8" rx="40" ry="16" />
            </g>
          </g>
        ))}
      </g>

      {/* plane */}
      <g
        className="cityscape-anim"
        style={{ animation: "plane-fly 46s linear infinite" }}
      >
        <g fill="var(--city-sky-bot)" opacity="0.85">
          <path d="M0 0 l34 4 l14 6 l-14 3 l-30 8 l-8 -2 l10 -8 l-10 -6 l8 -2 Z" />
        </g>
      </g>

      {/* far skyline */}
      <g>
        {FAR.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={GROUND - b.h} width={b.w} height={b.h} fill={b.color} opacity={0.75} />
            <Windows b={b} seed={i + 1} />
          </g>
        ))}
      </g>

      {/* near skyline */}
      <g>
        {NEAR.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={GROUND - b.h} width={b.w} height={b.h} fill={b.color} />
            <Windows b={b} seed={i + 20} />
          </g>
        ))}
      </g>

      {/* ground strip so the skyline reads as sitting on something */}
      <rect x="0" y={GROUND} width="1600" height="120" fill="var(--city-building-near)" />
    </svg>
  );
}
