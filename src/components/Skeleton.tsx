export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-ink-200/80 dark:bg-ink-800 ${className}`}
    />
  );
}
