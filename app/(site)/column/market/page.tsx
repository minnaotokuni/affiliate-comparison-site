import type { Metadata } from "next";
import { LegalNotice } from "@/components/LegalNotice";
import { latestMarket } from "@/lib/columns/market-weekly";
import { marketDataDisclaimer } from "@/lib/legal-copy";

export const metadata: Metadata = {
  title: "相場の感触",
  description: "週次で更新する野菜・果物の相場メモ。参考情報であり取引を保証するものではありません。",
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("ja-JP", {
      dateStyle: "long",
      timeZone: "Asia/Tokyo",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function MarketColumnPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:max-w-4xl lg:px-8">
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Weekly desk</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">{latestMarket.title}</h1>
        <p className="mt-2 text-sm text-emerald-800/70 dark:text-emerald-200/60">掲載日: {formatDate(latestMarket.publishedOn)}</p>
        <p className="mt-6 text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100/75">{latestMarket.intro}</p>
      </header>

      <div className="mt-8 space-y-8">
        <LegalNotice title="相場・価格情報について">{marketDataDisclaimer.trim()}</LegalNotice>

        <section>
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">野菜まわりの感触</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
            {latestMarket.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">果物まわりの感触</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
            {latestMarket.fruitNotes.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-900/10 bg-white p-5 dark:border-emerald-100/10 dark:bg-emerald-950">
          <h2 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">次の更新メモ</h2>
          <p className="mt-3 text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100/75">{latestMarket.closingNote}</p>
        </section>
      </div>
    </article>
  );
}
