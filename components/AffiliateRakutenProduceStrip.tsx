import { fetchRakutenProduceHits } from "@/lib/affiliate/rakuten-ichiba-search";

function formatYen(n: number) {
  try {
    return new Intl.NumberFormat("ja-JP").format(n);
  } catch {
    return String(n);
  }
}

/**
 * おすすめ品名をキーワードに楽天商品検索APIでヒットを表示（サーバー取得）。
 * .env に RAKUTEN_ICHIBA_APPLICATION_ID / RAKUTEN_ICHIBA_ACCESS_KEY が無い場合は何も出しません。
 * 楽天アフィリエイトの affiliateId を RAKUTEN_AFFILIATE_ID に入れると計測付きURLになります（A8リンクはAPIでは発行不可）。
 */
export async function AffiliateRakutenProduceStrip({ keyword }: { keyword: string }) {
  const hits = await fetchRakutenProduceHits(keyword.trim());
  if (!hits?.length) return null;

  const hasAffiliate = Boolean(process.env.RAKUTEN_AFFILIATE_ID?.trim());

  return (
    <div className="mt-6 rounded-xl border border-emerald-900/12 bg-emerald-50/40 p-4 dark:border-emerald-100/12 dark:bg-emerald-950/50">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
        PR · 楽天市場（キーワード自動検索）
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">
        「{keyword.trim()}」に近い商品を楽天の公式APIから最大3件表示しています。
        {hasAffiliate ? "" : "（アフィリエイト計測は RAKUTEN_AFFILIATE_ID 未設定のため通常URLです）"}
      </p>
      <ul className="mt-3 flex flex-col gap-3">
        {hits.map((h) => (
          <li
            key={`${h.clickUrl}-${h.itemName.slice(0, 40)}`}
            className="flex gap-3 rounded-lg border border-emerald-900/10 bg-white/90 p-2.5 dark:border-emerald-100/10 dark:bg-emerald-950/80"
          >
            {h.imageUrl ? (
              <a
                href={h.clickUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="shrink-0 outline-offset-2 focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={h.imageUrl}
                  alt=""
                  width={56}
                  height={56}
                  className="size-14 rounded-md border border-emerald-900/10 object-contain dark:border-emerald-100/15"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ) : null}
            <div className="min-w-0 flex-1">
              <a
                href={h.clickUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="text-xs font-medium leading-snug text-emerald-950 underline-offset-2 hover:underline dark:text-emerald-50"
              >
                {h.itemName}
              </a>
              <p className="mt-1 text-[11px] tabular-nums text-emerald-900/85 dark:text-emerald-100/80">
                価格（税込表示の場合あり）: <span className="font-semibold text-red-700 dark:text-red-400">{formatYen(h.itemPrice)}円</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
