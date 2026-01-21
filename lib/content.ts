import { promises as fs } from "fs";
import path from "path";
import type { Project, Experience, Profile } from "./types";

const contentDir = path.join(process.cwd(), "content");

export async function getProfile(): Promise<Profile> {
  const filePath = path.join(contentDir, "profile.json");
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export async function getExperience(): Promise<Experience> {
  const filePath = path.join(contentDir, "experience.json");
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(contentDir, "projects");
  const files = await fs.readdir(projectsDir);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  const projects = await Promise.all(
    jsonFiles.map(async (file) => {
      const filePath = path.join(projectsDir, file);
      const content = await fs.readFile(filePath, "utf-8");
      return JSON.parse(content) as Project;
    })
  );

  return projects.sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

export async function getAllContent() {
  const [profile, experience, projects] = await Promise.all([
    getProfile(),
    getExperience(),
    getProjects(),
  ]);
  return { profile, experience, projects };
}
