"use client";

import { ReactNode } from "react";
import { ProjectPanelProvider } from "@/components/projects/ProjectPanelContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <ProjectPanelProvider>{children}</ProjectPanelProvider>;
}
