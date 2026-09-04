const AVATAR_PALETTE = [
  "bg-brand-600",
  "bg-accent-600",
  "bg-sky-deep-600",
  "bg-violet-600",
  "bg-rose-600",
  "bg-amber-600",
];

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function avatarColor(name: string): string {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}
