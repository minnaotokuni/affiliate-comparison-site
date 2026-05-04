"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { primaryNav } from "@/lib/site-nav";

type Props = {
  /** モバイル専用にしたい場合に外側から渡す表示制御クラス（例: "md:hidden"）。 */
  className?: string;
};

/**
 * 狭い画面用のハンバーガー → ドロワー。Esc / オーバーレイクリックで閉じる。
 * SiteHeader (Server Component) から子として呼び出される想定。
 */
export function MobileNavToggle({ className }: Props) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="メニューを開く"
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
          width="20"
          height="20"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            d="M4 7h16M4 12h16M4 17h16"
          />
        </svg>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-40 flex"
        >
          <button
            type="button"
            aria-label="メニューを閉じる"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-emerald-950/55 backdrop-blur-sm"
            tabIndex={-1}
          />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-white shadow-2xl shadow-black/30 dark:bg-emerald-950">
            <div className="flex items-center justify-between border-b border-emerald-900/10 px-5 py-4 dark:border-emerald-100/10">
              <span
                id={titleId}
                className="text-sm font-semibold text-emerald-950 dark:text-emerald-50"
              >
                メニュー
              </span>
              <button
                type="button"
                aria-label="メニューを閉じる"
                onClick={() => setOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-full text-emerald-900 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 dark:text-emerald-50 dark:hover:bg-emerald-900"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
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
            <nav
              aria-label="主要ナビゲーション（モバイル）"
              className="flex-1 overflow-y-auto px-3 py-3"
            >
              <ul className="flex flex-col gap-1">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex flex-col gap-0.5 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-emerald-950 transition hover:border-emerald-900/10 hover:bg-emerald-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 dark:text-emerald-50 dark:hover:border-emerald-100/10 dark:hover:bg-emerald-900/60"
                    >
                      <span>{item.label}</span>
                      <span className="text-[11px] font-normal leading-snug text-emerald-800/75 dark:text-emerald-200/65">
                        {item.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
