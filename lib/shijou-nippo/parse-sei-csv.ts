import type { CabbageSizeLabel, SeiDetailRow } from "./types";

/** CSV行（ダブルクォートを考慮した単純パーサー） */
export function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQ = !inQ;
      continue;
    }
    if (!inQ && c === ",") {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += c;
  }
  out.push(cur);
  return out;
}

function parseYen(s: string): number | null {
  const t = s.trim();
  if (t === "" || t === "−" || t === "-" || t.toLowerCase() === "nan") return null;
  const n = Number(t.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function parseVol(s: string): number | null {
  const t = s.trim();
  if (t === "" || t === "−" || t === "-") return null;
  const n = Number(t.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function parseUnitKg(s: string): number | null {
  const t = s.trim();
  if (t === "" || t === "−" || t === "-") return null;
  const n = Number(t.replace(/,/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** 品種欄からキャベツの M / L / 2L を推定（記載がなければ null） */
export function parseCabbageSize(variety: string): CabbageSizeLabel | null {
  const v = variety.trim();
  if (!v || v === "−" || v === "-") return null;
  if (/2\s*L|２\s*Ｌ|２L|2Ｌ|2ｌ|２l|2L|２Ｌ/i.test(v)) return "2L";
  if (/\bM\b|Ｍ|中玉|M玉|Mサイズ/i.test(v)) return "M";
  if (/\bL\b|Ｌ|大玉|L玉|Lサイズ/i.test(v)) return "L";
  return null;
}

export function parseReportMeta(csvText: string): { iso: string; label: string } | null {
  const line = csvText.split(/\r?\n/).find((l) => l.includes("令和") && l.includes("年"));
  if (!line) return null;
  const m = line.match(/令和(\d+)年\s*(\d{1,2})月\s*(\d{1,2})日/);
  if (!m) return null;
  const reiwa = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10);
  const day = parseInt(m[3], 10);
  const year = 2018 + reiwa;
  const iso = `${year}-${String(mo).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const label = `${year}年${mo}月${day}日`;
  return { iso, label };
}

/** 野菜ブロックのみを展開した明細行（果実は含めない） */
export function parseSeiVegetableRows(csvText: string): SeiDetailRow[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.length > 0);
  let section: "veg" | "fruit" | "other" = "other";
  let afterHeader = false;
  let currentItem: string | null = null;
  let blockTotal: number | null = null;
  const rows: SeiDetailRow[] = [];

  for (const line of lines) {
    if (line.includes("野菜（単位")) {
      section = "veg";
      afterHeader = false;
      currentItem = null;
      blockTotal = null;
      continue;
    }
    if (line.includes("果実（単位")) {
      section = "fruit";
      afterHeader = false;
      continue;
    }
    if (section !== "veg") continue;

    if (line.startsWith("【市況】")) continue;
    if (line.startsWith("全分類合計")) break;

    const cols = parseCsvLine(line);
    if (cols.length >= 10 && cols[0] === "品名" && cols[7]?.includes("高値")) {
      afterHeader = true;
      currentItem = null;
      blockTotal = null;
      continue;
    }
    if (!afterHeader || cols.length < 10) continue;

    const nameCell = cols[0].trim();
    if (nameCell) {
      currentItem = nameCell;
      blockTotal = parseVol(cols[1]);
    }
    if (!currentItem) continue;

    rows.push({
      itemName: currentItem,
      blockTotalVolume: blockTotal,
      saleMethod: cols[2].trim(),
      volume: parseVol(cols[3]),
      variety: cols[4].trim(),
      origin: cols[5].trim(),
      unitKg: parseUnitKg(cols[6]),
      highYen: parseYen(cols[7]),
      midYen: parseYen(cols[8]),
      lowYen: parseYen(cols[9]),
    });
  }

  return rows;
}
