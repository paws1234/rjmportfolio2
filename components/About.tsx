import { resume } from "@/data/resume";
import { Card } from "@/components/ui";

/**
 * A short lead followed by the supporting paragraphs, set off by a hairline so
 * the section reads as one argument rather than a list of unrelated claims.
 */
export default function About() {
  const [lead, ...rest] = resume.about;

  return (
    <Card id="about" title="About" delay={0}>
      <p className="text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200">
        {lead}
      </p>

      <div className="mt-4 space-y-3 border-l border-neutral-200 pl-4 dark:border-white/10">
        {rest.map((paragraph) => (
          <p
            key={paragraph}
            className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Card>
  );
}
