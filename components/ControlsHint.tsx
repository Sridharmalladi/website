"use client";

import { useGame } from "@/store/useGame";

/** ← → ↑ prompt, bottom-centre. Fades out after the first input. */
export default function ControlsHint() {
  const hasMoved = useGame((s) => s.hasMoved);
  const reduced = useGame((s) => s.reducedMotion);
  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center transition-opacity duration-500"
      style={{ opacity: hasMoved ? 0 : 1 }}
    >
      <div
        className="font-pixel flex items-center gap-2 rounded border-2 px-3 py-2 text-[11px] tracking-widest"
        style={{ background: "var(--panel)", borderColor: "var(--panel-border)", color: "var(--text-dim)" }}
      >
        <Key>←</Key>
        <Key>→</Key>
        <span>MOVE</span>
        <Key>↑</Key>
        <span>JUMP</span>
      </div>
    </div>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className="inline-grid h-6 min-w-6 place-items-center rounded border-2 px-1 text-xs"
      style={{ borderColor: "var(--panel-border)", color: "var(--text)" }}
    >
      {children}
    </kbd>
  );
}
