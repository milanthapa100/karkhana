"use client";

import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl" aria-busy="true" aria-label="Loading article">
      <div className="mb-6">
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="mt-6 max-w-3xl">
        <header className="border-b border-ink-200 pb-8 dark:border-ink-800">
          <Skeleton className="h-10 w-5/6 sm:h-12" />
          <Skeleton className="mt-3 h-10 w-2/3 sm:h-12" />
          <div className="mt-7 flex items-center gap-4">
            <Skeleton className="h-11 w-11 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-2 h-3 w-40" />
            </div>
          </div>
        </header>

        <div className="pt-8">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-4/5" />
          <Skeleton className="mt-8 h-6 w-40" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
