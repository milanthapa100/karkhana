import Link from "next/link";
import { listUpdates } from "@/lib/content";
import { listSops } from "@/lib/sop";
import { MEMBERS } from "@/lib/members";
import { ActivityRow, type ActivityItem } from "@/components/ActivityRow";
import { PaletteSearchButton } from "@/components/PaletteSearchButton";

export const metadata = {
  title: "Overview",
  description: "DPK content system overview.",
};

export default function HomePage() {
  const updates = listUpdates();
  const sops = listSops();

  const recent: ActivityItem[] = [
    ...updates.map((u) => ({
      type: "update" as const,
      slug: u.slug,
      title: u.title,
      date: u.date,
      excerpt: u.body.trim().split(/\n+/)[0]?.replace(/^#+\s*/, "") ?? "",
      body: u.body,
    })),
    ...sops.map((s) => ({
      type: "sop" as const,
      slug: s.slug,
      title: s.title,
      date: s.date,
      summary: s.summary,
      body: s.body,
    })),
  ]
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, 6);

  const stats = [
    {
      label: "Updates",
      count: updates.length,
      href: "/updates",
      note: "Progress reports from the team",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    },
    {
      label: "SOPs",
      count: sops.length,
      href: "/sops",
      note: "Step-by-step procedures",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    },
    {
      label: "Members",
      count: MEMBERS.length,
      href: "/members",
      note: "The people behind DPK",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      {/* Compact Header + Search */}
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Overview
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
          DPK Knowledge Hub
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
          Everything the team needs, in one place.
        </p>

        <PaletteSearchButton />
      </header>

      {/* Quick Navigation Cards */}
      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-2xl border border-ink-200/80 bg-white p-5 shadow-2xs transition-colors hover:border-ink-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-ink-700"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                {s.icon}
              </span>
              <p className="font-display text-3xl font-bold text-ink-900 dark:text-white">
                {s.count}
              </p>
              <div className="ml-auto text-right">
                <p className="text-sm font-semibold text-ink-800 group-hover:text-brand-600 dark:text-ink-100 dark:group-hover:text-brand-400">
                  {s.label}
                </p>
                <p className="text-[11px] text-ink-500 dark:text-ink-400">
                  {s.note}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Feed */}
      {recent.length > 0 && (
        <section>
          <div className="mb-1 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                Recent Activity
              </h2>
              <p className="text-xs text-ink-500 dark:text-ink-400">
                Latest updates and procedures from the team
              </p>
            </div>
            <div className="hidden items-center gap-3 text-xs text-ink-500 sm:flex dark:text-ink-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent-500" aria-hidden="true" />
                Update
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                SOP
              </span>
            </div>
          </div>

          <ul className="rounded-2xl border border-ink-200/70 bg-white px-5 shadow-xs dark:border-ink-800 dark:bg-ink-900">
            {recent.map((item) => (
              <ActivityRow key={`${item.type}:${item.slug}`} item={item} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}