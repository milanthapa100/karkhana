import { listUpdates } from "@/lib/content";
import { EmptyState } from "@/components/EmptyState";
import { FilterableGrid } from "@/components/FilterableGrid";

export const metadata = {
  title: "Updates",
  description: "Recent updates from the DPK team.",
};

export default function UpdatesPage() {
  const updates = listUpdates();

  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
          Updates
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
          Progress reports and announcements from the DPK team, in
          chronological order.
        </p>
      </div>

      {updates.length === 0 ? (
        <EmptyState
          title="No updates yet"
          note="Add a Markdown file to get started. It will be validated and served on the office server."
          code="content/updates/"
        />
      ) : (
        <FilterableGrid
          items={updates.map((u) => ({ __type: "update", ...u }))}
          emptyState={
            <p className="rounded-2xl border border-dashed border-ink-300 bg-white/60 p-8 text-center text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-900/40 dark:text-ink-400">
              No updates available yet.
            </p>
          }
        />
      )}
    </div>
  );
}
