/**
 * グローバル loading UI。ルートセグメントのサスペンス境界で表示される。
 * - aria-live で支援技術に読み込み中を伝える。
 * - 見た目は emerald 系のやさしいスケルトン + ローディング文言。
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-16 sm:px-6"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-block size-3 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400"
        />
        <span className="text-sm font-medium text-emerald-900/90 dark:text-emerald-100/90">
          読み込み中…
        </span>
      </div>

      <div
        aria-hidden
        className="space-y-3 rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm shadow-emerald-900/5 dark:border-emerald-100/10 dark:bg-emerald-950 dark:shadow-black/30"
      >
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-emerald-100/80 dark:bg-emerald-900/60" />
        <div className="h-4 w-full animate-pulse rounded-full bg-emerald-100/70 dark:bg-emerald-900/55" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-emerald-100/60 dark:bg-emerald-900/50" />
      </div>

      <p className="text-[11px] leading-relaxed text-emerald-800/70 dark:text-emerald-200/65">
        ページデータを取得しています。しばらくそのままお待ちください。
      </p>
    </div>
  );
}
