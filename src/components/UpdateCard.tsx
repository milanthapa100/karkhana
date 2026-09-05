import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { Update } from "@/lib/content";
import { StatusBadge } from "./StatusBadge";

export default function UpdateCard({ update }: { update: Update }) {
  return (
    <Link
      href={`/updates/${update.slug}`}
      className="group relative flex flex-col gap-1 overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 shadow-sm dark:border-ink-800 dark:bg-ink-900"
    >
      <div className="relative flex items-start justify-between gap-3">
        <h2 className="line-clamp-2 font-display text-lg font-semibold tracking-tight text-ink-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
          {update.title}
        </h2>
        <svg
          className="h-5 w-5 shrink-0 text-ink-300 transition group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-brand-600 dark:text-ink-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </div>
      <p className="relative mt-1 text-sm text-ink-500 dark:text-ink-400">
        {update.author} &middot; {formatDate(update.date)}
      </p>
      <div className="relative mt-3">
        <StatusBadge status={update.status} />
      </div>
    </Link>
  );
}
