export const primaryNav = [
  { href: "/", label: "ホーム", description: "相場ダッシュボード・野菜インデックス" },
  { href: "/#market-shijou-sei", label: "卸1kg（都日報）", description: "各市場の円/kg と代表重量からの卸ベース換算（トップへ）" },
  { href: "/#market-ota", label: "大田の市況", description: "APIの高・中・安と推移グラフ（トップへ）" },
  { href: "/column/market", label: "直近の相場", description: "今週のだいたいの動き・買い時の目安" },
  { href: "/column/season", label: "旬ナビ", description: "野菜・果物の旬とおすすめの楽しみ方" },
  {
    href: "/column/vegetables",
    label: "野菜別ガイド",
    description:
      "イラスト付きで品目別チェック。栄養素と一般的な役わり・旬の組み合わせ・調理・選び方・糖度はページ内で詳しく",
  },
  { href: "/about", label: "サイトについて", description: "運営方針・アフィリエイトについて" },
] as const;
