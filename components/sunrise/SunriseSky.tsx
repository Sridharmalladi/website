"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SKY } from "./palette";

/**
 * The whole background: a sky that moves from night through dawn to dusk as
 * you scroll, and a sun that arcs up from the right and sets on the left.
 *
 * Four elements total — sky, sun, horizon haze, a field of small stars. Fixed
 * behind the page rather than drawn into it, so nothing here can ever collide
 * with the copy or add to the page's height.
 */
export default function SunriseSky() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const at = SKY.map((s) => s.at);
  const sky0 = useTransform(scrollYProgress, at, SKY.map((s) => s.sky[0]));
  const sky1 = useTransform(scrollYProgress, at, SKY.map((s) => s.sky[1]));
  const sky2 = useTransform(scrollYProgress, at, SKY.map((s) => s.sky[2]));
  const sunX = useTransform(scrollYProgress, at, SKY.map((s) => s.sun.x));
  const sunY = useTransform(scrollYProgress, at, SKY.map((s) => s.sun.y));
  const disc = useTransform(scrollYProgress, at, SKY.map((s) => s.disc));
  const halo = useTransform(scrollYProgress, at, SKY.map((s) => s.halo));
  const starOpacity = useTransform(scrollYProgress, at, SKY.map((s) => s.stars));

  const background = useTransform(
    [sky0, sky1, sky2],
    ([a, b, c]) => `linear-gradient(to bottom, ${a} 0%, ${b} 52%, ${c} 100%)`,
  );
  const left = useTransform(sunX, (v) => `${v}%`);
  const top = useTransform(sunY, (v) => `${v}%`);
  const sunBackground = useTransform(
    disc,
    (c) => `radial-gradient(circle, ${c} 0%, ${c} 26%, color-mix(in srgb, ${c} 55%, transparent) 52%, transparent 78%)`,
  );
  const haloBackground = useTransform(halo, (c) => `radial-gradient(circle, ${c} 0%, transparent 70%)`);

  // deterministic, so server and client render the same sky
  const stars = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 23 + 7) % 62}%`,
        size: 1 + ((i * 7) % 3) * 0.6,
        dim: 0.3 + ((i * 11) % 5) * 0.12,
      })),
    [],
  );

  // Reduced motion gets the dawn stop, held still.
  const still = SKY[1];

  return (
    <div className="sky" aria-hidden>
      {reduced ? (
        <div
          className="sky__wash"
          style={{
            background: `linear-gradient(to bottom, ${still.sky[0]} 0%, ${still.sky[1]} 52%, ${still.sky[2]} 100%)`,
          }}
        />
      ) : (
        <motion.div className="sky__wash" style={{ background }} />
      )}

      <div className="sky__stars">
        {stars.map((s, i) => (
          <motion.span
            key={i}
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: reduced ? still.stars * s.dim : starOpacity,
            }}
          />
        ))}
      </div>

      {reduced ? (
        <div
          className="sky__sun"
          style={{
            left: `${still.sun.x}%`,
            top: `${still.sun.y}%`,
            background: `radial-gradient(circle, ${still.disc} 0%, ${still.disc} 26%, color-mix(in srgb, ${still.disc} 55%, transparent) 52%, transparent 78%)`,
          }}
        >
          <span
            className="sky__halo"
            style={{ background: `radial-gradient(circle, ${still.halo} 0%, transparent 70%)` }}
          />
        </div>
      ) : (
        <motion.div className="sky__sun" style={{ left, top, background: sunBackground }}>
          <motion.span className="sky__halo" style={{ background: haloBackground }} />
        </motion.div>
      )}

      <div className="sky__haze" />
    </div>
  );
}
