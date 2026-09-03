import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { Update } from "@/lib/content";
import { StatusBadge } from "./StatusBadge";

export default function UpdateCard({ update }: { update: Update }) {
  return (
    <Link
      href={`/updates/${update.slug}`}
      className="group relative flex flex-col gap-1 rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-ink-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
          {update.title}
        </h2>
        <svg
          className="h-5 w-5 shrink-0 text-ink-300 transition group-hover:translate-x-1 group-hover:text-brand-600 dark:text-ink-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
      <p className="text-sm text-ink-500 dark:text-ink-400">
        {update.author} &middot; {formatDate(update.date)}
      </p>
      <div className="mt-2">
        <StatusBadge status={update.status} />
      </div>
    </Link>
  );
}
