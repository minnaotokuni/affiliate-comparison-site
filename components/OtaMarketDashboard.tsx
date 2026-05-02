import Link from "next/link";
import type { OtaDashboardPayload } from "@/lib/ota-market/service";

function Sparkline({ days }: { days: { date: string; mid: number | null; hasShipment: boolean }[] }) {
  const mids = days.map((d) => d.mid).filter((x): x is number => x != null);
  const max = mids.length ? Math.max(...mids) : 1;
  const min = mids.length ? Math.min(...mids) : 0;
  const span = Math.max(max - min, 1);
  return (
    <div className="flex h-10 items-end gap-0.5" aria-hidden>
      {days.map((d) => {
        const h = d.mid != null && d.hasShipment ? 8 + ((d.mid - min) / span) * 32 : 4;
        const tone =
          d.mid != null && d.hasShipment
            ? "bg-emerald-500/90 dark:bg-emerald-400/80"
            : "bg-emerald-900/15 dark:bg-emerald-100/15";
        return (
          <div key={d.date} className="flex w-2 flex-col justify-end" title={`${d.date}${d.mid != null ? ` ${d.mid}円` : ""}`}>
            <div className={`rounded-sm ${tone}`} style={{ height: `${h}px` }} />
          </div>
        );
      })}
    </div>
  );
}

export function OtaMarketDashboard({ data, id }: { data: OtaDashboardPayload; id?: string }) {
  return (
    <section
      id={id}
      className="mt-12 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/12 bg-white p-5 shadow-sm dark:border-emerald-100/12 dark:bg-emerald-950 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-900/10 pb-4 dark:border-emerald-100/10">
        <div>
          <h2 className="text-base font-semibold text-emerald-950 dark:text-emerald-50">大田市場・卸売参考（自動取得）</h2>
          <p className="mt-1 text-xs leading-relaxed text-emerald-800/85 dark:text-emerald-200/75">
            <span className="font-semibold text-emerald-950 dark:text-emerald-50">サイト基準日（日本時間）</span>
            ：{data.referenceDateLabel}
            {data.tradeDateLabel ? (
              <>
                {" "}
                ／ <span className="font-semibold">市況データの取引日</span>：{data.tradeDateLabel}
              </>
            ) : null}
          </p>
        </div>
        <Link
          href="https://www.tokyo-seika.co.jp/business/#souba"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-200"
        >
          東京青果（相場表ページ）
        </Link>
      </div>

      <div className="mt-4 rounded-xl bg-emerald-50/50 p-4 text-[11px] leading-relaxed text-emerald-900/88 dark:bg-emerald-900/25 dark:text-emerald-100/78">
        <p>
          数値は農林水産省「青果物市況情報」の公開データを、第三者API（
          <a href="https://www.cultivationdata.net/mc-web-api.html" className="underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
            cultivationdata.net
          </a>
          ）経由で<strong className="font-semibold">東京都中央卸売市場・大田（13310）</strong>
          として取得しています。<strong className="font-semibold">東京青果がPDFで公開している相場表とはレイアウト・タイミングが異なり、同一ではありません。</strong>
          価格は取引単位（量目・等級）により変動し、小売店の売価や契約価格を保証するものではありません。
        </p>
        <p className="mt-2">
          <strong className="font-semibold">週・月・年の比較</strong>はリポジトリ内{" "}
          <code className="rounded bg-white/80 px-1 py-0.5 text-[10px] dark:bg-emerald-950/80">data/ota-history.json</code>{" "}
          に蓄積されたスナップショットを使います。<code className="rounded bg-white/80 px-1 py-0.5 text-[10px] dark:bg-emerald-950/80">npm run ota:snapshot</code>{" "}
          を1日1回など定期実行するとグラフが埋まりやすくなります。
        </p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-[880px] w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-emerald-900/15 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-100/15 dark:text-emerald-300">
              <th className="py-2 pr-3">品目</th>
              <th className="py-2 pr-3">最新状況</th>
              <th className="py-2 pr-3">7日（基準日まで）</th>
              <th className="py-2 pr-3">月内の幅（保存分）</th>
              <th className="py-2 pr-3">蓄積履歴での位置</th>
              <th className="py-2">ミニ推移</th>
            </tr>
          </thead>
          <tbody className="text-emerald-950 dark:text-emerald-50">
            {data.rows.map((row) => {
              const label =
                row.status === "no_rows"
                  ? "出荷なし（データ行なし）"
                  : row.status === "no_shipment"
                    ? "出荷なし"
                    : row.live?.midWeighted != null
                      ? [
                          row.live.hiMax != null && row.live.loMin != null
                            ? `高 ${row.live.hiMax.toLocaleString()}／中 ${row.live.midWeighted.toLocaleString()}／安 ${row.live.loMin.toLocaleString()}円`
                            : `代表中値 ${row.live.midWeighted.toLocaleString()}円`,
                          `（入荷計約 ${row.live.volumeT}t・APIの取引単位ベース）`,
                        ].join("")
                      : "—";
              return (
                <tr key={row.config.id} className="border-b border-emerald-900/10 dark:border-emerald-100/10">
                  <td className="py-2.5 pr-3 align-top font-semibold">
                    {row.config.displayName}
                    <div className="mt-0.5 text-[10px] font-normal text-emerald-700/80 dark:text-emerald-300/70">{row.config.itemCode}</div>
                  </td>
                  <td className="max-w-[200px] py-2.5 pr-3 align-top leading-snug">{label}</td>
                  <td className="py-2.5 pr-3 align-top leading-snug text-emerald-900/90 dark:text-emerald-100/85">{row.weekSummary}</td>
                  <td className="py-2.5 pr-3 align-top leading-snug text-emerald-900/90 dark:text-emerald-100/85">{row.monthSummary}</td>
                  <td className="py-2.5 pr-3 align-top leading-snug text-emerald-900/90 dark:text-emerald-100/85">{row.yearSummary}</td>
                  <td className="py-2.5 align-top">
                    <Sparkline days={row.spark} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function OtaMarketDashboardError({
  message,
  referenceDateIso,
  referenceDateLabel,
  id,
}: {
  message: string;
  referenceDateIso: string;
  referenceDateLabel: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="mt-12 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-amber-500/30 bg-amber-50/40 p-5 text-sm text-amber-950 dark:border-amber-400/25 dark:bg-amber-950/30 dark:text-amber-100"
    >
      <p className="font-semibold">市況データを取得できませんでした</p>
      <p className="mt-2 text-xs leading-relaxed opacity-90">
        基準日（日本時間）:{" "}
        <time dateTime={referenceDateIso} className="font-medium">
          {referenceDateLabel}
        </time>
        <br />
        {message}
      </p>
    </section>
  );
}
