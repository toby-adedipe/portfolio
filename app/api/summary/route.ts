import { streamText } from "ai";
import { openrouter, MODEL, systemPrompts } from "@/lib/ai";
import { getProfile, getFeaturedProjects } from "@/lib/content";

export async function GET() {
  try {
    const [profile, projects] = await Promise.all([
      getProfile(),
      getFeaturedProjects(),
    ]);

    const context = `
Profile: ${profile.name}, ${profile.title}
Bio: ${profile.bio}
Recent Projects:
${projects.map((p) => `- ${p.title}: ${p.summary}`).join("\n")}
    `.trim();

    const result = await streamText({
      model: openrouter(MODEL),
      system: systemPrompts.summary,
      prompt: `Based on this portfolio context, write a compelling 2-3 sentence summary:\n\n${context}`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Summary API error:", error);

    // Return a fallback response
    const encoder = new TextEncoder();
    const fallback =
      "I build intelligent systems that scale. Currently focused on multi-agent architectures, LLM orchestration, and production AI infrastructure.";

    return new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(fallback));
          controller.close();
        },
      }),
      {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }
    );
  }
}
