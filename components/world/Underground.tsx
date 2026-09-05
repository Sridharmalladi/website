"use client";

const RAIL_Y = 690;
const BODY_TOP = 470;
const BODY_H = 190;

/** One passenger carriage. `x` is its left edge inside the train group. */
function Carriage({ x, seed }: { x: number; seed: number }) {
  const W = 300;
  return (
    <g transform={`translate(${x} 0)`}>
      {/* body */}
      <rect x="0" y={BODY_TOP} width={W} height={BODY_H} rx="14" fill="url(#ug-body)" />
      {/* roof cap */}
      <rect x="6" y={BODY_TOP - 8} width={W - 12} height="16" rx="7" fill="var(--train-roof)" />
      {/* skirt */}
      <rect x="0" y={BODY_TOP + BODY_H - 22} width={W} height="22" rx="6" fill="#2a1020" opacity="0.85" />
      {/* windows with passenger silhouettes */}
      {Array.from({ length: 4 }, (_, i) => {
        const wx = 26 + i * 68;
        return (
          <g key={i}>
            <rect x={wx} y={BODY_TOP + 30} width="52" height="56" rx="7" fill="var(--train-window)" opacity="0.92" />
            {(i + seed) % 3 !== 0 && (
              <g fill="#5a3520" opacity="0.75">
                <circle cx={wx + 26} cy={BODY_TOP + 56} r="9" />
                <path d={`M${wx + 13} ${BODY_TOP + 86} a13 15 0 0 1 26 0 Z`} />
              </g>
            )}
          </g>
        );
      })}
      {/* doors */}
      <rect x={W - 42} y={BODY_TOP + 26} width="26" height={BODY_H - 58} rx="4" fill="#3a1526" opacity="0.7" />
      {/* bogies */}
      {[52, W - 92].map((bx, i) => (
        <g key={i}>
          <rect x={bx} y={BODY_TOP + BODY_H} width="40" height="14" rx="4" fill="#1a0d14" />
          <circle cx={bx + 10} cy={RAIL_Y - 8} r="15" fill="#241119" />
          <circle cx={bx + 10} cy={RAIL_Y - 8} r="6" fill="#4a2b38" />
          <circle cx={bx + 30} cy={RAIL_Y - 8} r="15" fill="#241119" />
          <circle cx={bx + 30} cy={RAIL_Y - 8} r="6" fill="#4a2b38" />
        </g>
      ))}
    </g>
  );
}

