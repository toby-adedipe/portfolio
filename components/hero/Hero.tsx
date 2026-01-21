"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LiveSummary } from "./LiveSummary";
import { HeroIllustration } from "./HeroIllustration";
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
    <section className="min-h-[90vh] py-section flex items-center overflow-hidden">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="max-w-2xl lg:pr-8 w-full">
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
            className="text-hero-sm md:text-hero font-bold text-text-primary mb-4 break-words"
          >
            {profile.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xl md:text-4xl font-semibold text-text-secondary mb-6 break-words"
          >
            {profile.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-accent mb-8 break-words"
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

        <HeroIllustration />
      </div>
    </section>
  );
}
