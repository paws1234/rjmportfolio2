import { resume } from "@/data/resume";
import { Button, Pill } from "@/components/ui";
import Image from "next/image";

export default function Header() {
  return (
    <header className="mb-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4 items-start">
          <Image
            src="/1749969274185.jpg"
            alt={resume.name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-2xl object-cover"
          />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                {resume.name}
              </h1>
              <span className="text-xs rounded-full border border-neutral-200 px-2 py-0.5 text-neutral-700">
                {resume.handle}
              </span>
            </div>
            <p className="text-sm text-neutral-600 mt-1">
              {resume.title}
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              {resume.location}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {resume.badges.slice(0, 6).map((b) => (
                <Pill key={b}>{b}</Pill>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <a href={`mailto:${resume.email}`}>
            <Button>Send Email</Button>
          </a>
          {/* <a href={resume.links[0]?.href} target="_blank" rel="noreferrer">
            <Button variant="ghost">Visit Portfolio</Button>
          </a> */}
        </div>
      </div>
    </header>
  );
}
