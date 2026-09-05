"use client";

import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10" aria-busy="true" aria-label="Loading">
      {/* Compact Header + Search */}
      <header className="max-w-3xl">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="mt-3 h-9 w-72 sm:h-10" />
        <Skeleton className="mt-3 h-5 w-full max-w-md" />
        <Skeleton className="mt-6 h-12 w-full max-w-xl rounded-xl" />
      </header>

      {/* Stat Cards */}
      <div className="grid gap-5 sm:grid-cols-3">
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
      </div>

      {/* Activity Feed */}
      <div>
        <div className="flex items-end justify-between">
          <div>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="mt-2 h-4 w-56" />
          </div>
        </div>
        <div className="mt-2 rounded-2xl border border-ink-200/70 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
          <div className="flex items-start gap-3.5 py-4 first:pt-0">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-4 w-56" />
              <Skeleton className="mt-2 h-3 w-3/4" />
              <div className="mt-3 flex items-center gap-3">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-14" />
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3.5 border-t border-ink-100 py-4 dark:border-ink-800/70">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="mt-2 h-3 w-2/3" />
              <div className="mt-3 flex items-center gap-3">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-14" />
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3.5 border-t border-ink-100 py-4 first:pt-0 dark:border-ink-800/70">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-4 w-52" />
              <Skeleton className="mt-2 h-3 w-2/3" />
              <div className="mt-3 flex items-center gap-3">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-14" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}