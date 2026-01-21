"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StreamingText } from "@/components/ui/StreamingText";

export function LiveSummary() {
  const [summary, setSummary] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsStreaming(true);
      setError(null);

      try {
        const response = await fetch("/api/summary");

        if (!response.ok) {
          throw new Error("Failed to fetch summary");
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
          setSummary(accumulatedText);
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("AI summary unavailable");
        setSummary(
          "I build intelligent systems that scale. Currently focused on multi-agent architectures and LLM orchestration."
        );
      } finally {
        setIsStreaming(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative"
    >
      {error && (
        <span className="absolute -top-6 left-0 text-xs text-text-secondary">
          {error}
        </span>
      )}
      <div className="flex items-start gap-2">
        <span className="text-ai-glow text-sm font-mono shrink-0 mt-1">AI</span>
        <p className="text-lg text-text-secondary leading-relaxed">
          <StreamingText
            text={summary}
            isStreaming={isStreaming}
            burstSize={4}
            delayMs={25}
          />
        </p>
      </div>
    </motion.div>
  );
}
