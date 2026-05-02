import type { CabbageSizeLabel } from "./types";

/** キャベツの玉体重（kg）— 規格の目安（JA・量販の表示と完全一致ではない） */
export const CABBAGE_HEAD_KG: Record<CabbageSizeLabel, number> = {
  M: 1.05,
  L: 1.55,
  "2L": 2.15,
};

/** 店頭の「1個・1本」を卸の円/kgで換算するときの代表重量（あくまで目安） */
export const PIECE_PROFILES: Record<string, { kg: number; grams: number; unitLabel: string }> = {
  トマト: { kg: 0.14, grams: 140, unitLabel: "中玉1個" },
  きゅうり: { kg: 0.095, grams: 95, unitLabel: "1本" },
  なす: { kg: 0.12, grams: 120, unitLabel: "1本" },
  にんじん: { kg: 0.12, grams: 120, unitLabel: "1本" },
  レタス: { kg: 0.32, grams: 320, unitLabel: "1玉" },
  はくさい: { kg: 0.35, grams: 350, unitLabel: "1/4株（切り売り目安）" },
};

export function wholesaleYenPerKg(midYen: number | null, unitKg: number | null): number | null {
  if (midYen == null || unitKg == null || unitKg <= 0) return null;
  return midYen / unitKg;
}

/** 卸の円/kg に代表重量(kg)を掛けた参考（小売・税込ではない） */
export function wholesaleYenForPieceKg(yenPerKg: number | null, pieceKg: number): number | null {
  if (yenPerKg == null || pieceKg <= 0) return null;
  return Math.round(yenPerKg * pieceKg);
}
