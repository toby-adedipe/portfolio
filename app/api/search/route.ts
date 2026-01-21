import { generateText } from "ai";
import { openrouter, MODEL } from "@/lib/ai";
import { getProjects, getExperience } from "@/lib/content";

export async function POST(request: Request) {
  try {
    const { query }: { query: string } = await request.json();

    if (!query || query.trim().length === 0) {
      return Response.json({ results: [] });
    }

    const [projects, experience] = await Promise.all([
      getProjects(),
      getExperience(),
    ]);

    // First, do a simple keyword search
    const queryLower = query.toLowerCase();

    const projectResults = projects
      .filter(
        (p) =>
          p.title.toLowerCase().includes(queryLower) ||
          p.summary.toLowerCase().includes(queryLower) ||
          p.description.toLowerCase().includes(queryLower) ||
          p.tech.some((t) => t.toLowerCase().includes(queryLower)) ||
          p.company.toLowerCase().includes(queryLower)
      )
      .map((p) => ({
        type: "project" as const,
        title: p.title,
        subtitle: p.company,
        description: p.summary,
        slug: p.slug,
      }));

    const roleResults = experience.roles
      .filter(
        (r) =>
          r.title.toLowerCase().includes(queryLower) ||
          r.company.toLowerCase().includes(queryLower) ||
          r.highlights.some((h) => h.toLowerCase().includes(queryLower))
      )
      .map((r) => ({
        type: "experience" as const,
        title: r.title,
        subtitle: r.company,
        description: r.period,
        slug: null,
      }));

    const results = [...projectResults, ...roleResults];

    // If we have results from keyword search, return them
    if (results.length > 0) {
      return Response.json({ results, source: "keyword" });
    }

    // Otherwise, try AI-powered semantic search
    try {
      const searchContext = `
Projects:
${projects.map((p) => `- ${p.title} (${p.company}): ${p.summary}. Tech: ${p.tech.join(", ")}`).join("\n")}

Experience:
${experience.roles.map((r) => `- ${r.title} at ${r.company}: ${r.highlights.join("; ")}`).join("\n")}
      `.trim();

      const { text } = await generateText({
        model: openrouter(MODEL),
        system: `You are a search assistant. Given a query and portfolio content, return relevant results as a JSON array with this structure: [{"type": "project"|"experience", "title": string, "reason": string}]. Return an empty array if nothing matches. Only return valid JSON, no explanation.`,
        prompt: `Query: "${query}"\n\nContent:\n${searchContext}`,
      });

      const aiResults = JSON.parse(text);

      const enrichedResults = aiResults
        .map((r: { type: string; title: string; reason: string }) => {
          if (r.type === "project") {
            const project = projects.find(
              (p) => p.title.toLowerCase() === r.title.toLowerCase()
            );
            if (project) {
              return {
                type: "project",
                title: project.title,
                subtitle: project.company,
                description: r.reason,
                slug: project.slug,
              };
            }
          } else if (r.type === "experience") {
            const role = experience.roles.find(
              (role) => role.title.toLowerCase() === r.title.toLowerCase()
            );
            if (role) {
              return {
                type: "experience",
                title: role.title,
                subtitle: role.company,
                description: r.reason,
                slug: null,
              };
            }
          }
          return null;
        })
        .filter(Boolean);

      return Response.json({ results: enrichedResults, source: "ai" });
    } catch {
      return Response.json({ results: [], source: "none" });
    }
  } catch (error) {
    console.error("Search API error:", error);
    return Response.json({ results: [], error: "Search failed" });
  }
}
