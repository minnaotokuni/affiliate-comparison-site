/**
 * RSS 2.0 (`/feed.xml`) に載せるコラムの手書きメタ。
 * - `path` はサイトルートからの相対（先頭 `/`）。
 * - `publishedAt` は ISO (YYYY-MM-DD) 文字列。RSS のビルド時に RFC822 に整形する。
 * - 新しい順に並べると、そのまま RSS の出現順になる。
 */

export type FeedItem = {
  path: string;
  title: string;
  description: string;
  publishedAt: string;
};

export const FEED_ITEMS: readonly FeedItem[] = [
  {
    path: "/column/market",
    title: "直近の相場からのおすすめ品",
    description:
      "サイトのメイン。旬と相場の両方から見た『いま買いの品』と、その食べ方・使い方のヒントを週次で更新します。",
    publishedAt: "2026-05-01",
  },
  {
    path: "/column/season",
    title: "旬ナビ — いまおすすめ3品を深く",
    description:
      "暦ベースで『今の3品』を深掘り。ほかの果物や野菜も短いダイジェストで確認できます。",
    publishedAt: "2026-04-28",
  },
  {
    path: "/column/vegetables",
    title: "野菜別ガイド（イラスト付き）",
    description:
      "品目ごとに、栄養素の家庭目線での役わり・旬との組み合わせ・調理・選び方・糖度をまとめています。",
    publishedAt: "2026-04-22",
  },
  {
    path: "/column/calendar",
    title: "年間 旬カレンダー",
    description:
      "月別に旬の野菜・果物の目安を早見できる表。『今月、どれが旬か』をさっと確認するのに便利です。",
    publishedAt: "2026-04-18",
  },
  {
    path: "/column/select",
    title: "選び方ガイド",
    description:
      "お店での見分け方（見た目・手触り・避けたいサイン）を、買い物の現場目線でまとめました。",
    publishedAt: "2026-04-12",
  },
  {
    path: "/column/storage",
    title: "保存方法ガイド",
    description:
      "常温・冷蔵・冷凍の家庭での目安と、傷ませずに使い切るためのコツをコンパクトに整理しています。",
    publishedAt: "2026-04-06",
  },
  {
    path: "/column/nutrition",
    title: "栄養素のキホン",
    description:
      "ビタミン・ミネラル・食物繊維など、野菜と果物でよく出てくる栄養素の役わりを家庭目線で整理しました。",
    publishedAt: "2026-03-30",
  },
  {
    path: "/about",
    title: "サイトについて",
    description:
      "運営方針・参照している公開資料・アフィリエイトについての考え方をまとめた案内ページです。",
    publishedAt: "2026-03-22",
  },
] as const;

/**
 * XML 予約文字をエスケープ。RSS の `<title>` / `<description>` / `<link>` にそのまま差し込む前に使う。
 */
export function escapeXml(input: string): string {
  return input.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&apos;";
      default:
        return char;
    }
  });
}

/**
 * `2026-04-22` のような ISO 日付を RFC822 (RSS 2.0 の pubDate 形式) に整形する。
 * RSS の仕様上、時刻と GMT を付けた形が推奨されるため、00:00:00 GMT で固定する。
 */
export function toRfc822(isoDate: string): string {
  const safe = /^\d{4}-\d{2}-\d{2}$/.test(isoDate) ? `${isoDate}T00:00:00Z` : isoDate;
  const date = new Date(safe);
  if (Number.isNaN(date.getTime())) {
    return new Date().toUTCString();
  }
  return date.toUTCString();
}
