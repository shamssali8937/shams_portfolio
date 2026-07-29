"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Radar = dynamic(() => import("../Radar/Radar"), { ssr: false });

export default function HUD() {
  const [time, setTime] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({
        x: Math.round((e.clientX / window.innerWidth) * 360 - 180),
        y: Math.round((e.clientY / window.innerHeight) * 180 - 90),
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Top HUD Bar */}
      <header
        className="hud-bar hud-top"
        role="banner"
        aria-label="Mission Control HUD"
      >
        <div className="glass-dark rounded-full px-4 py-2 flex items-center gap-3">
          <span className="hud-dot" aria-hidden="true" />
          <span className="hud-text">MISSION CONTROL</span>
          <span className="hud-line w-8" aria-hidden="true" />
          <span
            className="hud-text"
            style={{ color: "rgba(230,177,126,0.7)" }}
          >
            SHAMS SALI
          </span>
        </div>

        <div className="hud-line" aria-hidden="true" />

        <div className="glass-dark rounded-full px-4 py-2">
          <span className="hud-text" aria-label={`Current time: ${time}`}>
            {time}
          </span>
        </div>
      </header>

      {/* Bottom HUD Bar */}
      <footer className="hud-bar hud-bottom" role="contentinfo">
        <div className="glass-dark rounded-full px-4 py-2 flex items-center gap-3">
          <span
            className="hud-text"
            style={{ color: "rgba(217,119,87,0.7)" }}
          >
            SYS
          </span>
          <span className="hud-text">ALL SYSTEMS NOMINAL</span>
        </div>

        <div className="hud-line" aria-hidden="true" />

        <nav
          className="glass-dark rounded-full px-4 py-2 flex items-center gap-4"
          aria-label="Quick navigation hints"
        >
          <span className="hud-text">CLICK PLANET TO EXPLORE</span>
          <span
            className="hud-text"
            style={{ color: "rgba(255,255,255,0.2)" }}
            aria-hidden="true"
          >
            ·
          </span>
          <span className="hud-text">
            PRESS{" "}
            <kbd
              style={{
                background: "rgba(255,255,255,0.08)",
                padding: "1px 5px",
                borderRadius: "3px",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
              }}
            >
              `
            </kbd>{" "}
            FOR TERMINAL
          </span>
        </nav>

        <div className="hud-line" aria-hidden="true" />

        <div className="glass-dark rounded-full px-4 py-2">
          <span
            className="hud-text"
            aria-label={`Cursor position: ${coords.x}° longitude, ${coords.y}° latitude`}
          >
            {coords.x.toString().padStart(4, " ")}° /{" "}
            {coords.y.toString().padStart(4, " ")}°
          </span>
        </div>
      </footer>

      {/* Radar — floating above bottom-right */}
      <div
        style={{
          position: "fixed",
          bottom: "4rem",
          right: "1.5rem",
          zIndex: "var(--z-hud)",
        }}
        aria-hidden="true"
      >
        <div
          className="glass-dark"
          style={{
            borderRadius: "50%",
            padding: "6px",
            border: "1px solid rgba(94,124,123,0.2)",
          }}
        >
          <Radar size={120} />
        </div>
      </div>
    </>
  );
}
