import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSop, listSops } from "@/lib/sop";
import { formatDate } from "@/lib/date";
import { StatusBadge } from "@/components/StatusBadge";

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

  return (
    <article className="max-w-3xl">
      <Link
        href="/sops"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition hover:text-brand-700 dark:text-ink-400 dark:hover:text-brand-300"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        All SOPs
      </Link>

      <header className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-brand-700 dark:text-brand-300">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          Standard Operating Procedure
        </div>
        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl dark:text-white">
          {sop.title}
        </h1>
        {sop.summary && (
          <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
            {sop.summary}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500 dark:text-ink-400">
          <span className="inline-flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {sop.owner}
          </span>
          <span className="h-1 w-1 rounded-full bg-ink-300 dark:bg-ink-600" />
          <span>{formatDate(sop.date)}</span>
          <StatusBadge status={sop.status} />
        </div>
      </header>

      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm dark:border-ink-800 dark:bg-ink-900">
        <div className="prose prose-ink max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-h2:mt-8 prose-p:leading-relaxed dark:prose-invert [&_input[type=checkbox]]:h-4 [&_input[type=checkbox]]:w-4 [&_input[type=checkbox]]:rounded [&_input[type=checkbox]]:border-ink-300 [&_input[type=checkbox]]:accent-brand-600 [&_ul]:mt-4 [&_li]:py-0.5">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{sop.body}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
