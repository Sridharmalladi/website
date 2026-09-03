"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePlayground } from "@/store/usePlayground";

/**
 * Point light that chases the pointer in world space (CURSOR FOLLOW), or settles
 * into a fixed 3-quarter key position (AMBIENT LIGHT). Reads the R3F-normalized
 * pointer so it stays in sync with the canvas, not the DOM.
 */
export default function CursorLight() {
  const light = useRef<THREE.PointLight>(null);
  const { pointer, viewport } = useThree();
  const lightingMode = usePlayground((s) => s.lightingMode);
  const reduced = usePlayground((s) => s.reducedMotion);

  const target = new THREE.Vector3();

  useFrame((_, delta) => {
    if (!light.current) return;
    if (lightingMode === "AMBIENT LIGHT") {
      target.set(-3, 4, 5);
    } else {
      target.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        3.2,
      );
    }
    const t = reduced ? 1 : 1 - Math.pow(0.0015, delta);
    light.current.position.lerp(target, t);
  });

  return (
    <>
      <pointLight
        ref={light}
        color="#8fb6ff"
        intensity={lightingMode === "AMBIENT LIGHT" ? 45 : 65}
        distance={18}
        decay={2}
      />
      <ambientLight intensity={lightingMode === "AMBIENT LIGHT" ? 0.5 : 0.22} />
      <directionalLight position={[4, 6, 8]} intensity={0.35} color="#a78bfa" />
    </>
  );
}
