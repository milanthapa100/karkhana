const STYLES: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  published: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
  done: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  "in-progress": "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  draft: "bg-ink-100 text-ink-600 dark:bg-ink-500/15 dark:text-ink-300",
  review: "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
  archived: "bg-ink-100 text-ink-500 dark:bg-ink-500/10 dark:text-ink-400",
};

const DEFAULT = "bg-ink-100 text-ink-600 dark:bg-ink-500/15 dark:text-ink-300";

export function StatusBadge({ status }: { status: string }) {
  const cls = STYLES[status] ?? DEFAULT;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}
    >
      {status}
    </span>
  );
}
