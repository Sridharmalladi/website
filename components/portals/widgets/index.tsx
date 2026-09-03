"use client";

import dynamic from "next/dynamic";
import type { WidgetKind } from "@/config/projects";
import ColorSlider from "./ColorSlider";
import ToggleWidget from "./ToggleWidget";

// ShaderOrb mounts its own <Canvas> -> keep it out of SSR / static export.
const ShaderOrb = dynamic(() => import("./ShaderOrb"), { ssr: false });

function Wave({ large = false }: { large?: boolean }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg bg-black/30"
      style={{ height: large ? 160 : 72 }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-spectral-rose/50 animate-pulse-slow"
          style={{
            width: 30 + i * 44,
            height: 30 + i * 44,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Widget({
  kind,
  large = false,
}: {
  kind: WidgetKind;
  large?: boolean;
}) {
  switch (kind) {
    case "color-slider":
      return <ColorSlider large={large} />;
    case "shader-orb":
      return <ShaderOrb large={large} />;
    case "toggle":
      return <ToggleWidget large={large} />;
    case "wave":
      return <Wave large={large} />;
  }
}
