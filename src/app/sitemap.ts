import type { MetadataRoute } from "next";
import { listUpdates } from "@/lib/content";
import { listSops } from "@/lib/sop";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://karkhana.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const updates = listUpdates().map((u) => ({
    url: `${BASE}/updates/${u.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const sops = listSops().map((s) => ({
    url: `${BASE}/sops/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/sops`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...updates,
    ...sops,
  ];
}
