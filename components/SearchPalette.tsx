"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import {
  filterSiteSearch,
  siteSearchIndex,
  type SiteSearchEntry,
} from "@/lib/site-search-index";

type Props = {
  className?: string;
};

const NO_HIT_HINT =
  "うまく見つからないときは “旬” “保存” “選び方” などで探してみてください";

/**
 * ヘッダー右上の虫眼鏡ボタン。クリックでサイト内検索モーダルを開く。
 * - Esc / オーバーレイクリックで閉じる。
 * - 入力に応じて `siteSearchIndex` を部分一致フィルタ。
 * - a11y: role="dialog", aria-modal="true", aria-label="サイト内検索"
 */
export function SearchPalette({ className }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 30);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results: readonly SiteSearchEntry[] = useMemo(
    () => filterSiteSearch(query),
    [query],
  );

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const isEmptyHit = query.trim().length > 0 && results.length === 0;

  return (
    <>
      <button
        type="button"
        aria-label="サイト内検索を開く"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={[
          "inline-flex size-10 items-center justify-center rounded-full border border-emerald-900/15 bg-white text-emerald-900 transition hover:border-emerald-700/30 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 dark:border-emerald-100/15 dark:bg-emerald-950 dark:text-emerald-50 dark:hover:bg-emerald-900",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          <circle
            cx="11"
            cy="11"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="m20 20-3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="サイト内検索"
          className="fixed inset-0 z-40 flex items-start justify-center px-4 pt-16 sm:pt-24"
        >
          <button
            type="button"
            aria-label="検索を閉じる"
            onClick={() => setOpen(false)}
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-emerald-950/55 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-2xl shadow-black/25 dark:border-emerald-100/10 dark:bg-emerald-950">
            <div className="flex items-center gap-2 border-b border-emerald-900/10 px-4 py-3 dark:border-emerald-100/10">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                className="shrink-0 text-emerald-700 dark:text-emerald-300"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m20 20-3.5-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={handleQueryChange}
                placeholder="旬・保存・選び方 など"
                aria-label="サイト内のキーワード"
                aria-controls={listboxId}
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent py-1 text-sm text-emerald-950 placeholder:text-emerald-700/50 focus:outline-none dark:text-emerald-50 dark:placeholder:text-emerald-300/50"
              />
              <button
                type="button"
                aria-label="検索を閉じる"
                onClick={() => setOpen(false)}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-emerald-900 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 dark:text-emerald-50 dark:hover:bg-emerald-900"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              </button>
            </div>

            <div
              id={listboxId}
              role="listbox"
              aria-label="検索結果"
              className="max-h-[60vh] overflow-y-auto px-2 py-2"
            >
              {isEmptyHit ? (
                <p className="px-3 py-6 text-center text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">
                  {NO_HIT_HINT}
                </p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {results.map((entry) => (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        role="option"
                        aria-selected={false}
                        onClick={() => setOpen(false)}
                        className="flex flex-col gap-0.5 rounded-xl border border-transparent px-3 py-2.5 text-sm transition hover:border-emerald-900/10 hover:bg-emerald-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 dark:hover:border-emerald-100/10 dark:hover:bg-emerald-900/60"
                      >
                        <span className="font-semibold text-emerald-950 dark:text-emerald-50">
                          {entry.label}
                        </span>
                        <span className="text-[11px] leading-snug text-emerald-800/75 dark:text-emerald-200/65">
                          {entry.description}
                        </span>
                        <span className="text-[10px] font-medium text-emerald-700/70 dark:text-emerald-300/65">
                          {entry.href}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-emerald-900/10 px-4 py-2 text-[10px] text-emerald-700/70 dark:border-emerald-100/10 dark:text-emerald-300/65">
              候補: {siteSearchIndex.length} ページ。Esc または外側クリックで閉じます。
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
