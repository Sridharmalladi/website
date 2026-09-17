"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { RESTING, RIDGES, VALLEY } from "./palette";
import { RIDGE_BOX, RIDGE_PATHS } from "./ridges";

/**
 * Dawn over a valley, painted the way ink washes are: four ranges laid over
 * each other, each one more translucent than opaque, with mist collecting
 * between them and air moving steadily across the frame from left to right.
 *
 * Nothing is solid. The ridges are low-opacity washes, the mist is a stack of
 * soft bands, and the air currents are long translucent streaks — so the scene
 * reads as atmosphere behind the type rather than as a picture competing with
 * it.
 *
 * Fixed and pointer-events: none: it can't collide with the copy or add to the
 * page's height. Every layer is a motion.div whatever the motion preference is,
 * only the values change — swapping element types would strand framer's inline
 * styles on the reused node.
 */

const STOPS = VALLEY.map((s) => s.at);

function Ridge({ index, reduced }: { index: number; reduced: boolean }) {
  const { scrollYProgress } = useScroll();
  const drift = useTransform(scrollYProgress, STOPS, VALLEY.map((s) => `${s.drift[index]}%`));
  const ridge = RIDGES[index];

  return (
    <motion.div
      className={`valley__ridge valley__ridge--${index + 1}`}
      style={{ y: reduced ? `${RESTING.drift[index]}%` : drift, opacity: ridge.opacity }}
    >
      <svg
        viewBox={`0 0 ${RIDGE_BOX.width} ${RIDGE_BOX.height}`}
        preserveAspectRatio="xMidYMax slice"
        aria-hidden
      >
        <defs>
          <linearGradient id={`valley-ridge-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ridge.top} />
            <stop offset="52%" stopColor={ridge.base} />
            <stop offset="100%" stopColor={ridge.base} stopOpacity="0.72" />
          </linearGradient>
        </defs>
        <path d={RIDGE_PATHS[index]} fill={`url(#valley-ridge-${index})`} />
        {/* first light catching the crest — the closed bottom edge is off-frame */}
        <path
          d={RIDGE_PATHS[index]}
          fill="none"
          stroke={ridge.rim}
          strokeWidth={1.4}
          strokeOpacity={ridge.rimOpacity}
        />
      </svg>
    </motion.div>
  );
}

export default function ValleyAir() {
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();

  const sky0 = useTransform(scrollYProgress, STOPS, VALLEY.map((s) => s.sky[0]));
  const sky1 = useTransform(scrollYProgress, STOPS, VALLEY.map((s) => s.sky[1]));
  const sky2 = useTransform(scrollYProgress, STOPS, VALLEY.map((s) => s.sky[2]));
  const sky = useTransform<string, string>(
    [sky0, sky1, sky2],
    ([a, b, c]: string[]) => `linear-gradient(to bottom, ${a} 0%, ${b} 56%, ${c} 100%)`,
  );

  const sunY = useTransform(scrollYProgress, STOPS, VALLEY.map((s) => `${s.sun.y}%`));
  const sunOpacity = useTransform(scrollYProgress, STOPS, VALLEY.map((s) => s.sun.opacity));
  const mistOpacity = useTransform(scrollYProgress, STOPS, VALLEY.map((s) => s.mist));

  /**
   * The air. Long, thin, very faint streaks that cross the whole frame left to
   * right on their own clocks — deterministic so the server and client agree.
   */
  const currents = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        top: `${6 + ((i * 23 + 9) % 74)}%`,
        width: `${28 + ((i * 17) % 34)}%`,
        height: `${1 + ((i * 5) % 3) * 0.9}px`,
        duration: 26 + ((i * 7) % 5) * 7,
        delay: -((i * 6.5) % 30),
        opacity: 0.1 + ((i * 11) % 5) * 0.045,
      })),
    [],
  );

  return (
    <div className="valley" aria-hidden>
      <motion.div
        className="valley__sky"
        style={{
          background: reduced
            ? `linear-gradient(to bottom, ${RESTING.sky[0]} 0%, ${RESTING.sky[1]} 56%, ${RESTING.sky[2]} 100%)`
            : sky,
        }}
      />

      {/* low sun, parked in the margin so it never sits behind the column */}
      <motion.div
        className="valley__sun"
        style={{
          top: reduced ? `${RESTING.sun.y}%` : sunY,
          opacity: reduced ? RESTING.sun.opacity : sunOpacity,
        }}
      />

      <motion.div
        className="valley__mist-stack"
        style={{ opacity: reduced ? RESTING.mist : mistOpacity }}
      >
        {/* Each band sits IN FRONT of the ridge it pools against and behind the
            next one forward; painted the other way round it would vanish under
            the wash in front of it. */}
        <Ridge index={0} reduced={reduced} />
        <div className="valley__mist valley__mist--1" />
        <Ridge index={1} reduced={reduced} />
        <div className="valley__mist valley__mist--2" />
        <Ridge index={2} reduced={reduced} />
        <div className="valley__mist valley__mist--3" />
        <Ridge index={3} reduced={reduced} />
        <div className="valley__mist valley__mist--4" />
      </motion.div>

      <div className="valley__air">
        {currents.map((c, i) => (
          <span
            key={i}
            style={{
              top: c.top,
              width: c.width,
              height: c.height,
              opacity: c.opacity,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </div>

      {/* The scene sits behind glass: light type over a pale ink wash measured
          at 2.72:1 without this, which is unreadable. */}
      <div className="valley__veil" />
      <div className="valley__paper" />
    </div>
  );
}
