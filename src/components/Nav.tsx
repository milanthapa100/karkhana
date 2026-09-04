"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/", label: "Updates" },
  { href: "/sops", label: "SOPs" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const first = menuRef.current?.querySelector<HTMLElement>(
      "a, button",
    );
    first?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const openPalette = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/40 bg-white/60 backdrop-blur-xl dark:border-ink-800/40 dark:bg-ink-950/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Karkhana home">
          <Logo height={32} />
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {LINKS.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? "text-brand-700 dark:text-brand-300"
                    : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={openPalette}
            className="flex h-9 items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 text-sm text-ink-500 transition hover:border-brand-400 hover:text-ink-800 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-400 dark:hover:border-brand-600 dark:hover:text-white"
            aria-label="Search (Ctrl+K)"
          >
            <svg
              className="h-4 w-4"
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
            <span className="text-xs">Search</span>
            <kbd className="flex items-center gap-0.5 rounded border border-ink-200 px-1 text-[10px] font-normal text-ink-400 dark:border-ink-600">
              <span>Ctrl</span>
              <span>K</span>
            </kbd>
          </button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="border-t border-ink-200/40 bg-white/90 px-4 py-3 backdrop-blur-xl sm:hidden dark:border-ink-800/40 dark:bg-ink-950/90"
        >
          <button
            type="button"
            onClick={openPalette}
            className="mb-2 flex w-full items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2.5 text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-400"
          >
            <svg
              className="h-4 w-4"
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
            <span className="text-xs">Search content…</span>
          </button>
          {LINKS.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "text-brand-700 dark:text-brand-300"
                    : "text-ink-700 hover:text-ink-900 dark:text-ink-200 dark:hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
