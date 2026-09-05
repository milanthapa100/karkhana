"use client";

export function ArticleActions({ editUrl }: { editUrl: string }) {
  return (
    <div className="no-print flex items-center gap-2">
      <a
        href={editUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-ink-300 hover:text-ink-900 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-ink-700 dark:hover:text-white"
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        Edit on GitHub
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-ink-300 hover:text-ink-900 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-ink-700 dark:hover:text-white"
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9V2h12v7" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect width="12" height="8" x="6" y="14" />
        </svg>
        Print
      </button>
    </div>
  );
}