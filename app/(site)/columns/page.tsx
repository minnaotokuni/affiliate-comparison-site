import type { Metadata } from "next";
import Link from "next/link";
import {
  COLUMNS_HUB_CATEGORY_DESCRIPTION,
  COLUMNS_HUB_CATEGORY_LABEL,
  COLUMNS_HUB_CATEGORY_ORDER,
  columnsHubByCategory,
  columnsHubItems,
  type ColumnsHubCategory,
  type ColumnsHubItem,
} from "@/lib/columns/columns-hub";

export const metadata: Metadata = {
  title: "コラム一覧（野菜・果物の旬／相場／選び方／保存／栄養）",
  description:
    "野菜・果物の旬と相場メモのコラムを一覧で俯瞰できるハブページ。直近の相場・旬ナビ・野菜別ガイド・選び方・保存・調理ヒント・栄養素・年間カレンダー・語句集まで、目的別に探せます。",
  alternates: { canonical: "/columns" },
  openGraph: {
    type: "article",
    title: "コラム一覧（野菜・果物の旬／相場／選び方／保存／栄養）",
    description:
      "サイトのコラムをメイン・ガイド・参考の 3 区分で俯瞰できるハブページです。",
    url: "/columns",
  },
  twitter: {
    card: "summary_large_image",
    title: "コラム一覧（野菜・果物の旬／相場／選び方／保存／栄養）",
    description:
      "サイトのコラムをメイン・ガイド・参考の 3 区分で俯瞰できるハブページです。",
  },
};

const CATEGORY_ANCHOR: Record<ColumnsHubCategory, string> = {
  main: "columns-main",
  guide: "columns-guide",
  reference: "columns-reference",
};

const CATEGORY_ACCENT: Record<ColumnsHubCategory, string> = {
  main: "border-emerald-600/40 bg-emerald-50/70 text-emerald-900 dark:border-emerald-300/30 dark:bg-emerald-900/35 dark:text-emerald-100",
  guide:
    "border-sky-600/40 bg-sky-50/65 text-sky-900 dark:border-sky-300/30 dark:bg-sky-900/30 dark:text-sky-100",
  reference:
    "border-violet-600/40 bg-violet-50/65 text-violet-900 dark:border-violet-300/30 dark:bg-violet-900/30 dark:text-violet-100",
};

function ColumnCard({ item }: { item: ColumnsHubItem }) {
  return (
    <li className="h-full">
      <Link
        href={item.href}
        className="group flex h-full flex-col rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm transition hover:border-emerald-700/30 hover:shadow-md focus-visible:border-emerald-700/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:border-emerald-100/10 dark:bg-emerald-950 dark:hover:border-emerald-300/30 sm:p-6"
      >
        <div className="flex flex-wrap items-baseline gap-2 border-b border-emerald-900/8 pb-3 dark:border-emerald-100/10">
          {item.emoji ? (
            <span aria-hidden className="text-xl leading-none">
              {item.emoji}
            </span>
          ) : null}
          <h3 className="text-base font-semibold text-emerald-950 group-hover:text-emerald-800 dark:text-emerald-50 dark:group-hover:text-emerald-200">
            {item.label}
          </h3>
          <span
            className={`ml-auto rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${CATEGORY_ACCENT[item.category]}`}
          >
            {COLUMNS_HUB_CATEGORY_LABEL[item.category]}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">
          {item.description}
        </p>
        <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-emerald-900/82 dark:text-emerald-100/72">
          {item.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-2 border-l-2 border-emerald-500/35 pl-3"
            >
              {highlight}
            </li>
          ))}
        </ul>
        <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 group-hover:underline dark:text-emerald-200">
          このコラムを読む
          <span aria-hidden>→</span>
        </p>
      </Link>
    </li>
  );
}

