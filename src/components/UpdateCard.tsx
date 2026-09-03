import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { Update } from "@/lib/content";

export default function UpdateCard({ update }: { update: Update }) {
  return (
    <Link className="card" href={`/updates/${update.slug}`}>
      <h2>{update.title}</h2>
      <p className="meta">
        {update.author} &middot; {formatDate(update.date)}
      </p>
      <span className="badge">{update.status}</span>
    </Link>
  );
}
