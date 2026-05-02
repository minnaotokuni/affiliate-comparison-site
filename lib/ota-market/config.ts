import type { OtaItemConfig } from "./types";

/** 大田市場（コード13310）で追う品目。itemCode は cultivationdata（農林水産省市況）のコード。 */
export const OTA_TRACKED_ITEMS: OtaItemConfig[] = [
  { id: "lettuce", itemCode: "33400", category: "v", displayName: "レタス" },
  { id: "cabbage", itemCode: "31700", category: "v", displayName: "キャベツ" },
  { id: "cucumber", itemCode: "34100", category: "v", displayName: "きゅうり" },
  { id: "tomato", itemCode: "34400", category: "v", displayName: "トマト" },
  { id: "daikon", itemCode: "30100", category: "v", displayName: "だいこん" },
  { id: "onion", itemCode: "36600", category: "v", displayName: "たまねぎ" },
  { id: "carrot", itemCode: "30300", category: "v", displayName: "にんじん" },
  { id: "potato", itemCode: "36200", category: "v", displayName: "ばれいしょ" },
  { id: "eggplant", itemCode: "34300", category: "v", displayName: "なす" },
  { id: "hakusai", itemCode: "31100", category: "v", displayName: "はくさい" },
  { id: "spinach", itemCode: "31800", category: "v", displayName: "ほうれんそう" },
  { id: "green-pepper", itemCode: "34500", category: "v", displayName: "ピーマン" },
  { id: "sweet-corn", itemCode: "34700", category: "v", displayName: "とうもろこし" },
  { id: "broccoli", itemCode: "33300", category: "v", displayName: "ブロッコリー" },
  { id: "negi", itemCode: "31900", category: "v", displayName: "ねぎ" },
  { id: "taro", itemCode: "36300", category: "v", displayName: "さといも" },
  { id: "strawberry", itemCode: "46000", category: "f", displayName: "いちご" },
  { id: "mikan-kanatsu", itemCode: "41260", category: "f", displayName: "みかん（甘なつみかん）" },
  { id: "mikan-house", itemCode: "40110", category: "f", displayName: "みかん（ハウスみかん）" },
  { id: "apple", itemCode: "42830", category: "f", displayName: "りんご（ふじ）" },
  { id: "peach", itemCode: "44000", category: "f", displayName: "もも" },
  { id: "grape-kyoho", itemCode: "45040", category: "f", displayName: "ぶどう（巨峰）" },
  { id: "grape-shine", itemCode: "45228", category: "f", displayName: "ぶどう（シャインマスカット）" },
  { id: "melon-arls", itemCode: "47100", category: "f", displayName: "メロン（アールス）" },
  { id: "melon-other", itemCode: "47990", category: "f", displayName: "メロン（その他・赤肉系など）" },
  { id: "watermelon", itemCode: "48300", category: "f", displayName: "スイカ" },
  { id: "biwa", itemCode: "43900", category: "f", displayName: "びわ" },
];

export const OTA_MARKET_CODE = "13310";
export const OTA_API_VEG = `https://api.cultivationdata.net/mcdata?mc=${OTA_MARKET_CODE}&cat=v&type=csv`;
export const OTA_API_FRUIT = `https://api.cultivationdata.net/mcdata?mc=${OTA_MARKET_CODE}&cat=f&type=csv`;
