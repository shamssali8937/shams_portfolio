"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export interface PlanetConfig {
  id: string;
  name: string;
  icon: string;
  color: string;
  emissive: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  orbitOffset?: number; // initial angle offset
  tilt?: number;
}

interface PlanetProps extends PlanetConfig {
  onClick: (id: string) => void;
}

export default function Planet({
  id,
  name,
  icon,
  color,
  emissive,
  size,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  orbitOffset = 0,
  tilt = 0,
  onClick,
}: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    const t = performance.now() * 0.001;
    if (groupRef.current) {
      const angle = t * orbitSpeed + orbitOffset;
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * orbitRadius * 0.9;
      groupRef.current.position.y =
        Math.sin(angle + orbitOffset) * 0.3 + Math.sin(t * 0.2) * 0.1;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed * 0.01;
      planetRef.current.rotation.x = tilt;
      // Subtle scale pulse on hover
      const targetScale = hovered ? 1.15 : 1;
      planetRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.08
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[size * 1.4, 16, 16]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={hovered ? 0.12 : 0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Planet body */}
      <mesh
        ref={planetRef}
        onClick={() => onClick(id)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        castShadow
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.75}
          metalness={0.1}
          emissive={emissive}
          emissiveIntensity={hovered ? 0.6 : 0.25}
        />
      </mesh>

      {/* Label */}
      <Html
        center
        position={[0, size + 0.4, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: hovered
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0.45)",
            textAlign: "center",
            transition: "all 0.25s ease",
            whiteSpace: "nowrap",
            textShadow: hovered ? `0 0 10px ${color}80` : "none",
          }}
        >
          <div style={{ fontSize: "14px", marginBottom: "2px" }}>{icon}</div>
          <div>{name.toUpperCase()}</div>
          {hovered && (
            <div
              style={{
                fontSize: "7px",
                color: "rgba(217,119,87,0.8)",
                marginTop: "3px",
                letterSpacing: "0.08em",
              }}
            >
              CLICK TO OPEN
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
