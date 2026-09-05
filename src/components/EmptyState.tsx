export function EmptyState({
  title,
  note,
  code,
}: {
  title: string;
  note?: string;
  code?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-300 bg-white/60 px-6 py-14 text-center dark:border-ink-700 dark:bg-ink-900/40">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        </svg>
      </span>
      <div>
        <p className="font-display text-base font-semibold text-ink-800 dark:text-ink-100">
          {title}
        </p>
        {note && (
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-500 dark:text-ink-400">
            {note}
          </p>
        )}
      </div>
      {code && (
        <code className="rounded bg-ink-100 px-2 py-1 text-xs text-ink-600 dark:bg-ink-800 dark:text-ink-300">
          {code}
        </code>
      )}
    </div>
  );
}
