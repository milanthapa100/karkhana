"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_GROUPS, isNavActive } from "./nav-config";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("karkhana-sidebar");
    if (saved === "collapsed") setCollapsed(true);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      const next = !c;
      window.localStorage.setItem("karkhana-sidebar", next ? "collapsed" : "expanded");
      return next;
    });
  };

  const openPalette = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("dpk:open-palette"));
    }
  };

  return (
    <aside
      className={`no-print sticky top-0 flex h-screen shrink-0 flex-col border-r border-ink-200/70 bg-white transition-all duration-300 dark:border-ink-800 dark:bg-ink-950 ${
        collapsed ? "w-[68px]" : "w-[256px]"
      }`}
    >
      <div className={`flex h-14 shrink-0 items-center ${collapsed ? "justify-center" : "px-5"}`}>
        <Link href="/" aria-label="DPK home" className="inline-block">
          <LogoMark collapsed={collapsed} />
        </Link>
      </div>

      {!collapsed && (
        <div className="px-3 pb-3 pt-0">
          <button
            type="button"
            onClick={openPalette}
            className="group flex w-full items-center gap-2.5 rounded-lg bg-ink-100/60 px-2.5 py-2 text-xs text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-700 dark:bg-ink-900/60 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-200"
            aria-label="Quick search (Ctrl+K or ⌘K)"
            title="Search (Ctrl+K or ⌘K)"
          >
            <svg
              className="h-4 w-4 shrink-0 text-ink-400 dark:text-ink-500"
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
            <span className="flex-1 truncate text-left">Search</span>
            <kbd className="rounded border border-ink-200 bg-white px-1.5 py-0.5 font-sans text-[10px] font-medium text-ink-400 dark:border-ink-700 dark:bg-ink-900/80 dark:text-ink-500">
              ⌘K
            </kbd>
          </button>
        </div>
      )}

      <nav
        className="flex-1 overflow-y-auto px-2.5 pb-4"
        aria-label="Sidebar"
      >
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="mb-6 last:mb-0">
            {group.label && !collapsed && (
              <p className="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">
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
                      aria-current={active ? "page" : undefined}
                      title={collapsed ? item.label : undefined}
                      className={`group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
                        collapsed ? "justify-center" : ""
                      } ${
                        active
                          ? "bg-brand-50 font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"
                          : "text-ink-600 hover:bg-ink-100/50 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800/50 dark:hover:text-white"
                      }`}
                    >
                      <span
                        className={`shrink-0 transition-colors ${
                          active
                            ? "text-brand-600 dark:text-brand-400"
                            : "text-ink-500 group-hover:text-ink-700 dark:text-ink-500 dark:group-hover:text-ink-300"
                        }`}
                      >
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-ink-100 px-2.5 py-3 dark:border-ink-800/70">
        <div className={`flex items-center ${collapsed ? "flex-col gap-2" : "justify-between"} `}>
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleCollapsed}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}