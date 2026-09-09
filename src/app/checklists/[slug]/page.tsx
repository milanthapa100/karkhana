import { notFound } from "next/navigation";
import { getChecklist, listChecklists } from "@/lib/checklist";
import { getSop } from "@/lib/sop";
import { formatDate } from "@/lib/date";
import { initials, avatarColor } from "@/lib/avatar";
import { extractHeadings } from "@/lib/toc";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DocsLayout } from "@/components/DocsLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleActions } from "@/components/ArticleActions";
import { RelatedSops } from "@/components/RelatedSops";
import { ChecklistView } from "@/components/ChecklistView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const checklist = getChecklist(slug);
  return {
    title: checklist?.title ?? "Checklists",
    description: checklist?.summary,
  };
}

export function generateStaticParams() {
  return listChecklists().map((c) => ({ slug: c.slug }));
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const checklist = getChecklist(slug);
  if (!checklist) notFound();

  const dateText = formatDate(checklist.date);
  const headings = extractHeadings(checklist.body);
  const relatedSops = checklist.relatedSops
    .map((s) => getSop(s))
    .filter((s): s is NonNullable<typeof s> => s !== undefined)
    .map((s) => ({ href: `/sops/${s.slug}`, label: s.title }));
  const editUrl = `https://github.com/milanthapa100/karkhana/edit/main/content/checklists/${slug}.md`;

  return (
    <div className="mx-auto max-w-6xl">
      <Breadcrumbs
        crumbs={[
          { label: "Checklists", href: "/checklists" },
          { label: checklist.title },
        ]}
      />

      <div className="mt-6">
        <DocsLayout
          sidebar={headings.length > 0 ? <TableOfContents headings={headings} /> : undefined}
        >
          <article className="max-w-3xl">
            <header className="border-b border-ink-200 pb-8 dark:border-ink-800">
              <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl dark:text-white">
                {checklist.title}
              </h1>

              {checklist.summary && (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
                  {checklist.summary}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-x-4 gap-y-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-semibold text-white shadow-sm ${avatarColor(
                      checklist.owner,
                    )}`}
                    aria-hidden="true"
                  >
                    {initials(checklist.owner) || "K"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-ink-900 dark:text-white">
                      {checklist.owner || "DPK Team"}
                    </span>
                    <span className="text-xs text-ink-500 dark:text-ink-400">
                      {dateText}
                    </span>
                  </div>
                </div>
                <ArticleActions editUrl={editUrl} />
              </div>
            </header>

            <div className="pt-8">
              <ChecklistView slug={checklist.slug} body={checklist.body} />
              {relatedSops.length > 0 && <RelatedSops links={relatedSops} />}
            </div>
          </article>
        </DocsLayout>
      </div>
    </div>
  );
}