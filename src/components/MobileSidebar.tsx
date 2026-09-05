"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Logo } from "./Logo";
import { NAV_GROUPS, isNavActive } from "./nav-config";

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const first = drawerRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!open) return null;

  return (
    <div className="no-print fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-white shadow-xl dark:bg-ink-900"
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-ink-200/70 px-4 dark:border-ink-800">
          <Link href="/" aria-label="DPK home" className="inline-block" onClick={onClose}>
            <Logo height={24} />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pb-2 pt-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("dpk:open-palette"));
                }
              }}
              className="group flex w-full items-center gap-2.5 rounded-xl border border-ink-200/80 bg-ink-50/60 px-3 py-2 text-xs text-ink-500 shadow-2xs transition-colors hover:border-brand-300 hover:bg-white hover:text-ink-900 dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-400 dark:hover:border-brand-700 dark:hover:bg-ink-900 dark:hover:text-white"
              aria-label="Quick search"
            >
              <svg
                className="h-4 w-4 shrink-0 text-ink-400 transition-colors group-hover:text-brand-600 dark:text-ink-500 dark:group-hover:text-brand-400"
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
              <span className="flex-1 text-left">Search documentation</span>
            </button>
          </div>

          <nav className="px-3 py-2" aria-label="Sidebar">
            {NAV_GROUPS.map((group, gi) => (
              <div key={gi} className="mb-5 last:mb-0">
                {group.label && (
                  <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">
                    {group.label}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isNavActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                            active
                              ? "bg-brand-50 font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"
                              : "text-ink-600 hover:bg-ink-100/70 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-900/80 dark:hover:text-white"
                          }`}
                        >
                          <span
                            className={`transition-colors ${
                              active
                                ? "text-brand-600 dark:text-brand-400"
                                : "text-ink-400 group-hover:text-ink-700 dark:text-ink-500 dark:group-hover:text-ink-300"
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="flex-1 truncate">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
