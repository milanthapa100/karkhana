import { listSops } from "@/lib/sop";
import SopCard from "@/components/SopCard";

export default function SopsPage() {
  const sops = listSops();

  return (
    <>
      <h1>Standard Operating Procedures</h1>
      <p>
        Step-by-step procedures owned by the team. Each SOP includes a checklist
        you can work through.
      </p>

      {sops.length === 0 ? (
        <p className="empty">
          No SOPs yet. Add a Markdown file under <code>content/sops/</code>.
        </p>
      ) : (
        <div className="card-list">
          {sops.map((s) => (
            <SopCard key={s.slug} sop={s} />
          ))}
        </div>
      )}
    </>
  );
}
