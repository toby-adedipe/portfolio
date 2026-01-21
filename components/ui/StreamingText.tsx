"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StreamingTextProps {
  text: string;
  isStreaming?: boolean;
  burstSize?: number;
  delayMs?: number;
  className?: string;
  onComplete?: () => void;
}

export function StreamingText({
  text,
  isStreaming = false,
  burstSize = 3,
  delayMs = 30,
  className = "",
  onComplete,
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);
  const previousTextRef = useRef("");

  useEffect(() => {
    if (text === previousTextRef.current) return;

    if (text.startsWith(previousTextRef.current)) {
      indexRef.current = previousTextRef.current.length;
    } else {
      indexRef.current = 0;
      setDisplayedText("");
    }
    previousTextRef.current = text;

    if (!isStreaming && text) {
      setDisplayedText(text);
      setShowCursor(false);
      onComplete?.();
      return;
    }

    if (!text) {
      setDisplayedText("");
      return;
    }

    setShowCursor(true);

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        const nextIndex = Math.min(indexRef.current + burstSize, text.length);
        setDisplayedText(text.slice(0, nextIndex));
        indexRef.current = nextIndex;
      } else {
        clearInterval(interval);
        setShowCursor(false);
        onComplete?.();
      }
    }, delayMs);

    return () => clearInterval(interval);
  }, [text, isStreaming, burstSize, delayMs, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      <AnimatePresence>
        {showCursor && isStreaming && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-block w-2 h-5 ml-0.5 bg-accent align-middle animate-cursor-blink"
          />
        )}
      </AnimatePresence>
    </span>
  );
}
