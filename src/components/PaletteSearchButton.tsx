"use client";

export function PaletteSearchButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("dpk:open-palette"));
        }
      }}
      className="group mt-6 flex w-full max-w-xl items-center gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3 text-left text-sm text-ink-400 shadow-2xs transition-colors hover:text-ink-600 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-500 dark:hover:text-ink-200"
    >
      <svg
        className="h-4 w-4 shrink-0"
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
      <span className="flex-1">
        <span className="sm:hidden">Search</span>
        <span className="hidden sm:inline">Search updates, SOPs, members…</span>
      </span>
      <kbd className="hidden rounded-md border border-ink-200 bg-ink-50 px-1.5 py-0.5 font-sans text-[10px] font-medium text-ink-400 sm:inline-block dark:border-ink-700 dark:bg-ink-800/70 dark:text-ink-500">
        ⌘K
      </kbd>
    </button>
  );
}