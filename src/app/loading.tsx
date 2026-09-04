"use client";

import { useEffect } from "react";
import { Skeleton } from "@/components/Skeleton";
import { useNavigationSignal } from "@/components/NavigationProgress";

export default function Loading() {
  const signal = useNavigationSignal();

  useEffect(() => {
    signal.start();
    return () => signal.complete();
  }, [signal]);

  return (
    <div className="flex flex-col gap-14" aria-busy="true" aria-label="Loading">
      <section className="relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white p-8 sm:p-12 dark:border-ink-800 dark:bg-ink-900">
        <div className="relative">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-6 h-10 w-3/4 sm:h-14" />
          <Skeleton className="mt-2 h-10 w-1/2 sm:h-14" />
          <Skeleton className="mt-6 h-5 w-full max-w-xl" />
          <Skeleton className="mt-2 h-5 w-full max-w-lg" />
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-4">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <Skeleton className="h-7 w-32" />
            <Skeleton className="mt-2 h-4 w-40" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
      </section>
    </div>
  );
}
