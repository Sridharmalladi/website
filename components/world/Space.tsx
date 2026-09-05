"use client";

import Hero from "@/components/Hero";

const STARS = Array.from({ length: 40 }, (_, i) => ({
  x: (i * 173 + 40) % 1600,
  y: (i * 97 + 20) % 620,
  r: 0.6 + ((i * 37) % 5) * 0.35,
  delay: (i * 0.37) % 4,
}));

const SHIPS = [
  { y: 90, dur: 6, delay: 0, s: 1 },
  { y: 260, dur: 8, delay: -3, s: 0.7 },
  { y: 420, dur: 5.5, delay: -1.5, s: 0.85 },
  { y: 560, dur: 9, delay: -5, s: 0.6 },
];

const CLOUDS = [
  { cx: 240, cy: 900, s: 1, dur: 11 },
  { cx: 640, cy: 840, s: 0.7, dur: 9 },
  { cx: 1000, cy: 940, s: 0.9, dur: 13 },
  { cx: 1380, cy: 860, s: 0.6, dur: 8 },
  { cx: 60, cy: 1020, s: 0.8, dur: 12 },
];

/** Zone 1-2: deep space falling into a dusk sky. Holds the hero content. */
export default function Space() {
  return (
    <section
      className="relative min-h-[175vh] overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, var(--space-bg) 0%, var(--space-bg) 26%, var(--city-sky-top) 44%, var(--city-sky-mid) 66%, var(--city-sky-bot) 100%)",
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 1400" preserveAspectRatio="xMidYMin slice" aria-hidden>
        {/* stars */}
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="var(--star)"
            className="cityscape-anim"
            style={{ animation: `twinkle 3s ease-in-out ${s.delay}s infinite` }}
          />
        ))}

        {/* spaceships — fast, frequent */}
        {SHIPS.map((sh, i) => (
          <g key={i} transform={`translate(0 ${sh.y})`}>
            <g
              className="cityscape-anim"
              style={{ animation: `fly-x ${sh.dur}s linear ${sh.delay}s infinite` }}
              transform={`scale(${sh.s})`}
            >
              <path d="M0 0 l30 -6 l16 6 l-16 6 Z" fill="var(--ship)" />
              <circle cx="10" cy="0" r="3" fill="var(--accent)" />
            </g>
          </g>
        ))}

        {/* sun — fixed, never translates */}
        <g className="cityscape-anim" style={{ animation: "sun-pulse 6s ease-in-out infinite" }}>
          <circle cx="1180" cy="760" r="190" fill="var(--city-sun-glow)" opacity="0.5" />
          <circle cx="1180" cy="760" r="90" fill="var(--city-sun)" />
        </g>

        {/* clouds — fast, frequent */}
        {CLOUDS.map((c, i) => (
          <g
            key={i}
            className="cityscape-anim"
            style={{ animation: `cloud-drift ${c.dur}s linear ${-i * 1.4}s infinite` }}
          >
            <g transform={`translate(${c.cx} ${c.cy}) scale(${c.s})`} fill="var(--city-cloud)">
              <ellipse cx="0" cy="0" rx="70" ry="22" />
              <ellipse cx="40" cy="-10" rx="46" ry="18" />
              <ellipse cx="-40" cy="8" rx="40" ry="16" />
            </g>
          </g>
        ))}
      </svg>

      <div className="relative z-10 flex min-h-[100vh] flex-col justify-end px-6 pb-16 sm:px-10">
        <Hero />
      </div>

      <div className="font-pixel absolute inset-x-0 bottom-6 z-10 text-center text-[10px] tracking-[0.3em] opacity-50">
        SCROLL — SPACE TO CORE
      </div>
    </section>
  );
}
