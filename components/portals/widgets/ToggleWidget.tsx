"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePlayground } from "@/store/usePlayground";
import { DYNAMICS_RAW } from "@/lib/motion";

/** Functional spring toggle — interruptible, personality from the active preset. */
export default function ToggleWidget({ large = false }: { large?: boolean }) {
  const [on, setOn] = useState(true);
  const dynamics = usePlayground((s) => s.dynamics);
  const cfg = DYNAMICS_RAW[dynamics];
  const w = large ? 96 : 64;
  const h = large ? 52 : 34;
  const knob = h - 8;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Demo toggle"
        onClick={(e) => {
          e.stopPropagation();
          setOn((v) => !v);
        }}
        className="relative rounded-full border border-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spectral-blue"
        style={{
          width: w,
          height: h,
          background: on ? "rgba(94,234,212,0.28)" : "rgba(255,255,255,0.06)",
        }}
      >
        <motion.span
          className="absolute top-1 rounded-full bg-white"
          style={{ width: knob, height: knob }}
          animate={{ x: on ? w - knob - 4 : 4 }}
          transition={{ type: "spring", ...cfg }}
        />
      </button>
      <span className="font-mono text-[11px] text-dim">{on ? "ENABLED" : "OFF"}</span>
    </div>
  );
}
