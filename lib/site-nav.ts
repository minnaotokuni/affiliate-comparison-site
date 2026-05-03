/** ホームのスクロール順（相場おすすめ → 旬ナビ → 大田 → 都日報 → …）に合わせた並び */
export const primaryNav = [
  { href: "/", label: "ホーム", description: "直近の相場おすすめ・旬ナビ・市況ダッシュボード" },
  {
    href: "/column/market",
    label: "直近の相場からのおすすめ品",
    description: "サイトのメイン。野菜レシピ複数・果物はそのまま食べるヒント（季節・トレンドで更新）",
  },
  { href: "/column/season", label: "旬ナビ", description: "いまおすすめ3品を深く（暦ベース）。ほかの果物は短いダイジェストへジャンプ" },
  { href: "/#market-ota", label: "大田の市況", description: "APIの高・中・安と推移グラフ（トップへ）" },
  { href: "/#market-shijou-sei", label: "相場（都日報）", description: "1個・1本あたりの目安（卸ベース）と円/kg・100g換算。東京都の市場日報ベース（トップへ）" },
  {
    href: "/column/vegetables",
    label: "野菜別ガイド",
    description:
      "イラスト付きで品目別チェック。栄養素と一般的な役わり・旬の組み合わせ・調理・選び方・糖度はページ内で詳しく",
  },
  { href: "/about", label: "サイトについて", description: "運営方針・アフィリエイトについて" },
] as const;
