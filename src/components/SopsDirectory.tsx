"use client";

import { useState } from "react";
import { FilterableGrid } from "./FilterableGrid";
import type { Sop } from "@/lib/sop";

type Filter = "all" | "sop" | "checklist";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sop", label: "SOPs" },
  { value: "checklist", label: "Checklists" },
];

export function SopsDirectory({ sops }: { sops: Sop[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = {
    all: sops.length,
    sop: sops.filter((s) => s.type === "sop").length,
    checklist: sops.filter((s) => s.type === "checklist").length,
  };

  const filtered =
    filter === "all" ? sops : sops.filter((s) => s.type === filter);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
              filter === f.value
                ? "bg-brand-600 text-white shadow-2xs dark:bg-brand-500"
                : "text-ink-600 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800"
            }`}
          >
            {f.label}
            <span
              className={
                filter === f.value
                  ? "opacity-70"
                  : "text-ink-400 dark:text-ink-500"
              }
            >
              {" "}
              ({counts[f.value]})
            </span>
          </button>
        ))}
      </div>

      <FilterableGrid
        items={filtered.map((s) => ({ __type: "sop", ...s }))}
        emptyState={
          <p className="rounded-2xl border border-dashed border-ink-300 bg-white/60 p-8 text-center text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-900/40 dark:text-ink-400">
            No {filter === "checklist" ? "checklists" : "SOPs"} available yet.
          </p>
        }
      />
    </div>
  );
}