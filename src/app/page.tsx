import { listUpdates } from "@/lib/content";
import { listSops } from "@/lib/sop";
import { EmptyState } from "@/components/EmptyState";
import { FilterableGrid } from "@/components/FilterableGrid";
import { Logo } from "@/components/Logo";
export const metadata = {
  title: "Updates",
  description: "Recent content published by the Karkhana team.",
};

const UPDATE_STATUSES = ["draft", "in-progress", "done", "published"];

export default function HomePage() {
  const updates = listUpdates();
  const sops = listSops();
  const statuses = Array.from(
    new Set(updates.map((u) => u.status ?? "").filter(Boolean)),
  ).filter((s) => UPDATE_STATUSES.includes(s));

  return (
    <div className="flex flex-col gap-14">
      <section className="relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white p-8 sm:p-12 dark:border-ink-800 dark:bg-ink-900">
        <div className="relative">
          <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-800 shadow-sm dark:border-ink-700 dark:bg-ink-800 dark:text-white">
            <Logo height={14} />
            DPK Content System
          </p>
          <h1 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-5xl dark:text-white">
            Where the team&apos;s work becomes{" "}
            <span className="text-brand-600 dark:text-brand-400">
              one living surface.
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
            Content-driven updates and standard operating procedures — written in
            Markdown, reviewed on GitHub, published automatically.
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

      <section>
        {updates.length === 0 ? (
          <EmptyState
            title="No updates yet"
            note="Add a Markdown file to get started. It will be validated and published automatically."
            code="content/updates/"
          />
        ) : (
          <FilterableGrid
            title="Updates"
            items={updates.map((u) => ({ __type: "update", ...u }))}
            statusOptions={statuses}
            emptyState={
              <p className="rounded-2xl border border-dashed border-ink-300 bg-white/60 p-8 text-center text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-900/40 dark:text-ink-400">
                No updates match the selected filters.
              </p>
            }
          />
        )}
      </section>
    </div>
  );
}
