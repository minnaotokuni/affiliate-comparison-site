/**
 * 楽天商品（A8）汎用ウィジェット。
 *
 * 既存の `AffiliateRakutenProductCookDo` などと同じ見た目を Props 化したもの。
 * 新しい品目を追加するときは、本コンポーネントを薄くラップした専用ファイルを作るか、
 * 直接コラム側で本コンポーネントを呼び出して `productLink / thumbSrc / pixelSrc / title` を差し替えれば良い。
 */

type Props = {
  /** 楽天 → A8 の計測リンク（rpx.a8.net 経由） */
  productLink: string;
  /** thumbnail.image.rakuten.co.jp の 64x64 サムネ URL */
  thumbSrc: string;
  /** A8 の 0.gif 計測ピクセル URL */
  pixelSrc: string;
  /** 商品名（楽天で配布される長文タイトルのまま入れて良い） */
  title: string;
  /** 価格行（例: "価格: 4580円〜 (2026/5/3 16:42時点)"）。省略可 */
  priceLine?: string;
  /** レビュー件数行（例: "感想(82件)"）。省略可 */
  reviewLine?: string;
  /** 上部ラベル。省略時は "PR · 楽天商品" */
  label?: string;
};

export function AffiliateRakutenA8Product({
  productLink,
  thumbSrc,
  pixelSrc,
  title,
  priceLine,
  reviewLine,
  label = "PR · 楽天商品",
}: Props) {
  return (
    <div className="relative my-8 max-w-[300px] rounded-lg border border-emerald-900/15 bg-white p-3 shadow-sm dark:border-emerald-100/15 dark:bg-emerald-950/80">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
        {label}
      </p>
      <table className="w-[300px] max-w-full border-collapse border border-neutral-300 dark:border-emerald-100/20">
        <tbody>
          <tr>
            <td className="w-11 align-top border-0 p-2.5 sm:w-[44px]">
              <a
                href={productLink}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-block outline-offset-2 focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbSrc}
                  alt=""
                  width={44}
                  height={44}
                  className="max-w-none border-0"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </td>
            <td className="align-middle border-0 p-2.5 text-xs leading-snug text-emerald-950 dark:text-emerald-50">
              <p className="m-0 p-0">
                <a
                  href={productLink}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="font-medium text-emerald-900 underline-offset-2 hover:underline dark:text-emerald-100"
                >
                  {title}
                </a>
              </p>
              {priceLine || reviewLine ? (
                <p className="mt-1.5 text-[11px] leading-relaxed text-emerald-800/85 dark:text-emerald-200/75">
                  {priceLine ? <span>{priceLine}</span> : null}
                  {priceLine && reviewLine ? <br /> : null}
                  {reviewLine ? <span className="font-bold">{reviewLine}</span> : null}
                </p>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pixelSrc}
        alt=""
        width={1}
        height={1}
        className="pointer-events-none absolute bottom-0 left-0 opacity-0"
        aria-hidden
      />
    </div>
  );
}
