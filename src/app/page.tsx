"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

// Lazy-load 3D scene (client-only)
const Scene = dynamic(() => import("@/components/mission/Scene"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#06080F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.3)",
          textTransform: "uppercase",
          animation: "pulse-dot 1.5s ease-in-out infinite",
        }}
      >
        Loading Universe...
      </div>
    </div>
  ),
});

const LaunchSequence = dynamic(
  () => import("@/components/mission/LaunchSequence/LaunchSequence"),
  { ssr: false }
);

const HUD = dynamic(() => import("@/components/mission/HUD/HUD"), {
  ssr: false,
});

const Terminal = dynamic(
  () => import("@/components/mission/Terminal/Terminal"),
  { ssr: false }
);

const RecruiterToggle = dynamic(
  () => import("@/components/mission/RecruiterMode/RecruiterToggle"),
  { ssr: false }
);

// Panels
const EarthPanel = dynamic(
  () => import("@/components/features/projects/EarthPanel"),
  { ssr: false }
);
const ProjectsPanel = dynamic(
  () => import("@/components/features/projects/ProjectsPanel"),
  { ssr: false }
);
const SkillsPanel = dynamic(
  () => import("@/components/features/skills/SkillsPanel"),
  { ssr: false }
);
const ResumePanel = dynamic(
  () => import("@/components/features/resume/ResumePanel"),
  { ssr: false }
);
const GithubPanel = dynamic(
  () => import("@/components/features/github/GithubPanel"),
  { ssr: false }
);
const BlogPanel = dynamic(
  () => import("@/components/features/blog/BlogPanel"),
  { ssr: false }
);
const ContactPanel = dynamic(
  () => import("@/components/features/contact/ContactPanel"),
  { ssr: false }
);

// Recruiter view
const RecruiterView = dynamic(
  () => import("@/components/mission/RecruiterMode/RecruiterView"),
  { ssr: false }
);

type PanelId =
  | "earth"
  | "skills"
  | "projects"
  | "resume"
  | "github"
  | "blog"
  | "contact"
  | null;

export default function MissionControl() {
  const [launched, setLaunched] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);

  // Keyboard shortcut: backtick opens terminal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "`") {
        setTerminalOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (terminalOpen) setTerminalOpen(false);
        else setActivePanel(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [terminalOpen]);

  const handlePlanetClick = useCallback((id: string) => {
    setActivePanel(id as PanelId);
  }, []);

  const closePanel = useCallback(() => setActivePanel(null), []);

  const handleRecruiterToggle = useCallback((active: boolean) => {
    setRecruiterMode(active);
    if (active) {
      document.body.classList.add("recruiter-mode");
    } else {
      document.body.classList.remove("recruiter-mode");
    }
  }, []);

  return (
    <main
      style={{ width: "100vw", height: "100dvh", overflow: "hidden" }}
      aria-label="Mission Control Portfolio"
    >
      {/* Launch sequence — shows before main content */}
      {!launched && (
        <LaunchSequence onComplete={() => setLaunched(true)} />
      )}

      {/* Main scene (renders underneath launch sequence) */}
      <AnimatePresence>
        {launched && !recruiterMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{ position: "fixed", inset: 0 }}
          >
            <Scene onPlanetClick={handlePlanetClick} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recruiter mode overlay */}
      <AnimatePresence>
        {recruiterMode && launched && <RecruiterView />}
      </AnimatePresence>

      {/* HUD — always visible when launched */}
      {launched && !recruiterMode && <HUD />}

      {/* Recruiter Mode Toggle */}
      {launched && <RecruiterToggle onToggle={handleRecruiterToggle} />}

      {/* Terminal */}
      <AnimatePresence>
        {terminalOpen && (
          <Terminal onClose={() => setTerminalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Section Panels */}
      <AnimatePresence>
        {activePanel === "earth" && (
          <EarthPanel onClose={closePanel} />
        )}
        {activePanel === "projects" && (
          <ProjectsPanel onClose={closePanel} />
        )}
        {activePanel === "skills" && (
          <SkillsPanel onClose={closePanel} />
        )}
        {activePanel === "resume" && (
          <ResumePanel onClose={closePanel} />
        )}
        {activePanel === "github" && (
          <GithubPanel onClose={closePanel} />
        )}
        {activePanel === "blog" && (
          <BlogPanel onClose={closePanel} />
        )}
        {activePanel === "contact" && (
          <ContactPanel onClose={closePanel} />
        )}
      </AnimatePresence>

      {/* Terminal hint — only first visit */}
      {launched && !terminalOpen && !recruiterMode && (
        <button
          onClick={() => setTerminalOpen(true)}
          aria-label="Open terminal (keyboard shortcut: backtick)"
          style={{
            position: "fixed",
            bottom: "4.5rem",
            left: "1.5rem",
            zIndex: "var(--z-hud)",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            background: "rgba(6,8,15,0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "var(--radius-full)",
            padding: "7px 14px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <kbd
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "1px 5px",
              borderRadius: "3px",
              fontSize: "10px",
            }}
          >
            `
          </kbd>
          Terminal
        </button>
      )}
    </main>
  );
}
