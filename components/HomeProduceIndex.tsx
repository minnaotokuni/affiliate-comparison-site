import Link from "next/link";
import { VeggieIcon } from "@/components/VeggieIcon";
import { fruitSpotlights } from "@/lib/columns/fruit-spotlights";
import { vegetableProfiles } from "@/lib/columns/vegetable-profiles";

const chipClass =
  "inline-flex items-center gap-1.5 rounded-full border border-emerald-900/12 bg-white px-3 py-1.5 text-xs font-medium text-emerald-900 shadow-sm transition hover:border-emerald-600/35 hover:bg-emerald-50/90 dark:border-emerald-100/12 dark:bg-emerald-950 dark:text-emerald-50 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-900/70";

export function HomeProduceIndex() {
  const vegetables = [...vegetableProfiles].sort((a, b) => a.name.localeCompare(b.name, "ja"));

  return (
    <section className="mt-14" aria-labelledby="produce-index-heading">
      <h2 id="produce-index-heading" className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
        主要な野菜・果物から見る
      </h2>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">
        野菜は各品のガイドへ、果物は旬ナビの「主要果物の見どころ」へジャンプします。掲載品目は公的な作況や流通でよく取り上げられる代表例を中心にしています（産地・品種・年で変わります）。品種の細かい話は、野菜は各ガイド・果物は旬ナビで補足しています。
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">野菜</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {vegetables.map((v) => (
              <Link key={v.slug} href={`/column/vegetables#${v.slug}`} className={chipClass}>
                <VeggieIcon slug={v.slug} size={22} title="" />
                {v.name}
              </Link>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-emerald-700/75 dark:text-emerald-300/65">
            ごぼう・れんこん・アスパラなどほかの主要野菜は、農林水産省の
            <a
              href="https://www.maff.go.jp/j/seisan/ryutu/yasai/"
              className="mx-0.5 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              野菜のページ
            </a>
            や業界の一覧もあわせて参照してください。
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-200">果物</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {fruitSpotlights.map((f) => (
              <Link key={f.slug} href={`/column/season#fruit-${f.slug}`} className={chipClass}>
                <VeggieIcon slug={f.slug} size={22} title="" />
                {f.name}
              </Link>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-emerald-700/75 dark:text-emerald-300/65">
            柑橘類の細かい品種や輸入フルーツは、
            <a
              href="https://www.kudamononavi.com/"
              className="mx-0.5 font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              果物ナビ
            </a>
            など季節カレンダーと併用すると整理しやすいです。
          </p>
        </div>
      </div>
    </section>
  );
}
