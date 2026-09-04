import Link from "next/link";
import { Logo } from "./Logo";

const GITHUB_REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO ?? "https://github.com/milanthapa100/karkhana";
const EDIT_BASE = `${GITHUB_REPO}/edit/main/content`;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-200/70 bg-white/40 dark:border-ink-800 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Link href="/" aria-label="Karkhana home" className="inline-block">
              <Logo height={32} />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              Content-driven updates and standard operating procedures, written in
              Markdown and reviewed on GitHub.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">
              Explore
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-ink-600 transition hover:text-brand-700 dark:text-ink-300 dark:hover:text-brand-300">
                  Updates
                </Link>
              </li>
              <li>
                <Link href="/sops" className="text-ink-600 transition hover:text-brand-700 dark:text-ink-300 dark:hover:text-brand-300">
                  Standard Operating Procedures
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">
              Contribute
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-600 transition hover:text-brand-700 dark:text-ink-300 dark:hover:text-brand-300"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.55-3.9-1.55-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a11 11 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5z" />
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={EDIT_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-600 transition hover:text-brand-700 dark:text-ink-300 dark:hover:text-brand-300"
                >
                  Edit on GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink-200/70 pt-6 sm:flex-row dark:border-ink-800">
          <p className="text-sm text-ink-500 dark:text-ink-400">
            &copy; {new Date().getFullYear()} DPK
          </p>
        </div>
      </div>
    </footer>
  );
}
