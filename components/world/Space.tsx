"use client";

import Hero from "@/components/Hero";

const STARS = Array.from({ length: 64 }, (_, i) => ({
  x: (i * 197 + 37) % 1600,
  y: (i * 113 + 23) % 900,
  r: 0.5 + ((i * 31) % 7) * 0.22,
  o: 0.35 + ((i * 17) % 6) * 0.11,
  delay: (i * 0.41) % 5,
}));

const SPARKLES = [
  { x: 210, y: 170, s: 1 },
  { x: 690, y: 110, s: 0.75 },
  { x: 1420, y: 640, s: 0.9 },
];

/** Zone 1: deep space — a ringed planet, a moon, stars. Holds the hero content. */
export default function Space() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="sp-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--space-top)" />
            <stop offset="100%" stopColor="var(--space-bot)" />
          </linearGradient>
          <radialGradient id="sp-neb-a" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.34" />
            <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sp-neb-b" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          {/* lit from upper-left, terminator falling to the lower-right */}
          <radialGradient id="sp-planet" cx="34%" cy="30%" r="78%">
            <stop offset="0%" stopColor="#ffb27a" />
            <stop offset="42%" stopColor="#d9663f" />
            <stop offset="78%" stopColor="#5c2036" />
            <stop offset="100%" stopColor="#1b0a1c" />
          </radialGradient>
          <radialGradient id="sp-moon" cx="36%" cy="32%" r="76%">
            <stop offset="0%" stopColor="#e8e6f2" />
            <stop offset="60%" stopColor="#9d99b4" />
            <stop offset="100%" stopColor="#332f45" />
          </radialGradient>
          <linearGradient id="sp-ring" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffd8a8" stopOpacity="0.15" />
            <stop offset="35%" stopColor="#ffd8a8" stopOpacity="0.75" />
            <stop offset="65%" stopColor="#e2a3ff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffd8a8" stopOpacity="0.15" />
          </linearGradient>
          <clipPath id="sp-planet-clip">
            <circle cx="1245" cy="290" r="118" />
          </clipPath>
        </defs>

        <rect width="1600" height="900" fill="url(#sp-bg)" />
        <ellipse cx="330" cy="240" rx="520" ry="330" fill="url(#sp-neb-a)" />
        <ellipse cx="1280" cy="700" rx="470" ry="300" fill="url(#sp-neb-b)" />

        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="var(--star)"
            opacity={s.o}
            className="anim"
            style={{ animation: `twinkle ${3 + (i % 4)}s ease-in-out ${s.delay}s infinite` }}
          />
        ))}

        {SPARKLES.map((s, i) => (
          <g
            key={i}
            transform={`translate(${s.x} ${s.y}) scale(${s.s})`}
            className="anim"
            style={{ animation: `twinkle ${4 + i}s ease-in-out ${i * 1.3}s infinite` }}
          >
            <path
              d="M0 -14 L2.2 -2.2 L14 0 L2.2 2.2 L0 14 L-2.2 2.2 L-14 0 L-2.2 -2.2 Z"
              fill="var(--star)"
              opacity="0.9"
            />
          </g>
        ))}

        {/* ringed planet — back half of the ring, then the sphere, then the front half */}
        <g transform="rotate(-17 1245 290)">
          <ellipse
            cx="1245"
            cy="290"
            rx="205"
            ry="52"
            fill="none"
            stroke="url(#sp-ring)"
            strokeWidth="17"
          />
        </g>
        <circle cx="1245" cy="290" r="118" fill="url(#sp-planet)" />
        <g clipPath="url(#sp-planet-clip)" opacity="0.28">
          <ellipse cx="1245" cy="238" rx="130" ry="15" fill="#2a0f22" />
          <ellipse cx="1245" cy="300" rx="130" ry="11" fill="#ffd0a0" opacity="0.5" />
          <ellipse cx="1245" cy="345" rx="130" ry="18" fill="#2a0f22" />
        </g>
        <g transform="rotate(-17 1245 290)">
          <path
            d="M 1040 290 A 205 52 0 0 0 1450 290"
            fill="none"
            stroke="url(#sp-ring)"
            strokeWidth="17"
          />
        </g>

        {/* moon */}
        <g>
          <circle cx="300" cy="655" r="62" fill="url(#sp-moon)" />
          <g fill="#5d5972" opacity="0.5">
            <circle cx="278" cy="632" r="13" />
            <circle cx="315" cy="668" r="9" />
            <circle cx="286" cy="686" r="6" />
            <circle cx="330" cy="626" r="5" />
          </g>
        </g>

        {/* far, tiny world for depth */}
        <circle cx="1480" cy="795" r="22" fill="#4a3f6b" opacity="0.8" />
      </svg>

      {/* scrim keeps the name readable over the starfield */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, var(--space-bot) 6%, rgba(5,4,12,0.55) 42%, transparent 78%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-24 sm:px-10">
        <Hero />
      </div>
    </section>
  );
}
