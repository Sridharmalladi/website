"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { PointerProvider } from "@/components/PointerProvider";
import { usePlayground } from "@/store/usePlayground";
import TiltStage from "@/components/stage/TiltStage";
import FlipCard from "@/components/stage/FlipCard";
import PortalField from "@/components/portals/PortalField";
import PortalExpansion from "@/components/portals/PortalExpansion";
import Playground from "@/components/sidebar/Playground";

// WebGL backdrop is client-only -> excluded from static export prerender.
const SpatialCanvas = dynamic(
  () => import("@/components/canvas/SpatialCanvas"),
  { ssr: false },
);

export default function Scene() {
  const theme = usePlayground((s) => s.theme);
  const setReducedMotion = usePlayground((s) => s.setReducedMotion);

  // Theme State Engine -> drives every CSS var via <html data-theme>.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Respect prefers-reduced-motion across the whole scene.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [setReducedMotion]);

  return (
    <PointerProvider>
      <div className="spatial-grid" />
      <SpatialCanvas />

      <main className="relative">
        <header className="pointer-events-none fixed left-0 top-0 z-30 flex w-full items-center justify-between px-5 py-4 sm:px-8">
          <span className="font-display text-[11px] font-bold tracking-[0.3em] text-white">
            SM<span className="text-spectral-cyan">/</span>SPATIAL
          </span>
          <span className="hidden text-[10px] tracking-[0.24em] text-dim sm:block">
            MOVE CURSOR · FLIP CARD · OPEN PORTALS
          </span>
        </header>

        <TiltStage>
          <FlipCard />
        </TiltStage>

        <PortalField />
      </main>

      <Playground />
      <PortalExpansion />
    </PointerProvider>
  );
}
