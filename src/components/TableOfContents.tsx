"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";
import { scrollToY } from "@/lib/scroll";

export function TableOfContents({ headings }: { headings: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="space-y-3 text-xs"
    >
      <p className="font-display text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-ink-200/80 dark:border-ink-800">
        {headings.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    const top =
                      target.getBoundingClientRect().top + window.scrollY - 90;
                    scrollToY(top);
                    setActiveId(item.id);
                  }
                }}
                className={`block border-l-2 py-1 transition-colors ${
                  item.level === 3 ? "pl-6" : "pl-3"
                } ${
                  isActive
                    ? "-ml-px border-brand-600 font-medium text-brand-700 dark:border-brand-400 dark:text-brand-300"
                    : "-ml-px border-transparent text-ink-600 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
