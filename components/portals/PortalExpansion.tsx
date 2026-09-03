"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { projects } from "@/config/projects";
import { usePlayground } from "@/store/usePlayground";
import { EASE_SPATIAL } from "@/lib/motion";
import { Widget } from "./widgets";

/**
 * Full-screen portal reveal. An expansion wave sweeps out from the tile, then a
 * glass surface previews the project's UI at scale. Esc / click-scrim closes.
 */
export default function PortalExpansion() {
  const activeProject = usePlayground((s) => s.activeProject);
  const setActiveProject = usePlayground((s) => s.setActiveProject);
  const reduced = usePlayground((s) => s.reducedMotion);

  const project = projects.find((p) => p.id === activeProject) ?? null;

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, setActiveProject]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* scrim */}
          <div
            className="absolute inset-0 bg-obsidian-950/70 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          />

          {/* expansion wave */}
          {!reduced && (
            <motion.span
              key={`wave-${project.id}`}
              className="pointer-events-none absolute rounded-full"
              style={{ border: `2px solid ${project.accent}` }}
              initial={{ width: 40, height: 40, opacity: 0.9 }}
              animate={{ width: "220vmax", height: "220vmax", opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE_SPATIAL }}
            />
          )}

          <motion.div
            className="glass relative z-10 w-full max-w-3xl overflow-hidden p-8 sm:p-10"
            initial={{ scale: reduced ? 1 : 0.82, y: reduced ? 0 : 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: reduced ? 1 : 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              aria-label="Close preview"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-lg border border-white/12 text-dim transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spectral-blue"
            >
              <X size={16} aria-hidden />
            </button>

            <p
              className="text-[11px] font-semibold tracking-[0.3em]"
              style={{ color: project.accent }}
            >
              LIVE UI PREVIEW
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-dim">
              {project.blurb}
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-5">
              <Widget kind={project.widget} large />
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[44px] items-center rounded-xl border border-white/12 bg-white/[0.04] px-4 text-xs font-semibold tracking-[0.14em] text-dim transition-colors hover:border-white/30 hover:text-white"
              >
                VISIT PROJECT
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
