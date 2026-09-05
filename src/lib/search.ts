import { listUpdates } from "./content";
import { listSops } from "./sop";
import type { SearchItem } from "@/lib/types";

export function buildSearchIndex(): SearchItem[] {
  const updates: SearchItem[] = listUpdates().map((u) => ({
    title: u.title,
    href: `/updates/${u.slug}`,
    type: "update",
    snippet: [u.author, u.status].filter(Boolean).join(" · "),
    status: u.status,
    date: u.date,
  }));

  const sops: SearchItem[] = listSops().map((s) => ({
    title: s.title,
    href: `/sops/${s.slug}`,
    type: "sop",
    snippet: s.summary || s.status,
    status: s.status,
    date: s.date,
  }));

  return [...updates, ...sops];
}
