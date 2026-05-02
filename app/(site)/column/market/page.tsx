import type { Metadata } from "next";
import { AnchorSection } from "@/components/AnchorSection";
import { InPageJumpButtons } from "@/components/InPageJumpButtons";
import { LegalNotice } from "@/components/LegalNotice";
import { latestMarket } from "@/lib/columns/market-weekly";
import { marketDataDisclaimer } from "@/lib/legal-copy";

export const metadata: Metadata = {
  title: "直近の相場",
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
    <article id="page-top" className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:max-w-4xl lg:px-8">
      <InPageJumpButtons tocAnchorId="market-toc" />

      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-emerald-700/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200">
            Weekly desk
          </span>
          <span className="text-xs text-emerald-800/70 dark:text-emerald-200/60">掲載日 {formatDate(latestMarket.publishedOn)}</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">{latestMarket.title}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">{latestMarket.intro}</p>
      </header>

      <details
        open
        id="market-toc"
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-8 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white/95 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/95 sm:p-5"
      >
        <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
          このページの構成（ジャンプ）
        </summary>
        <nav aria-label="ページ内セクション" className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <a href="#market-focus" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            今週のフォーカス
          </a>
          <a href="#market-veg" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            野菜の感触
          </a>
          <a href="#market-fruit" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            果物の感触
          </a>
          <a href="#market-weather" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            天候・催事の変数
          </a>
          <a href="#market-next" className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200">
            次週の見どころ
          </a>
        </nav>
      </details>

      <div className="relative z-10 mt-10 space-y-12">
        <LegalNotice title="相場・価格情報について">{marketDataDisclaimer.trim()}</LegalNotice>

        <AnchorSection id="market-focus" className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">今週のフォーカス</h2>
            <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {latestMarket.focusCards.map((card) => (
              <div
                key={card.headline}
                className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm dark:border-emerald-100/10 dark:bg-emerald-950"
              >
                <h3 className="text-base font-semibold text-emerald-950 dark:text-emerald-50">{card.headline}</h3>
                <p className="mt-3 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">{card.body}</p>
              </div>
            ))}
          </div>
        </AnchorSection>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          <AnchorSection
            id="market-veg"
            className="rounded-2xl border border-emerald-900/10 bg-gradient-to-b from-white to-emerald-50/40 p-5 dark:border-emerald-100/10 dark:from-emerald-950 dark:to-emerald-950/80 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">野菜まわりの感触</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/78">
              {latestMarket.vegBullets.map((b) => (
                <li key={b} className="flex gap-3 border-l-2 border-emerald-500/35 pl-3">
                  {b}
                </li>
              ))}
            </ul>
          </AnchorSection>

          <AnchorSection
            id="market-fruit"
            className="rounded-2xl border border-emerald-900/10 bg-gradient-to-b from-white to-amber-50/25 p-5 dark:border-emerald-100/10 dark:from-emerald-950 dark:to-emerald-950/80 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">果物まわりの感触</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/78">
              {latestMarket.fruitBullets.map((b) => (
                <li key={b} className="flex gap-3 border-l-2 border-amber-500/40 pl-3">
                  {b}
                </li>
              ))}
            </ul>
          </AnchorSection>
        </div>

        <AnchorSection
          id="market-weather"
          className="rounded-2xl border border-dashed border-emerald-800/25 bg-emerald-50/40 p-5 dark:border-emerald-200/20 dark:bg-emerald-950/50 sm:p-6"
        >
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">天候・連休・催事のメモ</h2>
          <p className="mt-2 text-xs text-emerald-800/75 dark:text-emerald-200/65">
            売場のPOSより先に動くこともある変数です。地域・店舗フォーマットで差が大きい前提で読み替えてください。
          </p>
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/78">
            {latestMarket.weatherFairNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ol>
        </AnchorSection>

        <AnchorSection
          id="market-next"
          className="relative overflow-hidden rounded-2xl border border-emerald-900/10 bg-emerald-900 text-emerald-50 dark:border-emerald-400/20 dark:bg-emerald-900"
        >
          <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-emerald-400/20 blur-2xl" aria-hidden />
          <div className="relative p-6 sm:p-7">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-200/90">次週の見どころ</h2>
            <p className="mt-4 text-sm leading-relaxed text-emerald-50/95">{latestMarket.nextWeekPreview}</p>
          </div>
        </AnchorSection>
      </div>
    </article>
  );
}
