/**
 * 週次の「耳寄り」を載せるときだけ編集する。掲載期間外はファイルの内容は無視され、
 * トップでは暦ベースの旬フォールバックのみ表示される（古い文は出さない）。
 *
 * 例:
 * {
 *   "version": 1,
 *   "spotlight": {
 *     "validFromIso": "2026-05-01",
 *     "validToIso": "2026-05-07",
 *     "title": "GW明けのメモ",
 *     "lines": ["青果は〇〇が落ち着きやすい", "△△は産地が分かれやすい"],
 *     "vegetableSlugs": ["lettuce"],
 *     "fruitSlugs": ["strawberry"]
 *   }
 * }
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const FILE = join(process.cwd(), "data", "weekly-spotlight.json");

export type WeeklySpotlightCurated = {
  validFromIso: string;
  validToIso: string;
  title: string;
  lines: string[];
  vegetableSlugs?: string[];
  fruitSlugs?: string[];
};

export type WeeklySpotlightFile = {
  version: 1;
  spotlight: WeeklySpotlightCurated | null;
};

function parseRef(iso: string): number {
  const t = Date.parse(`${iso}T12:00:00+09:00`);
  return Number.isFinite(t) ? t : 0;
}

export function loadWeeklySpotlightFile(): WeeklySpotlightFile {
  if (!existsSync(FILE)) {
    return { version: 1, spotlight: null };
  }
  try {
    const raw = readFileSync(FILE, "utf-8");
    const j = JSON.parse(raw) as WeeklySpotlightFile;
    if (j.version !== 1) return { version: 1, spotlight: null };
    return j;
  } catch {
    return { version: 1, spotlight: null };
  }
}

/** 掲載期間内なら curated。期限切れ・未設定は null（呼び出し側で旬フォールバック） */
export function activeWeeklySpotlight(referenceIso: string): WeeklySpotlightCurated | null {
  const { spotlight } = loadWeeklySpotlightFile();
  if (!spotlight?.validFromIso || !spotlight.validToIso || !spotlight.title) return null;
  const ref = parseRef(referenceIso);
  const from = parseRef(spotlight.validFromIso);
  const to = parseRef(spotlight.validToIso);
  if (!ref || !from || !to) return null;
  if (ref < from || ref > to) return null;
  return spotlight;
}
