"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StreamingText } from "@/components/ui/StreamingText";
import { ToolCall } from "@/components/ui/ToolCall";
import type { Project, ToolCallData } from "@/lib/types";

interface ExplanationPanelProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExplanationPanel({
  project,
  isOpen,
  onClose,
}: ExplanationPanelProps) {
  const [explanation, setExplanation] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [toolCalls, setToolCalls] = useState<ToolCallData[]>([]);
  const [followUps, setFollowUps] = useState<
    { id: string; question: string; answer: string }[]
  >([]);
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [activeFollowUpId, setActiveFollowUpId] = useState<string | null>(null);

  const fetchExplanation = useCallback(async () => {
    if (!project) return;

    setExplanation("");
    setToolCalls([]);
    setIsStreaming(true);
    setFollowUps([]);
    setFollowUpQuestion("");
    setActiveFollowUpId(null);

    // Simulate tool calls
    const tools: ToolCallData[] = [
      { id: "1", name: "Loading project context", status: "pending" },
      { id: "2", name: "Analyzing architecture", status: "pending" },
      { id: "3", name: "Generating explanation", status: "pending" },
    ];

    setToolCalls(tools);

    // Run through tool calls with delays
    for (let i = 0; i < tools.length; i++) {
      await new Promise((r) => setTimeout(r, 500));
      setToolCalls((prev) =>
        prev.map((t, idx) =>
          idx === i ? { ...t, status: "running" } : t
        )
      );
      await new Promise((r) => setTimeout(r, 800));
      setToolCalls((prev) =>
        prev.map((t, idx) =>
          idx === i ? { ...t, status: "complete" } : t
        )
      );
    }

    try {
      const response = await fetch(`/api/explain?slug=${project.slug}`);

      if (!response.ok) {
        throw new Error("Failed to fetch explanation");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        setExplanation(accumulatedText);
      }
    } catch (err) {
      console.error("Error fetching explanation:", err);
      setExplanation(project.summary);
    } finally {
      setIsStreaming(false);
    }
  }, [project]);

  const askFollowUp = useCallback(async () => {
    if (!project) return;

    const trimmed = followUpQuestion.trim();
    if (!trimmed) return;

    const id = `${Date.now()}`;
    setFollowUpQuestion("");
    setActiveFollowUpId(id);
    setFollowUps((prev) => [...prev, { id, question: trimmed, answer: "" }]);

    try {
      const response = await fetch(
        `/api/explain?slug=${project.slug}&question=${encodeURIComponent(
          trimmed
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch follow-up");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        setFollowUps((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, answer: accumulatedText } : item
          )
        );
      }
    } catch (err) {
      console.error("Error fetching follow-up:", err);
      setFollowUps((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, answer: "Sorry, I could not answer that just now." }
            : item
        )
      );
    } finally {
      setActiveFollowUpId(null);
    }
  }, [project, followUpQuestion]);

  useEffect(() => {
    if (isOpen && project) {
      fetchExplanation();
    }
  }, [isOpen, project, fetchExplanation]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-surface border-l border-border z-50 overflow-y-auto overflow-x-hidden"
          >
            <div className="p-4 sm:p-6 md:p-8 max-w-full">
              <div className="flex items-start justify-between mb-6 gap-4">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-mono text-accent block mb-1 break-words">
                    {project.company}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary break-words">
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close panel"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {toolCalls.map((tool) => (
                  <ToolCall key={tool.id} tool={tool} />
                ))}
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="text-text-secondary leading-relaxed">
                  <StreamingText
                    text={explanation}
                    isStreaming={isStreaming}
                    burstSize={5}
                    delayMs={20}
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-mono text-text-secondary">
                    Ask a follow-up
                  </h3>
                  <span className="text-xs text-text-secondary">
                    Short answers, quick context
                  </span>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void askFollowUp();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={followUpQuestion}
                    onChange={(e) => setFollowUpQuestion(e.target.value)}
                    placeholder="Ask about tradeoffs, latency, scaling..."
                    className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/50 min-w-0"
                    disabled={activeFollowUpId !== null}
                    aria-label="Follow-up question"
                  />
                  <button
                    type="submit"
                    disabled={
                      activeFollowUpId !== null ||
                      followUpQuestion.trim().length === 0
                    }
                    className="px-4 py-2 text-sm font-semibold bg-accent text-background rounded-md hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                  >
                    Ask
                  </button>
                </form>

                {followUps.length > 0 && (
                  <div className="mt-5 space-y-4">
                    {followUps.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border border-border bg-background/60 p-4"
                      >
                        <p className="text-sm text-text-primary mb-2">
                          Q: {item.question}
                        </p>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          <StreamingText
                            text={item.answer}
                            isStreaming={activeFollowUpId === item.id}
                            burstSize={4}
                            delayMs={18}
                          />
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-mono bg-background border border-border rounded-full text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
