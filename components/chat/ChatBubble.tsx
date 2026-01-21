"use client";

import { motion } from "framer-motion";

interface ChatBubbleProps {
  onClick: () => void;
  hasUnread?: boolean;
}

export function ChatBubble({ onClick, hasUnread = false }: ChatBubbleProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-surface border border-border rounded-full flex items-center justify-center shadow-lg hover:border-ai-glow/50 hover:shadow-ai-glow transition-all z-40"
      aria-label="Open chat"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <svg
          className="w-6 h-6 text-ai-glow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full" />
        )}
      </motion.div>
    </motion.button>
  );
}
