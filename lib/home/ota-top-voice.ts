import type { OtaDashboardRow } from "@/lib/ota-market/service";

type ScoredLine = { score: number; line: string };

/** トップ用の短文（大田・卸参考・取引単位ベース）。目立つ変化から最大件数まで */
export function buildOtaTopVoiceLines(rows: OtaDashboardRow[], maxLines = 5): string[] {
  const scored: ScoredLine[] = [];

  for (const row of rows) {
    if (row.status !== "ok" || row.live?.midWeighted == null) continue;

    const name = row.config.displayName;
    const parts: string[] = [];
    let score = 0;

    if (row.yearlyBand === "low") {
      parts.push("保存してきたデータの範囲では、いまの水準はかなり安めです");
      score += 3;
    } else if (row.yearlyBand === "high") {
      parts.push("保存データの範囲では、いまの水準は高めです");
      score += 1;
    }

    const pct = row.weekOverWeekPct;
    if (pct != null && pct <= -8) {
      parts.push(`先週の週あたり平均と比べて約${Math.abs(Math.round(pct))}%下がっています`);
      score += 3;
    } else if (pct != null && pct >= 8) {
      parts.push(`先週の週あたり平均と比べて約${Math.round(pct)}%上がっています`);
      score += 2;
    } else if (pct != null && (pct <= -4 || pct >= 4)) {
      parts.push(
        pct < 0
          ? `先週の週あたり平均よりやや下（約${Math.abs(Math.round(pct))}%）`
          : `先週の週あたり平均よりやや上（約${Math.round(pct)}%）`,
      );
      score += 1;
    }

    if (parts.length === 0) continue;

    scored.push({
      score,
      line: `【${name}】${parts.join("。")}。（大田・卸参考・APIの取引単位ベース）`,
    });
  }

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, maxLines).map((s) => s.line);

  if (top.length > 0) return top;

  const fallback = rows
    .filter((r) => r.status === "ok" && r.live?.midWeighted != null)
    .slice(0, 2)
    .map((r) => `【${r.config.displayName}】${r.yearSummary}。週内の幅は「${r.weekSummary.split("（")[0]}」程度のイメージです（大田・卸参考）。`);

  return fallback;
}
