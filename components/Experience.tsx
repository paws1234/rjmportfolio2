import { resume } from "@/data/resume";
import { Card } from "@/components/ui";

export default function Experience() {
  return (
    <Card title="Experience">
      <div className="space-y-5">
        {resume.experience.map((e) => (
          <div key={e.role} className="flex gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-neutral-400 shrink-0" />
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-semibold">{e.role}</p>
                <p className="text-xs text-neutral-500">{e.period}</p>
              </div>
              <p className="text-sm text-neutral-600">{e.company}</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 space-y-1">
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
