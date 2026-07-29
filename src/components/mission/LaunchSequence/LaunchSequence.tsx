"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface LaunchSequenceProps {
  onComplete: () => void;
}

const COUNTDOWN_STEPS = [
  { label: "T-5", delay: 0 },
  { label: "T-4", delay: 800 },
  { label: "T-3", delay: 1600 },
  { label: "T-2", delay: 2400 },
  { label: "T-1", delay: 3200 },
  { label: "IGNITION", delay: 4000 },
  { label: "LIFT OFF", delay: 4800 },
];

const STATUS_LINES = [
  "Initializing navigation systems...",
  "Calibrating star trackers...",
  "Loading mission data...",
  "Establishing orbit parameters...",
  "ALL SYSTEMS NOMINAL",
];

export default function LaunchSequence({ onComplete }: LaunchSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [statusLines, setStatusLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<"countdown" | "systems" | "launch">(
    "countdown"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Check if already seen this session
    if (typeof window !== "undefined" && sessionStorage.getItem("mc-launched")) {
      onComplete();
      return;
    }

    const tl = gsap.timeline();

    // Phase 1: Countdown
    COUNTDOWN_STEPS.forEach((step, idx) => {
      tl.call(
        () => setCurrentStep(idx),
        [],
        step.delay / 1000
      );
    });

    // Phase 2: Status lines
    tl.call(() => setPhase("systems"), [], 5.6);

    STATUS_LINES.forEach((line, idx) => {
      tl.call(
        () => setStatusLines((prev) => [...prev, line]),
        [],
        5.8 + idx * 0.35
      );
    });

    // Phase 3: Launch
    tl.call(() => setPhase("launch"), [], 7.8);

    // Complete
    tl.call(
      () => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("mc-launched", "1");
        }
        onComplete();
      },
      [],
      9.2
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        aria-label="Mission launch sequence"
        role="status"
        aria-live="polite"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
          }}
        >
          MISSION CONTROL — INITIATING
        </motion.div>

        {/* Countdown / Status */}
        {phase === "countdown" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 30, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.2 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: currentStep >= 5 ? "3rem" : "5rem",
                  fontWeight: 700,
                  color: currentStep >= 5 ? "#D97757" : "rgba(255,255,255,0.9)",
                  letterSpacing: currentStep >= 5 ? "0.2em" : "0",
                  textShadow:
                    currentStep >= 5
                      ? "0 0 40px rgba(217,119,87,0.5)"
                      : "none",
                }}
                aria-live="polite"
              >
                {COUNTDOWN_STEPS[currentStep]?.label}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {phase === "systems" && (
          <motion.div
            key="systems"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              minWidth: "340px",
            }}
          >
            {statusLines.map((line, idx) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  color:
                    idx === statusLines.length - 1 &&
                    line === "ALL SYSTEMS NOMINAL"
                      ? "#4A9B8E"
                      : "rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    color:
                      idx === statusLines.length - 1 &&
                      line === "ALL SYSTEMS NOMINAL"
                        ? "#4A9B8E"
                        : "#5E7C7B",
                  }}
                >
                  {idx === statusLines.length - 1 &&
                  line === "ALL SYSTEMS NOMINAL"
                    ? "✓"
                    : "›"}
                </span>
                {line}
              </motion.div>
            ))}
          </motion.div>
        )}

        {phase === "launch" && (
          <motion.div
            key="launch"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "10px",
                letterSpacing: "0.5em",
                color: "var(--color-accent)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              ALL SYSTEMS GO
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading), system-ui",
                fontSize: "2rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "-0.02em",
              }}
            >
              MISSION CONTROL
            </div>
          </motion.div>
        )}

        {/* Progress bar */}
        <motion.div
          style={{
            width: "200px",
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "1px",
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 9, ease: "linear" }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #254441, #D97757)",
              borderRadius: "1px",
            }}
          />
        </motion.div>

        {/* Skip hint */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => {
            if (typeof window !== "undefined") {
              sessionStorage.setItem("mc-launched", "1");
            }
            onComplete();
          }}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.2)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
          aria-label="Skip launch sequence"
        >
          SKIP →
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
