"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { usePlayground } from "@/store/usePlayground";

/**
 * Slow-tumbling light-refraction orb behind the stage. Distort material fakes
 * transmission cheaply (real MeshTransmissionMaterial is too heavy for a
 * static-export bundle target).
 */
export default function RefractionOrb({
  position = [3.6, 1.4, -6] as [number, number, number],
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const theme = usePlayground((s) => s.theme);
  const velocity = usePlayground((s) => s.motionVelocity);
  const reduced = usePlayground((s) => s.reducedMotion);
  const wire = theme === "WIREFRAME";

  useFrame((_, delta) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.x += delta * 0.15 * velocity;
    mesh.current.rotation.y += delta * 0.22 * velocity;
  });

  return (
    <mesh ref={mesh} position={position} scale={1.7}>
      <icosahedronGeometry args={[1, wire ? 2 : 6]} />
      <MeshDistortMaterial
        color={wire ? "#7fd4ff" : "#6d8bff"}
        wireframe={wire}
        emissive={wire ? "#2a6fb0" : "#1b2a6b"}
        emissiveIntensity={0.5}
        roughness={0.15}
        metalness={0.6}
        distort={reduced ? 0.1 : 0.35}
        speed={1.5 * velocity}
        transparent
        opacity={wire ? 0.9 : 0.85}
      />
    </mesh>
  );
}
