import type { Metadata } from "next";
import { AnchorSection } from "@/components/AnchorSection";
import { InPageJumpButtons } from "@/components/InPageJumpButtons";
import { fruitSpotlights } from "@/lib/columns/fruit-spotlights";
import {
  fruitSeasonHints,
  seasonIntro,
  seasonalLanes,
  trendingProduce,
  vegSeasonHints,
} from "@/lib/columns/season-primer";

export const metadata: Metadata = {
  title: "旬ナビ",
  description: "野菜・果物の旬の捉え方と、売場で役立つ見分けのヒント。",
};

export default function SeasonColumnPage() {
  return (
    <article id="page-top" className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:max-w-4xl lg:px-8">
      <InPageJumpButtons tocAnchorId="season-toc" />

      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Season guide</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">{seasonIntro.title}</h1>
      </header>

      <div className="mt-8 space-y-5 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
        {seasonIntro.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <details
        open
        id="season-toc"
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-10 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white/95 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/95 sm:p-5"
      >
        <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
          ページ内ジャンプ
        </summary>
        <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs" aria-label="旬ナビの構成">
          <a href="#season-calendar" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            季節のレーン
          </a>
          <a href="#season-trending" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            話題の品目
          </a>
          <a href="#season-major-fruits" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            主要果物の見どころ
          </a>
          <a href="#season-veg" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            野菜のヒント
          </a>
          <a href="#season-fruit" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            果物のヒント
          </a>
        </nav>
      </details>

      <div className="relative z-10 mt-12 space-y-14">
        <AnchorSection id="season-calendar" className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">季節のレーン（例）</h2>
            <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {seasonalLanes.map((lane) => (
              <div
                key={lane.id}
                className={`rounded-2xl border border-emerald-900/10 bg-gradient-to-br p-5 shadow-sm dark:border-emerald-100/10 ${lane.accent}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">{lane.label}</h3>
                  <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-emerald-800 ring-1 ring-emerald-900/10 dark:bg-emerald-950/80 dark:text-emerald-200 dark:ring-emerald-100/15">
                    {lane.months}
                  </span>
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">野菜</p>
                <p className="mt-1 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/78">{lane.veg}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">果物</p>
                <p className="mt-1 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/78">{lane.fruit}</p>
              </div>
            ))}
          </div>
        </AnchorSection>

        <AnchorSection id="season-trending" className="space-y-5">
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">話題になりやすい品目</h2>
          <p className="text-sm text-emerald-800/80 dark:text-emerald-200/65">
            「話題」は売場の注目度の話であり、特定商品の推奨や効果を保証するものではありません。
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {trendingProduce.map((t) => (
              <div key={t.title} className="rounded-2xl border border-emerald-900/10 bg-white p-4 dark:border-emerald-100/10 dark:bg-emerald-950">
                <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-900 dark:bg-emerald-900/70 dark:text-emerald-100">
                  {t.tag}
                </span>
                <h3 className="mt-3 text-base font-semibold text-emerald-950 dark:text-emerald-50">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">{t.body}</p>
              </div>
            ))}
          </div>
        </AnchorSection>

        <AnchorSection id="season-major-fruits" className="space-y-5">
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">主要果物の見どころ</h2>
          <p className="text-sm leading-relaxed text-emerald-800/85 dark:text-emerald-200/75">
            トップページの一覧から飛べるよう、代表的な果物ごとにまとめています。品種の並べ方や旬の感じ方は、
            <a
              href="https://www.kudamononavi.com/"
              className="font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              果物ナビ
            </a>
            の季節・品種カテゴリとも読み比べられるようにしています（特定サイトの推奨ではありません）。旬のピークは産地・品種・年でずれます。
          </p>
          <div className="space-y-4">
            {fruitSpotlights.map((f) => (
              <AnchorSection
                key={f.slug}
                id={`fruit-${f.slug}`}
                className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm dark:border-emerald-100/10 dark:bg-emerald-950 sm:p-5"
              >
                <h3 className="text-base font-semibold text-emerald-950 dark:text-emerald-50">{f.name}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-amber-900/80 dark:text-amber-200/80">
                  売場の目安
                </p>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
                  {f.tips.map((t) => (
                    <li key={t} className="border-l-2 border-amber-500/35 pl-3">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
                  代表的な品種（例）
                </p>
                <ul className="mt-2 space-y-3 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/78">
                  {f.varieties.map((v) => (
                    <li key={v.name} className="border-l-2 border-emerald-500/35 pl-3">
                      <span className="font-semibold text-emerald-950 dark:text-emerald-50">{v.name}</span>
                      <span className="text-emerald-900/90 dark:text-emerald-100/80"> — {v.note}</span>
                    </li>
                  ))}
                </ul>
              </AnchorSection>
            ))}
          </div>
        </AnchorSection>

        <AnchorSection id="season-veg" className="space-y-8">
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">野菜のヒント</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {vegSeasonHints.map((block) => (
              <div key={block.name} className="rounded-2xl border border-emerald-900/10 bg-white p-5 dark:border-emerald-100/10 dark:bg-emerald-950">
                <h3 className="text-base font-semibold text-emerald-900 dark:text-emerald-100">{block.name}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
                  {block.tips.map((t) => (
                    <li key={t} className="border-l-2 border-emerald-500/30 pl-3">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnchorSection>

        <AnchorSection id="season-fruit" className="space-y-8">
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">果物のヒント</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {fruitSeasonHints.map((block) => (
              <div key={block.name} className="rounded-2xl border border-emerald-900/10 bg-white p-5 dark:border-emerald-100/10 dark:bg-emerald-950">
                <h3 className="text-base font-semibold text-emerald-900 dark:text-emerald-100">{block.name}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
                  {block.tips.map((t) => (
                    <li key={t} className="border-l-2 border-amber-500/35 pl-3">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnchorSection>
      </div>
    </article>
  );
}
