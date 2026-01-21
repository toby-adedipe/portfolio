import { z } from "zod";
import { tool } from "ai";
import { getProjects, getExperience, getProfile } from "./content";

export const portfolioTools = {
  getProjects: tool({
    description: "Get all projects from the portfolio",
    parameters: z.object({}),
    execute: async () => {
      const projects = await getProjects();
      return projects;
    },
  }),

  getProjectBySlug: tool({
    description: "Get a specific project by its slug",
    parameters: z.object({
      slug: z.string().describe("The project slug to look up"),
    }),
    execute: async ({ slug }) => {
      const projects = await getProjects();
      return projects.find((p) => p.slug === slug) || null;
    },
  }),

  getExperience: tool({
    description: "Get work experience history",
    parameters: z.object({}),
    execute: async () => {
      const experience = await getExperience();
      return experience;
    },
  }),

  getProfile: tool({
    description: "Get profile information",
    parameters: z.object({}),
    execute: async () => {
      const profile = await getProfile();
      return profile;
    },
  }),

  searchPortfolio: tool({
    description: "Search across projects and experience for relevant items",
    parameters: z.object({
      query: z.string().describe("The search query"),
    }),
    execute: async ({ query }) => {
      const [projects, experience] = await Promise.all([
        getProjects(),
        getExperience(),
      ]);

      const queryLower = query.toLowerCase();

      const matchingProjects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(queryLower) ||
          p.summary.toLowerCase().includes(queryLower) ||
          p.tech.some((t) => t.toLowerCase().includes(queryLower))
      );

      const matchingRoles = experience.roles.filter(
        (r) =>
          r.title.toLowerCase().includes(queryLower) ||
          r.company.toLowerCase().includes(queryLower) ||
          r.highlights.some((h) => h.toLowerCase().includes(queryLower))
      );

      return {
        projects: matchingProjects,
        roles: matchingRoles,
      };
    },
  }),
};
