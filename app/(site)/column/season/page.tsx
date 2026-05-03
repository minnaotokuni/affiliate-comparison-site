import type { Metadata } from "next";
import Link from "next/link";

/** 日本時間の「いまの月」で3品を選ぶため、ビルド時固定にしない */
export const dynamic = "force-dynamic";
import { MarketRecipeCard } from "@/components/MarketRecipeCard";
import { VeggieIcon } from "@/components/VeggieIcon";
import { fruitSpotlights } from "@/lib/columns/fruit-spotlights";
import {
  seasonDeepPicksForMonth,
  seasonPickAnchorId,
  vegetablesGuideAnchorSlug,
} from "@/lib/columns/season-deep-picks";
import { isoDateInJapan } from "@/lib/jst-date";

export const metadata: Metadata = {
  title: "旬ナビ",
  description:
    "いまおすすめの野菜・果物を3品だけ深く。選び方・調理のヒントに加え、品目ごとにレシピを3つずつ掲載しています。",
};

export default function SeasonColumnPage() {
  const refIso = isoDateInJapan();
  const month = Number(refIso.slice(5, 7)) || 1;
  const deepPicks = seasonDeepPicksForMonth(month);
  const featuredFruitSlugs = new Set(deepPicks.filter((p) => p.kind === "fruit").map((p) => p.slug));
  const appendixFruits = fruitSpotlights.filter((f) => !featuredFruitSlugs.has(f.slug));

  return (
    <article
      id="page-top"
      className="relative mx-auto w-full max-w-[40rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Season guide</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-3xl">
          旬ナビ：いまおすすめ3品を深く
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-800/88 dark:text-emerald-200/78">
          全シーズンの一覧ではなく、<strong className="font-semibold text-emerald-950 dark:text-emerald-50">この時期に押さえたい3品</strong>
          だけを長めにまとめています（日本時間の暦・
          <time dateTime={refIso} className="tabular-nums">
            {refIso}
          </time>
          基準）。産地・店・年で前後します。
        </p>
        <p className="mt-3 text-sm leading-relaxed text-emerald-800/88 dark:text-emerald-200/78">
          野菜の品目別の栄養・糖度などは「
          <Link href="/column/vegetables" className="font-medium underline-offset-2 hover:underline">
            野菜別ガイド
          </Link>
          」のほうが詳しいです。
        </p>
        <p className="mt-3 text-xs leading-relaxed text-emerald-800/78 dark:text-emerald-200/68">
          各品目の下に、献立のローテーション用のレシピを3つずつ載せています（一般的な家庭調理の例です）。アレルギーがある食材は代替してください。
        </p>
      </header>

      <nav
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-8 scroll-mt-[var(--site-scroll-padding)] rounded-xl border border-emerald-900/10 bg-white/95 p-4 text-sm backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/95"
        aria-label="今月の3品へジャンプ"
      >
        <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-200">ページ内ジャンプ</p>
        <ul className="mt-2 flex flex-col gap-2 text-emerald-900 dark:text-emerald-50">
          {deepPicks.map((p) => (
            <li key={p.slug}>
              <a href={`#${seasonPickAnchorId(p)}`} className="underline-offset-2 hover:underline">
                {p.name}
              </a>
            </li>
          ))}
          <li>
            <a href="#season-fruit-index" className="text-emerald-800/85 underline-offset-2 hover:underline dark:text-emerald-200/75">
              ほかの果物（短いダイジェスト）
            </a>
          </li>
        </ul>
      </nav>

      <div className="mt-12 space-y-16">
        {deepPicks.map((pick) => {
          const vegGuideSlug = vegetablesGuideAnchorSlug(pick);
          return (
          <section
            key={pick.slug}
            id={seasonPickAnchorId(pick)}
            className="scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm dark:border-emerald-100/10 dark:bg-emerald-950 sm:p-6"
          >
            <div className="flex flex-wrap items-start gap-3 border-b border-emerald-900/8 pb-4 dark:border-emerald-100/10">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/40">
                <VeggieIcon slug={pick.slug} size={40} title="" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  {pick.kind === "fruit" ? "果物" : "野菜"}
                </p>
                <h2 className="text-xl font-semibold text-emerald-950 dark:text-emerald-50">{pick.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/82">{pick.hook}</p>
                {vegGuideSlug ? (
                  <Link
                    href={`/column/vegetables#${vegGuideSlug}`}
                    className="mt-3 inline-block text-xs font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-300"
                  >
                    野菜別ガイドの同一品目へ →
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="mt-6 space-y-8">
              {pick.sections.map((sec) => (
                <div key={sec.heading}>
                  <h3 className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">{sec.heading}</h3>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/80">
                    {sec.paragraphs.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {pick.recipes && pick.recipes.length > 0 ? (
              <div className="mt-8 space-y-4 border-t border-emerald-900/10 pt-8 dark:border-emerald-100/10">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  レシピ（{pick.recipes.length}つ）
                </p>
                <p className="text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">
                  いま取り上げている品目だけの例です。下の「ほかの果物」一覧にはレシピは載せていません。
                </p>
                <div className="space-y-4">
                  {pick.recipes.map((recipe, i) => (
                    <MarketRecipeCard key={`${pick.slug}-${recipe.title}`} recipe={recipe} recipeIndex={i + 1} />
                  ))}
                </div>
              </div>
            ) : null}
          </section>
          );
        })}
      </div>

      <section
        id="season-fruit-index"
        className="scroll-mt-[var(--site-scroll-padding)] mt-20 border-t border-emerald-900/10 pt-12 dark:border-emerald-100/10"
      >
        <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">ほかの果物（短いダイジェスト）</h2>
        <p className="mt-2 text-sm leading-relaxed text-emerald-800/85 dark:text-emerald-200/75">
          トップページなどからリンクされる見出し用です。深掘りは上の「今月の3品」と「
          <a
            href="https://www.kudamononavi.com/"
            className="font-medium underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            果物ナビ
          </a>
          」も参照してください。
        </p>
        <ul className="mt-8 space-y-6">
          {appendixFruits.map((f) => (
            <li
              key={f.slug}
              id={`fruit-${f.slug}`}
              className="scroll-mt-[var(--site-scroll-padding)] rounded-xl border border-emerald-900/10 bg-white p-4 dark:border-emerald-100/10 dark:bg-emerald-950"
            >
              <div className="flex gap-3">
                <VeggieIcon slug={f.slug} size={36} title="" />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-emerald-950 dark:text-emerald-50">{f.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">{f.tips[0]}</p>
                  {f.tips[1] ? (
                    <p className="mt-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">{f.tips[1]}</p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
