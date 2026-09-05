import Link from "next/link";
import type { RelatedLink } from "@/lib/related";

export function RelatedSops({ links }: { links: RelatedLink[] }) {
  if (!links.length) return null;

  return (
    <section className="no-print mt-12 border-t border-ink-200 pt-8 dark:border-ink-800">
      <h2 className="font-display text-lg font-semibold tracking-tight text-ink-900 dark:text-white">
        Related SOPs
      </h2>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
        Continue reading across the knowledge base.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-ink-200/80 bg-white p-4 transition-colors dark:border-ink-800 dark:bg-ink-900"
            >
              <span className="text-sm font-medium text-ink-800 transition-colors group-hover:text-brand-600 dark:text-ink-200 dark:group-hover:text-brand-400">
                {link.label}
              </span>
              <svg
                className="h-4 w-4 shrink-0 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-600 dark:text-ink-600 dark:group-hover:text-brand-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}