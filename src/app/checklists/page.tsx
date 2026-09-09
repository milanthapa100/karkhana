import { listChecklists } from "@/lib/checklist";
import { EmptyState } from "@/components/EmptyState";
import { FilterableGrid } from "@/components/FilterableGrid";

export const metadata = {
  title: "Checklists",
  description: "Reusable guides for checking work and maintaining quality.",
};

export default function ChecklistsPage() {
  const checklists = listChecklists();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
            Checklists
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
            Reusable guides for checking work and maintaining quality.
          </p>
        </div>
      </div>

      {checklists.length === 0 ? (
        <EmptyState
          title="No checklists yet"
          note="Add a Markdown file to get started."
          code="content/checklists/"
        />
      ) : (
        <FilterableGrid
          items={checklists.map((c) => ({ __type: "checklist", ...c }))}
          emptyState={
            <p className="rounded-2xl border border-dashed border-ink-300 bg-white/60 p-8 text-center text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-900/40 dark:text-ink-400">
              No checklists available yet.
            </p>
          }
        />
      )}
    </div>
  );
}