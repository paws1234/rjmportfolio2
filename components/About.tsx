import { resume } from "@/data/resume";
import { Card } from "@/components/ui";

export default function About() {
  return (
    <Card title="About">
      <div className="space-y-3 text-sm text-neutral-700 leading-relaxed">
        {resume.about.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Card>
  );
}
