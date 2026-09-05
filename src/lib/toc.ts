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
