"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  GraduationCap,
  Briefcase,
  Award,
  Code,
  Rocket,
  Trophy,
  ShieldCheck,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import { profile } from "@/data/profile";
import { timeline, TimelineEvent } from "@/data/timeline";

interface ResumePanelProps {
  onClose: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Code,
  Briefcase,
  Rocket,
  Trophy,
  Award,
};

const certificates = [
  {
    title: "ISO 9001:2015 Certified Internship Certificate",
    issuer: "WhiteDavid23 Academy",
    date: "July 2026",
    description: "3-Month AI-Powered Full Stack Web Development Internship & PGNexus Capstone Project completion.",
    Icon: ShieldCheck,
    color: "#4A9B8E",
  },
  {
    title: "Bachelor of Science in Information Technology",
    issuer: "University of Sargodha",
    date: "2022 – 2026",
    description: "Graduated with CGPA 3.52 / 4.00 in Web Engineering, Database Systems & IT Infrastructure.",
    Icon: GraduationCap,
    color: "#5E7C7B",
  },
  {
    title: "Open Source Contributor & Competitive Athlete",
    issuer: "Developer Communities & Sports",
    date: "2026",
    description: "Active contributor to open-source software projects; Competitive basketball athlete demonstrating teamwork & leadership.",
    Icon: Trophy,
    color: "#D97757",
  },
];

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
              marginBottom: "1.75rem",
              flexWrap: "wrap",
              gap: "1rem",
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
                MISSION LOG & CREDENTIALS
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
                Resume & Achievements
              </h2>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <a
                href={profile.resumeUrl}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--color-surface)",
                  background: "var(--color-primary)",
                  padding: "9px 18px",
                  borderRadius: "var(--radius-full)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "opacity 0.2s",
                  cursor: "pointer",
                }}
              >
                <Download size={13} />
                Download PDF
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
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Pilot Summary Stat Boxes */}
          <div
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              padding: "1.25rem 1.5rem",
              marginBottom: "2rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <div style={{ fontSize: "10px", fontFamily: "var(--font-jetbrains)", color: "var(--color-secondary)", fontWeight: 600, textTransform: "uppercase", marginBottom: "3px", letterSpacing: "0.08em" }}>
                DEGREE CGPA
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-primary)" }}>
                3.52 / 4.00
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>
                University of Sargodha (BS IT)
              </div>
            </div>

            <div>
              <div style={{ fontSize: "10px", fontFamily: "var(--font-jetbrains)", color: "var(--color-secondary)", fontWeight: 600, textTransform: "uppercase", marginBottom: "3px", letterSpacing: "0.08em" }}>
                TECHNOLOGIES
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-primary)" }}>
                20+ Full-Stack & IT
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>
                Next.js, Node, Postgres, IT Admin
              </div>
            </div>

            <div>
              <div style={{ fontSize: "10px", fontFamily: "var(--font-jetbrains)", color: "var(--color-secondary)", fontWeight: 600, textTransform: "uppercase", marginBottom: "3px", letterSpacing: "0.08em" }}>
                CERTIFICATION
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-primary)" }}>
                ISO 9001:2015
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>
                WhiteDavid23 AI Web Dev Intern
              </div>
            </div>

            <div>
              <div style={{ fontSize: "10px", fontFamily: "var(--font-jetbrains)", color: "var(--color-secondary)", fontWeight: 600, textTransform: "uppercase", marginBottom: "3px", letterSpacing: "0.08em" }}>
                AVAILABILITY
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#4A9B8E" }}>
                Full-Time & Freelance
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>
                Ready for Immediate Onboarding
              </div>
            </div>
          </div>

          {/* Certificates & Key Achievements */}
          <section style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
              <Award size={18} color="var(--color-accent)" />
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text)" }}>
                Certificates & Key Achievements
              </h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.875rem" }}>
              {certificates.map((cert) => {
                const CertIcon = cert.Icon;
                return (
                  <div
                    key={cert.title}
                    style={{
                      background: "var(--color-surface-2)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
                      padding: "1.1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: `${cert.color}15`,
                          color: cert.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <CertIcon size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--color-text)" }}>
                          {cert.title}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 500 }}>
                          {cert.issuer} · {cert.date}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--color-muted)", lineHeight: 1.5, marginTop: "2px" }}>
                      {cert.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Experience & Education Timeline */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
              <Briefcase size={18} color="var(--color-primary)" />
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text)" }}>
                Experience & Education Timeline
              </h3>
            </div>

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

              {[...timeline].reverse().map((event, idx) => {
                const ItemIcon = iconMap[event.iconName] || Briefcase;
                const dotColor =
                  event.type === "education"
                    ? "#5E7C7B"
                    : event.type === "work"
                    ? "#4A9B8E"
                    : "#D97757";

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: "relative",
                      marginBottom: "1.5rem",
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
                        background: dotColor,
                        border: "2px solid var(--color-surface)",
                        boxShadow: `0 0 8px ${dotColor}60`,
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
                        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "8px",
                              background: `${dotColor}15`,
                              color: dotColor,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: "2px",
                            }}
                          >
                            <ItemIcon size={16} />
                          </div>
                          <div>
                            <span
                              style={{
                                fontFamily: "var(--font-jetbrains)",
                                fontSize: "9px",
                                letterSpacing: "0.12em",
                                color: dotColor,
                                background: `${dotColor}12`,
                                padding: "2px 8px",
                                borderRadius: "var(--radius-full)",
                                textTransform: "uppercase",
                                display: "inline-block",
                                marginBottom: "4px",
                              }}
                            >
                              {event.type.toUpperCase()}
                            </span>
                            <h4
                              style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "1rem",
                                fontWeight: 600,
                                color: "var(--color-text)",
                                marginBottom: "2px",
                              }}
                            >
                              {event.title}
                            </h4>
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
                          marginTop: "0.5rem",
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
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "11px",
                                color: "var(--color-secondary)",
                                background: "rgba(94,124,123,0.08)",
                                border: "1px solid rgba(94,124,123,0.15)",
                                padding: "2px 10px",
                                borderRadius: "var(--radius-full)",
                              }}
                            >
                              <CheckCircle2 size={11} color={dotColor} /> {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
