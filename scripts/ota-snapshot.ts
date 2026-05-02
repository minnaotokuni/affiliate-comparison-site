/**
 * 市況APIの当日分を data/ota-history.json に追記（1日1回の定期実行向け）
 * 使い方: npm run ota:snapshot
 */
import { aggregateItemDay } from "../lib/ota-market/aggregate";
import { OTA_API_FRUIT, OTA_API_VEG, OTA_TRACKED_ITEMS } from "../lib/ota-market/config";
import { fetchOtaCsv, parseOtaCsv } from "../lib/ota-market/csv";
import { mergeSnapshotIntoHistory } from "../lib/ota-market/history";

async function main() {
  const [vegText, fruitText] = await Promise.all([
    fetchOtaCsv(OTA_API_VEG, "no-store"),
    fetchOtaCsv(OTA_API_FRUIT, "no-store"),
  ]);
  const rows = [...parseOtaCsv(vegText), ...parseOtaCsv(fruitText)];
  let n = 0;
  for (const cfg of OTA_TRACKED_ITEMS) {
    const pt = aggregateItemDay(rows, cfg.itemCode);
    if (pt) {
      mergeSnapshotIntoHistory(cfg.itemCode, pt);
      n++;
    }
  }
  console.log(`ota-snapshot: merged ${n} items`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