/** Zone 4: a real train running through an arched tunnel. Pure visual beat. */
export default function Underground() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <span className="zone-label">Subway</span>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="ug-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--soil)" />
            <stop offset="18%" stopColor="var(--tunnel-wall)" />
            <stop offset="100%" stopColor="var(--tunnel-deep)" />
          </linearGradient>
          <linearGradient id="ug-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff5f80" />
            <stop offset="45%" stopColor="var(--train-body)" />
            <stop offset="100%" stopColor="#8e1533" />
          </linearGradient>
          <radialGradient id="ug-lamp" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffdca0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffdca0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ug-head" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff3c0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff3c0" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#ug-bg)" />

        {/* tunnel arch: a lighter vault ring receding into darkness */}
        <path
          d="M -60 900 L -60 470 A 860 400 0 0 1 1660 470 L 1660 900 Z"
          fill="#31201a"
          opacity="0.55"
        />
        <path
          d="M 60 900 L 60 500 A 740 350 0 0 1 1540 500 L 1540 900 Z"
          fill="var(--tunnel-deep)"
        />

        {/* ceiling lights along the vault */}
        {Array.from({ length: 7 }, (_, i) => {
          const x = 150 + i * 220;
          return (
            <g key={i}>
              <circle cx={x} cy="300" r="70" fill="url(#ug-lamp)" />
              <rect x={x - 20} y="288" width="40" height="9" rx="4" fill="#ffdca0" opacity="0.9" />
            </g>
          );
        })}

        {/* tunnel ribs */}
        {Array.from({ length: 8 }, (_, i) => {
          const x = 90 + i * 200;
          return <rect key={i} x={x} y="330" width="10" height="570" fill="#3d2820" opacity="0.5" />;
        })}

        {/* track bed, rails and sleepers */}
        <rect x="0" y={RAIL_Y - 4} width="1600" height="150" fill="#1c120e" />
        {Array.from({ length: 32 }, (_, i) => (
          <rect key={i} x={i * 52} y={RAIL_Y + 14} width="34" height="9" rx="2" fill="#33241b" />
        ))}
        <rect x="0" y={RAIL_Y + 6} width="1600" height="5" fill="var(--rail)" />
        <rect x="0" y={RAIL_Y + 30} width="1600" height="5" fill="var(--rail)" opacity="0.7" />

        {/* speed streaks */}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="0"
            y={430 + i * 52}
            width="230"
            height="4"
            rx="2"
            fill="#ff8fae"
            className="anim"
            style={{ animation: `speed-line 2.2s linear ${-i * 0.28}s infinite` }}
          />
        ))}

        {/* the train */}
        <g className="anim" style={{ animation: "train-dash 4.4s linear infinite" }}>
          {/* rear carriages first so the locomotive overlaps them */}
          <Carriage x={0} seed={2} />
          <Carriage x={312} seed={1} />
          <Carriage x={624} seed={3} />

          {/* locomotive, nose to the right */}
          <g transform="translate(936 0)">
            <path
              d={`M0 ${BODY_TOP} L232 ${BODY_TOP} C 268 ${BODY_TOP}, 296 ${BODY_TOP + 34}, 300 ${BODY_TOP + 74}
                  L300 ${BODY_TOP + BODY_H - 14} A 14 14 0 0 1 286 ${BODY_TOP + BODY_H}
                  L0 ${BODY_TOP + BODY_H} Z`}
              fill="url(#ug-body)"
            />
            <rect x="6" y={BODY_TOP - 8} width="250" height="16" rx="7" fill="var(--train-roof)" />
            {/* windscreen */}
            <path
              d={`M232 ${BODY_TOP + 22} C 258 ${BODY_TOP + 24}, 276 ${BODY_TOP + 46}, 280 ${BODY_TOP + 76}
                  L232 ${BODY_TOP + 76} Z`}
              fill="var(--train-window)"
              opacity="0.95"
            />
            {/* driver */}
            <circle cx={252} cy={BODY_TOP + 58} r="9" fill="#5a3520" opacity="0.8" />
            {/* side windows */}
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={30 + i * 66}
                y={BODY_TOP + 30}
                width="50"
                height="54"
                rx="7"
                fill="var(--train-window)"
                opacity="0.9"
              />
            ))}
            {/* headlights + beam */}
            <circle cx={288} cy={BODY_TOP + 120} r="9" fill="#fff6cf" />
            <circle cx={288} cy={BODY_TOP + 150} r="6" fill="#fff6cf" opacity="0.8" />
            <path
              d={`M292 ${BODY_TOP + 104} L560 ${BODY_TOP + 60} L560 ${BODY_TOP + 186} L292 ${BODY_TOP + 138} Z`}
              fill="url(#ug-head)"
            />
            {/* skirt + bogies */}
            <rect x="0" y={BODY_TOP + BODY_H - 22} width="292" height="22" rx="6" fill="#2a1020" opacity="0.85" />
            {[54, 206].map((bx, i) => (
              <g key={i}>
                <rect x={bx} y={BODY_TOP + BODY_H} width="44" height="14" rx="4" fill="#1a0d14" />
                <circle cx={bx + 11} cy={RAIL_Y - 8} r="16" fill="#241119" />
                <circle cx={bx + 11} cy={RAIL_Y - 8} r="6" fill="#4a2b38" />
                <circle cx={bx + 33} cy={RAIL_Y - 8} r="16" fill="#241119" />
                <circle cx={bx + 33} cy={RAIL_Y - 8} r="6" fill="#4a2b38" />
              </g>
            ))}
          </g>
        </g>
      </svg>
    </section>
  );
}
