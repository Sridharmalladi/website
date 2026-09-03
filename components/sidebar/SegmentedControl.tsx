"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface Props<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}

export default function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-semibold tracking-[0.22em] text-dim">
        {label}
      </p>
      <div className="flex gap-1 rounded-xl border border-white/10 bg-black/30 p-1">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={cn(
                "relative flex-1 rounded-lg px-2 py-1.5 text-[10px] font-semibold tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-spectral-blue",
                active ? "text-obsidian-950" : "text-dim hover:text-white",
              )}
            >
              {active && (
                <motion.span
                  layoutId={`seg-${label}`}
                  className="absolute inset-0 rounded-lg bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
