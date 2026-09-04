import Link from "next/link";

type Item = { title: string; href: string };

export function PrevNext({
  prev,
  next,
  groupLabel,
}: {
  prev?: Item;
  next?: Item;
  groupLabel: string;
}) {
  const Arrow = ({ dir }: { dir: "left" | "right" }) => (
    <svg
      className={`h-4 w-4 ${
        dir === "left" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
      } transition-transform`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? <path d="M19 12H5M11 18l-6-6 6-6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
    </svg>
  );

  return (
    <nav
      aria-label="Previous and next"
      className="mt-14 grid gap-3 border-t border-ink-200 pt-8 sm:grid-cols-2 dark:border-ink-800"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1 rounded-2xl border border-ink-200 p-5 transition hover:border-brand-300 hover:bg-white dark:border-ink-800 dark:hover:border-brand-700 dark:hover:bg-ink-900"
        >
          <span className="flex items-center gap-1.5 text-xs text-ink-400 dark:text-ink-500">
            <Arrow dir="left" />
            {groupLabel}
          </span>
          <span className="line-clamp-2 font-medium text-ink-800 group-hover:text-brand-700 dark:text-ink-100 dark:group-hover:text-brand-300">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col gap-1 rounded-2xl border border-ink-200 p-5 text-right transition hover:border-brand-300 hover:bg-white dark:border-ink-800 dark:hover:border-brand-700 dark:hover:bg-ink-900"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs text-ink-400 dark:text-ink-500">
            {groupLabel}
            <Arrow dir="right" />
          </span>
          <span className="line-clamp-2 font-medium text-ink-800 group-hover:text-brand-700 dark:text-ink-100 dark:group-hover:text-brand-300">
            {next.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
    </nav>
  );
}
