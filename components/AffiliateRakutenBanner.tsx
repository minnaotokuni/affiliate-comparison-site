/**
 * 楽天市場（A8ネット経由）バナー。掲載コードは A8 の発行値に合わせて更新してください。
 */

const RAKUTEN_A8_LINK =
  "https://rpx.a8.net/svt/ejp?a8mat=4B3HQJ+3LSINM+2HOM+656YP&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa26050309084_4B3HQJ_3LSINM_2HOM_656YP%3Fpc%3Dhttp%253A%252F%252Fwww.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252F";

/** 本番 HTTPS では http 画像がブロックされやすいため https を使用 */
const RAKUTEN_BANNER_IMG =
  "https://hbb.afl.rakuten.co.jp/hsb/0ec09ba3.bc2429d5.0eb4bbaa.95151395/";

const A8_IMPRESSION_PIXEL =
  "https://www17.a8.net/0.gif?a8mat=4B3HQJ+3LSINM+2HOM+656YP";

export function AffiliateRakutenBanner() {
  return (
    <div className="relative rounded-lg border border-amber-400/30 bg-emerald-900/35 px-3 py-3 ring-1 ring-amber-500/15">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-amber-100/95">PR · 広告（楽天市場）</p>
      <a
        href={RAKUTEN_A8_LINK}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="inline-block max-w-full outline-offset-2 transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-amber-400/60"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- 第三者計測付きバナー */}
        <img src={RAKUTEN_BANNER_IMG} alt="楽天市場" className="max-h-24 max-w-full border-0 sm:max-h-none" loading="lazy" decoding="async" />
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={A8_IMPRESSION_PIXEL}
        alt=""
        width={1}
        height={1}
        className="pointer-events-none absolute bottom-0 left-0 h-px w-px overflow-hidden border-0 opacity-0"
        aria-hidden
      />
    </div>
  );
}
