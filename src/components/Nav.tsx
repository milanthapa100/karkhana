"use client";

import { ThemeToggle } from "./ThemeToggle";

export function Nav({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const openPalette = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/40 bg-white/60 backdrop-blur-xl dark:border-ink-800/40 dark:bg-ink-950/60">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
            aria-label="Open navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="hidden flex-1 lg:block" />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="flex h-9 items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 text-sm text-ink-500 transition hover:border-brand-400 hover:text-ink-800 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-400 dark:hover:border-brand-600 dark:hover:text-white"
            aria-label="Search (Ctrl+K)"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="hidden text-xs sm:inline">Search</span>
            <kbd className="hidden items-center gap-0.5 rounded border border-ink-200 px-1 text-[10px] font-normal text-ink-400 dark:border-ink-600 sm:flex">
              <span>Ctrl</span>
              <span>K</span>
            </kbd>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
