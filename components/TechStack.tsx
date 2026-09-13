import { resume } from "@/data/resume";
import { Card, Pill } from "@/components/ui";
import Reveal from "@/components/Reveal";

/**
 * Seven groups is too many to read as one wall of tags, so each gets a numbered
 * heading and its own row count, and the groups arrive in sequence as the
 * section scrolls in.
 */
export default function TechStack() {
  const groups = Object.entries(resume.tech);

  return (
    <Card id="stack" title="Tech Stack" delay={60}>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {groups.map(([key, items], index) => (
          <Reveal key={key} delay={index * 45}>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] text-indigo-500 dark:text-indigo-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                  {key}
                </h3>
                <span className="ml-auto font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                  {items.length}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Card>
  );
}
