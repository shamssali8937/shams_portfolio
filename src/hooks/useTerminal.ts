import { useState, useCallback, useRef } from "react";
import {
  terminalCommands,
  TerminalResponse,
} from "@/data/terminal-commands";

export interface HistoryEntry {
  id: string;
  type: "input" | "output" | "error";
  content: string | TerminalResponse[];
  timestamp: Date;
}

const INITIAL_HISTORY: HistoryEntry[] = [
  {
    id: "init",
    type: "output",
    timestamp: new Date(),
    content: [
      {
        type: "ascii",
        content: `
  ███╗   ███╗██╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
  ████╗ ████║██║██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
  ██╔████╔██║██║███████╗███████╗██║██║   ██║██╔██╗ ██║
  ██║╚██╔╝██║██║╚════██║╚════██║██║██║   ██║██║╚██╗██║
  ██║ ╚═╝ ██║██║███████║███████║██║╚██████╔╝██║ ╚████║
  ╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝`,
      },
      {
        type: "text",
        content: 'Welcome. Type "help" to see available commands.',
      },
    ],
  },
];

/**
 * Hook that manages terminal state:
 * - history (displayed output)
 * - commandHistory (arrow-key navigation)
 * - input value
 * - dispatch: runs a command and appends results
 */
export function useTerminal() {
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const idCounter = useRef(0);

  const nextId = () => `term-${++idCounter.current}-${Date.now()}`;

  const dispatch = useCallback((raw: string, onClose?: () => void) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Append to command history for arrow-key recall
    setCmdHistory((prev) => [cmd, ...prev.slice(0, 49)]);
    setHistoryIdx(-1);
    setInput("");

    // Echo the input
    setHistory((prev) => [
      ...prev,
      {
        id: nextId(),
        type: "input",
        content: cmd,
        timestamp: new Date(),
      },
    ]);

    // Handle builtins
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    if (cmd === "exit") {
      onClose?.();
      return;
    }

    // Look up command
    const response = terminalCommands[cmd];
    if (response) {
      setHistory((prev) => [
        ...prev,
        {
          id: nextId(),
          type: "output",
          content: response,
          timestamp: new Date(),
        },
      ]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          id: nextId(),
          type: "error",
          content: [
            {
              type: "text",
              content: `Command not found: "${cmd}". Type "help" for available commands.`,
            },
          ],
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  /** Navigate command history with arrow keys */
  const navigateHistory = useCallback(
    (direction: "up" | "down") => {
      setHistoryIdx((prev) => {
        const next =
          direction === "up"
            ? Math.min(prev + 1, cmdHistory.length - 1)
            : Math.max(prev - 1, -1);
        setInput(next === -1 ? "" : cmdHistory[next] ?? "");
        return next;
      });
    },
    [cmdHistory]
  );

  const clear = useCallback(() => setHistory([]), []);

  return {
    history,
    input,
    setInput,
    dispatch,
    navigateHistory,
    clear,
    cmdHistory,
  };
}
