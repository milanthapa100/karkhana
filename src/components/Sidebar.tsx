"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { NAV_ITEMS, isNavActive } from "./nav-config";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[260px] shrink-0 flex-col border-r border-ink-200/70 bg-white dark:border-ink-800 dark:bg-ink-950">
      <div className="flex h-14 shrink-0 items-center border-b border-ink-200/70 px-4 dark:border-ink-800">
        <Link href="/" aria-label="DPK home" className="inline-block">
          <Logo height={24} />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Sidebar">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-ink-100 text-ink-900 dark:bg-ink-800 dark:text-white"
                      : "text-ink-600 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-900 dark:hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
