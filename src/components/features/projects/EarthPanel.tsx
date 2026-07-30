"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";

interface EarthPanelProps {
  onClose: () => void;
}

export default function EarthPanel({ onClose }: EarthPanelProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="panel-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Profile Panel"
      >
        <motion.div
          className="panel-card"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "600px" }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close profile panel"
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--color-muted)",
              zIndex: 20,
              touchAction: "manipulation",
            }}
          >
            <X size={16} />
          </button>

          {/* Profile header */}
          <div
            className="mobile-stack"
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "flex-start",
              marginBottom: "2rem",
            }}
          >
            {/* Profile Avatar / Photo */}
            <div
              style={{
                width: "84px",
                height: "84px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #254441 0%, #5E7C7B 100%)",
                border: "3px solid rgba(217,119,87,0.4)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                boxShadow: "0 0 24px rgba(37,68,65,0.4)",
                overflow: "hidden",
              }}
              aria-label="Profile avatar"
            >
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith(".jpeg")) {
                    target.src = "/images/avatar.jpg";
                  } else if (target.src.endsWith(".jpg")) {
                    target.src = "/images/avatar.png";
                  } else {
                    target.style.display = "none";
                  }
                }}
              />
              <span style={{ position: "absolute", zIndex: -1 }}>🧑‍🚀</span>
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "var(--color-accent)",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                }}
              >
                ○ MISSION COMMANDER
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                }}
              >
                {profile.name}
              </h1>
              <div
                style={{
                  fontSize: "1rem",
                  color: "var(--color-secondary)",
                  fontWeight: 500,
                  marginBottom: "0.75rem",
                }}
              >
                {profile.title}
              </div>

              {/* Availability badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(74,155,142,0.08)",
                  border: "1px solid rgba(74,155,142,0.25)",
                  borderRadius: "var(--radius-full)",
                  padding: "4px 12px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#4A9B8E",
                    animation: "pulse-dot 2s infinite",
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    color: "#4A9B8E",
                    textTransform: "uppercase",
                  }}
                >
                  {profile.status}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "var(--color-accent)",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Current Mission
            </div>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-muted)",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              &ldquo;{profile.currentMission}&rdquo;
            </p>
          </div>

          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-muted)",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            {profile.bio}
          </p>

          {/* Stats */}
          <div
            className="profile-stats-grid"
            style={{
              marginBottom: "1.5rem",
            }}
          >
            {profile.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.06, duration: 0.3 }}
                style={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.75rem 0.6rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    marginBottom: "3px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "9px",
                    letterSpacing: "0.08em",
                    color: "var(--color-muted)",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href={profile.resumeUrl}
              download
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--color-surface)",
                background: "var(--color-primary)",
                padding: "11px 20px",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                flex: "1 1 160px",
                minHeight: "42px",
                textAlign: "center",
              }}
            >
              <Download size={14} />
              Download Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--color-primary)",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border-md)",
                padding: "11px 20px",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                flex: "1 1 160px",
                minHeight: "42px",
                textAlign: "center",
              }}
            >
              <Mail size={14} />
              Get In Touch
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
