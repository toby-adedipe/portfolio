"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Role } from "@/lib/types";

interface RoleCardProps {
  role: Role;
  isLast?: boolean;
}

export function RoleCard({ role, isLast = false }: RoleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative pl-8 pb-8">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] top-3 bottom-0 w-px bg-border" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-surface border-2 border-accent" />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-surface border border-border rounded-lg p-5 hover:border-accent/30 transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary break-words">
              {role.title}
            </h3>
            <p className="text-accent font-medium break-words">{role.company}</p>
          </div>
          <span className="text-sm font-mono text-text-secondary shrink-0">
            {role.period}
          </span>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 space-y-2 overflow-hidden"
            >
              {role.highlights.map((highlight, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-2 text-text-secondary"
                >
                  <span className="text-accent mt-1.5 shrink-0">-</span>
                  <span className="break-words">{highlight}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <button
          className="mt-3 text-sm text-text-secondary hover:text-text-primary transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      </motion.div>
    </div>
  );
}
