import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { Sop } from "@/lib/sop";
import { StatusBadge } from "./StatusBadge";

export default function SopCard({ sop }: { sop: Sop }) {
  return (
    <Link
      href={`/sops/${sop.slug}`}
      className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 shadow-sm dark:border-ink-800 dark:bg-ink-900"
    >
      <div className="relative flex items-start justify-between gap-3">
        <h2 className="line-clamp-2 font-display text-lg font-semibold tracking-tight text-ink-900 group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-300">
          {sop.title}
        </h2>
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-ink-400 transition group-hover:bg-accent-100 group-hover:text-accent-600 dark:bg-ink-800 dark:text-ink-400 dark:group-hover:bg-accent-500/20 dark:group-hover:text-accent-300">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </span>
      </div>
      {sop.summary && (
        <p className="relative line-clamp-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {sop.summary}
        </p>
      )}
      <div className="relative mt-1 flex items-center justify-between">
        <p className="text-xs text-ink-400 dark:text-ink-500">
          {sop.owner} &middot; {formatDate(sop.date)}
        </p>
        <StatusBadge status={sop.status} />
      </div>
    </Link>
  );
}
