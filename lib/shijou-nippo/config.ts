/** 東京都デジタル市場日報の「品名」と一致させる */
export const SHIJOU_TRACKED_VEG_ITEMS = ["キャベツ", "トマト", "きゅうり", "レタス", "にんじん", "なす", "はくさい"] as const;

export type ShijouTrackedVeg = (typeof SHIJOU_TRACKED_VEG_ITEMS)[number];
