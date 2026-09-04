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
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <Skeleton className="h-6 w-52 rounded-full" />
          <Skeleton className="mt-5 h-9 w-3/4 sm:h-11" />
          <Skeleton className="mt-3 h-5 w-full max-w-lg" />
          <Skeleton className="mt-2 h-5 w-2/3" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-44 rounded-2xl" />
        <Skeleton className="h-44 rounded-2xl" />
        <Skeleton className="h-44 rounded-2xl" />
        <Skeleton className="h-44 rounded-2xl" />
      </div>
    </div>
  );
}
