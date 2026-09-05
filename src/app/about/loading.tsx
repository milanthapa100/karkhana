"use client";

import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-12" aria-busy="true" aria-label="Loading about">
      <section className="max-w-2xl">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="mt-4 h-10 w-3/4 sm:h-12" />
        <Skeleton className="mt-4 h-5 w-full max-w-lg" />
        <Skeleton className="mt-2 h-5 w-2/3" />
      </section>

      <section className="border-t border-ink-200 pt-10 dark:border-ink-800">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div>
            <Skeleton className="h-6 w-28" />
            <Skeleton className="mt-2 h-4 w-full" />
          </div>
          <div className="space-y-0 divide-y divide-ink-100 dark:divide-ink-800/70">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <Skeleton className="h-4 w-4 shrink-0" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-200 pt-10 dark:border-ink-800">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div>
            <Skeleton className="h-6 w-28" />
            <Skeleton className="mt-2 h-4 w-full" />
          </div>
          <div>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-baseline gap-4 border-b border-ink-100 py-3 first:border-t dark:border-ink-800/70"
              >
                <Skeleton className="h-3 w-6" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-200 pt-10 dark:border-ink-800">
        <Skeleton className="h-6 w-48" />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-24 rounded-2xl" />
          <Skeleton className="h-24 rounded-2xl" />
          <Skeleton className="h-24 rounded-2xl" />
        </div>
      </section>

      <section className="border-t border-ink-200 pt-10 dark:border-ink-800">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div>
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="max-w-2xl space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </section>
    </div>
  );
}