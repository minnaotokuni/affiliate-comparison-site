/**
 * トップページ「直近の相場からのおすすめ品」カードに載せる野菜の例。
 * slug は VeggieIcon / 野菜別ガイドの id と一致させてください。
 * 週ごとに差し替え推奨（相場記事とあわせて更新）。
 *
 * 価格はすべて「例・参考」。地域・店・売り方で大きく異なります。
 */

export type MarketHomePick = {
  slug: string;
  name: string;
  /** バッジ表示（やや安め／並み／やや高め など） */
  trendLabel: string;
  /** 先週比・相場の感触など（断定しない一文） */
  movementNote: string;
  /**
   * 店で見かけるだいたいの価格帯（例）。地域や店とずれる前提。
   * 食べ方・栄養の細かい話は野菜別ガイド側に寄せる。
   */
  retailHint: string;
};

export const marketHomePicks: MarketHomePick[] = [
  {
    slug: "broccoli",
    name: "ブロッコリー",
    trendLabel: "おすすめ",
    movementNote: "相場メモでも「いま押さえやすい野菜」に挙げやすい。束・パック単位で値ごろ感が出やすい週になりがち",
    retailHint: "1株・1パックで100〜220円前後に収まることも多いイメージ（例）",
  },
  {
    slug: "nira",
    name: "ニラ",
    trendLabel: "おすすめ",
    movementNote: "少量で香りが立つので使い切りやすく、卵料理や炒め物との相性がよい",
    retailHint: "1把で50〜120円前後が目安になりやすいイメージ（例）",
  },
  {
    slug: "onion",
    name: "新玉ねぎ",
    trendLabel: "おすすめ",
    movementNote: "春〜初夏は入荷が続きやすく、サラダや浅漬け向きの甘みのタイプを選びやすい時期",
    retailHint: "3本100円前後〜、束売りで200円前後など見かけやすいイメージ（例）",
  },
];
