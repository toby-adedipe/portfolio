"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ProjectPanelContextValue {
  selectedProjectSlug: string | null;
  openProjectBySlug: (slug: string) => void;
  clearProject: () => void;
}

const ProjectPanelContext = createContext<ProjectPanelContextValue | null>(null);

export function ProjectPanelProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(
    null
  );

  const openProjectBySlug = useCallback((slug: string) => {
    setSelectedProjectSlug(slug);
  }, []);

  const clearProject = useCallback(() => {
    setSelectedProjectSlug(null);
  }, []);

  const value = useMemo(
    () => ({
      selectedProjectSlug,
      openProjectBySlug,
      clearProject,
    }),
    [selectedProjectSlug, openProjectBySlug, clearProject]
  );

  return (
    <ProjectPanelContext.Provider value={value}>
      {children}
    </ProjectPanelContext.Provider>
  );
}

export function useProjectPanel() {
  const context = useContext(ProjectPanelContext);
  if (!context) {
    throw new Error("useProjectPanel must be used within ProjectPanelProvider");
  }
  return context;
}
