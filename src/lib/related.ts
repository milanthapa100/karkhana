export type RelatedLink = {
  href: string;
  label: string;
};

const RELATED_HEADING = /^##\s+Related\s*$/m;
const MARKDOWN_LINK = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;

export function extractRelated(body: string): RelatedLink[] {
  const match = body.match(RELATED_HEADING);
  if (!match || match.index === undefined) return [];

  const after = body.slice(match.index + match[0].length);
  const nextHeading = after.search(/^\s{0,3}##\s/m);
  const section = (nextHeading === -1 ? after : after.slice(0, nextHeading)).trim();

  const links: RelatedLink[] = [];
  for (const m of section.matchAll(MARKDOWN_LINK)) {
    const label = m[1]?.trim();
    const href = m[2];
    if (label && href?.startsWith("/")) links.push({ href, label });
  }
  return links;
}

export function stripRelatedSection(body: string): string {
  const match = body.match(RELATED_HEADING);
  if (!match || match.index === undefined) return body;

  const before = body.slice(0, match.index);
  const after = body.slice(match.index + match[0].length);
  const nextHeading = after.search(/^\s{0,3}##\s/m);
  const rest = nextHeading === -1 ? "" : after.slice(nextHeading);
  return `${before}
${rest}`.replace(/\n{3,}/g, "\n\n").trim() + "\n";
}