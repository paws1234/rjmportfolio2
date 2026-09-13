"use client";

import { useEffect, useRef } from "react";

/**
 * Reading progress along the very top edge. Written straight to a transform on
 * every animation frame, so it never re-renders React and never costs layout.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      bar.style.transform = `scaleX(${progress})`;
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

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400"
      />
    </div>
  );
}
