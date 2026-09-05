import Link from "next/link";
import { readingMinutes } from "@/lib/reading";
import type { Update } from "@/lib/content";

export default function UpdateCard({ update }: { update: Update }) {
  const mins = readingMinutes(update.body);
  const authorName = update.author || "DPK Team";
  const excerpt = update.body.trim().split(/\n+/)[0]?.replace(/^#+\s*/, "");

  return (
    <li className="group relative border-b border-ink-100 py-6 last:border-0 hover:bg-ink-50/50 dark:border-ink-800/70 dark:hover:bg-ink-900/40">
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Link
            href={`/updates/${update.slug}`}
            className="group/title font-display text-lg font-semibold tracking-tight text-ink-900 transition-colors after:absolute after:inset-0 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
          >
            {update.title}
          </Link>
        </div>

        {excerpt && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            {excerpt}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2.5">
          <span className="text-xs font-medium text-ink-700 dark:text-ink-200">
            {authorName}
          </span>
          {mins > 1 && (
            <span className="text-xs text-ink-400 dark:text-ink-500">
              · {mins} min read
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
