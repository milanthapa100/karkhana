import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-600 shadow-inner dark:bg-brand-500/15 dark:text-brand-400">
        <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>
      <p className="mt-4 font-display text-7xl font-extrabold tracking-tight text-brand-600 dark:text-brand-400">
        404
      </p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink-900 dark:text-white">
        This page wandered off.
      </h1>
      <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
        The link may be broken or the document moved to a new location.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          Go to Overview
        </Link>
        <Link
          href="/updates"
          className="rounded-xl border border-ink-200 bg-white px-5 py-2.5 text-xs font-semibold text-ink-700 shadow-2xs transition hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-ink-700"
        >
          View Updates
        </Link>
        <Link
          href="/sops"
          className="rounded-xl border border-ink-200 bg-white px-5 py-2.5 text-xs font-semibold text-ink-700 shadow-2xs transition hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-ink-700"
        >
          View SOPs
        </Link>
      </div>
    </div>
  );
}
