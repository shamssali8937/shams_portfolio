"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useSound } from "@/hooks/useSound";
import {
  createTerrestrialTexture,
  createGasGiantTexture,
  createRockyTexture,
  createBumpMap,
  createRingTexture,
  createCloudTexture,
} from "@/utils/textures";
import { LucideIcon } from "lucide-react";

export interface PlanetConfig {
  id: string;
  name: string;
  Icon?: LucideIcon;
  color: string;
  secondaryColor?: string;
  emissive: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  orbitOffset?: number;
  tilt?: number;
  type?: "terrestrial" | "gas" | "rocky";
  hasRings?: boolean;
  ringColor?: string;
  hasClouds?: boolean;
}

interface PlanetProps extends PlanetConfig {
  onClick: (id: string) => void;
}

export default function Planet({
  id,
  name,
  Icon,
  color,
  secondaryColor = "#1a3533",
  emissive,
  size,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  orbitOffset = 0,
  tilt = 0.2,
  type = "terrestrial",
  hasRings = false,
  ringColor = "#E6B17E",
  hasClouds = false,
  onClick,
}: PlanetProps) {
  const planetBodyRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { play } = useSound(0.15);

  const { surfaceTexture, bumpMap, ringTexture, cloudTexture } = useMemo(() => {
    if (typeof window === "undefined") {
      return { surfaceTexture: null, bumpMap: null, ringTexture: null, cloudTexture: null };
    }

    let texture: THREE.CanvasTexture;
    if (type === "gas") {
      texture = createGasGiantTexture(color, secondaryColor, { seed: id.length * 17 });
    } else if (type === "rocky") {
      texture = createRockyTexture(color, { seed: id.length * 29 });
    } else {
      texture = createTerrestrialTexture(color, secondaryColor, { seed: id.length * 43 });
    }

    const bump = createBumpMap({ seed: id.length * 13 });
    const ring = hasRings ? createRingTexture(ringColor) : null;
    const clouds = hasClouds ? createCloudTexture({ seed: id.length * 7 }) : null;

    return { surfaceTexture: texture, bumpMap: bump, ringTexture: ring, cloudTexture: clouds };
  }, [id, type, color, secondaryColor, hasRings, ringColor, hasClouds]);

  useFrame(() => {
    const t = performance.now() * 0.001;
    // Perfectly lock position along the elliptical orbit line (y = 0 inside tilted group)
    if (planetBodyRef.current) {
      const angle = t * orbitSpeed + orbitOffset;
      planetBodyRef.current.position.x = Math.cos(angle) * orbitRadius;
      planetBodyRef.current.position.z = Math.sin(angle) * orbitRadius * 0.92;
      planetBodyRef.current.position.y = 0;
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y += rotationSpeed * 0.008;

      const targetScale = hovered ? 1.22 : 1;
      sphereRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += rotationSpeed * 0.014;
      cloudsRef.current.rotation.x = Math.sin(t * 0.05) * 0.02;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.04;
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
    onClick(id);
  };

  const IconComponent = Icon;

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={planetBodyRef}>
        {/* Outer Fresnel Atmospheric Rim Glow */}
        <mesh>
          <sphereGeometry args={[size * 1.28, 48, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered ? 0.35 : 0.16}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Inner Fresnel Glow */}
        <mesh>
          <sphereGeometry args={[size * 1.08, 48, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered ? 0.25 : 0.1}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Main Planet Body with Ultra-HD Texture & Bump Map */}
        <mesh
          ref={sphereRef}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial
            map={surfaceTexture}
            bumpMap={bumpMap}
            bumpScale={type === "rocky" ? 0.06 : 0.04}
            roughness={type === "gas" ? 0.35 : 0.65}
            metalness={0.18}
            emissive={color}
            emissiveIntensity={hovered ? 0.4 : 0.15}
          />
        </mesh>

        {/* Atmospheric Cloud Swirl Layer */}
        {hasClouds && cloudTexture && (
          <mesh ref={cloudsRef}>
            <sphereGeometry args={[size * 1.035, 48, 48]} />
            <meshStandardMaterial
              map={cloudTexture}
              transparent
              opacity={0.5}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Saturn-Style Planetary Rings */}
        {hasRings && ringTexture && (
          <mesh ref={ringsRef} rotation={[Math.PI / 2.4, 0.18, 0]} castShadow receiveShadow>
            <ringGeometry args={[size * 1.38, size * 2.35, 96]} />
            <meshStandardMaterial
              map={ringTexture}
              color={ringColor}
              side={THREE.DoubleSide}
              transparent
              opacity={0.88}
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>
        )}

        {/* Planet Floating HUD Label */}
        <Html
          center
          position={[0, size + (hasRings ? 0.95 : 0.6), 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: "var(--font-jetbrains), monospace",
              transition: "all 0.25s ease",
              transform: hovered ? "scale(1.12)" : "scale(1)",
            }}
          >
            {IconComponent && (
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: hovered ? "rgba(6,8,15,0.92)" : "rgba(6,8,15,0.8)",
                  border: `1.5px solid ${hovered ? color : "rgba(255,255,255,0.18)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: hovered ? color : "rgba(255,255,255,0.8)",
                  boxShadow: hovered ? `0 0 18px ${color}90` : "0 4px 12px rgba(0,0,0,0.5)",
                  marginBottom: "4px",
                  transition: "all 0.25s ease",
                }}
              >
                <IconComponent size={15} />
              </div>
            )}

            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                fontWeight: 600,
                textTransform: "uppercase",
                color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.7)",
                textShadow: hovered ? `0 0 12px ${color}` : "none",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </div>

            {hovered && (
              <div
                style={{
                  fontSize: "7px",
                  color: "var(--color-accent)",
                  letterSpacing: "0.1em",
                  marginTop: "2px",
                  textTransform: "uppercase",
                }}
              >
                EXPLORE PLANET →
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
}
