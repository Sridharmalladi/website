"use client";

import type { ReactNode } from "react";

export const FRAME_W = "w-[min(92vw,1240px)]";

/**
 * A contained window into a scene: the artwork is cropped to this frame rather
 * than bleeding to the viewport edges. Everything sits on the page background,
 * so each zone reads as a framed illustration.
 */
export default function Frame({
  label,
  ratio = "16 / 9",
  glow,
  children,
}: {
  label?: string;
  /** CSS aspect-ratio for the window */
  ratio?: string;
  /** soft colour cast behind the frame, tying it to its zone */
  glow?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative mx-auto ${FRAME_W}`}>
      {glow && (
        <div
          className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
          style={{ background: glow, opacity: 0.28 }}
          aria-hidden
        />
      )}
      <div
        className="relative w-full overflow-hidden rounded-2xl border"
        style={{
          aspectRatio: ratio,
          borderColor: "var(--panel-border)",
          boxShadow: "0 40px 90px -45px rgba(0,0,0,0.95)",
        }}
      >
        {children}
        {label && <span className="zone-label">{label}</span>}
      </div>
    </div>
  );
}
