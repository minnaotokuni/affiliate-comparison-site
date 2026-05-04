import type { Metadata } from "next";
import Link from "next/link";
import {
  GLOSSARY_CATEGORY_DESCRIPTION,
  GLOSSARY_CATEGORY_LABEL,
  GLOSSARY_CATEGORY_ORDER,
  glossaryAnchorId,
  glossaryByCategory,
  glossaryEntries,
  type GlossaryCategory,
  type GlossaryEntry,
} from "@/lib/glossary";

export const metadata: Metadata = {
  title: "野菜・果物の語句集（用語辞典）",
  description:
    "追熟・糖度・Brix・リコピン・ポリフェノール・卸売市場・相対取引など、売場と記事で耳にしやすい言葉を家庭目線でやさしく解説した野菜・果物の用語辞典です。",
  alternates: { canonical: "/glossary" },
  openGraph: {
    type: "article",
    title: "野菜・果物の語句集（用語辞典）",
    description:
      "追熟・糖度・リコピン・卸売市場 など、売場と記事で耳にしやすい言葉を家庭目線で解説した語句集です。",
    url: "/glossary",
  },
  twitter: {
    card: "summary_large_image",
    title: "野菜・果物の語句集（用語辞典）",
    description:
      "追熟・糖度・リコピン・卸売市場 など、売場と記事でよく出てくる言葉をやさしく解説しています。",
  },
};

const CATEGORY_TONE: Record<GlossaryCategory, string> = {
  fruit: "border-amber-500/40 bg-amber-50/60 text-amber-900 dark:border-amber-300/30 dark:bg-amber-900/30 dark:text-amber-100",
  vegetable:
    "border-emerald-500/40 bg-emerald-50/70 text-emerald-900 dark:border-emerald-300/30 dark:bg-emerald-900/35 dark:text-emerald-100",
  nutrition:
    "border-rose-500/40 bg-rose-50/65 text-rose-900 dark:border-rose-300/30 dark:bg-rose-900/30 dark:text-rose-100",
  cooking:
    "border-sky-500/40 bg-sky-50/65 text-sky-900 dark:border-sky-300/30 dark:bg-sky-900/30 dark:text-sky-100",
  market:
    "border-violet-500/40 bg-violet-50/65 text-violet-900 dark:border-violet-300/30 dark:bg-violet-900/30 dark:text-violet-100",
};

function findEntryBySlug(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((entry) => entry.slug === slug);
}

