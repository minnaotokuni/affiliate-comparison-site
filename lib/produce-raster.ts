/**
 * 参照シートを分割したラスタ（`/produce-art/*.webp` など）とサイト slug の対応。
 * 無い品目は undefined のまま SVG にフォールバックします。
 */

export const produceRasterBySlug: Partial<Record<string, string>> = {
  cabbage: "キャベツ.webp",
  cucumber: "キュウリ.webp",
  daikon: "大根.webp",
  onion: "玉ねぎ.webp",
  tomato: "トマト.webp",
  eggplant: "ナス.webp",
  carrot: "人参.webp",
  negi: "ねぎ.webp",
  nira: "ニラ.png",
  hakusai: "白菜.webp",
  potato: "じゃがいも.webp",
  "green-pepper": "ピーマン.webp",
  spinach: "ほうれん草.webp",
  lettuce: "レタス.webp",
  broccoli: "ブロッコリー.webp",
  asparagus: "アスパラガス.webp",
  "fruit-tomato": "トマト.webp",
  "mini-tomato": "トマト.webp",
  edamame: "枝豆.png",
  "sweet-corn": "とうもろこし.png",
  pumpkin: "南瓜.webp",

  strawberry: "イチゴ.webp",
  mikan: "温州ミカン.webp",
  apple: "リンゴ.webp",
  pear: "ナシ.webp",
  cherry: "さくらんぼ.webp",
  persimmon: "カキ.webp",
  melon: "メロン.webp",
  watermelon: "スイカ.webp",
  kiwi: "キウイフルーツ.webp",
  banana: "バナナ.webp",
  pineapple: "パイナップル.webp",
  biwa: "ビワ.webp",
  mango: "マンゴー.webp",
  blueberry: "ブルーベリー.webp",
  fig: "いちじく.webp",
  chestnut: "栗.webp",
};

export function produceRasterForSlug(slug: string): string | undefined {
  return produceRasterBySlug[slug];
}
