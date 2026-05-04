import type { SVGProps } from "react";

type Props = {
  className?: string;
  height?: number;
  ariaLabel?: string;
  decorative?: boolean;
} & Omit<SVGProps<SVGSVGElement>, "width" | "height" | "className">;

/**
 * セクション間に挟む横長の divider。波線と葉っぱのドットモチーフ。
 * width="100%" 固定。height だけ Prop で調整可。
 */
export function SectionDivider({
  className = "",
  height = 32,
  ariaLabel,
  decorative = true,
  ...rest
}: Props) {
  return (
    <svg
      {...rest}
      width="100%"
      height={height}
      viewBox="0 0 320 32"
      preserveAspectRatio="none"
      role="img"
      aria-label={decorative ? undefined : ariaLabel ?? "セクションの仕切り"}
      aria-hidden={decorative || undefined}
      className={`text-emerald-500/70 dark:text-emerald-300/70 ${className}`.trim()}
    >
      <path
        d="M0 18 Q20 8 40 18 T80 18 T120 18 T160 18 T200 18 T240 18 T280 18 T320 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M0 22 Q20 28 40 22 T80 22 T120 22 T160 22 T200 22 T240 22 T280 22 T320 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.5"
        strokeLinecap="round"
      />

      <g preserveAspectRatio="xMidYMid meet">
        <Leaf x={36} y={14} fill="#a7f3d0" />
        <Leaf x={108} y={12} fill="#bbf7d0" rotate={-12} />
        <Leaf x={180} y={14} fill="#fde68a" rotate={8} />
        <Leaf x={252} y={12} fill="#fbcfe8" rotate={-6} />

        <circle cx="20" cy="20" r="1.4" fill="#fb923c" />
        <circle cx="76" cy="20" r="1.4" fill="#a78bfa" />
        <circle cx="148" cy="20" r="1.4" fill="#fb7185" />
        <circle cx="220" cy="20" r="1.4" fill="#34d399" />
        <circle cx="296" cy="20" r="1.4" fill="#fbbf24" />
      </g>
    </svg>
  );
}

function Leaf({ x, y, fill, rotate = 0 }: { x: number; y: number; fill: string; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path
        d="M0 0 Q6 -3 10 0 Q6 3 0 0Z"
        fill={fill}
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      <path d="M0 0 L10 0" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}
