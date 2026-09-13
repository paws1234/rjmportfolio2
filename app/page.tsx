import Header from "@/components/Header";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import ChatWidget from "@/components/ChatWidget";
import { Card } from "@/components/ui";
import { resume } from "@/data/resume";

/**
 * The page is two columns: the argument on the left (who I am, what I can do,
 * what I have built, how to reach me) and the record on the right (where I have
 * worked and studied). Order within each column is deliberate.
 *
 * Each section's card is its own scroll-reveal unit, staggered down the page.
 */
export default function Page() {
  return (
    <div className="space-y-6">
      <Header />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <About />
          <TechStack />
          <Projects />
          <CaseStudies />
          <Contact />
        </div>

        <div className="space-y-6">
          <Experience />
          <Education />

          <Card title="Beyond Coding" delay={160}>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              When I’m not actively coding, I focus on deepening my understanding of system design,
              software architecture, and performance optimization. I spend time evaluating emerging
              technologies, frameworks, and tooling, with an emphasis on how they impact scalability,
              reliability, and developer experience in real-world production systems. I regularly
              refine my engineering practices by studying clean architecture, testing strategies, and
              DevOps workflows, and I enjoy sharing knowledge through clear documentation, thoughtful
              code reviews, and building developer-friendly abstractions that reduce complexity and
              improve long-term maintainability.
            </p>
          </Card>
        </div>
      </div>

      <footer className="pt-8 text-center">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-white/15"
          />
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">
            {resume.name}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
            <a href={`mailto:${resume.email}`} className="link-quiet hover:text-neutral-900 dark:hover:text-white">
              Email
            </a>
            <a href="#projects" className="link-quiet hover:text-neutral-900 dark:hover:text-white">
              Work
            </a>
            {resume.links[0] ? (
              <a
                href={resume.links[0].href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-quiet hover:text-neutral-900 dark:hover:text-white"
              >
                {resume.links[0].label} ↗
              </a>
            ) : null}
            <a href="#top" className="link-quiet hover:text-neutral-900 dark:hover:text-white">
              Top
            </a>
          </nav>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Reyvand Jasper Medrano. All rights reserved.
          </p>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
