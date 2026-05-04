"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
  } catch {
    // localStorage 不可 (Safari プライベートなど) は system 扱い
  }
  return "system";
}

function applyTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && systemDark);
  document.documentElement.classList.toggle("dark", dark);
}

type Option = {
  value: Theme;
  label: string;
  title: string;
  icon: React.ReactNode;
};

const SUN_ICON = (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    width="16"
    height="16"
  >
    <circle
      cx="12"
      cy="12"
      r="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"
    />
  </svg>
);

const MOON_ICON = (
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
      strokeLinejoin="round"
      d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z"
    />
  </svg>
);

const SYSTEM_ICON = (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    width="16"
    height="16"
  >
    <rect
      x="3.5"
      y="5"
      width="17"
      height="12"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      d="M9 20h6M12 17v3"
    />
  </svg>
);

const OPTIONS: readonly Option[] = [
  { value: "light", label: "ライト", title: "明るいテーマに切り替え", icon: SUN_ICON },
  { value: "dark", label: "ダーク", title: "暗いテーマに切り替え", icon: MOON_ICON },
  { value: "system", label: "システム", title: "OS の設定に合わせる", icon: SYSTEM_ICON },
];

type Props = {
  className?: string;
};

/**
 * ヘッダーのテーマ切替。ライト / ダーク / システム の 3 状態。
 * - localStorage.theme に保存。
 * - system 選択時は OS の prefers-color-scheme を反映。
 * - 初期 class の付与は <ThemeScript /> が <body> 冒頭で同期実行するため、
 *   本コンポーネントは「ユーザーが切り替えた時」と「system 時の OS 変更追従」だけを担当する。
 */
export function ThemeToggle({ className }: Props) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readStoredTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mounted, theme]);

  const choose = (next: Theme) => {
    setTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 保存不可でも現セッションでは反映する
    }
    applyTheme(next);
  };

  const activeValue: Theme = mounted ? theme : "system";

  return (
    <div
      role="group"
      aria-label="テーマ切替"
      className={[
        "inline-flex items-center gap-0.5 rounded-full border border-emerald-900/10 bg-white p-0.5 text-emerald-900 shadow-sm shadow-emerald-900/5 dark:border-emerald-100/10 dark:bg-emerald-950 dark:text-emerald-50 dark:shadow-black/30",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {OPTIONS.map((option) => {
        const isActive = mounted && activeValue === option.value;
        return (
          <button
            key={option.value}
            type="button"
            title={option.title}
            aria-label={option.title}
            aria-pressed={isActive}
            onClick={() => choose(option.value)}
            className={[
              "inline-flex size-8 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45",
              isActive
                ? "bg-emerald-600 text-white shadow-inner shadow-emerald-900/30 dark:bg-emerald-400 dark:text-emerald-950"
                : "text-emerald-800/80 hover:bg-emerald-50 hover:text-emerald-950 dark:text-emerald-200/80 dark:hover:bg-emerald-900 dark:hover:text-emerald-50",
            ].join(" ")}
          >
            {option.icon}
            <span className="sr-only">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
