import Link from "next/link";
import { VeggieIcon } from "@/components/VeggieIcon";
import { marketHomePicks } from "@/lib/columns/market-home-picks";

function trendPillClass(label: string) {
  if (label.includes("高め")) {
    return "bg-rose-100 text-rose-900 ring-rose-200 dark:bg-rose-950/60 dark:text-rose-100 dark:ring-rose-800/50";
  }
  if (label.includes("安め") || label.includes("おすすめ")) {
    return "bg-lime-100 text-lime-950 ring-lime-200 dark:bg-lime-950/50 dark:text-lime-100 dark:ring-lime-800/40";
  }
  return "bg-amber-100 text-amber-950 ring-amber-200 dark:bg-amber-950/45 dark:text-amber-100 dark:ring-amber-800/40";
}

type Props = {
  label: string;
  description: string;
};

export function HomeMarketCardLink({ label, description }: Props) {
  return (
    <Link
      href="/column/market"
      className="flex h-full flex-col rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm transition hover:border-emerald-600/25 hover:shadow-md dark:border-emerald-100/10 dark:bg-emerald-950 dark:hover:border-emerald-400/20"
    >
      <span className="text-base font-semibold text-emerald-950 dark:text-emerald-50">{label}</span>
      <span className="mt-2 text-sm leading-relaxed text-emerald-800/75 dark:text-emerald-100/65">{description}</span>

      <div className="mt-4 rounded-xl bg-gradient-to-br from-emerald-50/95 via-white to-amber-50/40 p-3 ring-1 ring-emerald-900/10 dark:from-emerald-950/80 dark:via-emerald-950/40 dark:to-orange-950/25 dark:ring-emerald-100/10">
        <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
          相場からのおすすめ（野菜の例）
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {marketHomePicks.map((pick) => (
            <div
              key={pick.slug}
              className="flex flex-col items-center rounded-lg bg-white/90 px-1.5 py-2 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-900/60 dark:ring-emerald-100/10"
            >
              <span className="flex size-12 items-center justify-center rounded-lg bg-emerald-50/90 dark:bg-emerald-950/50" aria-hidden>
                <VeggieIcon slug={pick.slug} size={44} title={`${pick.name}のイラスト`} />
              </span>
              <span className="mt-1.5 text-center text-[11px] font-bold leading-tight text-emerald-950 dark:text-emerald-50">
                {pick.name}
              </span>
              <span
                className={`mt-1 rounded-full px-2 py-0.5 text-[9px] font-bold ring-1 ${trendPillClass(pick.trendLabel)}`}
              >
                {pick.trendLabel}
              </span>
              <span className="mt-1.5 text-center text-[9px] font-semibold leading-snug text-emerald-900 dark:text-emerald-100">
                店頭の目安
              </span>
              <span className="mt-0.5 text-center text-[9px] leading-snug text-emerald-800/90 dark:text-emerald-200/80">
                {pick.retailHint}
              </span>
              <span className="mt-1.5 line-clamp-2 text-center text-[8px] leading-snug text-emerald-700/75 dark:text-emerald-300/65">
                {pick.movementNote}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[9px] leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">
          果物は記事内で「そのまま食べる」ヒントのみ（キウイ・春柑橘など）。金額は参考です。
        </p>
        <p className="mt-2 text-center text-[8px] leading-relaxed text-emerald-700/70 dark:text-emerald-300/55">
          食べ方・栄養の詳細は「野菜別ガイド」でどうぞ。
        </p>
      </div>

      <span className="mt-4 text-xs font-medium text-emerald-700 dark:text-emerald-300">読む →</span>
    </Link>
  );
}
