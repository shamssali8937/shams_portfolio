"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export interface UseLenisOptions {
  /** Whether to initialize Lenis. Set false for 3D Mission Control view. */
  enabled?: boolean;
  duration?: number;
  easing?: (t: number) => number;
}

/**
 * Initializes Lenis smooth scroll.
 * Only active when `enabled` is true (i.e. Recruiter Mode).
 * Returns the Lenis instance for manual control if needed.
 */
export function useLenis({
  enabled = true,
  duration = 1.2,
  easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
}: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      // Clean up any existing instance
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const lenis = new Lenis({
      duration,
      easing,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, duration, easing]);

  return lenisRef;
}
