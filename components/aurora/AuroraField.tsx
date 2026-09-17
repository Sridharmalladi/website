"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AURORA, RESTING, type Ribbon } from "./palette";

/**
 * The whole background: three soft ribbons of light drifting over a near-black
 * ground, shifting position and hue as you scroll.
 *
 * Nothing here has an edge — the ribbons are radial gradients rather than shapes,
 * so the type is the only hard thing on screen. The layer is fixed and
 * pointer-events: none, so it can't collide with the copy or add page height.
 *
 * Softness comes from the gradient stops, NOT from `filter: blur()`. Three
 * blurred layers is real GPU cost on a phone; gradients this soft are free.
 *
 * Every layer renders as a motion.div whatever the motion preference is — only
 * the values change. Swapping between motion.div and a plain div leaves framer's
 * inline styles behind on the reused DOM node, which is what once left whole
 * sections invisible under reduced motion.
 */

const STOPS = AURORA.map((s) => s.at);

/** A ribbon's `background`: one radial gradient with a long tail to zero. */
function ribbonPaint({ color, opacity }: Pick<Ribbon, "color" | "opacity">) {
  const mix = (pct: number) => `color-mix(in srgb, ${color} ${pct.toFixed(1)}%, transparent)`;
  return (
    `radial-gradient(ellipse 60% 42% at 50% 50%, ` +
    `${mix(opacity * 100)} 0%, ${mix(opacity * 58)} 38%, ${mix(opacity * 22)} 64%, transparent 82%)`
  );
}

/** One ribbon. Its own component so the hooks run in a fixed order. */
function AuroraRibbon({ index, reduced }: { index: number; reduced: boolean }) {
  const { scrollYProgress } = useScroll();

  const color = useTransform(scrollYProgress, STOPS, AURORA.map((s) => s.ribbons[index].color));
  // carried as a string so both inputs to the combining transform share a type
  const alpha = useTransform(scrollYProgress, STOPS, AURORA.map((s) => s.ribbons[index].opacity));
  const alphaText = useTransform(alpha, (o) => String(o));
  const background = useTransform<string, string>([color, alphaText], ([c, o]: string[]) =>
    ribbonPaint({ color: c, opacity: Number(o) }),
  );
  const left = useTransform(scrollYProgress, STOPS, AURORA.map((s) => `${s.ribbons[index].x}%`));
  const top = useTransform(scrollYProgress, STOPS, AURORA.map((s) => `${s.ribbons[index].y}%`));

  const resting = RESTING.ribbons[index];

  return (
    <motion.div
      className={`aurora__ribbon aurora__ribbon--${index + 1}`}
      style={{
        background: reduced ? ribbonPaint(resting) : background,
        left: reduced ? `${resting.x}%` : left,
        top: reduced ? `${resting.y}%` : top,
      }}
    />
  );
}

export default function AuroraField() {
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();

  const groundTop = useTransform(scrollYProgress, STOPS, AURORA.map((s) => s.ground[0]));
  const groundBottom = useTransform(scrollYProgress, STOPS, AURORA.map((s) => s.ground[1]));
  const ground = useTransform<string, string>(
    [groundTop, groundBottom],
    ([a, b]: string[]) => `linear-gradient(to bottom, ${a} 0%, ${b} 100%)`,
  );

  return (
    <div className={reduced ? "aurora aurora--still" : "aurora"} aria-hidden>
      <motion.div
        className="aurora__ground"
        style={{
          background: reduced
            ? `linear-gradient(to bottom, ${RESTING.ground[0]} 0%, ${RESTING.ground[1]} 100%)`
            : ground,
        }}
      />

      <AuroraRibbon index={0} reduced={reduced} />
      <AuroraRibbon index={1} reduced={reduced} />
      <AuroraRibbon index={2} reduced={reduced} />

      {/* Big soft gradients band badly on 8-bit displays; grain is the fix. */}
      <div className="aurora__grain" />

      {/* A little weight along the bottom so type never floats on empty colour. */}
      <div className="aurora__haze" />
    </div>
  );
}
