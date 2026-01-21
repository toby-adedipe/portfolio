"use client";

import { motion, useReducedMotion } from "framer-motion";

type PanelId = "back" | "mid" | "front";

const PANEL_LAYERS: Array<{
  id: PanelId;
  label: string;
  delay: number;
  depth: number;
  rotateX: number;
  rotateY: number;
  offsetY: number;
  scale: number;
  opacity: number;
}> = [
  {
    id: "back",
    label: "Systems Map",
    delay: 0,
    depth: -160,
    rotateX: 18,
    rotateY: -20,
    offsetY: 26,
    scale: 0.92,
    opacity: 0.35,
  },
  {
    id: "mid",
    label: "Lab Console",
    delay: 0.12,
    depth: -80,
    rotateX: 14,
    rotateY: -16,
    offsetY: 12,
    scale: 0.96,
    opacity: 0.6,
  },
  {
    id: "front",
    label: "AI Build Deck",
    delay: 0.24,
    depth: 0,
    rotateX: 10,
    rotateY: -12,
    offsetY: 0,
    scale: 1,
    opacity: 1,
  },
];

const PANEL_CONTENT: Record<PanelId, JSX.Element> = {
  back: (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-text-secondary">
        <span>Signals</span>
        <span>Actions</span>
      </div>
      <div className="space-y-3 rounded-xl border border-border/60 bg-black/40 p-4">
        {[
          { label: "User intent", value: "Capture" },
          { label: "Realtime logs", value: "Normalize" },
          { label: "Ops context", value: "Route" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">{item.label}</span>
            <span className="font-semibold text-text-primary">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["Agents", "Tools", "Policies"].map((item) => (
          <div
            key={item}
            className="rounded-lg border border-border/70 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-text-secondary"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 text-[11px] text-text-secondary">
        <span className="h-2 w-2 rounded-full bg-ai-glow/70" />
        Orchestrating intelligent flows
      </div>
    </div>
  ),
  mid: (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Model", value: "o1-mini" },
          { label: "Latency", value: "1.9s" },
          { label: "Uptime", value: "99.98%" },
          { label: "Cost/1k", value: "$0.09" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-border/70 bg-white/5 p-3"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">
              {item.label}
            </div>
            <div className="mt-2 text-lg font-semibold text-text-primary">
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border/70 bg-black/40 p-4">
        <div className="text-xs text-text-secondary">
          Evaluation ladder
        </div>
        <div className="mt-3 space-y-2 text-[11px] text-text-secondary">
          <div className="flex items-center justify-between">
            <span>Safety checks</span>
            <span className="text-text-primary">Pass</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tool accuracy</span>
            <span className="text-text-primary">97%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Response quality</span>
            <span className="text-text-primary">A-</span>
          </div>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        {["RAG", "Agents", "Observability"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  ),
  front: (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span>Prototype pipeline</span>
        <span className="rounded-full border border-border/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em]">
          Sprint 04
        </span>
      </div>
      <div className="grid gap-3">
        {[
          { title: "Customer Insight Engine", type: "Knowledge Retrieval" },
          { title: "Support Triage AI", type: "Issue Routing" },
          { title: "Demand Forecast Studio", type: "Forecasting Model" },
        ].map((project) => (
          <div
            key={project.title}
            className="rounded-xl border border-border/80 bg-black/40 p-4"
          >
            <div className="flex items-center justify-between text-sm font-semibold text-text-primary">
              <span>{project.title}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">
                {project.type}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <div className="h-2 w-10 rounded-full bg-accent/60" />
              <div className="h-2 w-6 rounded-full bg-ai-glow/50" />
              <div className="h-2 w-12 rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className="h-1 w-20 rounded-full bg-accent/60" />
        <div className="h-8 w-28 rounded-full border border-border/70 bg-accent/10" />
      </div>
    </div>
  ),
};

export function HeroIllustration() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="relative w-full lg:justify-self-end"
    >
      <div className="pointer-events-none absolute -right-10 -top-8 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 left-8 h-44 w-44 rounded-full bg-ai-glow/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-xl" style={{ perspective: "1400px" }}>
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.18),transparent_65%)]" />
        <div
          className="relative aspect-[3/2] w-full min-h-[260px] overflow-visible sm:min-h-[320px] lg:min-h-[360px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {PANEL_LAYERS.map((layer) => {
            const initial = prefersReducedMotion
              ? false
              : {
                  opacity: 0,
                  y: layer.offsetY - 60,
                  rotateX: layer.rotateX + 6,
                  rotateY: layer.rotateY - 4,
                  scale: layer.scale * 0.98,
                };

            return (
              <motion.div
                key={layer.id}
                initial={initial}
                animate={{
                  opacity: layer.opacity,
                  y: layer.offsetY,
                  rotateX: layer.rotateX,
                  rotateY: layer.rotateY,
                  z: layer.depth,
                  scale: layer.scale,
                }}
                transition={{
                  duration: 0.85,
                  delay: layer.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface/95 shadow-card ring-1 ring-white/5">
                  <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3 text-xs text-text-secondary">
                    <span className="h-2 w-2 rounded-full bg-red-400/70" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                    <span className="h-2 w-2 rounded-full bg-green-400/70" />
                    <span className="ml-2 uppercase tracking-[0.2em]">{layer.label}</span>
                  </div>

                  <div className="relative flex-1 bg-gradient-to-br from-black/70 via-black/40 to-black/10">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.08),transparent_55%)]" />
                    {PANEL_CONTENT[layer.id]}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
