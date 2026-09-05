"use client";

import { useState } from "react";
import type { Update } from "@/lib/content";
import type { Sop } from "@/lib/sop";
import UpdateCard from "./UpdateCard";
import SopCard from "./SopCard";

type Item =
  | ({ __type: "update" } & Update)
  | ({ __type: "sop" } & Sop);

export function FilterableGrid({
  items,
  emptyState,
  pageSize = 8,
}: {
  items: Item[];
  emptyState?: React.ReactNode;
  pageSize?: number;
}) {
  const [visible, setVisible] = useState(pageSize);

  const shown = items.slice(0, visible);
  const hasMore = items.length > visible;

  return (
    <>
      {items.length === 0 ? (
        emptyState ?? (
          <p className="rounded-2xl border border-dashed border-ink-300 p-8 text-center text-sm text-ink-500 dark:border-ink-700 dark:text-ink-400">
            No items yet.
          </p>
        )
      ) : (
        <>
          <ul className="max-w-3xl">
            {shown.map((it) =>
              it.__type === "update" ? (
                <UpdateCard key={`update:${it.slug}`} update={it} />
              ) : (
                <SopCard key={`sop:${it.slug}`} sop={it} />
              ),
            )}
          </ul>
          {hasMore && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + pageSize)}
                className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-700 transition hover:border-brand-400 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200 dark:hover:border-brand-600 dark:hover:text-white"
              >
                Load more
                <span className="text-xs text-ink-400 dark:text-ink-500">
                  ({items.length - visible} remaining)
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}