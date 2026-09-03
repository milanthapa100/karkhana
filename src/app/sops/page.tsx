import { listSops } from "@/lib/sop";
import SopCard from "@/components/SopCard";

export const metadata = {
  title: "Standard Operating Procedures",
  description: "Step-by-step procedures owned by the Karkhana team.",
};

export default function SopsPage() {
  const sops = listSops();
  const activeCount = sops.filter((s) => s.status === "active").length;

  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-2xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-500 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-400">
          Standard Operating Procedures
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
          How things get done.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
          {activeCount} active {activeCount === 1 ? "procedure" : "procedures"} with{" "}
          {sops.length} total. Each includes a checklist you can work through.
        </p>
      </div>

      {sops.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-ink-300 bg-white p-10 text-center text-ink-500 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-400">
          No SOPs yet. Add a Markdown file under{" "}
          <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs dark:bg-ink-800">
            content/sops/
          </code>
          .
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {sops.map((s) => (
            <SopCard key={s.slug} sop={s} />
          ))}
        </div>
      )}
    </div>
  );
}
