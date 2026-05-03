import { shijouRowKey, type ShijouSeiHistoryFile } from "./history";
import type { SeiHistorySparkDay, SeiItemRetailRow } from "./types";

function subtractDaysIso(iso: string, deltaDays: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const t = Date.UTC(y, m - 1, d) - deltaDays * 86400000;
  const dt = new Date(t);
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
}

/** 基準日を含む過去7暦日の卸中値（円/kg）。履歴＋当日フェッチをマージ */
export function buildShijouSpark7Days(
  referenceIso: string,
  row: SeiItemRetailRow,
  hist: ShijouSeiHistoryFile,
  liveReportIso: string | null,
): SeiHistorySparkDay[] {
  const key = shijouRowKey(row.marketId, row.itemName, row.cabbageSize);
  const series = hist.byRowKey[key] ?? {};
  const out: SeiHistorySparkDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const iso = subtractDaysIso(referenceIso, i);
    let mid = series[iso]?.wholesaleMidYenPerKg ?? null;
    const trade = liveReportIso ?? referenceIso;
    if (iso === trade) {
      const live = row.wholesaleMidYenPerKg;
      if (live != null) mid = live;
    }
    out.push({ date: iso, midYenPerKg: mid });
  }
  return out;
}

/** 保存済み Mid のみでレンジ文言（スパーク用サマリ） */
export function shijouWeekMidRangeLabel(days: SeiHistorySparkDay[]): string {
  const mids = days.map((d) => d.midYenPerKg).filter((x): x is number => x != null);
  if (mids.length === 0) return "履歴なし";
  const lo = Math.min(...mids);
  const hi = Math.max(...mids);
  if (lo === hi) return `${lo.toLocaleString()}円/kg（7日間で同一値のみ）`;
  return `${lo.toLocaleString()}〜${hi.toLocaleString()}円/kg（7日・保存分）`;
}
