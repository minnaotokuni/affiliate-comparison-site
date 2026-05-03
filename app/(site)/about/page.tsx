import type { Metadata } from "next";
import Link from "next/link";
import { LegalNotice } from "@/components/LegalNotice";
import { affiliateDisclaimer, marketDataDisclaimer, pharmaRelatedDisclaimer } from "@/lib/legal-copy";

export const metadata: Metadata = {
  title: "サイトについて",
  description: "運営方針、薬事・景表への配慮、アフィリエイト（A8ネット予定）について。",
};

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-[40rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">About</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">サイトについて</h1>
      </header>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
        <section>
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">運営のスタンス</h2>
          <p className="mt-4">
            Web の作り方も公開の仕方も、いまさらながら手探りです。拙いところも出てくると思いますが、徐々に形にしていきますので、見守っていただけるとうれしいです。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">薬事法・健康増進法・景表法への配慮</h2>
          <div className="mt-4 space-y-4">
            <LegalNotice title="健康関連の表現">{pharmaRelatedDisclaimer.trim()}</LegalNotice>
            <LegalNotice title="相場・価格">{marketDataDisclaimer.trim()}</LegalNotice>
            <p className="text-xs text-emerald-800/70 dark:text-emerald-200/60">
              上記は運営上の方針であり、個別の表現が法的に適切かどうかの判断（法的助言）はできません。不安な文言は専門家に相談してください。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">アフィリエイト（A8ネットを想定）</h2>
          <p className="mt-4">{affiliateDisclaimer}</p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>成果リンクの近くに PR 表示を置き、読者が誤認しないようにします。</li>
            <li>リンクは記事の文脈に沿ったものだけを選び、「売れ筋だから」だけの紹介は避けます。</li>
            <li>A8 のコード発行後は `lib/affiliate-links.ts` のような配置で一元管理し、更新しやすくします。</li>
          </ul>
        </section>

        <p>
          <Link href="/" className="font-medium text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-200">
            ← トップへ
          </Link>
        </p>
      </div>
    </article>
  );
}
