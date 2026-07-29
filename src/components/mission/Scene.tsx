"use client";

import { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Cpu, FolderGit2, FileText, GitBranch, BookOpen, Send } from "lucide-react";
import Stars from "./Stars/Stars";
import Earth from "./Earth/Earth";
import OrbitRing from "./Orbit/OrbitRing";
import Planet, { PlanetConfig } from "./Planet/Planet";

// Astronomical Planet definitions with Lucide Icons and 3D surface configurations
const PLANETS: PlanetConfig[] = [
  {
    id: "skills",
    name: "Skills",
    Icon: Cpu,
    color: "#5E7C7B",
    secondaryColor: "#254441",
    emissive: "#1a3a38",
    size: 0.58,
    orbitRadius: 3.8,
    orbitSpeed: 0.2,
    rotationSpeed: 0.5,
    orbitOffset: 0,
    tilt: 0.2,
    type: "terrestrial",
    hasClouds: true,
  },
  {
    id: "projects",
    name: "Projects",
    Icon: FolderGit2,
    color: "#4A9B8E",
    secondaryColor: "#1A5C54",
    emissive: "#1A5C54",
    size: 0.72,
    orbitRadius: 5.6,
    orbitSpeed: 0.15,
    rotationSpeed: 0.4,
    orbitOffset: Math.PI / 3,
    tilt: 0.35,
    type: "gas",
    hasRings: true,
    ringColor: "#4A9B8E",
  },
  {
    id: "resume",
    name: "Resume",
    Icon: FileText,
    color: "#C4956A",
    secondaryColor: "#7A5030",
    emissive: "#7A5030",
    size: 0.54,
    orbitRadius: 7.2,
    orbitSpeed: 0.11,
    rotationSpeed: 0.35,
    orbitOffset: (2 * Math.PI) / 3,
    tilt: 0.15,
    type: "rocky",
  },
  {
    id: "github",
    name: "GitHub",
    Icon: GitBranch,
    color: "#8B8FA8",
    secondaryColor: "#3D4060",
    emissive: "#3D4060",
    size: 0.5,
    orbitRadius: 8.8,
    orbitSpeed: 0.08,
    rotationSpeed: 0.3,
    orbitOffset: Math.PI,
    tilt: 0.25,
    type: "rocky",
  },
  {
    id: "blog",
    name: "Blog",
    Icon: BookOpen,
    color: "#7C6FAE",
    secondaryColor: "#3D3566",
    emissive: "#3D3566",
    size: 0.46,
    orbitRadius: 10.4,
    orbitSpeed: 0.06,
    rotationSpeed: 0.25,
    orbitOffset: (4 * Math.PI) / 3,
    tilt: 0.1,
    type: "gas",
    hasRings: true,
    ringColor: "#7C6FAE",
  },
  {
    id: "contact",
    name: "Contact",
    Icon: Send,
    color: "#D97757",
    secondaryColor: "#8C3E1F",
    emissive: "#8C3E1F",
    size: 0.5,
    orbitRadius: 12.0,
    orbitSpeed: 0.05,
    rotationSpeed: 0.2,
    orbitOffset: (5 * Math.PI) / 3,
    tilt: 0.35,
    type: "terrestrial",
    hasClouds: true,
  },
];

// Initial camera framing
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

      {/* Realistic Space Lighting */}
      <ambientLight intensity={0.25} color="#FCFBF9" />
      <directionalLight
        position={[12, 18, 12]}
        intensity={1.8}
        color="#FFF5EA"
        castShadow
      />
      <pointLight position={[-10, 6, -10]} intensity={0.6} color="#5E7C7B" />
      <pointLight position={[10, -6, 10]} intensity={0.5} color="#D97757" />

      {/* Starfield */}
      <Stars />

      {/* Central Commander Earth */}
      <Earth onClick={() => onPlanetClick("earth")} />

      {/* Planetary Orbit Rings */}
      {PLANETS.map((p) => (
        <OrbitRing
          key={`orbit-${p.id}`}
          radius={p.orbitRadius}
          tilt={p.tilt}
          opacity={0.14}
          color="#5E7C7B"
        />
      ))}

      {/* Orbiting Planets */}
      {PLANETS.map((p) => (
        <Planet key={p.id} {...p} onClick={onPlanetClick} />
      ))}

      {/* Orbit Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={32}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.1}
        autoRotate
        autoRotateSpeed={0.12}
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
        toneMappingExposure: 0.9,
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, #04060A 0%, #090D18 50%, #04060A 100%)",
      }}
      aria-label="Mission Control 3D space scene"
    >
      <SceneContent onPlanetClick={onPlanetClick} />
    </Canvas>
  );
}
