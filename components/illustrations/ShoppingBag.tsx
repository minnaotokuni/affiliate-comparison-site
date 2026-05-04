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
 * クラフト紙袋から葉っぱとパンの先がのぞく買い物袋。
 */
export function ShoppingBag({
  className = "",
  size = 200,
  width,
  height,
  ariaLabel = "野菜とパンが入ったクラフト紙の買い物袋",
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
      className={`text-amber-700 dark:text-amber-200 ${className}`.trim()}
    >
      <ellipse cx="100" cy="184" rx="64" ry="6" fill="#0f172a" opacity="0.06" />

      <g>
        <path d="M82 36 Q88 24 100 24 Q108 28 110 38" fill="none" stroke="#92400e" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M118 38 Q126 26 140 30 Q146 34 144 44" fill="none" stroke="#92400e" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      <path
        d="M48 56 L152 56 L160 178 Q160 184 154 184 L46 184 Q40 184 40 178 Z"
        fill="#fde68a"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M48 56 L152 56 L154 70 L46 70 Z" fill="#fcd34d" stroke="currentColor" strokeWidth="1.4" />
      <path d="M62 80 L62 178 M82 80 L82 178 M118 80 L118 178 M138 80 L138 178" stroke="#a16207" strokeWidth="1" opacity="0.4" />
      <path d="M40 100 Q100 96 160 100 M40 130 Q100 126 160 130 M40 158 Q100 154 160 158" stroke="#a16207" strokeWidth="0.8" opacity="0.25" />

      <g>
        <path d="M70 56 Q60 30 78 22 Q86 30 80 50 Q84 38 96 32 Q98 44 84 56" fill="#86efac" stroke="#15803d" strokeWidth="1.4" />
        <path d="M76 38 L80 24 M84 44 L92 36" stroke="#15803d" strokeWidth="1" opacity="0.6" />
      </g>

      <g>
        <ellipse cx="118" cy="44" rx="22" ry="14" transform="rotate(-18 118 44)" fill="#f5d68a" stroke="#92400e" strokeWidth="1.4" />
        <path d="M104 38 Q118 32 132 38 M106 44 Q118 38 130 44" stroke="#92400e" strokeWidth="1" opacity="0.55" />
        <path d="M132 30 L138 24 M126 26 L130 18" stroke="#92400e" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      </g>

      <g>
        <circle cx="98" cy="48" r="9" fill="#f43f5e" stroke="#9f1239" strokeWidth="1.2" />
        <path d="M94 40 Q98 36 102 40 L100 44 Q98 42 96 44Z" fill="#22c55e" />
      </g>

      <rect x="84" y="100" width="32" height="10" rx="2" fill="#ffffff" stroke="#a16207" strokeWidth="1" opacity="0.85" />
      <text x="100" y="108" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="6" fontWeight="700" fill="#a16207">
        FRESH
      </text>
    </svg>
  );
}
