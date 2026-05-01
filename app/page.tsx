import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <div className="min-h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.08),transparent)]">
      <header className="border-b border-stone-200/80 bg-white/70 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            比較ピック
          </Link>
          <span className="text-xs text-stone-500 dark:text-stone-500">アフィリエイト比較</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">
            目的別におすすめを厳選
          </h1>
          <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-400">
            機能・価格帯・向いている人を整理しました。気になるサービスは詳細ページでポイントを確認し、公式情報とあわせて判断してください。
          </p>
        </div>

        <section className="mt-14" aria-labelledby="picks-heading">
          <h2 id="picks-heading" className="text-sm font-semibold uppercase tracking-wider text-stone-500">
            今週のおすすめ3選
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <footer className="mt-20 border-t border-stone-200 pt-8 text-center text-xs leading-relaxed text-stone-500 dark:border-stone-800 dark:text-stone-500">
          <p>
            当サイトはアフィリエイトプログラムにより報酬を得る場合があります。
            <br className="hidden sm:inline" />
            掲載内容は情報提供を目的としており、特定商品の推奨を保証するものではありません。
          </p>
        </footer>
      </main>
    </div>
  );
}
