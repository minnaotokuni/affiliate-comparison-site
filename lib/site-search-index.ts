import { primaryNav } from "@/lib/site-nav";

export type SiteSearchEntry = {
  href: string;
  label: string;
  description: string;
  keywords: readonly string[];
};

/**
 * site-nav の各エントリに、検索ヒット用のキーワードを補強したテーブル。
 * label / description はそのまま `primaryNav` から引き、`keywords` はここで追加する。
 * 新ページ（旬カレンダー・選び方ガイド・保存方法ガイド・栄養素のキホン）は
 * すでに `primaryNav` に含まれているため、ここでは検索キーワードのみ補う。
 */
const keywordOverrides: Record<string, readonly string[]> = {
  "/": ["ホーム", "トップ", "home", "最新", "市況", "旬"],
  "/column/market": [
    "相場",
    "おすすめ",
    "野菜",
    "果物",
    "メイン",
    "週次",
    "今週",
    "市場",
    "レシピ",
  ],
  "/column/season": [
    "旬",
    "季節",
    "シーズン",
    "果物",
    "野菜",
    "ナビ",
    "暦",
    "spotlight",
  ],
  "/#market-ota": ["大田", "市場", "市況", "卸", "高安", "推移", "グラフ"],
  "/#market-shijou-sei": [
    "都日報",
    "卸売",
    "1個",
    "100g",
    "kg",
    "東京都",
    "目安",
    "換算",
  ],
  "/column/vegetables": [
    "野菜",
    "ガイド",
    "選び方",
    "栄養",
    "イラスト",
    "品目",
    "糖度",
  ],
  "/about": ["運営", "アフィリエイト", "サイトについて", "PR", "免責"],
  "/column/calendar": [
    "旬",
    "カレンダー",
    "月別",
    "今月",
    "シーズン",
    "calendar",
    "年間",
    "暦",
    "早見",
  ],
  "/column/select": [
    "選び方",
    "見分け方",
    "店頭",
    "見た目",
    "手触り",
    "鮮度",
    "売場",
    "避けたい",
  ],
  "/column/storage": [
    "保存",
    "冷蔵",
    "冷凍",
    "常温",
    "日持ち",
    "保管",
    "野菜室",
    "ストック",
  ],
  "/column/nutrition": [
    "栄養",
    "栄養素",
    "ビタミン",
    "ミネラル",
    "食物繊維",
    "健康",
    "家庭",
    "役わり",
  ],
};

export const siteSearchIndex: readonly SiteSearchEntry[] = primaryNav.map(
  (item): SiteSearchEntry => ({
    href: item.href,
    label: item.label,
    description: item.description,
    keywords: keywordOverrides[item.href] ?? [],
  }),
);

/** input の文字列で `siteSearchIndex` を部分一致フィルタする（スペース区切りの AND）。 */
export function filterSiteSearch(
  query: string,
  index: readonly SiteSearchEntry[] = siteSearchIndex,
): readonly SiteSearchEntry[] {
  const term = query.trim().toLowerCase();
  if (term.length === 0) return index;
  const tokens = term.split(/\s+/u).filter((t) => t.length > 0);
  if (tokens.length === 0) return index;

  return index.filter((entry) => {
    const haystack = [
      entry.label,
      entry.description,
      entry.href,
      ...entry.keywords,
    ]
      .join(" ")
      .toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });
}
