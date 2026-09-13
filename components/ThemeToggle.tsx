"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}

/**
 * The two icons are stacked in the same box and cross-fade with a quarter turn,
 * so the swap reads as one control changing state rather than two buttons.
 */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white/60 p-2 text-neutral-700 transition duration-300 ease-swift hover:-rotate-6 hover:border-neutral-300 hover:text-indigo-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-white/20 dark:hover:text-indigo-300"
    >
      <span className={`relative block h-4 w-4 transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <MoonIcon
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ease-spring ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
        />
        <SunIcon
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ease-spring ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
        />
      </span>
    </button>
  );
}
