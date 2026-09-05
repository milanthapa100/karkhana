import Link from "next/link";
import { readingMinutes } from "@/lib/reading";
import type { Sop } from "@/lib/sop";

export default function SopCard({ sop }: { sop: Sop }) {
  const mins = readingMinutes(sop.body);
  const ownerName = sop.owner || "DPK Team";

  return (
    <li className="group relative border-b border-ink-100 py-6 last:border-0 hover:bg-ink-50/50 dark:border-ink-800/70 dark:hover:bg-ink-900/40">
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Link
            href={`/sops/${sop.slug}`}
            className="group/title font-display text-lg font-semibold tracking-tight text-ink-900 transition-colors after:absolute after:inset-0 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
          >
            {sop.title}
          </Link>
        </div>

        {sop.summary && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            {sop.summary}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2.5">
          <span className="text-xs font-medium text-ink-700 dark:text-ink-200">
            {ownerName}
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
