"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MIDNIGHT, RESTING, RIDGES } from "./palette";
import { RIDGE_BOX, RIDGE_PATHS } from "./ridges";

/**
 * Midnight over a mountain range: night sky, stars, a low moon, three ridgelines
 * in silhouette with mist lying between them.
 *
 * Depth is built the way it works in air, not by adding detail — far ridges are
 * lighter and hazier, near ridges fall to black, and each layer drifts at its
 * own rate as you scroll. The mist bands sit BETWEEN the ridges, which is what
 * stops the range reading as flat cut-outs.
 *
 * Fixed and pointer-events: none, so it can't collide with the copy or add to
 * the page's height. Every layer is a motion.div whatever the motion preference
 * is — only the values change, never the element type.
 */

const STOPS = MIDNIGHT.map((s) => s.at);

function Ridge({ index, reduced }: { index: number; reduced: boolean }) {
  const { scrollYProgress } = useScroll();
  const drift = useTransform(scrollYProgress, STOPS, MIDNIGHT.map((s) => `${s.drift[index]}%`));
  const ridge = RIDGES[index];

  return (
    <motion.div
      className={`midnight__ridge midnight__ridge--${index + 1}`}
      style={{ y: reduced ? `${RESTING.drift[index]}%` : drift, opacity: ridge.opacity }}
    >
      <svg
        viewBox={`0 0 ${RIDGE_BOX.width} ${RIDGE_BOX.height}`}
        preserveAspectRatio="xMidYMax slice"
        aria-hidden
      >
        <defs>
          <linearGradient id={`ridge-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ridge.top} />
            <stop offset="58%" stopColor={ridge.base} />
            <stop offset="100%" stopColor={ridge.base} />
          </linearGradient>
        </defs>
        <path d={RIDGE_PATHS[index]} fill={`url(#ridge-${index})`} />
        {/* moonlight catching the crest — the closed bottom edge is off-frame */}
        <path
          d={RIDGE_PATHS[index]}
          fill="none"
          stroke={ridge.rim}
          strokeWidth={1.6}
          strokeOpacity={ridge.rimOpacity}
        />
      </svg>
    </motion.div>
  );
}

export default function MidnightRange() {
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();

  const sky0 = useTransform(scrollYProgress, STOPS, MIDNIGHT.map((s) => s.sky[0]));
  const sky1 = useTransform(scrollYProgress, STOPS, MIDNIGHT.map((s) => s.sky[1]));
  const sky2 = useTransform(scrollYProgress, STOPS, MIDNIGHT.map((s) => s.sky[2]));
  const sky = useTransform<string, string>(
    [sky0, sky1, sky2],
    ([a, b, c]: string[]) => `linear-gradient(to bottom, ${a} 0%, ${b} 54%, ${c} 100%)`,
  );

  const starOpacity = useTransform(scrollYProgress, STOPS, MIDNIGHT.map((s) => s.stars));
  const moonNudge = useTransform(scrollYProgress, STOPS, MIDNIGHT.map((s) => s.moon.nudge));
  const moonY = useTransform(scrollYProgress, STOPS, MIDNIGHT.map((s) => `${s.moon.y}%`));
  const moonOpacity = useTransform(scrollYProgress, STOPS, MIDNIGHT.map((s) => s.moon.opacity));

  // deterministic, so server and client render the same sky
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        left: `${(i * 39 + 7) % 100}%`,
        // denser overhead, thinning towards the ridgeline
        top: `${((i * 27 + 5) % 60) * (0.45 + ((i * 13) % 7) / 12)}%`,
        size: 0.8 + ((i * 7) % 4) * 0.45,
        dim: 0.28 + ((i * 11) % 6) * 0.12,
        twinkle: 4 + ((i * 5) % 9),
        delay: -((i * 3.7) % 11),
      })),
    [],
  );

  return (
    <div className="midnight" aria-hidden>
      <motion.div
        className="midnight__sky"
        style={{
          background: reduced
            ? `linear-gradient(to bottom, ${RESTING.sky[0]} 0%, ${RESTING.sky[1]} 54%, ${RESTING.sky[2]} 100%)`
            : sky,
        }}
      />

      <div className="midnight__stars">
        {stars.map((s, i) => (
          <motion.span
            key={i}
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: reduced ? RESTING.stars * s.dim : starOpacity,
              animationDuration: `${s.twinkle}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="midnight__moon"
        style={{
          x: reduced ? RESTING.moon.nudge : moonNudge,
          top: reduced ? `${RESTING.moon.y}%` : moonY,
          opacity: reduced ? RESTING.moon.opacity : moonOpacity,
        }}
      >
        <span className="midnight__moon-glow" />
        <span className="midnight__moon-disc" />
      </motion.div>

      {/* Each band of mist sits IN FRONT of the ridge it pools against and
          behind the next one forward — that interleaving is what reads as
          depth. Painted the other way round, every band disappears under the
          silhouette in front of it. */}
      <Ridge index={0} reduced={reduced} />
      <div className="midnight__mist midnight__mist--far" />
      <Ridge index={1} reduced={reduced} />
      <div className="midnight__mist midnight__mist--mid" />
      <Ridge index={2} reduced={reduced} />
      <div className="midnight__mist midnight__mist--near" />

      {/* a little weight along the bottom so type never floats on empty colour */}
      <div className="midnight__haze" />
    </div>
  );
}
