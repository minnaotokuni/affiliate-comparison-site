"use client";

import Link from "next/link";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * ルートのエラーバウンダリ。Next.js が `error` と `reset` を渡してくる。
 * - "use client" 必須（App Router の仕様）。
 * - 開発環境ではコンソールに詳細を残す。
 * - ユーザーには短い説明 + 再試行 + ホームへの導線を提示する。
 */
export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[app/error.tsx] unhandled error:", error);
    }
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-20">
      <section className="relative overflow-hidden rounded-3xl border border-rose-900/10 bg-white px-6 py-8 shadow-sm shadow-rose-900/5 dark:border-rose-100/10 dark:bg-emerald-950 dark:shadow-black/30 sm:px-10 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-rose-300/25 blur-3xl dark:bg-rose-500/10"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700 dark:text-rose-300">
          Something went wrong
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-3xl">
          ページの表示中に問題が発生しました。
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-800/90 dark:text-emerald-200/85">
          一時的な通信エラーの可能性があります。もう一度読み込むか、しばらく時間を置いてお試しください。
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-[11px] text-emerald-700/70 dark:text-emerald-300/60">
            エラーID: {error.digest}
          </p>
        ) : null}
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-full border border-emerald-700/40 bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-900/20 transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 dark:border-emerald-300/40 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300"
        >
          もう一度読み込む
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-emerald-900/10 bg-white px-5 py-2 text-sm font-medium text-emerald-900 transition hover:border-emerald-700/30 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:border-emerald-100/10 dark:bg-emerald-950 dark:text-emerald-50 dark:hover:bg-emerald-900"
        >
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
