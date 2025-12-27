import { resume } from "@/data/resume";
import { Card, Pill } from "@/components/ui";

function Group({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-xs font-medium text-neutral-500 mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <Pill key={it}>{it}</Pill>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <Card title="Tech Stack">
      <div className="grid gap-5">
        {Object.entries(resume.tech).map(([key, items]) => (
          <Group
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            items={items}
          />
        ))}
      </div>
    </Card>
  );
}
