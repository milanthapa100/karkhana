"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type SectionLink = {
  href: string;
  label: string;
};

export function DocsLayout({
  section,
  sectionHref,
  links,
  children,
  sidebar,
}: {
  section: string;
  sectionHref: string;
  links: SectionLink[];
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      className={
        sidebar
          ? "lg:grid lg:grid-cols-[240px_minmax(0,1fr)_260px] lg:gap-8 xl:gap-10"
          : "lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8 xl:gap-10"
      }
    >
      {/* Left section nav - drawer on mobile, sticky on desktop */}
      <div className="lg:relative">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mb-4 flex w-full items-center justify-between gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700 lg:hidden dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
          aria-haspopup="dialog"
        >
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-ink-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {section}
          </span>
          <svg
            className="h-4 w-4 text-ink-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>

        <aside className="hidden lg:sticky lg:top-20 lg:block lg:self-start">
          <SectionNav
            section={section}
            sectionHref={sectionHref}
            links={links}
          />
        </aside>

        {open && (
          <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
            <div
              className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div
              ref={drawerRef}
              className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-white p-4 shadow-xl dark:bg-ink-900"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink-900 dark:text-white">
                  {section}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <SectionNav
                  section={section}
                  sectionHref={sectionHref}
                  links={links}
                  onNavigate={() => setOpen(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Center content */}
      <main className="min-w-0">{children}</main>

      {/* Right sidebar (TOC etc.) */}
      {sidebar && (
        <aside className="hidden xl:sticky xl:top-20 xl:block xl:self-start">
          {sidebar}
        </aside>
      )}
    </div>
  );
}

function SectionNav({
  section,
  sectionHref,
  links,
  onNavigate,
}: {
  section: string;
  sectionHref: string;
  links: SectionLink[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label={`${section} navigation`} className="text-sm">
      <Link
        href={sectionHref}
        onClick={onNavigate}
        className="-mx-2 mb-2 block rounded-lg px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-400 transition hover:text-brand-700 dark:text-ink-500 dark:hover:text-brand-300"
      >
        {section}
      </Link>
      <ul className="space-y-0.5 border-l border-ink-200 dark:border-ink-800">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={`-ml-px flex border-l-2 py-1.5 pl-4 text-sm transition ${
                  isActive
                    ? "border-brand-500 font-medium text-brand-700 dark:border-brand-400 dark:text-brand-300"
                    : "border-transparent text-ink-600 hover:border-ink-300 hover:text-ink-900 dark:text-ink-300 dark:hover:border-ink-600 dark:hover:text-white"
                }`}
              >
                <span className="line-clamp-2 leading-snug">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
