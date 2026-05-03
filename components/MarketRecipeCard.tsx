import type { MarketRecipe } from "@/lib/columns/market-weekly";

export function MarketRecipeCard({ recipe, recipeIndex }: { recipe: MarketRecipe; recipeIndex: number }) {
  return (
    <div className="rounded-xl border border-emerald-900/12 bg-white/90 p-4 shadow-sm dark:border-emerald-100/12 dark:bg-emerald-950/70">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
        レシピ {recipeIndex}
      </p>
      <h4 className="mt-1 text-base font-semibold text-emerald-950 dark:text-emerald-50">{recipe.title}</h4>
      <p className="mt-1 text-[11px] text-emerald-800/75 dark:text-emerald-200/65">{recipe.timeNote}</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-200">材料</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-xs leading-relaxed text-emerald-900/90 dark:text-emerald-100/82">
            {recipe.ingredients.map((line, i) => (
              <li key={`${recipe.title}-ing-${i}`}>{line}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-200">手順</p>
          <ol className="mt-2 list-decimal space-y-2 pl-4 text-xs leading-relaxed text-emerald-900/90 dark:text-emerald-100/82">
            {recipe.steps.map((step, i) => (
              <li key={`${recipe.title}-step-${i}`}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
