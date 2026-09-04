"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, X } from "lucide-react";
import { site } from "@/config/site";
import { useGame } from "@/store/useGame";
import ArcadeButton from "@/components/ui/ArcadeButton";
import WorldSwitch from "@/components/WorldSwitch";

/**
 * The no-play path: everything on the page reachable without touching the game.
 * Opened from the HUD; Esc or the scrim closes it.
 */
export default function Menu() {
  const open = useGame((s) => s.menuOpen);
  const setOpen = useGame((s) => s.setMenuOpen);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="pixel-panel relative z-10 w-full max-w-md space-y-5 p-6 outline-none"
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="arcade-btn !absolute !right-3 !top-3 !min-h-0 !p-1.5"
            >
              <X size={14} aria-hidden />
            </button>

            <section className="space-y-1">
              <p className="font-pixel text-xs tracking-widest" style={{ color: "var(--accent)" }}>
                {site.handle}
              </p>
              <h2 className="font-pixel text-xl" style={{ color: "var(--text)" }}>
                {site.name}
              </h2>
              {site.about.map((l) => (
                <p key={l} className="text-[13px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                  {l}
                </p>
              ))}
            </section>

            <section className="space-y-2">
              <p className="font-pixel text-[11px] tracking-widest" style={{ color: "var(--text-dim)" }}>
                FIND ME
              </p>
              <div className="flex flex-wrap gap-2">
                <ArcadeButton href={site.socials.github} external>
                  <Github size={14} aria-hidden /> GITHUB
                </ArcadeButton>
                <ArcadeButton href={site.socials.linkedin} external>
                  <Linkedin size={14} aria-hidden /> LINKEDIN
                </ArcadeButton>
                <ArcadeButton href={`mailto:${site.socials.email}`}>
                  <Mail size={14} aria-hidden /> EMAIL
                </ArcadeButton>
              </div>
            </section>

            <section className="space-y-2">
              <p className="font-pixel text-[11px] tracking-widest" style={{ color: "var(--text-dim)" }}>
                WORLD
              </p>
              <WorldSwitch variant="panel" />
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
