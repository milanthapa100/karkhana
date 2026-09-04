"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export type SearchItem = {
  title: string;
  href: string;
  type: "update" | "sop";
  snippet: string;
  status?: string;
  date?: string;
};

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  if (!q) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-sm bg-brand-100 px-0.5 text-brand-800 dark:bg-brand-500/30 dark:text-brand-100">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

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
        .slice(0, 6)
    : [];

  return (
    <div ref={boxRef} className="relative w-full max-w-xl">
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
        width="17"
        height="17"
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
        aria-label="Search content"
        className="h-12 w-full rounded-xl border border-ink-200 bg-white pl-10 pr-14 text-sm text-ink-900 shadow-sm outline-none transition placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-ink-700 dark:bg-ink-800/70 dark:text-white dark:placeholder:text-ink-500"
      />
      <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-ink-200 px-1.5 py-0.5 text-[10px] text-ink-400 sm:flex dark:border-ink-700">
        <span>Ctrl</span>
        <span>K</span>
      </kbd>
      {focused && q && results.length > 0 && (
        <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl border border-ink-200 bg-white shadow-xl dark:border-ink-700 dark:bg-ink-800">
          {results.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block border-b border-ink-100 px-4 py-3 transition last:border-0 hover:bg-ink-50 dark:border-ink-700/60 dark:hover:bg-ink-700/40"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-ink-900 dark:text-white">
                  <Highlight text={it.title} query={q} />
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                    it.type === "update"
                      ? "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300"
                      : "bg-sky-deep-500/10 text-sky-deep-600 dark:bg-sky-deep-500/20 dark:text-sky-deep-400"
                  }`}
                >
                  {it.type}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-ink-500 dark:text-ink-400">
                <Highlight text={it.snippet} query={q} />
              </p>
            </Link>
          ))}
        </div>
      )}
      {focused && q && results.length === 0 && (
        <div className="absolute left-0 top-14 z-50 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-500 shadow-xl dark:border-ink-700 dark:bg-ink-800 dark:text-ink-400">
          No results for &ldquo;{query}&rdquo;.
        </div>
      )}
    </div>
  );
}
