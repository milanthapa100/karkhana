import { notFound } from "next/navigation";
import { getUpdate, listUpdates } from "@/lib/content";
import { formatDate } from "@/lib/date";
import { readingMinutes } from "@/lib/reading";
import { initials, avatarColor } from "@/lib/avatar";
import { StatusBadge } from "@/components/StatusBadge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DocsLayout } from "@/components/DocsLayout";
import { Prose } from "@/components/Prose";
import { ReadingProgress } from "@/components/ReadingProgress";

export function generateStaticParams() {
  return listUpdates().map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const update = getUpdate(slug);
  return {
    title: update?.title ?? "Updates",
    description:
      update?.body.trim().split(/\n+/)[0]?.trim().replace(/^#+\s*/, "") || update?.title,
  };
}

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const update = getUpdate(slug);
  if (!update) notFound();

  const mins = readingMinutes(update.body);
  const dateText = formatDate(update.date);

  return (
    <div className="mx-auto max-w-4xl">
      <ReadingProgress />
      <Breadcrumbs
        crumbs={[
          { label: "Updates", href: "/updates" },
          { label: update.title },
        ]}
      />

      <div className="mt-6">
        <DocsLayout>
          <article className="overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-sm dark:border-ink-800 dark:bg-ink-900">
            <header className="relative px-6 pb-8 pt-10 sm:px-10 sm:pt-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-white dark:bg-ink-900 sm:h-56"
              />
              <div className="relative">
                <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem] dark:text-white">
                  {update.title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-semibold text-white shadow-sm ${avatarColor(
                      update.author,
                    )}`}
                    aria-hidden="true"
                  >
                    {initials(update.author) || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-ink-900 dark:text-white">
                      {update.author || "DPK Team"}
                    </span>
                    <span className="text-xs text-ink-500 dark:text-ink-400">
                      {dateText}
                      {mins > 1 ? ` · ${mins} min read` : ""}
                    </span>
                  </div>
                  <div className="ml-auto">
                    <StatusBadge status={update.status} />
                  </div>
                </div>
              </div>
            </header>

            <div className="px-6 pb-10 sm:px-10">
              <div className="border-t border-ink-200 pt-8 dark:border-ink-800">
                <Prose markdown={update.body} />
              </div>
            </div>
          </article>
        </DocsLayout>
      </div>
    </div>
  );
}
