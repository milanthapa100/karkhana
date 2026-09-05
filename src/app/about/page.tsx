export const metadata = {
  title: "About",
  description: "About the DPK Content System.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white p-8 sm:p-12 dark:border-ink-800 dark:bg-ink-900">
        <div className="relative">
          <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-800 shadow-sm dark:border-ink-700 dark:bg-ink-800 dark:text-white">
            About DPK
          </p>
          <h1 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-5xl dark:text-white">
            The team that brings learning to life.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
            DPK creates, improves, and refines lessons, materials, and learning
            experiences. We treat lessons as a process, not just an output.
          </p>
        </div>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-ink-200/70 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
            What we do
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            <li>Lesson creation and improvement</li>
            <li>Material and prototype design</li>
            <li>Video and DOK work</li>
            <li>Review and classroom testing</li>
            <li>Standard operating procedures and checklists</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-ink-200/70 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
            How we work
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            <li>We value process as much as the final output</li>
            <li>We complete small versions quickly</li>
            <li>We test ideas using available resources</li>
            <li>We use feedback as data</li>
            <li>We improve through iteration</li>
            <li>We document what we learn</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-ink-200/70 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
            What is on this site
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            <li>
              <strong className="font-medium text-ink-900 dark:text-white">Updates:</strong>{" "}
              progress reports and announcements
            </li>
            <li>
              <strong className="font-medium text-ink-900 dark:text-white">SOPs:</strong>{" "}
              step-by-step procedures with checklists
            </li>
            <li>
              <strong className="font-medium text-ink-900 dark:text-white">Members:</strong>{" "}
              the people in the unit
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-ink-200/70 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
            Written in Markdown, reviewed on GitHub
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            Every update and SOP starts as a Markdown file. Changes go through a
            branch and pull request, are validated automatically, and are reviewed
            before publishing. Content stays version-controlled and easy to track.
          </p>
        </section>
      </div>
    </div>
  );
}