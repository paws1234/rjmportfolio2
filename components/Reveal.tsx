"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll reveal.
 *
 * Deliberately optimistic: content is visible unless something has explicitly
 * hidden it. On mount the element measures itself and, if it is still below the
 * fold, hides and watches itself; anything already on screen is left alone, so
 * there is no flash between the server's HTML and hydration and nothing is
 * invisible without JavaScript.
 *
 * `threshold: 0` rather than a fraction: an expanded case study makes a card far
 * taller than the viewport, and a fractional threshold is capped by
 * viewport-height / element-height, so a tall enough panel could never reach it
 * and would never appear.
 *
 * The hidden/shown states are written straight to a data attribute rather than
 * through React state — this happens once per element and there is no markup to
 * re-render.
 *
 * Note both this and a scroll listener depend on the browser producing frames;
 * a backgrounded tab produces none and nothing will reveal until it is
 * foregrounded again, which is the correct behaviour either way.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  id
}: {
  children: React.ReactNode;
  /** Stagger, in milliseconds, applied once the element is shown. */
  delay?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already on screen (or above it): leave it visible, with no animation.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    // Without an observer the safe outcome is content that is simply there.
    if (typeof IntersectionObserver === "undefined") return;

    el.dataset.reveal = "hidden";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
