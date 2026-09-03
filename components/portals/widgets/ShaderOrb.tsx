"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { usePlayground } from "@/store/usePlayground";

function Orb() {
  const mesh = useRef<THREE.Mesh>(null);
  const velocity = usePlayground((s) => s.motionVelocity);
  const reduced = usePlayground((s) => s.reducedMotion);
  useFrame((_, d) => {
    if (mesh.current && !reduced) mesh.current.rotation.y += d * 0.5 * velocity;
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.1, 6]} />
      <MeshDistortMaterial
        color="#a78bfa"
        emissive="#3b2a7a"
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.7}
        distort={reduced ? 0.05 : 0.4}
        speed={2}
      />
    </mesh>
  );
}

/** Small live R3F canvas used as a portal-tile widget. */
export default function ShaderOrb({ large = false }: { large?: boolean }) {
  return (
    <div
      className="w-full overflow-hidden rounded-lg"
      style={{ height: large ? 200 : 96 }}
      onClick={(e) => e.stopPropagation()}
    >
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.4], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={40} color="#8fb6ff" />
        <Orb />
      </Canvas>
    </div>
  );
}
