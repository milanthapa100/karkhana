"use client";

import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8" aria-busy="true" aria-label="Loading SOPs">
      <div className="max-w-2xl">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="mt-3 h-5 w-full max-w-lg" />
        <Skeleton className="mt-2 h-5 w-2/3" />
      </div>

      <ul className="max-w-3xl">
        {[0, 1, 2, 3, 4].map((i) => (
          <li
            key={i}
            className="border-b border-ink-100 py-6 last:border-0 dark:border-ink-800/70"
          >
            <Skeleton className="h-5 w-72" />
            <Skeleton className="mt-2 h-4 w-3/4" />
            <Skeleton className="mt-1.5 h-4 w-1/2" />
            <div className="mt-3 flex items-center gap-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-12" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}