import type { OtaDailyPoint } from "./types";

/** 基準日を含む過去 n 日（カレンダー）にデータがある点を返す（データが無い日はスキップ） */
export function pointsInLastCalendarDays(points: OtaDailyPoint[], referenceIso: string, days: number): OtaDailyPoint[] {
  const ref = new Date(`${referenceIso}T12:00:00+09:00`);
  const start = new Date(ref);
  start.setDate(start.getDate() - (days - 1));
  const startStr = formatIsoJst(start);
  const endStr = referenceIso;
  return points.filter((p) => p.date >= startStr && p.date <= endStr && p.hasShipment && p.midWeighted != null).sort((a, b) => a.date.localeCompare(b.date));
}

export function pointsInSameCalendarMonth(points: OtaDailyPoint[], referenceIso: string): OtaDailyPoint[] {
  const ym = referenceIso.slice(0, 7);
  return points.filter((p) => p.date.startsWith(ym) && p.hasShipment && p.midWeighted != null);
}

function formatIsoJst(d: Date): string {
  const jp = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
  return jp;
}

/** 過去データがある代表中値の一覧から、現在値の年間位置（便宜上・保存履歴ベース） */
export function yearlyBandLabel(current: number | null, historyMids: number[]): string {
  if (current == null || historyMids.length < 3) return "比較データ不足";
  const sorted = [...historyMids].sort((a, b) => a - b);
  const below = sorted.filter((x) => x < current).length;
  const p = below / sorted.length;
  if (p <= 0.25) return "保存履歴の中では安め寄り";
  if (p >= 0.75) return "保存履歴の中では高め寄り";
  return "保存履歴の中では中位付近";
}

export function weekRangeLabel(pts: OtaDailyPoint[]): string {
  const mids = pts.map((p) => p.midWeighted).filter((x): x is number => x != null);
  if (mids.length === 0) return "—";
  const lo = Math.min(...mids);
  const hi = Math.max(...mids);
  const last = pts[pts.length - 1]?.midWeighted;
  if (last == null) return "—";
  const trend = mids.length >= 2 ? last - mids[0] : 0;
  const arrow = trend > 0 ? "↑" : trend < 0 ? "↓" : "→";
  return `${lo.toLocaleString()}〜${hi.toLocaleString()}円（週内代表中値） ${arrow}`;
}

export function monthRangeLabel(pts: OtaDailyPoint[]): string {
  const mids = pts.map((p) => p.midWeighted).filter((x): x is number => x != null);
  if (mids.length === 0) return "—";
  return `${Math.min(...mids).toLocaleString()}〜${Math.max(...mids).toLocaleString()}円（当月・保存分）`;
}
