"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { resume } from "@/data/resume";
import { navSections, presentSections, type Section } from "@/lib/sections";
import { openCommandPalette } from "@/lib/events";
import ThemeToggle from "@/components/ThemeToggle";

/**
 * The persistent bar. It is transparent over the masthead and turns into a
 * glass slab once the page moves, which is the tradition for this kind of page
 * and also solves the problem the original layout had: a long single-column
 * page with no way to jump around it.
 *
 * The active link is decided by geometry rather than by an observer, because
 * "which heading is the last one above the fold" is a question a single
 * measurement answers exactly.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [links, setLinks] = useState<Section[]>([]);
  const navRef = useRef<HTMLElement | null>(null);

  // Resolve anchors against the DOM so a section that did not render is not
  // offered as a link.
  useEffect(() => {
    setLinks(presentSections(navSections));
  }, []);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      // Sections do not all appear in document order... the current one is the
      // heading nearest above the line, not the last one in the array that
      // happens to be above it.
      let current = "";
      let nearest = -Infinity;
      const present = navSections.filter((section) => document.getElementById(section.id));

      for (const section of present) {
        const top = document.getElementById(section.id)!.getBoundingClientRect().top;
        if (top <= 140 && top > nearest) {
          nearest = top;
          current = section.id;
        }
      }

      // The last section's heading can never cross the line on a tall viewport,
      // so reaching the end of the page counts as arriving at it.
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atEnd && present.length > 0) current = present[present.length - 1].id;

      setActive(current);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // The link row scrolls sideways on narrow screens, so the current section has
  // to be brought into view or the highlight can sit off the edge of the bar.
  // Scrolling the container directly (rather than scrollIntoView) cannot move
  // the page itself.
  useEffect(() => {
    const container = navRef.current;
    if (!container || !active) return;

    const link = container.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!link) return;

    const box = container.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    const offset = item.left - box.left;

    // Only step in when the highlight has gone off the edge. Re-centring a link
    // that is already visible would yank the row back every time the visitor
    // scrolled it themselves to look at what else is there.
    if (offset >= 8 && offset + item.width <= box.width - 8) return;

    const centred = container.scrollLeft + offset - (box.width - item.width) / 2;
    const next = Math.max(0, Math.min(centred, container.scrollWidth - container.clientWidth));

    if (Math.abs(container.scrollLeft - next) < 2) return;
    container.scrollTo({ left: next, behavior: "smooth" });
  }, [active]);

  return (
    <header className="sticky top-0 z-40 print:hidden">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-6">
        <div
          className={`mt-2.5 flex items-center gap-2 rounded-2xl px-2 py-2 transition-all duration-500 ease-spring ${
            scrolled
              ? "border border-neutral-200/80 bg-white/80 shadow-[0_10px_30px_-16px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/70 dark:shadow-[0_10px_30px_-16px_rgba(0,0,0,0.8)]"
              : "border border-transparent"
          }`}
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5 rounded-xl p-1 text-left"
            aria-label="Back to the top of the page"
          >
            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-[10px] ring-1 ring-neutral-900/10 dark:ring-white/15">
              <Image
                src="/1749969274185.jpg"
                alt=""
                width={32}
                height={32}
                className="h-full w-full object-cover transition duration-500 ease-spring group-hover:scale-110"
              />
            </span>
            <span className="hidden min-w-0 flex-col leading-none sm:flex">
              <span className="truncate text-xs font-semibold tracking-tight">{resume.name}</span>
              <span className="mt-1 truncate font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
                {resume.handle}
              </span>
            </span>
          </button>

          <nav
            ref={navRef}
            aria-label="Sections"
            className="no-scrollbar -mx-1 flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto px-1"
          >
            {links.map((section) => {
              const isActive = active === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition duration-300 ease-swift ${
                    isActive
                      ? "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-200"
                      : "text-neutral-500 hover:bg-neutral-900/[0.04] hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
                  }`}
                >
                  {section.label}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={openCommandPalette}
              title="Open the command menu"
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white/60 px-2.5 py-2 text-neutral-600 transition duration-300 ease-swift hover:border-neutral-300 hover:text-neutral-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300 dark:hover:border-white/20 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="h-4 w-4"
              >
                <circle cx="9" cy="9" r="5.25" />
                <path d="m13 13 3.5 3.5" />
              </svg>
              <span className="sr-only">Open the command menu</span>
              <kbd className="hidden font-mono text-[10px] leading-none sm:inline">⌘K</kbd>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
