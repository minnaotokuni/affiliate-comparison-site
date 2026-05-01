import type { Metadata } from "next";
import { selectGuideSections } from "@/lib/columns/select-guide";

export const metadata: Metadata = {
  title: "選び方・保存・食べ方",
  description: "売場での見極め、保存、調理のヒント。個人差・店舗差がある前提のメモです。",
};

export default function SelectColumnPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:max-w-4xl lg:px-8">
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Quality &amp; kitchen</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">選び方・保存・食べ方</h1>
        <p className="mt-4 text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100/75">
          現場で使うチェックリストのたたき台です。品目別の深掘りは今後、個別記事に切り出します。
        </p>
      </header>

      <div className="mt-10 space-y-8">
        {selectGuideSections.map((section) => (
          <section key={section.title} className="rounded-2xl border border-emerald-900/10 bg-white p-5 dark:border-emerald-100/10 dark:bg-emerald-950">
            <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">{section.title}</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
