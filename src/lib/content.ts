import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export type Update = {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  status: string;
  body: string;
};

const CONTENT_DIR = join(process.cwd(), "content", "updates");

function toIsoDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "");
}

export function listUpdates(): Update[] {
  if (!existsSync(CONTENT_DIR)) return [];
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = readFileSync(join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? file),
        author: String(data.author ?? ""),
        date: toIsoDate(data.date),
        category: String(data.category ?? "update"),
        status: String(data.status ?? ""),
        body: content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getUpdate(slug: string): Update | undefined {
  return listUpdates().find((u) => u.slug === slug);
}
