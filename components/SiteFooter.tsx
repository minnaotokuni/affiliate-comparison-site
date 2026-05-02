import Link from "next/link";
import { affiliateDisclaimer } from "@/lib/legal-copy";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-emerald-900/10 bg-emerald-950 text-emerald-50/90 dark:border-emerald-100/10">
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 text-xs leading-relaxed sm:px-6 lg:max-w-4xl lg:px-8">
        <p className="text-emerald-100/90">{affiliateDisclaimer}</p>
        <p className="text-emerald-200/70">
          掲載内容は個人の現場メモと公開資料の整理であり、特定の効果・効能や投資・仕入れ判断を保証するものではありません。
        </p>
        <nav aria-label="主要ページ" className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/" className="underline-offset-4 hover:underline">
            ホーム
          </Link>
          <Link href="/#market-shijou-sei" className="underline-offset-4 hover:underline">
            卸1kg（都日報）
          </Link>
          <Link href="/#market-ota" className="underline-offset-4 hover:underline">
            大田の市況
          </Link>
          <Link href="/column/market" className="underline-offset-4 hover:underline">
            コラム・相場
          </Link>
          <Link href="/about" className="underline-offset-4 hover:underline">
            サイトについて
          </Link>
        </nav>
        <p className="text-[10px] text-emerald-300/50">© {new Date().getFullYear()} 旬と相場のメモ帳</p>
      </div>
    </footer>
  );
}
