import { listSops } from "@/lib/sop";
import { EmptyState } from "@/components/EmptyState";
import { FilterableGrid } from "@/components/FilterableGrid";

export const metadata = {
  title: "Standard Operating Procedures",
  description: "Step-by-step procedures owned by the Karkhana team.",
};

export default function SopsPage() {
  const sops = listSops();
  const activeCount = sops.filter((s) => s.status === "active").length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-500 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-400">
            Standard Operating Procedures
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
            How things get done.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
            {activeCount} active {activeCount === 1 ? "procedure" : "procedures"} with{" "}
            {sops.length} total. Each includes a checklist you can work through.
          </p>
        </div>
        <p className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-100 px-3 py-1.5 text-xs font-medium text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="9" />
          </svg>
          Checklists included
        </p>
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
          statusOptions={Array.from(new Set(sops.map((s) => s.status ?? ""))).filter(
            Boolean,
          )}
          emptyState={
            <p className="rounded-2xl border border-dashed border-ink-300 bg-white/60 p-8 text-center text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-900/40 dark:text-ink-400">
              No SOPs match the selected filters.
            </p>
          }
        />
      )}
    </div>
  );
}
