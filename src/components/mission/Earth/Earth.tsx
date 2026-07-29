"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { profile } from "@/data/profile";

interface EarthProps {
  onClick: () => void;
}

export default function Earth({ onClick }: EarthProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    const t = performance.now() * 0.001;
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.08;
      ringRef.current.rotation.x = Math.sin(t * 0.05) * 0.02;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.12, 32, 32]} />
        <meshStandardMaterial
          color="#254441"
          transparent
          opacity={hovered ? 0.18 : 0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main sphere */}
      <mesh
        ref={sphereRef}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        castShadow
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#254441"
          roughness={0.7}
          metalness={0.2}
          emissive="#1a3533"
          emissiveIntensity={hovered ? 0.4 : 0.2}
        />
      </mesh>

      {/* Orbit ring */}
      <mesh
        ref={ringRef}
        rotation={[Math.PI / 2.2, 0, 0]}
      >
        <torusGeometry args={[1.35, 0.008, 8, 80]} />
        <meshBasicMaterial
          color="#D97757"
          transparent
          opacity={hovered ? 0.7 : 0.3}
        />
      </mesh>

      {/* Label */}
      <Html
        center
        position={[0, 1.6, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: hovered
              ? "rgba(230,177,126,0.95)"
              : "rgba(255,255,255,0.55)",
            textAlign: "center",
            transition: "color 0.3s ease",
            whiteSpace: "nowrap",
            textShadow: hovered
              ? "0 0 12px rgba(230,177,126,0.5)"
              : "none",
          }}
        >
          <div style={{ marginBottom: "2px" }}>{profile.name.toUpperCase()}</div>
          <div
            style={{
              fontSize: "8px",
              color: "rgba(94,124,123,0.8)",
              letterSpacing: "0.1em",
            }}
          >
            {profile.status.toUpperCase()}
          </div>
        </div>
      </Html>

      {/* Cursor indicator on hover */}
      {hovered && (
        <Html center position={[0, -1.6, 0]} style={{ pointerEvents: "none" }}>
          <div
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "9px",
              letterSpacing: "0.1em",
              color: "rgba(217,119,87,0.8)",
              animation: "fade-in-up 0.3s ease",
            }}
          >
            CLICK TO VIEW PROFILE
          </div>
        </Html>
      )}

      {/* Point light for local illumination */}
      <pointLight color="#D97757" intensity={0.5} distance={5} />
    </group>
  );
}
