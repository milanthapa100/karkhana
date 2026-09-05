import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-print mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={`${c.href ?? "crumb"}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg
                  className="h-3.5 w-3.5 text-ink-300 dark:text-ink-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
              {isLast || !c.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={
                    isLast
                      ? "font-medium text-ink-900 dark:text-white"
                      : "text-ink-500 dark:text-ink-400"
                  }
                >
                  {c.label}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="text-ink-500 transition hover:text-brand-700 dark:text-ink-400 dark:hover:text-brand-300"
                >
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
