import { useRef, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
}

const PLANET_TARGETS: Record<string, CameraTarget> = {
  earth:    { position: [0, 2, 4],     lookAt: [0, 0, 0] },
  skills:   { position: [4, 2, 6],     lookAt: [3, 0, 0] },
  projects: { position: [6, 3, 8],     lookAt: [4, 0, 0] },
  resume:   { position: [-6, 3, 8],    lookAt: [-5, 0, 0] },
  github:   { position: [-8, 4, 10],   lookAt: [-6, 0, 0] },
  blog:     { position: [9, 4, 12],    lookAt: [7, 0, 0] },
  contact:  { position: [-10, 4, 14],  lookAt: [-8, 0, 0] },
};

const DEFAULT_TARGET: CameraTarget = {
  position: [0, 6, 18],
  lookAt: [0, 0, 0],
};

/**
 * Hook for smooth camera transitions in the 3D scene.
 * Call `flyTo(planetId)` to animate the camera toward a planet,
 * or `reset()` to return to the default overview position.
 */
export function useCameraControl() {
  const { camera } = useThree();
  const animFrameRef = useRef<number>(0);
  const isAnimating = useRef(false);

  const animateTo = useCallback(
    (target: CameraTarget, duration = 1200) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const startPos = camera.position.clone();
      const endPos = new THREE.Vector3(...target.position);
      const endLook = new THREE.Vector3(...target.lookAt);
      const startTime = performance.now();

      isAnimating.current = true;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        // Ease-out expo
        const t = Math.min(elapsed / duration, 1);
        const ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

        camera.position.lerpVectors(startPos, endPos, ease);
        camera.lookAt(endLook.clone().lerp(endLook, ease));

        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          isAnimating.current = false;
        }
      };

      animFrameRef.current = requestAnimationFrame(tick);
    },
    [camera]
  );

  const flyTo = useCallback(
    (planetId: string) => {
      const target = PLANET_TARGETS[planetId] ?? DEFAULT_TARGET;
      animateTo(target);
    },
    [animateTo]
  );

  const reset = useCallback(() => {
    animateTo(DEFAULT_TARGET, 1600);
  }, [animateTo]);

  return { flyTo, reset, isAnimating };
}
