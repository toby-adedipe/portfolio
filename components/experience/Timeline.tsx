"use client";

import { motion } from "framer-motion";
import { RoleCard } from "./RoleCard";
import type { Experience } from "@/lib/types";

interface TimelineProps {
  experience: Experience;
}

export function Timeline({ experience }: TimelineProps) {
  return (
    <section id="experience" className="py-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Experience
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl">
          My journey building software and AI systems across different
          industries and scales.
        </p>
      </motion.div>

      <div className="max-w-2xl">
        {experience.roles.map((role, index) => (
          <RoleCard
            key={`${role.company}-${role.title}`}
            role={role}
            isLast={index === experience.roles.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
