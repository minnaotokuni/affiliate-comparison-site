import Link from "next/link";
import { HomeMarketCardLink } from "@/components/HomeMarketCardLink";
import { HomeProduceIndex } from "@/components/HomeProduceIndex";
import { HomeSeasonCardLink } from "@/components/HomeSeasonCardLink";
import { HomeTopLead } from "@/components/HomeTopLead";
import {
  BackgroundPattern,
  CornerLeaves,
  HeroBasket,
  SectionDivider,
} from "@/components/illustrations";
import { ShijouSeiDashboard, ShijouSeiDashboardError } from "@/components/ShijouSeiDashboard";
import { OtaMarketDashboard, OtaMarketDashboardError } from "@/components/OtaMarketDashboard";
import { buildOtaTopVoiceLines } from "@/lib/home/ota-top-voice";
import { seasonalPickBlockForJapanCalendar } from "@/lib/home/seasonal-picks";
import { activeWeeklySpotlight } from "@/lib/home/weekly-spotlight";
import { isoDateInJapan, longDateLabelJa } from "@/lib/jst-date";
import { getOtaMarketDashboard } from "@/lib/ota-market/service";
import { getShijouSeiRetailDashboard } from "@/lib/shijou-nippo/service";
import { primaryNav } from "@/lib/site-nav";

type ThemeCard = {
  href: string;
  title: string;
  emoji: string;
  blurb: string;
};

const themeCards: readonly ThemeCard[] = [
  {
    href: "/column/calendar",
    title: "いまの月の旬を見る",
    emoji: "🥬",
    blurb: "月別の早見。今月どの野菜・果物が旬かをひと目で。",
  },
  {
    href: "/column/select",
    title: "お店での選び方",
    emoji: "🍎",
    blurb: "見た目・手触り・避けたいサインなど売場での見分け方。",
  },
  {
    href: "/column/storage",
    title: "家での保存方法",
    emoji: "🥕",
    blurb: "常温・冷蔵・冷凍の家庭での目安をまとめます。",
  },
  {
    href: "/column/nutrition",
    title: "栄養素のキホン",
    emoji: "🥦",
    blurb: "ビタミンやミネラルの一般的な役わりを家庭目線で。",
  },
];

/**
 * 新コラム4本（calendar/select/storage/nutrition）は上の「探したいテーマで選ぶ」で
 * すでに大きめに案内しているため、下の「コンテンツ一覧」では重複させない。
 */
const themeCardHrefs: ReadonlySet<string> = new Set(themeCards.map((c) => c.href));

type PopularEntry = {
  href: string;
  label: string;
  hint: string;
  emoji: string;
};

const popularEntries: readonly PopularEntry[] = [
  {
    href: "/column/market",
    label: "今週の相場おすすめ",
    hint: "メインの読み物",
    emoji: "🥔",
  },
  {
    href: "/column/season",
    label: "旬ナビ（おすすめ3品）",
    hint: "暦ベース",
    emoji: "🍇",
  },
  {
    href: "/column/vegetables",
    label: "野菜別ガイド",
    hint: "イラスト付き",
    emoji: "🥬",
  },
  {
    href: "/#market-ota",
    label: "大田の市況",
    hint: "高・中・安と推移",
    emoji: "📈",
  },
];

