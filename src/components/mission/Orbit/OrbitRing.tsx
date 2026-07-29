"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbitRingProps {
  radius: number;
  tilt?: number;
  opacity?: number;
  color?: string;
  dashed?: boolean;
}

export default function OrbitRing({
  radius,
  tilt = 0,
  opacity = 0.15,
  color = "#5E7C7B",
  dashed = true,
}: OrbitRingProps) {
  const ringRef = useRef<THREE.Mesh>(null);

  // Create ellipse curve
  const curve = new THREE.EllipseCurve(
    0,
    0,
    radius,
    radius * 0.92, // slight ellipse
    0,
    2 * Math.PI,
    false,
    0
  );
  const points = curve.getPoints(128);
  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(p.x, 0, p.y))
  );

  return (
    <group rotation={[tilt, 0, 0]}>
      <lineLoop>
        <bufferGeometry
          attributes={{
            position: geometry.attributes.position,
          }}
        />
        <lineBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </lineLoop>
    </group>
  );
}
