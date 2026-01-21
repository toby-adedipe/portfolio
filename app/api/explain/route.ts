import { streamText } from "ai";
import { NextRequest } from "next/server";
import { openrouter, MODEL, systemPrompts } from "@/lib/ai";
import { getProjectBySlug } from "@/lib/content";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const question = searchParams.get("question");

  if (!slug) {
    return new Response("Missing slug parameter", { status: 400 });
  }

  try {
    const project = await getProjectBySlug(slug);

    if (!project) {
      return new Response("Project not found", { status: 404 });
    }

    const context = `
Project: ${project.title}
Company: ${project.company}
Summary: ${project.summary}
Description: ${project.description}
Tech Stack: ${project.tech.join(", ")}
    `.trim();

    const prompt = question
      ? `Answer this follow-up question in 1-2 complete sentences.\nQuestion: ${question}\n\nProject context:\n${context}`
      : `Explain this project in 3-5 complete sentences.\n\nProject context:\n${context}`;

    const result = await streamText({
      model: openrouter(MODEL),
      system: systemPrompts.explain,
      prompt,
      maxTokens: 1024,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Explain API error:", error);

    // Return the project description as fallback
    const project = await getProjectBySlug(slug);
    const fallback = project?.summary || "Unable to generate explanation.";

    const encoder = new TextEncoder();
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
