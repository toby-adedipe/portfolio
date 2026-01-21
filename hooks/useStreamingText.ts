"use client";

import { useState, useEffect, useRef } from "react";

interface UseStreamingTextOptions {
  text: string;
  isStreaming: boolean;
  burstSize?: number;
  delayMs?: number;
  onComplete?: () => void;
}

export function useStreamingText({
  text,
  isStreaming,
  burstSize = 3,
  delayMs = 30,
  onComplete,
}: UseStreamingTextOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
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
      setIsComplete(true);
      onComplete?.();
      return;
    }

    if (!text) {
      setDisplayedText("");
      setIsComplete(false);
      return;
    }

    setIsComplete(false);

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        const nextIndex = Math.min(indexRef.current + burstSize, text.length);
        setDisplayedText(text.slice(0, nextIndex));
        indexRef.current = nextIndex;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, delayMs);

    return () => clearInterval(interval);
  }, [text, isStreaming, burstSize, delayMs, onComplete]);

  return { displayedText, isComplete };
}
