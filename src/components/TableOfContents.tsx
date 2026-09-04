"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const ids = items.map((i) => i.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">
        On this page
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
              <button
                type="button"
                onClick={() => scrollToId(item.id)}
                className={`-mx-2 block w-full rounded-lg px-2 py-1.5 text-left text-sm transition ${
                  isActive
                    ? "bg-brand-50 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                    : "text-ink-500 hover:bg-ink-50 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800/60 dark:hover:text-white"
                }`}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
