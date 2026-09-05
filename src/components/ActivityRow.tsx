import Link from "next/link";
import { readingMinutes } from "@/lib/reading";

export type ActivityItem =
  | {
      type: "update";
      slug: string;
      title: string;
      date: string;
      excerpt: string;
      body: string;
    }
  | {
      type: "sop";
      slug: string;
      title: string;
      date: string;
      summary: string;
      body: string;
    };

export function ActivityRow({ item }: { item: ActivityItem }) {
  const mins = readingMinutes(item.body);

  const text =
    item.type === "update" ? item.excerpt : item.summary;
  const href = item.type === "update" ? `/updates/${item.slug}` : `/sops/${item.slug}`;

  return (
    <li className="group relative border-b border-ink-100 py-5 last:border-0 hover:bg-ink-50/50 dark:border-ink-800/70 dark:hover:bg-ink-900/40">
      <div className="flex items-start gap-3.5">
        <span
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            item.type === "update"
              ? "bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300"
              : "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
          }`}
          aria-hidden="true"
        >
          {item.type === "update" ? (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          )}
        </span>

        <div className="min-w-0 flex-1">
          <Link
            href={href}
            className="font-display text-[15px] font-semibold tracking-tight text-ink-900 transition-colors after:absolute after:inset-0 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
          >
            {item.title}
          </Link>

          {text && (
            <p className="mt-1 line-clamp-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              {text}
            </p>
          )}

          <div className="mt-2 flex items-center gap-2.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-400 dark:text-ink-500">
              {item.type === "update" ? "Update" : "SOP"}
            </span>
            {mins > 1 && (
              <span className="text-[11px] text-ink-400 dark:text-ink-500">
                · {mins} min read
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}