import type { Transition } from "framer-motion";

export type Dynamics = "SPRING" | "LIQUID" | "RIGID";

/** Spring personality presets, swapped live from the sidebar Playground. */
export const DYNAMICS: Record<Dynamics, Transition> = {
  SPRING: { type: "spring", stiffness: 220, damping: 18, mass: 1 },
  LIQUID: { type: "spring", stiffness: 90, damping: 26, mass: 1.6 },
  RIGID: { type: "spring", stiffness: 600, damping: 40, mass: 0.6 },
};

/** Same presets as raw numbers for react-spring / drei / manual lerps. */
export const DYNAMICS_RAW: Record<
  Dynamics,
  { stiffness: number; damping: number; mass: number }
> = {
  SPRING: { stiffness: 220, damping: 18, mass: 1 },
  LIQUID: { stiffness: 90, damping: 26, mass: 1.6 },
  RIGID: { stiffness: 600, damping: 40, mass: 0.6 },
};

export function springWith(d: Dynamics, velocity = 1): Transition {
  const base = DYNAMICS[d];
  // motion velocity slider scales stiffness -> faster settle without losing the personality
  return { ...base, stiffness: (base.stiffness as number) * velocity };
}

/** Exit faster than enter — UX guideline. */
export const EASE_SPATIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];
