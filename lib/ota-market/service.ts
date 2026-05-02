import { aggregateItemDay } from "./aggregate";
import { OTA_API_FRUIT, OTA_API_VEG, OTA_TRACKED_ITEMS } from "./config";
import { fetchOtaCsv, parseOtaCsv } from "./csv";
import { getSeriesForItem, loadOtaHistory } from "./history";
import {
  monthRangeLabel,
  pointsInLastCalendarDays,
  pointsInSameCalendarMonth,
  weekRangeLabel,
  yearlyBandLabel,
} from "./stats";
import { isoDateInJapan, longDateLabelJa } from "@/lib/jst-date";
import type { OtaDailyPoint, OtaItemConfig } from "./types";

export type OtaSparkDay = {
  date: string;
  mid: number | null;
  hasShipment: boolean;
};

export type OtaDashboardRow = {
  config: OtaItemConfig;
  live: OtaDailyPoint | null;
  /** 直近APIに含まれる取引日（YYYY-MM-DD） */
  tradeDate: string | null;
  weekSummary: string;
  monthSummary: string;
  yearSummary: string;
  spark: OtaSparkDay[];
  status: "ok" | "no_shipment" | "no_rows";
};

export type OtaDashboardPayload = {
  ok: true;
  /** サイト表示の基準日（JST・カレンダー） */
  referenceDateIso: string;
  referenceDateLabel: string;
  tradeDate: string | null;
  tradeDateLabel: string | null;
  rows: OtaDashboardRow[];
  fetchedAt: string;
};

export type OtaDashboardError = {
  ok: false;
  message: string;
  referenceDateIso: string;
  referenceDateLabel: string;
};

function isoFromSlash(d: string): string | null {
  const m = d.trim().match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

function mergeSeries(historySeries: OtaDailyPoint[], live: OtaDailyPoint | null): OtaDailyPoint[] {
  const map = new Map(historySeries.map((p) => [p.date, { ...p }]));
  if (live) map.set(live.date, { ...live });
  return [...map.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function buildSpark(series: OtaDailyPoint[], referenceIso: string, days = 7): OtaSparkDay[] {
  const ref = new Date(`${referenceIso}T12:00:00+09:00`);
  const out: OtaSparkDay[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const dt = new Date(ref);
    dt.setDate(dt.getDate() - i);
    const iso = isoDateInJapan(dt);
    const hit = series.find((p) => p.date === iso);
    out.push({
      date: iso,
      mid: hit?.midWeighted ?? null,
      hasShipment: hit?.hasShipment ?? false,
    });
  }
  return out;
}

export async function getOtaMarketDashboard(): Promise<OtaDashboardPayload | OtaDashboardError> {
  const referenceDateIso = isoDateInJapan();
  const referenceDateLabel = longDateLabelJa(referenceDateIso);

  try {
    const [vegText, fruitText] = await Promise.all([fetchOtaCsv(OTA_API_VEG), fetchOtaCsv(OTA_API_FRUIT)]);
    const vegRows = parseOtaCsv(vegText);
    const fruitRows = parseOtaCsv(fruitText);
    const all = [...vegRows, ...fruitRows];
    const tradeSlash = vegRows[0]?.date ?? fruitRows[0]?.date ?? null;
    const tradeDate = tradeSlash ? isoFromSlash(tradeSlash) : null;
    const tradeDateLabel = tradeDate ? longDateLabelJa(tradeDate) : null;

    const hist = loadOtaHistory();
    const rows: OtaDashboardRow[] = [];

    for (const cfg of OTA_TRACKED_ITEMS) {
      const live = aggregateItemDay(all, cfg.itemCode);
      const histSeries = getSeriesForItem(hist, cfg.itemCode);
      const series = mergeSeries(histSeries, live);

      let status: OtaDashboardRow["status"];
      if (!live) status = "no_rows";
      else if (!live.hasShipment) status = "no_shipment";
      else status = "ok";

      const weekPts = pointsInLastCalendarDays(series, referenceDateIso, 7);
      const monthPts = pointsInSameCalendarMonth(series, referenceDateIso);
      const histMids = series.filter((p) => p.hasShipment && p.midWeighted != null).map((p) => p.midWeighted!);

      const currentMid = live?.midWeighted ?? null;
      rows.push({
        config: cfg,
        live,
        tradeDate,
        weekSummary: weekPts.length ? weekRangeLabel(weekPts) : "保存履歴が少ないため—（スナップショット蓄積後に表示）",
        monthSummary: monthPts.length ? monthRangeLabel(monthPts) : "当月の保存データがまだありません",
        yearSummary: yearlyBandLabel(currentMid, histMids),
        spark: buildSpark(series, referenceDateIso, 7),
        status,
      });
    }

    return {
      ok: true,
      referenceDateIso,
      referenceDateLabel,
      tradeDate,
      tradeDateLabel,
      rows,
      fetchedAt: new Date().toISOString(),
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "fetch failed";
    return { ok: false, message: msg, referenceDateIso, referenceDateLabel };
  }
}
