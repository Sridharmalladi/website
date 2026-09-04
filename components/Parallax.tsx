"use client";

import { useGame } from "@/store/useGame";
import { WORLD_W, WORLD_H } from "@/config/zones";

/**
 * Three flat vector layers behind the play field. `cameraX` is a small world-unit
 * offset (already damped by GameStage); each layer moves by its own factor.
 */
export default function Parallax({ cameraX }: { cameraX: number }) {
  const world = useGame((s) => s.world);
  const reduced = useGame((s) => s.reducedMotion);

  const shift = (f: number) =>
    reduced ? undefined : { transform: `translate3d(${-cameraX * f}px,0,0)` };

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, var(--sky-top), var(--sky-bot))",
        }}
      />

      {/* stars — only really visible in NIGHT */}
      {world === "NIGHT" && (
        <svg
          className="parallax-layer absolute inset-0"
          style={shift(0.04)}
          viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
          preserveAspectRatio="xMidYMid slice"
        >
          {STARS.map((s, i) => (
            <circle
              key={i}
              cx={s[0]}
              cy={s[1]}
              r={s[2]}
              fill="var(--celestial)"
              opacity={s[3]}
            />
          ))}
        </svg>
      )}

      {/* sun / moon */}
      <svg
        className="parallax-layer absolute inset-0"
        style={shift(0.06)}
        viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="celestial-glow" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="var(--celestial)" />
            <stop offset="100%" stopColor="var(--celestial-glow)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={995} cy={165} r={180} fill="url(#celestial-glow)" opacity={0.9} />
        <circle cx={995} cy={165} r={78} fill="var(--celestial)" />
      </svg>

      {/* far hills */}
      <svg
        className="parallax-layer absolute inset-x-0 bottom-0"
        style={{ ...shift(0.12), height: "62%" }}
        viewBox="0 0 1280 440"
        preserveAspectRatio="none"
      >
        <path
          d="M-40 440 L-40 250 C 180 150 320 260 520 210 C 760 150 900 300 1120 220 C 1220 185 1320 240 1320 240 L1320 440 Z"
          fill="var(--hill-far)"
        />
      </svg>

      {/* near hills */}
      <svg
        className="parallax-layer absolute inset-x-0 bottom-0"
        style={{ ...shift(0.22), height: "44%" }}
        viewBox="0 0 1280 320"
        preserveAspectRatio="none"
      >
        <path
          d="M-40 320 L-40 190 C 220 120 360 210 620 170 C 840 135 1000 230 1320 160 L1320 320 Z"
          fill="var(--hill-near)"
        />
      </svg>
    </div>
  );
}

// [cx, cy, r, opacity]
const STARS: [number, number, number, number][] = [
  [90, 70, 1.6, 0.9], [180, 140, 1.1, 0.6], [300, 60, 1.8, 0.85], [420, 120, 1, 0.5],
  [540, 80, 1.4, 0.75], [660, 40, 1.1, 0.6], [760, 150, 1.6, 0.8], [880, 90, 1, 0.5],
  [1040, 60, 1.5, 0.8], [1180, 130, 1.2, 0.65], [140, 260, 1.2, 0.55], [500, 300, 1, 0.45],
  [820, 280, 1.5, 0.7], [1120, 320, 1.1, 0.55], [260, 380, 1, 0.4], [980, 420, 1.3, 0.6],
];
