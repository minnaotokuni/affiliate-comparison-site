import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, products } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "見つかりません" };
  return {
    title: `${product.name} | 比較ピック`,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Link
        href="/"
        className="text-sm font-medium text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline dark:text-stone-400 dark:hover:text-stone-200"
      >
        ← トップに戻る
      </Link>

      <header className="mt-8 border-b border-stone-200 pb-8 dark:border-stone-800">
        <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
          {product.category}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          {product.name}
        </h1>
        <p className="mt-3 text-lg text-teal-800 dark:text-teal-300/90">
          {product.tagline}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {product.summary}
        </p>
        <p className="mt-4 text-sm font-medium text-stone-700 dark:text-stone-300">
          {product.priceDisplay}
        </p>
      </header>

      <section className="py-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
          ここが押しどころ
        </h2>
        <ul className="mt-4 space-y-3">
          {product.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300"
            >
              <span
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-500"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-6 dark:border-stone-800 dark:bg-stone-900/40">
        <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
          本ページには広告・プロモーションが含まれる場合があります。最終的な料金・仕様は各公式サイトをご確認ください。
        </p>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-stone-900 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white sm:w-auto sm:min-w-[200px] sm:px-8"
        >
          公式・購入ページを開く
        </a>
      </div>
    </div>
  );
}
