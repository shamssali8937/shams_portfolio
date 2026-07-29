"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { terminalCommands, TerminalResponse } from "@/data/terminal-commands";

interface TerminalProps {
  onClose: () => void;
}

interface HistoryEntry {
  id: string;
  type: "input" | "output";
  content: string | TerminalResponse[];
}

const ASCII_HEADER = `
  ███╗   ███╗██╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
  ████╗ ████║██║██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
  ██╔████╔██║██║███████╗███████╗██║██║   ██║██╔██╗ ██║
  ██║╚██╔╝██║██║╚════██║╚════██║██║██║   ██║██║╚██╗██║
  ██║ ╚═╝ ██║██║███████║███████║██║╚██████╔╝██║ ╚████║
  ╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                    C O N T R O L
`;

function renderResponse(response: TerminalResponse, idx: number) {
  switch (response.type) {
    case "ascii":
      return (
        <pre
          key={idx}
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "9px",
            color: "var(--color-secondary)",
            lineHeight: 1.3,
            margin: "4px 0",
            overflow: "hidden",
          }}
        >
          {response.content as string}
        </pre>
      );
    case "text":
      return (
        <div
          key={idx}
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "13px",
            margin: "4px 0",
            lineHeight: 1.5,
          }}
        >
          {response.content as string}
        </div>
      );
    case "list":
      return (
        <ul
          key={idx}
          style={{
            listStyle: "none",
            padding: 0,
            margin: "6px 0",
          }}
        >
          {(response.content as string[]).map((item) => (
            <li
              key={item}
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "12px",
                padding: "2px 0",
                paddingLeft: "12px",
                lineHeight: 1.5,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <table
          key={idx}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            margin: "6px 0",
          }}
        >
          <tbody>
            {(response.content as { label: string; value: string }[]).map(
              (row) => (
                <tr key={row.label}>
                  <td
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "11px",
                      color: "var(--color-secondary)",
                      padding: "2px 12px 2px 0",
                      whiteSpace: "nowrap",
                      minWidth: "100px",
                    }}
                  >
                    {row.label}
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.75)",
                      padding: "2px 0",
                    }}
                  >
                    {row.value}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      );
    case "link":
      return (
        <div
          key={idx}
          style={{
            color: "var(--color-accent)",
            fontSize: "12px",
            margin: "4px 0",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {response.content as string}
        </div>
      );
    default:
      return null;
  }
}

export default function Terminal({ onClose }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: "welcome",
      type: "output",
      content: [
        { type: "ascii", content: ASCII_HEADER },
        {
          type: "text",
          content: 'Type "help" to see available commands.',
        },
      ],
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      if (!trimmed) return;

      // Add to command history
      setCmdHistory((prev) => [trimmed, ...prev]);
      setHistoryIdx(-1);

      // Add input to display
      setHistory((prev) => [
        ...prev,
        {
          id: `input-${Date.now()}`,
          type: "input",
          content: trimmed,
        },
      ]);

      if (trimmed === "clear") {
        setHistory([]);
        return;
      }

      if (trimmed === "exit") {
        onClose();
        return;
      }

      const response = terminalCommands[trimmed];
      if (response) {
        setHistory((prev) => [
          ...prev,
          {
            id: `output-${Date.now()}`,
            type: "output",
            content: response,
          },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            type: "output",
            content: [
              {
                type: "text",
                content: `Command not found: "${trimmed}". Type "help" for available commands.`,
              },
            ],
          },
        ]);
      }
    },
    [onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInput(newIdx === -1 ? "" : cmdHistory[newIdx]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: "var(--z-modal)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(6,8,15,0.6)",
          backdropFilter: "blur(4px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Mission Control Terminal"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(700px, 92vw)",
            height: "min(500px, 80vh)",
            background: "rgba(6,8,15,0.97)",
            border: "1px solid rgba(94,124,123,0.2)",
            borderRadius: "var(--radius-xl)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                <div
                  key={c}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: c,
                    opacity: 0.8,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              mission-control — terminal
            </span>
            <button
              onClick={onClose}
              aria-label="Close terminal"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                padding: "2px",
              }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Output */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.05) transparent",
            }}
            role="log"
            aria-live="polite"
            aria-label="Terminal output"
          >
            {history.map((entry) => (
              <div key={entry.id} style={{ marginBottom: "8px" }}>
                {entry.type === "input" ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "12px",
                        color: "var(--color-accent)",
                      }}
                      aria-hidden="true"
                    >
                      ❯
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      {entry.content as string}
                    </span>
                  </div>
                ) : (
                  <div>
                    {(entry.content as TerminalResponse[]).map((r, i) =>
                      renderResponse(r, i)
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <ChevronRight
              size={14}
              color="var(--color-accent)"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command..."
              aria-label="Terminal input"
              spellCheck={false}
              autoComplete="off"
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.9)",
                caretColor: "var(--color-accent)",
              }}
            />
            <span
              style={{
                width: "8px",
                height: "14px",
                background: "var(--color-accent)",
                opacity: 0.8,
                animation: "blink-cursor 1s step-end infinite",
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
