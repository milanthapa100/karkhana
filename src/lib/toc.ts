export type TocItem = { id: string; text: string; level: number };

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Plain text for a markdown heading: strips inline formatting (code spans,
 * links, emphasis) so the derived id matches what {@link extractToc} produces.
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
 * suffix. This resolver is shared by both the renderer (Prose) and the TOC
 * extractor so generated `id`s always match the navigation links.
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

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const re = /^(#{2,4})\s+(.+)$/gm;
  const resolveId = createHeadingIdResolver();
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown)) !== null) {
    const level = m[1].length;
    const raw = m[2].trim();
    const text = headingPlainText(raw);
    items.push({
      id: resolveId(text),
      text,
      level,
    });
  }
  return items;
}
