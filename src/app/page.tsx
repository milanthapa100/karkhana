import { listUpdates } from "@/lib/content";
import UpdateCard from "@/components/UpdateCard";

export default function HomePage() {
  const updates = listUpdates();

  return (
    <>
      <h1>Updates</h1>
      <p>Recent content published by the Karkhana team.</p>

      {updates.length === 0 ? (
        <p className="empty">
          No updates yet. Add a Markdown file under <code>content/updates/</code>.
        </p>
      ) : (
        <div className="card-list">
          {updates.map((u) => (
            <UpdateCard key={u.slug} update={u} />
          ))}
        </div>
      )}
    </>
  );
}
