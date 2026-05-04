import type { Metadata } from "next";
import { AnchorSection } from "@/components/AnchorSection";
import { ShoppingBag, SectionDivider } from "@/components/illustrations";
import { InPageJumpButtons } from "@/components/InPageJumpButtons";
import { LegalNotice } from "@/components/LegalNotice";
import { PageHero } from "@/components/PageHero";
import {
  STORAGE_CATEGORY_DESCRIPTION,
  STORAGE_CATEGORY_LABEL,
  storageItems,
  type StorageCategory,
  type StorageItem,
} from "@/lib/columns/storage-guide";

export const metadata: Metadata = {
  title: "野菜・果物の保存方法ガイド",
  description:
    "葉物・根菜・果菜・果物別に、常温・冷蔵・冷凍それぞれの目安と日数、家庭での実用ヒントをまとめた保存ガイド。",
};

const CATEGORY_ORDER: StorageCategory[] = ["leaf", "root", "fruit-vegetable", "fruit"];

const CATEGORY_ANCHOR: Record<StorageCategory, string> = {
  leaf: "storage-leaf",
  root: "storage-root",
  "fruit-vegetable": "storage-fruit-vegetable",
  fruit: "storage-fruit",
};

function StorageItemCard({ item }: { item: StorageItem }) {
  return (
    <article className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm dark:border-emerald-100/10 dark:bg-emerald-950 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-emerald-900/8 pb-3 dark:border-emerald-100/10">
        <h3 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">{item.name}</h3>
        <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">{item.daysApprox}</span>
      </div>
      <dl className="mt-4 space-y-3 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/80">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            常温
          </dt>
          <dd className="mt-1">{item.roomTemp}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            冷蔵
          </dt>
          <dd className="mt-1">{item.fridge}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            冷凍
          </dt>
          <dd className="mt-1">{item.freezer}</dd>
        </div>
      </dl>
      <p className="mt-4 rounded-xl bg-emerald-50/70 px-3 py-2 text-xs leading-relaxed text-emerald-900/90 dark:bg-emerald-900/30 dark:text-emerald-100/85">
        <span className="font-semibold">ヒント：</span>
        {item.tip}
      </p>
    </article>
  );
}

export default function StorageColumnPage() {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: storageItems.filter((item) => item.category === category),
  }));

  return (
    <article id="page-top" className="relative mx-auto w-full max-w-[40rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <InPageJumpButtons tocAnchorId="storage-toc" />

      <PageHero
        eyebrow="Storage guide"
        title="野菜・果物の保存方法ガイド"
        description={
          <>
            <p>
              常温・冷蔵・冷凍のどれが向きやすいか、家庭での目安を品目別にまとめました。冷蔵庫の温度・湿度や、買ったときの状態でも実際の持ちは変わります。色・におい・手触りでの最終判断もあわせてどうぞ。
            </p>
            <p className="mt-3 text-xs leading-relaxed text-emerald-800/78 dark:text-emerald-200/68">
              掲載品目：{storageItems.length}品。葉物・根菜・果菜・果物のカテゴリ別に並べています。
            </p>
          </>
        }
        illustration={
          <ShoppingBag
            decorative
            className="hidden h-auto w-[150px] sm:block lg:w-[200px]"
          />
        }
        tone="amber"
      />

      <details
        open
        id="storage-toc"
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-8 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white/95 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/95 sm:p-5"
      >
        <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
          このページの構成（ジャンプ）
        </summary>
        <nav aria-label="ページ内セクション" className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {CATEGORY_ORDER.map((category) => (
            <a
              key={category}
              href={`#${CATEGORY_ANCHOR[category]}`}
              className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
            >
              {STORAGE_CATEGORY_LABEL[category]}
            </a>
          ))}
        </nav>
      </details>

      <div className="relative z-10 mt-10 space-y-14">
        <LegalNotice title="保存目安について">
          {`掲載している日数や手順は、家庭で参考にしやすい一般的な目安です。冷蔵庫の温度設定、購入時の鮮度、季節の気温で持ちは変わります。色・におい・ぬめり・酸味のあるニオイなど、いつもと違うサインがあれば日数に関わらず使用を中止してください。\n冷凍した食材を解凍した場合は、再冷凍は避けて早めに使い切るのがおすすめです。`}
        </LegalNotice>

        {grouped.map(({ category, items }, idx) => (
          <div key={category} className="space-y-6">
            {idx > 0 ? (
              <div aria-hidden className="px-2">
                <SectionDivider height={28} />
              </div>
            ) : null}
            <AnchorSection id={CATEGORY_ANCHOR[category]} className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
                <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
                  {STORAGE_CATEGORY_LABEL[category]}（{items.length}品）
                </h2>
                <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
              </div>
              <p className="text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">
                {STORAGE_CATEGORY_DESCRIPTION[category]}
              </p>
              <div className="space-y-6">
                {items.map((item) => (
                  <StorageItemCard key={item.name} item={item} />
                ))}
              </div>
            </AnchorSection>
          </div>
        ))}

        <section className="rounded-2xl border border-emerald-900/10 bg-emerald-50/40 p-5 text-sm leading-relaxed text-emerald-900/85 dark:border-emerald-100/10 dark:bg-emerald-950/40 dark:text-emerald-100/80 sm:p-6">
          <h2 className="text-base font-semibold text-emerald-950 dark:text-emerald-50">家庭で覚えておくと便利なポイント</h2>
          <ul className="mt-3 space-y-2">
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              冷蔵庫の野菜室は3〜8℃前後が一般的。詰めすぎると冷気が回らず、想定より早く傷むことがあります。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              エチレンガスを多く出す果物（りんご・バナナなど）は、追熟させたくない野菜と分けて保存すると安心です。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              冷凍は「使い切れない量を買ってしまったとき」の保険として便利。下処理してから冷凍すると、凍ったまま調理できて時短になります。
            </li>
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              洗ってから保存するか、使う直前に洗うかは品目で変わります。葉物・果物はとくに「使う直前に洗う」ほうが長持ちしやすいです。
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
