import { unstable_cache } from "next/cache";

const SEARCH_URL = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20170706";

export type RakutenProduceHit = {
  itemName: string;
  itemPrice: number;
  clickUrl: string;
  imageUrl?: string;
};

type IchibaSearchJson = {
  items?: Array<Record<string, unknown>>;
  Items?: Array<Record<string, unknown>>;
  error?: string;
  errors?: { errorCode?: number; errorMessage?: string };
};

function truncateKeywordUtf8(keyword: string, maxBytes: number): string {
  const enc = new TextEncoder();
  let out = "";
  for (const ch of keyword.trim()) {
    const candidate = out + ch;
    if (enc.encode(candidate).length > maxBytes) break;
    out = candidate;
  }
  return out.trim();
}

function validSearchKeyword(keyword: string): boolean {
  const k = keyword.trim();
  if (k.length < 1) return false;
  // 楽天WS: 全角1文字以上、または半角2文字以上など — 実質ほとんどの品名でOK
  return encByteLength(k) >= 2 || [...k].some((c) => c.charCodeAt(0) > 0x7f);
}

function encByteLength(s: string): number {
  return new TextEncoder().encode(s).length;
}

function pickString(row: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const v = row[key];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return undefined;
}

function pickNumber(row: Record<string, unknown>, keys: string[]): number | undefined {
  for (const key of keys) {
    const v = row[key];
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string" && /^\d+$/.test(v)) return Number(v);
  }
  return undefined;
}

function pickImageUrl(row: Record<string, unknown>): string | undefined {
  const arrays = [row.mediumImageUrls, row.smallImageUrls, row.largeImageUrls];
  for (const arr of arrays) {
    if (Array.isArray(arr) && typeof arr[0] === "string") return arr[0];
  }
  return undefined;
}

function normalizeHits(body: IchibaSearchJson): RakutenProduceHit[] {
  const raw = body.items ?? body.Items;
  if (!Array.isArray(raw)) return [];

  const out: RakutenProduceHit[] = [];
  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const rec = row as Record<string, unknown>;
    const nested =
      typeof rec.item === "object" && rec.item !== null ? (rec.item as Record<string, unknown>) : rec;

    const itemName = pickString(nested, ["itemName", "item_name"]);
    const itemPrice = pickNumber(nested, ["itemPrice", "item_price"]);
    const affiliateUrl = pickString(nested, ["affiliateUrl", "affiliate_url"]);
    const itemUrl = pickString(nested, ["itemUrl", "item_url"]);
    const clickUrl = affiliateUrl ?? itemUrl;
    if (!itemName || itemPrice === undefined || !clickUrl) continue;

    out.push({
      itemName,
      itemPrice,
      clickUrl,
      imageUrl: pickImageUrl(nested),
    });
    if (out.length >= 3) break;
  }
  return out;
}

async function fetchRakutenProduceHitsUncached(keyword: string): Promise<RakutenProduceHit[] | null> {
  const applicationId = process.env.RAKUTEN_ICHIBA_APPLICATION_ID;
  const accessKey = process.env.RAKUTEN_ICHIBA_ACCESS_KEY;
  if (!applicationId?.trim() || !accessKey?.trim()) return null;

  const kw = truncateKeywordUtf8(keyword, 128);
  if (!validSearchKeyword(kw)) return null;

  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID?.trim();

  const params = new URLSearchParams({
    applicationId: applicationId.trim(),
    accessKey: accessKey.trim(),
    keyword: kw,
    hits: "3",
    format: "json",
    formatVersion: "2",
    availability: "1",
    imageFlag: "1",
    carrier: "2",
    sort: "standard",
  });
  if (affiliateId) params.set("affiliateId", affiliateId);

  let res: Response;
  try {
    res = await fetch(`${SEARCH_URL}?${params.toString()}`, {
      headers: { Accept: "application/json" },
    });
  } catch {
    return null;
  }

  let body: IchibaSearchJson;
  try {
    body = (await res.json()) as IchibaSearchJson;
  } catch {
    return null;
  }

  if (!res.ok || body.error || body.errors) return null;

  const hits = normalizeHits(body);
  return hits.length > 0 ? hits : null;
}

/** 同一キーワードは1時間キャッシュ（楽天WSのレートに配慮） */
export const fetchRakutenProduceHits = unstable_cache(
  async (keyword: string) => fetchRakutenProduceHitsUncached(keyword),
  ["rakuten-ichiba-produce"],
  { revalidate: 3600 },
);
