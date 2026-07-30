"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GitBranch,
  Link2,
  Mail,
  MapPin,
  Download,
  ExternalLink,
  ArrowLeft,
  GraduationCap,
  Code,
  Briefcase,
  Rocket,
  Trophy,
  Award,
  LucideIcon,
} from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { timeline } from "@/data/timeline";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Code,
  Briefcase,
  Rocket,
  Trophy,
  Award,
};

interface RecruiterViewProps {
  onExit?: () => void;
}

export default function RecruiterView({ onExit }: RecruiterViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--color-bg)",
        overflowY: "auto",
        zIndex: "var(--z-overlay)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "4rem 2rem 6rem",
        }}
      >
        {/* Header */}
        <header style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #254441 0%, #5E7C7B 100%)",
                  border: "2px solid var(--color-border-md)",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                }}
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
                <span style={{ position: "absolute", zIndex: -1, fontSize: "28px" }}>🧑‍🚀</span>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--color-accent)",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  RECRUITER MODE — CLEAN VIEW
                </div>
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem",
                }}
              >
                {profile.name}
              </h1>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "var(--color-secondary)",
                  fontWeight: 500,
                  marginBottom: "1rem",
                }}
              >
                {profile.title}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#4A9B8E",
                    animation: "pulse-dot 2s infinite",
                  }}
                />
                <span style={{ fontSize: "0.875rem", color: "#4A9B8E", fontWeight: 500 }}>
                  {profile.status}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href={profile.resumeUrl}
                download
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "var(--color-primary)",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: "var(--radius-full)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                <Download size={14} /> Download CV
              </a>
              <a
                href={`mailto:${profile.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                  padding: "10px 18px",
                  borderRadius: "var(--radius-full)",
                  textDecoration: "none",
                  fontSize: "13px",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Mail size={14} /> Contact
              </a>
            </div>
          </div>

          {/* Contact row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.25rem",
              marginTop: "1.5rem",
              padding: "1rem 1.25rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            {[
              { icon: <Mail size={13} />, text: profile.email, href: `mailto:${profile.email}` },
              { icon: <GitBranch size={13} />, text: `@${profile.github}`, href: `https://github.com/${profile.github}` },
              { icon: <Link2 size={13} />, text: `in/${profile.linkedin}`, href: `https://linkedin.com/in/${profile.linkedin}` },
              { icon: <MapPin size={13} />, text: profile.location, href: null },
            ].map((item) => (
              item.href ? (
                <a
                  key={item.text}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "13px",
                    color: "var(--color-muted)",
                    textDecoration: "none",
                  }}
                >
                  {item.icon} {item.text}
                </a>
              ) : (
                <span key={item.text} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", color: "var(--color-muted)" }}>
                  {item.icon} {item.text}
                </span>
              )
            ))}
          </div>
        </header>

        {/* Bio */}
        <section aria-labelledby="about-heading" style={{ marginBottom: "2.5rem" }}>
          <h2 id="about-heading" style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.875rem", letterSpacing: "-0.01em" }}>
            About
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--color-muted)", lineHeight: 1.75 }}>{profile.bio}</p>
        </section>

        {/* Skills */}
        <section aria-labelledby="skills-heading" style={{ marginBottom: "2.5rem" }}>
          <h2 id="skills-heading" style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.875rem", letterSpacing: "-0.01em" }}>
            Technical Skills
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
            {skillCategories.map((cat) => (
              <div
                key={cat.id}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem",
                  borderLeft: `3px solid ${cat.color}`,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text)", marginBottom: "0.5rem" }}>{cat.name}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      style={{
                        fontSize: "11px",
                        color: "var(--color-muted)",
                        background: "var(--color-surface-2)",
                        padding: "2px 8px",
                        borderRadius: "var(--radius-full)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section aria-labelledby="projects-heading" style={{ marginBottom: "2.5rem" }}>
          <h2 id="projects-heading" style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.875rem", letterSpacing: "-0.01em" }}>
            Projects
          </h2>
          <div style={{ display: "grid", gap: "0.875rem" }}>
            {projects.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.25rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "4px" }}>
                    <h3 style={{ fontWeight: 600, fontSize: "1rem", color: "var(--color-text)" }}>{p.name}</h3>
                    <span style={{ fontSize: "11px", color: p.status === "Live" ? "#4A9B8E" : "var(--color-accent)", background: p.status === "Live" ? "rgba(74,155,142,0.1)" : "rgba(217,119,87,0.1)", padding: "1px 8px", borderRadius: "var(--radius-full)", border: `1px solid ${p.status === "Live" ? "rgba(74,155,142,0.25)" : "rgba(217,119,87,0.25)"}` }}>{p.status}</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.6, marginBottom: "0.5rem" }}>{p.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {p.stack.map((t) => (
                      <span key={t} style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px", color: "var(--color-muted)", background: "var(--color-surface-2)", padding: "1px 7px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {p.links.github && <a href={p.links.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} GitBranch`} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--color-muted)", textDecoration: "none", padding: "5px 10px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)" }}><GitBranch size={12} /> Code</a>}
                  {p.links.live && <a href={p.links.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} live`} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#fff", textDecoration: "none", padding: "5px 10px", borderRadius: "var(--radius-full)", background: "var(--color-primary)" }}><ExternalLink size={12} /> Live</a>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section aria-labelledby="experience-heading">
          <h2 id="experience-heading" style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.875rem", letterSpacing: "-0.01em" }}>
            Experience & Education
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {timeline.map((event) => {
              const IconComp = iconMap[event.iconName] || Briefcase;
              return (
                <div
                  key={event.id}
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.25rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "4px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "26px",
                          height: "26px",
                          borderRadius: "6px",
                          background: "rgba(37,68,65,0.08)",
                          color: "var(--color-primary)",
                        }}
                      >
                        <IconComp size={14} />
                      </span>
                      <h3 style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--color-text)" }}>{event.title}</h3>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "var(--color-secondary)", fontWeight: 500, marginBottom: "4px" }}>{event.organization}{event.location && ` · ${event.location}`}</div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-muted)", lineHeight: 1.6 }}>{event.description}</p>
                  </div>
                  <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "var(--color-muted)", whiteSpace: "nowrap", background: "var(--color-surface-2)", padding: "3px 10px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)" }}>{event.period}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
