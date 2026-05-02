/** 野菜別ガイド上部のカラフルな装飾（オリジナル SVG） */
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
          <p className="mt-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/75">
            カードごとにイラストと色を変えています。イラストはサイトオリジナル（シンプル・フラット）です。
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-center gap-2 sm:gap-3" aria-hidden>
          <DecorCluster />
        </div>
      </div>
    </div>
  );
}

function DecorCluster() {
  return (
    <svg width="220" height="120" viewBox="0 0 220 120" className="drop-shadow-sm">
      <ellipse cx="110" cy="108" rx="72" ry="10" fill="#000" opacity="0.06" />
      {/* tomato */}
      <ellipse cx="52" cy="52" rx="22" ry="20" fill="#fb7185" />
      <path d="M46 34 Q52 30 58 34 L56 38 Q52 36 48 38Z" fill="#22c55e" />
      {/* carrot */}
      <path d="M138 72 Q156 84 174 72 Q166 52 156 38 Q146 52 138 72Z" fill="#fb923c" stroke="#ea580c" strokeWidth="1.2" />
      <path d="M148 38 L146 30 M156 36 L156 28 M164 38 L166 30" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      {/* broccoli-ish */}
      <circle cx="178" cy="44" r="14" fill="#4ade80" stroke="#166534" strokeWidth="1.2" />
      <circle cx="192" cy="52" r="11" fill="#22c55e" stroke="#14532d" strokeWidth="1.2" />
      <rect x="182" y="56" width="8" height="22" rx="2" fill="#86efac" stroke="#15803d" strokeWidth="1" />
      {/* grape bunch */}
      <circle cx="96" cy="78" r="9" fill="#a78bfa" />
      <circle cx="108" cy="74" r="9" fill="#8b5cf6" />
      <circle cx="102" cy="88" r="9" fill="#c4b5fd" />
      <path d="M102 62 L102 58" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" />
      {/* citrus */}
      <circle cx="34" cy="88" r="16" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
      <path d="M34 76 Q38 82 34 88 Q30 82 34 76" fill="#fef08a" opacity="0.7" />
    </svg>
  );
}
