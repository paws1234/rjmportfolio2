"use client";

import React, { useState } from "react";
import { type Project } from "@/data/projects";
import { Pill, Button } from "@/components/ui";

/**
 * The entry list, shared by the Projects and Case Studies sections so an entry is
 * rendered identically wherever it is filed. Each section owns its own heading, its
 * own count and its own filter; this owns the accordion and nothing else.
 */

function Block({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mt-6">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                {title}
            </h4>
            <div className="mt-3">{children}</div>
        </div>
    );
}

function Chevron({ open }: { open: boolean }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 dark:text-neutral-500 ${open ? "rotate-90" : ""
                }`}
        >
            <path d="M7.5 4.5 13 10l-5.5 5.5" />
        </svg>
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
            className="border-t border-neutral-200 px-4 pb-5 dark:border-neutral-800"
        >
            <p className="mt-4 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                <span className="font-medium text-neutral-600 dark:text-neutral-300">Role:</span> {project.role}
            </p>

            <div className="mt-3 flex items-start gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-800/50">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">{project.status}</p>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{project.summary}</p>

            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-neutral-200 px-3 py-2 dark:border-neutral-800">
                        <dt className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            {m.label}
                        </dt>
                        <dd className="mt-0.5 text-lg font-semibold tracking-tight">{m.value}</dd>
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
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {project.built.map((t) => (
                        <li key={t}>{t}</li>
                    ))}
                </ul>
            </Block>

            <Block title="Architecture">
                <div className="grid gap-2">
                    {project.architecture.map((a) => (
                        <div
                            key={a.layer}
                            className="grid gap-1 rounded-xl border border-neutral-200 px-3 py-2.5 sm:grid-cols-[150px_1fr] sm:gap-4 dark:border-neutral-800"
                        >
                            <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{a.layer}</p>
                            <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{a.detail}</p>
                        </div>
                    ))}
                </div>
            </Block>

            <Block title="Engineering decisions">
                <ol className="grid gap-3">
                    {project.decisions.map((d, i) => (
                        <li key={d.title} className="flex gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-[10px] font-medium text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
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
    // closes another. Every panel is rendered only while it is open, which is what
    // keeps a section the same height whether it holds one entry or ten.
    const [open, setOpen] = useState<Record<string, boolean>>({});

    return (
        <div className="space-y-3">
            {items.map((p) => {
                const isOpen = Boolean(open[p.id]);
                const panelId = `${p.id}-case-study`;
                const buttonId = `${p.id}-toggle`;

                return (
                    <article
                        key={p.id}
                        className="rounded-2xl border border-neutral-200 dark:border-neutral-800"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-3 p-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base font-semibold tracking-tight">
                                    <button
                                        id={buttonId}
                                        type="button"
                                        onClick={() => setOpen((prev) => ({ ...prev, [p.id]: !prev[p.id] }))}
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        className="group flex w-full items-center gap-2 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
                                    >
                                        <Chevron open={isOpen} />
                                        <span className="group-hover:underline">{p.name}</span>
                                    </button>
                                </h3>

                                <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{p.tagline}</p>
                            </div>

                            <div className="flex shrink-0 gap-2">
                                {p.liveUrl ? (
                                    <a href={p.liveUrl} target="_blank" rel="noreferrer noopener">
                                        <Button>Live demo ↗</Button>
                                    </a>
                                ) : null}
                                {p.repoUrl ? (
                                    <a href={p.repoUrl} target="_blank" rel="noreferrer noopener">
                                        <Button variant="ghost">Source ↗</Button>
                                    </a>
                                ) : null}
                            </div>
                        </div>

                        {isOpen ? (
                            <CaseStudy project={p} panelId={panelId} buttonId={buttonId} />
                        ) : null}
                    </article>
                );
            })}
        </div>
    );
}

/** The count a section shows beside its heading. Plurals are passed in so
 *  "case study" does not become "case studys". */
export function Count({ n, singular, plural }: { n: number; singular: string; plural: string }) {
    return (
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {n} {n === 1 ? singular : plural}
        </span>
    );
}
