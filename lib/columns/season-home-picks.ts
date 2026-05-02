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
    slug: "strawberry",
    name: "いちご",
    kind: "果物",
    deliciousNote: "春〜初夏は品種の入れ替わりで香りが楽しみやすい時期。甘酸っぱさのバランスがはっきりする頃です。",
  },
  {
    slug: "tomato",
    name: "トマト",
    kind: "野菜",
    deliciousNote: "初夏に向けて露地・準露地の比率が増えやすく、甘みと酸味のバランスがはっきりする時期。これから本番に近づきやすい頃です。",
  },
  {
    slug: "sweet-corn",
    name: "スイートコーン",
    kind: "野菜",
    deliciousNote: "早い年は店頭に並び始める頃。粒の甘みと茹でたての香りが楽しみやすい時期に近づきます。",
  },
];
