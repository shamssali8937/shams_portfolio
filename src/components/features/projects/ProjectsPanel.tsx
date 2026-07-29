"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, GitBranch } from "lucide-react";
import { projects } from "@/data/projects";

interface ProjectsPanelProps {
  onClose: () => void;
  initialProject?: string | null;
}

export default function ProjectsPanel({ onClose, initialProject }: ProjectsPanelProps) {
  const selectedProject =
    projects.find((p) => p.id === initialProject) ?? projects[0];

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
        aria-label="Projects Panel"
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
                ✦ MISSION LOG
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
                Projects
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close projects panel"
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

          {/* Projects Grid */}
          <div
            style={{
              display: "grid",
              gap: "1rem",
            }}
          >
            {projects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.5rem",
                  borderLeft: `3px solid ${project.planet.color}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "4px" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "var(--color-text)",
                        }}
                      >
                        {project.name}
                      </h3>
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "9px",
                          letterSpacing: "0.1em",
                          color: project.status === "Live" ? "#4A9B8E" : "var(--color-accent)",
                          background:
                            project.status === "Live"
                              ? "rgba(74,155,142,0.1)"
                              : "rgba(217,119,87,0.1)",
                          border: `1px solid ${project.status === "Live" ? "rgba(74,155,142,0.25)" : "rgba(217,119,87,0.25)"}`,
                          padding: "2px 8px",
                          borderRadius: "var(--radius-full)",
                          textTransform: "uppercase",
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-secondary)",
                        fontStyle: "italic",
                      }}
                    >
                      {project.tagline}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} GitBranch repository`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          color: "var(--color-muted)",
                          textDecoration: "none",
                          padding: "5px 10px",
                          borderRadius: "var(--radius-full)",
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-border)",
                          transition: "all 0.2s",
                        }}
                      >
                        <GitBranch size={12} />
                        Code
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} live site`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          color: "var(--color-surface)",
                          textDecoration: "none",
                          padding: "5px 10px",
                          borderRadius: "var(--radius-full)",
                          background: "var(--color-primary)",
                          transition: "opacity 0.2s",
                        }}
                      >
                        <ExternalLink size={12} />
                        Live
                      </a>
                    )}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-muted)",
                    lineHeight: 1.65,
                    marginBottom: "0.75rem",
                  }}
                >
                  {project.longDescription}
                </p>

                {/* Highlights */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "0.75rem",
                  }}
                >
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      style={{
                        fontSize: "11px",
                        color: project.planet.color,
                        background: `${project.planet.color}12`,
                        border: `1px solid ${project.planet.color}25`,
                        padding: "2px 10px",
                        borderRadius: "var(--radius-full)",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "10px",
                        letterSpacing: "0.05em",
                        color: "var(--color-muted)",
                        background: "rgba(37,68,65,0.06)",
                        padding: "2px 8px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
