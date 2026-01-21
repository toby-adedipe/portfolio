import { streamText, type Message } from "ai";
import { openrouter, MODEL, systemPrompts } from "@/lib/ai";
import { getAllContent } from "@/lib/content";

export async function POST(request: Request) {
  try {
    const { messages }: { messages: Message[] } = await request.json();

    const content = await getAllContent();

    const contextPrompt = `
${systemPrompts.chat}

Here is the portfolio context you have access to:

PROFILE:
Name: ${content.profile.name}
Title: ${content.profile.title}
Bio: ${content.profile.bio}

PROJECTS:
${content.projects
  .map(
    (p) => `
- ${p.title} (${p.company})
  Summary: ${p.summary}
  Tech: ${p.tech.join(", ")}
`
  )
  .join("")}

EXPERIENCE:
${content.experience.roles
  .map(
    (r) => `
- ${r.title} at ${r.company} (${r.period})
  Highlights: ${r.highlights.join("; ")}
`
  )
  .join("")}
    `.trim();

    const result = await streamText({
      model: openrouter(MODEL),
      system: contextPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Chat service unavailable", { status: 500 });
  }
}
