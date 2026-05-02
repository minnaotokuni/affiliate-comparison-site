import type { OtaRow } from "./types";

function parseNum(s: string): number | null {
  const t = s.trim();
  if (t === "" || t === "-" || t.toLowerCase() === "nan") return null;
  const n = Number(t.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

/** cultivationdata の CSV（ヘッダー固定）をパース */
export function parseOtaCsv(text: string): OtaRow[] {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const header = lines[0].split(",");
  const idx = {
    date: header.indexOf("日付"),
    itemName: header.indexOf("品目名"),
    itemCode: header.indexOf("品目コード"),
    volume: header.indexOf("入荷量(t)"),
    high: header.indexOf("高値(円)"),
    mid: header.indexOf("中値(円)"),
    low: header.indexOf("安値(円)"),
  };
  if (Object.values(idx).some((i) => i < 0)) return [];

  const out: OtaRow[] = [];
  for (let li = 1; li < lines.length; li++) {
    const cols = lines[li].split(",");
    if (cols.length < idx.itemCode + 1) continue;
    out.push({
      date: cols[idx.date]?.trim() ?? "",
      itemName: cols[idx.itemName]?.trim() ?? "",
      itemCode: cols[idx.itemCode]?.trim() ?? "",
      volume: parseNum(cols[idx.volume] ?? ""),
      high: parseNum(cols[idx.high] ?? ""),
      mid: parseNum(cols[idx.mid] ?? ""),
      low: parseNum(cols[idx.low] ?? ""),
    });
  }
  return out;
}

export async function fetchOtaCsv(url: string, cache: RequestCache = "no-store"): Promise<string> {
  const res = await fetch(url, {
    cache,
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; ShuntoSaibaMemo/1.0)",
      Accept: "text/csv,text/plain,*/*",
    },
  });
  if (!res.ok) throw new Error(`OTA fetch failed ${res.status}`);
  return res.text();
}
