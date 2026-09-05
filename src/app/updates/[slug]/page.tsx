import { notFound } from "next/navigation";
import { getUpdate, listUpdates } from "@/lib/content";
import { formatDate } from "@/lib/date";
import { readingMinutes } from "@/lib/reading";
import { initials, avatarColor } from "@/lib/avatar";
import { extractHeadings } from "@/lib/toc";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DocsLayout } from "@/components/DocsLayout";
import { Prose } from "@/components/Prose";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleActions } from "@/components/ArticleActions";

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
  const headings = extractHeadings(update.body);
  const editUrl = `https://github.com/milanthapa100/karkhana/edit/main/content/updates/${slug}.md`;

  return (
    <div className="mx-auto max-w-6xl">
      <Breadcrumbs
        crumbs={[
          { label: "Updates", href: "/updates" },
          { label: update.title },
        ]}
      />

      <div className="mt-6">
        <DocsLayout sidebar={headings.length > 0 ? <TableOfContents headings={headings} /> : undefined}>
          <article className="max-w-3xl">
            <header className="border-b border-ink-200 pb-8 dark:border-ink-800">
              <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl dark:text-white">
                {update.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-x-4 gap-y-3">
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
                </div>
                <ArticleActions editUrl={editUrl} />
              </div>
            </header>

            <div className="pt-8">
              <Prose markdown={update.body} />
            </div>
          </article>
        </DocsLayout>
      </div>
    </div>
  );
}
