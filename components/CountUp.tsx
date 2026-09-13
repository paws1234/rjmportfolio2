"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a metric up when it appears.
 *
 * Only plain whole numbers are animated — a value like "46 s" or "3,187" keeps
 * its formatting, and anything without a leading number (a range, a word) is
 * rendered untouched rather than mangled into something it is not.
 */
export default function CountUp({
  value,
  duration = 1100,
  className = ""
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const match = /^(\d[\d,]*)(.*)$/.exec(value.trim());
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const suffix = match ? match[2] : "";
  const grouped = (match?.[1] ?? "").includes(",");

  const [shown, setShown] = useState(target ?? 0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // Ease-out cubic: fast off the mark, settles rather than stops.
      const eased = 1 - Math.pow(1 - progress, 3);
      setShown(Math.round(target * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  if (target === null) return <span className={className}>{value}</span>;

  const displayed = grouped ? shown.toLocaleString("en-US") : String(shown);

  return (
    <span className={className}>
      {displayed}
      {suffix}
    </span>
  );
}
