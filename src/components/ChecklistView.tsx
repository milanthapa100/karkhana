"use client";

import { useEffect, useMemo, useState } from "react";
import { createHeadingIdResolver } from "@/lib/toc";

type ChecklistItem = { key: string; label: string };
type ChecklistGroup = { title: string; items: ChecklistItem[]; note: string[]; id: string };

function parseBody(body: string): { intro: string[]; groups: ChecklistGroup[] } {
  const intro: string[] = [];
  const groups: ChecklistGroup[] = [];
  let current: ChecklistGroup | null = null;

  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;

    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      current = { title: heading[1].trim(), items: [], note: [], id: "" };
      groups.push(current);
      continue;
    }

    const item = line.match(/^\s*-\s*\[([ xX])\]\s*(.+)$/);
    if (item && current) {
      current.items.push({
        key: `${groups.length - 1}:${current.items.length}`,
        label: item[2].trim(),
      });
      continue;
    }

    if (current) current.note.push(line);
    else intro.push(line);
  }

  return { intro, groups };
}

export function ChecklistView({
  slug,
  body,
}: {
  slug: string;
  body: string;
}) {
  const storageKey = `dpk-checklist:${slug}`;
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* ignore unreadable stored state */
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      /* ignore storage write failures */
    }
  }, [checked, storageKey]);

  const { intro, groups } = useMemo(() => {
    const parsed = parseBody(body);
    const resolveId = createHeadingIdResolver();
    for (const group of parsed.groups) {
      group.id = resolveId(group.title);
    }
    return parsed;
  }, [body]);

  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const done = groups.reduce(
    (n, g) => n + g.items.filter((it) => checked[it.key]).length,
    0,
  );
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col gap-8">
      {intro.length > 0 && (
        <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {intro.join(" ")}
        </p>
      )}

      <div className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold tracking-tight text-ink-900 dark:text-white">
              Progress
            </p>
            <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">
              {done} / {total} completed
            </p>
          </div>
          <button
            type="button"
            onClick={() => setChecked({})}
            disabled={done === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 transition hover:border-brand-400 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-ink-700 dark:text-ink-300 dark:hover:border-brand-600 dark:hover:text-white"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {groups.map((group) => (
        <section key={group.title} className="flex flex-col gap-3">
          <h2
            id={group.id}
            className="font-display text-lg font-semibold tracking-tight text-ink-900 dark:text-white"
          >
            {group.title}
          </h2>

          {group.note.length > 0 && (
            <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              {group.note.join(" ")}
            </p>
          )}

          <ul className="flex flex-col gap-2">
            {group.items.map((item) => {
              const isDone = !!checked[item.key];
              return (
                <li key={item.key}>
                  <label className="group flex cursor-pointer items-start gap-3 rounded-xl border border-ink-200 bg-white p-3.5 transition-colors dark:border-ink-800 dark:bg-ink-900">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggle(item.key)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-emerald-600 accent-emerald-600 dark:border-ink-600 dark:accent-emerald-500"
                    />
                    <span
                      className={`text-sm leading-relaxed transition ${
                        isDone
                          ? "text-ink-400 line-through dark:text-ink-500"
                          : "text-ink-700 dark:text-ink-200"
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}