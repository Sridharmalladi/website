"use client";

import { cn } from "@/lib/cn";
import { worlds } from "@/config/worlds";
import { useGame } from "@/store/useGame";

/**
 * The "3 modes of view" control. `hud` = compact chip row (always on screen);
 * `panel` = labelled buttons with blurbs (inside the menu).
 */
export default function WorldSwitch({
  variant = "hud",
}: {
  variant?: "hud" | "panel";
}) {
  const world = useGame((s) => s.world);
  const setWorld = useGame((s) => s.setWorld);

  if (variant === "hud") {
    return (
      <div
        role="radiogroup"
        aria-label="World"
        className="flex gap-1 rounded border-2 p-1"
        style={{ background: "var(--panel)", borderColor: "var(--panel-border)" }}
      >
        {worlds.map((w) => {
          const on = w.id === world;
          return (
            <button
              key={w.id}
              role="radio"
              aria-checked={on}
              onClick={() => setWorld(w.id)}
              className={cn(
                "font-pixel rounded px-2 py-1 text-[10px] tracking-widest transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              )}
              style={{
                color: on ? "var(--accent-ink)" : "var(--text-dim)",
                background: on ? "var(--accent)" : "transparent",
              }}
            >
              {w.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div role="radiogroup" aria-label="World" className="grid gap-2">
      {worlds.map((w) => {
        const on = w.id === world;
        return (
          <button
            key={w.id}
            role="radio"
            aria-checked={on}
            onClick={() => setWorld(w.id)}
            className="arcade-btn !justify-start"
            style={
              on
                ? { boxShadow: "0 4px 0 0 var(--accent)", background: "color-mix(in srgb, var(--panel) 60%, var(--accent) 40%)" }
                : undefined
            }
          >
            <span className="font-pixel text-xs" style={{ color: on ? "var(--accent-ink)" : "var(--text)" }}>
              {w.label}
            </span>
            <span className="ml-2 text-[11px] font-normal" style={{ color: "var(--text-dim)" }}>
              {w.blurb}
            </span>
          </button>
        );
      })}
    </div>
  );
}
