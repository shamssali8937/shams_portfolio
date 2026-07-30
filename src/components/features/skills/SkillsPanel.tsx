"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Layout,
  Server,
  Database,
  Sparkles,
  Monitor,
  Network,
  LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/data/skills";

interface SkillsPanelProps {
  onClose: () => void;
}

const categoryIcons: Record<string, LucideIcon> = {
  frontend: Layout,
  backend: Server,
  database: Database,
  ai: Sparkles,
  "it-support": Monitor,
  networking: Network,
};

export default function SkillsPanel({ onClose }: SkillsPanelProps) {
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
        aria-label="Skills Panel"
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
                SYSTEMS CONSTELLATION
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
                Technical Skills
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close skills panel"
              style={{
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
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
              gap: "1rem",
            }}
          >
            {skillCategories.map((category, catIdx) => {
              const IconComp = categoryIcons[category.id] || Layout;
              return (
                <motion.section
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: catIdx * 0.06,
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  aria-labelledby={`category-${category.id}`}
                  style={{
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.25rem",
                    borderTop: `2px solid ${category.color}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        background: `${category.color}15`,
                        color: category.color,
                      }}
                      aria-hidden="true"
                    >
                      <IconComp size={16} />
                    </span>
                    <h3
                      id={`category-${category.id}`}
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "var(--color-text)",
                      }}
                    >
                      {category.name}
                    </h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skill.name}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--color-muted)",
                              fontWeight: 500,
                            }}
                          >
                            {skill.name}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-jetbrains)",
                              fontSize: "10px",
                              color: category.color,
                            }}
                            aria-label={`${skill.level} percent proficiency`}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div
                          style={{
                            height: "4px",
                            background: "rgba(37,68,65,0.08)",
                            borderRadius: "var(--radius-full)",
                            overflow: "hidden",
                          }}
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} proficiency: ${skill.level}%`}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              delay: catIdx * 0.06 + skillIdx * 0.04 + 0.3,
                              duration: 0.6,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                              height: "100%",
                              background: `linear-gradient(90deg, ${category.color}, ${category.color}BB)`,
                              borderRadius: "var(--radius-full)",
                              boxShadow: `0 0 6px ${category.glowColor}`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
