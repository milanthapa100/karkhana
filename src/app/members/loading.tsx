"use client";

import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8" aria-busy="true" aria-label="Loading members">
      <div className="max-w-2xl">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="mt-3 h-5 w-full max-w-lg" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
    </div>
  );
}
