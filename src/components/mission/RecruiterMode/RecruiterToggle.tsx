"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RecruiterToggleProps {
  onToggle: (active: boolean) => void;
}

export default function RecruiterToggle({ onToggle }: RecruiterToggleProps) {
  const [active, setActive] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggle = () => {
    const next = !active;
    setActive(next);
    onToggle(next);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "4.5rem",
        right: "1.5rem",
        zIndex: "var(--z-hud)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "6px",
      }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "10px",
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.65)",
              background: "rgba(6,8,15,0.9)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "var(--radius-md)",
              padding: "6px 12px",
              whiteSpace: "nowrap",
            }}
          >
            {active ? "Back to Mission Control" : "Switch to Recruiter Mode"}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        aria-label={
          active ? "Exit recruiter mode" : "Enter recruiter mode — clean portfolio view"
        }
        aria-pressed={active}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: active ? "#06080F" : "rgba(255,255,255,0.7)",
          background: active
            ? "linear-gradient(135deg, #D97757, #E6B17E)"
            : "rgba(6,8,15,0.85)",
          border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "var(--radius-full)",
          padding: "8px 14px",
          cursor: "pointer",
          backdropFilter: "blur(12px)",
          boxShadow: active
            ? "0 8px 24px rgba(217,119,87,0.35)"
            : "0 4px 12px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
        }}
      >
        <span aria-hidden="true">{active ? "✦" : "☰"}</span>
        {active ? "3D MODE" : "RECRUITER MODE"}
      </motion.button>
    </div>
  );
}
