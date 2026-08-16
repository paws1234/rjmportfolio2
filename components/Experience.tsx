import { resume } from "@/data/resume";
import { Card } from "@/components/ui";

export default function Experience() {
  return (
    <Card title="Experience">
      <div className="space-y-5">
        {resume.experience.map((e) => (
          <div key={e.role} className="flex gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500 shrink-0" />
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <p className="text-sm font-semibold min-w-0">{e.role}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap shrink-0">{e.period}</p>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{e.company}</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
