import type { Metadata } from "next";
import { AnchorSection } from "@/components/AnchorSection";
import { InPageJumpButtons } from "@/components/InPageJumpButtons";
import { LegalNotice } from "@/components/LegalNotice";
import {
  NUTRITION_TAG_BADGE,
  nutritionEntries,
  type NutritionEntry,
} from "@/lib/columns/nutrition-basics";
import { pharmaRelatedDisclaimer } from "@/lib/legal-copy";

export const metadata: Metadata = {
  title: "野菜・果物の栄養素の基礎（家庭目安）",
  description:
    "食物繊維・ビタミン・ミネラル・カロテノイド・ポリフェノールなど、野菜と果物に多い代表的な栄養素について、役わりと多く含まれる食品例、食べ合わせの一般注意をやさしくまとめました。",
};

const nutritionAnchor = (entry: NutritionEntry): string => `nutrition-${entry.tag}`;

function NutritionCard({ entry }: { entry: NutritionEntry }) {
  return (
    <article
      id={nutritionAnchor(entry)}
      className="scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm dark:border-emerald-100/10 dark:bg-emerald-950 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline gap-3 border-b border-emerald-900/8 pb-3 dark:border-emerald-100/10">
        <h3 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">{entry.name}</h3>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${NUTRITION_TAG_BADGE[entry.tag]}`}
        >
          {entry.tag}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/80">{entry.role}</p>
      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
          多く含まれやすい食品の例
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5 text-xs">
          {entry.richIn.map((food) => (
            <li
              key={food}
              className="rounded-full border border-emerald-900/15 bg-emerald-50/60 px-2 py-1 text-emerald-900 dark:border-emerald-100/15 dark:bg-emerald-900/40 dark:text-emerald-100"
            >
              {food}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 rounded-xl bg-amber-50/70 px-3 py-2 text-xs leading-relaxed text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
        <p className="font-semibold">食べ合わせ・過剰摂取の一般注意</p>
        <p className="mt-1 whitespace-pre-line">{entry.caution}</p>
      </div>
    </article>
  );
}

export default function NutritionColumnPage() {
  return (
    <article id="page-top" className="relative mx-auto w-full max-w-[40rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <InPageJumpButtons tocAnchorId="nutrition-toc" />

      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
          Nutrition basics
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-3xl">
          野菜・果物の栄養素の基礎（家庭目安）
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-800/88 dark:text-emerald-200/78">
          食物繊維・ビタミン・ミネラル・カロテノイド・ポリフェノールなど、野菜と果物に多い代表的な栄養素を{nutritionEntries.length}項目に整理しました。家庭での「だいたいこんな成分」「こう語られることが多い」というイメージをつかむのが目的です。
        </p>
        <p className="mt-3 text-xs leading-relaxed text-emerald-800/78 dark:text-emerald-200/68">
          疾病の予防・治療や、特定の効能を保証するものではありません。持病・服薬中・妊娠中・小児・高齢の方は、医師・薬剤師・管理栄養士へご相談ください。
        </p>
      </header>

      <details
        open
        id="nutrition-toc"
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-8 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white/95 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/95 sm:p-5"
      >
        <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
          このページの構成（ジャンプ）
        </summary>
        <nav aria-label="栄養素ジャンプ" className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs">
          {nutritionEntries.map((entry) => (
            <a
              key={entry.tag}
              href={`#${nutritionAnchor(entry)}`}
              className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
            >
              {entry.name}
            </a>
          ))}
        </nav>
      </details>

      <div className="relative z-10 mt-10 space-y-12">
        <LegalNotice title="栄養素の取り扱いについて" variant="warn">
          {`${pharmaRelatedDisclaimer.trim()}\n本ページの内容は、特定の効能・効果を保証するものではありません。食事は全体のバランスが基本です。サプリメントや食事療法を始めるときは、必ず医療機関にご相談ください。`}
        </LegalNotice>

        <AnchorSection id="nutrition-overview" className="space-y-3">
          <h2 className="text-base font-semibold text-emerald-950 dark:text-emerald-50">家庭で押さえておくと便利な3つのポイント</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              野菜・果物は「単体で完璧」ではなく、組み合わせと量がポイント。1日のうちで色や種類のバリエーションが出るように選ぶと、結果的に栄養素の幅も広がりやすいです。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              水溶性ビタミン（C・B群）は加熱・水で失われやすく、脂溶性ビタミン（A・D・E・K）は油と一緒だと吸収が良くなりやすいと一般に言われます。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              「○○に効く」「治る」といった表現は避け、「こういう成分が含まれている」「こう語られることが多い」と捉えるのが現実的です。
            </li>
          </ul>
        </AnchorSection>

        <div className="space-y-6">
          {nutritionEntries.map((entry) => (
            <NutritionCard key={entry.tag} entry={entry} />
          ))}
        </div>

        <LegalNotice title="重要：効能を保証するものではありません" variant="warn">
          {`本ページは、家庭での食事を考えるときの参考情報を目的としています。\n特定の食品・栄養素・サプリメントが、疾病の診断・治療・予防に効果があることを示すものではなく、医療行為の代わりにもなりません。\n体調・治療・栄養管理に関する判断は、必ず医師・薬剤師・管理栄養士など医療専門家にご相談ください。`}
        </LegalNotice>
      </div>
    </article>
  );
}
