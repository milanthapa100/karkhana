import { listUpdates } from "./content";
import { listSops } from "./sop";
import type { SearchItem } from "@/components/Search";

export function buildSearchIndex(): SearchItem[] {
  const updates: SearchItem[] = listUpdates().map((u) => ({
    title: u.title,
    href: `/updates/${u.slug}`,
    type: "update",
    snippet: `${u.author} · ${u.status}`,
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
