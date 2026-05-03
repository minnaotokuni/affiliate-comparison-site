/**
 * 楽天（A8ネット経由）バナー。掲載コードは A8 の発行値に合わせて更新してください。
 */

const ICHIBA_LINK =
  "https://rpx.a8.net/svt/ejp?a8mat=4B3HQJ+3LSINM+2HOM+656YP&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa26050309084_4B3HQJ_3LSINM_2HOM_656YP%3Fpc%3Dhttp%253A%252F%252Fwww.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252F";

const ICHIBA_BANNER_IMG =
  "https://hbb.afl.rakuten.co.jp/hsb/0ec09ba3.bc2429d5.0eb4bbaa.95151395/";

const ICHIBA_PIXEL = "https://www17.a8.net/0.gif?a8mat=4B3HQJ+3LSINM+2HOM+656YP";

const TRAVEL_LINK =
  "https://rpx.a8.net/svt/ejp?a8mat=4B3HQJ+3LSINM+2HOM+6I9N5&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0eb4779e.5d30c5ba.0eb4779f.b871e4e3%2Fa26050309084_4B3HQJ_3LSINM_2HOM_6I9N5%3Fpc%3Dhttp%253A%252F%252Ftravel.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Ftravel.rakuten.co.jp%252F";

const TRAVEL_BANNER_IMG =
  "https://hbb.afl.rakuten.co.jp/hsb/0ea7f9a4.79280dcb.0ea7f99d.1ac92fca/153145/";

const TRAVEL_PIXEL = "https://www18.a8.net/0.gif?a8mat=4B3HQJ+3LSINM+2HOM+6I9N5";

function RakutenA8AdBlock({
  label,
  linkHref,
  bannerSrc,
  bannerAlt,
  pixelSrc,
  variant = "standard",
}: {
  label: string;
  linkHref: string;
  bannerSrc: string;
  bannerAlt: string;
  pixelSrc: string;
  variant?: "standard" | "featured";
}) {
  const shell =
    variant === "featured"
      ? "relative rounded-xl border-2 border-amber-400/50 bg-emerald-900/55 px-4 py-4 shadow-lg shadow-black/30 ring-2 ring-amber-300/30 sm:px-6 sm:py-5"
      : "relative rounded-lg border border-amber-400/30 bg-emerald-900/35 px-3 py-3 ring-1 ring-amber-500/15";
  const imgClass =
    variant === "featured"
      ? "max-h-28 w-auto max-w-full border-0 sm:max-h-36 md:max-h-none md:max-w-[min(100%,728px)]"
      : "max-h-24 max-w-full border-0 sm:max-h-none";
  const labelClass =
    variant === "featured"
      ? "mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-amber-50"
      : "mb-2 text-[10px] font-semibold uppercase tracking-wide text-amber-100/95";

  return (
    <div className={shell}>
      <p className={labelClass}>{label}</p>
      <a
        href={linkHref}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="inline-block max-w-full outline-offset-2 transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-amber-400/60"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- 第三者計測付きバナー */}
        <img src={bannerSrc} alt={bannerAlt} className={imgClass} loading="lazy" decoding="async" />
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pixelSrc}
        alt=""
        width={1}
        height={1}
        className="pointer-events-none absolute bottom-0 left-0 h-px w-px overflow-hidden border-0 opacity-0"
        aria-hidden
      />
    </div>
  );
}

/** 楽天市場（A8）。`featured` はヘッダー直下など目立つ枠向け */
export function AffiliateRakutenBanner({ variant = "standard" }: { variant?: "standard" | "featured" } = {}) {
  return (
    <RakutenA8AdBlock
      label="PR · 広告（楽天市場）"
      linkHref={ICHIBA_LINK}
      bannerSrc={ICHIBA_BANNER_IMG}
      bannerAlt="楽天市場"
      pixelSrc={ICHIBA_PIXEL}
      variant={variant}
    />
  );
}

/** 楽天トラベル（A8） */
export function AffiliateRakutenTravelBanner() {
  return (
    <RakutenA8AdBlock
      label="PR · 広告（楽天トラベル）"
      linkHref={TRAVEL_LINK}
      bannerSrc={TRAVEL_BANNER_IMG}
      bannerAlt="楽天トラベル"
      pixelSrc={TRAVEL_PIXEL}
    />
  );
}
