"use client";

type Props = {
  tocAnchorId?: string;
};

/** 長いコラム用：もくじ・ページ先頭へのショートカット */
export function InPageJumpButtons({ tocAnchorId }: Props) {
  return (
    <div
      className="pointer-events-none fixed bottom-5 right-4 z-30 flex flex-col items-end gap-2 sm:bottom-8 sm:right-6"
      aria-label="ページ内ジャンプ"
    >
      {tocAnchorId ? (
        <a
          href={`#${tocAnchorId}`}
          className="pointer-events-auto rounded-full border border-emerald-900/15 bg-white/95 px-3 py-2 text-xs font-medium text-emerald-900 shadow-md backdrop-blur-sm transition hover:bg-emerald-50 dark:border-emerald-100/15 dark:bg-emerald-950/95 dark:text-emerald-100 dark:hover:bg-emerald-900"
        >
          もくじへ
        </a>
      ) : null}
      <a
        href="#page-top"
        className="pointer-events-auto rounded-full border border-emerald-900/15 bg-white/95 px-3 py-2 text-xs font-medium text-emerald-900 shadow-md backdrop-blur-sm transition hover:bg-emerald-50 dark:border-emerald-100/15 dark:bg-emerald-950/95 dark:text-emerald-100 dark:hover:bg-emerald-900"
      >
        ページ上へ
      </a>
    </div>
  );
}
