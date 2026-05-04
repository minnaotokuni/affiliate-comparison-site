import type { Metadata } from "next";
import { AnchorSection } from "@/components/AnchorSection";
import { InPageJumpButtons } from "@/components/InPageJumpButtons";
import { LegalNotice } from "@/components/LegalNotice";
import { AffiliateRakutenProductOnionIfMatch } from "@/components/AffiliateRakutenProductOnion";
import { AffiliateRakutenProduceStrip } from "@/components/AffiliateRakutenProduceStrip";
import { AffiliateRakutenProductCookDo } from "@/components/AffiliateRakutenProductCookDo";
import { MarketRecipeCard } from "@/components/MarketRecipeCard";
import { RelatedColumnLinks } from "@/components/RelatedColumnLinks";
import { SectionTitle } from "@/components/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { latestMarket, type SeasonalFruitEat, type ValueVegetableEat } from "@/lib/columns/market-weekly";
import { marketDataDisclaimer } from "@/lib/legal-copy";
import {
  buildArticleLd,
  buildBreadcrumbList,
  buildRecipeLd,
  parseTimeNote,
} from "@/lib/seo/structured-data";

const PAGE_PATH = "/column/market";
const PAGE_TITLE = "直近の相場からのおすすめ品";
const PAGE_DESCRIPTION =
  "野菜・果物の直近の相場をふまえた、いま買いたい旬のおすすめ品メモ。価格がおさえめになりやすい野菜は家庭向けレシピを品目ごとに複数、果物はそのまま食べる楽しみ方のヒントを掲載。週次で更新する参考情報であり、店頭の売値や効能を保証するものではありません。";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: "article",
    url: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("ja-JP", {
      dateStyle: "long",
      timeZone: "Asia/Tokyo",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function ValueVegetableBlock({ item }: { item: ValueVegetableEat }) {
  return (
    <article className="rounded-2xl border border-emerald-800/18 bg-gradient-to-b from-emerald-50/70 to-white p-5 dark:border-emerald-400/12 dark:from-emerald-950 dark:to-emerald-950/90 sm:p-6">
      <h3 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">{item.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/78">{item.whyNow}</p>
      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">食べ方のヒント</p>
        <ul className="mt-2 space-y-2 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/78">
          {item.eatIdeas.map((line) => (
            <li key={line} className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              {line}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
          レシピ（{item.recipes.length}つ）— 季節や献立に合わせてローテーションできます
        </p>
        {item.recipes.map((recipe, i) => (
          <MarketRecipeCard key={recipe.title} recipe={recipe} recipeIndex={i + 1} />
        ))}
      </div>
      <AffiliateRakutenProductOnionIfMatch vegetableName={item.name} />
      <AffiliateRakutenProduceStrip keyword={item.name} />
    </article>
  );
}

function SeasonalFruitBlock({ item }: { item: SeasonalFruitEat }) {
  return (
    <article className="rounded-2xl border border-amber-700/22 bg-gradient-to-b from-amber-50/55 to-white p-5 dark:border-amber-400/15 dark:from-emerald-950 dark:to-emerald-950/90 sm:p-6">
      <h3 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">{item.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/78">{item.seasonalNote}</p>
      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">そのまま食べる・楽しみ方</p>
        <ul className="mt-2 space-y-2 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/78">
          {item.eatIdeas.map((line) => (
            <li key={line} className="flex gap-2 border-l-2 border-amber-500/45 pl-3">
              {line}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-emerald-800/75 dark:text-emerald-200/65">
        果物は追熟や品種差が出やすいので、無理にレシピにせず、そのまま味わうのがいちばんおいしいことが多いです。
      </p>
      <AffiliateRakutenProduceStrip keyword={item.name} />
    </article>
  );
}

export default function MarketColumnPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "ホーム", url: "/" },
    { name: PAGE_TITLE, url: PAGE_PATH },
  ]);
  const articleLd = buildArticleLd({
    url: PAGE_PATH,
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: latestMarket.publishedOn,
    dateModified: latestMarket.publishedOn,
  });
  const recipeLds = latestMarket.valueVegetables.flatMap((veg) =>
    veg.recipes.map((recipe) => {
      const parsed = parseTimeNote(recipe.timeNote);
      return buildRecipeLd({
        url: PAGE_PATH,
        name: `${veg.name}: ${recipe.title}`,
        description: `${veg.name}を使う家庭向けレシピ（${recipe.timeNote}）。`,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        totalTime: parsed.totalTime,
        recipeYield: parsed.recipeYield,
        keywords: [veg.name, "野菜", "家庭料理"],
      });
    }),
  );

  return (
    <article id="page-top" className="relative mx-auto w-full max-w-[40rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />
      {recipeLds.map((data, index) => (
        <JsonLd key={`market-recipe-ld-${index}`} data={data} />
      ))}
      <InPageJumpButtons tocAnchorId="market-toc" />

      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-emerald-700/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200">
            Eat & recipe
          </span>
          <span className="text-xs text-emerald-800/70 dark:text-emerald-200/60">
            {latestMarket.deskSubtitle} · 掲載日 {formatDate(latestMarket.publishedOn)}
          </span>
        </div>
        <p className="mt-2 text-xs font-medium text-emerald-800/85 dark:text-emerald-200/75">{latestMarket.seasonBand}</p>
        {latestMarket.trendBlurb ? (
          <p className="mt-2 text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">{latestMarket.trendBlurb}</p>
        ) : null}
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">{latestMarket.title}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">{latestMarket.intro}</p>
      </header>

      <details
        open
        id="market-toc"
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-8 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white/95 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/95 sm:p-5"
      >
        <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
          このページの構成（ジャンプ）
        </summary>
        <nav aria-label="ページ内セクション" className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <a href="#market-value-recipes" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            野菜（レシピ複数）
          </a>
          <a href="#market-fruit-eat" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            果物（そのまま食べる）
          </a>
        </nav>
      </details>

      <div className="relative z-10 mt-10 space-y-14">
        <LegalNotice title="相場・健康・レシピについて">
          {`${marketDataDisclaimer.trim()}\n\n野菜のレシピは一般的な家庭調理の例です。果物はレシピではなく食べ方のヒントのみです。アレルギー食材がある場合は代替してください。`}
        </LegalNotice>

        <AnchorSection id="market-value-recipes" className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
            <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
              野菜 — 相場おさえめの例とレシピ
            </h2>
            <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
          </div>
          <SectionTitle
            eyebrow="Value vegetables"
            as="h3"
            title="今週とくに使い回しやすい野菜"
            hint={
              <>
                品目ごとにレシピを複数載せています。季節・トレンド・入荷でターゲット野菜は差し替えてください（データは{" "}
                <code className="rounded bg-emerald-100/80 px-1 py-0.5 text-[11px] dark:bg-emerald-900/80">market-weekly.ts</code>）。
              </>
            }
          />
          <div className="space-y-10">
            {latestMarket.valueVegetables.map((item) => (
              <ValueVegetableBlock key={item.name} item={item} />
            ))}
          </div>
          <AffiliateRakutenProductCookDo />
        </AnchorSection>

        <AnchorSection id="market-fruit-eat" className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
            <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
              果物 — そのまま食べるヒント
            </h2>
            <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
          </div>
          <SectionTitle
            eyebrow="Seasonal fruits"
            as="h3"
            title="果物はそのまま味わう"
            hint="レシピは載せず、香り・酸味・食べ頃の見極めなど「そのまま楽しむ」ためのメモです。品目は季節で入れ替えてください。"
          />
          <div className="space-y-10">
            {latestMarket.seasonalFruits.map((item) => (
              <SeasonalFruitBlock key={item.name} item={item} />
            ))}
          </div>
        </AnchorSection>

        <RelatedColumnLinks
          heading="関連コラム"
          hint="相場メモと一緒に見ると、買い物の判断材料が増えます。"
          items={[
            {
              href: "/column/season",
              label: "旬ナビ：いまおすすめ3品を深く",
              description: "暦ベースで月替わりの3品を深掘り。レシピも品目ごとに3つ。",
            },
            {
              href: "/column/vegetables",
              label: "野菜別ガイド",
              description: "品目別の栄養素・選び方・調理・糖度の目安を家庭目線でまとめています。",
            },
            {
              href: "/column/select",
              label: "選び方ガイド",
              description: "お店での見分け方（見た目・手触り・避けたいサイン）。",
            },
            {
              href: "/column/storage",
              label: "保存方法ガイド",
              description: "常温・冷蔵・冷凍の家庭での目安をまとめています。",
            },
          ]}
        />
      </div>
    </article>
  );
}
