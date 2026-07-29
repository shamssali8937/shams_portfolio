"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { profile } from "@/data/profile";
import { timeline } from "@/data/timeline";

interface ResumePanelProps {
  onClose: () => void;
}

const typeColors: Record<string, string> = {
  education: "#5E7C7B",
  work: "#4A9B8E",
  freelance: "#D97757",
  certification: "#7C6FAE",
  achievement: "#E6B17E",
};

const typeLabels: Record<string, string> = {
  education: "EDU",
  work: "WORK",
  freelance: "FREELANCE",
  certification: "CERT",
  achievement: "WIN",
};

export default function ResumePanel({ onClose }: ResumePanelProps) {
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
        aria-label="Resume Panel"
      >
        <motion.div
          className="panel-card"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ padding: "2.5rem" }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "2rem",
            }}
          >
            <div>
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
                ◉ MISSION LOG
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  letterSpacing: "-0.02em",
                }}
              >
                Experience & Education
              </h2>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <a
                href={profile.resumeUrl}
                download
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--color-surface)",
                  background: "var(--color-primary)",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "opacity 0.2s",
                  cursor: "pointer",
                }}
              >
                ↓ Download PDF
              </a>
              <button
                onClick={onClose}
                aria-label="Close resume panel"
                style={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--color-muted)",
                  transition: "all 0.2s",
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "6px",
                top: 0,
                bottom: 0,
                width: "1px",
                background:
                  "linear-gradient(180deg, var(--color-accent), var(--color-secondary), transparent)",
                opacity: 0.3,
              }}
              aria-hidden="true"
            />

            {[...timeline].reverse().map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "relative",
                  marginBottom: "1.75rem",
                  paddingLeft: "1.25rem",
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-1.5rem",
                    top: "4px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: typeColors[event.type] || "#5E7C7B",
                    border: "2px solid var(--color-surface)",
                    boxShadow: `0 0 8px ${typeColors[event.type]}60`,
                  }}
                  aria-hidden="true"
                />

                <div
                  style={{
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "9px",
                          letterSpacing: "0.12em",
                          color: typeColors[event.type],
                          background: `${typeColors[event.type]}15`,
                          padding: "2px 8px",
                          borderRadius: "var(--radius-full)",
                          textTransform: "uppercase",
                          display: "inline-block",
                          marginBottom: "6px",
                        }}
                      >
                        {event.badge} {typeLabels[event.type]}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "var(--color-text)",
                          marginBottom: "2px",
                        }}
                      >
                        {event.title}
                      </h3>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--color-secondary)",
                          fontWeight: 500,
                        }}
                      >
                        {event.organization}
                        {event.location && ` · ${event.location}`}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "11px",
                        color: "var(--color-muted)",
                        whiteSpace: "nowrap",
                        background: "var(--color-surface)",
                        padding: "3px 10px",
                        borderRadius: "var(--radius-full)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {event.period}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-muted)",
                      lineHeight: 1.6,
                      marginBottom: event.highlights ? "0.75rem" : 0,
                    }}
                  >
                    {event.description}
                  </p>

                  {event.highlights && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {event.highlights.map((h) => (
                        <span
                          key={h}
                          style={{
                            fontSize: "11px",
                            color: "var(--color-secondary)",
                            background: "rgba(94,124,123,0.08)",
                            border: "1px solid rgba(94,124,123,0.15)",
                            padding: "2px 10px",
                            borderRadius: "var(--radius-full)",
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
