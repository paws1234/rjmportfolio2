"use client";

import Image from "next/image";
import { useRef } from "react";
import { resume } from "@/data/resume";
import { Button, Pill } from "@/components/ui";
import Typewriter from "@/components/Typewriter";
import { copyText } from "@/lib/events";

/**
 * The masthead.
 *
 * The colour field behind the card follows the pointer, which is the one piece
 * of motion on this page that the visitor drives themselves — everything else
 * is on a timer. It is written to CSS custom properties on the element rather
 * than held in state, so moving the mouse never re-renders React.
 */

// Every phrase is a pairing that appears in `resume.tech`, so the line reads as
// a summary of the stack rather than a claim about it.
const PHRASES = [
  "Laravel and React",
  "Next.js and PostgreSQL",
  "Docker and CI/CD",
  "REST and GraphQL APIs",
  "Vue and Tailwind CSS"
];

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="2.5" y="4.5" width="15" height="11" rx="2.5" />
      <path d="m3.5 6.5 6.5 4.5 6.5-4.5" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M10 17s5-4.2 5-8a5 5 0 0 0-10 0c0 3.8 5 8 5 8Z" />
      <circle cx="10" cy="9" r="1.75" />
    </svg>
  );
}

export default function Header() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const trackPointer = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <header id="top" className="scroll-mt-24">
      <div
        ref={cardRef}
        onMouseMove={trackPointer}
        className="spotlight relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/70 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_60px_-30px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-neutral-900/55 dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),0_28px_70px_-34px_rgba(0,0,0,0.9)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.3),transparent_66%)] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),transparent_66%)] blur-2xl"
        />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="relative h-24 w-24 shrink-0">
              <span
                aria-hidden="true"
                className="absolute -inset-2 animate-spin-slow rounded-[28px] bg-[conic-gradient(from_0deg,#6366f1,#d946ef,#22d3ee,#6366f1)] opacity-70 blur-[10px]"
              />
              <Image
                src="/1749969274185.jpg"
                alt={resume.name}
                width={96}
                height={96}
                priority
                className="relative h-24 w-24 rounded-[22px] object-cover ring-1 ring-white/70 dark:ring-white/20"
              />
            </div>

            <div className="min-w-0">
              <p className="animate-rise font-mono text-[11px] uppercase tracking-[0.16em] text-indigo-600 [animation-delay:40ms] dark:text-indigo-300">
                {resume.title}
              </p>

              <h1 className="animate-rise mt-2 font-display text-3xl font-semibold tracking-tight sm:text-[2.6rem] sm:leading-[1.08] [animation-delay:110ms]">
                {resume.name}
              </h1>

              <p className="animate-rise mt-3 text-sm text-neutral-600 [animation-delay:180ms] dark:text-neutral-400">
                Building{" "}
                <span className="font-medium text-neutral-900 dark:text-white">
                  <Typewriter phrases={PHRASES} />
                </span>
              </p>

              <div className="animate-rise mt-4 flex flex-wrap items-center gap-2 [animation-delay:250ms]">
                {resume.badges.map((badge) => (
                  <Pill key={badge}>{badge}</Pill>
                ))}
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                  <PinIcon />
                  {resume.location}
                </span>
              </div>
            </div>
          </div>

          <div className="animate-rise flex shrink-0 flex-wrap gap-2 [animation-delay:320ms] md:flex-col">
            <a href={`mailto:${resume.email}`} className="md:w-full">
              <Button className="w-full">
                <MailIcon />
                Send an email
              </Button>
            </a>
            <Button
              variant="ghost"
              className="md:w-full"
              onClick={() => void copyText(resume.email, "Email copied")}
            >
              Copy address
            </Button>
            <a href="#projects" className="md:w-full">
              <Button variant="ghost" className="w-full">
                See the work
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

