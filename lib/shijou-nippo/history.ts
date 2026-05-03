import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import type { CabbageSizeLabel, ShijouMarketId, ShijouSeiDashboardPayload } from "./types";

const FILE = join(process.cwd(), "data", "shijou-sei-history.json");

/** 行キーごと・取引日ごとのコンパクトなスナップショット（CSVの詳細行は保存しない） */
export type ShijouSeiHistoryCompact = {
  wholesaleMidYenPerKg: number | null;
  wholesaleHighYenPerKg: number | null;
  wholesaleLowYenPerKg: number | null;
  typicalPieceGrams: number | null;
  wholesaleYenForTypicalPiece: number | null;
};

export type ShijouSeiHistoryFile = {
  version: 1;
  /** `${marketId}|${itemName}|${cabbageSize ?? "-"}` → 取引日 ISO → 値 */
  byRowKey: Record<string, Record<string, ShijouSeiHistoryCompact>>;
  lastSnapshotAt: string | null;
};

export function shijouRowKey(marketId: ShijouMarketId, itemName: string, cabbageSize: CabbageSizeLabel | null): string {
  return `${marketId}|${itemName}|${cabbageSize ?? "-"}`;
}

export function loadShijouHistory(): ShijouSeiHistoryFile {
  if (!existsSync(FILE)) {
    return { version: 1, byRowKey: {}, lastSnapshotAt: null };
  }
  try {
    const raw = readFileSync(FILE, "utf-8");
    const j = JSON.parse(raw) as ShijouSeiHistoryFile;
    if (j.version !== 1 || !j.byRowKey) throw new Error("bad shijou history shape");
    return j;
  } catch {
    return { version: 1, byRowKey: {}, lastSnapshotAt: null };
  }
}

/** 履歴に保存されている取引日（YYYY-MM-DD）のうちもっとも新しい日。無ければ null */
export function latestTradeIsoInHistory(hist: ShijouSeiHistoryFile): string | null {
  let max: string | null = null;
  for (const byDate of Object.values(hist.byRowKey)) {
    for (const iso of Object.keys(byDate)) {
      if (!max || iso > max) max = iso;
    }
  }
  return max;
}

/** スナップショットCLI用: 1回の実行でまとめて書き込み */
export function mergeShijouHistoryFromPayload(payload: ShijouSeiDashboardPayload): void {
  const hist = loadShijouHistory();
  const tradeIso = payload.reportDateIso ?? payload.requestedDateIso;
  for (const row of payload.rows) {
    const key = shijouRowKey(row.marketId, row.itemName, row.cabbageSize);
    if (!hist.byRowKey[key]) hist.byRowKey[key] = {};
    hist.byRowKey[key][tradeIso] = {
      wholesaleMidYenPerKg: row.wholesaleMidYenPerKg,
      wholesaleHighYenPerKg: row.wholesaleHighYenPerKg,
      wholesaleLowYenPerKg: row.wholesaleLowYenPerKg,
      typicalPieceGrams: row.typicalPieceGrams,
      wholesaleYenForTypicalPiece: row.wholesaleYenForTypicalPiece,
    };
  }
  hist.lastSnapshotAt = new Date().toISOString();
  writeFileSync(FILE, JSON.stringify(hist, null, 2), "utf-8");
}
