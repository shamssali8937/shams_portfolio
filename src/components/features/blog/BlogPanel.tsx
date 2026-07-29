"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Rss } from "lucide-react";

interface BlogPanelProps {
  onClose: () => void;
}

const upcomingPosts = [
  { title: "Building AI-Powered Job Matching at Scale", tag: "AI" },
  { title: "From Zero to Deploy: My AWS Journey", tag: "Cloud" },
  { title: "Why I Chose Next.js for Every Project in 2024", tag: "Web Dev" },
  { title: "IT Support to Full-Stack: The Unconventional Path", tag: "Career" },
  { title: "Real-Time Features with WebSockets + Redis", tag: "Backend" },
];

export default function BlogPanel({ onClose }: BlogPanelProps) {
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
        aria-label="Blog Panel"
      >
        <motion.div
          className="panel-card"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "580px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
                ✧ TRANSMISSION QUEUE
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
                Blog
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close blog panel"
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
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Coming soon hero */}
          <div
            style={{
              textAlign: "center",
              padding: "2.5rem 1.5rem",
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              marginBottom: "1.5rem",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{ fontSize: "48px", marginBottom: "1rem", display: "inline-block" }}
              aria-hidden="true"
            >
              🛰️
            </motion.div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "var(--color-text)",
                marginBottom: "0.5rem",
              }}
            >
              Launching Soon
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-muted)",
                lineHeight: 1.6,
                maxWidth: "360px",
                margin: "0 auto",
              }}
            >
              Articles on full-stack development, cloud architecture, AI-assisted
              workflows, and the developer journey. Preparing for lift-off.
            </p>
          </div>

          {/* Upcoming posts */}
          <h3
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "var(--color-muted)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Transmission Queue
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {upcomingPosts.map((post, idx) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.06, duration: 0.3 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.875rem 1rem",
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Rss size={13} color="var(--color-muted)" aria-hidden="true" />
                  <span style={{ fontSize: "0.875rem", color: "var(--color-text)" }}>
                    {post.title}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    color: "var(--color-secondary)",
                    background: "rgba(94,124,123,0.08)",
                    border: "1px solid rgba(94,124,123,0.15)",
                    padding: "2px 8px",
                    borderRadius: "var(--radius-full)",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {post.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
