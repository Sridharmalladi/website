"use client";

import { motion } from "framer-motion";
import { usePlayground } from "@/store/usePlayground";
import { DYNAMICS_RAW } from "@/lib/motion";
import GlassPanel from "@/components/ui/GlassPanel";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

/**
 * Central hero card. Flips on the X axis (top -> bottom) with spring inertia
 * from the active dynamics preset. Click anywhere on the card, or press Enter/
 * Space, to toggle.
 */
export default function FlipCard() {
  const flipped = usePlayground((s) => s.flipped);
  const toggleFlip = usePlayground((s) => s.toggleFlip);
  const dynamics = usePlayground((s) => s.dynamics);
  const velocity = usePlayground((s) => s.motionVelocity);
  const reduced = usePlayground((s) => s.reducedMotion);

  const cfg = DYNAMICS_RAW[dynamics];

  return (
    <div
      className="[transform-style:preserve-3d]"
      style={{ perspective: 1400 }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={flipped ? "Show front of card" : "Show back of card"}
      onClick={(e) => {
        // ignore clicks that land on links / buttons inside the faces
        if ((e.target as HTMLElement).closest("a,button")) return;
        toggleFlip();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFlip();
        }
      }}
    >
      <motion.div
        className="relative h-[560px] w-full [transform-style:preserve-3d]"
        animate={{ rotateX: flipped ? 180 : 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: cfg.stiffness * velocity,
                damping: cfg.damping,
                mass: cfg.mass,
              }
        }
      >
        {/* FRONT */}
        <GlassPanel
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateX(0deg)]"
          style={{ WebkitBackfaceVisibility: "hidden" }}
        >
          <CardFront onFlip={toggleFlip} />
        </GlassPanel>

        {/* BACK — pre-rotated so it reads upright once the card is flipped */}
        <GlassPanel
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateX(180deg)]"
          style={{ WebkitBackfaceVisibility: "hidden" }}
        >
          <CardBack onFlip={toggleFlip} />
        </GlassPanel>
      </motion.div>
    </div>
  );
}
