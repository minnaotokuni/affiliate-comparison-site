import iconv from "iconv-lite";
import { seiCsvUrl } from "./url";
import type { ShijouMarketMeta } from "./types";

export async function fetchSeiMarketCsv(meta: ShijouMarketMeta, dateIso: string): Promise<string> {
  const url = seiCsvUrl(dateIso, meta.csvSuffix);
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; ShuntoSaibaMemo/1.0)",
      Accept: "text/csv,text/plain,*/*",
    },
  });
  if (!res.ok) throw new Error(`${meta.label}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return iconv.decode(buf, "shift_jis");
}
