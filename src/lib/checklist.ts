import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export type Checklist = {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  status: string;
  summary: string;
  owner: string;
  relatedSops: string[];
  body: string;
};

const CHECKLIST_DIR = join(process.cwd(), "content", "checklists");

function toIsoDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const str = String(value ?? "").trim();
  return str ? str.slice(0, 10) : "";
}

function toSlugArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export function listChecklists(): Checklist[] {
  if (!existsSync(CHECKLIST_DIR)) {
    return [];
  }
  const files = readdirSync(CHECKLIST_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = readFileSync(join(CHECKLIST_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? file),
        author: String(data.author ?? ""),
        date: toIsoDate(data.date),
        category: String(data.category ?? "checklist"),
        status: String(data.status ?? ""),
        summary: String(data.summary ?? ""),
        owner: String(data.owner ?? ""),
        relatedSops: toSlugArray(data.relatedSops),
        body: content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getChecklist(slug: string): Checklist | undefined {
  return listChecklists().find((c) => c.slug === slug);
}