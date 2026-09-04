"use client";

import { cn } from "@/lib/cn";
import type { Rect } from "@/config/zones";

/** A sleek one-way tile. Positioned in world units by the parent stage. */
export default function Platform({
  rect,
  label,
  active = false,
  ground = false,
}: {
  rect: Rect;
  label?: string;
  active?: boolean;
  ground?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute",
        ground ? "" : "world-fade transition-transform duration-200",
        active && !ground && "-translate-y-1",
      )}
      style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
    >
      {label && (
        <span
          className={cn(
            "font-pixel absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-[10px] tracking-widest",
            "border-2 transition-colors",
          )}
          style={{
            color: active ? "var(--accent-ink)" : "var(--text)",
            background: active ? "var(--accent)" : "var(--panel)",
            borderColor: "var(--panel-border)",
          }}
        >
          {label}
        </span>
      )}
      {/* tile body */}
      <div
        className="h-full w-full"
        style={{
          background: "var(--platform)",
          borderTop: "3px solid var(--platform-edge)",
          borderRadius: ground ? 0 : 4,
          boxShadow: ground
            ? "inset 0 8px 0 -4px rgba(255,255,255,0.06)"
            : active
              ? "0 0 0 2px var(--accent), 0 12px 24px -10px var(--glow)"
              : "0 8px 18px -10px rgba(0,0,0,0.4)",
        }}
      />
      {/* dirt fill under ground */}
      {ground && (
        <div
          className="absolute inset-x-0 top-full h-[400px]"
          style={{ background: "var(--ground)" }}
        />
      )}
    </div>
  );
}
