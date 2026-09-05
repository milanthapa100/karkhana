import { notFound } from "next/navigation";
import { getSop, listSops } from "@/lib/sop";
import { formatDate } from "@/lib/date";
import { readingMinutes } from "@/lib/reading";
import { initials, avatarColor } from "@/lib/avatar";
import { extractHeadings } from "@/lib/toc";
import { extractRelated, stripRelatedSection } from "@/lib/related";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DocsLayout } from "@/components/DocsLayout";
import { Prose } from "@/components/Prose";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleActions } from "@/components/ArticleActions";
import { RelatedSops } from "@/components/RelatedSops";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sop = getSop(slug);
  return {
    title: sop?.title ?? "SOPs",
    description: sop?.summary,
  };
}

export function generateStaticParams() {
  return listSops().map((s) => ({ slug: s.slug }));
}

export default async function SopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sop = getSop(slug);
  if (!sop) notFound();

  const mins = readingMinutes(sop.body);
  const dateText = formatDate(sop.date);
  const headings = extractHeadings(sop.body);
  const related = extractRelated(sop.body);
  const body = stripRelatedSection(sop.body);
  const editUrl = `https://github.com/milanthapa100/karkhana/edit/main/content/sops/${slug}.md`;

  return (
    <div className="mx-auto max-w-6xl">
      <Breadcrumbs
        crumbs={[
          { label: "SOPs", href: "/sops" },
          { label: sop.title },
        ]}
      />

      <div className="mt-6">
        <DocsLayout sidebar={headings.length > 0 ? <TableOfContents headings={headings} /> : undefined}>
          <article className="max-w-3xl">
            <header className="border-b border-ink-200 pb-8 dark:border-ink-800">
              <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl dark:text-white">
                {sop.title}
              </h1>

              {sop.summary && (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
                  {sop.summary}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-x-4 gap-y-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-semibold text-white shadow-sm ${avatarColor(
                      sop.owner,
                    )}`}
                    aria-hidden="true"
                  >
                    {initials(sop.owner) || "K"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-ink-900 dark:text-white">
                      {sop.owner || "DPK Team"}
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
              <Prose markdown={body} />
              <RelatedSops links={related} />
            </div>
          </article>
        </DocsLayout>
      </div>
    </div>
  );
}
