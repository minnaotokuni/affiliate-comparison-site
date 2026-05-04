import type { SVGProps } from "react";

type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
  ariaLabel?: string;
  decorative?: boolean;
  variant?: "leaf" | "dot" | "mixed";
} & Omit<SVGProps<SVGSVGElement>, "width" | "height" | "className">;

/**
 * 控えめな背景パターン用 SVG。16x16 タイルで繰り返せる。
 * 親要素で `opacity-20` 等を当てて重ねる前提。
 * すべて currentColor を使うので dark mode でも親の text-* で色を切り替えられる。
 */
export function BackgroundPattern({
  className = "",
  width = "100%",
  height = "100%",
  ariaLabel,
  decorative = true,
  variant = "mixed",
  ...rest
}: Props) {
  return (
    <svg
      {...rest}
      width={width}
      height={height}
      role="img"
      aria-label={decorative ? undefined : ariaLabel ?? "背景パターン"}
      aria-hidden={decorative || undefined}
      className={`text-emerald-700 dark:text-emerald-300 ${className}`.trim()}
    >
      <defs>
        <pattern id="bgp-leaf" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M6 12 Q12 6 18 12 Q12 18 6 12Z"
            fill="currentColor"
            opacity="0.18"
          />
          <path d="M6 12 L18 12" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
          <path
            d="M22 24 Q26 20 30 24 Q26 28 22 24Z"
            fill="currentColor"
            opacity="0.12"
          />
        </pattern>

        <pattern id="bgp-dot" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.1" fill="currentColor" opacity="0.22" />
          <circle cx="12" cy="12" r="0.7" fill="currentColor" opacity="0.18" />
        </pattern>

        <pattern id="bgp-mixed" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M8 16 Q14 10 20 16 Q14 22 8 16Z"
            fill="currentColor"
            opacity="0.16"
          />
          <path d="M8 16 L20 16" stroke="currentColor" strokeWidth="0.6" opacity="0.22" />
          <circle cx="34" cy="10" r="1.4" fill="currentColor" opacity="0.2" />
          <circle cx="40" cy="34" r="0.9" fill="currentColor" opacity="0.18" />
          <path
            d="M28 32 Q34 28 40 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
          <circle cx="14" cy="38" r="1.1" fill="currentColor" opacity="0.16" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#bgp-${variant})`} />
    </svg>
  );
}
