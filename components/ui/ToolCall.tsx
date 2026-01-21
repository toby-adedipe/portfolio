"use client";

import { motion } from "framer-motion";
import type { ToolCallData } from "@/lib/types";

interface ToolCallProps {
  tool: ToolCallData;
}

const statusIcons = {
  pending: "○",
  running: "◐",
  complete: "●",
};

export function ToolCall({ tool }: ToolCallProps) {
  const isRunning = tool.status === "running";
  const isComplete = tool.status === "complete";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono
        ${isComplete ? "bg-surface border border-border" : "bg-ai-glow/10 border border-ai-glow/30"}
        ${isRunning ? "shadow-ai-glow" : ""}
        transition-all duration-300`}
    >
      <span
        className={`${isRunning ? "animate-spin" : ""} ${isComplete ? "text-accent" : "text-ai-glow"}`}
      >
        {statusIcons[tool.status]}
      </span>
      <span className={isComplete ? "text-text-secondary" : "text-text-primary"}>
        {tool.name}
      </span>
      {isRunning && (
        <motion.div
          className="h-0.5 bg-ai-glow rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 2, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}
