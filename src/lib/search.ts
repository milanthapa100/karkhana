import { listUpdates } from "./content";
import { listSops } from "./sop";
import { listChecklists } from "./checklist";
import type { SearchItem } from "@/lib/types";

export function buildSearchIndex(): SearchItem[] {
  const updates: SearchItem[] = listUpdates().map((u) => ({
    title: u.title,
    href: `/updates/${u.slug}`,
    type: "update",
    snippet: [u.author, u.status].filter(Boolean).join(" · "),
    searchText: [u.title, u.author, u.status, u.body]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " "),
    status: u.status,
    date: u.date,
  }));

  const sops: SearchItem[] = listSops().map((s) => ({
    title: s.title,
    href: `/sops/${s.slug}`,
    type: "sop",
    snippet: s.summary || s.status,
    searchText: [s.title, s.summary, s.status, s.body]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " "),
    status: s.status,
    date: s.date,
  }));

  const checklists: SearchItem[] = listChecklists().map((c) => ({
    title: c.title,
    href: `/checklists/${c.slug}`,
    type: "checklist",
    snippet: c.summary || c.status,
    searchText: [c.title, c.summary, c.status, c.body]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " "),
    status: c.status,
    date: c.date,
  }));

  return [...updates, ...sops, ...checklists];
}
