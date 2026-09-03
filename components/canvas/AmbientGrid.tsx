"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePlayground } from "@/store/usePlayground";

/**
 * Drifting wire grid on the floor plane + a slow-rotating far ring.
 * Cheap: a single Grid-ish shader material on one plane, no post-processing.
 */
export default function AmbientGrid() {
  const grid = useRef<THREE.Mesh>(null);
  const theme = usePlayground((s) => s.theme);
  const velocity = usePlayground((s) => s.motionVelocity);
  const reduced = usePlayground((s) => s.reducedMotion);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(theme === "WIREFRAME" ? "#7fd4ff" : "#5b7cff") },
        uWire: { value: theme === "WIREFRAME" ? 1 : 0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uWire;
        uniform vec3 uColor;
        float grid(vec2 uv, float div) {
          vec2 g = abs(fract(uv * div - 0.5) - 0.5) / fwidth(uv * div);
          return 1.0 - min(min(g.x, g.y), 1.0);
        }
        void main() {
          vec2 uv = vUv;
          uv.y += uTime * 0.03;
          float g = grid(uv, 40.0) * 0.5 + grid(uv, 8.0) * 0.5;
          float fade = smoothstep(0.9, 0.15, distance(vUv, vec2(0.5)));
          float a = g * fade * (uWire > 0.5 ? 0.9 : 0.5);
          gl_FragColor = vec4(uColor, a);
        }
      `,
    });
  }, [theme]);

  useFrame((_, delta) => {
    if (reduced) return;
    material.uniforms.uTime.value += delta * velocity;
    if (grid.current) grid.current.rotation.z += delta * 0.02 * velocity;
  });

  return (
    <group>
      <mesh
        ref={grid}
        rotation={[-Math.PI / 2.05, 0, 0]}
        position={[0, -3.4, -2]}
        material={material}
      >
        <planeGeometry args={[42, 42, 1, 1]} />
      </mesh>
      <mesh position={[0, 0, -12]}>
        <ringGeometry args={[9, 9.04, 96]} />
        <meshBasicMaterial color="#3b4a8f" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
