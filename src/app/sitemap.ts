import type { MetadataRoute } from "next";
import { listUpdates } from "@/lib/content";
import { listSops } from "@/lib/sop";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

function toDate(value: string): Date {
  const d = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const updates = listUpdates().map((u) => ({
    url: `${BASE}/updates/${u.slug}`,
    lastModified: u.date ? toDate(u.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const sops = listSops().map((s) => ({
    url: `${BASE}/sops/${s.slug}`,
    lastModified: s.date ? toDate(s.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/updates`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/sops`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/members`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...updates,
    ...sops,
  ];
}