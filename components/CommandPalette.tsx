"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
import { sections, presentSections } from "@/lib/sections";
import { COMMAND_PALETTE_EVENT, copyText, toast } from "@/lib/events";
import { useTheme } from "@/context/ThemeContext";
import { useChat } from "@/context/ChatContext";

type Command = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
};

/**
 * Keyboard-first navigation for the whole page: jump to a section, open a
 * project, or take an action, without hunting for the right button.
 *
 * The list is a listbox rather than a set of buttons so arrow keys can move a
 * selection while focus stays in the search field — the pattern people already
 * expect from every editor they use.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggle } = useTheme();
  const { setIsOpen: setChatOpen } = useChat();

  const close = useCallback(() => setOpen(false), []);

  const commands = useMemo<Command[]>(() => {
    const goTo = (id: string) => () => {
      close();
      // Let the dialog unmount before the scroll starts, so the two do not
      // fight over the same frame.
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    };

    const navigate: Command[] = (typeof document === "undefined" ? sections : presentSections(sections)).map(
      (section) => ({
        id: `go-${section.id}`,
        group: "Navigate",
        label: section.label,
        keywords: `jump scroll section ${section.id}`,
        run: goTo(section.id)
      })
    );

    const work: Command[] = projects.flatMap((project) => {
      const entries: Command[] = [
        {
          id: `open-${project.id}`,
          group: "Work",
          label: project.name,
          hint: "Read the case study",
          keywords: `project case study ${project.tagline}`,
          run: () => {
            close();
            window.setTimeout(() => {
              const section = document.getElementById(project.liveUrl ? "projects" : "case-studies");
              const toggleButton = document.getElementById(`${project.id}-toggle`);
              section?.scrollIntoView({ behavior: "smooth", block: "start" });
              if (toggleButton?.getAttribute("aria-expanded") === "false") {
                window.setTimeout(() => toggleButton.click(), 350);
              }
            }, 60);
          }
        }
      ];

      if (project.liveUrl) {
        entries.push({
          id: `live-${project.id}`,
          group: "Work",
          label: `${project.name} — live demo`,
          hint: "Opens in a new tab",
          keywords: `visit open demo ${project.stack.join(" ")}`,
          run: () => {
            close();
            window.open(project.liveUrl, "_blank", "noopener,noreferrer");
          }
        });
      }

      if (project.repoUrl) {
        entries.push({
          id: `repo-${project.id}`,
          group: "Work",
          label: `${project.name} — source`,
          hint: "Opens GitHub in a new tab",
          keywords: `github code repository ${project.stack.join(" ")}`,
          run: () => {
            close();
            window.open(project.repoUrl, "_blank", "noopener,noreferrer");
          }
        });
      }

      return entries;
    });

    const actions: Command[] = [
      {
        id: "ask-assistant",
        group: "Actions",
        label: "Ask the assistant",
        hint: "Answers questions about the work",
        keywords: "chat ai question",
        run: () => {
          close();
          setChatOpen(true);
        }
      },
      {
        id: "email",
        group: "Actions",
        label: "Send an email",
        hint: resume.email,
        keywords: "contact hire mail reach out",
        run: () => {
          close();
          window.location.href = `mailto:${resume.email}`;
        }
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: resume.email,
        keywords: "contact clipboard",
        run: () => {
          close();
          void copyText(resume.email, "Email copied");
        }
      },
      {
        id: "theme",
        group: "Actions",
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        keywords: "appearance colour contrast night day",
        run: () => {
          toggle();
          toast("Theme updated");
        }
      },
      {
        id: "top",
        group: "Actions",
        label: "Back to top",
        keywords: "scroll up beginning",
        run: () => {
          close();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    ];

    return [...navigate, ...work, ...actions];
  }, [close, setChatOpen, theme, toggle]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.hint ?? ""} ${command.keywords ?? ""}`
        .toLowerCase()
        .includes(needle)
    );
  }, [commands, query]);

  const grouped = useMemo(() => {
    const order: string[] = [];
    const buckets = new Map<string, Command[]>();
    for (const command of results) {
      if (!buckets.has(command.group)) {
        buckets.set(command.group, []);
        order.push(command.group);
      }
      buckets.get(command.group)!.push(command);
    }
    return order.map((group) => ({ group, items: buckets.get(group)! }));
  }, [results]);

  // Reset the selection whenever the list changes underneath it.
  useEffect(() => {
    setIndex(0);
  }, [query, open]);

  // ⌘K / Ctrl+K from anywhere.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const openRequest = event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
      if (openRequest) {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onOpenRequest = () => setOpen(true);
    window.addEventListener(COMMAND_PALETTE_EVENT, onOpenRequest);
    return () => window.removeEventListener(COMMAND_PALETTE_EVENT, onOpenRequest);
  }, []);

  useEffect(() => {
    if (!open) return;

    setQuery("");
    const previouslyFocused = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();

    // Keep the page behind the dialog still.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({ block: "nearest" });
  }, [index, results]);

  const select = (command: Command | undefined) => {
    if (command) command.run();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((current) => (results.length ? (current + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((current) => (results.length ? (current - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      select(results[index]);
    }
  };

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
    >
      <button
        type="button"
        aria-label="Close the command menu"
        onClick={close}
        className="absolute inset-0 cursor-default bg-neutral-950/40 backdrop-blur-sm"
      />

      <div className="animate-pop-in relative w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-900/95">
        <div className="flex items-center gap-3 border-b border-neutral-200/70 px-4 dark:border-white/[0.07]">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="h-4 w-4 shrink-0 text-neutral-400"
          >
            <circle cx="9" cy="9" r="5.25" />
            <path d="m13 13 3.5 3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, open a project, send an email…"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={results[index]?.id}
            className="w-full bg-transparent py-3.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100"
          />
          <kbd className="shrink-0 rounded-md border border-neutral-200 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500 dark:border-white/10 dark:text-neutral-400">
            esc
          </kbd>
        </div>

        {/* A listbox of groups of options. `div`s rather than `ul`/`li`, because
            a listbox must not contain listitems and `role` cannot fix that
            nesting — the wrapper element has to go. */}
        <div
          ref={listRef}
          id="command-list"
          role="listbox"
          aria-label="Commands"
          className="max-h-[52vh] overflow-y-auto p-2"
        >
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
              Nothing matches “{query}”.
            </p>
          ) : null}

          {grouped.map(({ group, items }) => (
            <div key={group} role="group" aria-label={group}>
              <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                {group}
              </p>
              {items.map((command) => {
                flatIndex += 1;
                const isActive = flatIndex === index;
                return (
                  <div
                    key={command.id}
                    id={command.id}
                    role="option"
                    aria-selected={isActive}
                    data-active={isActive}
                    onMouseMove={() => setIndex(results.indexOf(command))}
                    onClick={() => select(command)}
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                      isActive
                        ? "bg-indigo-500/10 text-neutral-900 dark:bg-indigo-400/15 dark:text-white"
                        : "text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    <span className="truncate">{command.label}</span>
                    {command.hint ? (
                      <span className="shrink-0 truncate font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                        {command.hint}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-neutral-200/70 px-4 py-2.5 font-mono text-[10px] text-neutral-400 dark:border-white/[0.07] dark:text-neutral-500">
          <span>↑↓ to move · ⏎ to open</span>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
