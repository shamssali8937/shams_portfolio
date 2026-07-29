"use client";

import { useRef, useEffect } from "react";

interface RadarProps {
  /** Activity pings to display on the radar */
  pings?: Array<{ angle: number; distance: number; label: string }>;
  size?: number;
}

// Simulated GitHub activity pings
const DEFAULT_PINGS = [
  { angle: 30,  distance: 0.35, label: "CareerBridge" },
  { angle: 110, distance: 0.6,  label: "PGNexus" },
  { angle: 200, distance: 0.45, label: "Dewan Traders" },
  { angle: 290, distance: 0.7,  label: "Future Labs" },
  { angle: 60,  distance: 0.55, label: "Commit" },
  { angle: 150, distance: 0.3,  label: "PR Merged" },
  { angle: 240, distance: 0.65, label: "Issue Closed" },
  { angle: 330, distance: 0.5,  label: "Release" },
];

export default function Radar({ pings = DEFAULT_PINGS, size = 140 }: RadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sweepAngle = useRef(0);
  const frameRef = useRef<number>(0);
  const visiblePings = useRef<Array<{ ping: typeof pings[0]; opacity: number; detected: boolean }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 4;

    // Initialize ping visibility
    visiblePings.current = pings.map((ping) => ({
      ping,
      opacity: 0,
      detected: false,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Background
      ctx.fillStyle = "rgba(6, 8, 15, 0.85)";
      ctx.beginPath();
      ctx.arc(cx, cy, r + 2, 0, Math.PI * 2);
      ctx.fill();

      // Grid rings
      [0.25, 0.5, 0.75, 1].forEach((frac) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r * frac, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(94, 124, 123, 0.15)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Cross-hairs
      ctx.strokeStyle = "rgba(94, 124, 123, 0.12)";
      ctx.lineWidth = 0.5;
      [[cx, cy - r, cx, cy + r], [cx - r, cy, cx + r, cy]].forEach(
        ([x1, y1, x2, y2]) => {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      );

      // Sweep gradient
      const sweepRad = (sweepAngle.current * Math.PI) / 180;
      const ctxAny = ctx as unknown as { createConicGradient?: unknown };
      const grad = ctxAny.createConicGradient ? null : null;

      // Draw sweep as filled arc sector
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, sweepRad - Math.PI * 0.6, sweepRad, false);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      sweepGrad.addColorStop(0, "rgba(74, 155, 142, 0.0)");
      sweepGrad.addColorStop(0.7, "rgba(74, 155, 142, 0.06)");
      sweepGrad.addColorStop(1, "rgba(74, 155, 142, 0.15)");
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      // Sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(sweepRad) * r,
        cy + Math.sin(sweepRad) * r
      );
      ctx.strokeStyle = "rgba(74, 155, 142, 0.7)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Update ping detection
      visiblePings.current.forEach((vp) => {
        const pingAngle = vp.ping.angle;
        const sweepDeg = sweepAngle.current % 360;
        const diff = (sweepDeg - pingAngle + 360) % 360;
        if (diff < 4) {
          vp.detected = true;
          vp.opacity = 1;
        } else if (vp.detected) {
          vp.opacity = Math.max(0, vp.opacity - 0.008);
        }
      });

      // Draw pings
      visiblePings.current.forEach(({ ping, opacity }) => {
        if (opacity <= 0) return;
        const a = (ping.angle * Math.PI) / 180;
        const d = ping.distance * r;
        const px = cx + Math.cos(a) * d;
        const py = cy + Math.sin(a) * d;

        // Glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 8);
        glow.addColorStop(0, `rgba(217, 119, 87, ${opacity * 0.9})`);
        glow.addColorStop(0.4, `rgba(217, 119, 87, ${opacity * 0.3})`);
        glow.addColorStop(1, "rgba(217, 119, 87, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        // Dot
        ctx.fillStyle = `rgba(217, 119, 87, ${opacity})`;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Center dot
      ctx.fillStyle = "rgba(74, 155, 142, 0.9)";
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(94, 124, 123, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      sweepAngle.current = (sweepAngle.current + 0.6) % 360;
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [pings, size]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
      }}
      role="img"
      aria-label="GitHub activity radar"
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ borderRadius: "50%", display: "block" }}
      />
      <div
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "8px",
          letterSpacing: "0.15em",
          color: "rgba(94,124,123,0.6)",
          textTransform: "uppercase",
        }}
      >
        SATELLITE RADAR
      </div>
    </div>
  );
}
