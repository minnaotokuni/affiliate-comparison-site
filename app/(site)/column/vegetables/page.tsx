import type { Metadata } from "next";
import { LegalNotice } from "@/components/LegalNotice";
import { VegetableGuideBody } from "@/components/VegetableGuideBody";
import { VegetableGuideHero } from "@/components/VegetableGuideHero";
import { pharmaRelatedDisclaimer } from "@/lib/legal-copy";

export const metadata: Metadata = {
  title: "野菜別ガイド（指定野菜・定番品目）",
  description:
    "キャベツ・トマト・ブロッコリースプラウトなど、売場で多い野菜の栄養素と一般的な役わり、旬の組み合わせ、調理、選び方。糖度は参考目安です。疾病を約束する効能表現はしません。",
};

export default function VegetablesGuidePage() {
  return (
    <article id="page-top" className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:max-w-4xl lg:px-8">
      <header className="border-b border-emerald-900/10 pb-8 dark:border-emerald-100/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
          Vegetable profiles
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">
          野菜別ガイド
        </h1>
        <VegetableGuideHero />
        <p className="mt-6 text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100/75">
          バイヤー現場で顔を合わせやすい<strong className="font-semibold text-emerald-950 dark:text-emerald-50">指定野菜</strong>
          を軸に、売場でも多い品目と話題の芽菜をまとめました。公開資料・食品表示の一般的な説明をベースにしており、品種・産地・規格で差があります。
        </p>
        <div className="mt-6 space-y-4">
          <LegalNotice variant="warn" title="健康・効果に関する表現">
            {pharmaRelatedDisclaimer.trim()}
          </LegalNotice>
          <p className="text-xs leading-relaxed text-emerald-800/75 dark:text-emerald-200/65">
            糖度（°Brix）は測定機・部位・成熟度で変わります。ここに書いた範囲は文献・業界で参照されやすい「目安」であり、特定ロットの保証ではありません。
          </p>
        </div>
      </header>

      <VegetableGuideBody />
    </article>
  );
}
