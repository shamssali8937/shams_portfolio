"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { profile } from "@/data/profile";
import { useSound } from "@/hooks/useSound";
import { createTerrestrialTexture, createCloudTexture, createBumpMap } from "@/utils/textures";
import { User } from "lucide-react";

interface EarthProps {
  onClick: () => void;
}

export default function Earth({ onClick }: EarthProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { play } = useSound(0.15);

  const { surfaceTexture, cloudTexture, bumpMap } = useMemo(() => {
    if (typeof window === "undefined") {
      return { surfaceTexture: null, cloudTexture: null, bumpMap: null };
    }
    return {
      surfaceTexture: createTerrestrialTexture("#1C3F3A", "#4A9B8E", { seed: 101 }),
      cloudTexture: createCloudTexture({ seed: 202 }),
      bumpMap: createBumpMap({ seed: 303 }),
    };
  }, []);

  useFrame(() => {
    const t = performance.now() * 0.001;
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.12;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.06;
      ringRef.current.rotation.x = Math.sin(t * 0.04) * 0.05;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.08;
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    play("hover");
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    play("click");
    onClick();
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial
          color="#4A9B8E"
          transparent
          opacity={hovered ? 0.3 : 0.15}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Main Earth Body with Procedural Ocean & Continents Map */}
      <mesh
        ref={sphereRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={surfaceTexture}
          bumpMap={bumpMap}
          bumpScale={0.04}
          roughness={0.65}
          metalness={0.2}
          emissive="#254441"
          emissiveIntensity={hovered ? 0.35 : 0.15}
        />
      </mesh>

      {/* Cloud Layer */}
      {cloudTexture && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1.035, 48, 48]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Orbit Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.45, 0.008, 16, 100]} />
        <meshBasicMaterial
          color="#D97757"
          transparent
          opacity={hovered ? 0.8 : 0.35}
        />
      </mesh>

      {/* Label Overlay with Lucide User Icon */}
      <Html center position={[0, 1.75, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "var(--font-jetbrains), monospace",
            transition: "all 0.25s ease",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(6,8,15,0.85)",
              border: `1.5px solid ${hovered ? "#D97757" : "rgba(74,155,142,0.4)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: hovered ? "#D97757" : "#4A9B8E",
              boxShadow: hovered ? "0 0 16px rgba(217,119,87,0.6)" : "0 0 10px rgba(74,155,142,0.3)",
              marginBottom: "4px",
              transition: "all 0.25s ease",
            }}
          >
            <User size={16} />
          </div>

          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              fontWeight: 700,
              textTransform: "uppercase",
              color: hovered ? "#E6B17E" : "rgba(255,255,255,0.75)",
              textShadow: hovered ? "0 0 12px rgba(230,177,126,0.6)" : "none",
              whiteSpace: "nowrap",
            }}
          >
            {profile.name}
          </div>

          <div
            style={{
              fontSize: "8px",
              color: "var(--color-secondary)",
              letterSpacing: "0.1em",
              marginTop: "2px",
            }}
          >
            COMMANDER · EARTH
          </div>
        </div>
      </Html>
    </group>
  );
}
