import Link from "next/link";
import type { Checklist } from "@/lib/checklist";

export default function ChecklistCard({ checklist }: { checklist: Checklist }) {
  const items = (checklist.body.match(/^\s*-\s*\[[ xX]\]/gm) || []).length;
  const ownerName = checklist.owner || "DPK Team";

  return (
    <li className="group relative border-b border-ink-100 py-6 last:border-0 hover:bg-ink-50/50 dark:border-ink-800/70 dark:hover:bg-ink-900/40">
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Link
            href={`/checklists/${checklist.slug}`}
            className="group/title font-display text-lg font-semibold tracking-tight text-ink-900 transition-colors after:absolute after:inset-0 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
          >
            {checklist.title}
          </Link>
          {items > 0 && (
            <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 ring-1 ring-inset ring-emerald-500/15 dark:bg-emerald-500/20 dark:text-emerald-400 dark:ring-emerald-500/30">
              {items} items
            </span>
          )}
        </div>

        {checklist.summary && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            {checklist.summary}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2.5">
          <span className="text-xs font-medium text-ink-700 dark:text-ink-200">
            {ownerName}
          </span>
        </div>
      </div>
    </li>
  );
}