"use client";

interface TechPillProps {
  tech: string;
}

export function TechPill({ tech }: TechPillProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 text-sm font-mono bg-surface border border-border rounded-full text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors cursor-default">
      {tech}
    </span>
  );
}
