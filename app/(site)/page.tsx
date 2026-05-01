import Link from "next/link";
import { LegalNotice } from "@/components/LegalNotice";
import { pharmaRelatedDisclaimer } from "@/lib/legal-copy";
import { primaryNav } from "@/lib/site-nav";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-6 pt-10 sm:px-6 lg:max-w-4xl lg:px-8 lg:pt-14">
      <div className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-white px-6 py-10 shadow-sm shadow-emerald-900/5 dark:border-emerald-100/10 dark:bg-emerald-950 dark:shadow-black/30 sm:px-10">
        <div
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-500/10"
          aria-hidden
        />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">
          Personal produce desk
        </p>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-4xl">
          現場の勘とデータを、仕事と副業のあいだで整理する。
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-emerald-900/75 dark:text-emerald-100/70">
          卸・小売・催事の経験から拾った「旬」「相場の感触」「選び方」を記録しています。
          一般論と個人メモの境目をはっきりさせ、薬事・景表のラインを越えない言い方に整えています。
        </p>
        <div className="mt-8 max-w-xl">
          <LegalNotice title="健康・効果に関する表現について">
            {pharmaRelatedDisclaimer.trim()}
          </LegalNotice>
        </div>
      </div>

      <section className="mt-14" aria-labelledby="sections-heading">
        <h2 id="sections-heading" className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
          コンテンツ一覧
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {primaryNav
            .filter((item) => item.href !== "/about")
            .map((item) => (
              <li key={item.href}>
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
