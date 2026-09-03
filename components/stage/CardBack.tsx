"use client";

import { ArrowLeft } from "lucide-react";
import { site } from "@/config/site";

export default function CardBack({ onFlip }: { onFlip: () => void }) {
  return (
    <div className="flex h-full flex-col p-8 sm:p-10">
      <p className="text-[11px] font-semibold tracking-[0.32em] text-spectral-violet">
        DEEP DIVE / SYSTEM NOTES
      </p>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
        How this thing is wired
      </h2>

      <p className="mt-4 text-[13px] leading-relaxed text-dim">{site.summary}</p>

      <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-spectral-rose/70" />
          <span className="h-2 w-2 rounded-full bg-spectral-cyan/70" />
          <span className="h-2 w-2 rounded-full bg-spectral-blue/70" />
          <span className="ml-2 text-[10px] tracking-[0.2em] text-dim/70">
            dynamics.ts
          </span>
        </div>
        <pre className="overflow-x-auto p-3.5 text-[11.5px] leading-relaxed text-spectral-cyan/90">
          <code>{site.codeSnippet}</code>
        </pre>
      </div>

      <button
        type="button"
        onClick={onFlip}
        className="mt-auto inline-flex min-h-[40px] w-fit items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3 text-[11px] font-semibold tracking-[0.16em] text-dim transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spectral-blue"
      >
        <ArrowLeft size={13} aria-hidden />
        BACK TO FRONT
      </button>
    </div>
  );
}
