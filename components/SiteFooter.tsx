import Link from "next/link";
import { affiliateDisclaimer } from "@/lib/legal-copy";

const publicSiteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://affiliate-comparison-site-alpha.vercel.app";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-emerald-900/10 bg-emerald-950 text-emerald-50/90 dark:border-emerald-100/10">
      <div className="mx-auto w-full max-w-[min(100%,100rem)] space-y-4 px-4 py-12 text-xs leading-relaxed sm:px-6 lg:px-8">
        <p className="rounded-lg border border-emerald-400/20 bg-emerald-900/40 px-3 py-2 text-emerald-100/95">
          <span className="font-semibold text-emerald-50">公開ページ（共有はこのURL）</span>
          {": "}
          <Link href={publicSiteOrigin} className="break-all underline-offset-4 hover:underline">
            {publicSiteOrigin.replace(/^https:\/\//, "")}
          </Link>
          <span className="mt-1 block text-[10px] font-normal text-emerald-200/75">
            Vercel の「デプロイ用URL」（長い *.duckgain17-*.vercel.app など）は閲覧制限で開けないことがあります。
          </span>
        </p>
        <p className="text-emerald-100/90">{affiliateDisclaimer}</p>
        <p className="text-emerald-200/70">
          掲載内容は個人のメモと公開資料の整理であり、特定の効果・効能や投資判断を保証するものではありません。
        </p>
        <nav aria-label="主要ページ" className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/" className="underline-offset-4 hover:underline">
            ホーム
          </Link>
          <Link href="/#market-ota" className="underline-offset-4 hover:underline">
            大田の市況
          </Link>
          <Link href="/#market-shijou-sei" className="underline-offset-4 hover:underline">
            相場（都日報）
          </Link>
          <Link href="/column/market" className="underline-offset-4 hover:underline">
            コラム・相場
          </Link>
          <Link href="/about" className="underline-offset-4 hover:underline">
            サイトについて
          </Link>
        </nav>
        <p className="text-[10px] text-emerald-300/50">© {new Date().getFullYear()} 野菜・果物の旬と相場メモ</p>
      </div>
    </footer>
  );
}
