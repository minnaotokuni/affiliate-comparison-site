import type { ReactNode } from "react";

type HeadingLevel = "h2" | "h3" | "h4";

type Props = {
  /** 見出し本文 */
  title: ReactNode;
  /** 上に小さく出る英字キャプション。例: "Eat & recipe" */
  eyebrow?: string;
  /** 見出し直下の1行説明 */
  hint?: ReactNode;
  /** 見出しタグ。既定は h2 */
  as?: HeadingLevel;
  /** 追加クラス */
  className?: string;
  /** 中央寄せにする */
  align?: "start" | "center";
};

/**
 * emerald アクセントの小さなバーを左に置いた、汎用セクション見出し。
 * 既存ページの `<AnchorSection>` の id・スタイルは壊さず、内側に置いて装飾を足す用途を想定。
 */
export function SectionTitle({
  title,
  eyebrow,
  hint,
  as = "h2",
  className = "",
  align = "start",
}: Props) {
  const HeadingTag = as;
  const alignWrap = align === "center" ? "items-center text-center" : "items-start text-left";
  const rowAlign = align === "center" ? "justify-center" : "justify-start";

  return (
    <div className={`flex flex-col gap-2 ${alignWrap} ${className}`.trim()}>
      {eyebrow ? (
        <div className={`flex items-center gap-2 ${rowAlign}`}>
          <span
            aria-hidden
            className="inline-block h-3 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400"
          />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <HeadingTag className="text-lg font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-xl">
        {title}
      </HeadingTag>
      {hint ? (
        <p className="max-w-2xl text-xs leading-relaxed text-emerald-800/85 dark:text-emerald-200/75 sm:text-sm">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
