"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ExplanationPanel } from "./ExplanationPanel";
import type { Project } from "@/lib/types";
import { useProjectPanel } from "@/components/projects/ProjectPanelContext";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { selectedProjectSlug, openProjectBySlug, clearProject } = useProjectPanel();

  const handleExplain = (project: Project) => {
    openProjectBySlug(project.slug);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
    clearProject();
  };

  useEffect(() => {
    if (!selectedProjectSlug) return;
    const nextProject = projects.find(
      (project) => project.slug === selectedProjectSlug
    );
    if (!nextProject) return;
    setSelectedProject(nextProject);
    setIsPanelOpen(true);
  }, [projects, selectedProjectSlug]);

  return (
    <section id="projects" className="py-section w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-4 break-words">
          Featured Projects
        </h2>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl break-words">
          A selection of projects showcasing my work in AI systems, multi-agent
          architectures, and scalable applications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectCard project={project} onExplain={handleExplain} />
          </motion.div>
        ))}
      </div>

      <ExplanationPanel
        project={selectedProject}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </section>
  );
}
