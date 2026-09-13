import { resume } from "@/data/resume";
import { Card, Button } from "@/components/ui";
import CopyEmailButton from "@/components/CopyEmailButton";

const panel =
  "group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 p-4 transition duration-500 ease-swift hover:border-indigo-300/70 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-indigo-400/30 dark:hover:bg-white/[0.06]";

export default function Contact() {
  return (
    <Card id="contact" title="Contact" delay={160}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className={panel}>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
            Email
          </p>
          <p className="mt-1.5 break-all text-sm font-medium">{resume.email}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={`mailto:${resume.email}`}>
              <Button>Let’s talk</Button>
            </a>
            <CopyEmailButton />
          </div>
        </div>

        <div className={panel}>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
            Phone
          </p>
          <p className="mt-1.5 text-sm font-medium">{resume.phone}</p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
            Based in
          </p>
          <p className="mt-1.5 text-sm text-neutral-700 dark:text-neutral-300">
            {resume.location}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-neutral-300/80 p-4 dark:border-white/10">
        <p className="max-w-prose text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {resume.community.speaking}
        </p>
        {resume.links[0] ? (
          <a
            href={resume.links[0].href}
            target="_blank"
            rel="noreferrer noopener"
            className="link-quiet shrink-0 text-sm font-medium text-indigo-600 dark:text-indigo-300"
          >
            {resume.links[0].label} ↗
          </a>
        ) : null}
      </div>
    </Card>
  );
}
