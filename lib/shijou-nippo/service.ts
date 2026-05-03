import { topCsvLinesByVolume, volumeWeightedPricePerKg, volumeWeightedYenPerKg } from "./aggregate";
import { SHIJOU_TRACKED_VEG_ITEMS, type ShijouTrackedVeg } from "./config";
import { fetchSeiMarketCsv } from "./fetch";
import { latestTradeIsoInHistory, loadShijouHistory, shijouRowKey, type ShijouSeiHistoryCompact, type ShijouSeiHistoryFile } from "./history";
import { longDateLabelJa } from "@/lib/jst-date";
import { SHIJOU_SEI_MARKETS } from "./markets";
import { parseCabbageSize, parseReportMeta, parseSeiVegetableRows } from "./parse-sei-csv";
import { CABBAGE_HEAD_KG, PIECE_PROFILES, wholesaleYenForPieceKg } from "./retail-estimate";
import { buildShijouSpark7Days } from "./spark-history";
import { seiZenIndexUrl } from "./url";
import type { CabbageSizeLabel, SeiDetailRow, SeiItemRetailRow, ShijouMarketId, ShijouSeiDashboardError, ShijouSeiDashboardPayload } from "./types";

const SIZES: CabbageSizeLabel[] = ["M", "L", "2L"];

function sortRetailRows(rows: SeiItemRetailRow[]): SeiItemRetailRow[] {
  const mOrder = Object.fromEntries(SHIJOU_SEI_MARKETS.map((m, i) => [m.id, i]));
  const iOrder = Object.fromEntries(SHIJOU_TRACKED_VEG_ITEMS.map((n, i) => [n, i]));
  const sOrder: Record<CabbageSizeLabel, number> = { M: 0, L: 1, "2L": 2 };
  return [...rows].sort((a, b) => {
    const ma = mOrder[a.marketId] ?? 99;
    const mb = mOrder[b.marketId] ?? 99;
    if (ma !== mb) return ma - mb;
    const ia = iOrder[a.itemName as ShijouTrackedVeg] ?? 99;
    const ib = iOrder[b.itemName as ShijouTrackedVeg] ?? 99;
    if (ia !== ib) return ia - ib;
    const sa = a.cabbageSize != null ? sOrder[a.cabbageSize] : -1;
    const sb = b.cabbageSize != null ? sOrder[b.cabbageSize] : -1;
    return sa - sb;
  });
}

function rowsForItem(all: SeiDetailRow[], name: string): SeiDetailRow[] {
  return all.filter((r) => r.itemName === name);
}

function cabbageRetailRows(marketLabel: string, marketId: ShijouMarketId, cabbageRows: SeiDetailRow[]): SeiItemRetailRow[] {
  const overallMid = volumeWeightedYenPerKg(cabbageRows);
  const bySize: Record<CabbageSizeLabel, SeiDetailRow[]> = { M: [], L: [], "2L": [] };
  for (const r of cabbageRows) {
    const sz = parseCabbageSize(r.variety);
    if (sz) bySize[sz].push(r);
  }

  const hasVarietySplit = SIZES.some((s) => bySize[s].length > 0);

  return SIZES.map((sz) => {
    const bucket = bySize[sz];
    const source = bucket.length > 0 ? bucket : cabbageRows;
    const ypkHi = bucket.length > 0 ? volumeWeightedPricePerKg(bucket, "highYen") : volumeWeightedPricePerKg(cabbageRows, "highYen");
    const ypkMid = bucket.length > 0 ? volumeWeightedPricePerKg(bucket, "midYen") : volumeWeightedPricePerKg(cabbageRows, "midYen");
    const ypkLo = bucket.length > 0 ? volumeWeightedPricePerKg(bucket, "lowYen") : volumeWeightedPricePerKg(cabbageRows, "lowYen");
    const ypk = ypkMid ?? overallMid;
    const headKg = CABBAGE_HEAD_KG[sz];
    const grams = Math.round(headKg * 1000);
    const pieceYen = wholesaleYenForPieceKg(ypk, headKg);
    const detailNote = hasVarietySplit
      ? bucket.length > 0
        ? "品種欄のサイズ表記行を数量加重（同一サイズ内の産地・販売方法別）"
        : "このサイズ表記の行が無いため、キャベツ全体の平均単価を使用"
      : "品種欄に M/L/2L が無い日のため、全体の卸単価から玉体重のみ差し替え";

    const midRounded = ypkMid != null ? Math.round(ypkMid) : null;

    return {
      marketLabel,
      marketId,
      itemName: "キャベツ",
      cabbageSize: sz,
      wholesaleHighYenPerKg: ypkHi != null ? Math.round(ypkHi) : null,
      wholesaleMidYenPerKg: midRounded,
      wholesaleLowYenPerKg: ypkLo != null ? Math.round(ypkLo) : null,
      wholesaleYenPerKg: midRounded,
      typicalPieceGrams: grams,
      typicalPieceUnitLabel: `${sz}玉の目安`,
      wholesaleYenForTypicalPiece: pieceYen,
      detailNote,
      csvTopLines: topCsvLinesByVolume(source, 6),
      historySpark7d: [],
    };
  });
}

