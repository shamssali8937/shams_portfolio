"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RecruiterToggleProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

export default function RecruiterToggle({ isActive, onToggle }: RecruiterToggleProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: "4.25rem",
        right: "1.25rem",
        // Must sit above RecruiterView overlay (z-overlay = 2000) when active
        zIndex: isActive ? 3000 : 50,
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
            {isActive ? "Back to 3D Mission Control" : "Switch to Recruiter Mode"}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => onToggle(!isActive)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        aria-label={
          isActive ? "Exit recruiter mode" : "Enter recruiter mode — clean portfolio view"
        }
        aria-pressed={isActive}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: isActive ? "#06080F" : "rgba(255,255,255,0.7)",
          background: isActive
            ? "linear-gradient(135deg, #D97757, #E6B17E)"
            : "rgba(6,8,15,0.85)",
          border: `1px solid ${isActive ? "transparent" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "var(--radius-full)",
          padding: "8px 14px",
          cursor: "pointer",
          backdropFilter: "blur(12px)",
          boxShadow: isActive
            ? "0 8px 24px rgba(217,119,87,0.35)"
            : "0 4px 12px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
        }}
      >
        <span aria-hidden="true">{isActive ? "✦" : "☰"}</span>
        {isActive ? "3D MODE" : "RECRUITER MODE"}
      </motion.button>
    </div>
  );
}
