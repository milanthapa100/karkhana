"use client";

import { useEffect, useMemo, useState } from "react";
import type { Update } from "@/lib/content";
import type { Sop } from "@/lib/sop";
import UpdateCard from "./UpdateCard";
import SopCard from "./SopCard";

type Item =
  | ({ __type: "update" } & Update)
  | ({ __type: "sop" } & Sop);

export function FilterableGrid({
  items,
  statusOptions = [],
  emptyState,
  columns = 2,
  title,
  pageSize = 6,
}: {
  items: Item[];
  statusOptions?: string[];
  emptyState?: React.ReactNode;
  columns?: 1 | 2;
  title?: string;
  pageSize?: number;
}) {
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [visible, setVisible] = useState(pageSize);

  const filtered = useMemo(() => {
    let out = items.filter((it) => {
      if (status !== "all" && (it.status ?? "") !== status) return false;
      return true;
    });
    if (sort === "newest") out = [...out].sort((a, b) => (a.date < b.date ? 1 : -1));
    else if (sort === "oldest") out = [...out].sort((a, b) => (a.date > b.date ? 1 : -1));
    else out = [...out].sort((a, b) => a.title.localeCompare(b.title));
    return out;
  }, [items, status, sort]);

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;

  const statusList = useMemo(
    () => statusOptions.filter((s) => s && s !== "all"),
    [statusOptions],
  );

  useEffect(() => {
    setVisible(pageSize);
  }, [status, sort, pageSize]);

  const selectCls =
    "inline-flex h-8 items-center rounded-lg border border-ink-200 bg-white pl-7 pr-7 text-sm text-ink-700 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200";

  const chips = [
    { value: "all", label: "All" },
    ...statusList.map((s) => ({ value: s, label: s.replace("-", " ") })),
  ];

  const chipCls = (isActive: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs font-medium transition ${
      isActive
        ? "border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/15 dark:text-brand-300"
        : "border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300 dark:hover:border-ink-600 dark:hover:bg-ink-800/70"
    }`;

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        {title && (
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
              Showing {filtered.length} of {items.length}
            </p>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          {statusList.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {chips.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setStatus(c.value)}
                  aria-pressed={status === c.value}
                  className={chipCls(status === c.value)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
          <div className="ml-1 flex items-center gap-1.5 border-l border-ink-200 pl-3 dark:border-ink-700">
            <label htmlFor="f-sort" className="sr-only">
              Sort
            </label>
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400 dark:text-ink-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m3 16 4 4 4-4M7 20V4M21 8l-4-4-4 4M17 4v16" />
              </svg>
              <select
                id="f-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={selectCls}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        emptyState ?? (
          <p className="rounded-2xl border border-dashed border-ink-300 p-8 text-center text-sm text-ink-500 dark:border-ink-700 dark:text-ink-400">
            No items match the current filters.
          </p>
        )
      ) : (
        <>
          <div
            className={`grid gap-4 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
          >
            {shown.map((it) =>
              it.__type === "update" ? (
                <UpdateCard key={it.slug} update={it} />
              ) : (
                <SopCard key={it.slug} sop={it} />
              ),
            )}
          </div>
          {hasMore && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + pageSize)}
                className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-700 transition hover:border-brand-400 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200 dark:hover:border-brand-600 dark:hover:text-white"
              >
                Load more
                <span className="text-xs text-ink-400 dark:text-ink-500">
                  ({filtered.length - visible} remaining)
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
