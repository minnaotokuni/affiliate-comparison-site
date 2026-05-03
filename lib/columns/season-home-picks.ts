/**
 * トップ「旬ナビ」カードの例（いま旬・これから旬が近い品目）。産地・年でずれます。
 * 月ごとに差し替え推奨。
 */

export type SeasonHomePickKind = "野菜" | "果物";

export type SeasonHomePick = {
  slug: string;
  name: string;
  kind: SeasonHomePickKind;
  /** 旬・味わいの目安（断定しすぎない） */
  deliciousNote: string;
};

export const seasonHomePicks: SeasonHomePick[] = [
  {
    slug: "asparagus",
    name: "アスパラガス",
    kind: "野菜",
    deliciousNote: "春は芯がいちばん柔らかく、食べごろを感じやすい時期の代表例です（茹で・グリルどちらでも）。",
  },
  {
    slug: "fruit-tomato",
    name: "フルーツトマト",
    kind: "野菜",
    deliciousNote: "4〜5月ごろは糖度が乗りやすく味が締まりやすい時期があります。同じ銘柄でも時期で印象が変わることがあります。",
  },
  {
    slug: "mini-tomato",
    name: "ミニトマト",
    kind: "野菜",
    deliciousNote: "春〜初夏は粒に甘みが乗りやすいことがあります。おつまみやサラダはもちろん、軽く焼いても。",
  },
];
