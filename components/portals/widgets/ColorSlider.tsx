"use client";

import { useState } from "react";

/** Mini interactive hue remapper — drag to recolour the swatch + ramp. */
export default function ColorSlider({ large = false }: { large?: boolean }) {
  const [hue, setHue] = useState(212);
  const ramp = [0.35, 0.5, 0.62, 0.74, 0.86];

  return (
    <div className="w-full select-none">
      <div
        className="rounded-lg"
        style={{
          height: large ? 88 : 40,
          background: `linear-gradient(90deg, hsl(${hue} 85% 22%), hsl(${hue} 90% 60%))`,
        }}
      />
      <input
        type="range"
        min={0}
        max={360}
        value={hue}
        aria-label="Hue"
        onChange={(e) => setHue(+e.target.value)}
        onClick={(e) => e.stopPropagation()}
        className="mt-3 w-full accent-white"
      />
      <div className="mt-3 flex gap-1.5">
        {ramp.map((l, i) => (
          <div
            key={i}
            className="h-5 flex-1 rounded"
            style={{ background: `hsl(${hue} 80% ${l * 100}%)` }}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px] text-dim">hsl({hue} 84% 58%)</p>
    </div>
  );
}
