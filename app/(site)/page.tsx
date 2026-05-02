import Link from "next/link";
import { HomeMarketCardLink } from "@/components/HomeMarketCardLink";
import { HomeProduceIndex } from "@/components/HomeProduceIndex";
import { HomeSeasonCardLink } from "@/components/HomeSeasonCardLink";
import { ShijouSeiDashboard, ShijouSeiDashboardError } from "@/components/ShijouSeiDashboard";
import { OtaMarketDashboard, OtaMarketDashboardError } from "@/components/OtaMarketDashboard";
import { isoDateInJapan, longDateLabelJa } from "@/lib/jst-date";
import { getOtaMarketDashboard } from "@/lib/ota-market/service";
import { getShijouSeiRetailDashboard } from "@/lib/shijou-nippo/service";
import { primaryNav } from "@/lib/site-nav";

export default async function HomePage() {
  const refIso = isoDateInJapan();
  const refLabel = longDateLabelJa(refIso);
  const [ota, shijou] = await Promise.all([getOtaMarketDashboard(), getShijouSeiRetailDashboard(refIso)]);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-6 pt-10 sm:px-6 lg:max-w-4xl lg:px-8 lg:pt-14">
      <div className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-white px-6 py-10 shadow-sm shadow-emerald-900/5 dark:border-emerald-100/10 dark:bg-emerald-950 dark:shadow-black/30 sm:px-10">
        <div
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-500/10"
          aria-hidden
        />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">
          旬と相場のメモ帳
        </p>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-4xl">
          野菜・果物の旬・相場・選び方を、ひと目で押さえる。
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-emerald-900/75 dark:text-emerald-100/70">
          <strong className="font-semibold text-emerald-950 dark:text-emerald-50">旬</strong>の楽しみ方、
          <strong className="font-semibold text-emerald-950 dark:text-emerald-50">直近の相場</strong>の感触、
          <strong className="font-semibold text-emerald-950 dark:text-emerald-50">選び方・保存・食べ方</strong>
          までを、できるだけわかりやすくまとめています。コラムや野菜別ガイドから、お買い物や献立づくりのヒントにお使いください。
        </p>
        <p className="mt-5 text-sm text-emerald-800/90 dark:text-emerald-200/85">
          <span className="font-semibold text-emerald-950 dark:text-emerald-50">表示基準日（日本時間）</span>
          {": "}
          <time dateTime={refIso} className="tabular-nums">
            {refLabel}
          </time>
          <span className="text-emerald-700/80 dark:text-emerald-300/75">（以下の市況サマリもこの日を基準に算出）</span>
        </p>
        <nav
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-emerald-900/10 pt-6 text-sm dark:border-emerald-100/10"
          aria-label="相場セクションへジャンプ"
        >
          <span className="text-xs font-semibold tracking-wide text-emerald-800 dark:text-emerald-200">相場はここ↓</span>
          <a href="#market-ota" className="font-medium text-emerald-900 underline-offset-4 hover:underline dark:text-emerald-100">
            大田（API・推移）
          </a>
          <span className="text-emerald-500/55 dark:text-emerald-500/35" aria-hidden>
            ·
          </span>
          <a href="#market-shijou-sei" className="font-medium text-sky-950 underline-offset-4 hover:underline dark:text-sky-100">
            都の卸（1kg・代表g）
          </a>
        </nav>
      </div>

      {ota.ok ? (
        <OtaMarketDashboard id="market-ota" data={ota} />
      ) : (
        <OtaMarketDashboardError id="market-ota" message={ota.message} referenceDateIso={refIso} referenceDateLabel={refLabel} />
      )}

      {shijou.ok ? (
        <ShijouSeiDashboard id="market-shijou-sei" data={shijou} />
      ) : (
        <ShijouSeiDashboardError id="market-shijou-sei" message={shijou.message} requestedDateIso={refIso} />
      )}

      <HomeProduceIndex />

      <section className="mt-14" aria-labelledby="sections-heading">
        <h2 id="sections-heading" className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
          コンテンツ一覧
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {primaryNav
            .filter((item) => item.href !== "/about")
            .map((item) => (
              <li
                key={item.href}
                className={
                  item.href === "/column/market" || item.href === "/column/season" ? "sm:col-span-2" : undefined
                }
              >
                {item.href === "/column/market" ? (
                  <HomeMarketCardLink label={item.label} description={item.description} />
                ) : item.href === "/column/season" ? (
                  <HomeSeasonCardLink label={item.label} description={item.description} />
                ) : (
                  <Link
                    href={item.href}
                    className="flex h-full flex-col rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm transition hover:border-emerald-600/25 hover:shadow-md dark:border-emerald-100/10 dark:bg-emerald-950 dark:hover:border-emerald-400/20"
                  >
                    <span className="text-base font-semibold text-emerald-950 dark:text-emerald-50">{item.label}</span>
                    <span className="mt-2 text-sm leading-relaxed text-emerald-800/75 dark:text-emerald-100/65">
                      {item.description}
                    </span>
                    <span className="mt-4 text-xs font-medium text-emerald-700 dark:text-emerald-300">読む →</span>
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-dashed border-emerald-800/20 bg-emerald-50/30 p-6 dark:border-emerald-200/15 dark:bg-emerald-950/50">
        <h2 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">これから：A8ネットでの収益化</h2>
        <p className="mt-3 text-sm leading-relaxed text-emerald-900/75 dark:text-emerald-100/70">
          食材通販・調理器具・保存グッズなど、記事の文脈に合うリンクを A8 などのアフィリエイトで載せる予定です。
          記事ごとに「なぜその商品か」を説明し、PR であることを明示します。
        </p>
        <Link
          href="/about"
          className="mt-4 inline-flex text-sm font-medium text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-200"
        >
          運営・広告の方針を読む
        </Link>
      </section>
    </main>
  );
}
