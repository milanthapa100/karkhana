import { listUpdates } from "@/lib/content";
import { buildSearchIndex } from "@/lib/search";
import UpdateCard from "@/components/UpdateCard";
import { Search } from "@/components/Search";

export const metadata = {
  title: "Updates",
  description: "Recent content published by the Karkhana team.",
};

export default function HomePage() {
  const updates = listUpdates();
  const index = buildSearchIndex();

  return (
    <div className="flex flex-col gap-12">
      <section className="relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white p-8 sm:p-12 dark:border-ink-800 dark:bg-ink-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #059669 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Karkhana Content System
          </p>
          <h1 className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
            Where the team&apos;s work becomes one living surface.
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
            Content-driven updates and standard operating procedures — written in
            Markdown, reviewed on GitHub, published automatically.
          </p>
          <div className="mt-6">
            <Search items={index} />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">
              Updates
            </h2>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
              {updates.length} published
              {updates.length === 1 ? " update" : " updates"}.
            </p>
          </div>
        </div>

        {updates.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink-300 bg-white p-10 text-center text-ink-500 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-400">
            No updates yet. Add a Markdown file under{" "}
            <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs dark:bg-ink-800">
              content/updates/
            </code>
            .
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {updates.map((u) => (
              <UpdateCard key={u.slug} update={u} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
