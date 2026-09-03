import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getUpdate, listUpdates } from "@/lib/content";
import { formatDate } from "@/lib/date";

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
    <article className="article">
      <Link className="back" href="/">
        &larr; All updates
      </Link>
      <h1>{update.title}</h1>
      <p className="meta">
        {update.author} &middot; {formatDate(update.date)} &middot;{" "}
        <span className="badge">{update.status}</span>
      </p>
      <hr className="divider" />
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{update.body}</ReactMarkdown>
      </div>
    </article>
  );
}
