export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  highlights: string[];
  priceDisplay: string;
  affiliateUrl: string;
  badge?: string;
};

export const products: Product[] = [
  {
    slug: "cloud-note-pro",
    name: "CloudNote Pro",
    category: "クラウドノート",
    tagline: "検索と同期に強い、仕事用メモの定番",
    summary:
      "タグ・全文検索・Webクリップが一体になったクラウドノート。チーム共有から個人のナレッジ管理まで幅広くカバーします。",
    highlights: [
      "オフライン編集と高速同期",
      "テンプレートとチェックリスト対応",
      "主要OS・ブラウザで利用可能",
    ],
    priceDisplay: "無料〜プレミアム月額プランあり",
    affiliateUrl: "https://example.com/affiliate/cloud-note-pro",
    badge: "バランス型",
  },
  {
    slug: "focus-timer-air",
    name: "Focus Timer Air",
    category: "生産性アプリ",
    tagline: "集中と休憩をリズムよく、ミニマルに管理",
    summary:
      "ポモドーロをベースにしたタイマーアプリ。通知・統計・デバイス連携までシンプルにまとまっており、初心者にも扱いやすいです。",
    highlights: [
      "ワンタップでセッション開始",
      "週次レポートで習慣を可視化",
      "バッテリーに優しいバックグラウ動作",
    ],
    priceDisplay: "基本無料（一部機能は課金）",
    affiliateUrl: "https://example.com/affiliate/focus-timer-air",
    badge: "コスパ",
  },
  {
    slug: "secure-vault-x",
    name: "Secure Vault X",
    category: "パスワード管理",
    tagline: "ゼロ知識設計で、ログインを一括整理",
    summary:
      "ブラウザ拡張とモバイルアプリでパスワード・2FAを一元管理。監査ログと共有フォルダにも対応した、安全性重視の選択肢です。",
    highlights: [
      "エンドツーエンド暗号化",
      "漏洩検知とパスワード健診",
      "家族・チーム向けプランあり",
    ],
    priceDisplay: "年額プランがお得",
    affiliateUrl: "https://example.com/affiliate/secure-vault-x",
    badge: "セキュリティ",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
