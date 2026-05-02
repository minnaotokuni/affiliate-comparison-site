import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import type { OtaDailyPoint, OtaHistoryFile } from "./types";
import { OTA_MARKET_CODE } from "./config";

const FILE = join(process.cwd(), "data", "ota-history.json");

export function loadOtaHistory(): OtaHistoryFile {
  if (!existsSync(FILE)) {
    return {
      version: 1,
      marketCode: OTA_MARKET_CODE,
      marketName: "大田",
      byItem: {},
      lastSnapshotAt: null,
    };
  }
  try {
    const raw = readFileSync(FILE, "utf-8");
    const j = JSON.parse(raw) as OtaHistoryFile;
    if (j.version !== 1 || !j.byItem) throw new Error("bad history shape");
    return j;
  } catch {
    return {
      version: 1,
      marketCode: OTA_MARKET_CODE,
      marketName: "大田",
      byItem: {},
      lastSnapshotAt: null,
    };
  }
}

/** CLI スナップショット用: 履歴にマージして保存 */
export function mergeSnapshotIntoHistory(itemCode: string, point: OtaDailyPoint): void {
  const hist = loadOtaHistory();
  if (!hist.byItem[itemCode]) hist.byItem[itemCode] = {};
  hist.byItem[itemCode][point.date] = point;
  hist.lastSnapshotAt = new Date().toISOString();
  writeFileSync(FILE, JSON.stringify(hist, null, 2), "utf-8");
}

export function getSeriesForItem(hist: OtaHistoryFile, itemCode: string): OtaDailyPoint[] {
  const m = hist.byItem[itemCode];
  if (!m) return [];
  return Object.values(m).sort((a, b) => a.date.localeCompare(b.date));
}
