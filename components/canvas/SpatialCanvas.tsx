"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import CursorLight from "./CursorLight";
import AmbientGrid from "./AmbientGrid";
import RefractionOrb from "./RefractionOrb";

/**
 * Full-viewport WebGL backdrop: ambient grid, refraction orbs, cursor-driven
 * lighting. Sits at z-0 behind the DOM stage. Loaded via next/dynamic ssr:false
 * from Scene so it never runs during static export.
 */
export default function SpatialCanvas() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 9], fov: 42 }}
      >
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 10, 26]} />
        <CursorLight />
        <AmbientGrid />
        <RefractionOrb position={[3.9, 1.5, -6]} />
        <RefractionOrb position={[-4.6, -1.8, -8]} />
        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>
    </div>
  );
}
