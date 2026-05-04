import type { MetadataRoute } from "next";

/**
 * 共有・OG用の本番オリジン。`app/layout.tsx` と同じフォールバックを使う。
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://affiliate-comparison-site-alpha.vercel.app";

type ColumnSlug =
  | "market"
  | "season"
  | "vegetables"
  | "storage"
  | "calendar"
  | "select"
  | "nutrition";

const columnSlugs: readonly ColumnSlug[] = [
  "market",
  "season",
  "vegetables",
  "storage",
  "calendar",
  "select",
  "nutrition",
];

/** 「ハブ・補助系」の比較的更新頻度が低いページ。`changeFrequency: "monthly"`, `priority: 0.7`。 */
const monthlyHubPaths: readonly string[] = [
  "/columns",
  "/glossary",
  "/column/cooking-tips",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: `${siteUrl}/`,
    lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
  };

  const columns: MetadataRoute.Sitemap = columnSlugs.map((slug) => ({
    url: `${siteUrl}/column/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const monthlyHubs: MetadataRoute.Sitemap = monthlyHubPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const about: MetadataRoute.Sitemap[number] = {
    url: `${siteUrl}/about`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.5,
  };

  return [home, ...columns, ...monthlyHubs, about];
}
