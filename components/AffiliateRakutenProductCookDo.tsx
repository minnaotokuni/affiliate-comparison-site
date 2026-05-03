/**
 * 楽天商品（A8・Cook Do 等）ウィジェット。発行コードは A8 管理画面の値に合わせて更新してください。
 */

const PRODUCT_LINK =
  "https://rpx.a8.net/svt/ejp?a8mat=4B3HQJ+3LSINM+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00qzli4.2bo11b9c.g00qzli4.2bo123ae%2Fa26050309084_4B3HQJ_3LSINM_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fauc-hiroshimaya%252F9920180515-7%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fauc-hiroshimaya%252Fi%252F10005587%252F%26rafcid%3Dwsc_i_is_33f72da33714639c415e592c9633ecd7";

const THUMB_SRC =
  "https://thumbnail.image.rakuten.co.jp/@0_mall/auc-hiroshimaya/cabinet/01908867/imgrc0094044687.jpg?_ex=64x64";

const PIXEL_SRC = "https://www19.a8.net/0.gif?a8mat=4B3HQJ+3LSINM+2HOM+BWGDT";

const PRODUCT_TITLE =
  "【調味料】 即食 時短食 レトルト 送料無料 味の素 Cook Do クックドゥ 和食と中華の合わせ調味料 15個セット 本格風味をご家庭で 新着";

/** A8 側の価格表示時刻（更新したら差し替え） */
const PRICE_AS_OF = "2026/5/3 16:29時点";

export function AffiliateRakutenProductCookDo() {
  return (
    <div className="relative my-8 max-w-[300px] rounded-lg border border-emerald-900/15 bg-white p-3 shadow-sm dark:border-emerald-100/15 dark:bg-emerald-950/80">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">PR · 楽天商品</p>
      <table className="w-[300px] max-w-full border-collapse border border-neutral-300 dark:border-emerald-100/20">
        <tbody>
          <tr>
            <td className="w-11 align-top border-0 p-2.5 sm:w-[44px]">
              <a
                href={PRODUCT_LINK}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-block outline-offset-2 focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={THUMB_SRC} alt="" width={44} height={44} className="max-w-none border-0" loading="lazy" decoding="async" />
              </a>
            </td>
            <td className="align-middle border-0 p-2.5 text-xs leading-snug text-emerald-950 dark:text-emerald-50">
              <p className="m-0 p-0">
                <a
                  href={PRODUCT_LINK}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="font-medium text-emerald-900 underline-offset-2 hover:underline dark:text-emerald-100"
                >
                  {PRODUCT_TITLE}
                </a>
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-emerald-800/85 dark:text-emerald-200/75">
                価格:
                <span className="text-sm font-bold text-red-700 dark:text-red-400">3750円</span>
                <br />
                <span className="text-[10px] font-normal">({PRICE_AS_OF})</span>
                <br />
                <span className="font-bold">感想(7件)</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PIXEL_SRC}
        alt=""
        width={1}
        height={1}
        className="pointer-events-none absolute bottom-0 left-0 opacity-0"
        aria-hidden
      />
    </div>
  );
}
