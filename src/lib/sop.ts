import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export type Sop = {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  status: string;
  summary: string;
  owner: string;
  body: string;
};

const SOP_DIR = join(process.cwd(), "content", "sops");

function toIsoDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "");
}

export function listSops(): Sop[] {
  if (!existsSync(SOP_DIR)) {
    return [];
  }
  const files = readdirSync(SOP_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = readFileSync(join(SOP_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? file),
        author: String(data.author ?? ""),
        date: toIsoDate(data.date),
        category: "sop",
        status: String(data.status ?? ""),
        summary: String(data.summary ?? ""),
        owner: String(data.owner ?? ""),
        body: content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getSop(slug: string): Sop | undefined {
  return listSops().find((s) => s.slug === slug);
}
