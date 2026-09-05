"use client";

import Frame from "./Frame";

/** A real airliner silhouette, nose pointing right. */
function Airliner({ tint }: { tint: string }) {
  return (
    <g fill={tint}>
      {/* contrail */}
      <rect x="-320" y="-2" width="224" height="4" rx="2" fill="url(#sk-trail)" />
      {/* wings */}
      <path d="M-40 -4 L-74 -42 L-56 -42 L-16 -4 Z" opacity="0.92" />
      <path d="M-40 4 L-74 42 L-56 42 L-16 4 Z" opacity="0.92" />
      {/* tail */}
      <path d="M-84 -6 L-102 -36 L-90 -36 L-74 -6 Z" />
      <path d="M-84 -2 L-106 -18 L-95 -18 L-78 -2 Z" opacity="0.85" />
      <path d="M-84 2 L-106 18 L-95 18 L-78 2 Z" opacity="0.85" />
      {/* fuselage */}
      <path d="M2 0 C -6 -8, -34 -10, -62 -10 L-86 -10 L-96 0 L-86 10 L-62 10 C -34 10, -6 8, 2 0 Z" />
      {/* engines */}
      <rect x="-56" y="-26" width="22" height="9" rx="4.5" opacity="0.9" />
      <rect x="-56" y="17" width="22" height="9" rx="4.5" opacity="0.9" />
    </g>
  );
}

const PLANES = [
  { y: 210, s: 1, dur: 9, delay: 0, tint: "#3b2340" },
  { y: 375, s: 0.62, dur: 13, delay: -4, tint: "#4a2f52" },
  { y: 120, s: 0.42, dur: 16, delay: -9, tint: "#56395e" },
];

const CLOUDS = [
  { x: 200, y: 560, s: 1.15, dur: 11, o: 0.9 },
  { x: 640, y: 470, s: 0.72, dur: 9, o: 0.75 },
  { x: 1010, y: 620, s: 1, dur: 13, o: 0.85 },
  { x: 1390, y: 500, s: 0.6, dur: 8, o: 0.7 },
  { x: 80, y: 700, s: 0.85, dur: 12, o: 0.8 },
  { x: 800, y: 760, s: 1.3, dur: 15, o: 0.65 },
];

/** Zone 2: entering the atmosphere — fixed sun, fast clouds, human-made planes. */
export default function Sky() {
  return (
    <section className="px-4 py-10 sm:py-16">
      <Frame label="Sky" glow="radial-gradient(circle, #d95f9b, transparent 70%)">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="sk-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sky-1)" />
            <stop offset="26%" stopColor="var(--sky-2)" />
            <stop offset="56%" stopColor="var(--sky-3)" />
            <stop offset="82%" stopColor="var(--sky-4)" />
            <stop offset="100%" stopColor="var(--sky-5)" />
          </linearGradient>
          <radialGradient id="sk-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--sun-glow)" stopOpacity="0.85" />
            <stop offset="45%" stopColor="var(--sun-glow)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--sun-glow)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sk-sun" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#fffdf2" />
            <stop offset="55%" stopColor="var(--sun)" />
            <stop offset="100%" stopColor="#ffc178" />
          </radialGradient>
          <linearGradient id="sk-cloud" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff6fb" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#ffd9ec" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d99ec0" stopOpacity="0.62" />
          </linearGradient>
          <linearGradient id="sk-trail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.34" />
          </linearGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#sk-bg)" />

        {/* sun — anchored, never animates */}
        <circle cx="1195" cy="655" r="300" fill="url(#sk-sun-glow)" />
        <circle cx="1195" cy="655" r="92" fill="url(#sk-sun)" />

        {/* airliners */}
        {PLANES.map((p, i) => (
          <g key={i} transform={`translate(0 ${p.y})`}>
            <g
              className="anim"
              style={{ animation: `fly-x ${p.dur}s linear ${p.delay}s infinite` }}
            >
              <g transform={`scale(${p.s})`}>
                <Airliner tint={p.tint} />
              </g>
            </g>
          </g>
        ))}

        {/* clouds — fast */}
        {CLOUDS.map((c, i) => (
          <g
            key={i}
            className="anim"
            style={{ animation: `cloud-drift ${c.dur}s linear ${-i * 1.6}s infinite` }}
          >
            <g
              transform={`translate(${c.x} ${c.y}) scale(${c.s})`}
              fill="url(#sk-cloud)"
              opacity={c.o}
            >
              <ellipse cx="0" cy="6" rx="96" ry="24" />
              <ellipse cx="-44" cy="0" rx="46" ry="24" />
              <ellipse cx="6" cy="-14" rx="56" ry="30" />
              <ellipse cx="54" cy="-2" rx="44" ry="22" />
            </g>
          </g>
        ))}
      </svg>
      </Frame>
    </section>
  );
}
