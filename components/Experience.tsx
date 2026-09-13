import { resume } from "@/data/resume";
import { Card } from "@/components/ui";

/**
 * A timeline, because roles are a sequence and the sidebar is too narrow for
 * the horizontal layout this used to have. The line fades out at the bottom so
 * the list does not appear to stop abruptly.
 */
export default function Experience() {
  return (
    <Card id="experience" title="Experience" delay={80}>
      <ol className="relative space-y-6">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-indigo-500/70 via-neutral-200 to-transparent dark:via-white/10"
        />

        {resume.experience.map((entry) => (
          <li key={`${entry.role}-${entry.company}`} className="relative pl-6">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-white bg-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.15)] dark:border-neutral-900"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p className="text-sm font-semibold tracking-tight">{entry.role}</p>
              <p className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
                {entry.period}
              </p>
            </div>
            <p className="text-sm text-indigo-600 dark:text-indigo-300">{entry.company}</p>

            <ul className="mt-2.5 space-y-1.5">
              {entry.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Card>
  );
}
