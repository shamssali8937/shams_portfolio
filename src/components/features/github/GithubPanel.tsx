"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, GitBranch, Star, GitFork } from "lucide-react";
import { profile } from "@/data/profile";

interface GithubPanelProps {
  onClose: () => void;
}

const pinnedRepos = [
  {
    name: "careerbidge",
    description: "Enterprise job portal with AI-powered matching and real-time notifications.",
    stars: 12,
    forks: 3,
    language: "TypeScript",
    languageColor: "#3178C6",
  },
  {
    name: "pgnexus",
    description: "Chess PGN viewer and analysis platform with engine integration.",
    stars: 8,
    forks: 2,
    language: "Python",
    languageColor: "#3572A5",
  },
  {
    name: "dewan-traders",
    description: "Next.js website + CMS for a local trading business.",
    stars: 5,
    forks: 1,
    language: "TypeScript",
    languageColor: "#3178C6",
  },
];

const languages = [
  { name: "TypeScript", percent: 42, color: "#3178C6" },
  { name: "Python", percent: 25, color: "#3572A5" },
  { name: "JavaScript", percent: 18, color: "#F7DF1E" },
  { name: "HTML/CSS", percent: 10, color: "#E34F26" },
  { name: "Other", percent: 5, color: "#8B8FA8" },
];

export default function GithubPanel({ onClose }: GithubPanelProps) {
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
        aria-label="GitHub Panel"
      >
        <motion.div
          className="panel-card"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}

        >
          {/* Header */}
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
                ◎ SATELLITE RADAR
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
                GitHub Activity
              </h2>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                  color: "var(--color-surface)",
                  background: "var(--color-primary)",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-full)",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                <GitBranch size={13} />
                @{profile.github}
              </a>
              <button
                onClick={onClose}
                aria-label="Close GitHub panel"
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
          </div>

          {/* Contribution Heatmap (visual representation) */}
          <div
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "var(--color-muted)",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Contribution Galaxy — 2024
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(52, 1fr)",
                gap: "2px",
              }}
              aria-label="GitHub contribution heatmap"
            >
              {Array.from({ length: 364 }, (_, i) => {
                const intensity = Math.random();
                const hasCommit = Math.random() > 0.55;
                const opacity = hasCommit ? 0.15 + intensity * 0.85 : 0.04;
                return (
                  <div
                    key={i}
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      background: `rgba(74,155,142,${opacity})`,
                      borderRadius: "2px",
                    }}
                    aria-hidden="true"
                  />
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "4px",
                marginTop: "8px",
              }}
            >
              <span style={{ fontSize: "10px", color: "var(--color-muted)" }}>
                Less
              </span>
              {[0.05, 0.25, 0.5, 0.75, 1].map((o) => (
                <div
                  key={o}
                  style={{
                    width: "10px",
                    height: "10px",
                    background: `rgba(74,155,142,${o})`,
                    borderRadius: "2px",
                  }}
                  aria-hidden="true"
                />
              ))}
              <span style={{ fontSize: "10px", color: "var(--color-muted)" }}>
                More
              </span>
            </div>
          </div>

          {/* Language breakdown */}
          <div
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "var(--color-muted)",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Languages
            </h3>
            <div
              style={{
                display: "flex",
                height: "8px",
                borderRadius: "var(--radius-full)",
                overflow: "hidden",
                marginBottom: "0.75rem",
                gap: "2px",
              }}
              aria-label="Language distribution"
            >
              {languages.map((lang) => (
                <motion.div
                  key={lang.name}
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percent}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: lang.color, borderRadius: "2px" }}
                  aria-label={`${lang.name}: ${lang.percent}%`}
                />
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: lang.color,
                    }}
                    aria-hidden="true"
                  />
                  <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                    {lang.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "11px",
                      color: "var(--color-text)",
                    }}
                  >
                    {lang.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pinned Repos */}
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
            Pinned Repositories
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {pinnedRepos.map((repo, idx) => (
              <motion.a
                key={repo.name}
                href={`https://github.com/${profile.github}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem",
                  textDecoration: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "0.5rem",
                  }}
                >
                  <GitBranch size={13} color="var(--color-muted)" />
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--color-primary)",
                    }}
                  >
                    {repo.name}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--color-muted)",
                    lineHeight: 1.5,
                    marginBottom: "0.75rem",
                  }}
                >
                  {repo.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: repo.languageColor,
                      }}
                      aria-hidden="true"
                    />
                    <span style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                      {repo.language}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <Star size={11} color="var(--color-muted)" />
                    <span style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                      {repo.stars}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <GitFork size={11} color="var(--color-muted)" />
                    <span style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
