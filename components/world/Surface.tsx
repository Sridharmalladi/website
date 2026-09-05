"use client";

import type { ReactNode } from "react";
import About from "@/components/About";

interface Building {
  x: number;
  w: number;
  h: number;
  rows: number;
  cols: number;
}

const GROUND = 1000;

const BUILDINGS: Building[] = [
  { x: -40, w: 180, h: 420, rows: 8, cols: 3 },
  { x: 160, w: 130, h: 300, rows: 6, cols: 2 },
  { x: 320, w: 220, h: 520, rows: 10, cols: 4 },
  { x: 580, w: 150, h: 360, rows: 7, cols: 2 },
  { x: 770, w: 260, h: 600, rows: 11, cols: 4 },
  { x: 1080, w: 170, h: 340, rows: 7, cols: 3 },
  { x: 1300, w: 220, h: 480, rows: 9, cols: 3 },
  { x: 1560, w: 140, h: 300, rows: 6, cols: 2 },
];

function windows(b: Building, seed: number): ReactNode[] {
  const pad = 12;
  const gx = (b.w - pad * 2) / b.cols;
  const gy = (b.h - pad * 2) / b.rows;
  const out: ReactNode[] = [];
  for (let r = 0; r < b.rows; r++) {
    for (let c = 0; c < b.cols; c++) {
      const i = r * b.cols + c;
      if ((i * 7 + seed * 5) % 4 === 0) continue; // dark windows
      const delay = ((i * 13 + seed * 19) % 80) / 10;
      out.push(
        <rect
          key={i}
          x={b.x + pad + c * gx}
          y={GROUND - b.h + pad + r * gy}
          width={gx * 0.55}
          height={gy * 0.55}
          fill="var(--city-window)"
          className="cityscape-anim"
          style={{ animation: `twinkle 6s ease-in-out ${delay}s infinite` }}
        />,
      );
    }
  }
  return out;
}

const CARS = [
  { y: GROUND + 26, dur: 3.4, delay: 0, rev: false, color: "var(--car)" },
  { y: GROUND + 26, dur: 4.2, delay: -2, rev: false, color: "var(--accent)" },
  { y: GROUND + 48, dur: 3.8, delay: -1, rev: true, color: "var(--accent-2)" },
  { y: GROUND + 48, dur: 5, delay: -3.4, rev: true, color: "var(--car)" },
];

const PEOPLE = [40, 210, 400, 640, 900, 1140, 1360, 1500].map((x, i) => ({
  x,
  h: 30 + (i % 3) * 4,
}));

/** Zone 3: skyscrapers, traffic, people. Holds the About content. */
export default function Surface() {
  return (
    <section
      id="surface"
      className="relative min-h-[150vh] overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, var(--city-sky-bot) 0%, #241833 55%, var(--soil) 100%)",
      }}
    >
      <span className="zone-label">SURFACE</span>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 1200" preserveAspectRatio="xMidYMax slice" aria-hidden>
        {BUILDINGS.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={GROUND - b.h} width={b.w} height={b.h} fill="var(--city-building-far)" opacity={0.9} />
            {windows(b, i + 1)}
          </g>
        ))}

        {/* road */}
        <rect x="0" y={GROUND} width="1600" height="90" fill="var(--road)" />
        <rect x="0" y={GROUND + 44} width="1600" height="3" fill="var(--city-window)" opacity="0.35" />

        {/* people on the sidewalk */}
        {PEOPLE.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${GROUND - p.h})`} fill="var(--person)">
            <circle cx="6" cy="0" r="5" />
            <rect x="1" y="4" width="10" height={p.h - 6} rx="3" />
          </g>
        ))}

        {/* traffic — fast, frequent */}
        {CARS.map((c, i) => (
          <g
            key={i}
            transform={`translate(0 ${c.y})`}
            className="cityscape-anim"
            style={{
              animation: `${c.rev ? "car-drive-rev" : "car-drive"} ${c.dur}s linear ${c.delay}s infinite`,
            }}
          >
            <rect x="0" y="0" width="34" height="14" rx="4" fill={c.color} />
            <circle cx="7" cy="14" r="3.4" fill="var(--tunnel-line)" />
            <circle cx="27" cy="14" r="3.4" fill="var(--tunnel-line)" />
          </g>
        ))}
      </svg>

      <div className="relative z-10 flex min-h-[100vh] flex-col justify-center px-6 py-24 sm:px-10">
        <About />
      </div>
    </section>
  );
}
