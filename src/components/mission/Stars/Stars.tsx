"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Stars() {
  const meshRef = useRef<THREE.Points>(null);

  // Generate star positions
  const count = 2000;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 30 + Math.random() * 120;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    sizes[i] = Math.random() * 2.5 + 0.5;

    // Slight warm color variation
    const warmth = Math.random();
    colors[i * 3] = 0.85 + warmth * 0.15;     // R
    colors[i * 3 + 1] = 0.85 + warmth * 0.08; // G
    colors[i * 3 + 2] = 0.85;                  // B
  }

  useFrame(() => {
    if (!meshRef.current) return;
    const t = performance.now() * 0.001;
    // Very slow drift rotation
    meshRef.current.rotation.y = t * 0.008;
    meshRef.current.rotation.x = Math.sin(t * 0.003) * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}
