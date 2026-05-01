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
        <p>
          <Link href="/about" className="underline-offset-4 hover:underline">
            サイトについて・法的表示の考え方
          </Link>
        </p>
        <p className="text-[10px] text-emerald-300/50">© {new Date().getFullYear()} 旬と相場のメモ帳</p>
      </div>
    </footer>
  );
}
