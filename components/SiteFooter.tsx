import Link from "next/link";
import { AffiliateRakutenBanner } from "@/components/AffiliateRakutenBanner";
import { affiliateDisclaimer } from "@/lib/legal-copy";

const publicSiteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://affiliate-comparison-site-alpha.vercel.app";

const gitOwner = process.env.VERCEL_GIT_REPO_OWNER ?? "takuya-watanabeaaa";
const gitSlug = process.env.VERCEL_GIT_REPO_SLUG ?? "affiliate-comparison-site";

export function SiteFooter() {
  const deploySha = process.env.VERCEL_GIT_COMMIT_SHA;
  const deployRef = process.env.VERCEL_GIT_COMMIT_REF;
  const commitUrl =
    deploySha != null && deploySha.length > 0
      ? `https://github.com/${gitOwner}/${gitSlug}/commit/${deploySha}`
      : null;

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
          <span className="mt-2 block text-[10px] font-normal text-amber-100/85">
            画面が古いままなら、このドメインが GitHub の最新デプロイとつながっていない可能性があります。Vercel の該当プロジェクト → Settings → Git
            でリポジトリ・Production ブランチを確認し、Deployments の最新が成功しているか見てください。
          </span>
        </p>
        {commitUrl != null ? (
          <p className="text-[10px] text-emerald-200/65">
            この表示のビルド元コミット:{" "}
            <a href={commitUrl} className="underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
              {(deploySha ?? "").slice(0, 7)}
            </a>
            {deployRef != null && deployRef.length > 0 ? `（${deployRef}）` : null}{" "}
            … GitHub の main 先頭と一致すれば連携できています。ずれている・表示が古いときは別プロジェクトの URL を見ている可能性があります。
          </p>
        ) : null}
        <p className="text-emerald-100/90">{affiliateDisclaimer}</p>
        <AffiliateRakutenBanner />
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
