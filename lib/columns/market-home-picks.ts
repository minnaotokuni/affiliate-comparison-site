/**
 * トップページ「直近の相場」カードに載せる「いま狙い目」の例。
 * slug は VeggieIcon / 野菜別ガイドの id と一致させてください。
 * 週ごとに差し替え推奨（相場記事とあわせて更新）。
 *
 * 価格はすべて「例・参考」。地域・店舗・規格で大きく異なります。
 */

export type MarketHomePick = {
  slug: string;
  name: string;
  /** バッジ表示（やや安め／並み／やや高め など） */
  trendLabel: string;
  /** 先週比・卸感触など（断定しない一文） */
  movementNote: string;
  /**
   * 小売のだいたいの帯（例）。実売場とずれる前提。
   * 食べ方・栄養の細かい話は野菜別ガイド側に寄せる。
   */
  retailHint: string;
};

export const marketHomePicks: MarketHomePick[] = [
  {
    slug: "lettuce",
    name: "レタス",
    trendLabel: "やや安め",
    movementNote: "卸では先週比で下げ気味の報告が出やすく、店頭の特売・値引きに載りやすい週になりがち",
    retailHint: "玉売りでおおよそ120〜190円前後が目立ちやすいイメージ（L〜LL・首都圏スーパーの例）",
  },
  {
    slug: "cabbage",
    name: "キャベツ",
    trendLabel: "並み〜やや安め",
    movementNote: "春〜初夏の切替で規格ばらつきはあるが、単位あたりでは比較しやすい時期",
    retailHint: "1玉でだいたい150〜280円程度に収まりやすい棚が多いイメージ（例）",
  },
  {
    slug: "cucumber",
    name: "きゅうり",
    trendLabel: "やや安め",
    movementNote: "量感のある入荷が続きやすく、バラ売り・袋売りとも値ごろ感が出やすい",
    retailHint: "本売りなら1本あたり30〜50円前後、3本袋なら100円前後が並びやすいイメージ（例）",
  },
];
