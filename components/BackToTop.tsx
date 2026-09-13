"use client";

import { useEffect, useState } from "react";

/** Appears once the masthead is behind you, on the opposite side of the page
 *  from the chat button so the two never collide. */
export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setShown(window.scrollY > 900);
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={shown ? 0 : -1}
      className={`fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200/80 bg-white/80 text-neutral-700 shadow-lg backdrop-blur-xl transition duration-500 ease-spring hover:-translate-y-0.5 hover:text-indigo-600 dark:border-white/10 dark:bg-neutral-900/70 dark:text-neutral-200 dark:hover:text-indigo-300 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M10 15.5V5m0 0L5 10m5-5 5 5" />
      </svg>
    </button>
  );
}
