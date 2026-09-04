"use client";

import { Heart, Menu as MenuIcon } from "lucide-react";
import { site } from "@/config/site";
import { zones } from "@/config/zones";
import { useGame } from "@/store/useGame";
import WorldSwitch from "@/components/WorldSwitch";

/** Fixed game HUD: player name + hearts (left), world + score + menu (right). */
export default function Hud() {
  const visited = useGame((s) => s.visited);
  const setMenuOpen = useGame((s) => s.setMenuOpen);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-3 sm:p-4">
      <div
        className="pointer-events-auto flex items-center gap-3 rounded border-2 px-3 py-2"
        style={{ background: "var(--panel)", borderColor: "var(--panel-border)", backdropFilter: "blur(8px)" }}
      >
        <span className="font-pixel text-xs tracking-widest" style={{ color: "var(--text)" }}>
          {site.name}
        </span>
        <span className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <Heart key={i} size={12} fill="var(--accent-2)" stroke="none" aria-hidden />
          ))}
        </span>
      </div>

      <div className="pointer-events-auto flex items-center gap-2">
        <span
          className="font-pixel hidden rounded border-2 px-2 py-1 text-[10px] tracking-widest sm:block"
          style={{ background: "var(--panel)", borderColor: "var(--panel-border)", color: "var(--text-dim)" }}
        >
          {visited.length}/{zones.length}
        </span>
        <WorldSwitch variant="hud" />
        <button
          onClick={() => setMenuOpen(true)}
          className="arcade-btn !px-2 !py-2"
          aria-label="Open menu"
        >
          <MenuIcon size={16} aria-hidden />
        </button>
      </div>
    </header>
  );
}
