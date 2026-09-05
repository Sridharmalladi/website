"use client";

const WIRES = [140, 300, 460, 610];

const INSECTS = [
  { x: 220, wireY: 140 },
  { x: 700, wireY: 140 },
  { x: 1180, wireY: 300 },
  { x: 420, wireY: 460 },
  { x: 980, wireY: 460 },
  { x: 1380, wireY: 610 },
];

function wirePath(y: number) {
  return `M -40 ${y} C 300 ${y - 40}, 500 ${y + 40}, 800 ${y} S 1300 ${y - 40}, 1640 ${y}`;
}

/** Zone 5: the power grid. Pure visual beat — cables and insects, no text. */
export default function Cables() {
  return (
    <section
      className="relative min-h-[70vh] overflow-hidden"
      style={{ background: "var(--cable-bg)" }}
    >
      <span className="zone-label">POWER GRID</span>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {/* junction poles */}
        {[80, 780, 1520].map((x, i) => (
          <rect key={i} x={x} y="0" width="10" height="700" fill="var(--cable-wire)" opacity="0.7" />
        ))}

        {/* cables */}
        {WIRES.map((y, i) => (
          <path key={i} d={wirePath(y)} fill="none" stroke="var(--cable-wire)" strokeWidth="4" />
        ))}

        {/* insects crawling the wires */}
        {INSECTS.map((b, i) => (
          <g
            key={i}
            transform={`translate(${b.x} ${b.wireY - 6})`}
            className="cityscape-anim"
            style={{ animation: `insect-crawl ${6 + (i % 3) * 2}s ease-in-out ${-i * 1.1}s infinite` }}
          >
            <g fill="var(--insect)">
              <ellipse cx="0" cy="0" rx="6" ry="3.4" />
              <line x1="-4" y1="2" x2="-8" y2="6" stroke="var(--insect)" strokeWidth="1.2" />
              <line x1="0" y1="3" x2="0" y2="7" stroke="var(--insect)" strokeWidth="1.2" />
              <line x1="4" y1="2" x2="8" y2="6" stroke="var(--insect)" strokeWidth="1.2" />
            </g>
          </g>
        ))}
      </svg>
    </section>
  );
}
