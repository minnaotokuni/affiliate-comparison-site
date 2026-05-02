import Link from "next/link";
import { Fragment } from "react";
import type { SeiCsvLineSummary, SeiItemRetailRow, ShijouSeiDashboardPayload } from "@/lib/shijou-nippo/types";
import { seiZenIndexUrl } from "@/lib/shijou-nippo/url";

function yenCell(v: number | null): string {
  return v != null ? `${v.toLocaleString()}円` : "—";
}

function linePriceCell(y: number | null): string {
  return y != null ? y.toLocaleString() : "—";
}

function pieceHintCell(row: SeiItemRetailRow): string {
  if (row.typicalPieceGrams == null || row.typicalPieceUnitLabel == null) return "—";
  const yen =
    row.wholesaleYenForTypicalPiece != null ? `卸ベースで約${row.wholesaleYenForTypicalPiece.toLocaleString()}円分` : "—";
  return `約${row.typicalPieceGrams}g（${row.typicalPieceUnitLabel}）／${yen}`;
}

function CsvLinesDetail({ lines }: { lines: SeiCsvLineSummary[] }) {
  if (lines.length === 0) return <p className="text-[11px] text-emerald-700/80 dark:text-emerald-300/70">該当する日報行がありません。</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-sky-900/10 bg-white/90 dark:border-sky-100/10 dark:bg-emerald-950/80">
      <table className="w-full min-w-[640px] border-collapse text-left text-[11px]">
        <thead>
          <tr className="border-b border-sky-900/10 bg-sky-50/80 text-[10px] font-semibold text-sky-900 dark:border-sky-100/10 dark:bg-sky-950/40 dark:text-sky-200">
            <th className="py-1.5 pl-2 pr-2">販売方法</th>
            <th className="py-1.5 pr-2">品種</th>
            <th className="py-1.5 pr-2">産地</th>
            <th className="py-1.5 pr-2">単位(kg)</th>
            <th className="py-1.5 pr-2">卸売数量</th>
            <th className="py-1.5 pr-2">高(円)</th>
            <th className="py-1.5 pr-2">中(円)</th>
            <th className="py-1.5 pr-2">安(円)</th>
          </tr>
        </thead>
        <tbody className="text-emerald-950 dark:text-emerald-50">
          {lines.map((ln, i) => (
            <tr key={i} className="border-b border-emerald-900/8 dark:border-emerald-100/8">
              <td className="py-1.5 pl-2 pr-2 align-top">{ln.saleMethod || "—"}</td>
              <td className="py-1.5 pr-2 align-top">{ln.variety || "—"}</td>
              <td className="py-1.5 pr-2 align-top">{ln.origin || "—"}</td>
              <td className="py-1.5 pr-2 align-top tabular-nums">{ln.unitKg != null ? ln.unitKg : "—"}</td>
              <td className="py-1.5 pr-2 align-top tabular-nums">{ln.volume != null ? ln.volume.toLocaleString() : "—"}</td>
              <td className="py-1.5 pr-2 align-top tabular-nums">{linePriceCell(ln.highYen)}</td>
              <td className="py-1.5 pr-2 align-top tabular-nums">{linePriceCell(ln.midYen)}</td>
              <td className="py-1.5 pr-2 align-top tabular-nums">{linePriceCell(ln.lowYen)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-sky-900/10 px-2 py-2 text-[10px] leading-relaxed text-emerald-800/85 dark:border-sky-100/10 dark:text-emerald-200/75">
        価格は日報CSVの「取引単位（単位列のキロ）あたりの円」のままです。行によって高・中・安の欠損（−）があります。
      </p>
    </div>
  );
}

export function ShijouSeiDashboard({ data, id }: { data: ShijouSeiDashboardPayload; id?: string }) {
  const zenUrl = seiZenIndexUrl(data.requestedDateIso);

  return (
    <section
      id={id}
      className="mt-12 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-sky-900/12 bg-white p-5 shadow-sm dark:border-sky-100/12 dark:bg-emerald-950 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-sky-900/10 pb-4 dark:border-sky-100/10">
        <div>
          <h2 className="text-base font-semibold text-emerald-950 dark:text-emerald-50">
            東京都・青果の卸売参考（1kgあたりの円＋代表重量からの換算）
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-emerald-800/85 dark:text-emerald-200/75">
            リクエスト日（URL・基準日）:{" "}
            <time dateTime={data.requestedDateIso} className="font-semibold">
              {data.requestedDateIso}
            </time>
            {data.reportDateLabel ? (
              <>
                {" "}
                ／ CSV表記の取引日: <span className="font-semibold">{data.reportDateLabel}</span>
              </>
            ) : null}
            {data.referenceMismatch ? (
              <span className="ml-1 text-amber-800 dark:text-amber-200">（表記とURL日付が一致しません）</span>
            ) : null}
          </p>
        </div>
        <Link
          href={zenUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-sky-800 underline-offset-4 hover:underline dark:text-sky-200"
        >
          全市場インデックス（日報）
        </Link>
      </div>

      <div className="mt-4 rounded-xl bg-sky-50/60 p-4 text-[11px] leading-relaxed text-emerald-950/90 dark:bg-sky-950/25 dark:text-emerald-100/78">
        <p>
          <strong className="font-semibold">メインは「1kgあたりいくら（卸の参考）」</strong>です。東京都「
          <a href={zenUrl} className="underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
            デジタル市場日報
          </a>
          」の Sei_K1〜K9 CSV を読み、高・中・安を単位キロで割って<strong className="font-semibold">卸売数量で加重平均</strong>した値です。
        </p>
        <p className="mt-2">
          <strong className="font-semibold">「約○g → 卸ベースで約○円分」</strong>は、一般的な1個・1本の<strong className="font-semibold">目安グラム</strong>に、
          その行の<strong className="font-semibold">卸の円/kg（中値ベース）</strong>を掛けただけです。
          <strong className="font-semibold">スーパーの値札・税込・特売は店によって決まり、この数字では表せません。</strong>
        </p>
        <p className="mt-2">
          キャベツの M/L/2L は玉の目安重量（kg）だけ変えて同じ計算です（品種欄にサイズが無い日は全体平均の円/kgを流用）。
        </p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-[1120px] w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-sky-900/15 text-[10px] font-semibold uppercase tracking-wide text-sky-800 dark:border-sky-100/15 dark:text-sky-300">
              <th className="py-2 pr-3">市場</th>
              <th className="py-2 pr-3">品目</th>
              <th className="py-2 pr-3">サイズ</th>
              <th className="py-2 pr-3">卸高（円/kg）</th>
              <th className="py-2 pr-3">卸中（円/kg）</th>
              <th className="py-2 pr-3">卸安（円/kg）</th>
              <th className="py-2 pr-3 max-w-[260px]">代表重量→卸ベース（店頭ではない）</th>
              <th className="py-2 max-w-[160px]">集計メモ</th>
            </tr>
          </thead>
          <tbody className="text-emerald-950 dark:text-emerald-50">
            {data.rows.map((row, idx) => (
              <Fragment key={`${row.marketId}-${row.itemName}-${row.cabbageSize ?? "x"}-${idx}`}>
                <tr className="border-b border-emerald-900/10 dark:border-emerald-100/10">
                  <td className="py-2.5 pr-3 align-top font-semibold">{row.marketLabel}</td>
                  <td className="py-2.5 pr-3 align-top">{row.itemName}</td>
                  <td className="py-2.5 pr-3 align-top tabular-nums">{row.cabbageSize ?? "—"}</td>
                  <td className="py-2.5 pr-3 align-top tabular-nums">{yenCell(row.wholesaleHighYenPerKg)}</td>
                  <td className="py-2.5 pr-3 align-top tabular-nums">{yenCell(row.wholesaleMidYenPerKg)}</td>
                  <td className="py-2.5 pr-3 align-top tabular-nums">{yenCell(row.wholesaleLowYenPerKg)}</td>
                  <td className="max-w-[260px] py-2.5 pr-3 align-top text-[11px] leading-snug">{pieceHintCell(row)}</td>
                  <td className="max-w-[160px] py-2.5 align-top text-[10px] leading-snug text-emerald-800/88 dark:text-emerald-200/75">{row.detailNote}</td>
                </tr>
                <tr className="border-b border-emerald-900/15 bg-sky-50/40 dark:border-emerald-100/15 dark:bg-emerald-950/60">
                  <td className="px-3 py-3" colSpan={8}>
                    <details className="group">
                      <summary className="cursor-pointer select-none text-xs font-semibold text-sky-900 underline decoration-sky-700/30 underline-offset-2 hover:decoration-sky-700 dark:text-sky-100 dark:decoration-sky-300/30">
                        日報の詳しい行（数量が多い順・最大6件）
                      </summary>
                      <div className="mt-3">
                        <CsvLinesDetail lines={row.csvTopLines} />
                      </div>
                    </details>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ShijouSeiDashboardError({
  message,
  requestedDateIso,
  id,
}: {
  message: string;
  requestedDateIso: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="mt-12 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-amber-500/25 bg-amber-50/35 p-5 text-sm text-amber-950 dark:border-amber-400/20 dark:bg-amber-950/25 dark:text-amber-100"
    >
      <p className="font-semibold">東京都デジタル市場日報（青果・各市場CSV）を取得できませんでした</p>
      <p className="mt-2 text-xs leading-relaxed opacity-90">
        基準日: <time dateTime={requestedDateIso}>{requestedDateIso}</time>
        <br />
        {message}
      </p>
      <Link
        href={seiZenIndexUrl(requestedDateIso)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-xs font-medium text-amber-900 underline-offset-4 hover:underline dark:text-amber-200"
      >
        全市場インデックスを開く →
      </Link>
    </section>
  );
}
