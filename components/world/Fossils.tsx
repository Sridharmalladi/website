"use client";

import Frame from "./Frame";

function spiralPath(cx: number, cy: number, turns: number, r0: number, r1: number, steps: number) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * Math.PI * 2;
    const r = r0 + (r1 - r0) * t;
    d += `${i === 0 ? "M" : "L"} ${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)} `;
  }
  return d;
}

/** Radial chamber walls inside the ammonite shell. */
function chambers(cx: number, cy: number, turns: number, r0: number, r1: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = 0.25 + (i / count) * 0.75;
    const a = t * turns * Math.PI * 2;
    const rOuter = r0 + (r1 - r0) * t;
    const rInner = rOuter * 0.55;
    return (
      <line
        key={i}
        x1={cx + rInner * Math.cos(a)}
        y1={cy + rInner * Math.sin(a)}
        x2={cx + rOuter * Math.cos(a)}
        y2={cy + rOuter * Math.sin(a)}
        stroke="var(--fossil-mark)"
        strokeWidth="2"
      />
    );
  });
}

const DUST = Array.from({ length: 22 }, (_, i) => ({
  x: (i * 149 + 40) % 1600,
  y: 80 + ((i * 71) % 760),
  r: 1.2 + ((i * 13) % 4) * 0.5,
  delay: (i * 0.8) % 9,
  dur: 15 + (i % 6) * 3,
}));

const GRAIN = Array.from({ length: 90 }, (_, i) => ({
  x: (i * 211 + 17) % 1600,
  y: (i * 137 + 41) % 900,
  r: 0.8 + ((i * 7) % 3) * 0.4,
}));

/** Zone 6: rock strata and what's pressed into them. */
export default function Fossils() {
  return (
    <section className="px-4 py-10 sm:py-16">
      <Frame label="Fossil Record" glow="radial-gradient(circle, #c99b5e, transparent 70%)">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="fs-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#180f09" />
            <stop offset="16%" stopColor="var(--fossil-1)" />
            <stop offset="55%" stopColor="var(--fossil-2)" />
            <stop offset="100%" stopColor="var(--fossil-3)" />
          </linearGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#fs-bg)" />

        {/* strata seams, slightly wavy so they don't read as UI rules */}
        {[190, 340, 500, 660, 800].map((y, i) => (
          <path
            key={i}
            d={`M -40 ${y} Q 400 ${y - 16 + i * 5}, 800 ${y + 6} T 1640 ${y - 8}`}
            fill="none"
            stroke="var(--fossil-mark)"
            strokeWidth={i % 2 ? 2 : 4}
            opacity={i % 2 ? 0.35 : 0.55}
          />
        ))}

        {/* mineral grain */}
        {GRAIN.map((g, i) => (
          <circle key={i} cx={g.x} cy={g.y} r={g.r} fill="var(--fossil-mark)" opacity="0.18" />
        ))}

        {/* ammonite */}
        <g transform="translate(0 0)">
          <path
            d={spiralPath(300, 300, 2.6, 6, 78, 90)}
            fill="none"
            stroke="var(--fossil-mark)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {chambers(300, 300, 2.6, 6, 78, 14)}
        </g>

        {/* fish skeleton */}
        <g
          transform="translate(660 560) rotate(-8)"
          stroke="var(--fossil-mark)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M-40 0 C -20 -26, 30 -30, 210 0 C 30 30, -20 26, -40 0 Z" opacity="0.55" />
          <line x1="-30" y1="0" x2="212" y2="0" />
          {Array.from({ length: 9 }, (_, i) => {
            const x = -14 + i * 25;
            const span = 22 - Math.abs(i - 4) * 2.4;
            return (
              <g key={i}>
                <line x1={x} y1="0" x2={x - 10} y2={-span} />
                <line x1={x} y1="0" x2={x - 10} y2={span} />
              </g>
            );
          })}
          {/* skull */}
          <path d="M-40 0 C -34 -20, -8 -22, 2 -12 L2 12 C -8 22, -34 20, -40 0 Z" />
          <circle cx="-24" cy="-4" r="5" />
          {/* tail */}
          <path d="M212 0 L252 -28 L244 0 L252 28 Z" />
        </g>

        {/* leaf imprint */}
        <g
          transform="translate(1240 380) rotate(14)"
          stroke="var(--fossil-mark)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M0 96 C -46 22, -20 -70, 0 -104 C 20 -70, 46 22, 0 96 Z" />
          <line x1="0" y1="-96" x2="0" y2="92" />
          {[-70, -46, -20, 8, 38].map((y, i) => (
            <g key={i} opacity="0.8">
              <line x1="0" y1={y} x2={-20 - i * 3} y2={y + 22} />
              <line x1="0" y1={y} x2={20 + i * 3} y2={y + 22} />
            </g>
          ))}
        </g>

        {/* trilobite */}
        <g transform="translate(1010 760)" stroke="var(--fossil-mark)" fill="none" strokeWidth="3.5">
          <path d="M-56 0 C -50 -30, 50 -30, 62 0 C 50 30, -50 30, -56 0 Z" />
          <line x1="-40" y1="-22" x2="-40" y2="22" opacity="0.7" />
          {[-22, -6, 10, 26, 42].map((x, i) => (
            <line key={i} x1={x} y1="-24" x2={x} y2="24" opacity="0.6" />
          ))}
        </g>

        {/* suspended dust */}
        {DUST.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="#f6e6cc"
            opacity="0.3"
            className="anim"
            style={{ animation: `dust-drift ${d.dur}s ease-in-out ${-d.delay}s infinite` }}
          />
        ))}
      </svg>
      </Frame>
    </section>
  );
}
