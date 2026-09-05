"use client";

const BEAMS = Array.from({ length: 9 }, (_, i) => 60 + i * 190);
const LIGHTS = Array.from({ length: 9 }, (_, i) => ({ x: 60 + i * 190, delay: (i * 0.6) % 3 }));

/** Zone 4: the subway. Pure visual beat — a fast train, no text. */
export default function Underground() {
  return (
    <section
      className="relative min-h-[70vh] overflow-hidden"
      style={{ background: "linear-gradient(to bottom, var(--soil) 0%, var(--tunnel-bg) 40%, var(--tunnel-bg) 100%)" }}
    >
      <span className="zone-label">SUBWAY</span>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {/* support beams */}
        {BEAMS.map((x, i) => (
          <rect key={i} x={x} y="0" width="22" height="700" fill="var(--tunnel-line)" opacity="0.6" />
        ))}

        {/* ceiling lights */}
        {LIGHTS.map((l, i) => (
          <circle
            key={i}
            cx={l.x + 11}
            cy="60"
            r="9"
            fill="var(--train-window)"
            className="cityscape-anim"
            style={{ animation: `twinkle 2.6s ease-in-out ${l.delay}s infinite` }}
          />
        ))}

        {/* rail */}
        <rect x="0" y="520" width="1600" height="8" fill="var(--tunnel-line)" />
        <rect x="0" y="560" width="1600" height="8" fill="var(--tunnel-line)" />

        {/* speed lines */}
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x="0"
            y={380 + i * 14}
            width="140"
            height="4"
            fill="var(--train-body)"
            className="cityscape-anim"
            style={{ animation: `speed-line 2.4s linear ${-i * 0.3}s infinite` }}
          />
        ))}

        {/* the train */}
        <g className="cityscape-anim" style={{ animation: "train-dash 3.6s linear infinite" }}>
          <rect x="0" y="330" width="320" height="130" rx="14" fill="var(--train-body)" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={22 + i * 74} y="352" width="52" height="46" rx="6" fill="var(--train-window)" />
          ))}
          <rect x="0" y="452" width="320" height="14" fill="var(--tunnel-line)" />
        </g>
      </svg>
    </section>
  );
}
