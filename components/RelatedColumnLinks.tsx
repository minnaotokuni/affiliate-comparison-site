import Link from "next/link";

export type RelatedColumnLinkItem = {
  /** 内部リンク先パス。例: "/column/season" */
  href: string;
  /** カードの見出し */
  label: string;
  /** 1〜2行の補足説明 */
  description: string;
};

type Props = {
  items: RelatedColumnLinkItem[];
  /** セクション見出し。省略時は "関連コラム" */
  heading?: string;
  /** 見出し下の補足。省略可 */
  hint?: string;
};

/**
 * フッター上などで使う、関連コラムへの内部リンクカードリスト。
 * Server Component。dark mode 対応。1〜2 列のレスポンシブ。
 */
export function RelatedColumnLinks({
  items,
  heading = "関連コラム",
  hint,
}: Props) {
  if (items.length === 0) return null;

  return (
    <section
      aria-label={heading}
      className="mt-16 border-t border-emerald-900/10 pt-10 dark:border-emerald-100/10"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden className="inline-block h-4 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
        <h2 className="text-base font-semibold text-emerald-950 dark:text-emerald-50">
          {heading}
        </h2>
      </div>
      {hint ? (
        <p className="mt-2 text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">
          {hint}
        </p>
      ) : null}
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group block h-full rounded-xl border border-emerald-900/12 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-700/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:border-emerald-100/12 dark:bg-emerald-950/80 dark:hover:border-emerald-300/30"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                  {item.label}
                </h3>
                <span
                  aria-hidden
                  className="text-emerald-600 transition-transform group-hover:translate-x-0.5 dark:text-emerald-300"
                >
                  →
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-emerald-800/85 dark:text-emerald-200/75">
                {item.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
