"use client";

import { useRef, useCallback } from "react";

/**
 * Procedural UI sound system using the Web Audio API.
 * No audio files required — all sounds are synthesized on the fly.
 * Inspired by macOS UI sounds: subtle, warm, non-intrusive.
 */

type SoundId =
  | "hover"        // Soft tick on planet hover
  | "click"        // Planet click — warm thud
  | "open"         // Panel open — rising chime
  | "close"        // Panel close — falling chime
  | "launch"       // Launch sequence countdown tick
  | "ignition"     // T-0 IGNITION burst
  | "terminal"     // Terminal key press
  | "success"      // Command success
  | "error";       // Command not found

export function useSound(volume = 0.18) {
  const ctxRef = useRef<AudioContext | null>(null);
  const enabled = useRef(true);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    // Resume if suspended (browser autoplay policy)
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (id: SoundId) => {
      if (!enabled.current) return;
      const ctx = getCtx();
      if (!ctx) return;

      const masterGain = ctx.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (id) {
        case "hover": {
          // Very soft, quick sine blip
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(1100, now + 0.04);
          g.gain.setValueAtTime(0.5, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.connect(g);
          g.connect(masterGain);
          osc.start(now);
          osc.stop(now + 0.08);
          break;
        }

        case "click": {
          // Warm thud — sine + slight noise
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);
          g.gain.setValueAtTime(1, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.connect(g);
          g.connect(masterGain);
          osc.start(now);
          osc.stop(now + 0.15);
          break;
        }

        case "open": {
          // Rising chime — two sine tones
          [0, 0.06].forEach((delay, i) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = "sine";
            const freq = i === 0 ? 660 : 880;
            osc.frequency.setValueAtTime(freq, now + delay);
            g.gain.setValueAtTime(0, now + delay);
            g.gain.linearRampToValueAtTime(0.6, now + delay + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.25);
            osc.connect(g);
            g.connect(masterGain);
            osc.start(now + delay);
            osc.stop(now + delay + 0.3);
          });
          break;
        }

        case "close": {
          // Falling chime
          [0, 0.06].forEach((delay, i) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = "sine";
            const freq = i === 0 ? 660 : 440;
            osc.frequency.setValueAtTime(freq, now + delay);
            g.gain.setValueAtTime(0, now + delay);
            g.gain.linearRampToValueAtTime(0.5, now + delay + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.2);
            osc.connect(g);
            g.connect(masterGain);
            osc.start(now + delay);
            osc.stop(now + delay + 0.25);
          });
          break;
        }

        case "launch": {
          // Countdown tick — crisp click
          const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
          const data = buf.getChannelData(0);
          for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.01));
          }
          const src = ctx.createBufferSource();
          const g = ctx.createGain();
          src.buffer = buf;
          g.gain.value = 0.6;
          src.connect(g);
          g.connect(masterGain);
          src.start(now);
          break;
        }

        case "ignition": {
          // Rising rumble burst
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(40, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.8);
          g.gain.setValueAtTime(0, now);
          g.gain.linearRampToValueAtTime(0.8, now + 0.1);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
          osc.connect(g);
          g.connect(masterGain);
          osc.start(now);
          osc.stop(now + 1);
          break;
        }

        case "terminal": {
          // Very quiet keyboard click
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(1200, now);
          g.gain.setValueAtTime(0.15, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
          osc.connect(g);
          g.connect(masterGain);
          osc.start(now);
          osc.stop(now + 0.035);
          break;
        }

        case "success": {
          // Gentle ascending arpeggio
          [0, 0.08, 0.16].forEach((delay, i) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime([523, 659, 784][i], now + delay);
            g.gain.setValueAtTime(0.4, now + delay);
            g.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.2);
            osc.connect(g);
            g.connect(masterGain);
            osc.start(now + delay);
            osc.stop(now + delay + 0.25);
          });
          break;
        }

        case "error": {
          // Low, short descending buzz
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
          g.gain.setValueAtTime(0.3, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
          osc.connect(g);
          g.connect(masterGain);
          osc.start(now);
          osc.stop(now + 0.2);
          break;
        }
      }
    },
    [getCtx, volume]
  );

  const toggle = useCallback(() => {
    enabled.current = !enabled.current;
    return enabled.current;
  }, []);

  const setEnabled = useCallback((val: boolean) => {
    enabled.current = val;
  }, []);

  return { play, toggle, setEnabled };
}
