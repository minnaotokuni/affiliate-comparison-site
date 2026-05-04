import type { SVGProps } from "react";

export type CornerPosition = "tl" | "tr" | "bl" | "br";

type Props = {
  position: CornerPosition;
  className?: string;
  size?: number;
  width?: number | string;
  height?: number | string;
  ariaLabel?: string;
  decorative?: boolean;
} & Omit<SVGProps<SVGSVGElement>, "width" | "height" | "className">;

const ROTATIONS: Record<CornerPosition, number> = {
  tl: 0,
  tr: 90,
  br: 180,
  bl: 270,
};

/**
 * コーナー装飾用の2葉モチーフ。position により回転して配置される。
 */
export function CornerLeaves({
  position,
  className = "",
  size = 96,
  width,
  height,
  ariaLabel,
  decorative = true,
  ...rest
}: Props) {
  const w = width ?? size;
  const h = height ?? size;
  const rotation = ROTATIONS[position];
  return (
    <svg
      {...rest}
      width={w}
      height={h}
      viewBox="0 0 96 96"
      role="img"
      aria-label={decorative ? undefined : ariaLabel ?? "コーナーの葉飾り"}
      aria-hidden={decorative || undefined}
      className={`text-emerald-600 dark:text-emerald-200 ${className}`.trim()}
    >
      <g transform={`rotate(${rotation} 48 48)`}>
        <path
          d="M6 6 Q24 10 36 28 Q24 28 14 36 Q10 22 6 6Z"
          fill="#a7f3d0"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M8 8 Q22 22 34 30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />

        <path
          d="M14 14 Q34 18 46 6 Q42 22 30 30 Q22 26 14 14Z"
          fill="#bbf7d0"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M18 16 Q32 22 42 12" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />

        <circle cx="46" cy="20" r="2.4" fill="#fda4af" />
        <circle cx="40" cy="36" r="1.8" fill="#fdba74" />
        <circle cx="22" cy="42" r="1.6" fill="#a78bfa" opacity="0.85" />
      </g>
    </svg>
  );
}
