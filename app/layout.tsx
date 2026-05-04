import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

/** 共有・OG用の本番オリジン（デプロイごとの *.duckgain17-*.vercel.app は認証で開けないことがあります） */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://affiliate-comparison-site-alpha.vercel.app";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "野菜・果物の旬と相場メモ | 買い物のヒント — ホームページ初心者です。暖かく見守ってください",
    template: "%s | 野菜・果物の旬と相場メモ",
  },
  description:
    "野菜・果物の旬と直近の相場メモを週次で整理。市況の感触・お店での選び方・保存のコツをまとめ、買い物の判断材料にしてもらうサイトです。",
  keywords: [
    "野菜",
    "果物",
    "旬",
    "相場",
    "市況",
    "選び方",
    "保存方法",
    "買い物",
    "大田市場",
    "東京都中央卸売市場",
  ],
  applicationName: "野菜・果物の旬と相場メモ",
  authors: [{ name: "野菜・果物の旬と相場メモ" }],
  creator: "野菜・果物の旬と相場メモ",
  publisher: "野菜・果物の旬と相場メモ",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "野菜・果物の旬と相場メモ",
    title:
      "野菜・果物の旬と相場メモ | 買い物のヒント",
    description:
      "野菜・果物の旬と直近の相場メモを週次で整理。市況の感触・お店での選び方・保存のコツをまとめています。",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "野菜・果物の旬と相場メモ | 買い物のヒント",
    description:
      "野菜・果物の旬と直近の相場メモを週次で整理。市況の感触・お店での選び方・保存のコツをまとめています。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "lifestyle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
