"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#06080F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {/* Stars background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 100%), radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(2px 2px at 80% 20%, rgba(255,255,255,0.5) 0%, transparent 100%)",
          backgroundSize: "300px 300px, 200px 200px, 400px 400px",
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        style={{ fontSize: "64px", position: "relative" }}
        aria-hidden="true"
      >
        🛸
      </motion.div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          ERROR 404 — SECTOR NOT FOUND
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading), system-ui",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          Lost in Space
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.6,
            maxWidth: "360px",
            margin: "0 auto 2rem",
          }}
        >
          This sector of the universe appears to be uncharted. Let&apos;s get
          you back to Mission Control.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#06080F",
            background: "linear-gradient(135deg, #D97757, #E6B17E)",
            padding: "12px 24px",
            borderRadius: "9999px",
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(217,119,87,0.3)",
          }}
        >
          ← Return to Mission Control
        </Link>
      </div>
    </div>
  );
}
