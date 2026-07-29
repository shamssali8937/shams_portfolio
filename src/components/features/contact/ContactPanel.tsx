"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, GitBranch, Link2, MapPin } from "lucide-react";
import { profile } from "@/data/profile";

interface ContactPanelProps {
  onClose: () => void;
}

export default function ContactPanel({ onClose }: ContactPanelProps) {
  const links = [
    {
      id: "email",
      icon: <Mail size={18} />,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: "#D97757",
    },
    {
      id: "github",
      icon: <GitBranch size={18} />,
      label: "GitHub",
      value: `@${profile.github}`,
      href: `https://github.com/${profile.github}`,
      color: "#8B8FA8",
    },
    {
      id: "linkedin",
      icon: <Link2 size={18} />,
      label: "LinkedIn",
      value: `in/${profile.linkedin}`,
      href: `https://linkedin.com/in/${profile.linkedin}`,
      color: "#4A9B8E",
    },
    {
      id: "location",
      icon: <MapPin size={18} />,
      label: "Location",
      value: `${profile.location} · Remote Friendly`,
      href: null,
      color: "#E6B17E",
    },
  ];

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
        aria-label="Contact Panel"
      >
        <motion.div
          className="panel-card"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "560px" }}
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
                ⊕ COMMUNICATION LINK
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
                Get In Touch
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close contact panel"
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

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(74,155,142,0.08)",
              border: "1px solid rgba(74,155,142,0.25)",
              borderRadius: "var(--radius-full)",
              padding: "8px 16px",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4A9B8E",
                animation: "pulse-dot 2s infinite",
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "#4A9B8E",
                textTransform: "uppercase",
              }}
            >
              {profile.status}
            </span>
          </motion.div>

          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--color-muted)",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            I&apos;m currently open to new opportunities — freelance projects,
            full-time roles, and exciting collaborations. Let&apos;s build
            something great together.
          </p>

          {/* Contact links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {links.map((link, idx) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + idx * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 1.25rem",
                      background: "var(--color-surface-2)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ color: link.color }}>{link.icon}</span>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "9px",
                          letterSpacing: "0.12em",
                          color: "var(--color-muted)",
                          textTransform: "uppercase",
                          marginBottom: "2px",
                        }}
                      >
                        {link.label}
                      </div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--color-text)",
                          fontWeight: 500,
                        }}
                      >
                        {link.value}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 1.25rem",
                      background: "var(--color-surface-2)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
                    }}
                  >
                    <span style={{ color: link.color }}>{link.icon}</span>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "9px",
                          letterSpacing: "0.12em",
                          color: "var(--color-muted)",
                          textTransform: "uppercase",
                          marginBottom: "2px",
                        }}
                      >
                        {link.label}
                      </div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--color-text)",
                          fontWeight: 500,
                        }}
                      >
                        {link.value}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
