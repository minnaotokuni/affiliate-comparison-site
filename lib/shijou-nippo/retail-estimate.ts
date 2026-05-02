import type { CabbageSizeLabel } from "./types";

/** 仕入れ〜棚への粗い倍率（地域・店舗体裁により大きく異なる） */
export const RETAIL_MARKUP = 1.42;

/** キャベツの玉体重（kg）— 規格の目安（JA・量販の表示と完全一致ではない） */
export const CABBAGE_HEAD_KG: Record<CabbageSizeLabel, number> = {
  M: 1.05,
  L: 1.55,
  "2L": 2.15,
};

export const PIECE_PROFILES: Record<string, { kg: number; label: string }> = {
  トマト: { kg: 0.14, label: "中玉1個相当" },
  きゅうり: { kg: 0.095, label: "1本相当" },
  なす: { kg: 0.12, label: "1本相当" },
  にんじん: { kg: 0.12, label: "1本相当" },
  レタス: { kg: 0.32, label: "1玉相当" },
  はくさい: { kg: 0.35, label: "1/4株相当（切り売り目安）" },
};

export function wholesaleYenPerKg(midYen: number | null, unitKg: number | null): number | null {
  if (midYen == null || unitKg == null || unitKg <= 0) return null;
  return midYen / unitKg;
}

export function retailPieceEstimate(yenPerKg: number | null, pieceKg: number): number | null {
  if (yenPerKg == null || pieceKg <= 0) return null;
  return Math.round(yenPerKg * pieceKg * RETAIL_MARKUP);
}
