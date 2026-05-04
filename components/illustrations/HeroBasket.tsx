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
 * 木目の籐かごに野菜と果物（トマト・人参・キャベツ・りんご・ぶどう）が顔を出す
 * トップ用ヒーローイラスト。240〜400px 想定。
 * 輪郭は currentColor を使うので親の text-* で線色を切り替えられる。
 */
export function HeroBasket({
  className = "",
  size = 320,
  width,
  height,
  ariaLabel = "野菜と果物がたくさん入った籐のかご",
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
      viewBox="0 0 320 320"
      role="img"
      aria-label={decorative ? undefined : ariaLabel}
      aria-hidden={decorative || undefined}
      className={`text-emerald-700 dark:text-emerald-200 ${className}`.trim()}
    >
      <ellipse cx="160" cy="276" rx="120" ry="14" fill="#0f172a" opacity="0.06" />

      <path d="M58 188 Q72 174 100 168 L220 168 Q248 174 262 188 L262 198 L58 198 Z" fill="#fde68a" stroke="currentColor" strokeWidth="2" />
      <path d="M70 198 Q90 270 160 274 Q230 270 250 198 Z" fill="#fcd34d" stroke="currentColor" strokeWidth="2" />
      <path d="M82 210 L240 210 M86 226 L236 226 M92 244 L230 244 M100 258 L222 258" stroke="#a16207" strokeWidth="1.4" opacity="0.55" />
      <path d="M102 198 L102 268 M132 198 L132 272 M162 198 L162 274 M192 198 L192 272 M222 198 L222 268" stroke="#a16207" strokeWidth="1.2" opacity="0.45" />
      <path d="M58 198 Q160 184 262 198" fill="none" stroke="#a16207" strokeWidth="1.4" opacity="0.5" />

      <ellipse cx="118" cy="170" rx="32" ry="28" fill="#bbf7d0" stroke="currentColor" strokeWidth="2" />
      <path d="M118 142 Q108 156 118 170 Q128 156 118 142" fill="#86efac" opacity="0.8" />
      <path d="M118 144 Q104 162 118 170 Q132 162 118 144" fill="none" stroke="#15803d" strokeWidth="1" opacity="0.55" />

      <circle cx="170" cy="160" r="22" fill="#f43f5e" stroke="#9f1239" strokeWidth="1.6" />
      <ellipse cx="164" cy="154" rx="6" ry="4" fill="#fda4af" opacity="0.65" />
      <path d="M164 144 Q170 138 178 144 L176 150 Q170 148 166 150Z" fill="#22c55e" />
      <path d="M170 146 L170 138" stroke="#166534" strokeWidth="1.6" strokeLinecap="round" />

      <path d="M210 178 Q220 200 218 168 Q224 142 232 162 Q240 138 246 158 Q254 138 256 162 Q262 178 252 188 Q236 196 210 188Z"
        fill="#fb923c" stroke="#c2410c" strokeWidth="1.6" />
      <path d="M222 152 L218 142 M232 150 L232 138 M242 152 L246 142" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />

      <circle cx="80" cy="160" r="18" fill="#fecaca" stroke="#be123c" strokeWidth="1.5" />
      <path d="M76 144 Q80 138 84 144 Q82 148 80 146 Q78 148 76 144Z" fill="#22c55e" />
      <path d="M80 146 L80 138" stroke="#166534" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="74" cy="154" rx="4" ry="3" fill="#fff1f2" opacity="0.7" />

      <g>
        <circle cx="232" cy="184" r="6" fill="#a78bfa" />
        <circle cx="244" cy="184" r="6" fill="#a78bfa" />
        <circle cx="226" cy="194" r="6" fill="#8b5cf6" />
        <circle cx="238" cy="194" r="6" fill="#a78bfa" />
        <circle cx="250" cy="194" r="6" fill="#8b5cf6" />
        <circle cx="232" cy="204" r="6" fill="#7c3aed" />
        <circle cx="244" cy="204" r="6" fill="#8b5cf6" />
        <path d="M236 178 Q240 170 248 174" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="240" cy="172" rx="6" ry="3" fill="#86efac" />
      </g>

      <g>
        <ellipse cx="56" cy="184" rx="8" ry="5" fill="#86efac" />
        <ellipse cx="262" cy="200" rx="6" ry="4" fill="#bbf7d0" />
        <path d="M48 196 Q54 184 62 196" fill="none" stroke="#22c55e" strokeWidth="1.4" />
      </g>
    </svg>
  );
}
