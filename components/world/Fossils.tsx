"use client";

function spiralPath(cx: number, cy: number, turns: number, r0: number, r1: number, steps: number) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const r = r0 + (r1 - r0) * t;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    d += `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d;
}

const DUST = Array.from({ length: 16 }, (_, i) => ({
  x: (i * 101 + 30) % 1600,
  y: 60 + ((i * 53) % 640),
  delay: (i * 0.9) % 8,
  dur: 14 + (i % 5) * 3,
}));

/** Zone 6: rock strata with fossils. Pure visual beat — no text. */
export default function Fossils() {
  return (
    <section
      className="relative min-h-[90vh] overflow-hidden"
      style={{ background: "linear-gradient(to bottom, var(--fossil-1), var(--fossil-2) 45%, var(--fossil-3))" }}
    >
      <span className="zone-label">FOSSIL RECORD</span>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {/* strata lines */}
        {[120, 260, 400, 540].map((y, i) => (
          <rect key={i} x="0" y={y} width="1600" height="6" fill="var(--fossil-mark)" opacity="0.5" />
        ))}

        {/* ammonite */}
        <path
          d={spiralPath(260, 220, 2.4, 4, 54, 48)}
          fill="none"
          stroke="var(--fossil-mark)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* fish skeleton */}
        <g stroke="var(--fossil-mark)" strokeWidth="3" fill="none" strokeLinecap="round" transform="translate(700 340)">
          <line x1="0" y1="0" x2="220" y2="0" />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <line x1={20 + i * 26} y1="0" x2={8 + i * 26} y2="-20" />
              <line x1={20 + i * 26} y1="0" x2={8 + i * 26} y2="20" />
            </g>
          ))}
          <path d="M220 0 L250 -20 L250 20 Z" fill="none" />
        </g>

        {/* leaf imprint */}
        <g stroke="var(--fossil-mark)" strokeWidth="3" fill="none" strokeLinecap="round" transform="translate(1150 460)">
          <path d="M0 60 C -30 10, -10 -50, 0 -70 C 10 -50, 30 10, 0 60 Z" />
          <line x1="0" y1="-60" x2="0" y2="55" />
          {[-40, -20, 0, 20].map((yy, i) => (
            <g key={i}>
              <line x1="0" y1={yy} x2={-16 - i * 2} y2={yy + 14} />
              <line x1="0" y1={yy} x2={16 + i * 2} y2={yy + 14} />
            </g>
          ))}
        </g>

        {/* drifting dust */}
        {DUST.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r="2"
            fill="var(--fossil-mark)"
            className="cityscape-anim"
            style={{ animation: `dust-drift ${d.dur}s ease-in-out ${-d.delay}s infinite` }}
          />
        ))}
      </svg>
    </section>
  );
}
