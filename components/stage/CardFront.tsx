"use client";

import { RotateCcw } from "lucide-react";
import { site } from "@/config/site";
import ContactHub from "./ContactHub";

export default function CardFront({ onFlip }: { onFlip: () => void }) {
  return (
    <div className="flex h-full flex-col p-8 sm:p-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.32em] text-spectral-cyan">
            PORTFOLIO / 2026
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-2 font-display text-sm font-medium tracking-[0.18em] text-dim">
            {site.role}
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-2.5">
        {site.bioLines.map((line) => (
          <p key={line} className="max-w-md text-[13.5px] leading-relaxed text-dim">
            {line}
          </p>
        ))}
      </div>

      <ContactHub />

      <div className="mt-auto flex items-center justify-between pt-8">
        <span className="text-[11px] tracking-[0.2em] text-dim/70">
          TAP CARD TO FLIP
        </span>
        <button
          type="button"
          onClick={onFlip}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3 text-[11px] font-semibold tracking-[0.16em] text-dim transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spectral-blue"
        >
          <RotateCcw size={13} aria-hidden />
          DEEP DIVE
        </button>
      </div>
    </div>
  );
}
