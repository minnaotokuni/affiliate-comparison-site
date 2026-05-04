import type { Metadata } from "next";
import Link from "next/link";
import {
  cookingTipSections,
  type CookingTipSection,
} from "@/lib/columns/cooking-tips";

export const metadata: Metadata = {
  title: "家庭の調理ヒント（下処理・火入れ・保存・代替食材）",
  description:
    "下処理・塩のひとつまみ・火入れ・におい抜き・冷凍前のひと手間・水分管理・皮の活用・代替食材の考え方を 8 セクションでまとめた、毎日の野菜と果物のための家庭料理メモです。",
  alternates: { canonical: "/column/cooking-tips" },
  openGraph: {
    type: "article",
    title: "家庭の調理ヒント（下処理・火入れ・保存・代替食材）",
    description:
      "下処理・火入れ・水分管理・冷凍・代替食材まで、家庭料理のコツを 8 セクションでまとめた実用メモ。",
    url: "/column/cooking-tips",
  },
  twitter: {
    card: "summary_large_image",
    title: "家庭の調理ヒント（下処理・火入れ・保存・代替食材）",
    description:
      "野菜・果物の家庭料理の小さなコツを 8 セクションでまとめました。",
  },
};

function TipSectionCard({ section, index }: { section: CookingTipSection; index: number }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm dark:border-emerald-100/10 dark:bg-emerald-950 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline gap-3 border-b border-emerald-900/8 pb-3 dark:border-emerald-100/10">
        <span
          aria-hidden
          className="rounded-full border border-emerald-900/15 bg-emerald-50/70 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-emerald-800 dark:border-emerald-100/15 dark:bg-emerald-900/45 dark:text-emerald-200"
        >
          STEP {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">
          {section.title}
        </h2>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/80">
        {section.intro}
      </p>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/80">
        {section.tips.map((tip) => (
          <li
            key={tip}
            className="flex gap-2 border-l-2 border-emerald-500/35 pl-3"
          >
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function CookingTipsPage() {
  const totalTips = cookingTipSections.reduce(
    (sum, section) => sum + section.tips.length,
    0,
  );

  return (
    <article
      id="page-top"
      className="relative mx-auto w-full max-w-[40rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
          Cooking tips
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-3xl">
          家庭の調理ヒント
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-800/88 dark:text-emerald-200/78">
          レシピのあいだを埋める「小さなコツ」をまとめた家庭料理のメモです。下処理・火入れ・水分管理・冷凍前のひと手間・代替食材など、{cookingTipSections.length} セクション・計 {totalTips} 個のヒントを収録しています。
        </p>
        <p className="mt-3 text-xs leading-relaxed text-emerald-800/78 dark:text-emerald-200/68">
          目次から気になるセクションへジャンプできます。買い物のコツは
          <Link
            href="/column/select"
            className="ml-1 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
          >
            選び方ガイド
          </Link>
          、保存のコツは
          <Link
            href="/column/storage"
            className="ml-1 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
          >
            保存方法ガイド
          </Link>
          にまとめています。
        </p>
      </header>

      <details
        open
        id="cooking-toc"
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-8 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white/95 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/95 sm:p-5"
      >
        <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
          このページの構成（ジャンプ）
        </summary>
        <nav
          aria-label="調理ヒントのセクション"
          className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs"
        >
          {cookingTipSections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-emerald-900/15 px-2 py-1 text-emerald-800 underline-offset-2 hover:underline dark:border-emerald-100/15 dark:text-emerald-200"
            >
              <span aria-hidden className="mr-1 tabular-nums text-emerald-700 dark:text-emerald-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </a>
          ))}
        </nav>
      </details>

      <div className="relative z-10 mt-10 space-y-12">
        <aside
          aria-label="調理ヒントの取り扱いについて"
          className="rounded-2xl border border-emerald-700/25 bg-emerald-50/60 p-5 text-sm leading-relaxed text-emerald-900/88 dark:border-emerald-300/25 dark:bg-emerald-900/35 dark:text-emerald-100/85 sm:p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            このページの使い方
          </p>
          <p className="mt-2">
            掲載しているコツは、家庭で参考にしやすい一般的な目安です。火力や鍋の厚み、食材の状態によって仕上がりは前後します。レシピの代わりではなく、「いつもの作り方を少し整えるためのメモ」として使ってください。
          </p>
          <p className="mt-2">
            アレルギー・持病・嚥下の状態など、個別の事情がある場合は、本ページの内容より医療・栄養の専門家のアドバイスを優先してください。
          </p>
        </aside>

        <section className="rounded-2xl border border-emerald-900/10 bg-emerald-50/40 p-5 text-sm leading-relaxed text-emerald-900/85 dark:border-emerald-100/10 dark:bg-emerald-950/40 dark:text-emerald-100/78 sm:p-6">
          <h2 className="text-base font-semibold text-emerald-950 dark:text-emerald-50">
            このページのまとめ
          </h2>
          <ul className="mt-3 space-y-2">
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              下処理・火入れ・水分管理は「順番」と「タイミング」で結果が大きく変わります。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              冷凍は「使い切れない量を買ってしまったとき」の保険として、味付けと水分を整えてから保存するのがコツです。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              皮や代替食材を上手に扱うと、料理の幅と無駄の少なさが両立できます。
            </li>
          </ul>
        </section>

        <div className="space-y-8">
          {cookingTipSections.map((section, index) => (
            <TipSectionCard key={section.id} section={section} index={index} />
          ))}
        </div>

        <aside
          aria-label="関連ページ"
          className="rounded-2xl border border-emerald-900/10 bg-emerald-50/40 p-5 text-sm leading-relaxed text-emerald-900/85 dark:border-emerald-100/10 dark:bg-emerald-950/40 dark:text-emerald-100/78 sm:p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            あわせて読みたい
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              <Link
                href="/column/select"
                className="font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              >
                選び方ガイド
              </Link>
              ：売場での見分け方をまとめた品目別チェック。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              <Link
                href="/column/storage"
                className="font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              >
                保存方法ガイド
              </Link>
              ：常温・冷蔵・冷凍の使い分けと家庭の目安。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              <Link
                href="/glossary"
                className="font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              >
                語句集
              </Link>
              ：「アク抜き」「塩のひとつまみ」など、料理用語の意味を確認できます。
            </li>
          </ul>
        </aside>
      </div>
    </article>
  );
}
