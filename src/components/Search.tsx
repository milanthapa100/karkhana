"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export type SearchItem = {
  title: string;
  href: string;
  type: "update" | "sop";
  snippet: string;
};

export function Search({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const results = q
    ? items
        .filter(
          (it) =>
            it.title.toLowerCase().includes(q) ||
            it.snippet.toLowerCase().includes(q) ||
            it.type.includes(q),
        )
        .slice(0, 8)
    : [];

  return (
    <div ref={boxRef} className="relative hidden sm:block">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
        placeholder="Search content…"
        className="h-9 w-48 rounded-lg border border-ink-200 bg-white pl-9 pr-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:w-64 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-700 dark:bg-ink-800 dark:text-white dark:placeholder:text-ink-500"
      />
      {focused && q && results.length > 0 && (
        <div className="absolute left-0 top-11 z-50 w-72 overflow-hidden rounded-xl border border-ink-200 bg-white shadow-xl dark:border-ink-700 dark:bg-ink-800">
          {results.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block border-b border-ink-100 px-4 py-3 transition last:border-0 hover:bg-ink-50 dark:border-ink-700/60 dark:hover:bg-ink-700/40"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-ink-900 dark:text-white">
                  {it.title}
                </span>
                <span className="shrink-0 rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-500 dark:bg-ink-700 dark:text-ink-300">
                  {it.type}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-ink-500 dark:text-ink-400">
                {it.snippet}
              </p>
            </Link>
          ))}
        </div>
      )}
      {focused && q && results.length === 0 && (
        <div className="absolute left-0 top-11 z-50 w-72 rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-500 shadow-xl dark:border-ink-700 dark:bg-ink-800 dark:text-ink-400">
          No results for &ldquo;{query}&rdquo;.
        </div>
      )}
    </div>
  );
}
