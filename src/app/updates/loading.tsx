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
    <div className="flex flex-col gap-8" aria-busy="true" aria-label="Loading">
      <div className="max-w-2xl">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="mt-3 h-5 w-full max-w-lg" />
        <Skeleton className="mt-2 h-5 w-2/3" />
      </div>

      <div>
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
      </div>
    </div>
  );
}
