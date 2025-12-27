import React from "react";

export function Card({
  title,
  children,
  action
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

export function Button({
  children,
  onClick,
  variant = "solid",
  type = "button"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm font-medium transition";
  const solid =
    "bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300";
  const ghost =
    "bg-white text-neutral-800 border border-neutral-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-200";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variant === "solid" ? solid : ghost}`}
    >
      {children}
    </button>
  );
}