function GlossaryCard({ entry }: { entry: GlossaryEntry }) {
  return (
    <article
      id={glossaryAnchorId(entry.slug)}
      className="scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm dark:border-emerald-100/10 dark:bg-emerald-950 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline gap-3 border-b border-emerald-900/8 pb-3 dark:border-emerald-100/10">
        <h3 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">
          {entry.term}
        </h3>
        {entry.kana ? (
          <span className="text-xs text-emerald-700/85 dark:text-emerald-200/70">
            {entry.kana}
          </span>
        ) : null}
        <span
          className={`ml-auto rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${CATEGORY_TONE[entry.category]}`}
        >
          {GLOSSARY_CATEGORY_LABEL[entry.category]}
        </span>
      </div>
      <dl className="mt-3" role="doc-glossary">
        <dt className="sr-only">解説</dt>
        <dd className="text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/80">
          {entry.description}
        </dd>
      </dl>
      {entry.related && entry.related.length > 0 ? (
        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            関連する語
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5 text-xs">
            {entry.related.map((slug) => {
              const target = findEntryBySlug(slug);
              if (!target) return null;
              return (
                <li key={slug}>
                  <a
                    href={`#${glossaryAnchorId(target.slug)}`}
                    className="inline-flex items-center rounded-full border border-emerald-900/15 bg-emerald-50/60 px-2 py-1 text-emerald-900 underline-offset-2 hover:underline dark:border-emerald-100/15 dark:bg-emerald-900/40 dark:text-emerald-100"
                  >
                    {target.term}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export default function GlossaryPage() {
  const grouped = glossaryByCategory();

  return (
    <article
      id="page-top"
      className="relative mx-auto w-full max-w-[40rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
          Glossary
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-3xl">
          野菜・果物の語句集（用語辞典）
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-800/88 dark:text-emerald-200/78">
          売場や記事で耳にしやすい言葉を、家庭目線でかみ砕いて解説した語句集です。果物・野菜・栄養／成分・調理／下処理・市場／流通の {GLOSSARY_CATEGORY_ORDER.length} カテゴリに分け、{glossaryEntries.length} 語を収録しました。
        </p>
        <p className="mt-3 text-xs leading-relaxed text-emerald-800/78 dark:text-emerald-200/68">
          各語の解説は「こう語られることが多い」という整理で、特定の効能・効果を保証するものではありません。詳しい品目情報は
          <Link
            href="/column/vegetables"
            className="ml-1 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
          >
            野菜別ガイド
          </Link>
          や
          <Link
            href="/column/nutrition"
            className="ml-1 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
          >
            栄養素のキホン
          </Link>
          を併せてどうぞ。
        </p>
      </header>

      <details
        open
        id="glossary-toc"
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-8 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white/95 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/95 sm:p-5"
      >
        <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
          カテゴリ・用語へジャンプ
        </summary>
        <nav aria-label="語句集カテゴリ" className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs">
          {GLOSSARY_CATEGORY_ORDER.map((category) => (
            <a
              key={category}
              href={`#g-cat-${category}`}
              className="rounded-full border border-emerald-900/15 px-2 py-1 text-emerald-800 underline-offset-2 hover:underline dark:border-emerald-100/15 dark:text-emerald-200"
            >
              {GLOSSARY_CATEGORY_LABEL[category]}
            </a>
          ))}
        </nav>
        <nav aria-label="個別の用語" className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px]">
          {glossaryEntries.map((entry) => (
            <a
              key={entry.slug}
              href={`#${glossaryAnchorId(entry.slug)}`}
              className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
            >
              {entry.term}
            </a>
          ))}
        </nav>
      </details>

      <div className="relative z-10 mt-10 space-y-14">
        <aside
          aria-label="語句集の取り扱い注意"
          className="rounded-2xl border border-emerald-700/25 bg-emerald-50/60 p-5 text-sm leading-relaxed text-emerald-900/88 dark:border-emerald-300/25 dark:bg-emerald-900/35 dark:text-emerald-100/85 sm:p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            この語句集の使い方
          </p>
          <p className="mt-2">
            ここでまとめた説明は、家庭で参考にしやすい一般的なイメージです。品種・産地・季節・調理の仕方によって、味や見た目には例外があります。栄養や成分にまつわる表現は「こう語られることが多い」という程度にとどめ、特定の効能・効果や、病気の予防・治療を約束するものではありません。
          </p>
          <p className="mt-2">
            体調や食事に不安がある場合は、医師・薬剤師・管理栄養士などの専門家にご相談ください。
          </p>
        </aside>

        {grouped.map(({ category, entries }) => (
          <section
            key={category}
            id={`g-cat-${category}`}
            className="scroll-mt-[var(--site-scroll-padding)] space-y-6"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15"
                aria-hidden
              />
              <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
                {GLOSSARY_CATEGORY_LABEL[category]}（{entries.length}語）
              </h2>
              <span
                className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15"
                aria-hidden
              />
            </div>
            <p className="text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">
              {GLOSSARY_CATEGORY_DESCRIPTION[category]}
            </p>
            <div className="space-y-6">
              {entries.map((entry) => (
                <GlossaryCard key={entry.slug} entry={entry} />
              ))}
            </div>
          </section>
        ))}

        <aside
          aria-label="関連ページ"
          className="rounded-2xl border border-emerald-900/10 bg-emerald-50/40 p-5 text-sm leading-relaxed text-emerald-900/85 dark:border-emerald-100/10 dark:bg-emerald-950/40 dark:text-emerald-100/80 sm:p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            関連するコラム
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              <Link
                href="/columns"
                className="font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              >
                コラム一覧ハブ
              </Link>
              ：相場・旬・選び方など、サイトのコラムを俯瞰できます。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              <Link
                href="/column/cooking-tips"
                className="font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              >
                家庭の調理ヒント
              </Link>
              ：下処理や火入れなど、調理側の言葉を実際の手順とセットで読めます。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              <Link
                href="/column/calendar"
                className="font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              >
                年間 旬カレンダー
              </Link>
              ：「走り・盛り・名残」を実際の月割で確認できます。
            </li>
          </ul>
        </aside>
      </div>
    </article>
  );
}
