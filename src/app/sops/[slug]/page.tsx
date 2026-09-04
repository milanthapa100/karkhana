import { notFound } from "next/navigation";
import { getSop, listSops } from "@/lib/sop";
import { formatDate } from "@/lib/date";
import { readingMinutes } from "@/lib/reading";
import { initials, avatarColor } from "@/lib/avatar";
import { StatusBadge } from "@/components/StatusBadge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DocsLayout } from "@/components/DocsLayout";
import { Prose } from "@/components/Prose";

export const metadata = {
  title: "SOPs",
};

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

  const all = listSops();
  const mins = readingMinutes(sop.body);
  const dateText = formatDate(sop.date);

  const links = all.map((s) => ({
    href: `/sops/${s.slug}`,
    label: s.title,
  }));

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumbs
        crumbs={[
          { label: "SOPs", href: "/sops" },
          { label: sop.title },
        ]}
      />

      <div className="mt-6">
        <DocsLayout
          section="SOPs"
          sectionHref="/sops"
          links={links}
        >
          <article className="overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-sm dark:border-ink-800 dark:bg-ink-900">
            {/* Header hero */}
            <header className="relative px-6 pb-8 pt-10 sm:px-10 sm:pt-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-brand-50 dark:bg-brand-500/10 sm:h-56"
              />
              <div className="relative">
                <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem] dark:text-white">
                  {sop.title}
                </h1>

                {sop.summary && (
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
                    {sop.summary}
                  </p>
                )}

                {/* Byline */}
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-semibold text-white shadow-sm ${avatarColor(
                      sop.owner,
                    )}`}
                    aria-hidden="true"
                  >
                    {initials(sop.owner) || "K"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-ink-900 dark:text-white">
                      {sop.owner || "Karkhana Team"}
                    </span>
                    <span className="text-xs text-ink-500 dark:text-ink-400">
                      {dateText}
                      {mins > 1 ? ` · ${mins} min read` : ""}
                    </span>
                  </div>
                  <div className="ml-auto">
                    <StatusBadge status={sop.status} />
                  </div>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="px-6 pb-10 sm:px-10">
              <div className="border-t border-ink-200 pt-8 dark:border-ink-800">
                <Prose markdown={sop.body} />
              </div>
            </div>
          </article>
        </DocsLayout>
      </div>
    </div>
  );
}
