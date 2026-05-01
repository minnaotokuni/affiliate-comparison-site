import type { Metadata } from "next";
import { fruitSeasonHints, seasonIntro, vegSeasonHints } from "@/lib/columns/season-primer";

export const metadata: Metadata = {
  title: "旬ナビ",
  description: "野菜・果物の旬の捉え方と、売場で役立つ見分けのヒント。",
};

export default function SeasonColumnPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:max-w-4xl lg:px-8">
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Season guide</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">{seasonIntro.title}</h1>
      </header>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
        {seasonIntro.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <section className="mt-12 space-y-10">
        <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">野菜のヒント</h2>
        {vegSeasonHints.map((block) => (
          <div key={block.name} className="rounded-2xl border border-emerald-900/10 bg-white p-5 dark:border-emerald-100/10 dark:bg-emerald-950">
            <h3 className="text-base font-semibold text-emerald-900 dark:text-emerald-100">{block.name}</h3>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
              {block.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-12 space-y-10">
        <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">果物のヒント</h2>
        {fruitSeasonHints.map((block) => (
          <div key={block.name} className="rounded-2xl border border-emerald-900/10 bg-white p-5 dark:border-emerald-100/10 dark:bg-emerald-950">
            <h3 className="text-base font-semibold text-emerald-900 dark:text-emerald-100">{block.name}</h3>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
              {block.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </article>
  );
}
