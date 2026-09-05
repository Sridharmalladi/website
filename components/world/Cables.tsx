"use client";

const POLES = [120, 800, 1480];
const WIRES = [250, 400, 545, 690];

const INSECTS = [
  { x: 300, y: 250, dur: 7 },
  { x: 900, y: 250, dur: 9 },
  { x: 560, y: 400, dur: 6 },
  { x: 1180, y: 545, dur: 8 },
  { x: 380, y: 690, dur: 10 },
  { x: 1020, y: 690, dur: 7.5 },
];

/** Catenary sag between the two poles that bracket this wire. */
function wirePath(y: number, sag: number) {
  return `M -80 ${y - 20} Q 400 ${y + sag}, 800 ${y} T 1680 ${y - 20}`;
}

function Insect() {
  return (
    <g>
      {/* legs */}
      <g stroke="var(--insect)" strokeWidth="1.4" strokeLinecap="round">
        <path d="M-5 2 L-10 8" />
        <path d="M-1 3 L-3 9" />
        <path d="M3 3 L5 9" />
        <path d="M6 1 L11 6" />
      </g>
      {/* antennae */}
      <g stroke="var(--insect)" strokeWidth="1.1" strokeLinecap="round">
        <path d="M7 -2 L13 -7" />
        <path d="M7 -1 L13 -3" />
      </g>
      {/* segmented body */}
      <ellipse cx="-5" cy="0" rx="5.4" ry="3.6" fill="var(--insect)" />
      <ellipse cx="1" cy="0" rx="3.4" ry="3" fill="var(--insect)" />
      <circle cx="6" cy="-0.5" r="2.6" fill="var(--insect)" />
      <ellipse cx="-5" cy="-1.4" rx="3.4" ry="1.2" fill="#4a3a2a" opacity="0.6" />
    </g>
  );
}

/** Zone 5: the power grid — cable runs and the things living on them. */
export default function Cables() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <span className="zone-label">Power Grid</span>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="cb-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--tunnel-deep)" />
            <stop offset="45%" stopColor="var(--cable-bg)" />
            <stop offset="100%" stopColor="#180f09" />
          </linearGradient>
          <linearGradient id="cb-pole" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2c2015" />
            <stop offset="45%" stopColor="#5c452c" />
            <stop offset="100%" stopColor="#241a11" />
          </linearGradient>
          <radialGradient id="cb-led" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7cffd8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7cffd8" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#cb-bg)" />

        {/* soil striations for texture */}
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x="0"
            y={70 + i * 96}
            width="1600"
            height="2"
            fill="#6a4f31"
            opacity="0.12"
          />
        ))}

        {/* poles with cross-arms and insulators */}
        {POLES.map((x, i) => (
          <g key={i}>
            <rect x={x} y="120" width="16" height="780" fill="url(#cb-pole)" />
            {WIRES.map((y, j) => (
              <g key={j}>
                <rect x={x - 26} y={y - 26} width="68" height="8" rx="3" fill="#4a3822" />
                <circle cx={x + 8} cy={y - 14} r="6" fill="#6b5233" />
              </g>
            ))}
          </g>
        ))}

        {/* cable runs — a thick core with a thin highlight */}
        {WIRES.map((y, i) => (
          <g key={i}>
            <path d={wirePath(y, 46 + i * 8)} fill="none" stroke="#2b2013" strokeWidth="9" />
            <path d={wirePath(y, 46 + i * 8)} fill="none" stroke="var(--cable-wire)" strokeWidth="4.5" />
            <path
              d={wirePath(y - 1.5, 46 + i * 8)}
              fill="none"
              stroke="#7d5f3c"
              strokeWidth="1.2"
              opacity="0.6"
            />
          </g>
        ))}

        {/* junction box with a blinking status LED */}
        <g transform="translate(770 760)">
          <rect x="0" y="0" width="92" height="70" rx="8" fill="#33261a" />
          <rect x="8" y="8" width="76" height="54" rx="5" fill="#241a11" />
          <circle cx="70" cy="22" r="16" fill="url(#cb-led)" />
          <circle
            cx="70"
            cy="22"
            r="5"
            fill="#7cffd8"
            className="anim"
            style={{ animation: "twinkle 2.2s ease-in-out infinite" }}
          />
          <rect x="18" y="40" width="44" height="5" rx="2" fill="#5c452c" />
        </g>

        {/* insects crawling the wires */}
        {INSECTS.map((b, i) => (
          <g
            key={i}
            transform={`translate(${b.x} ${b.y - 7})`}
            className="anim"
            style={{ animation: `insect-crawl ${b.dur}s ease-in-out ${-i * 1.3}s infinite` }}
          >
            <Insect />
          </g>
        ))}
      </svg>
    </section>
  );
}
