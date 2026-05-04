import type { Metadata } from "next";
import { AnchorSection } from "@/components/AnchorSection";
import { InPageJumpButtons } from "@/components/InPageJumpButtons";
import { LegalNotice } from "@/components/LegalNotice";
import {
  SELECT_KIND_DESCRIPTION,
  SELECT_KIND_LABEL,
  selectItems,
  type SelectItem,
  type SelectKind,
} from "@/lib/columns/select-guide";

export const metadata: Metadata = {
  title: "お店での野菜・果物の選び方ガイド",
  description:
    "野菜・果物を見た目・手触り・避けたいサインの3点から品目別にチェック。スーパー・八百屋で迷ったときの実用ガイドです。",
};

const KIND_ORDER: SelectKind[] = ["vegetable", "fruit"];

const KIND_ANCHOR: Record<SelectKind, string> = {
  vegetable: "select-vegetable",
  fruit: "select-fruit",
};

function CheckList({ heading, color, items }: { heading: string; color: "look" | "feel" | "avoid"; items: string[] }) {
  const tone =
    color === "look"
      ? "border-emerald-500/35"
      : color === "feel"
        ? "border-sky-500/35"
        : "border-rose-500/45";
  const headColor =
    color === "look"
      ? "text-emerald-700 dark:text-emerald-300"
      : color === "feel"
        ? "text-sky-700 dark:text-sky-300"
        : "text-rose-700 dark:text-rose-300";
  return (
    <div>
      <p className={`text-[11px] font-semibold uppercase tracking-wide ${headColor}`}>{heading}</p>
      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-emerald-900/88 dark:text-emerald-100/80">
        {items.map((line) => (
          <li key={line} className={`flex gap-2 border-l-2 ${tone} pl-3`}>
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SelectItemCard({ item }: { item: SelectItem }) {
  return (
    <article className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm dark:border-emerald-100/10 dark:bg-emerald-950 sm:p-6">
      <h3 className="text-lg font-semibold text-emerald-950 dark:text-emerald-50">{item.name}</h3>
      <div className="mt-4 space-y-4">
        <CheckList heading="見た目（look）" color="look" items={item.look} />
        <CheckList heading="手触り・重さ（feel）" color="feel" items={item.feel} />
        <CheckList heading="避けたいサイン（avoid）" color="avoid" items={item.avoid} />
      </div>
    </article>
  );
}

export default function SelectColumnPage() {
  const grouped = KIND_ORDER.map((kind) => ({
    kind,
    items: selectItems.filter((item) => item.kind === kind),
  }));

  return (
    <article id="page-top" className="relative mx-auto w-full max-w-[40rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <InPageJumpButtons tocAnchorId="select-toc" />

      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
          Select guide
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-3xl">
          お店での野菜・果物の選び方ガイド
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-emerald-800/88 dark:text-emerald-200/78">
          売場で迷ったときの実用チェックポイントを、品目別に「見た目」「手触り・重さ」「避けたいサイン」の3つに整理しました。スーパー・八百屋・直売所など、買い物のスタイルに合わせて使えます。
        </p>
        <p className="mt-3 text-xs leading-relaxed text-emerald-800/78 dark:text-emerald-200/68">
          掲載品目：{selectItems.length}品。野菜と果物に分けて並べています。
        </p>
      </header>

      <details
        open
        id="select-toc"
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-8 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/10 bg-white/95 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-100/10 dark:bg-emerald-950/95 sm:p-5"
      >
        <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
          このページの構成（ジャンプ）
        </summary>
        <nav aria-label="ページ内セクション" className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {KIND_ORDER.map((kind) => (
            <a
              key={kind}
              href={`#${KIND_ANCHOR[kind]}`}
              className="text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
            >
              {SELECT_KIND_LABEL[kind]}
            </a>
          ))}
        </nav>
      </details>

      <div className="relative z-10 mt-10 space-y-14">
        <LegalNotice title="選び方の目安について">
          {`掲載しているチェックポイントは、家庭で参考にしやすい一般的な目安です。\n品種・産地・季節・収穫からの日数によって、見た目や手触りには例外があります。\n値段・鮮度・好みを総合して、自分の用途（その日のうちに食べる／作り置きする 等）に合うものを選んでください。`}
        </LegalNotice>

        <AnchorSection id="select-overview" className="space-y-3">
          <h2 className="text-base font-semibold text-emerald-950 dark:text-emerald-50">買い物の前に押さえておきたい3つの軸</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">
            <li className="flex gap-2 border-l-2 border-emerald-500/35 pl-3">
              <strong className="font-semibold text-emerald-950 dark:text-emerald-50">見た目（look）</strong>
              ：色つや・形・ヘタや切り口の状態。離れていても判断しやすい入口です。
            </li>
            <li className="flex gap-2 border-l-2 border-sky-500/35 pl-3">
              <strong className="font-semibold text-emerald-950 dark:text-emerald-50">手触り・重さ（feel）</strong>
              ：張り・重量感・押したときの戻り。サイズに対して重いものは水分・果汁が残っているサインになりやすいです。
            </li>
            <li className="flex gap-2 border-l-2 border-rose-500/45 pl-3">
              <strong className="font-semibold text-emerald-950 dark:text-emerald-50">避けたいサイン（avoid）</strong>
              ：変色・しわ・傷・ぬめり・カビ。1つでも目立つ場合は別の個体を選ぶのが無難です。
            </li>
          </ul>
        </AnchorSection>

        {grouped.map(({ kind, items }) => (
          <AnchorSection key={kind} id={KIND_ANCHOR[kind]} className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
              <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
                {SELECT_KIND_LABEL[kind]}（{items.length}品）
              </h2>
              <span className="h-px flex-1 bg-emerald-900/15 dark:bg-emerald-100/15" aria-hidden />
            </div>
            <p className="text-sm leading-relaxed text-emerald-900/85 dark:text-emerald-100/78">
              {SELECT_KIND_DESCRIPTION[kind]}
            </p>
            <div className="space-y-6">
              {items.map((item) => (
                <SelectItemCard key={item.name} item={item} />
              ))}
            </div>
          </AnchorSection>
        ))}
      </div>
    </article>
  );
}
