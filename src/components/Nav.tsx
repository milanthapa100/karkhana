"use client";

import { ThemeToggle } from "./ThemeToggle";

export function Nav({ onMenuToggle }: { onMenuToggle?: () => void }) {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-ink-200/40 bg-white/60 backdrop-blur-xl dark:border-ink-800/40 dark:bg-ink-950/60 lg:hidden">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
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

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
