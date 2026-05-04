import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  description:
    "お探しのページは見つかりませんでした。ホーム・直近の相場・旬ナビ・年間 旬カレンダーからお選びください。",
  robots: { index: false, follow: true },
};

type QuickLink = {
  href: string;
  label: string;
  description: string;
};

const QUICK_LINKS: readonly QuickLink[] = [
  {
    href: "/",
    label: "ホームに戻る",
    description: "直近の相場おすすめ・旬ナビ・市況ダッシュボード",
  },
  {
    href: "/column/market",
    label: "直近の相場からのおすすめ品",
    description: "サイトのメイン。旬と相場から今買いの品をピックアップ",
  },
  {
    href: "/column/season",
    label: "旬ナビ",
    description: "今のおすすめ3品を深く。ほかの果物は短いダイジェストへ",
  },
  {
    href: "/column/calendar",
    label: "年間 旬カレンダー",
    description: "月別の旬野菜・果物の目安を早見",
  },
];

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-20">
      <section className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-white px-6 py-8 shadow-sm shadow-emerald-900/5 dark:border-emerald-100/10 dark:bg-emerald-950 dark:shadow-black/30 sm:px-10 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-500/10"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
          404 — Not Found
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-3xl">
          お探しのページは見つかりませんでした。
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-800/90 dark:text-emerald-200/85">
          アドレスが変更されたか、ページが取り下げられた可能性があります。
          下のリンクから、よく見られているページへ移動してください。
        </p>
      </section>

      <nav
        aria-label="主要ページへの導線"
        className="grid gap-3 sm:grid-cols-2"
      >
        {QUICK_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col gap-1 rounded-2xl border border-emerald-900/10 bg-white px-4 py-3.5 text-sm transition hover:border-emerald-700/30 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:border-emerald-100/10 dark:bg-emerald-950 dark:hover:border-emerald-300/30 dark:hover:bg-emerald-900"
          >
            <span className="font-semibold text-emerald-950 dark:text-emerald-50">
              {item.label}
            </span>
            <span className="text-[11px] leading-snug text-emerald-800/80 dark:text-emerald-200/70">
              {item.description}
            </span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
