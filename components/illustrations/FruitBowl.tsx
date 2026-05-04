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
 * ガラス鉢にぶどう・みかん・いちご・りんごが盛られた果物の盛りかご。
 */
export function FruitBowl({
  className = "",
  size = 240,
  width,
  height,
  ariaLabel = "ぶどう・みかん・いちご・りんごが盛られたガラスの果物鉢",
  decorative = false,
  ...rest
}: Props) {
  const w = width ?? size;
  const h = height ?? Math.round((Number(size) || 240) * 0.85);
  return (
    <svg
      {...rest}
      width={w}
      height={h}
      viewBox="0 0 240 204"
      role="img"
      aria-label={decorative ? undefined : ariaLabel}
      aria-hidden={decorative || undefined}
      className={`text-sky-700 dark:text-sky-200 ${className}`.trim()}
    >
      <ellipse cx="120" cy="190" rx="78" ry="6" fill="#0f172a" opacity="0.06" />

      <path
        d="M40 110 Q40 168 120 178 Q200 168 200 110 Z"
        fill="#e0f2fe"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.85"
      />
      <path d="M40 110 Q44 132 56 152" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
      <ellipse cx="120" cy="110" rx="80" ry="8" fill="#bae6fd" stroke="currentColor" strokeWidth="1.6" />

      <g>
        <circle cx="78" cy="92" r="14" fill="#fb923c" stroke="#c2410c" strokeWidth="1.4" />
        <ellipse cx="74" cy="86" rx="4" ry="2.5" fill="#fed7aa" opacity="0.7" />
        <path d="M76 78 Q78 74 80 78" fill="#22c55e" />
        <path d="M78 78 L78 74" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      <g>
        <path d="M152 78 C148 76 142 80 144 86 C140 86 134 90 138 96 C132 100 138 110 146 108 C148 114 156 116 158 110 C166 114 172 106 168 100 C174 96 170 88 162 90 C160 84 156 80 152 78Z"
          fill="#f43f5e" stroke="#9f1239" strokeWidth="1.2" />
        <ellipse cx="152" cy="86" rx="3" ry="2" fill="#fecaca" opacity="0.6" />
        <ellipse cx="160" cy="100" rx="2.5" ry="1.6" fill="#fecaca" opacity="0.5" />
      </g>

      <g>
        <circle cx="120" cy="100" r="2.8" fill="#1e293b" opacity="0.55" />
        <circle cx="116" cy="106" r="2.5" fill="#1e293b" opacity="0.45" />
        <circle cx="124" cy="106" r="2.5" fill="#1e293b" opacity="0.45" />
      </g>

      <g>
        <circle cx="56" cy="116" r="14" fill="#fb923c" stroke="#c2410c" strokeWidth="1.4" />
        <path d="M44 110 Q56 102 68 110" fill="none" stroke="#fed7aa" strokeWidth="1.4" opacity="0.7" />
        <path d="M56 100 L56 96" stroke="#166534" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M52 100 Q56 96 60 100Z" fill="#22c55e" />
      </g>

      <g>
        <circle cx="180" cy="118" r="11" fill="#fde047" stroke="#a16207" strokeWidth="1.2" />
        <path d="M170 110 Q180 104 190 110" fill="none" stroke="#ca8a04" strokeWidth="1" opacity="0.55" />
        <path d="M178 102 Q180 98 182 102" fill="#22c55e" />
        <path d="M180 102 L180 98" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      <g>
        <circle cx="100" cy="124" r="6" fill="#a78bfa" />
        <circle cx="112" cy="124" r="6" fill="#a78bfa" />
        <circle cx="124" cy="124" r="6" fill="#a78bfa" />
        <circle cx="138" cy="124" r="6" fill="#a78bfa" />
        <circle cx="106" cy="134" r="6" fill="#8b5cf6" />
        <circle cx="118" cy="134" r="6" fill="#8b5cf6" />
        <circle cx="130" cy="134" r="6" fill="#8b5cf6" />
        <circle cx="112" cy="144" r="6" fill="#7c3aed" />
        <circle cx="124" cy="144" r="6" fill="#7c3aed" />
        <circle cx="118" cy="154" r="6" fill="#6d28d9" />
        <ellipse cx="118" cy="118" rx="14" ry="3" fill="#86efac" />
        <path d="M126 116 Q132 110 138 114" fill="none" stroke="#15803d" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}