function compactToRetailRow(
  marketLabel: string,
  marketId: ShijouMarketId,
  itemName: string,
  cabbageSize: CabbageSizeLabel | null,
  compact: ShijouSeiHistoryCompact,
  tradeIso: string,
): SeiItemRetailRow {
  const typicalGrams =
    compact.typicalPieceGrams ??
    (cabbageSize != null ? Math.round(CABBAGE_HEAD_KG[cabbageSize] * 1000) : PIECE_PROFILES[itemName]?.grams ?? null);

  const typicalPieceUnitLabel =
    cabbageSize != null ? `${cabbageSize}玉の目安` : (PIECE_PROFILES[itemName]?.unitLabel ?? null);

  const mid = compact.wholesaleMidYenPerKg;
  const kg = typicalGrams != null ? typicalGrams / 1000 : null;
  const pieceYen =
    compact.wholesaleYenForTypicalPiece ??
    (mid != null && kg != null ? wholesaleYenForPieceKg(mid, kg) : null);

  return {
    marketLabel,
    marketId,
    itemName,
    cabbageSize,
    wholesaleHighYenPerKg: compact.wholesaleHighYenPerKg,
    wholesaleMidYenPerKg: compact.wholesaleMidYenPerKg,
    wholesaleLowYenPerKg: compact.wholesaleLowYenPerKg,
    wholesaleYenPerKg: compact.wholesaleMidYenPerKg,
    typicalPieceGrams: typicalGrams,
    typicalPieceUnitLabel,
    wholesaleYenForTypicalPiece: pieceYen,
    detailNote: `保存済みスナップショット（取引日 ${tradeIso}）。当日のCSVを取得できなかったため、この履歴を表示しています。`,
    csvTopLines: [],
    historySpark7d: [],
  };
}

/** 履歴ファイルの指定取引日で、追跡品目の行を組み立てる（CSV詳細行は無し） */
function buildRetailRowsFromHistory(hist: ShijouSeiHistoryFile, tradeIso: string): SeiItemRetailRow[] {
  const out: SeiItemRetailRow[] = [];
  for (const meta of SHIJOU_SEI_MARKETS) {
    for (const sz of SIZES) {
      const key = shijouRowKey(meta.id, "キャベツ", sz);
      const compact = hist.byRowKey[key]?.[tradeIso];
      if (compact) out.push(compactToRetailRow(meta.label, meta.id, "キャベツ", sz, compact, tradeIso));
    }
    for (const name of SHIJOU_TRACKED_VEG_ITEMS) {
      if (name === "キャベツ") continue;
      const key = shijouRowKey(meta.id, name, null);
      const compact = hist.byRowKey[key]?.[tradeIso];
      if (compact) out.push(compactToRetailRow(meta.label, meta.id, name, null, compact, tradeIso));
    }
  }
  return out;
}

