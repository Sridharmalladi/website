"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointer } from "@/components/PointerProvider";
import { usePlayground } from "@/store/usePlayground";
import { DYNAMICS_RAW } from "@/lib/motion";
import type { Project } from "@/config/projects";
import GlassPanel from "@/components/ui/GlassPanel";
import { Widget } from "./widgets";

const ANCHOR: Record<Project["anchor"], string> = {
  "top-left": "left-[3vw] top-[12vh]",
  "top-right": "right-[3vw] top-[10vh]",
  "bottom-left": "left-[3vw] bottom-[8vh]",
  "bottom-right": "right-[3vw] bottom-[10vh]",
};

/**
 * Floating glass tile at a spatial Z depth. Parallax-drifts against the pointer,
 * lifts on hover, and opens its project on click.
 */
export default function PortalTile({ project }: { project: Project }) {
  const pointer = usePointer();
  const setActiveProject = usePlayground((s) => s.setActiveProject);
  const dynamics = usePlayground((s) => s.dynamics);
  const velocity = usePlayground((s) => s.motionVelocity);
  const reduced = usePlayground((s) => s.reducedMotion);
  const cfg = DYNAMICS_RAW[dynamics];

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { ...cfg, stiffness: cfg.stiffness * velocity });
  const y = useSpring(py, { ...cfg, stiffness: cfg.stiffness * velocity });

  // deeper tiles (more negative depth) drift more -> parallax
  const factor = 1 + Math.abs(project.depth) / 120;

  useEffect(() => {
    if (reduced) return;
    return pointer.subscribe((p) => {
      px.set(-p.nx * 10 * factor);
      py.set(-p.ny * 8 * factor);
    });
  }, [pointer, factor, reduced, px, py]);

  const Icon = project.icon;

  return (
    <motion.div
      className={`pointer-events-auto absolute z-20 hidden w-[210px] lg:block ${ANCHOR[project.anchor]}`}
      style={{
        x,
        y,
        translateZ: project.depth,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1 + project.depth / 1600,
      }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={reduced ? undefined : { scale: 1.05, translateZ: project.depth + 40 }}
    >
      <GlassPanel
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.title}`}
        onClick={() => setActiveProject(project.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActiveProject(project.id);
          }
        }}
        className="cursor-pointer p-4 transition-colors hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spectral-blue"
      >
        <div className="flex items-center gap-2">
          <span
            className="grid h-7 w-7 place-items-center rounded-md"
            style={{ background: `${project.accent}22`, color: project.accent }}
          >
            <Icon size={14} aria-hidden />
          </span>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-white">
            {project.title}
          </p>
        </div>
        <div className="mt-3">
          <Widget kind={project.widget} />
        </div>
        <p className="mt-3 text-[10px] tracking-[0.18em] text-dim">
          Z {project.depth} · CLICK TO EXPAND
        </p>
      </GlassPanel>
    </motion.div>
  );
}
