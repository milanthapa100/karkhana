"use client";

import { useMemo, useState } from "react";
import { FilterableGrid } from "./FilterableGrid";
import type { Sop } from "@/lib/sop";

type Group = { unit: string; items: Sop[] };

export function SopsBrowser({ sops }: { sops: Sop[] }) {
  const groups = useMemo<Group[]>(() => {
    const map = new Map<string, Sop[]>();
    for (const sop of sops) {
      const unit = sop.unit || "General";
      const list = map.get(unit) ?? [];
      list.push(sop);
      map.set(unit, list);
    }
    return [...map.entries()]
      .map(([unit, items]) => ({ unit, items }))
      .sort((a, b) => a.unit.localeCompare(b.unit));
  }, [sops]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: sops.length };
    for (const g of groups) c[g.unit] = g.items.length;
    return c;
  }, [groups, sops.length]);

  const [active, setActive] = useState<string>("all");
  const visible =
    active === "all" ? groups : groups.filter((g) => g.unit === active);

  const chips = [{ unit: "all" }, ...groups.map((g) => ({ unit: g.unit }))];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center gap-1.5">
        {chips.map(({ unit }) => (
          <button
            key={unit}
            type="button"
            onClick={() => setActive(unit)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
              active === unit
                ? "bg-brand-600 text-white shadow-2xs dark:bg-brand-500"
                : "text-ink-600 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800"
            }`}
          >
            {unit === "all" ? "All" : unit}
            <span
              className={
                active === unit ? "opacity-70" : "text-ink-400 dark:text-ink-500"
              }
            >
              {" "}
              ({counts[unit]})
            </span>
          </button>
        ))}
      </div>

      {visible.map((g) => (
        <section key={g.unit} className="flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
              {g.unit}
            </h2>
            <span className="text-xs text-ink-500 dark:text-ink-400">
              {g.items.length} {g.items.length === 1 ? "SOP" : "SOPs"}
            </span>
          </div>
          <FilterableGrid
            key={`${active}:${g.unit}`}
            items={g.items.map((s) => ({ __type: "sop", ...s }))}
            emptyState={
              <p className="rounded-2xl border border-dashed border-ink-300 bg-white/60 p-8 text-center text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-900/40 dark:text-ink-400">
                No SOPs in this unit yet.
              </p>
            }
          />
        </section>
      ))}
    </div>
  );
}