export default function ColumnsHubPage() {
  const grouped = columnsHubByCategory();

  return (
    <article
      id="page-top"
      className="relative mx-auto w-full max-w-[40rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
          Columns hub
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-3xl">
          コラム一覧
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-800/88 dark:text-emerald-200/78">
          サイトのコラムを「メイン」「ガイド」「参考」の {COLUMNS_HUB_CATEGORY_ORDER.length} 区分で俯瞰できるハブページです。直近の相場・旬ナビ・野菜別ガイド・選び方・保存・調理ヒント・栄養素・年間カレンダー・語句集の {columnsHubItems.length} 本のコラムから、目的に合うものを選んで読み進めてください。
        </p>
        <p className="mt-3 text-xs leading-relaxed text-emerald-800/78 dark:text-emerald-200/68">
          ホームに戻るときは
          <Link
            href="/"
            className="ml-1 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
          >
            トップ
          </Link>
          へ。直近の相場や旬の重点 3 品はホームから素早くアクセスできます。
        </p>
      </header>

      <details
        open
        id="columns-toc"
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-8 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white/95 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/95 sm:p-5"
      >
        <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
          カテゴリへジャンプ
        </summary>
        <nav
          aria-label="コラムカテゴリ"
          className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs"
        >
          {COLUMNS_HUB_CATEGORY_ORDER.map((category) => (
            <a
              key={category}
              href={`#${CATEGORY_ANCHOR[category]}`}
              className="rounded-full border border-emerald-900/15 px-2 py-1 text-emerald-800 underline-offset-2 hover:underline dark:border-emerald-100/15 dark:text-emerald-200"
            >
              {COLUMNS_HUB_CATEGORY_LABEL[category]}
            </a>
          ))}
        </nav>
      </details>

      <div className="relative z-10 mt-10 space-y-14">
        <aside
          aria-label="コラム一覧の使い方"
          className="rounded-2xl border border-emerald-700/25 bg-emerald-50/60 p-5 text-sm leading-relaxed text-emerald-900/88 dark:border-emerald-300/25 dark:bg-emerald-900/35 dark:text-emerald-100/85 sm:p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            読み進めるヒント
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              「いま買うものを決めたい」なら、まず
              <Link
                href="/column/market"
                className="ml-1 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              >
                直近の相場からのおすすめ品
              </Link>
              から。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              「旬の重点 3 品をしっかり読みたい」なら
              <Link
                href="/column/season"
                className="ml-1 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              >
                旬ナビ
              </Link>
              、月別の早見は
              <Link
                href="/column/calendar"
                className="ml-1 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              >
                年間 旬カレンダー
              </Link>
              。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              買ったあとの保存・調理に迷ったら、
              <Link
                href="/column/storage"
                className="ml-1 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              >
                保存方法ガイド
              </Link>
              と
              <Link
                href="/column/cooking-tips"
                className="ml-1 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              >
                家庭の調理ヒント
              </Link>
              をどうぞ。
            </li>
          </ul>
        </aside>

        {grouped.map(({ category, items }) => (
          <section
            key={category}
            id={CATEGORY_ANCHOR[category]}
            className="scroll-mt-[var(--site-scroll-padding)] space-y-6"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15"
                aria-hidden
              />
              <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
                {COLUMNS_HUB_CATEGORY_LABEL[category]}（{items.length}本）
              </h2>
              <span
                className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15"
                aria-hidden
              />
            </div>
            <p className="text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">
              {COLUMNS_HUB_CATEGORY_DESCRIPTION[category]}
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <ColumnCard key={item.href} item={item} />
              ))}
            </ul>
          </section>
        ))}

        <aside
          aria-label="情報の取り扱い"
          className="rounded-2xl border border-emerald-900/10 bg-emerald-50/40 p-5 text-sm leading-relaxed text-emerald-900/85 dark:border-emerald-100/10 dark:bg-emerald-950/40 dark:text-emerald-100/78 sm:p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            このサイトの読み方
          </p>
          <p className="mt-2">
            掲載しているコラムは、家庭での買い物や献立を考えるときの参考情報です。価格・在庫・効能を保証するものではありません。市況や旬は産地・品種・天候・特売の状況で変わるため、最終的には店頭の並び・値札もあわせて目安にしてください。
          </p>
          <p className="mt-2">
            運営方針・アフィリエイトについては
            <Link
              href="/about"
              className="ml-1 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
            >
              サイトについて
            </Link>
            に詳しく記載しています。
          </p>
        </aside>
      </div>
    </article>
  );
}
