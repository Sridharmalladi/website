"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/** Fixed side indicator showing how far down the space-to-core descent you are. */
export default function DepthGauge() {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="depth-gauge-track" aria-hidden>
      <motion.div className="depth-gauge-dot" style={{ top }} />
    </div>
  );
}