function simpleItemRow(
  marketLabel: string,
  marketId: ShijouMarketId,
  itemName: string,
  itemRows: SeiDetailRow[],
): SeiItemRetailRow | null {
  const ypkHi = volumeWeightedPricePerKg(itemRows, "highYen");
  const ypkMid = volumeWeightedPricePerKg(itemRows, "midYen");
  const ypkLo = volumeWeightedPricePerKg(itemRows, "lowYen");
  const ypk = ypkMid ?? volumeWeightedYenPerKg(itemRows);
  const prof = PIECE_PROFILES[itemName];
  if (!prof) return null;
  const pieceYen = wholesaleYenForPieceKg(ypk, prof.kg);
  const midRounded = ypkMid != null ? Math.round(ypkMid) : ypk != null ? Math.round(ypk) : null;
  return {
    marketLabel,
    marketId,
    itemName,
    cabbageSize: null,
    wholesaleHighYenPerKg: ypkHi != null ? Math.round(ypkHi) : null,
    wholesaleMidYenPerKg: midRounded,
    wholesaleLowYenPerKg: ypkLo != null ? Math.round(ypkLo) : null,
    wholesaleYenPerKg: midRounded,
    typicalPieceGrams: prof.grams,
    typicalPieceUnitLabel: prof.unitLabel,
    wholesaleYenForTypicalPiece: pieceYen,
    detailNote: "卸の高・中・安を数量加重して円/kg換算。代表重量は一般的な目安",
    csvTopLines: topCsvLinesByVolume(itemRows, 6),
    historySpark7d: [],
  };
}

export async function getShijouSeiRetailDashboard(requestedDateIso: string): Promise<ShijouSeiDashboardPayload | ShijouSeiDashboardError> {
  const settled = await Promise.allSettled(SHIJOU_SEI_MARKETS.map((m) => fetchSeiMarketCsv(m, requestedDateIso)));

  let reportMeta: { iso: string; label: string } | null = null;
  const outRows: SeiItemRetailRow[] = [];

  for (let i = 0; i < settled.length; i++) {
    const r = settled[i];
    const meta = SHIJOU_SEI_MARKETS[i];
    if (r.status !== "fulfilled") continue;

    const text = r.value;
    if (!reportMeta) reportMeta = parseReportMeta(text);

    const veg = parseSeiVegetableRows(text);

    const cabbage = rowsForItem(veg, "キャベツ");
    if (cabbage.length > 0) {
      outRows.push(...cabbageRetailRows(meta.label, meta.id, cabbage));
    }

    for (const name of SHIJOU_TRACKED_VEG_ITEMS) {
      if (name === "キャベツ") continue;
      const ir = rowsForItem(veg, name);
      if (ir.length === 0) continue;
      const row = simpleItemRow(meta.label, meta.id, name, ir);
      if (row) outRows.push(row);
    }
  }

  if (outRows.length === 0) {
    const histFallback = loadShijouHistory();
    const latestIso = latestTradeIsoInHistory(histFallback);
    if (latestIso) {
      const fromHist = buildRetailRowsFromHistory(histFallback, latestIso);
      if (fromHist.length > 0) {
        const sorted = sortRetailRows(fromHist);
        const rowsWithSpark = sorted.map((row) => ({
          ...row,
          historySpark7d: buildShijouSpark7Days(requestedDateIso, row, histFallback, latestIso),
        }));
        return {
          ok: true,
          requestedDateIso,
          reportDateIso: latestIso,
          reportDateLabel: longDateLabelJa(latestIso),
          referenceMismatch: requestedDateIso !== latestIso,
          usedHistoryFallback: true,
          rows: rowsWithSpark,
          fetchedAt: new Date().toISOString(),
        };
      }
    }
    return {
      ok: false,
      message:
        "この日付の青果・各市場CSVを取得できず、保存済みの履歴（data/shijou-sei-history.json）にも参照できるデータがありませんでした。休場・未掲載・通信エラー、またはまだスナップショットが無い可能性があります。",
      requestedDateIso,
    };
  }

  const reportIso = reportMeta?.iso ?? null;
  const reportLabel = reportMeta?.label ?? null;
  const referenceMismatch = Boolean(reportIso && reportIso !== requestedDateIso);

  const hist = loadShijouHistory();
  const sorted = sortRetailRows(outRows);
  const rowsWithSpark = sorted.map((row) => ({
    ...row,
    historySpark7d: buildShijouSpark7Days(requestedDateIso, row, hist, reportIso),
  }));

  return {
    ok: true,
    requestedDateIso,
    reportDateIso: reportIso,
    reportDateLabel: reportLabel,
    referenceMismatch,
    rows: rowsWithSpark,
    fetchedAt: new Date().toISOString(),
  };
}

export { seiZenIndexUrl };
