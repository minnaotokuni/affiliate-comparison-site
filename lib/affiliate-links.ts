/**
 * A8 などから発行したリンクをここに集約します。
 * 例: { label: "○○公式", href: process.env.NEXT_PUBLIC_A8_URL_XXX ?? "#", sponsored: true }
 */
export type AffiliateLink = {
  id: string;
  label: string;
  href: string;
  context: string;
};

export const affiliateLinks: AffiliateLink[] = [
  // A8 審査後に追加してください（href が "#" のまま公開しないこと）
];
