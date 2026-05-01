import type { Metadata } from "next";
import Link from "next/link";
import { LegalNotice } from "@/components/LegalNotice";
import { nutritionPreamble, nutritionTopics } from "@/lib/columns/nutrition-notes";
import { pharmaRelatedDisclaimer } from "@/lib/legal-copy";

export const metadata: Metadata = {
  title: "栄養の豆知識",
  description: "食品に含まれる成分の一般説明。効果効能の記載はしません。",
};

export default function NutritionColumnPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:max-w-4xl lg:px-8">
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Nutrition notes</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">栄養の豆知識</h1>
        <p className="mt-4 text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100/75">{nutritionPreamble}</p>
        <p className="mt-4 text-sm">
          <Link href="/column/vegetables" className="font-medium text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-200">
            野菜別ガイド（指定野菜・ブロッコリースプラウトほか）へ →
          </Link>
        </p>
      </header>

      <div className="mt-8 space-y-6">
        <LegalNotice variant="warn" title="表現スコープについて">
          {pharmaRelatedDisclaimer.trim()}
        </LegalNotice>

        {nutritionTopics.map((topic) => (
          <section
            key={topic.topic}
            className="rounded-2xl border border-emerald-900/10 bg-white p-5 dark:border-emerald-100/10 dark:bg-emerald-950"
          >
            <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">{topic.topic}</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
              {topic.facts.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-emerald-500/80" aria-hidden />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-emerald-900/10 pt-4 text-xs leading-relaxed text-emerald-800/75 dark:border-emerald-100/10 dark:text-emerald-200/65">
              <span className="font-semibold text-emerald-900 dark:text-emerald-100">補足: </span>
              {topic.notMedicalNote}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
