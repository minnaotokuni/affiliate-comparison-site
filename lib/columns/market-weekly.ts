/**
 * 週次で差し替えるデータです。実売場のメモをここに反映してください。
 * publishedOn は ISO 日付（表示用にフォーマットします）
 */
export type WeeklyMarketSnapshot = {
  publishedOn: string;
  title: string;
  intro: string;
  bullets: string[];
  fruitNotes: string[];
  closingNote: string;
};

export const latestMarket: WeeklyMarketSnapshot = {
  publishedOn: "2026-05-01",
  title: "第18週のずっとメモ（サンプル）",
  intro:
    "ここでは卸・小売の感触を「だいたいこんな雰囲気」としてメモしています。銘柄・等級・産地で変動するので、必ずその日の売場で確認してください。",
  bullets: [
    "葉物は气温の変化で一日ごとの動きが出やすい週。しんなりが気になるなら朝イチの棚をチェック。",
    "根菜は動きが落ち着きやすい一方、新じゃが・新玉ねぎは産地ローテで値幅が出やすい。",
    "春キャベツから初夏の品種へ切り替わる過渡期で、同一品でも硬さ・甘みの印象が変わりやすい。",
  ],
  fruitNotes: [
    "柑橘は品種交代期。酸味強め〜甘み強めで同じ品名でも印象が分かれやすいので、試食がある店は活用したい。",
    "メロン・スイカは選果サイズで単価が動く。家庭用なら小玉・分割パックのコスパを比較するとよい。",
  ],
  closingNote:
    "来週は仕入れルートと気温予報を見ながら、葉物と果物の「旬寄り」を優先してメモを更新する予定です。",
};
