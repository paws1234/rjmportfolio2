import { NextResponse } from "next/server";
import { askGroq } from "@/lib/gemini";
import { resume } from "@/data/resume";

export async function POST(req: Request) {
  const { message } = await req.json().catch(() => ({ message: "" }));

  const systemContext = `
You are an assistant embedded in Reyvand Jasper Medrano's portfolio website.
Answer questions ONLY about Reyvand, his skills, experience, projects, and how to contact him.
Be concise, helpful, and professional. If you don't know, say so.

Resume facts:
Name: ${resume.name}
Title: ${resume.title}
Location: ${resume.location}
Email: ${resume.email}
Phone: ${resume.phone}

Experience:
${resume.experience.map(e => `- ${e.role} @ ${e.company} (${e.period}): ${e.highlights.join("; ")}`).join("\n")}

Tech:
Frontend: ${resume.tech.frontend.join(", ")}
Backend: ${resume.tech.backend.join(", ")}
DB: ${resume.tech.database.join(", ")}
DevOps: ${resume.tech.devops.join(", ")}

// Projects section removed
  `.trim();

  const prompt = `${systemContext}\n\nUser: ${message}\nAssistant:`;
  const reply = await askGroq(prompt);

  return NextResponse.json({ reply });
}
