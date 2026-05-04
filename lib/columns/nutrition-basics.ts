/**
 * 野菜・果物の栄養素の基礎（家庭目安）。
 * - 「効能を保証するもの」ではなく、「食品成分として一般にこう説明されることが多い」という整理にとどめます。
 * - 持病・服薬中・妊娠中・小児・高齢の方は、医師・薬剤師・管理栄養士に相談したうえで取り入れてください。
 */

export type NutritionTag =
  | "fiber"
  | "vitamin-c"
  | "vitamin-a"
  | "vitamin-k"
  | "folate"
  | "potassium"
  | "calcium"
  | "iron"
  | "magnesium"
  | "lycopene"
  | "anthocyanin"
  | "polyphenol";

export type NutritionEntry = {
  /** 栄養素・成分名 */
  name: string;
  /** 識別用タグ（カラーやアイコンに使う想定） */
  tag: NutritionTag;
  /** 一般的にどんな役わりで語られることが多いか（断定しない） */
  role: string;
  /** 多く含まれやすい食品の例 */
  richIn: string[];
  /** 食べ合わせ・過剰摂取・服薬との一般注意 */
  caution: string;
};

export const NUTRITION_TAG_BADGE: Record<NutritionTag, string> = {
  fiber: "bg-emerald-100/80 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-100",
  "vitamin-c": "bg-amber-100/85 text-amber-900 dark:bg-amber-900/45 dark:text-amber-100",
  "vitamin-a": "bg-orange-100/85 text-orange-900 dark:bg-orange-900/45 dark:text-orange-100",
  "vitamin-k": "bg-lime-100/85 text-lime-900 dark:bg-lime-900/45 dark:text-lime-100",
  folate: "bg-teal-100/85 text-teal-900 dark:bg-teal-900/45 dark:text-teal-100",
  potassium: "bg-sky-100/85 text-sky-900 dark:bg-sky-900/45 dark:text-sky-100",
  calcium: "bg-stone-100/85 text-stone-900 dark:bg-stone-800/60 dark:text-stone-100",
  iron: "bg-rose-100/85 text-rose-900 dark:bg-rose-900/45 dark:text-rose-100",
  magnesium: "bg-violet-100/85 text-violet-900 dark:bg-violet-900/45 dark:text-violet-100",
  lycopene: "bg-red-100/85 text-red-900 dark:bg-red-900/45 dark:text-red-100",
  anthocyanin: "bg-indigo-100/85 text-indigo-900 dark:bg-indigo-900/45 dark:text-indigo-100",
  polyphenol: "bg-fuchsia-100/85 text-fuchsia-900 dark:bg-fuchsia-900/45 dark:text-fuchsia-100",
};

