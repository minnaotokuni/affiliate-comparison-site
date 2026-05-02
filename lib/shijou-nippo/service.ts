import { topCsvLinesByVolume, volumeWeightedPricePerKg, volumeWeightedYenPerKg } from "./aggregate";
import { SHIJOU_TRACKED_VEG_ITEMS, type ShijouTrackedVeg } from "./config";
import { fetchSeiMarketCsv } from "./fetch";
import { SHIJOU_SEI_MARKETS } from "./markets";
import { parseCabbageSize, parseReportMeta, parseSeiVegetableRows } from "./parse-sei-csv";
import { CABBAGE_HEAD_KG, PIECE_PROFILES, wholesaleYenForPieceKg } from "./retail-estimate";
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
    };
  });
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
    return {
      ok: false,
      message:
        "この日付の青果・各市場CSVを取得できませんでした（休場・未掲載・通信エラーなど）。日付を変えて公開ページを確認してください。",
      requestedDateIso,
    };
  }

  const reportIso = reportMeta?.iso ?? null;
  const reportLabel = reportMeta?.label ?? null;
  const referenceMismatch = Boolean(reportIso && reportIso !== requestedDateIso);

  return {
    ok: true,
    requestedDateIso,
    reportDateIso: reportIso,
    reportDateLabel: reportLabel,
    referenceMismatch,
    rows: sortRetailRows(outRows),
    fetchedAt: new Date().toISOString(),
  };
}

export { seiZenIndexUrl };
