import { fruitSpotlights } from "@/lib/columns/fruit-spotlights";
import { profileBySlug } from "@/lib/columns/vegetable-profiles";

/**
 * 手動の週次メモが無いときのフォールバック用。
 * 日本の店頭で「この時期に出やすい」イメージの例（産地・品種・年で大きくずれます）。
 */
export type ProduceSlugRef = { slug: string; kind: "vegetable" | "fruit" };

export function hrefForSeasonalPick(ref: ProduceSlugRef): string {
  return ref.kind === "vegetable" ? `/column/vegetables#${ref.slug}` : `/column/season#fruit-${ref.slug}`;
}

export function labelForSeasonalPick(ref: ProduceSlugRef): string {
  if (ref.kind === "vegetable") return profileBySlug(ref.slug)?.name ?? ref.slug;
  return fruitSpotlights.find((x) => x.slug === ref.slug)?.name ?? ref.slug;
}

export type SeasonalPickBlock = {
  intro: string;
  picks: ProduceSlugRef[];
  /** ガイドに無い品名だけ並べる（リンクなし） */
  extraVegetableNames: string[];
  extraFruitNames: string[];
};

const MONTH_TABLE: Record<number, Omit<SeasonalPickBlock, "intro"> & { intro: string }> = {
  1: {
    intro: "寒い時期は葉物・根菜が中心になりやすく、柑橘やハウスいちごの比重も高めになりやすい時期の例です。",
    picks: [
      { slug: "spinach", kind: "vegetable" },
      { slug: "hakusai", kind: "vegetable" },
      { slug: "daikon", kind: "vegetable" },
      { slug: "mikan", kind: "fruit" },
      { slug: "strawberry", kind: "fruit" },
    ],
    extraVegetableNames: ["ねぎ"],
    extraFruitNames: [],
  },
  2: {
    intro: "葉物・根菜に加え、春に向けてキャベツやレタスの存在感が上がりやすい時期の例です。",
    picks: [
      { slug: "cabbage", kind: "vegetable" },
      { slug: "lettuce", kind: "vegetable" },
      { slug: "spinach", kind: "vegetable" },
      { slug: "strawberry", kind: "fruit" },
    ],
    extraVegetableNames: ["はくさい"],
    extraFruitNames: [],
  },
  3: {
    intro: "春野菜の芽が出はじめ、レタスや新玉ねぎ、スナップえんどうなどが並びやすくなる例です。",
    picks: [
      { slug: "lettuce", kind: "vegetable" },
      { slug: "cabbage", kind: "vegetable" },
      { slug: "onion", kind: "vegetable" },
      { slug: "strawberry", kind: "fruit" },
    ],
    extraVegetableNames: ["スナップえんどう"],
    extraFruitNames: [],
  },
  4: {
    intro: "春の代表的な山菜・新野菜が話題になりやすく、レタスやアスパラのシーズン感が強まりやすい例です。",
    picks: [
      { slug: "lettuce", kind: "vegetable" },
      { slug: "onion", kind: "vegetable" },
      { slug: "tomato", kind: "vegetable" },
      { slug: "strawberry", kind: "fruit" },
    ],
    extraVegetableNames: ["たけのこ", "アスパラガス"],
    extraFruitNames: [],
  },
  5: {
    intro: "新じゃがや初夏の野菜が増え、トマト・きゅうりの店頭が厚くなりはじめる例です。",
    picks: [
      { slug: "potato", kind: "vegetable" },
      { slug: "lettuce", kind: "vegetable" },
      { slug: "cucumber", kind: "vegetable" },
      { slug: "tomato", kind: "vegetable" },
      { slug: "melon", kind: "fruit" },
    ],
    extraVegetableNames: [],
    extraFruitNames: [],
  },
  6: {
    intro: "夏野菜の主力がそろい、なす・とうもろこし・おくらなどが並びやすい時期の例です。",
    picks: [
      { slug: "tomato", kind: "vegetable" },
      { slug: "cucumber", kind: "vegetable" },
      { slug: "eggplant", kind: "vegetable" },
      { slug: "sweet-corn", kind: "vegetable" },
      { slug: "peach", kind: "fruit" },
      { slug: "watermelon", kind: "fruit" },
    ],
    extraVegetableNames: ["おくら"],
    extraFruitNames: [],
  },
  7: {
    intro: "盛夏はきゅうり・なす・ピーマン、甘い果物は桃・スイカ・ぶどうが並びやすい例です。",
    picks: [
      { slug: "cucumber", kind: "vegetable" },
      { slug: "eggplant", kind: "vegetable" },
      { slug: "green-pepper", kind: "vegetable" },
      { slug: "sweet-corn", kind: "vegetable" },
      { slug: "peach", kind: "fruit" },
      { slug: "watermelon", kind: "fruit" },
      { slug: "grape", kind: "fruit" },
    ],
    extraVegetableNames: [],
    extraFruitNames: [],
  },
  8: {
    intro: "夏秋の野菜に加え、梨・ぶどう・イチジクなど、果物のバリエーションが広がりやすい例です。",
    picks: [
      { slug: "eggplant", kind: "vegetable" },
      { slug: "green-pepper", kind: "vegetable" },
      { slug: "sweet-corn", kind: "vegetable" },
      { slug: "potato", kind: "vegetable" },
      { slug: "pear", kind: "fruit" },
      { slug: "grape", kind: "fruit" },
      { slug: "watermelon", kind: "fruit" },
    ],
    extraVegetableNames: ["おくら"],
    extraFruitNames: ["イチジク"],
  },
  9: {
    intro: "秋の味覚（きのこ・かぼちゃ・さつまいも）が強まり、梨・ぶどう・柿がメインになりやすい例です。",
    picks: [
      { slug: "spinach", kind: "vegetable" },
      { slug: "potato", kind: "vegetable" },
      { slug: "pumpkin", kind: "vegetable" },
      { slug: "broccoli", kind: "vegetable" },
      { slug: "pear", kind: "fruit" },
      { slug: "grape", kind: "fruit" },
      { slug: "persimmon", kind: "fruit" },
    ],
    extraVegetableNames: ["きのこ類", "里芋"],
    extraFruitNames: [],
  },
  10: {
    intro: "温野菜・根菜が献立の中心になりやすく、りんご・みかん・柿などが並びやすい例です。",
    picks: [
      { slug: "spinach", kind: "vegetable" },
      { slug: "broccoli", kind: "vegetable" },
      { slug: "carrot", kind: "vegetable" },
      { slug: "pumpkin", kind: "vegetable" },
      { slug: "apple", kind: "fruit" },
      { slug: "mikan", kind: "fruit" },
    ],
    extraVegetableNames: ["きのこ類"],
    extraFruitNames: [],
  },
  11: {
    intro: "鍋向けの葉物・根菜が主役になりやすく、柑橘類・りんごの比重が高めになりやすい例です。",
    picks: [
      { slug: "spinach", kind: "vegetable" },
      { slug: "hakusai", kind: "vegetable" },
      { slug: "daikon", kind: "vegetable" },
      { slug: "negi", kind: "vegetable" },
      { slug: "mikan", kind: "fruit" },
      { slug: "apple", kind: "fruit" },
    ],
    extraVegetableNames: [],
    extraFruitNames: [],
  },
  12: {
    intro: "冬の定番野菜と鍋食材が中心になりやすく、みかん・りんご・いちご（ハウス）が並びやすい例です。",
    picks: [
      { slug: "hakusai", kind: "vegetable" },
      { slug: "daikon", kind: "vegetable" },
      { slug: "spinach", kind: "vegetable" },
      { slug: "negi", kind: "vegetable" },
      { slug: "mikan", kind: "fruit" },
      { slug: "apple", kind: "fruit" },
      { slug: "strawberry", kind: "fruit" },
    ],
    extraVegetableNames: [],
    extraFruitNames: [],
  },
};

export function seasonalPickBlockForJapanCalendar(referenceIso: string): SeasonalPickBlock {
  const month = Number(referenceIso.slice(5, 7)) || 1;
  const row = MONTH_TABLE[month] ?? MONTH_TABLE[1];
  return {
    intro: row.intro,
    picks: row.picks,
    extraVegetableNames: row.extraVegetableNames,
    extraFruitNames: row.extraFruitNames,
  };
}
