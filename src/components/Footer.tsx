export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-200/70 py-10 dark:border-ink-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-ink-500 dark:text-ink-400">
            &copy; {new Date().getFullYear()} Karkhana — content managed on GitHub.
          </p>
          <div className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-500">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-2.5 py-1 dark:border-ink-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Content-driven
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
