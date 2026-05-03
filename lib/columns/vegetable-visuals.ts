/** カード背景・チップの色味（Tailwind クラス）。イラストと揃えてカラフルに */
export type VegVisualStyle = {
  /** カード背景グラデーション */
  cardGradient: string;
  /** アイコン周りのリング */
  iconRing: string;
  /** タグのデフォルトを上書きしない場合は空 */
  tagTint?: string;
};

export const vegetableVisualBySlug: Record<string, VegVisualStyle> = {
  cabbage: {
    cardGradient:
      "bg-gradient-to-br from-lime-100/90 via-emerald-50 to-teal-50 dark:from-lime-950/45 dark:via-emerald-950/35 dark:to-teal-950/25",
    iconRing: "ring-lime-300/60 dark:ring-lime-600/40",
  },
  cucumber: {
    cardGradient:
      "bg-gradient-to-br from-green-100/90 via-lime-50 to-emerald-50 dark:from-green-950/45 dark:via-lime-950/25 dark:to-emerald-950/25",
    iconRing: "ring-green-300/60 dark:ring-green-600/40",
  },
  taro: {
    cardGradient:
      "bg-gradient-to-br from-violet-100/85 via-purple-50 to-fuchsia-50 dark:from-violet-950/40 dark:via-purple-950/25 dark:to-fuchsia-950/20",
    iconRing: "ring-violet-300/55 dark:ring-violet-600/35",
  },
  daikon: {
    cardGradient:
      "bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900/50 dark:via-emerald-950/30 dark:to-slate-900/40",
    iconRing: "ring-slate-200/80 dark:ring-slate-600/40",
  },
  onion: {
    cardGradient:
      "bg-gradient-to-br from-amber-100/88 via-yellow-50 to-orange-50 dark:from-amber-950/35 dark:via-yellow-950/20 dark:to-orange-950/25",
    iconRing: "ring-amber-300/60 dark:ring-amber-600/35",
  },
  tomato: {
    cardGradient:
      "bg-gradient-to-br from-rose-100/90 via-red-50 to-orange-50 dark:from-rose-950/45 dark:via-red-950/30 dark:to-orange-950/25",
    iconRing: "ring-rose-300/65 dark:ring-rose-600/40",
  },
  eggplant: {
    cardGradient:
      "bg-gradient-to-br from-purple-100/88 via-violet-50 to-indigo-50 dark:from-purple-950/45 dark:via-violet-950/30 dark:to-indigo-950/25",
    iconRing: "ring-purple-300/55 dark:ring-purple-600/35",
  },
  carrot: {
    cardGradient:
      "bg-gradient-to-br from-orange-100/90 via-amber-50 to-yellow-50 dark:from-orange-950/40 dark:via-amber-950/25 dark:to-yellow-950/20",
    iconRing: "ring-orange-300/60 dark:ring-orange-600/35",
  },
  negi: {
    cardGradient:
      "bg-gradient-to-br from-emerald-100/85 via-green-50 to-lime-50 dark:from-emerald-950/40 dark:via-green-950/25 dark:to-lime-950/20",
    iconRing: "ring-emerald-300/55 dark:ring-emerald-600/35",
  },
  hakusai: {
    cardGradient:
      "bg-gradient-to-br from-yellow-100/80 via-lime-50 to-green-50 dark:from-yellow-950/30 dark:via-lime-950/25 dark:to-green-950/25",
    iconRing: "ring-yellow-200/70 dark:ring-yellow-700/35",
  },
  potato: {
    cardGradient:
      "bg-gradient-to-br from-amber-100/85 via-yellow-50 to-stone-100 dark:from-amber-950/35 dark:via-yellow-950/20 dark:to-stone-900/40",
    iconRing: "ring-amber-200/70 dark:ring-amber-700/30",
  },
  "green-pepper": {
    cardGradient:
      "bg-gradient-to-br from-lime-100/88 via-green-50 to-emerald-50 dark:from-lime-950/35 dark:via-green-950/30 dark:to-emerald-950/25",
    iconRing: "ring-lime-400/50 dark:ring-lime-600/35",
  },
  spinach: {
    cardGradient:
      "bg-gradient-to-br from-green-100/90 via-emerald-50 to-teal-50 dark:from-green-950/45 dark:via-emerald-950/30 dark:to-teal-950/25",
    iconRing: "ring-green-400/50 dark:ring-green-600/40",
  },
  lettuce: {
    cardGradient:
      "bg-gradient-to-br from-green-100/85 via-lime-50 to-cyan-50 dark:from-green-950/40 dark:via-lime-950/25 dark:to-cyan-950/20",
    iconRing: "ring-green-300/55 dark:ring-green-600/35",
  },
  broccoli: {
    cardGradient:
      "bg-gradient-to-br from-emerald-100/90 via-green-50 to-lime-50 dark:from-emerald-950/45 dark:via-green-950/30 dark:to-lime-950/25",
    iconRing: "ring-emerald-400/55 dark:ring-emerald-600/40",
  },
  asparagus: {
    cardGradient:
      "bg-gradient-to-br from-lime-100/88 via-green-50 to-emerald-50 dark:from-lime-950/40 dark:via-green-950/28 dark:to-emerald-950/25",
    iconRing: "ring-lime-400/55 dark:ring-lime-600/38",
  },
  "fruit-tomato": {
    cardGradient:
      "bg-gradient-to-br from-rose-100/90 via-red-50 to-orange-50 dark:from-rose-950/45 dark:via-red-950/30 dark:to-orange-950/25",
    iconRing: "ring-rose-300/65 dark:ring-rose-600/40",
  },
  "mini-tomato": {
    cardGradient:
      "bg-gradient-to-br from-rose-100/90 via-red-50 to-orange-50 dark:from-rose-950/45 dark:via-red-950/30 dark:to-orange-950/25",
    iconRing: "ring-rose-300/65 dark:ring-rose-600/40",
  },
  "broccoli-sprout": {
    cardGradient:
      "bg-gradient-to-br from-teal-100/88 via-emerald-50 to-green-50 dark:from-teal-950/40 dark:via-emerald-950/30 dark:to-green-950/25",
    iconRing: "ring-teal-400/55 dark:ring-teal-600/35",
  },
  "sweet-corn": {
    cardGradient:
      "bg-gradient-to-br from-yellow-100/90 via-amber-50 to-orange-50 dark:from-yellow-950/35 dark:via-amber-950/30 dark:to-orange-950/25",
    iconRing: "ring-yellow-300/60 dark:ring-yellow-600/35",
  },
  pumpkin: {
    cardGradient:
      "bg-gradient-to-br from-orange-100/88 via-amber-50 to-red-50 dark:from-orange-950/40 dark:via-amber-950/25 dark:to-red-950/20",
    iconRing: "ring-orange-400/55 dark:ring-orange-600/35",
  },
  edamame: {
    cardGradient:
      "bg-gradient-to-br from-lime-100/88 via-green-50 to-emerald-50 dark:from-lime-950/35 dark:via-green-950/30 dark:to-emerald-950/25",
    iconRing: "ring-lime-400/50 dark:ring-lime-600/35",
  },
};

const fallbackVisual: VegVisualStyle = {
  cardGradient:
    "bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/35 dark:via-emerald-950/25 dark:to-teal-950/20",
  iconRing: "ring-emerald-300/50 dark:ring-emerald-600/35",
};

export function getVegVisual(slug: string): VegVisualStyle {
  return vegetableVisualBySlug[slug] ?? fallbackVisual;
}
