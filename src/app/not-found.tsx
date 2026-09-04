import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-8xl font-bold tracking-tight text-brand-600 dark:text-brand-400">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink-900 dark:text-white">
        This page wandered off.
      </h1>
      <p className="mt-2 max-w-md text-ink-500 dark:text-ink-400">
        The link may be broken, or the content may have moved. Head back to the
        start to keep exploring.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700"
        >
          Back to Updates
        </Link>
        <Link
          href="/sops"
          className="rounded-lg border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-100 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800"
        >
          View SOPs
        </Link>
      </div>
    </div>
  );
}
