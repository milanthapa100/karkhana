import { listUpdates } from "@/lib/content";
import { EmptyState } from "@/components/EmptyState";
import { FilterableGrid } from "@/components/FilterableGrid";

export const metadata = {
  title: "Updates",
  description: "Recent content published by the DPK team.",
};

const UPDATE_STATUSES = ["draft", "in-progress", "done", "published"];

export default function UpdatesPage() {
  const updates = listUpdates();
  const statuses = Array.from(
    new Set(updates.map((u) => u.status ?? "").filter(Boolean)),
  ).filter((s) => UPDATE_STATUSES.includes(s));

  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
          Updates
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
          Content-driven updates from the DPK team, written in Markdown,
          reviewed on GitHub, published automatically.
        </p>
      </div>

      {updates.length === 0 ? (
        <EmptyState
          title="No updates yet"
          note="Add a Markdown file to get started. It will be validated and published automatically."
          code="content/updates/"
        />
      ) : (
        <FilterableGrid
          items={updates.map((u) => ({ __type: "update", ...u }))}
          statusOptions={statuses}
          emptyState={
            <p className="rounded-2xl border border-dashed border-ink-300 bg-white/60 p-8 text-center text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-900/40 dark:text-ink-400">
              No updates match the selected filters.
            </p>
          }
        />
      )}
    </div>
  );
}
