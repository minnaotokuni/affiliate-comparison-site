import { FEED_ITEMS, escapeXml, toRfc822 } from "@/lib/seo/feed-items";

/**
 * `/feed.xml` を返す RSS 2.0 Route Handler。
 * - サイトのコラム一覧を配信（`lib/seo/feed-items.ts` に手書きで定義）。
 * - `Content-Type: application/rss+xml; charset=utf-8` を付けて配信する。
 * - 生成は決定的（環境変数と手書きメタのみ）なので `force-static` でよい。
 */
export const dynamic = "force-static";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://affiliate-comparison-site-alpha.vercel.app";

const CHANNEL_TITLE = "野菜・果物の旬と相場メモ";
const CHANNEL_DESCRIPTION =
  "野菜・果物の旬と直近の相場メモを週次で整理。市況の感触・お店での選び方・保存のコツをまとめています。";
const CHANNEL_LANGUAGE = "ja-jp";

function buildFeed(): string {
  const origin = SITE_URL.replace(/\/+$/, "");
  const channelLink = `${origin}/`;
  const feedLink = `${origin}/feed.xml`;

  const sortedItems = [...FEED_ITEMS].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );

  const lastBuildDate = toRfc822(
    sortedItems[0]?.publishedAt ?? new Date().toISOString().slice(0, 10),
  );

  const items = sortedItems
    .map((item) => {
      const url = `${origin}${item.path}`;
      return [
        "    <item>",
        `      <title>${escapeXml(item.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <description>${escapeXml(item.description)}</description>`,
        `      <pubDate>${toRfc822(item.publishedAt)}</pubDate>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(CHANNEL_TITLE)}</title>`,
    `    <link>${escapeXml(channelLink)}</link>`,
    `    <description>${escapeXml(CHANNEL_DESCRIPTION)}</description>`,
    `    <language>${CHANNEL_LANGUAGE}</language>`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(feedLink)}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

export function GET(): Response {
  const xml = buildFeed();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
}
