import React from "react";
import Reveal from "@/components/Reveal";

/**
 * The page's three primitives. Sections are `Card`s, tags are `Pill`s and
 * anything clickable that is not a link is a `Button`, so a change to the
 * surface treatment or the focus ring happens in one place.
 */

export function Card({
  id,
  title,
  children,
  action,
  delay = 0,
  className = ""
}: {
    /** Anchor target for the sticky nav. */
    id?: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
    /** Entrance stagger in milliseconds, so a column of cards arrives in order. */
    delay?: number;
    className?: string;
}) {
  return (
    <Reveal id={id} delay={delay} className="scroll-mt-24">
      <section
        className={`surface overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/75 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/60 dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_18px_40px_-20px_rgba(0,0,0,0.7)] ${className}`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200/70 px-5 py-4 dark:border-white/[0.07]">
          <h2 className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-[0_0_0_3px_rgba(99,102,241,0.14)]"
            />
            {title}
          </h2>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
        <div className="px-5 py-4">{children}</div>
      </section>
    </Reveal>
  );
}

export function Pill({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs text-neutral-700 transition duration-300 ease-swift hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-indigo-400/40 dark:hover:text-indigo-200 ${className}`}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  onClick,
  variant = "solid",
  size = "md",
  type = "button",
  className = "",
  ariaLabel,
  disabled = false
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "solid" | "ghost";
    size?: "sm" | "md";
  type?: "button" | "submit";
  className?: string;
    ariaLabel?: string;
    disabled?: boolean;
}) {
  const base =
    "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-xl font-medium transition duration-300 ease-spring active:scale-[0.97] disabled:opacity-60";
  const sizing = size === "sm" ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-sm";
  const solid =
    "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/35 hover:brightness-110 dark:shadow-indigo-900/40";
  const ghost =
    "border border-neutral-200 bg-white/60 text-neutral-800 hover:border-neutral-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-100 dark:hover:border-white/20 dark:hover:bg-white/[0.08]";

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`${base} ${sizing} ${variant === "solid" ? solid : ghost} ${className}`}
    >
      {variant === "solid" ? (
        // A light sweep on hover. Transform-only, so it never triggers layout.
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[240%] -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-swift group-hover:translate-x-[440%]"
        />
      ) : null}
      <span className="relative flex items-center gap-2">{children}</span>
    </button>
  );
}

