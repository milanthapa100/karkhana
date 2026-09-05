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
    <div className="mx-auto max-w-4xl" aria-busy="true" aria-label="Loading SOP">
      <div className="mb-6">
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="mt-6">
        <article className="overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-sm dark:border-ink-800 dark:bg-ink-900">
          <header className="px-6 pb-8 pt-10 sm:px-10 sm:pt-14">
            <Skeleton className="h-10 w-5/6 sm:h-12" />
            <Skeleton className="mt-3 h-10 w-2/3 sm:h-12" />
            <Skeleton className="mt-4 h-4 w-full max-w-2xl" />
            <div className="mt-6 flex items-center gap-4">
              <Skeleton className="h-11 w-11 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-2 h-3 w-40" />
              </div>
            </div>
          </header>
          <div className="px-6 pb-10 sm:px-10">
            <div className="border-t border-ink-200 pt-8 dark:border-ink-800">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
              <Skeleton className="mt-8 h-6 w-40" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
