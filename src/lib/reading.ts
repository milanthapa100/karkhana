export function wordsOf(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

export function readingMinutes(markdown: string): number {
  const words = wordsOf(markdown);
  return Math.max(1, Math.round(words / 200));
}
