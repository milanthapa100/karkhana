import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { Sop } from "@/lib/sop";
import { StatusBadge } from "./StatusBadge";

export default function SopCard({ sop }: { sop: Sop }) {
  return (
    <Link
      href={`/sops/${sop.slug}`}
      className="group relative flex flex-col gap-2 rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-ink-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
          {sop.title}
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
      {sop.summary && (
        <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {sop.summary}
        </p>
      )}
      <div className="mt-1 flex items-center justify-between">
        <p className="text-xs text-ink-400 dark:text-ink-500">
          Owner: {sop.owner} &middot; {formatDate(sop.date)}
        </p>
        <StatusBadge status={sop.status} />
      </div>
    </Link>
  );
}
