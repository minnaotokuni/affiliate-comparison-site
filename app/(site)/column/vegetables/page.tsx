import type { Metadata } from "next";
import Link from "next/link";
import { LegalNotice } from "@/components/LegalNotice";
import { pharmaRelatedDisclaimer } from "@/lib/legal-copy";
import { vegetableProfiles } from "@/lib/columns/vegetable-profiles";

export const metadata: Metadata = {
  title: "野菜別ガイド（指定野菜・定番品目）",
  description:
    "キャベツ・トマト・ブロッコリースプラウトなど、売場で多い野菜の栄養・食べ方・選び方。糖度は参考目安です。効果効能は記載しません。",
};

export default function VegetablesGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:max-w-4xl lg:px-8">
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
          Vegetable profiles
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">
          野菜別ガイド
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100/75">
          バイヤー現場で顔を合わせやすい<strong className="font-semibold text-emerald-950 dark:text-emerald-50">指定野菜</strong>
          を軸に、売場でも多い品目と話題の芽菜をまとめました。公開資料・食品表示の一般的な説明をベースにしており、品種・産地・規格で差があります。
        </p>
        <div className="mt-6 space-y-4">
          <LegalNotice variant="warn" title="健康・効果に関する表現">
            {pharmaRelatedDisclaimer.trim()}
          </LegalNotice>
          <p className="text-xs leading-relaxed text-emerald-800/75 dark:text-emerald-200/65">
            糖度（°Brix）は測定機・部位・成熟度で変わります。ここに書いた範囲は文献・業界で参照されやすい「目安」であり、特定ロットの保証ではありません。
          </p>
        </div>
      </header>

      <nav
        aria-label="野菜一覧"
        className="sticky top-24 z-10 mt-10 rounded-2xl border border-emerald-900/10 bg-emerald-50/90 p-4 backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/90 sm:top-28 sm:p-5"
      >
        <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-100">もくじ（ジャンプ）</p>
        <ul className="mt-3 columns-2 gap-x-4 gap-y-1 text-xs sm:columns-3">
          {vegetableProfiles.map((v) => (
            <li key={v.slug} className="break-inside-avoid py-0.5">
              <a href={`#${v.slug}`} className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
                {v.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-12 space-y-14">
        {vegetableProfiles.map((v) => (
          <section
            key={v.slug}
            id={v.slug}
            className="scroll-mt-32 rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm dark:border-emerald-100/10 dark:bg-emerald-950 sm:p-7"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-xl font-semibold text-emerald-950 dark:text-emerald-50">{v.name}</h2>
              <ul className="flex flex-wrap gap-1.5">
                {v.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-100"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {v.extraNote ? (
              <p className="mt-3 text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">{v.extraNote}</p>
            ) : null}

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">栄養・成分（一般論）</h3>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">
                  {v.nutrition.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-emerald-500/70" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">食べ方のヒント</h3>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">
                  {v.howToEat.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-emerald-500/70" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-emerald-900/10 pt-6 dark:border-emerald-100/10">
              <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">選び方・売場チェック</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">
                {v.selection.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            {v.brixNote ? (
              <div className="mt-6 rounded-xl border border-emerald-800/15 bg-emerald-50/50 p-4 dark:border-emerald-200/10 dark:bg-emerald-900/30">
                <h3 className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">糖度・味の指標について</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">{v.brixNote}</p>
              </div>
            ) : null}
          </section>
        ))}
      </div>

      <p className="mt-12 text-center text-sm">
        <Link href="/column/nutrition" className="font-medium text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-200">
          栄養の書き方・注意書きの考え方へ →
        </Link>
      </p>
    </article>
  );
}
