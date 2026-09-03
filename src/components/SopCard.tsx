import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { Sop } from "@/lib/sop";

export default function SopCard({ sop }: { sop: Sop }) {
  return (
    <Link className="card" href={`/sops/${sop.slug}`}>
      <h2>{sop.title}</h2>
      <p className="meta">
        Owner: {sop.owner} &middot; {formatDate(sop.date)}
      </p>
      {sop.summary && <p className="card-summary">{sop.summary}</p>}
      <span className="badge">{sop.status}</span>
    </Link>
  );
}
