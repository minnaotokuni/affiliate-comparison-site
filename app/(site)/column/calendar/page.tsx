import type { Metadata } from "next";
import Link from "next/link";
import { AnchorSection } from "@/components/AnchorSection";
import { SeasonRibbon, type Season } from "@/components/illustrations";
import { InPageJumpButtons } from "@/components/InPageJumpButtons";
import { LegalNotice } from "@/components/LegalNotice";
import { PageHero } from "@/components/PageHero";
import {
  YEARLY_CALENDAR,
  monthLabel,
  yearlyCalendarSeasonSlugsForMonth,
  type YearlyCalendarItem,
  type YearlyCalendarMonth,
} from "@/lib/columns/yearly-calendar";
import { isoDateInJapan } from "@/lib/jst-date";

/** 月（1-12）から表示用の季節を返す（1-2月→winter, 3-5月→spring, 6-8月→summer, 9-11月→autumn, 12月→winter）。 */
function seasonForMonth(month: number): Season {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

/** 「いまの月」を JST で計算するため、ビルド時に固定しない */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "年間 旬カレンダー（家庭向け目安）",
  description:
    "野菜・果物の旬を月ごとに一覧でまとめたカレンダー。いまの月を強調表示して、買い物・献立の目安に使えます。",
};

const monthAnchor = (month: number): string => `cal-month-${month}`;

function ItemList({ items, color }: { items: readonly YearlyCalendarItem[]; color: "veg" | "fruit" }) {
  const tone =
    color === "veg"
      ? "border-emerald-500/35"
      : "border-amber-500/45";
  return (
    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/80">
      {items.map((item) => (
        <li key={item.name} className={`flex flex-col gap-0.5 border-l-2 ${tone} pl-3`}>
          <span className="font-medium text-emerald-950 dark:text-emerald-50">{item.name}</span>
          <span className="text-xs leading-relaxed text-emerald-900/80 dark:text-emerald-100/72">{item.hint}</span>
        </li>
      ))}
    </ul>
  );
}

function MonthCard({ data, isCurrent }: { data: YearlyCalendarMonth; isCurrent: boolean }) {
  const seasonSlugs = yearlyCalendarSeasonSlugsForMonth(data.month);
  return (
    <article
      id={monthAnchor(data.month)}
      className={[
        "scroll-mt-[var(--site-scroll-padding)] rounded-2xl border bg-white p-5 shadow-sm dark:bg-emerald-950 sm:p-6",
        isCurrent
          ? "border-emerald-600/40 ring-1 ring-emerald-500/30 dark:border-emerald-300/40"
          : "border-emerald-900/10 dark:border-emerald-100/10",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-emerald-900/8 pb-3 dark:border-emerald-100/10">
        <h2 className="text-xl font-semibold text-emerald-950 dark:text-emerald-50">
          {monthLabel(data.month)}
          {isCurrent ? (
            <span className="ml-2 rounded-full bg-emerald-700/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-800 align-middle dark:bg-emerald-400/15 dark:text-emerald-200">
              いま
            </span>
          ) : null}
        </h2>
        <p className="text-xs text-emerald-700 dark:text-emerald-300">{data.headline}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">{data.overview}</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            野菜（{data.vegetables.length}品）
          </p>
          <ItemList items={data.vegetables} color="veg" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">
            果物（{data.fruits.length}品）
          </p>
          <ItemList items={data.fruits} color="fruit" />
        </div>
      </div>
      {seasonSlugs.length > 0 ? (
        <p className="mt-5 text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">
          旬ナビでは、この月のおすすめ3品（
          <span className="font-medium text-emerald-900 dark:text-emerald-100">{seasonSlugs.join(" / ")}</span>
          ）を深掘りしています。
          <Link
            href="/column/season"
            className="ml-1 font-medium underline-offset-2 hover:underline"
          >
            旬ナビへ →
          </Link>
        </p>
      ) : null}
    </article>
  );
}

export default function CalendarColumnPage() {
  const refIso = isoDateInJapan();
  const currentMonth = Number(refIso.slice(5, 7)) || 1;
  const currentSeason = seasonForMonth(currentMonth);

  return (
    <article id="page-top" className="relative mx-auto w-full max-w-[40rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <InPageJumpButtons tocAnchorId="calendar-toc" />

      <PageHero
        eyebrow="Yearly calendar"
        title="年間 旬カレンダー（家庭向け目安）"
        description={
          <>
            <p>
              野菜・果物の旬を1月〜12月で一覧にしました。流通量・店頭での並びやすさを基準にした「家庭で使いやすい目安」です。
              産地・品種・特売・天候で前後するので、最終的には店頭の並び・値札もあわせて目安にしてください（日本時間の暦・
              <time dateTime={refIso} className="tabular-nums">
                {refIso}
              </time>
              基準）。
            </p>
            <p className="mt-3 text-xs leading-relaxed text-emerald-800/78 dark:text-emerald-200/68">
              いまの月（<strong className="font-semibold">{monthLabel(currentMonth)}</strong>）は強調して表示しています。下の「ジャンプ」から各月へ移動できます。
            </p>
          </>
        }
        illustration={
          <SeasonRibbon
            season={currentSeason}
            ariaLabel={`いまの季節（${monthLabel(currentMonth)}）のリボン`}
            className="h-auto w-[170px] sm:w-[190px]"
          />
        }
        tone="rose"
      />

      <details
        open
        id="calendar-toc"
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-8 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white/95 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/95 sm:p-5"
      >
        <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
          月ごとにジャンプ
        </summary>
        <nav aria-label="月ごとのジャンプ" className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs">
          {YEARLY_CALENDAR.map((m) => (
            <a
              key={m.month}
              href={`#${monthAnchor(m.month)}`}
              className={
                m.month === currentMonth
                  ? "rounded-full bg-emerald-700/12 px-2 py-1 font-semibold text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-50"
                  : "px-2 py-1 text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
              }
            >
              {monthLabel(m.month)}
            </a>
          ))}
        </nav>
      </details>

      <div className="relative z-10 mt-10 space-y-10">
        <LegalNotice title="旬カレンダーについて">
          {`掲載している月割は、流通量・店頭での並びやすさをイメージした家庭向けの目安です。\n産地・品種・天候・特売の状況で実際の旬は前後します。価格・在庫・効能を保証するものではありません。\n「いまの月」表示は日本時間（Asia/Tokyo）の暦に基づきます。`}
        </LegalNotice>

        <AnchorSection id="cal-current-month" className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            まずは「いまの月」から
          </p>
          <p className="text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">
            買い物の前にざっと目を通しておくと、店頭で迷ったときに役立ちます。下の{monthLabel(currentMonth)}カードがいまの月です。
          </p>
        </AnchorSection>

        <div className="space-y-8">
          {YEARLY_CALENDAR.map((m) => (
            <MonthCard key={m.month} data={m} isCurrent={m.month === currentMonth} />
          ))}
        </div>
      </div>
    </article>
  );
}
