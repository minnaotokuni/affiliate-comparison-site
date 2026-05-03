import { produceRasterForSlug } from "@/lib/produce-raster";

type Props = {
  slug: string;
  className?: string;
  size?: number;
  title?: string;
};

/**
 * 参照シートから切り出したラスタ（あれば）／なければサイトオリジナル SVG。
 */
export function VeggieIcon({ slug, className = "", size = 56, title }: Props) {
  const s = size;
  const raster = produceRasterForSlug(slug);
  if (raster) {
    const alt = title ?? "";
    return (
      <img
        src={`/produce-art/${raster}`}
        width={s}
        height={s}
        className={`${className} object-contain`.trim()}
        alt={alt}
        title={title}
        loading="lazy"
        decoding="async"
      />
    );
  }

  const common = { width: s, height: s, className, role: "img" as const };
  const face = (
    <>
      <circle cx="24" cy="30" r="2.5" fill="#1e293b" opacity="0.75" />
      <circle cx="40" cy="30" r="2.5" fill="#1e293b" opacity="0.75" />
      <path d="M 28 38 Q 32 42 36 38" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </>
  );

  switch (slug) {
    case "tomato":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "トマトのイラスト"}>
          <ellipse cx="32" cy="36" rx="22" ry="20" fill="#f43f5e" />
          <ellipse cx="26" cy="30" rx="8" ry="6" fill="#fda4af" opacity="0.55" />
          <path d="M26 18 Q32 14 38 18 L36 22 Q32 20 28 22Z" fill="#22c55e" />
          <path d="M32 18 L32 26" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
          {face}
        </svg>
      );
    case "carrot":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "にんじんのイラスト"}>
          <path d="M18 44 Q32 52 46 44 Q38 28 32 12 Q26 28 18 44Z" fill="#fb923c" stroke="#ea580c" strokeWidth="1.5" />
          <path d="M28 14 L26 8 M32 12 L32 6 M36 14 L38 8" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
          {face}
        </svg>
      );
    case "cucumber":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "きゅうりのイラスト"}>
          <ellipse cx="34" cy="32" rx="24" ry="12" transform="rotate(-18 34 32)" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
          <ellipse cx="34" cy="32" rx="18" ry="7" transform="rotate(-18 34 32)" fill="#bbf7d0" opacity="0.6" />
          <circle cx="22" cy="26" r="1.5" fill="#15803d" opacity="0.4" />
          <circle cx="40" cy="38" r="1.5" fill="#15803d" opacity="0.4" />
          {face}
        </svg>
      );
    case "eggplant":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "なすのイラスト"}>
          <path d="M32 12 Q44 20 46 36 Q44 52 32 54 Q20 52 18 36 Q20 20 32 12Z" fill="#a855f7" stroke="#6b21a8" strokeWidth="1.5" />
          <ellipse cx="32" cy="14" rx="8" ry="4" fill="#22c55e" />
          {face}
        </svg>
      );
    case "broccoli":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "ブロッコリーのイラスト"}>
          <rect x="28" y="36" width="8" height="18" rx="2" fill="#86efac" stroke="#15803d" strokeWidth="1" />
          <circle cx="24" cy="28" r="10" fill="#4ade80" stroke="#166534" strokeWidth="1.2" />
          <circle cx="40" cy="28" r="10" fill="#4ade80" stroke="#166534" strokeWidth="1.2" />
          <circle cx="32" cy="22" r="11" fill="#22c55e" stroke="#14532d" strokeWidth="1.2" />
          {face}
        </svg>
      );
    case "broccoli-sprout":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "ブロッコリースプラウトのイラスト"}>
          <rect x="30" y="34" width="4" height="22" rx="1" fill="#86efac" />
          <circle cx="26" cy="30" r="7" fill="#6ee7b7" stroke="#0f766e" strokeWidth="1" />
          <circle cx="38" cy="30" r="7" fill="#6ee7b7" stroke="#0f766e" strokeWidth="1" />
          <circle cx="32" cy="24" r="8" fill="#34d399" stroke="#0d9488" strokeWidth="1" />
          <ellipse cx="32" cy="52" rx="14" ry="4" fill="#000" opacity="0.06" />
        </svg>
      );
    case "lettuce":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "レタスのイラスト"}>
          <path
            d="M32 52 Q12 40 14 24 Q18 10 32 8 Q46 10 50 24 Q52 40 32 52Z"
            fill="#bbf7d0"
            stroke="#22c55e"
            strokeWidth="1.5"
          />
          <path d="M32 52 Q22 36 32 14 Q42 36 32 52" fill="#86efac" opacity="0.7" />
          {face}
        </svg>
      );
    case "cabbage":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "キャベツのイラスト"}>
          <circle cx="32" cy="34" r="22" fill="#d9f99d" stroke="#65a30d" strokeWidth="1.5" />
          <circle cx="32" cy="34" r="14" fill="#ecfccb" opacity="0.9" />
          <path d="M32 22 Q38 28 32 36 Q26 28 32 22" fill="#bef264" opacity="0.8" />
          {face}
        </svg>
      );
    case "spinach":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "ほうれん草のイラスト"}>
          <path d="M32 48 L28 20 Q32 8 36 20 Z" fill="#15803d" />
          <path d="M22 42 L26 22 Q28 12 32 18 Q36 12 38 22 L42 42 Z" fill="#22c55e" stroke="#14532d" strokeWidth="1.2" />
          <path d="M32 48 L32 56" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "potato":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "じゃがいものイラスト"}>
          <ellipse cx="32" cy="34" rx="20" ry="16" fill="#fde68a" stroke="#ca8a04" strokeWidth="1.5" />
          <ellipse cx="26" cy="30" rx="3" ry="2" fill="#ca8a04" opacity="0.25" />
          <ellipse cx="38" cy="38" rx="3" ry="2" fill="#ca8a04" opacity="0.2" />
          {face}
        </svg>
      );
    case "onion":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "たまねぎのイラスト"}>
          <path d="M32 52 Q14 38 18 22 Q22 10 32 8 Q42 10 46 22 Q50 38 32 52Z" fill="#fef9c3" stroke="#eab308" strokeWidth="1.5" />
          <path d="M32 8 Q27 18 32 28 Q37 18 32 8Z" fill="#a3e635" />
          {face}
        </svg>
      );
    case "daikon":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "だいこんのイラスト"}>
          <path d="M30 52 L34 52 L38 18 Q34 10 30 18 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M30 18 Q32 8 34 18" fill="#86efac" stroke="#22c55e" strokeWidth="1" />
          {face}
        </svg>
      );
    case "hakusai":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "白菜のイラスト"}>
          <ellipse cx="32" cy="36" rx="20" ry="18" fill="#ecfccb" stroke="#84cc16" strokeWidth="1.5" />
          <path d="M32 22 Q38 30 32 44 Q26 30 32 22" fill="#fef08a" opacity="0.85" />
          {face}
        </svg>
      );
    case "negi":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "ねぎのイラスト"}>
          <rect x="26" y="14" width="12" height="36" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
          <rect x="26" y="34" width="12" height="16" rx="2" fill="#a7f3d0" />
          <path d="M32 14 L28 8 L36 8 Z" fill="#22c55e" />
        </svg>
      );
    case "nira":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "ニラのイラスト"}>
          <path d="M32 50 L32 30" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
          <path
            d="M32 32 Q24 18 18 12 M32 32 Q40 18 46 12 M32 34 Q20 26 14 18 M32 34 Q44 26 50 18 M30 36 Q22 30 16 22 M34 36 Q42 30 48 22"
            stroke="#22c55e"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "green-pepper":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "ピーマンのイラスト"}>
          <path d="M22 36 Q18 22 32 14 Q46 22 42 36 Q40 48 32 50 Q24 48 22 36Z" fill="#4ade80" stroke="#15803d" strokeWidth="1.5" />
          <path d="M32 14 L32 10" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
          {face}
        </svg>
      );
    case "taro":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "さといものイラスト"}>
          <ellipse cx="32" cy="36" rx="18" ry="14" fill="#e9d5ff" stroke="#7c3aed" strokeWidth="1.5" />
          <circle cx="26" cy="34" r="2" fill="#6b21a8" opacity="0.2" />
          <circle cx="38" cy="38" r="2.5" fill="#6b21a8" opacity="0.15" />
          {face}
        </svg>
      );
    case "strawberry":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "いちごのイラスト"}>
          <path
            d="M32 14 C22 14 14 24 14 36 C14 48 22 52 32 52 C42 52 50 48 50 36 C50 24 42 14 32 14Z"
            fill="#fb7185"
            stroke="#be123c"
            strokeWidth="1.5"
          />
          <ellipse cx="28" cy="30" rx="2" ry="2.5" fill="#ffe4e6" opacity="0.55" />
          <ellipse cx="38" cy="34" rx="1.8" ry="2.2" fill="#ffe4e6" opacity="0.45" />
          <circle cx="26" cy="38" r="1.2" fill="#fda4af" opacity="0.9" />
          <circle cx="34" cy="42" r="1.1" fill="#fda4af" opacity="0.85" />
          <circle cx="40" cy="36" r="1" fill="#fda4af" opacity="0.8" />
          <path d="M26 14 Q32 10 38 14 Q36 18 32 16 Q28 18 26 14Z" fill="#22c55e" />
          <path d="M32 16 L32 12" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "sweet-corn":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "とうもろこしのイラスト"}>
          <ellipse cx="32" cy="34" rx="14" ry="22" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
          <path d="M22 28 H42 M22 34 H42 M22 40 H42" stroke="#ca8a04" strokeWidth="1.2" opacity="0.35" />
          <path d="M32 12 L34 8 L30 8 Z" fill="#22c55e" />
          {face}
        </svg>
      );
    case "pumpkin":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "かぼちゃのイラスト"}>
          <circle cx="32" cy="36" r="20" fill="#fb923c" stroke="#c2410c" strokeWidth="1.5" />
          <path d="M28 18 Q32 12 36 18 L36 22 Q32 20 28 22Z" fill="#84cc16" />
          <path d="M26 34 Q32 30 38 34" fill="#fdba74" opacity="0.5" />
          {face}
        </svg>
      );
    case "edamame":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "枝豆のイラスト"}>
          <path
            d="M18 38 Q32 18 46 38 Q44 46 32 48 Q20 46 18 38Z"
            fill="#bbf7d0"
            stroke="#15803d"
            strokeWidth="1.5"
          />
          <ellipse cx="26" cy="34" rx="5" ry="7" fill="#86efac" stroke="#166534" strokeWidth="1" transform="rotate(-12 26 34)" />
          <ellipse cx="38" cy="34" rx="5" ry="7" fill="#86efac" stroke="#166534" strokeWidth="1" transform="rotate(12 38 34)" />
          {face}
        </svg>
      );
    default:
      return (
        <svg {...common} viewBox="0 0 64 64" aria-label={title ?? "野菜のイラスト"}>
          <circle cx="32" cy="32" r="20" fill="#86efac" stroke="#15803d" strokeWidth="1.5" />
          <path d="M22 28 L42 36 M22 36 L42 28" stroke="#15803d" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </svg>
      );
  }
}