export default async function HomePage() {
  const refIso = isoDateInJapan();
  const refLabel = longDateLabelJa(refIso);
  const [ota, shijou] = await Promise.all([getOtaMarketDashboard(), getShijouSeiRetailDashboard(refIso)]);
  const curatedSpotlight = activeWeeklySpotlight(refIso);
  const seasonalBlock = seasonalPickBlockForJapanCalendar(refIso);
  const otaVoiceLines = ota.ok ? buildOtaTopVoiceLines(ota.rows) : [];

  return (
    <main className="mx-auto w-full max-w-[min(100%,100rem)] px-4 pb-6 pt-10 sm:px-6 lg:px-8 lg:pt-14">
      <div className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-white px-6 py-10 shadow-sm shadow-emerald-900/5 dark:border-emerald-100/10 dark:bg-emerald-950 dark:shadow-black/30 sm:px-10">
        <div
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-500/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 text-emerald-700 opacity-[0.07] dark:text-emerald-300 dark:opacity-[0.09]"
          aria-hidden
        >
          <BackgroundPattern variant="leaf" />
        </div>
        <HeroBasket
          decorative
          className="pointer-events-none absolute -bottom-3 right-3 -z-10 hidden h-auto w-[170px] opacity-95 lg:block lg:right-6 lg:w-[220px]"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">
          野菜・果物の旬と相場メモ
        </p>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-4xl">
          直近の相場からのおすすめ品を中心に、旬と市況。
        </h1>
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
          aria-label="ページ内の主要セクションへ"
        >
          <a href="#home-market-main" className="text-xs font-semibold tracking-wide text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-200">
            相場おすすめへ
          </a>
          <span className="text-emerald-500/55 dark:text-emerald-500/35" aria-hidden>
            ·
          </span>
          <a href="#home-season-lead" className="text-xs font-semibold tracking-wide text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-200">
            旬ナビへ
          </a>
          <span className="text-emerald-500/55 dark:text-emerald-500/35" aria-hidden>
            ·
          </span>
          <a href="#home-market-voice" className="font-medium text-emerald-900 underline-offset-4 hover:underline dark:text-emerald-100">
            市況メモへ
          </a>
          <span className="text-emerald-500/55 dark:text-emerald-500/35" aria-hidden>
            ·
          </span>
          <a href="#market-ota" className="font-medium text-emerald-900 underline-offset-4 hover:underline dark:text-emerald-100">
            大田の表へ
          </a>
          <span className="text-emerald-500/55 dark:text-emerald-500/35" aria-hidden>
            ·
          </span>
          <a href="#market-shijou-sei" className="font-medium text-sky-950 underline-offset-4 hover:underline dark:text-sky-100">
            相場（都日報）へ
          </a>
        </nav>
      </div>

      <div className="mt-8" aria-hidden>
        <SectionDivider height={28} className="opacity-80" />
      </div>

      <section className="mt-6" aria-labelledby="home-theme-heading">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2
              id="home-theme-heading"
              className="text-base font-semibold text-emerald-950 dark:text-emerald-50"
            >
              探したいテーマで選ぶ
            </h2>
            <p className="mt-1 text-xs text-emerald-800/80 dark:text-emerald-200/70">
              「いま何が旬？」「店頭での選び方は？」など、知りたい切り口から短時間で。
            </p>
          </div>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {themeCards.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="flex h-full flex-col gap-2 rounded-2xl border border-emerald-900/12 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-600/35 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 dark:border-emerald-100/12 dark:bg-emerald-950 dark:hover:border-emerald-400/30"
              >
                <span
                  className="inline-flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-2xl ring-1 ring-emerald-900/10 dark:bg-emerald-900/50 dark:ring-emerald-100/10"
                  aria-hidden
                >
                  {card.emoji}
                </span>
                <span className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                  {card.title}
                </span>
                <span className="text-[12px] leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">
                  {card.blurb}
                </span>
                <span className="mt-auto text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                  開く →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="relative mt-6 overflow-hidden rounded-2xl border border-emerald-900/10 bg-emerald-50/50 px-4 py-4 dark:border-emerald-100/10 dark:bg-emerald-900/30"
        aria-labelledby="home-popular-heading"
      >
        <CornerLeaves
          position="tr"
          decorative
          className="pointer-events-none absolute -right-2 -top-2 hidden text-emerald-600/55 dark:text-emerald-300/55 sm:block"
          size={72}
        />
        <div className="relative flex flex-wrap items-center gap-2">
          <h2
            id="home-popular-heading"
            className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-200"
          >
            人気の入り口
          </h2>
          <span className="text-[11px] text-emerald-700/75 dark:text-emerald-300/65">
            よく読まれている入口を集めました
          </span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {popularEntries.map((entry) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-900/12 bg-white px-3 py-1.5 text-xs font-medium text-emerald-900 shadow-sm transition hover:border-emerald-600/35 hover:bg-emerald-50/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 dark:border-emerald-100/12 dark:bg-emerald-950 dark:text-emerald-50 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-900/70"
              >
                <span aria-hidden>{entry.emoji}</span>
                <span>{entry.label}</span>
                <span className="text-[10px] font-normal text-emerald-700/70 dark:text-emerald-300/65">
                  {entry.hint}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <HomeTopLead
        referenceIso={refIso}
        referenceLabel={refLabel}
        curated={curatedSpotlight}
        seasonal={seasonalBlock}
        otaVoiceLines={otaVoiceLines}
        otaOk={ota.ok}
      />

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
            .filter((item) => item.href !== "/about" && !themeCardHrefs.has(item.href))
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
