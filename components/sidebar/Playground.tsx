"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronRight } from "lucide-react";
import { usePlayground } from "@/store/usePlayground";
import type { Dynamics } from "@/lib/motion";
import type { LightingMode, ThemeState } from "@/store/usePlayground";
import GlassPanel from "@/components/ui/GlassPanel";
import SegmentedControl from "./SegmentedControl";
import RangeSlider from "./RangeSlider";

const DYN: readonly Dynamics[] = ["SPRING", "LIQUID", "RIGID"];
const LIGHT: readonly LightingMode[] = ["CURSOR FOLLOW", "AMBIENT LIGHT"];
const THEME: readonly ThemeState[] = ["OBSIDIAN", "FROSTED GLASS", "WIREFRAME"];

/** Floating docked control panel — the interactive UI playground. */
export default function Playground() {
  const [open, setOpen] = useState(true);
  const s = usePlayground();

  return (
    <div className="fixed right-0 top-1/2 z-40 -translate-y-1/2 pr-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Collapse playground" : "Open playground"}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-black/40 text-dim backdrop-blur-md transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spectral-blue"
        >
          {open ? <ChevronRight size={16} /> : <SlidersHorizontal size={16} />}
        </button>

        <motion.div
          initial={false}
          animate={{
            width: open ? 280 : 0,
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="overflow-hidden"
        >
          <GlassPanel className="w-[280px] space-y-4 p-5">
            <div>
              <p className="font-display text-xs font-bold tracking-[0.24em] text-white">
                UI PLAYGROUND
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-dim">
                Everything on this page reads from these controls in real time.
              </p>
            </div>

            <SegmentedControl
              label="DYNAMICS"
              options={DYN}
              value={s.dynamics}
              onChange={s.setDynamics}
            />
            <SegmentedControl
              label="LIGHTING MODE"
              options={LIGHT}
              value={s.lightingMode}
              onChange={s.setLightingMode}
            />
            <SegmentedControl
              label="THEME STATE"
              options={THEME}
              value={s.theme}
              onChange={s.setTheme}
            />

            <div className="space-y-3 border-t border-white/10 pt-4">
              <RangeSlider
                label="TILT INTENSITY"
                min={0}
                max={1.4}
                step={0.05}
                value={s.tiltIntensity}
                onChange={s.setTiltIntensity}
              />
              <RangeSlider
                label="MOTION VELOCITY"
                min={0.4}
                max={2}
                step={0.05}
                value={s.motionVelocity}
                onChange={s.setMotionVelocity}
                format={(v) => `${v.toFixed(2)}x`}
              />
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
}
