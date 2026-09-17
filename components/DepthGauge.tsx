"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { BANDS, STRIP_H } from "@/config/bands";

const ZONE_NAMES: Record<string, string> = {
  space: "Space",
  sky: "Sky",
  surface: "Surface",
  subway: "Subway",
  fossils: "Fossils",
  core: "Core",
};

/**
 * Fixed side indicator showing how far down the descent you are. The bar is
 * ticked at the zone boundaries and names the zone you're currently in, so it
 * reads as a scale rather than as decoration.
 */
export default function DepthGauge() {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [zone, setZone] = useState(ZONE_NAMES[BANDS[0].id]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const y = p * STRIP_H;
    const band = BANDS.find((b) => y >= b.from && y < b.to) ?? BANDS[BANDS.length - 1];
    const name = ZONE_NAMES[band.id];
    setZone((prev) => (prev === name ? prev : name));
  });

  return (
    <div className="depth-gauge" aria-hidden>
      <span className="depth-gauge-zone">{zone}</span>
      <div className="depth-gauge-track">
        {BANDS.slice(1).map((b) => (
          <span
            key={b.id}
            className="depth-gauge-tick"
            style={{ top: `${(b.from / STRIP_H) * 100}%` }}
          />
        ))}
        <motion.div className="depth-gauge-dot" style={{ top }} />
      </div>
    </div>
  );
}
