"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SearchItem } from "@/lib/types";

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

export function CommandPalette({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return items.slice(0, 8);
    return items
      .filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.snippet.toLowerCase().includes(q) ||
          it.type.includes(q),
      )
      .slice(0, 12);
  }, [items, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (
        e.key === "/" &&
        !open &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
      const dialog = dialogRef.current;
      if (dialog) {
        const focusables = () =>
          Array.from(
            dialog.querySelectorAll<HTMLElement>(
              'a[href], button, input, [tabindex]:not([tabindex="-1"])',
            ),
          );
        const onKey = (e: KeyboardEvent) => {
          if (e.key !== "Tab") return;
          const els = focusables();
          if (els.length === 0) return;
          const first = els[0];
          const last = els[els.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        };
        dialog.addEventListener("keydown", onKey);
        return () => {
          document.body.style.overflow = "";
          dialog.removeEventListener("keydown", onKey);
        };
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  const grouped = useMemo(() => {
    const updates = results.filter((r) => r.type === "update");
    const sops = results.filter((r) => r.type === "sop");
    return [
      updates.length ? { label: "Updates", list: updates } : null,
      sops.length ? { label: "SOPs", list: sops } : null,
    ].filter(Boolean) as { label: string; list: SearchItem[] }[];
  }, [results]);

  if (!open) return null;

  const navigate = (dir: 1 | -1) => {
    if (results.length === 0) return;
    setActive((a) => (a + dir + results.length) % results.length);
    listRef.current
      ?.querySelectorAll<HTMLElement>("[data-opt]")
      ?.[(active + dir + results.length) % results.length]?.scrollIntoView({
        block: "nearest",
      });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      navigate(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      navigate(-1);
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      router.push(results[active].href);
      setOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-ink-950/50 p-4 pt-[10vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Search content"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-ink-200 bg-white shadow-2xl ring-1 ring-ink-950/5 dark:border-ink-700 dark:bg-ink-900 dark:ring-white/5"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-ink-100 px-4 dark:border-ink-800">
          <svg
            className="shrink-0 text-ink-400"
            width="18"
            height="18"
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
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search updates & SOPs…"
            className="h-14 w-full bg-transparent text-base text-ink-900 outline-none placeholder:text-ink-400 dark:text-white dark:placeholder:text-ink-500"
          />
          <kbd className="hidden shrink-0 rounded border border-ink-200 px-1.5 py-0.5 text-[10px] text-ink-400 sm:block dark:border-ink-700">
            ESC
          </kbd>
        </div>

        <div
          ref={listRef}
          role="listbox"
          aria-label="Results"
          className="max-h-[50vh] overflow-y-auto"
        >
          {grouped.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-ink-500 dark:text-ink-400">
              No results for &ldquo;{query}&rdquo;.
            </div>
          )}
          {grouped.map((group) => (
            <div key={group.label}>
              <p className="px-4 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">
                {group.label}
              </p>
              {group.list.map((it) => {
                const isActive = results.indexOf(it) === active;
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    data-opt
                    role="option"
                    aria-selected={isActive}
                    className={`flex items-center gap-3 border-l-2 px-4 py-2.5 text-sm transition ${
                      isActive
                        ? "border-brand-500 bg-brand-50/70 dark:border-brand-400 dark:bg-brand-500/10"
                        : "border-transparent hover:bg-ink-50 dark:hover:bg-ink-800/50"
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-300">
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {it.type === "update" ? (
                          <path d="M12 8v4l2.5 2.5" />
                        ) : (
                          <path d="M9 12l2 2 4-4" />
                        )}
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-ink-900 dark:text-white">
                        <Highlight text={it.title} query={q} />
                      </span>
                      <span className="block truncate text-xs text-ink-500 dark:text-ink-400">
                        <Highlight text={it.snippet} query={q} />
                      </span>
                    </span>
                    <span
                      className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                        it.type === "update"
                          ? "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300"
                          : "bg-sky-deep-500/10 text-sky-deep-600 dark:bg-sky-deep-500/20 dark:text-sky-deep-400"
                      }`}
                    >
                      {it.type}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink-100 bg-ink-50/60 px-4 py-2.5 dark:border-ink-800 dark:bg-ink-800/40">
          <div className="flex items-center gap-3 text-[11px] text-ink-500 dark:text-ink-400">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-ink-200 bg-white px-1 text-[10px] dark:border-ink-700 dark:bg-ink-900">
                ↑
              </kbd>
              <kbd className="rounded border border-ink-200 bg-white px-1 text-[10px] dark:border-ink-700 dark:bg-ink-900">
                ↓
              </kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-ink-200 bg-white px-1 text-[10px] dark:border-ink-700 dark:bg-ink-900">
                ↵
              </kbd>
              select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-ink-200 bg-white px-1 text-[10px] dark:border-ink-700 dark:bg-ink-900">
                esc
              </kbd>
              close
            </span>
          </div>
          <p className="text-[11px] text-ink-400 dark:text-ink-500">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
        </div>
      </div>
    </div>
  );
}
