export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Plain text for a markdown heading: strips inline formatting (code spans,
 * links, emphasis) so the derived id matches what the heading resolver
 * produces.
 */
export function headingPlainText(raw: string): string {
  return raw
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/(~~)(.*?)\1/g, "$2")
    .replace(/[#*`]/g, "");
}

export type HeadingIdResolver = (raw: string) => string;

/**
 * Builds a resolver that returns unique, deterministic heading ids for a
 * document. Duplicate heading text is disambiguated with a `-2`, `-3`, ...
 * suffix. This resolver is shared by the renderer (Prose) so generated `id`s
 * always match the document headings.
 */
export function createHeadingIdResolver(): HeadingIdResolver {
  const seen = new Map<string, number>();
  return (raw: string) => {
    const base = slugify(raw) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

/**
 * Parses markdown body text and extracts h2 and h3 headings with deterministic
 * IDs matching the Prose renderer.
 */
export function extractHeadings(markdown: string): TocItem[] {
  const resolveId = createHeadingIdResolver();
  const headings: TocItem[] = [];
  const lines = markdown.split(/\r?\n/);
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const rawText = match[2].trim();
      const plain = headingPlainText(rawText);
      const id = resolveId(plain || "section");
      headings.push({ id, text: plain, level });
    }
  }

  return headings;
}
