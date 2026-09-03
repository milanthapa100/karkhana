import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSop, listSops } from "@/lib/sop";
import { formatDate } from "@/lib/date";

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
    <article className="article">
      <Link className="back" href="/sops">
        &larr; All SOPs
      </Link>
      <h1>{sop.title}</h1>
      <p className="meta">
        Owner: {sop.owner} &middot; {formatDate(sop.date)} &middot;{" "}
        <span className="badge">{sop.status}</span>
      </p>
      {sop.summary && (
        <>
          <p className="summary">{sop.summary}</p>
          <hr className="divider" />
        </>
      )}
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{sop.body}</ReactMarkdown>
      </div>
    </article>
  );
}
