import Image from "next/image";

/** 野菜別ガイド上部の見出しエリア（キャッチ＋メインビジュアル） */
export function VegetableGuideHero() {
  return (
    <div className="relative mt-6 overflow-hidden rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-6 shadow-inner dark:border-emerald-100/10 dark:from-emerald-950 dark:via-orange-950/40 dark:to-rose-950/35 sm:p-8">
      <div className="pointer-events-none absolute -left-6 -top-6 size-28 rounded-full bg-yellow-300/40 blur-2xl dark:bg-yellow-400/15" aria-hidden />
      <div className="pointer-events-none absolute -bottom-8 -right-4 size-36 rounded-full bg-rose-400/30 blur-2xl dark:bg-rose-500/15" aria-hidden />
      <div className="pointer-events-none absolute right-1/4 top-4 size-20 rounded-full bg-lime-300/35 blur-xl dark:bg-lime-400/10" aria-hidden />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-800/80 dark:text-orange-200/80">Colorful produce</p>
          <p className="mt-2 text-lg font-semibold leading-snug text-emerald-950 dark:text-emerald-50">
            野菜・果物のキホンを、ちょっと楽しくチェック
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-center lg:max-w-[min(100%,26rem)]" aria-hidden>
          <Image
            src="/produce-art/hero-produce-plate.png"
            alt=""
            width={1024}
            height={558}
            className="h-auto w-full rounded-2xl object-contain shadow-md ring-1 ring-emerald-900/10 dark:ring-emerald-100/15"
            sizes="(max-width: 1024px) 100vw, 416px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
