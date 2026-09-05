import { listSops } from "@/lib/sop";
import { EmptyState } from "@/components/EmptyState";
import { FilterableGrid } from "@/components/FilterableGrid";

export const metadata = {
  title: "Standard Operating Procedures",
  description: "Step-by-step procedures owned by the DPK team.",
};

export default function SopsPage() {
  const sops = listSops();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
            Standard Operating Procedures
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
            Step-by-step procedures for the way the DPK team works.
          </p>
        </div>
      </div>

      {sops.length === 0 ? (
        <EmptyState
          title="No SOPs yet"
          note="Add a Markdown file to get started."
          code="content/sops/"
        />
      ) : (
        <FilterableGrid
          items={sops.map((s) => ({ __type: "sop", ...s }))}
          emptyState={
            <p className="rounded-2xl border border-dashed border-ink-300 bg-white/60 p-8 text-center text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-900/40 dark:text-ink-400">
              No SOPs available yet.
            </p>
          }
        />
      )}
    </div>
  );
}
