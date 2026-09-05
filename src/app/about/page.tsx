import Link from "next/link";

export const metadata = {
  title: "About",
  description: "About DPK: the team, how we work, and what this site holds.",
};

const ACTIVITIES = [
  "Lesson creation and improvement",
  "Material and prototype design",
  "Video and DOK work",
  "Review and classroom testing",
  "Standard operating procedures and checklists",
];

const PRINCIPLES = [
  "We value process as much as the final output",
  "We complete small versions quickly",
  "We test ideas using available resources",
  "We use feedback as data",
  "We improve through iteration",
  "We document what we learn",
];

const SITE_SECTIONS = [
  {
    href: "/updates",
    title: "Updates",
    description: "Progress reports and announcements from the team",
  },
  {
    href: "/sops",
    title: "SOPs",
    description: "Step-by-step procedures with checklists to follow",
  },
  {
    href: "/members",
    title: "Members",
    description: "The people in the unit",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="max-w-2xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-semibold text-ink-800 dark:border-ink-800 dark:bg-ink-900 dark:text-white">
          About DPK
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-5xl dark:text-white">
          The team that brings learning to life.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-600 sm:text-lg dark:text-ink-300">
          DPK creates, improves, and refines lessons, materials, and learning
          experiences. We treat lessons as a process, not just an output.
        </p>
      </section>

      <section className="border-t border-ink-200 pt-10 dark:border-ink-800">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900 dark:text-white">
              What we do
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              The work DPK takes on across lessons, materials, and procedures.
            </p>
          </div>
          <ul className="space-y-0 divide-y divide-ink-100 dark:divide-ink-800/70">
            {ACTIVITIES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 py-3 text-sm leading-relaxed text-ink-600 first:pt-0 dark:text-ink-300"
              >
                <svg
                  className="h-4 w-4 shrink-0 text-brand-500 dark:text-brand-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink-200 pt-10 dark:border-ink-800">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900 dark:text-white">
              How we work
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              The principles behind everything the team creates.
            </p>
          </div>
          <ol className="space-y-0">
            {PRINCIPLES.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-ink-100 py-3 first:border-t dark:border-ink-800/70"
              >
                <span className="w-6 shrink-0 font-mono text-xs font-semibold text-ink-400 dark:text-ink-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-ink-200 pt-10 dark:border-ink-800">
        <div className="mb-6">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900 dark:text-white">
            What is on this site
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            Jump straight into the content.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {SITE_SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-ink-200/80 bg-white p-5 shadow-2xs transition hover:border-brand-300 hover:shadow-md dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-ink-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                  {section.title}
                </h3>
                <svg
                  className="h-4 w-4 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-600 dark:text-ink-600 dark:group-hover:text-brand-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-200 pt-10 dark:border-ink-800">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900 dark:text-white">
              How content stays current
            </h2>
          </div>
          <div className="max-w-2xl space-y-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            <p>
              Every update and SOP starts as a Markdown file in a shared
              repository. Changes go through a branch and pull request, are
              validated automatically, and are reviewed before they are
              published.
            </p>
            <p>
              This keeps content version-controlled and easy to track, so the
              team always reads the latest, and history is never lost.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}