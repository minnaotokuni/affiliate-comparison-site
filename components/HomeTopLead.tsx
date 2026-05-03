import Link from "next/link";
import { VeggieIcon } from "@/components/VeggieIcon";
import { fruitSpotlights } from "@/lib/columns/fruit-spotlights";
import { marketHomePicks } from "@/lib/columns/market-home-picks";
import { profileBySlug } from "@/lib/columns/vegetable-profiles";
import { seasonDeepPicksForMonth } from "@/lib/columns/season-deep-picks";
import type { WeeklySpotlightCurated } from "@/lib/home/weekly-spotlight";
import {
  hrefForSeasonalPick,
  labelForSeasonalPick,
  type SeasonalPickBlock,
} from "@/lib/home/seasonal-picks";

const cardClass =
  "flex h-full flex-col rounded-2xl border border-emerald-900/12 bg-white p-5 shadow-sm transition hover:border-emerald-600/28 hover:shadow-md dark:border-emerald-100/12 dark:bg-emerald-950 dark:hover:border-emerald-400/22";

function ThreeProduceStrip({
  caption,
  items,
}: {
  caption: string;
  items: readonly { slug: string; name: string }[];
}) {
  return (
    <div className="mt-4 rounded-xl bg-gradient-to-br from-emerald-50/95 via-white to-amber-50/35 p-3 ring-1 ring-emerald-900/10 dark:from-emerald-950/80 dark:via-emerald-950/40 dark:to-orange-950/20 dark:ring-emerald-100/10">
      <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">{caption}</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex flex-col items-center rounded-lg bg-white/90 px-1.5 py-2 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-900/60 dark:ring-emerald-100/10"
          >
            <span className="flex size-12 items-center justify-center rounded-lg bg-emerald-50/90 dark:bg-emerald-950/50" aria-hidden>
              <VeggieIcon slug={item.slug} size={44} title={`${item.name}のイラスト`} />
            </span>
            <span className="mt-1.5 text-center text-[11px] font-bold leading-tight text-emerald-950 dark:text-emerald-50">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type Props = {
  referenceIso: string;
  referenceLabel: string;
  curated: WeeklySpotlightCurated | null;
  seasonal: SeasonalPickBlock;
  otaVoiceLines: string[];
  otaOk: boolean;
};

export function HomeTopLead({ referenceIso, referenceLabel, curated, seasonal, otaVoiceLines, otaOk }: Props) {
  const showCurated = curated != null && curated.lines.length > 0;
  const month = Number(referenceIso.slice(5, 7)) || 1;
  const seasonTriple = seasonDeepPicksForMonth(month).map((d) => ({ slug: d.slug, name: d.name }));
  const marketTriple = marketHomePicks.map((p) => ({ slug: p.slug, name: p.name }));

  return (
    <section
      id="top-lead"
      className="mt-10 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/12 bg-white p-5 shadow-sm dark:border-emerald-100/12 dark:bg-emerald-950 sm:p-6"
      aria-labelledby="top-lead-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-emerald-900/10 pb-4 dark:border-emerald-100/10">
        <div>
          <h2 id="top-lead-heading" className="text-base font-semibold text-emerald-950 dark:text-emerald-50">
            直近の相場からのおすすめ品 → 旬ナビ → 市況
          </h2>
          <p className="mt-1 text-xs text-emerald-800/85 dark:text-emerald-200/75">
            基準日（日本時間）{" "}
            <time dateTime={referenceIso} className="font-semibold tabular-nums">
              {referenceLabel}
            </time>
            。上からメインの相場コラム、旬、市況のひとことの順です。下の表は自動更新です。
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <div id="home-market-main" className="scroll-mt-[var(--site-scroll-padding)]">
          <Link href="/column/market" className={`${cardClass} block`}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-950 dark:text-emerald-50">
              直近の相場からのおすすめ品
              <span className="rounded-full bg-emerald-600/15 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200">
                メイン
              </span>
            </span>
            <span className="mt-2 block text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-200/72">
              このサイトのメインです。野菜はレシピ複数、果物はそのまま食べるヒント。週次で更新します。
            </span>
            <ThreeProduceStrip caption="おすすめ3品（例）" items={marketTriple} />
            <span className="mt-4 inline-block text-xs font-medium text-emerald-700 dark:text-emerald-300">開く →</span>
          </Link>
        </div>
        <div id="home-season-lead" className="scroll-mt-[var(--site-scroll-padding)]">
          <Link href="/column/season" className={`${cardClass} block`}>
            <span className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">旬ナビ</span>
            <span className="mt-2 block text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-200/72">
              いまおすすめ3品を深く書いたページ。ほかの果物は短いダイジェストへジャンプできます。
            </span>
            <ThreeProduceStrip caption={`${month}月のおすすめ3品（暦ベース）`} items={seasonTriple} />
            <span className="mt-4 inline-block text-xs font-medium text-emerald-700 dark:text-emerald-300">開く →</span>
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-emerald-900/10 bg-emerald-50/45 p-4 dark:border-emerald-100/10 dark:bg-emerald-900/25">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
          {showCurated ? "今週の耳寄り（運営メモ）" : "いまの時期の目安（自動・読み替え前提）"}
        </h3>

        {showCurated ? (
          <div className="mt-3 space-y-2 text-sm leading-relaxed text-emerald-950 dark:text-emerald-50">
            <p className="font-semibold">{curated.title}</p>
            <ul className="list-inside list-disc space-y-1 text-xs text-emerald-900/90 dark:text-emerald-100/85">
              {curated.lines.map((ln, i) => (
                <li key={i}>{ln}</li>
              ))}
            </ul>
            {(curated.vegetableSlugs?.length || curated.fruitSlugs?.length) ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {curated.vegetableSlugs?.map((slug) => (
                  <Link
                    key={slug}
                    href={`/column/vegetables#${slug}`}
                    className="inline-flex items-center gap-1 rounded-full border border-emerald-900/15 bg-white px-2.5 py-1 text-[11px] font-medium text-emerald-900 dark:border-emerald-100/15 dark:bg-emerald-950 dark:text-emerald-50"
                  >
                    <VeggieIcon slug={slug} size={18} title="" />
                    {profileBySlug(slug)?.name ?? slug}
                  </Link>
                ))}
                {curated.fruitSlugs?.map((slug) => (
                  <Link
                    key={slug}
                    href={`/column/season#fruit-${slug}`}
                    className="inline-flex items-center gap-1 rounded-full border border-amber-900/20 bg-white px-2.5 py-1 text-[11px] font-medium text-amber-950 dark:border-amber-100/20 dark:bg-emerald-950 dark:text-amber-100"
                  >
                    <VeggieIcon slug={slug} size={18} title="" />
                    {fruitSpotlights.find((x) => x.slug === slug)?.name ?? slug}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-3 text-xs leading-relaxed text-emerald-900/88 dark:text-emerald-100/82">
            <p>{seasonal.intro}</p>
            <p className="mt-2 text-emerald-800/80 dark:text-emerald-200/72">
              週次メモを載せるときは <code className="rounded bg-white/90 px-1 py-0.5 text-[10px] dark:bg-emerald-950/90">data/weekly-spotlight.json</code>{" "}
              に掲載期間と本文を書きます。期限外は古い文を出さず、いつもこのように暦ベースの例を表示します。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[...new Map(seasonal.picks.map((p) => [hrefForSeasonalPick(p), p])).values()].map((ref) => (
                <Link
                  key={`${ref.kind}-${ref.slug}`}
                  href={hrefForSeasonalPick(ref)}
                  className="inline-flex items-center gap-1 rounded-full border border-emerald-900/12 bg-white px-2.5 py-1 text-[11px] font-medium text-emerald-900 dark:border-emerald-100/12 dark:bg-emerald-950 dark:text-emerald-50"
                >
                  <VeggieIcon slug={ref.slug} size={18} title="" />
                  {labelForSeasonalPick(ref)}
                  <span className="text-[10px] opacity-70">{ref.kind === "fruit" ? "果" : "野"}</span>
                </Link>
              ))}
            </div>
            {(seasonal.extraVegetableNames.length > 0 || seasonal.extraFruitNames.length > 0) ? (
              <p className="mt-3 text-[11px] text-emerald-800/78 dark:text-emerald-200/68">
                ほか例：野菜 {seasonal.extraVegetableNames.join("・")}
                {seasonal.extraFruitNames.length > 0 ? `／果物 ${seasonal.extraFruitNames.join("・")}` : ""}
                （ガイド未掲載の名前はリンクなし）
              </p>
            ) : null}
          </div>
        )}
      </div>

      <div
        id="home-market-voice"
        className="mt-6 scroll-mt-[var(--site-scroll-padding)] rounded-xl border border-sky-900/10 bg-sky-50/40 p-4 dark:border-sky-100/10 dark:bg-sky-950/20"
      >
        <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-900 dark:text-sky-200">
          市況のひとこと（大田・推移データベース）
        </h3>
        {!otaOk ? (
          <p className="mt-2 text-xs text-emerald-800/80 dark:text-emerald-200/72">市況データを取得できなかったため、要点を表示できません。</p>
        ) : otaVoiceLines.length === 0 ? (
          <p className="mt-2 text-xs text-emerald-800/80 dark:text-emerald-200/72">
            いま強いメッセージを作れるほどの差がまだ出ていません。下の「大田」表とグラフも参照してください。
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-emerald-950 dark:text-emerald-50">
            {otaVoiceLines.map((ln, i) => (
              <li key={i}>{ln}</li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[10px] leading-relaxed text-emerald-800/75 dark:text-emerald-200/65">
          買い物単位に近い目安は、下の<strong className="font-semibold">東京都日報ブロック</strong>（1個・100g など）もあわせてどうぞ。
        </p>
      </div>

      <nav className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-xs" aria-label="この下の市況テーブルへ">
        <span className="font-semibold text-emerald-800 dark:text-emerald-200">市況テーブル（自動更新）へ：</span>
        <a href="#market-ota" className="font-medium text-emerald-900 underline-offset-4 hover:underline dark:text-emerald-100">
          大田（API・推移）
        </a>
        <span className="text-emerald-500/50" aria-hidden>
          ·
        </span>
        <a href="#market-shijou-sei" className="font-medium text-sky-950 underline-offset-4 hover:underline dark:text-sky-100">
          相場目安（都日報・1個換算）
        </a>
      </nav>
    </section>
  );
}
