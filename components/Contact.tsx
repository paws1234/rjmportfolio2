import { resume } from "@/data/resume";
import { Card, Button } from "@/components/ui";

export default function Contact() {
  return (
    <Card title="Contact">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 p-4">
          <p className="text-xs text-neutral-500">Email</p>
          <p className="text-sm font-medium mt-1">{resume.email}</p>
          <div className="mt-3">
            <a href={`mailto:${resume.email}`}>
              <Button>Let's Talk</Button>
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-4">
          <p className="text-xs text-neutral-500">Phone</p>
          <p className="text-sm font-medium mt-1">{resume.phone}</p>
          <p className="text-xs text-neutral-500 mt-3">Speaking</p>
          <p className="text-sm text-neutral-700 mt-1">{resume.community.speaking}</p>
        </div>
      </div>
    </Card>
  );
}
