const META: Record<
  string,
  { cls: string; dot: string; icon?: "check" | "clock" | "dot"; label?: string }
> = {
  active: {
    cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
    dot: "text-emerald-500",
    icon: "check",
  },
  published: {
    cls: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
    dot: "text-sky-500",
    icon: "check",
  },
  done: {
    cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
    dot: "text-emerald-500",
    icon: "check",
  },
  "in-progress": {
    cls: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    dot: "text-amber-500",
    icon: "clock",
  },
  draft: {
    cls: "bg-ink-100 text-ink-600 dark:bg-ink-500/15 dark:text-ink-300",
    dot: "bg-ink-400",
    icon: "dot",
  },
  review: {
    cls: "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
    dot: "text-violet-500",
  },
  archived: {
    cls: "bg-ink-100 text-ink-500 dark:bg-ink-500/10 dark:text-ink-400",
    dot: "bg-ink-400",
  },
};

const DEFAULT = {
  cls: "bg-ink-100 text-ink-600 dark:bg-ink-500/15 dark:text-ink-300",
  dot: "bg-ink-400",
};

export function StatusBadge({ status }: { status: string }) {
  const { cls, dot, icon = "dot" } = META[status] ?? DEFAULT;
  const label = (META[status]?.label ?? status).replace("-", " ");
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${cls}`}
    >
      {icon === "check" ? (
        <svg
          className={`h-3 w-3 ${dot}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : icon === "clock" ? (
        <svg
          className={`h-3 w-3 ${dot}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
      )}
      {label}
    </span>
  );
}
