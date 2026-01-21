export interface Project {
  slug: string;
  title: string;
  company: string;
  summary: string;
  description: string;
  tech: string[];
  featured: boolean;
  order: number;
  github?: string;
  demo?: string;
}

export interface Role {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface Experience {
  roles: Role[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface ToolCallData {
  id: string;
  name: string;
  status: "pending" | "running" | "complete";
  result?: string;
}
