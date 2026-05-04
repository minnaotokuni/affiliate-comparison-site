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
 * 八百屋の屋根（ストライプ）と「Market」「八百屋」と書かれた小さな看板。
 * 下に野菜が並ぶ。横長想定（4:3〜16:9）。
 */
export function MarketStall({
  className = "",
  size = 320,
  width,
  height,
  ariaLabel = "八百屋の屋根と並んだ野菜",
  decorative = false,
  ...rest
}: Props) {
  const w = width ?? size;
  const h = height ?? Math.round((Number(size) || 320) * 0.7);
  return (
    <svg
      {...rest}
      width={w}
      height={h}
      viewBox="0 0 320 224"
      role="img"
      aria-label={decorative ? undefined : ariaLabel}
      aria-hidden={decorative || undefined}
      className={`text-emerald-700 dark:text-emerald-200 ${className}`.trim()}
    >
      <ellipse cx="160" cy="208" rx="130" ry="8" fill="#0f172a" opacity="0.06" />

      <path d="M30 80 L160 36 L290 80 L290 90 L30 90 Z" fill="#fef3c7" stroke="currentColor" strokeWidth="2" />
      <g>
        <path d="M30 80 L60 80 L60 90 L30 90 Z" fill="#fda4af" />
        <path d="M60 80 L90 80 L90 90 L60 90 Z" fill="#fef3c7" />
        <path d="M90 80 L120 80 L120 90 L90 90 Z" fill="#fda4af" />
        <path d="M120 80 L150 80 L150 90 L120 90 Z" fill="#fef3c7" />
        <path d="M150 80 L180 80 L180 90 L150 90 Z" fill="#fda4af" />
        <path d="M180 80 L210 80 L210 90 L180 90 Z" fill="#fef3c7" />
        <path d="M210 80 L240 80 L240 90 L210 90 Z" fill="#fda4af" />
        <path d="M240 80 L270 80 L270 90 L240 90 Z" fill="#fef3c7" />
        <path d="M270 80 L290 80 L290 90 L270 90 Z" fill="#fda4af" />
      </g>
      <path d="M30 90 L290 90" stroke="currentColor" strokeWidth="2" />

      <path d="M40 90 Q44 100 40 110 M70 90 Q74 100 70 110 M100 90 Q104 100 100 110 M130 90 Q134 100 130 110 M160 90 Q164 100 160 110 M190 90 Q194 100 190 110 M220 90 Q224 100 220 110 M250 90 Q254 100 250 110 M280 90 Q284 100 280 110"
        fill="none" stroke="currentColor" strokeWidth="1.4" />

      <rect x="120" y="48" width="80" height="26" rx="4" fill="#fff7ed" stroke="#92400e" strokeWidth="1.4" />
      <path d="M118 56 L118 68 M202 56 L202 68" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
      <text x="160" y="61" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="9" fontWeight="700" fill="#92400e" letterSpacing="1">
        MARKET
      </text>
      <text x="160" y="71" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="8" fill="#9a3412">
        八百屋
      </text>

      <rect x="40" y="120" width="240" height="56" rx="6" fill="#fde68a" stroke="#a16207" strokeWidth="1.4" />
      <path d="M40 134 L280 134 M40 150 L280 150 M40 164 L280 164" stroke="#a16207" strokeWidth="1" opacity="0.45" />

      <g>
        <circle cx="70" cy="118" r="10" fill="#f43f5e" stroke="#9f1239" strokeWidth="1.2" />
        <path d="M66 110 Q70 106 74 110 L72 114 Q70 112 68 114Z" fill="#22c55e" />
      </g>
      <g>
        <circle cx="100" cy="118" r="10" fill="#fb923c" stroke="#c2410c" strokeWidth="1.2" />
        <path d="M96 110 Q100 106 104 110 L102 114 Q100 112 98 114Z" fill="#22c55e" />
      </g>
      <g>
        <ellipse cx="135" cy="118" rx="14" ry="9" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.2" />
        <path d="M135 109 Q132 114 135 118 Q138 114 135 109" fill="#86efac" opacity="0.8" />
      </g>
      <g>
        <ellipse cx="172" cy="118" rx="11" ry="9" fill="#fde047" stroke="#a16207" strokeWidth="1.2" />
        <path d="M168 110 Q172 106 176 110" fill="none" stroke="#65a30d" strokeWidth="2" />
      </g>
      <g>
        <path d="M198 110 Q204 106 210 110 Q210 124 204 126 Q198 124 198 110Z" fill="#a855f7" stroke="#6b21a8" strokeWidth="1.2" />
        <ellipse cx="204" cy="110" rx="5" ry="2.4" fill="#22c55e" />
      </g>
      <g>
        <path d="M226 124 Q230 110 244 110 Q258 110 240 124 Q236 132 230 132 Q224 130 226 124Z"
          fill="#fb923c" stroke="#c2410c" strokeWidth="1.2" />
        <path d="M232 112 L230 108 M240 112 L242 108" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      <rect x="40" y="176" width="240" height="6" rx="2" fill="#a16207" opacity="0.7" />
    </svg>
  );
}
