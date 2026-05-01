import Link from "next/link";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <article className="group flex flex-col rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm shadow-stone-900/5 transition hover:border-stone-300 hover:shadow-md hover:shadow-stone-900/10 dark:border-stone-800 dark:bg-stone-950 dark:shadow-black/20 dark:hover:border-stone-700">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {product.category}
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            {product.name}
          </h2>
        </div>
        {product.badge ? (
          <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
            {product.badge}
          </span>
        ) : null}
      </div>
      <p className="text-sm font-medium text-teal-800 dark:text-teal-300/90">
        {product.tagline}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
        {product.summary}
      </p>
      <p className="mt-4 text-xs text-stone-500 dark:text-stone-500">
        {product.priceDisplay}
      </p>
      <Link
        href={`/products/${product.slug}`}
        className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-stone-900 px-4 text-sm font-medium text-white transition group-hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:group-hover:bg-white"
      >
        詳細を見る
      </Link>
    </article>
  );
}
