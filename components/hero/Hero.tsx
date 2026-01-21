"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LiveSummary } from "./LiveSummary";
import type { Profile } from "@/lib/types";

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[90vh] flex flex-col justify-center py-section">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent font-mono text-sm mb-4 block">
            Hi, I&apos;m
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-hero-sm md:text-hero font-bold text-text-primary mb-4"
        >
          {profile.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-2xl md:text-4xl font-semibold text-text-secondary mb-6"
        >
          {profile.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-accent mb-8"
        >
          {profile.tagline}
        </motion.p>

        <div className="mb-10">
          <LiveSummary />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <Button variant="primary" size="lg" onClick={scrollToProjects}>
            View Projects
          </Button>
          <Button variant="secondary" size="lg" onClick={scrollToContact}>
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
