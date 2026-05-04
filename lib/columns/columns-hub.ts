/**
 * コラム一覧ハブ `/columns` のデータ。
 * - 既存コラム（market / season / vegetables / storage / calendar / select / nutrition）と
 *   新規ページ（cooking-tips / glossary）をすべてカード化するための定義です。
 * - `category` で「メイン」「ガイド」「参考」の 3 グループに振り分けます。
 */

export type ColumnsHubCategory = "main" | "guide" | "reference";

export type ColumnsHubItem = {
  /** 内部リンクパス（必ず "/" から） */
  href: string;
  /** カードに表示する短い名前 */
  label: string;
  /** カードの説明文（120 文字以内目安） */
  description: string;
  /** カテゴリ */
  category: ColumnsHubCategory;
  /** 装飾用の絵文字（任意。視覚アクセントとしてのみ使用） */
  emoji?: string;
  /** カードの中で 3 つほど並べる「読みどころ」 */
  highlights: string[];
};

export const COLUMNS_HUB_CATEGORY_LABEL: Record<ColumnsHubCategory, string> = {
  main: "メイン",
  guide: "ガイド",
  reference: "参考",
};

export const COLUMNS_HUB_CATEGORY_DESCRIPTION: Record<ColumnsHubCategory, string> = {
  main:
    "サイトの中心になっているコラム。直近の相場と、季節のおすすめ品をふだんの献立につなげる役わりです。",
  guide:
    "野菜・果物を選ぶ・保存する・料理するときの実用ガイド。具体的な品目を引きながら買い物や台所で使えます。",
  reference:
    "用語・カレンダー・栄養素など、横断的に参照する補助コンテンツ。ほかのページと組み合わせて読むと理解が深まります。",
};

export const COLUMNS_HUB_CATEGORY_ORDER: readonly ColumnsHubCategory[] = [
  "main",
  "guide",
  "reference",
];

export const columnsHubItems: readonly ColumnsHubItem[] = [
  {
    href: "/column/market",
    label: "直近の相場からのおすすめ品",
    description:
      "市場の値動きと旬を踏まえて、いま手に取りやすい野菜・果物を週次で更新するメインコラム。野菜は家庭レシピを複数、果物はそのまま食べるヒントに寄せています。",
    category: "main",
    emoji: "🛒",
    highlights: [
      "野菜は品目ごとにレシピを 2〜3 例",
      "果物は皮ごと・冷やすなどの食べ方ヒント",
      "週次の差し替えで季節とトレンドを反映",
    ],
  },
  {
    href: "/column/season",
    label: "旬ナビ",
    description:
      "暦と店頭の並びをもとに「いま深掘りしたい 3 品」をピックし、選び方・保存・食べ方を 1 ページで紹介。ほかの旬の果物は短いダイジェストへジャンプできます。",
    category: "main",
    emoji: "🍂",
    highlights: [
      "今月の重点 3 品を写真感覚で深掘り",
      "選び方・保存・調理を 1 ページに集約",
      "ほかの旬果物はダイジェストでつまみ食い",
    ],
  },
  {
    href: "/column/vegetables",
    label: "野菜別ガイド",
    description:
      "イラスト付きで品目別にチェックできる総合ガイド。栄養素や役わり、旬の組み合わせ、調理・選び方・糖度などを 1 ページにまとめています。",
    category: "guide",
    emoji: "🥬",
    highlights: [
      "イラストで品目を素早く識別",
      "栄養素・調理・選び方をまとめて確認",
      "旬の組み合わせや糖度の目安も併記",
    ],
  },
  {
    href: "/column/select",
    label: "選び方ガイド",
    description:
      "売場で迷ったときの実用チェックポイントを、品目別に「見た目」「手触り・重さ」「避けたいサイン」の 3 軸で整理した買い物ガイドです。",
    category: "guide",
    emoji: "👀",
    highlights: [
      "見た目・手触り・避けたいサインの 3 軸",
      "野菜と果物に分けて並べてチェック",
      "スーパー・八百屋・直売所のどれでも使える",
    ],
  },
  {
    href: "/column/storage",
    label: "保存方法ガイド",
    description:
      "葉物・根菜・果菜・果物の 4 区分で、常温・冷蔵・冷凍それぞれの目安と日数、家庭での実用ヒントをまとめた保存ガイドです。",
    category: "guide",
    emoji: "🧊",
    highlights: [
      "常温・冷蔵・冷凍の 3 段で目安を整理",
      "葉物／根菜／果菜／果物のカテゴリ別",
      "家庭で覚えておくと便利なポイント付き",
    ],
  },
  {
    href: "/column/cooking-tips",
    label: "家庭の調理ヒント",
    description:
      "下処理・火入れ・水分管理・代替食材など、レシピのあいだを埋める小さなコツを 8 セクションに分けてまとめました。買い物と保存ガイドと併せて読むと家事が軽くなります。",
    category: "guide",
    emoji: "🍳",
    highlights: [
      "下処理・火入れ・冷凍など 8 セクション",
      "「ひとつまみ」など曖昧な指示の目安",
      "代替食材のおすすめ組み合わせも紹介",
    ],
  },
  {
    href: "/column/calendar",
    label: "年間 旬カレンダー",
    description:
      "野菜・果物の旬を 1 月〜 12 月で一覧にした家庭向けカレンダー。いまの月を強調表示し、買い物・献立を考えるときの早見として使えます。",
    category: "reference",
    emoji: "📅",
    highlights: [
      "1 月〜 12 月の旬を 1 ページで早見",
      "「いまの月」をハイライトで強調",
      "旬ナビの深掘りページへジャンプできる",
    ],
  },
  {
    href: "/column/nutrition",
    label: "栄養素のキホン",
    description:
      "食物繊維・ビタミン・ミネラル・カロテノイド・ポリフェノールなど、野菜と果物に多い成分を家庭目線で整理。効能の保証ではなく、組み合わせの目安として読めます。",
    category: "reference",
    emoji: "🥗",
    highlights: [
      "代表的な栄養素・成分を 12 項目に整理",
      "多く含まれやすい食品例も併記",
      "持病・服薬中の方向けの一般注意あり",
    ],
  },
  {
    href: "/glossary",
    label: "野菜・果物の語句集",
    description:
      "追熟・糖度・リコピン・ポリフェノール・卸売市場など、売場や記事で耳にしやすい言葉を 30 余りまとめた用語集。気になる単語からほかのページへつなげます。",
    category: "reference",
    emoji: "📖",
    highlights: [
      "果物・野菜・栄養・調理・市場の 5 区分",
      "やさしい解説と関連語のリンク",
      "効能を断定しない読み物としての設計",
    ],
  },
];

/** カテゴリ別にグルーピングして返す（並びは COLUMNS_HUB_CATEGORY_ORDER）。 */
export function columnsHubByCategory(): readonly {
  category: ColumnsHubCategory;
  items: readonly ColumnsHubItem[];
}[] {
  return COLUMNS_HUB_CATEGORY_ORDER.map((category) => ({
    category,
    items: columnsHubItems.filter((item) => item.category === category),
  }));
}
