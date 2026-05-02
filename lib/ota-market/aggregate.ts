import type { OtaDailyPoint, OtaRow } from "./types";

function isoFromSlashDate(d: string): string | null {
  const m = d.trim().match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

/** 同一品目コード・同一日の複数産地行から代表値を作成 */
export function aggregateItemDay(rows: OtaRow[], itemCode: string): OtaDailyPoint | null {
  const filtered = rows.filter((r) => r.itemCode === itemCode);
  if (filtered.length === 0) return null;
  const dateIso = isoFromSlashDate(filtered[0].date);
  if (!dateIso) return null;

  let volSum = 0;
  let midWt = 0;
  let midParts = 0;
  let hi: number | null = null;
  let lo: number | null = null;
  const label = filtered[0].itemName;

  for (const r of filtered) {
    const v = r.volume;
    const m = r.mid;
    if (v != null && v > 0 && m != null) {
      volSum += v;
      midWt += m * v;
      midParts += v;
    }
    if (m != null) {
      hi = hi == null ? m : Math.max(hi, m);
      lo = lo == null ? m : Math.min(lo, m);
    }
    if (r.high != null) hi = hi == null ? r.high : Math.max(hi, r.high);
    if (r.low != null) lo = lo == null ? r.low : Math.min(lo, r.low);
  }

  const hasShipment = volSum > 0;
  const midWeighted = midParts > 0 ? Math.round(midWt / midParts) : null;

  return {
    date: dateIso,
    midWeighted,
    hiMax: hi,
    loMin: lo,
    volumeT: Math.round(volSum * 10) / 10,
    hasShipment,
    itemLabel: label,
  };
}
