import Link from "next/link";

export type BreadcrumbItem = {
  /** 省略時はテキスト表示（最終位置 or リンクなしのページ目印に使う） */
  href?: string;
  label: string;
};

type Props = {
  items: readonly BreadcrumbItem[];
  className?: string;
};

/**
 * 汎用パンくず。Server Component で利用可。
 * - 最終要素は `aria-current="page"` でリンクにしない。
 * - 区切りは小さな chevron SVG。スクリーンリーダーには読まれない。
 * - dark mode 対応（`dark:` バリアント）。
 */
export function Breadcrumbs({ items, className }: Props) {
  if (items.length === 0) return null;

  return (
    <nav
      role="navigation"
      aria-label="パンくず"
      className={
        className ??
        "text-xs text-emerald-800/80 dark:text-emerald-200/70"
      }
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const showLink = !isLast && typeof item.href === "string" && item.href.length > 0;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {showLink ? (
                <Link
                  href={item.href as string}
                  className="rounded px-1 py-0.5 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:hover:text-emerald-100"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={
                    isLast
                      ? "px-1 py-0.5 font-semibold text-emerald-950 dark:text-emerald-50"
                      : "px-1 py-0.5"
                  }
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 16 16"
                  width="10"
                  height="10"
                  className="text-emerald-700/45 dark:text-emerald-300/40"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 3.5 10.5 8 6 12.5"
                  />
                </svg>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
