"use client";

import { useEffect, useState } from "react";

/**
 * A rotating phrase, typed out and deleted. The full list is exposed to screen
 * readers once, as a single sentence, and the animated span itself is hidden
 * from them — otherwise the page would narrate every keystroke.
 *
 * The first phrase renders complete, so the line is never empty: on a
 * no-JavaScript render, and before hydration, it reads as plain text.
 */
export default function Typewriter({
  phrases,
  className = ""
}: {
  phrases: string[];
  className?: string;
}) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState(phrases[0] ?? "");
  const [phase, setPhase] = useState<"holding" | "typing" | "deleting" | "done">("holding");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) {
      setReduced(true);
      setPhase("done");
    }
  }, []);

  useEffect(() => {
    // The pause at the end of a phrase is owned by the effect below, so this
    // one stays out of the way while a phrase is being held.
    if (reduced || phrases.length === 0 || phase === "holding" || phase === "done") return;

    const phrase = phrases[phraseIndex % phrases.length];

    if (phase === "typing" && text === phrase) {
      setPhase("holding");
      return;
    }
    if (phase === "deleting" && text === "") {
      setPhraseIndex((current) => (current + 1) % phrases.length);
      setPhase("typing");
      return;
    }

    const delay = phase === "typing" ? 52 : 24;

    const timer = window.setTimeout(() => {
      setText(
        phase === "typing" ? phrase.slice(0, text.length + 1) : phrase.slice(0, text.length - 1)
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [text, phase, phraseIndex, phrases, reduced]);

  // Hold the finished phrase long enough to read, then start deleting it.
  useEffect(() => {
    if (reduced || phase !== "holding") return;
    const timer = window.setTimeout(() => setPhase("deleting"), 1600);
    return () => window.clearTimeout(timer);
  }, [phase, reduced]);

  return (
    <span className={className}>
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-caret bg-indigo-500 align-middle dark:bg-indigo-300" />
      </span>
    </span>
  );
}
