import type { Metadata } from "next";
import { LegalNotice } from "@/components/LegalNotice";
import { RelatedColumnLinks } from "@/components/RelatedColumnLinks";
import { VegetableGuideBody } from "@/components/VegetableGuideBody";
import { VegetableGuideHero } from "@/components/VegetableGuideHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { vegetableProfiles } from "@/lib/columns/vegetable-profiles";
import { pharmaRelatedDisclaimer } from "@/lib/legal-copy";
import {
  buildArticleLd,
  buildBreadcrumbList,
  buildItemListLd,
} from "@/lib/seo/structured-data";

const PAGE_PATH = "/column/vegetables";
const PAGE_TITLE = "野菜別ガイド（指定野菜・定番品目）";
const PAGE_DESCRIPTION =
  "キャベツ・トマト・ブロッコリースプラウトなど、お店でよく見る野菜を品目別にチェック。栄養素と一般的な役わり、旬の組み合わせ、選び方・調理のヒント、糖度（°Brix）の目安まで、家庭目線でまとめた野菜別ガイドです。効能は約束しません。";

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

const PAGE_OUTLINE: ReadonlyArray<{ href: string; label: string; description: string }> = [
  {
    href: "#vegetable-toc",
    label: "もくじ・フィルタ",
    description: "全品目一覧と「指定野菜＋追加予定のみ」フィルタ。",
  },
  {
    href: "#page-top",
    label: "ページ冒頭の注意書き",
    description: "健康・効果に関する表現の方針と、糖度の目安について。",
  },
];

export default function VegetablesGuidePage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "ホーム", url: "/" },
    { name: "野菜別ガイド", url: PAGE_PATH },
  ]);
  const articleLd = buildArticleLd({
    url: PAGE_PATH,
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
  const itemListLd = buildItemListLd({
    url: PAGE_PATH,
    name: "野菜別ガイド",
    items: vegetableProfiles.map((profile) => ({
      name: profile.name,
      url: `${PAGE_PATH}#${profile.slug}`,
    })),
  });

  return (
    <article id="page-top" className="relative mx-auto w-full max-w-[40rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />
      <JsonLd data={itemListLd} />
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
          Vegetable profiles
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">
          野菜別ガイド
        </h1>
        <VegetableGuideHero />
        <div className="mt-6 space-y-4">
          <LegalNotice variant="warn" title="健康・効果に関する表現">
            {pharmaRelatedDisclaimer.trim()}
          </LegalNotice>
          <p className="text-xs leading-relaxed text-emerald-800/75 dark:text-emerald-200/65">
            糖度（°Brix）は測定機・部位・成熟度で変わります。ここに書いた範囲は文献などで参照されやすい「目安」であり、そのとき買った一箱の味を保証するものではありません。
          </p>
          <details className="rounded-xl border border-emerald-900/10 bg-white p-4 text-sm dark:border-emerald-100/10 dark:bg-emerald-950/80">
            <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
              このページの読み方（タップで開閉）
            </summary>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-emerald-800/85 dark:text-emerald-200/75">
              {PAGE_OUTLINE.map((row) => (
                <li key={row.href} className="flex flex-col gap-0.5">
                  <a
                    href={row.href}
                    className="font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
                  >
                    {row.label}
                  </a>
                  <span>{row.description}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </header>

      <VegetableGuideBody />

      <RelatedColumnLinks
        heading="関連コラム"
        hint="品目を選んだあと、旬・相場・栄養・選び方の周辺ガイドへ。"
        items={[
          {
            href: "/column/season",
            label: "旬ナビ",
            description: "いまおすすめ3品を深く（暦ベース）。月替わりで入れ替え。",
          },
          {
            href: "/column/market",
            label: "直近の相場からのおすすめ品",
            description: "今週の相場感をふまえた、買いやすい野菜のレシピと果物の食べ方ヒント。",
          },
          {
            href: "/column/nutrition",
            label: "栄養素のキホン",
            description: "ビタミン・ミネラルなどの一般的な役わりを家庭目線でまとめています。",
          },
          {
            href: "/column/select",
            label: "選び方ガイド",
            description: "お店での見分け方（見た目・手触り・避けたいサイン）。",
          },
        ]}
      />
    </article>
  );
}
