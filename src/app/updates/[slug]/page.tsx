import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getUpdate, listUpdates } from "@/lib/content";
import { formatDate } from "@/lib/date";
import { StatusBadge } from "@/components/StatusBadge";

export const metadata = {
  title: "Updates",
};

export function generateStaticParams() {
  return listUpdates().map((u) => ({ slug: u.slug }));
}

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const update = getUpdate(slug);
  if (!update) notFound();

  return (
    <article className="max-w-3xl">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition hover:text-brand-700 dark:text-ink-400 dark:hover:text-brand-300"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        All updates
      </Link>

      <header className="mb-8">
        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl dark:text-white">
          {update.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500 dark:text-ink-400">
          <span>{update.author}</span>
          <span className="h-1 w-1 rounded-full bg-ink-300 dark:bg-ink-600" />
          <span>{formatDate(update.date)}</span>
          <StatusBadge status={update.status} />
        </div>
      </header>

      <div className="prose prose-ink max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-h2:mt-10 prose-p:leading-relaxed dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{update.body}</ReactMarkdown>
      </div>
    </article>
  );
}
