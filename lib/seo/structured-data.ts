/**
 * schema.org JSON-LD ビルダー群（Google Rich Results 対応）
 *
 * - すべて純関数。`<JsonLd data={...} />` に渡せる `Record<string, unknown>` を返します。
 * - URL は **絶対 URL** に正規化します（相対パスを渡しても OK）。
 * - 文字列値は `JSON.stringify` 経由で安全にエスケープされる前提で、自前のエスケープはしません。
 */

const FALLBACK_SITE_URL = "https://affiliate-comparison-site-alpha.vercel.app";

/** 公開サイトの絶対 URL（環境変数があれば優先、なければフォールバック） */
export const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL;

/** サイト・組織名（author / publisher で共通利用） */
const SITE_NAME = "野菜・果物の旬と相場メモ";

/** 相対パス・絶対 URL のいずれを渡しても、絶対 URL として返します */
export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_URL).toString();
}

/* ------------------------------------------------------------------ */
/* BreadcrumbList                                                     */
/* ------------------------------------------------------------------ */

export type BreadcrumbItem = {
  name: string;
  url: string;
};

/**
 * BreadcrumbList を組み立てます。
 * 例: `[{ name: "ホーム", url: "/" }, { name: "直近の相場からのおすすめ品", url: "/column/market" }]`
 */
export function buildBreadcrumbList(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.url),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Article                                                             */
/* ------------------------------------------------------------------ */

export type ArticleLdInput = {
  url: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  image?: string | string[];
};

export function buildArticleLd(input: ArticleLdInput): Record<string, unknown> {
  const url = absoluteUrl(input.url);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: input.headline,
    description: input.description,
    inLanguage: "ja-JP",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
  if (input.datePublished) data.datePublished = input.datePublished;
  if (input.dateModified) data.dateModified = input.dateModified;
  if (input.image) {
    data.image = Array.isArray(input.image)
      ? input.image.map((i) => absoluteUrl(i))
      : absoluteUrl(input.image);
  }
  return data;
}

/* ------------------------------------------------------------------ */
/* Recipe                                                              */
/* ------------------------------------------------------------------ */

export type RecipeLdInput = {
  url: string;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  /** ISO 8601 duration (例: "PT15M"). 未指定なら出力しません。 */
  totalTime?: string;
  recipeYield?: string;
  keywords?: string[];
};

export function buildRecipeLd(input: RecipeLdInput): Record<string, unknown> {
  const url = absoluteUrl(input.url);
  const ingredients = input.ingredients
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const steps = input.steps
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((text) => ({ "@type": "HowToStep", text }));

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    name: input.name,
    description: input.description,
    inLanguage: "ja-JP",
    author: { "@type": "Organization", name: SITE_NAME },
    recipeCategory: "家庭料理",
    recipeCuisine: "Japanese",
    recipeIngredient: ingredients,
    recipeInstructions: steps,
  };

  if (input.totalTime) {
    data.cookTime = input.totalTime;
    data.totalTime = input.totalTime;
  }
  if (input.recipeYield && input.recipeYield.trim().length > 0) {
    data.recipeYield = input.recipeYield.trim();
  }
  if (input.keywords && input.keywords.length > 0) {
    const cleaned = input.keywords
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    if (cleaned.length > 0) data.keywords = cleaned.join(", ");
  }
  return data;
}

/* ------------------------------------------------------------------ */
/* ItemList                                                            */
/* ------------------------------------------------------------------ */

export type ItemListEntry = {
  name: string;
  url: string;
};

export function buildItemListLd(input: {
  url: string;
  name: string;
  items: ItemListEntry[];
}): Record<string, unknown> {
  const url = absoluteUrl(input.url);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    url,
    numberOfItems: input.items.length,
    itemListElement: input.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.url),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/**
 * "約15分・2人分" / "作業15分＋寝かせ30分〜・作り置き可" のような自由形式の time note から
 * Recipe LD 用の `totalTime` (ISO 8601) と `recipeYield` を抽出します。
 *
 * - 数字は最初に見つけた `〜分` を採用します（複数あるときは合算しません）。
 * - 人数は最初に見つけた `N人分` をそのまま文字列で返します（"2人分", "3〜4人分" など）。
 */
export function parseTimeNote(timeNote: string): {
  totalTime?: string;
  recipeYield?: string;
} {
  const out: { totalTime?: string; recipeYield?: string } = {};
  const minMatch = timeNote.match(/(\d+)\s*分/);
  if (minMatch) {
    const minutes = Number.parseInt(minMatch[1], 10);
    if (Number.isFinite(minutes) && minutes > 0 && minutes < 600) {
      out.totalTime = `PT${minutes}M`;
    }
  }
  const yieldMatch = timeNote.match(/(\d+(?:\s*[〜～-]\s*\d+)?)\s*人分/);
  if (yieldMatch) {
    out.recipeYield = yieldMatch[0].replace(/\s+/g, "");
  }
  return out;
}
