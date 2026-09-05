"use client";

import { useEffect, useState } from "react";

type ThemeMode = "system" | "light" | "dark";

const MODES: ThemeMode[] = ["system", "light", "dark"];

function readMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem("karkhana-theme");
  return stored === "light" || stored === "dark" ? stored : "system";
}

function applyMode(mode: ThemeMode) {
  const root = document.documentElement;
  const dark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", dark);
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    setMode(readMode());
  }, []);

  const cycle = () => {
    const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
    setMode(next);
    const root = document.documentElement;
    root.classList.add("theme-transition");
    window.localStorage.setItem("karkhana-theme", next);
    applyMode(next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  };

  const label =
    mode === "system"
      ? "Theme: System"
      : mode === "light"
        ? "Theme: Light"
        : "Theme: Dark";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${label} (click to change)`}
      title={label}
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center text-ink-600 transition hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
    >
      {mode === "system" ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ) : mode === "light" ? (
        <svg
          className="h-[18px] w-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg
          className="h-[18px] w-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}