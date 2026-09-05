"use client";

import Frame, { FRAME_W } from "./Frame";

import Contact from "@/components/Contact";

const CRACKS = [
  "M1120 450 L1060 360 L1096 286 L1042 190",
  "M1120 450 L1204 340 L1168 258 L1220 160",
  "M1120 450 L1000 486 L946 428 L872 470",
  "M1120 450 L1248 510 L1300 448 L1392 496",
  "M1120 450 L1088 566 L1132 640 L1090 726",
  "M1120 450 L1236 620 L1206 700",
];

const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  x: 820 + ((i * 137) % 620),
  y: 640 + ((i * 53) % 200),
  r: 1.6 + ((i * 11) % 4) * 0.7,
  delay: (i * 0.7) % 9,
  dur: 7 + (i % 5) * 2,
}));

/** Zone 7: the Earth's core. The finale — holds the contact content. */
export default function Core() {
  return (
    <section className="px-4 py-10 sm:py-16">
      <Frame label="Core" glow="radial-gradient(circle, #ff5a1f, transparent 70%)">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="cr-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--fossil-3)" />
            <stop offset="22%" stopColor="#5c2410" />
            <stop offset="55%" stopColor="var(--core-outer)" />
            <stop offset="100%" stopColor="#170401" />
          </linearGradient>
          <radialGradient id="cr-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--core-mid)" stopOpacity="0.5" />
            <stop offset="55%" stopColor="var(--core-mid)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--core-mid)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cr-ball" cx="50%" cy="46%" r="58%">
            <stop offset="0%" stopColor="var(--core-center)" />
            <stop offset="38%" stopColor="var(--core-hot)" />
            <stop offset="72%" stopColor="var(--core-mid)" />
            <stop offset="100%" stopColor="#a12508" />
          </radialGradient>
          <linearGradient id="cr-crack" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--core-hot)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--core-mid)" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#cr-bg)" />

        {/* magma veins radiating out of the core */}
        {CRACKS.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="var(--core-mid)" strokeWidth="12" opacity="0.16" strokeLinecap="round" />
            <path d={d} fill="none" stroke="url(#cr-crack)" strokeWidth="4" strokeLinecap="round" />
          </g>
        ))}

        {/* the core itself */}
        <g className="anim" style={{ animation: "soft-pulse 6s ease-in-out infinite" }}>
          <circle cx="1120" cy="450" r="380" fill="url(#cr-halo)" />
          <circle cx="1120" cy="450" r="168" fill="url(#cr-ball)" />
          <ellipse cx="1074" cy="396" rx="62" ry="40" fill="#fff8dc" opacity="0.35" />
        </g>

        {/* rising embers */}
        {EMBERS.map((e, i) => (
          <circle
            key={i}
            cx={e.x}
            cy={e.y}
            r={e.r}
            fill="var(--core-hot)"
            className="anim"
            style={{ animation: `ember-rise ${e.dur}s linear ${-e.delay}s infinite` }}
          />
        ))}
      </svg>
      </Frame>

      <div className={`mx-auto mt-12 ${FRAME_W} text-center`}>
        <Contact />
      </div>
    </section>
  );
}
