import type { SVGProps } from "react";

type Props = {
  className?: string;
  size?: number;
  width?: number | string;
  height?: number | string;
  ariaLabel?: string;
  decorative?: boolean;
} & Omit<SVGProps<SVGSVGElement>, "width" | "height" | "className">;

/**
 * コック帽のうさぎマスコット（耳・ほっぺ・木のしゃもじ）。
 */
export function ChefBunny({
  className = "",
  size = 200,
  width,
  height,
  ariaLabel = "コック帽をかぶったうさぎのマスコット",
  decorative = false,
  ...rest
}: Props) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg
      {...rest}
      width={w}
      height={h}
      viewBox="0 0 200 200"
      role="img"
      aria-label={decorative ? undefined : ariaLabel}
      aria-hidden={decorative || undefined}
      className={`text-rose-400 dark:text-rose-200 ${className}`.trim()}
    >
      <ellipse cx="100" cy="178" rx="58" ry="6" fill="#0f172a" opacity="0.06" />

      <ellipse cx="78" cy="68" rx="9" ry="22" fill="#fafafa" stroke="#cbd5e1" strokeWidth="1.4" />
      <ellipse cx="78" cy="72" rx="4" ry="14" fill="#fbcfe8" opacity="0.85" />
      <ellipse cx="118" cy="68" rx="9" ry="22" fill="#fafafa" stroke="#cbd5e1" strokeWidth="1.4" />
      <ellipse cx="118" cy="72" rx="4" ry="14" fill="#fbcfe8" opacity="0.85" />

      <circle cx="100" cy="116" r="46" fill="#fafafa" stroke="#cbd5e1" strokeWidth="1.6" />

      <g>
        <path
          d="M62 70 Q60 50 78 50 Q86 36 100 42 Q114 36 122 50 Q140 50 138 70 Q142 78 134 86 L66 86 Q58 78 62 70Z"
          fill="#ffffff"
          stroke="#94a3b8"
          strokeWidth="1.6"
        />
        <ellipse cx="76" cy="62" rx="10" ry="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <ellipse cx="100" cy="56" rx="12" ry="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <ellipse cx="124" cy="62" rx="10" ry="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="62" y="84" width="76" height="8" rx="3" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2" />
      </g>

      <circle cx="86" cy="116" r="2.6" fill="#1e293b" />
      <circle cx="114" cy="116" r="2.6" fill="#1e293b" />
      <circle cx="78" cy="124" r="5" fill="currentColor" opacity="0.55" />
      <circle cx="122" cy="124" r="5" fill="currentColor" opacity="0.55" />
      <path d="M97 122 L100 126 L103 122 Z" fill="#fb7185" />
      <path d="M93 132 Q100 138 107 132" fill="none" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" />

      <path d="M62 100 Q66 96 70 100" fill="none" stroke="#cbd5e1" strokeWidth="1.4" />
      <path d="M130 100 Q134 96 138 100" fill="none" stroke="#cbd5e1" strokeWidth="1.4" />

      <g transform="rotate(-18 150 150)">
        <rect x="138" y="120" width="4.5" height="44" rx="2" fill="#d97706" stroke="#92400e" strokeWidth="1" />
        <ellipse cx="140" cy="116" rx="10" ry="14" fill="#fbbf24" stroke="#92400e" strokeWidth="1.2" />
        <ellipse cx="138" cy="112" rx="3" ry="5" fill="#fde68a" opacity="0.8" />
      </g>

      <path d="M148 96 Q152 92 156 96" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M44 124 Q48 120 52 124" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
