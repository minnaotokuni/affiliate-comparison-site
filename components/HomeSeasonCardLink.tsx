import Link from "next/link";
import { VeggieIcon } from "@/components/VeggieIcon";
import { seasonHomePicks } from "@/lib/columns/season-home-picks";

function kindPillClass(kind: "野菜" | "果物") {
  if (kind === "果物") {
    return "bg-amber-100 text-amber-950 ring-amber-200 dark:bg-amber-950/55 dark:text-amber-100 dark:ring-amber-800/45";
  }
  return "bg-emerald-100 text-emerald-950 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-100 dark:ring-emerald-800/40";
}

type Props = {
  label: string;
  description: string;
};

export function HomeSeasonCardLink({ label, description }: Props) {
  return (
    <Link
      href="/column/season"
      className="flex h-full flex-col rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm transition hover:border-emerald-600/25 hover:shadow-md dark:border-emerald-100/10 dark:bg-emerald-950 dark:hover:border-emerald-400/20"
    >
      <span className="text-base font-semibold text-emerald-950 dark:text-emerald-50">{label}</span>
      <span className="mt-2 text-sm leading-relaxed text-emerald-800/75 dark:text-emerald-100/65">{description}</span>

      <div className="mt-4 rounded-xl bg-gradient-to-br from-sky-50/90 via-white to-emerald-50/50 p-3 ring-1 ring-emerald-900/10 dark:from-emerald-950/85 dark:via-emerald-950/45 dark:to-sky-950/20 dark:ring-emerald-100/10">
        <p className="text-center text-[10px] font-semibold tracking-wide text-emerald-700 dark:text-emerald-300">
          いま旬・これから旬が来る野菜・果物（例）
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {seasonHomePicks.map((pick) => (
            <div
              key={pick.slug}
              className="flex flex-col items-center rounded-lg bg-white/90 px-1.5 py-2 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-900/60 dark:ring-emerald-100/10"
            >
              <span className="flex size-12 items-center justify-center rounded-lg bg-emerald-50/90 dark:bg-emerald-950/50" aria-hidden>
                <VeggieIcon slug={pick.slug} size={44} title={`${pick.name}のイラスト`} />
              </span>
              <span
                className={`mt-1.5 rounded-full px-2 py-0.5 text-[8px] font-bold ring-1 ${kindPillClass(pick.kind)}`}
              >
                {pick.kind}
              </span>
              <span className="mt-1 text-center text-[11px] font-bold leading-tight text-emerald-950 dark:text-emerald-50">{pick.name}</span>
              <span className="mt-1.5 line-clamp-4 text-center text-[9px] leading-snug text-emerald-800/85 dark:text-emerald-200/75">
                {pick.deliciousNote}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[8px] leading-relaxed text-emerald-700/70 dark:text-emerald-300/55">
          旬のピークは産地・品種・年で前後します。店頭の産地表示や並びとあわせて読み替えてください。
        </p>
      </div>

      <span className="mt-4 text-xs font-medium text-emerald-700 dark:text-emerald-300">読む →</span>
    </Link>
  );
}
