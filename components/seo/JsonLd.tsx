/**
 * `<JsonLd>` — schema.org の構造化データを `<script type="application/ld+json">` として注入する
 * 小さなサーバーコンポーネント。`"use client"` は不要。
 *
 * 使い方の例:
 *
 *   import { JsonLd } from "@/components/seo/JsonLd";
 *
 *   export default function Page() {
 *     const article = {
 *       "@context": "https://schema.org",
 *       "@type": "Article",
 *       headline: "ピーマンの旬と選び方",
 *       datePublished: "2026-05-01",
 *       author: { "@type": "Organization", name: "野菜・果物の旬と相場メモ" },
 *     };
 *     return (
 *       <>
 *         <JsonLd data={article} />
 *         <article>…</article>
 *       </>
 *     );
 *   }
 *
 * 複数注入したい場合は `<JsonLd data={article} />` を並べるか、
 * `data` に配列を渡しても OK（`@graph` を使うのが正攻法だが、配列でも各検索エンジンは解釈する）。
 */

export type JsonLdData = Record<string, unknown> | Array<Record<string, unknown>>;

type JsonLdProps = {
  data: JsonLdData;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default JsonLd;
