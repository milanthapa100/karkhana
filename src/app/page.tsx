import Link from "next/link";
import { listUpdates } from "@/lib/content";
import { listSops } from "@/lib/sop";

export const metadata = {
  title: "Overview",
  description: "DPK content system overview.",
};

export default function HomePage() {
  const updates = listUpdates();
  const sops = listSops();
  const activeSops = sops.filter((s) => s.status === "active").length;
  const publishedUpdates = updates.filter((u) => u.status === "published").length;

  return (
    <div className="flex flex-col gap-10">
      <section className="relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white p-8 sm:p-12 dark:border-ink-800 dark:bg-ink-900">
        <div className="relative">
          <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-800 shadow-sm dark:border-ink-700 dark:bg-ink-800 dark:text-white">
            DPK Content System
          </p>
          <h1 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-5xl dark:text-white">
            The one home for the team&apos;s work.{" "}
            <span className="text-brand-600 dark:text-brand-400">
              Content, right in one place.
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
            Content-driven updates and standard operating procedures, written in
            Markdown and reviewed on GitHub.
          </p>

          <div className="mt-8 grid max-w-lg grid-cols-1 gap-4 min-[360px]:grid-cols-3">
            <div className="rounded-2xl border border-ink-200/70 bg-white/70 p-4 backdrop-blur dark:border-ink-700 dark:bg-ink-800/40">
              <p className="font-display text-2xl font-semibold text-brand-600 dark:text-brand-400">
                {updates.length}
              </p>
              <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">
                Updates
              </p>
            </div>
            <div className="rounded-2xl border border-ink-200/70 bg-white/70 p-4 backdrop-blur dark:border-ink-700 dark:bg-ink-800/40">
              <p className="font-display text-2xl font-semibold text-accent-500 dark:text-accent-300">
                {sops.length}
              </p>
              <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">SOPs</p>
            </div>
            <div className="rounded-2xl border border-ink-200/70 bg-white/70 p-4 backdrop-blur dark:border-ink-700 dark:bg-ink-800/40">
              <p className="font-display text-2xl font-semibold text-sky-deep-500 dark:text-sky-deep-400">
                GitHub
              </p>
              <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">Workflow</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/updates"
          className="group rounded-2xl border border-ink-200/70 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-ink-800 dark:bg-ink-900"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-ink-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
                Updates
              </h2>
              <p className="text-sm text-ink-500 dark:text-ink-400">
                {publishedUpdates} published · {updates.length} total
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            Progress reports and announcements about the team&apos;s work.
          </p>
        </Link>

        <Link
          href="/sops"
          className="group rounded-2xl border border-ink-200/70 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-ink-800 dark:bg-ink-900"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-300">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-ink-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
                SOPs
              </h2>
              <p className="text-sm text-ink-500 dark:text-ink-400">
                {activeSops} active · {sops.length} total
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            Step-by-step procedures with checklists for how things get done.
          </p>
        </Link>
      </div>
    </div>
  );
}
