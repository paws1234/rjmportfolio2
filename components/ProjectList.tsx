"use client";

import React, { useState } from "react";
import { type Project } from "@/data/projects";
import { Pill, Button } from "@/components/ui";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";

/**
 * The entry list, shared by the Projects and Case Studies sections so an entry is
 * rendered identically wherever it is filed. Each section owns its own heading, its
 * own count and its own filter; this owns the accordion and nothing else.
 */

function Block({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mt-6">
            <h4 className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                <span
                    aria-hidden="true"
                    className="h-px w-4 bg-gradient-to-r from-indigo-500 to-transparent"
                />
                {title}
            </h4>
            <div className="mt-3">{children}</div>
        </div>
    );
}

function Chevron({ open }: { open: boolean }) {
    return (
        <span
            aria-hidden="true"
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-500 ease-spring ${open
                ? "rotate-90 border-indigo-300 bg-indigo-500/10 text-indigo-600 dark:border-indigo-400/40 dark:text-indigo-300"
                : "border-neutral-200 text-neutral-400 group-hover:border-neutral-300 dark:border-white/10 dark:text-neutral-500"
                }`}
        >
            <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
            >
                <path d="M7.5 4.5 13 10l-5.5 5.5" />
            </svg>
        </span>
    );
}

function CaseStudy({
    project,
    panelId,
    buttonId
}: {
    project: Project;
    panelId: string;
    buttonId: string;
}) {
    return (
        <div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="border-t border-neutral-200/70 px-4 pb-6 pt-5 sm:px-5 dark:border-white/[0.07]"
        >
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                <span className="font-medium text-neutral-700 dark:text-neutral-200">Role:</span>{" "}
                {project.role}
            </p>

            <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-neutral-200/80 bg-neutral-50/60 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">
                <span className="relative mt-1.5 flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-halo rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">{project.status}</p>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{project.summary}</p>

            <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.metrics.map((m) => (
                    <div
                        key={m.label}
                        className="rounded-xl border border-neutral-200/80 bg-gradient-to-b from-white/60 to-transparent px-3 py-2.5 transition duration-500 ease-swift hover:border-indigo-300/70 dark:border-white/10 dark:from-white/[0.04] dark:hover:border-indigo-400/30"
                    >
                        <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                            {m.label}
                        </dt>
                        <dd className="mt-1 font-display text-xl font-semibold tracking-tight">
                            <CountUp value={m.value} />
                        </dd>
                    </div>
                ))}
            </dl>

            <Block title="The brief">
                <div className="space-y-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {project.brief.map((t) => (
                        <p key={t}>{t}</p>
                    ))}
                </div>
            </Block>

            <Block title="What I built">
                <ul className="space-y-2.5">
                    {project.built.map((t) => (
                        <li
                            key={t}
                            className="flex gap-2.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
                        >
                            <span
                                aria-hidden="true"
                                className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-indigo-400"
                            />
                            {t}
                        </li>
                    ))}
                </ul>
            </Block>

            <Block title="Architecture">
                <div className="grid gap-2">
                    {project.architecture.map((a) => (
                        <div
                            key={a.layer}
                            className="grid gap-1 rounded-xl border border-neutral-200/80 px-3 py-2.5 transition duration-500 ease-swift hover:border-neutral-300 hover:bg-white/60 sm:grid-cols-[140px_1fr] sm:gap-4 dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/[0.04]"
                        >
                            <p className="font-mono text-[11px] font-medium text-indigo-600 dark:text-indigo-300">
                                {a.layer}
                            </p>
                            <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{a.detail}</p>
                        </div>
                    ))}
                </div>
            </Block>

            <Block title="Engineering decisions">
                <ol className="grid gap-4">
                    {project.decisions.map((d, i) => (
                        <li key={d.title} className="flex gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 font-mono text-[10px] font-medium text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300">
                                {i + 1}
                            </span>
                            <div>
                                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{d.title}</p>
                                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{d.detail}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </Block>

            <Block title="Stack">
                <div className="flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                        <Pill key={t}>{t}</Pill>
                    ))}
                </div>
            </Block>

            <Block title="Outcome">
                <div className="space-y-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {project.outcome.map((t) => (
                        <p key={t}>{t}</p>
                    ))}
                </div>
            </Block>
        </div>
    );
}

export default function ProjectList({ items }: { items: Project[] }) {
    // Collapsed by default. Entries toggle independently, so opening one entry never
    // closes another. A closed panel contributes no height, which is what keeps a
    // section the same size whether it holds one entry or ten.
    const [open, setOpen] = useState<Record<string, boolean>>({});

    const toggle = (id: string) => {
        const willOpen = !open[id];
        setOpen((previous) => ({ ...previous, [id]: willOpen }));
        if (!willOpen) return;

        // If the heading has already scrolled above the top of the viewport, a
        // panel opening downwards would be off screen — so bring the row back
        // into view first and let it open where it can be read.
        window.requestAnimationFrame(() => {
            const article = document.getElementById(`${id}-toggle`)?.closest("article");
            if (article && article.getBoundingClientRect().top < 80) {
                article.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    };

    return (
        <div className="space-y-3">
            {items.map((p, index) => {
                const isOpen = Boolean(open[p.id]);
                const panelId = `${p.id}-case-study`;
                const buttonId = `${p.id}-toggle`;

                return (
                    <Reveal key={p.id} delay={index * 70}>
                        <article
                            className={`scroll-mt-24 overflow-hidden rounded-2xl border transition-colors duration-500 ease-swift ${isOpen
                                ? "border-indigo-300/70 bg-white/60 dark:border-indigo-400/30 dark:bg-white/[0.03]"
                                : "border-neutral-200/90 hover:border-neutral-300 dark:border-white/10 dark:hover:border-white/20"
                                }`}
                        >
                            <div className="flex flex-wrap items-start justify-between gap-3 p-4">
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base font-semibold tracking-tight">
                                        <button
                                            id={buttonId}
                                            type="button"
                                            onClick={() => toggle(p.id)}
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            className="group flex w-full items-center gap-2.5 rounded-lg text-left focus-visible:outline-none"
                                        >
                                            <Chevron open={isOpen} />
                                            <span
                                                className={`transition-colors duration-300 ${isOpen
                                                    ? "text-indigo-700 dark:text-indigo-200"
                                                    : "group-hover:text-indigo-700 dark:group-hover:text-indigo-200"
                                                    }`}
                                            >
                                                {p.name}
                                            </span>
                                        </button>
                                    </h3>

                                    <p className="mt-1.5 pl-[30px] text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                                        {p.tagline}
                                    </p>
                                </div>

                                <div className="flex shrink-0 gap-2">
                                    {p.liveUrl ? (
                                        <a href={p.liveUrl} target="_blank" rel="noreferrer noopener">
                                            <Button size="sm">Live demo ↗</Button>
                                        </a>
                                    ) : null}
                                    {p.repoUrl ? (
                                        <a href={p.repoUrl} target="_blank" rel="noreferrer noopener">
                                            <Button size="sm" variant="ghost">
                                                Source ↗
                                            </Button>
                                        </a>
                                    ) : null}
                                </div>
                            </div>

                            {/* Kept mounted and collapsed by row height, so opening is a
                                transition rather than a jump. `inert` takes the panel out of
                                the tab order and the accessibility tree while it has none. */}
                            <div
                                inert={!isOpen}
                                className={`grid transition-[grid-template-rows] duration-500 ease-spring ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    }`}
                            >
                                <div
                                    className={`overflow-hidden transition-opacity duration-500 ease-swift ${isOpen ? "opacity-100" : "opacity-0"
                                        }`}
                                >
                                    <CaseStudy project={p} panelId={panelId} buttonId={buttonId} />
                                </div>
                            </div>
                        </article>
                    </Reveal>
                );
            })}
        </div>
    );
}

/** The count a section shows beside its heading. Plurals are passed in so
 *  "case study" does not become "case studys". */
export function Count({ n, singular, plural }: { n: number; singular: string; plural: string }) {
    return (
        <span className="rounded-full border border-neutral-200 bg-white/60 px-2.5 py-1 font-mono text-[10px] text-neutral-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-400">
            {n} {n === 1 ? singular : plural}
        </span>
    );
}
