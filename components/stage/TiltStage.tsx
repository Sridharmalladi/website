"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePointer } from "@/components/PointerProvider";
import { usePlayground } from "@/store/usePlayground";
import { DYNAMICS_RAW } from "@/lib/motion";

const MAX_DEG = 10; // ±10° ceiling per spec

/**
 * Cursor-tracked 3D tilt / parallax for the central stage.
 * rotateX/rotateY driven by normalized pointer, clamped to ±(MAX_DEG * tiltIntensity),
 * spring-damped by the active dynamics preset.
 */
export default function TiltStage({ children }: { children: ReactNode }) {
  const pointer = usePointer();
  const dynamics = usePlayground((s) => s.dynamics);
  const tiltIntensity = usePlayground((s) => s.tiltIntensity);
  const velocity = usePlayground((s) => s.motionVelocity);
  const reduced = usePlayground((s) => s.reducedMotion);

  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const cfg = DYNAMICS_RAW[dynamics];
  const spring = {
    stiffness: cfg.stiffness * velocity,
    damping: cfg.damping,
    mass: cfg.mass,
  };

  const rotateY = useSpring(useTransform(nx, [-1, 1], [-MAX_DEG, MAX_DEG]), spring);
  const rotateX = useSpring(useTransform(ny, [-1, 1], [MAX_DEG, -MAX_DEG]), spring);
  const translateX = useSpring(useTransform(nx, [-1, 1], [-14, 14]), spring);
  const translateY = useSpring(useTransform(ny, [-1, 1], [-10, 10]), spring);

  useEffect(() => {
    if (reduced) {
      nx.set(0);
      ny.set(0);
      return;
    }
    return pointer.subscribe((p) => {
      nx.set(p.nx * tiltIntensity);
      ny.set(p.ny * tiltIntensity);
    });
  }, [pointer, tiltIntensity, reduced, nx, ny]);

  return (
    <div
      className="relative z-10 grid min-h-screen place-items-center px-4 py-16"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          x: reduced ? 0 : translateX,
          y: reduced ? 0 : translateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-xl"
      >
        {children}
      </motion.div>
    </div>
  );
}
