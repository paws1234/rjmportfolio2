import { resume } from "@/data/resume";
import { Card } from "@/components/ui";

/**
 * `resume.education` was already in the data but had nowhere to appear, and a
 * portfolio that lists five roles and no schooling leaves an obvious gap. It
 * shares the timeline language of the Experience card beside it.
 */
export default function Education() {
  return (
    <Card id="education" title="Education" delay={120}>
      <ol className="relative space-y-5">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-cyan-400/60 via-neutral-200 to-transparent dark:via-white/10"
        />

        {resume.education.map((entry) => (
          <li key={entry.degree} className="relative pl-6">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-white bg-cyan-500 shadow-[0_0_0_3px_rgba(34,211,238,0.15)] dark:border-neutral-900"
            />
            <p className="text-sm font-semibold tracking-tight">{entry.degree}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{entry.school}</p>
            <p className="mt-1 font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
              {entry.period}
            </p>
          </li>
        ))}
      </ol>
    </Card>
  );
}
