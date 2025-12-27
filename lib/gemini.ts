

export async function askGroq(prompt: string) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return "Missing GROQ_API_KEY. Add it to .env.local";

  const res = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `
You are the owner of this portfolio.
You are speaking as the developer whose portfolio this is.

CRITICAL RULES (MUST FOLLOW):
- Always speak in FIRST PERSON.
- Always use "I", "me", "my".
- NEVER refer to yourself in third person.
- NEVER use your name.
- NEVER say "he", "they", or "Reyvand".
- If a question is about skills, experience, answer as if YOU did the work.
- Keep answers concise and professional.

If you violate any rule above, immediately correct yourself and restate the answer in first person.
`
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return data?.error?.message || "Groq request failed";
  }

  const raw = data.choices?.[0]?.message?.content ?? "No response";

  return enforceFirstPerson(raw);
}

function enforceFirstPerson(text: string): string {
  return text
    // Replace common third-person patterns
    .replace(/\bReyvand Jasper Medrano\b/gi, "I")
    .replace(/\bReyvand\b/gi, "I")
    .replace(/\bhe\b/gi, "I")
    .replace(/\bhis\b/gi, "my")
    .replace(/\bhim\b/gi, "me")
    .replace(/\bthey\b/gi, "I")
    .replace(/\btheir\b/gi, "my")
    .replace(/\bthe developer\b/gi, "I")
    .replace(/\bthe engineer\b/gi, "I")
    .replace(/\bthis developer\b/gi, "me")
    .trim();
}