import Link from "next/link";
import { primaryNav } from "@/lib/site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-emerald-900/10 bg-[color:rgb(255_255_255/0.85)] backdrop-blur-md dark:border-emerald-100/10 dark:bg-[color:rgb(15_23_17/0.88)]">
      <div className="mx-auto flex w-full max-w-[min(100%,100rem)] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700/80 dark:text-emerald-300/80">
            Market &amp; Season
          </span>
          <span className="mt-0.5 block text-lg font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">
            野菜・果物の旬と相場メモ
          </span>
        </Link>
        <nav aria-label="主要ナビゲーション" className="flex flex-wrap gap-2">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-emerald-900/10 bg-white px-3 py-1 text-xs font-medium text-emerald-900 transition hover:border-emerald-700/30 hover:bg-emerald-50 dark:border-emerald-100/10 dark:bg-emerald-950 dark:text-emerald-100 dark:hover:bg-emerald-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
