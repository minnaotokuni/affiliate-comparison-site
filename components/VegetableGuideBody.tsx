"use client";

import { useMemo, useState } from "react";
import { AnchorSection } from "@/components/AnchorSection";
import { InPageJumpButtons } from "@/components/InPageJumpButtons";
import { type VegetableProfile, vegetableProfiles } from "@/lib/columns/vegetable-profiles";
import { getVegVisual } from "@/lib/columns/vegetable-visuals";
import { VeggieIcon } from "@/components/VeggieIcon";

function isDesignatedOrScheduled(p: VegetableProfile) {
  return p.tags.some((t) => t.includes("指定野菜"));
}

export function VegetableGuideBody() {
  const [designatedOnly, setDesignatedOnly] = useState(false);

  const visible = useMemo(
    () => (designatedOnly ? vegetableProfiles.filter(isDesignatedOrScheduled) : vegetableProfiles),
    [designatedOnly],
  );

  return (
    <>
      <InPageJumpButtons tocAnchorId="vegetable-toc" />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium text-emerald-800/80 dark:text-emerald-200/70">表示:</span>
        <div className="flex rounded-full border border-emerald-900/15 bg-white p-0.5 dark:border-emerald-100/15 dark:bg-emerald-950">
          <button
            type="button"
            onClick={() => setDesignatedOnly(false)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              !designatedOnly
                ? "bg-emerald-700 text-white shadow-sm dark:bg-emerald-500 dark:text-emerald-950"
                : "text-emerald-800 hover:bg-emerald-50 dark:text-emerald-200 dark:hover:bg-emerald-900"
            }`}
          >
            すべて（{vegetableProfiles.length}）
          </button>
          <button
            type="button"
            onClick={() => setDesignatedOnly(true)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              designatedOnly
                ? "bg-emerald-700 text-white shadow-sm dark:bg-emerald-500 dark:text-emerald-950"
                : "text-emerald-800 hover:bg-emerald-50 dark:text-emerald-200 dark:hover:bg-emerald-900"
            }`}
          >
            指定野菜＋追加予定のみ
          </button>
        </div>
      </div>

      <details
        open
        id="vegetable-toc"
        className="sticky top-[var(--site-sticky-toc-top)] z-[5] mt-8 scroll-mt-[var(--site-scroll-padding)] rounded-2xl border border-emerald-900/15 bg-gradient-to-br from-white via-emerald-50/90 to-amber-50/40 p-4 shadow-md backdrop-blur-sm dark:border-emerald-100/15 dark:from-emerald-950/95 dark:via-emerald-950/90 dark:to-orange-950/30 sm:p-5"
      >
        <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-900 marker:content-none dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
          もくじ（野菜へジャンプ）— タップで開閉できます
        </summary>
        <nav aria-label="野菜一覧" className="mt-3">
          {visible.length === 0 ? (
            <p className="text-xs text-emerald-800/75 dark:text-emerald-200/65">該当する品目がありません。フィルタを解除してください。</p>
          ) : (
            <ul className="columns-2 gap-x-4 gap-y-2 text-xs sm:columns-3">
              {visible.map((v) => (
                <li key={v.slug} className="break-inside-avoid py-0.5">
                  <a
                    href={`#${v.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg py-0.5 text-emerald-900 underline-offset-2 hover:bg-white/60 hover:underline dark:text-emerald-100 dark:hover:bg-emerald-900/50"
                  >
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/90 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-900/80 dark:ring-emerald-100/10"
                      aria-hidden
                    >
                      <VeggieIcon slug={v.slug} size={26} />
                    </span>
                    <span>{v.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </details>

      <div className="relative z-10 mt-12 space-y-14">
        {visible.map((v) => {
          const visual = getVegVisual(v.slug);
          return (
          <AnchorSection
            key={v.slug}
            id={v.slug}
            className={`rounded-2xl border border-white/50 p-5 shadow-md ring-1 ring-emerald-900/10 dark:border-emerald-800/40 dark:ring-emerald-100/10 sm:p-7 ${visual.cardGradient}`}
          >
            <div className="flex flex-wrap items-start gap-4 border-b border-emerald-900/10 pb-4 dark:border-emerald-100/15">
              <div
                className={`flex shrink-0 items-center justify-center rounded-2xl bg-white/85 p-3 shadow-sm ring-2 ring-offset-2 ring-offset-transparent dark:bg-emerald-950/70 dark:ring-offset-emerald-950 ${visual.iconRing}`}
              >
                <VeggieIcon slug={v.slug} size={64} title={`${v.name}のイラスト`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-emerald-950 dark:text-emerald-50">{v.name}</h2>
                    <p className="mt-1 text-[11px] text-emerald-800/85 dark:text-emerald-200/75">
                      読み方: 栄養（成分と一般的な役わり）→ 旬の組み合わせ → 調理 → お店での選び方 → 糖度（該当品のみ）
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {v.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-900/75 dark:text-emerald-50 dark:ring-emerald-100/15"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {v.extraNote ? (
              <p className="mt-4 text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">{v.extraNote}</p>
            ) : null}

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl bg-white/65 p-4 shadow-sm backdrop-blur-sm dark:bg-emerald-950/55 lg:col-span-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  主な栄養素と体内での役わり（一般論）
                </h3>
                <ul className="mt-3 space-y-3 text-sm leading-relaxed text-emerald-950/90 dark:text-emerald-50/88">
                  {v.nutrition.map((row) => (
                    <li key={row.nutrient} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-rose-400/80" aria-hidden />
                      <span>
                        <span className="font-semibold text-emerald-950 dark:text-emerald-50">{row.nutrient}</span>
                        <span className="text-emerald-900/90 dark:text-emerald-100/85"> — {row.role}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-white/65 p-4 shadow-sm backdrop-blur-sm dark:bg-emerald-950/55 lg:col-span-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  旬・その時期に出やすい食材との組み合わせ
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-emerald-950/90 dark:text-emerald-50/88">
                  {v.seasonPairings.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-sky-400/85" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-white/65 p-4 shadow-sm backdrop-blur-sm dark:bg-emerald-950/55 lg:col-span-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">調理・食べ方（基本）</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-emerald-950/90 dark:text-emerald-50/88">
                  {v.howToEat.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-amber-400/90" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-emerald-900/10 bg-white/60 p-4 backdrop-blur-sm dark:border-emerald-100/15 dark:bg-emerald-950/50">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">お店でのチェック・選び方</h3>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm leading-relaxed text-emerald-950/90 dark:text-emerald-50/88">
                {v.selection.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            {v.brixNote ? (
              <div className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/35">
                <h3 className="text-sm font-semibold text-amber-950 dark:text-amber-100">糖度・味の指標（参考）</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-950/90 dark:text-emerald-50/90">{v.brixNote}</p>
              </div>
            ) : null}
          </AnchorSection>
          );
        })}
      </div>

    </>
  );
}
