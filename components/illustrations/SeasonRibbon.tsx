import type { SVGProps } from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";

type Props = {
  season: Season;
  className?: string;
  size?: number;
  width?: number | string;
  height?: number | string;
  ariaLabel?: string;
  decorative?: boolean;
} & Omit<SVGProps<SVGSVGElement>, "width" | "height" | "className">;

const SEASON_META: Record<Season, { label: string; ribbon: string; ribbonShade: string; aria: string }> = {
  spring: { label: "春", ribbon: "#fbcfe8", ribbonShade: "#f9a8d4", aria: "春のリボン（桜）" },
  summer: { label: "夏", ribbon: "#bae6fd", ribbonShade: "#7dd3fc", aria: "夏のリボン（太陽と海）" },
  autumn: { label: "秋", ribbon: "#fed7aa", ribbonShade: "#fdba74", aria: "秋のリボン（紅葉）" },
  winter: { label: "冬", ribbon: "#e0e7ff", ribbonShade: "#c7d2fe", aria: "冬のリボン（雪結晶）" },
};

/**
 * 季節（春・夏・秋・冬）に応じたモチーフを切り替えるリボン装飾。
 */
export function SeasonRibbon({
  season,
  className = "",
  size = 200,
  width,
  height,
  ariaLabel,
  decorative = false,
  ...rest
}: Props) {
  const meta = SEASON_META[season];
  const w = width ?? size;
  const h = height ?? Math.round((Number(size) || 200) * 0.5);
  return (
    <svg
      {...rest}
      width={w}
      height={h}
      viewBox="0 0 200 100"
      role="img"
      aria-label={decorative ? undefined : ariaLabel ?? meta.aria}
      aria-hidden={decorative || undefined}
      className={`text-rose-700 dark:text-rose-200 ${className}`.trim()}
    >
      <path
        d="M14 38 L34 28 L34 62 L14 52 L24 45 Z"
        fill={meta.ribbonShade}
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M186 38 L166 28 L166 62 L186 52 L176 45 Z"
        fill={meta.ribbonShade}
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect x="30" y="22" width="140" height="46" rx="6" fill={meta.ribbon} stroke="currentColor" strokeWidth="1.6" />
      <rect x="30" y="22" width="140" height="6" rx="6" fill="#ffffff" opacity="0.55" />
      <text
        x="100"
        y="54"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="22"
        fontWeight="700"
        fill="#0f172a"
      >
        {meta.label}
      </text>

      {season === "spring" && (
        <g>
          <Petal cx={48} cy={20} r={5} />
          <Petal cx={56} cy={78} r={4} />
          <Petal cx={150} cy={16} r={4.5} />
          <Petal cx={158} cy={82} r={5} />
          <Petal cx={100} cy={10} r={4} />
        </g>
      )}
      {season === "summer" && (
        <g>
          <circle cx="46" cy="14" r="6" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
          <path d="M46 4 L46 0 M58 14 L62 14 M34 14 L30 14 M46 24 L46 28" stroke="#ca8a04" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M150 12 Q156 8 162 12 Q168 8 174 12" fill="none" stroke="#0284c7" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M150 86 Q156 82 162 86 Q168 82 174 86 Q180 82 184 86" fill="none" stroke="#0284c7" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M28 84 Q34 80 40 84 Q46 80 52 84" fill="none" stroke="#0284c7" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      )}
      {season === "autumn" && (
        <g>
          <Maple cx={46} cy={16} fill="#f97316" />
          <Maple cx={154} cy={84} fill="#dc2626" />
          <Maple cx={158} cy={14} fill="#ca8a04" />
          <Maple cx={42} cy={84} fill="#b45309" />
        </g>
      )}
      {season === "winter" && (
        <g>
          <Snowflake cx={48} cy={16} />
          <Snowflake cx={154} cy={16} />
          <Snowflake cx={48} cy={84} />
          <Snowflake cx={154} cy={84} />
        </g>
      )}
    </svg>
  );
}

function Petal({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle cx={-r * 0.7} cy={0} r={r} fill="#fce7f3" stroke="#db2777" strokeWidth="0.6" />
      <circle cx={r * 0.7} cy={0} r={r} fill="#fce7f3" stroke="#db2777" strokeWidth="0.6" />
      <circle cx={0} cy={-r * 0.7} r={r} fill="#fbcfe8" stroke="#db2777" strokeWidth="0.6" />
      <circle cx={0} cy={r * 0.7} r={r} fill="#fbcfe8" stroke="#db2777" strokeWidth="0.6" />
      <circle cx={0} cy={0} r={r * 0.5} fill="#fde047" />
    </g>
  );
}

function Maple({ cx, cy, fill }: { cx: number; cy: number; fill: string }) {
  return (
    <path
      transform={`translate(${cx - 7} ${cy - 7})`}
      d="M7 0 L9 4 L13 3 L11 7 L14 10 L10 10 L11 14 L7 12 L3 14 L4 10 L0 10 L3 7 L1 3 L5 4 Z"
      fill={fill}
      stroke="#7c2d12"
      strokeWidth="0.6"
      strokeLinejoin="round"
    />
  );
}

function Snowflake({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} stroke="#3b82f6" strokeWidth="1.1" strokeLinecap="round" fill="none">
      <line x1="-7" y1="0" x2="7" y2="0" />
      <line x1="0" y1="-7" x2="0" y2="7" />
      <line x1="-5" y1="-5" x2="5" y2="5" />
      <line x1="5" y1="-5" x2="-5" y2="5" />
      <circle cx="0" cy="0" r="1.4" fill="#bfdbfe" stroke="none" />
    </g>
  );
}
