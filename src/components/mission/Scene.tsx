"use client";

import { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Stars from "./Stars/Stars";
import Earth from "./Earth/Earth";
import OrbitRing from "./Orbit/OrbitRing";
import Planet, { PlanetConfig } from "./Planet/Planet";

// Planet definitions
const PLANETS: PlanetConfig[] = [
  {
    id: "skills",
    name: "Skills",
    icon: "◈",
    color: "#5E7C7B",
    emissive: "#1a3a38",
    size: 0.55,
    orbitRadius: 3.5,
    orbitSpeed: 0.22,
    rotationSpeed: 0.5,
    orbitOffset: 0,
    tilt: 0.2,
  },
  {
    id: "projects",
    name: "Projects",
    icon: "✦",
    color: "#4A9B8E",
    emissive: "#1A5C54",
    size: 0.65,
    orbitRadius: 5.2,
    orbitSpeed: 0.16,
    rotationSpeed: 0.4,
    orbitOffset: Math.PI / 3,
    tilt: 0.3,
  },
  {
    id: "resume",
    name: "Resume",
    icon: "◉",
    color: "#C4956A",
    emissive: "#7A5030",
    size: 0.5,
    orbitRadius: 6.8,
    orbitSpeed: 0.11,
    rotationSpeed: 0.35,
    orbitOffset: (2 * Math.PI) / 3,
    tilt: 0.15,
  },
  {
    id: "github",
    name: "GitHub",
    icon: "◎",
    color: "#8B8FA8",
    emissive: "#3D4060",
    size: 0.48,
    orbitRadius: 8.2,
    orbitSpeed: 0.08,
    rotationSpeed: 0.3,
    orbitOffset: Math.PI,
    tilt: 0.25,
  },
  {
    id: "blog",
    name: "Blog",
    icon: "✧",
    color: "#7C6FAE",
    emissive: "#3D3566",
    size: 0.42,
    orbitRadius: 9.8,
    orbitSpeed: 0.06,
    rotationSpeed: 0.25,
    orbitOffset: (4 * Math.PI) / 3,
    tilt: 0.1,
  },
  {
    id: "contact",
    name: "Contact",
    icon: "⊕",
    color: "#D97757",
    emissive: "#8C3E1F",
    size: 0.45,
    orbitRadius: 11.5,
    orbitSpeed: 0.05,
    rotationSpeed: 0.2,
    orbitOffset: (5 * Math.PI) / 3,
    tilt: 0.35,
  },
];

// Ambient particles connecting lines effect
function ConnectionLines() {
  return null; // Rendered as CSS in HUD for performance
}

// Camera auto-position on mount
function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 6, 18);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

interface SceneProps {
  onPlanetClick: (id: string) => void;
}

function SceneContent({ onPlanetClick }: SceneProps) {
  return (
    <>
      <CameraSetup />

      {/* Lighting */}
      <ambientLight intensity={0.15} color="#FCFBF9" />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        color="#F7F5F2"
        castShadow
      />
      <pointLight position={[-8, 5, -8]} intensity={0.4} color="#5E7C7B" />
      <pointLight position={[8, -5, 8]} intensity={0.3} color="#D97757" />

      {/* Stars */}
      <Stars />

      {/* Earth (center) */}
      <Earth onClick={() => onPlanetClick("earth")} />

      {/* Orbit Rings */}
      {PLANETS.map((p) => (
        <OrbitRing
          key={`orbit-${p.id}`}
          radius={p.orbitRadius}
          tilt={p.tilt}
          opacity={0.12}
          color="#5E7C7B"
        />
      ))}

      {/* Planets */}
      {PLANETS.map((p) => (
        <Planet key={p.id} {...p} onClick={onPlanetClick} />
      ))}

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={30}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.1}
        autoRotate
        autoRotateSpeed={0.15}
        dampingFactor={0.05}
        enableDamping
      />
    </>
  );
}

export default function Scene({ onPlanetClick }: SceneProps) {
  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.8,
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, #06080F 0%, #0B0F1A 50%, #06080F 100%)",
      }}
      aria-label="Mission Control 3D space scene"
    >
      <SceneContent onPlanetClick={onPlanetClick} />
    </Canvas>
  );
}
