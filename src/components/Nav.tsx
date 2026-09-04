"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Updates" },
  { href: "/sops", label: "SOPs" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/40 bg-white/50 backdrop-blur-xl dark:border-ink-800/40 dark:bg-ink-950/40">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center font-sans text-lg font-semibold tracking-tight text-ink-900 dark:text-white"
        >
          DPK@Karkhana
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition ${
                  active
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center text-ink-600 transition hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
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
        <div className="border-t border-ink-200/40 bg-white/60 px-4 py-2 backdrop-blur-xl sm:hidden dark:border-ink-800/40 dark:bg-ink-950/60">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-2 py-2.5 text-sm font-medium text-ink-700 transition hover:text-brand-600 dark:text-ink-200 dark:hover:text-brand-400"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
