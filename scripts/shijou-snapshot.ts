/**
 * 都日報（青果・各市場）の取得結果を data/shijou-sei-history.json に追記
 * 使い方: npm run shijou:snapshot   （省略時は日本時間の当日）
 *        npm run shijou:snapshot -- 2026-05-01
 */
import { mergeShijouHistoryFromPayload } from "../lib/shijou-nippo/history";
import { getShijouSeiRetailDashboard } from "../lib/shijou-nippo/service";

function jstTodayIso(): string {
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" });
  const parts = fmt.formatToParts(new Date());
  const y = parts.find((p) => p.type === "year")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const d = parts.find((p) => p.type === "day")!.value;
  return `${y}-${m}-${d}`;
}

async function main() {
  const iso = process.argv[2] ?? jstTodayIso();
  const res = await getShijouSeiRetailDashboard(iso);
  if (!res.ok) {
    console.error("shijou-snapshot:", res.message);
    process.exit(1);
  }
  mergeShijouHistoryFromPayload(res);
  console.log(`shijou-snapshot: merged ${res.rows.length} rows (trade ${res.reportDateIso ?? iso})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
