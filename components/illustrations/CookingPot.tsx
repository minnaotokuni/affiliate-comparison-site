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
 * 湯気3本が立ちのぼる煮込み鍋。フタにハートのワンポイント。
 */
export function CookingPot({
  className = "",
  size = 200,
  width,
  height,
  ariaLabel = "湯気の出る煮込み鍋",
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
      className={`text-sky-700 dark:text-sky-200 ${className}`.trim()}
    >
      <ellipse cx="100" cy="178" rx="62" ry="6" fill="#0f172a" opacity="0.06" />

      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.55">
        <path d="M70 36 Q66 24 74 16 Q70 8 76 2" />
        <path d="M100 32 Q96 20 104 12 Q100 4 106 -2" />
        <path d="M130 36 Q126 24 134 16 Q130 8 136 2" />
      </g>

      <rect x="38" y="58" width="124" height="14" rx="6" fill="#cbd5e1" stroke="#475569" strokeWidth="1.6" />
      <rect x="92" y="44" width="16" height="10" rx="3" fill="#475569" />
      <path d="M96 50 Q100 44 104 50" fill="#fb7185" stroke="#9f1239" strokeWidth="1" />
      <path d="M100 50 L100 46" stroke="#9f1239" strokeWidth="1.4" />

      <path
        d="M40 72 L160 72 L156 162 Q156 174 144 174 L56 174 Q44 174 44 162 Z"
        fill="#94a3b8"
        stroke="#1e293b"
        strokeWidth="1.6"
      />
      <rect x="28" y="86" width="14" height="22" rx="4" fill="#1e293b" />
      <rect x="158" y="86" width="14" height="22" rx="4" fill="#1e293b" />

      <rect x="44" y="84" width="112" height="14" rx="3" fill="#475569" opacity="0.4" />
      <path d="M58 100 L58 168 M86 100 L86 170 M114 100 L114 170 M142 100 L142 168" stroke="#1e293b" strokeWidth="0.8" opacity="0.15" />

      <g transform="translate(100 138)">
        <path
          d="M0 -8 C-6 -16 -16 -10 -14 -2 C-12 6 0 12 0 16 C0 12 12 6 14 -2 C16 -10 6 -16 0 -8 Z"
          fill="#fb7185"
          stroke="#9f1239"
          strokeWidth="1.2"
        />
      </g>

      <ellipse cx="100" cy="84" rx="56" ry="6" fill="#ffffff" opacity="0.35" />
    </svg>
  );
}
