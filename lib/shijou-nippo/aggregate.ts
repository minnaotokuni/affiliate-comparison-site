import type { SeiCsvLineSummary, SeiDetailRow } from "./types";
import { wholesaleYenPerKg } from "./retail-estimate";

/** 卸売数量で加重した参考 kg 単価（高・中・安のいずれか） */
export function volumeWeightedPricePerKg(rows: SeiDetailRow[], field: "highYen" | "midYen" | "lowYen"): number | null {
  let num = 0;
  let den = 0;
  const fallback: number[] = [];

  for (const r of rows) {
    const yen = r[field];
    const perKg = wholesaleYenPerKg(yen, r.unitKg);
    if (perKg == null) continue;
    const v = r.volume != null && r.volume > 0 ? r.volume : null;
    if (v != null) {
      num += perKg * v;
      den += v;
    } else {
      fallback.push(perKg);
    }
  }

  if (den > 0) return num / den;
  if (fallback.length === 0) return null;
  return fallback.reduce((a, b) => a + b, 0) / fallback.length;
}

/** @deprecated 呼び出し側は volumeWeightedPricePerKg(rows, "midYen") を優先 */
export function volumeWeightedYenPerKg(rows: SeiDetailRow[]): number | null {
  return volumeWeightedPricePerKg(rows, "midYen");
}

/** 数量が多い順に、日報の「生」の高・中・安（円）と産地などを残す */
export function topCsvLinesByVolume(rows: SeiDetailRow[], limit = 6): SeiCsvLineSummary[] {
  return [...rows]
    .filter((r) => r.midYen != null || r.highYen != null || r.lowYen != null)
    .sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0))
    .slice(0, limit)
    .map((r) => ({
      saleMethod: r.saleMethod,
      variety: r.variety === "−" || r.variety === "-" ? "" : r.variety,
      origin: r.origin === "−" || r.origin === "-" ? "" : r.origin,
      unitKg: r.unitKg,
      volume: r.volume,
      highYen: r.highYen,
      midYen: r.midYen,
      lowYen: r.lowYen,
    }));
}