export const nutritionEntries: readonly NutritionEntry[] = [
  {
    name: "食物繊維",
    tag: "fiber",
    role: "腸内環境や便通に関連して語られることが多い成分です。水溶性・不溶性があり、両方をバランスよくとるのが一般的に推奨されます。",
    richIn: ["ごぼう", "れんこん", "ブロッコリー", "かぼちゃ", "りんご（皮ごと）", "アボカド"],
    caution: "とりすぎるとお腹が張る・ガスがたまるなど不快に感じる場合があります。水分とあわせて少しずつ増やすのが無難です。",
  },
  {
    name: "ビタミンC",
    tag: "vitamin-c",
    role: "野菜・果物の代表的な水溶性ビタミン。家庭料理では「鮮度や調理法で量が変わりやすい」と語られます。",
    richIn: ["ピーマン", "ブロッコリー", "キウイフルーツ", "いちご", "柑橘類（みかん・オレンジ）", "じゃがいも"],
    caution: "水溶性で熱・水に溶けやすいので、ゆで汁ごと使うスープなどが向きます。サプリで多量にとると体質によりお腹がゆるくなる場合があります。",
  },
  {
    name: "ビタミンA（β-カロテン）",
    tag: "vitamin-a",
    role: "緑黄色野菜のオレンジ・濃緑色のもとに多く、油と一緒にとると吸収が良くなりやすいと言われます。",
    richIn: ["にんじん", "かぼちゃ", "ほうれん草", "小松菜", "モロヘイヤ", "マンゴー"],
    caution: "脂溶性なので、サプリ等で長期間多量にとると過剰になる可能性があります。妊娠中はレチノール（動物性ビタミンA）の過剰摂取に注意との一般情報があります。",
  },
  {
    name: "ビタミンK",
    tag: "vitamin-k",
    role: "葉物野菜・納豆などに多く含まれる脂溶性ビタミン。骨や血液の話題で語られることが多い成分です。",
    richIn: ["ほうれん草", "小松菜", "ブロッコリー", "モロヘイヤ", "春菊"],
    caution: "ワーファリン等の抗凝固薬を服用中の方は、急に摂取量を変えると薬の効きに影響することがあります。担当医・薬剤師にご相談ください。",
  },
  {
    name: "葉酸",
    tag: "folate",
    role: "ビタミンB群の一種で、葉物野菜の名前の由来にもなっている成分です。妊娠の前後で大切と語られることが多いです。",
    richIn: ["ほうれん草", "ブロッコリー", "アスパラガス", "枝豆", "いちご", "アボカド"],
    caution: "サプリで多量にとると、ビタミンB12不足のサインを覆う場合があるとされます。妊娠を計画している方は医療機関にご相談ください。",
  },
  {
    name: "カリウム",
    tag: "potassium",
    role: "野菜・果物に幅広く含まれるミネラル。塩分（ナトリウム）の話とセットで語られることが多い成分です。",
    richIn: ["バナナ", "ほうれん草", "アボカド", "じゃがいも", "さつまいも", "メロン"],
    caution: "腎機能が低下している方や、特定の薬（カリウム保持性利尿薬など）を使っている方は、医師の指示に従って摂取量を調整してください。",
  },
  {
    name: "カルシウム",
    tag: "calcium",
    role: "骨や歯のミネラルとして知られていますが、野菜由来のカルシウムは乳製品とは吸収の仕方が異なると語られます。",
    richIn: ["小松菜", "モロヘイヤ", "水菜", "オクラ", "いちじく", "枝豆"],
    caution: "サプリで多量に長期間とると、ほかのミネラルの吸収バランスに影響することがあります。食品からのバランスを基本に。",
  },
  {
    name: "鉄",
    tag: "iron",
    role: "植物性食品に含まれる鉄は「非ヘム鉄」と呼ばれ、ビタミンCと一緒にとると吸収が良くなるとされます。",
    richIn: ["ほうれん草", "小松菜", "枝豆", "切り干し大根", "プルーン", "豆類全般"],
    caution: "鉄サプリは便秘・胃の不快感を起こすことがあります。服薬中の方は医師に相談を。お茶・コーヒーのタンニンは吸収を妨げると一般に言われます。",
  },
  {
    name: "マグネシウム",
    tag: "magnesium",
    role: "豆類・葉物・全粒穀物に多いミネラル。エネルギー代謝・筋肉・神経の働きに関連して語られることが多い成分です。",
    richIn: ["ほうれん草", "枝豆", "アボカド", "バナナ", "玄米", "大豆製品"],
    caution: "サプリで多量にとると下痢を起こすことがあります。腎機能が低下している方は医師の指示が必要です。",
  },
  {
    name: "リコピン",
    tag: "lycopene",
    role: "トマトやスイカの赤色のもととして知られるカロテノイドの一種。一般に「油や加熱で吸収が良くなりやすい」と言われます。",
    richIn: ["トマト", "ミニトマト", "トマトジュース", "スイカ", "ピンクグレープフルーツ"],
    caution: "極端に大量にとり続けると皮膚が一時的に黄〜橙っぽくなる現象が報告されることがあります。通常の食事量で気にする必要はありません。",
  },
  {
    name: "アントシアニン",
    tag: "anthocyanin",
    role: "ぶどう・ブルーベリー・なすなどの紫〜青色のもとになるポリフェノールの一種。抗酸化の話題で語られることが多いです。",
    richIn: ["ぶどう（皮ごと）", "ブルーベリー", "なす（皮ごと）", "紫キャベツ", "黒豆"],
    caution: "効果を断定する売り文句に注意。家庭食材としては、皮ごと食べると色素が摂りやすいとされる程度に捉えるのが無難です。",
  },
  {
    name: "ポリフェノール（総称）",
    tag: "polyphenol",
    role: "植物の色や苦み・渋みのもとになる成分の総称。種類が非常に多く、果物の皮や種に近い部分に含まれやすいと一般に言われます。",
    richIn: ["りんご（皮ごと）", "ぶどう（皮・種付近）", "ベリー類", "緑茶・紅茶", "コーヒー", "カカオ・ダークチョコレート"],
    caution: "種類によって性質が大きく異なります。「ポリフェノールが入っている＝必ず体によい」と一括りにしないほうが現実的です。",
  },
];
