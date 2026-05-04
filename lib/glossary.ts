/**
 * 野菜・果物の「ことば」をやさしくまとめる語句集データ。
 * - 効能を断定したり、特定の品目で病気が予防・治療できると示すものではありません。
 * - 売場・家庭で耳にしやすい表現を、家庭目線でかみ砕いた解説にとどめます。
 */

export type GlossaryCategory = "fruit" | "vegetable" | "nutrition" | "cooking" | "market";

export type GlossaryEntry = {
  /** 用語の表記（漢字・カナ・英字いずれか） */
  term: string;
  /** よみがな（カタカナ）。アルファベット・記号のみのときは省略可 */
  kana?: string;
  /** アンカー・並べ替え用 slug（半角英数字・ハイフン） */
  slug: string;
  /** 大カテゴリ */
  category: GlossaryCategory;
  /** 1〜3文の解説（断定しない・効能保証しない） */
  description: string;
  /** 関連する用語の slug（同じファイル内の slug を指す） */
  related?: string[];
};

export const GLOSSARY_CATEGORY_LABEL: Record<GlossaryCategory, string> = {
  fruit: "果物のことば",
  vegetable: "野菜のことば",
  nutrition: "栄養・成分のことば",
  cooking: "調理・下処理のことば",
  market: "市場・流通のことば",
};

export const GLOSSARY_CATEGORY_DESCRIPTION: Record<GlossaryCategory, string> = {
  fruit:
    "果物の売場・果実のしくみまわりで耳にしやすい言葉を集めました。追熟や糖度など、選び方・食べ頃の判断に役立つ用語が中心です。",
  vegetable:
    "野菜の栽培や売場で出てくる言葉です。芽出し・抑制栽培など、季節と並びの背景を理解するヒントになります。",
  nutrition:
    "成分名・色素名・働きの呼び方を整理しています。「健康に良い」と断定する代わりに、「こう語られることが多い」程度の理解にとどめてください。",
  cooking:
    "下処理・火入れ・保存など、家庭の台所で出てくる言い回しです。レシピの記述で迷ったときの目安にどうぞ。",
  market:
    "卸売市場・流通の言葉です。サイトの相場ページや日報を読むときの「補助線」として参照してください。",
};

export const GLOSSARY_CATEGORY_ORDER: readonly GlossaryCategory[] = [
  "fruit",
  "vegetable",
  "nutrition",
  "cooking",
  "market",
];

/** 並びは「カテゴリ別」を意識し、同カテゴリ内は 50 音順を目安。 */
export const glossaryEntries: readonly GlossaryEntry[] = [
  // --- 果物のことば ---
  {
    term: "追熟",
    kana: "ツイジュク",
    slug: "tsuijuku",
    category: "fruit",
    description:
      "収穫後に常温で置いて、香り・甘み・やわらかさを引き出す工程のこと。バナナ・キウイ・洋なし・アボカドなどでよく行います。固いまま冷蔵すると追熟が止まりやすいので、食べ頃までは常温が基本です。",
    related: ["echylene", "togaku-hi"],
  },
  {
    term: "新物",
    kana: "シンモノ",
    slug: "shinmono",
    category: "fruit",
    description:
      "その年に新しく入荷し始めた品のこと。みかん・りんご・ぶどう・ナッツなどで使われます。香りが立ちやすい一方で、糖度や色は走りで安定しないことがあります。",
    related: ["hashiri-nagori"],
  },
  {
    term: "糖度",
    kana: "トウド",
    slug: "todo",
    category: "fruit",
    description:
      "果汁などに含まれるショ糖を中心とした「水溶性固形分」の濃度の目安。屈折計（Brix計）で測り、％または °Bx で表されます。実際の甘さは酸味との比（糖酸比）でも変わるため、糖度＝おいしさではありません。",
    related: ["brix", "togaku-hi"],
  },
  {
    term: "Brix（ブリックス）",
    kana: "ブリックス",
    slug: "brix",
    category: "fruit",
    description:
      "屈折計で測った「水溶性固形分」の単位。果汁ではほとんどがショ糖なので、慣用的に糖度の表記として使われます。1°Bx は概ね 1g の糖が 100g の果汁に溶けている状態に相当します。",
    related: ["todo", "togaku-hi"],
  },
  {
    term: "糖酸比",
    kana: "トウサンヒ",
    slug: "togaku-hi",
    category: "fruit",
    description:
      "糖度と酸度の比のこと。糖度が同じでも、酸味が強いと甘さを感じにくく、弱いとぼやけた味になります。柑橘・ぶどう・いちごなどでは、この比が「食べ頃」の目安として語られます。",
    related: ["todo", "brix"],
  },
  {
    term: "節果",
    kana: "セッカ",
    slug: "sekka",
    category: "fruit",
    description:
      "ぶどうなど房もので、軸の節（ふし）に着いた果粒・果房のこと。場合によっては、整房作業ではじいた未熟・小粒の果実を指して使われることもあります。文脈で意味が変わる用語です。",
    related: ["sukashi"],
  },
  {
    term: "摘果",
    kana: "テッカ",
    slug: "tekka",
    category: "fruit",
    description:
      "実が多くつきすぎたとき、品質を保つために若い果実を間引く作業。残った果実に栄養が集まり、糖度・サイズが整いやすくなります。家庭菜園のトマト・なす・果樹でも用語として使われます。",
    related: ["sukashi"],
  },
  {
    term: "走り・盛り・名残",
    kana: "ハシリ・サカリ・ナゴリ",
    slug: "hashiri-nagori",
    category: "fruit",
    description:
      "出回りの初期（走り）、最盛期（盛り）、終盤（名残）を表す言葉。同じ品目でも時期で味・値段の振れ方が違い、走りは香り重視、盛りは価格と質のバランス、名残はやわらかさが出やすいなどの傾向があります。",
    related: ["shinmono"],
  },

  // --- 野菜のことば ---
  {
    term: "抑制栽培",
    kana: "ヨクセイサイバイ",
    slug: "yokusei-saibai",
    category: "vegetable",
    description:
      "本来の旬よりも遅らせて出荷するために、温度や日長を調整して育てる方法。秋〜冬の高地レタスや、春までずらすキャベツなどで使われ、年間を通して野菜が並ぶ理由のひとつです。",
    related: ["sokusei-saibai"],
  },
  {
    term: "促成栽培",
    kana: "ソクセイサイバイ",
    slug: "sokusei-saibai",
    category: "vegetable",
    description:
      "ハウスや加温で旬よりも早く出荷する栽培方法。冬のトマト・きゅうりなど、外の畑では育てにくい時期にも安定供給するために行われます。",
    related: ["yokusei-saibai"],
  },
  {
    term: "立茎",
    kana: "リッケイ",
    slug: "rikkei",
    category: "vegetable",
    description:
      "アスパラガスなどで、収穫を一旦休んで茎をそのまま伸ばし、養分を株に戻す管理のこと。翌作のための「休ませる工程」で、夏どり・秋どりの方式と組み合わせて使われます。",
  },
  {
    term: "芽出し",
    kana: "メダシ",
    slug: "medashi",
    category: "vegetable",
    description:
      "種いも・球根を植える前に、明るい場所などで小さな芽を出させてから植え付ける作業。発芽がそろい、収穫までの期間が短くなりやすいとされます。じゃがいも・里いもなどで一般的です",
  },
  {
    term: "白菜の花芽",
    kana: "ハクサイノハナメ",
    slug: "hakusai-hanaga",
    category: "vegetable",
    description:
      "晩冬から春にかけて、白菜が「とう立ち」して芯から伸びる花茎・花蕾のこと。やわらかい部分は「菜花」のように炒め物・おひたしに使えますが、かたく筋ばってきたら食味が落ちやすいです。",
    related: ["touatsu"],
  },
  {
    term: "とう立ち",
    kana: "トウダチ",
    slug: "touatsu",
    category: "vegetable",
    description:
      "葉物・根菜の中心から花茎が伸びてくる現象。気温・日長の変化で起こり、葉や根の食感が落ちやすくなります。一方で「菜の花」「のらぼう菜」のように、とう立ち部分が主役の野菜もあります。",
    related: ["hakusai-hanaga"],
  },
  {
    term: "皮目",
    kana: "カワメ",
    slug: "kawame",
    category: "vegetable",
    description:
      "じゃがいも・なす・りんごなどの皮の表面に見える、点々とした小さなくぼみや筋のこと。呼吸や蒸散にかかわる部位で、新鮮なうちはふっくら、古くなると目立ちやすくなります。",
  },
  {
    term: "乳液",
    kana: "ニュウエキ",
    slug: "nyueki",
    category: "vegetable",
    description:
      "オクラ・レタス・いちじくなどを切ったときに出る白い液のこと。アクや渋みのもとになりやすく、料理の前にさっと洗う・拭き取るときれいに仕上がります。手につくと黒ずみやすいので、気になる場合は手袋を。",
  },

  // --- 栄養・成分のことば ---
  {
    term: "リコピン",
    kana: "リコピン",
    slug: "lycopene",
    category: "nutrition",
    description:
      "トマト・スイカ・ピンクグレープフルーツなどに多い赤色の色素（カロテノイドの一種）。脂溶性なので、油と一緒に加熱した料理で摂りやすいと一般に言われます。健康効果を保証するものではありません。",
    related: ["polyphenol", "anthocyanin"],
  },
  {
    term: "アントシアニン",
    kana: "アントシアニン",
    slug: "anthocyanin",
    category: "nutrition",
    description:
      "ブルーベリー・なす・赤しそ・赤キャベツなどの紫〜赤色の色素。水溶性のポリフェノールで、ゆで汁が色づくのが特徴です。pH によって色が変わる性質も、料理の発色に影響します。",
    related: ["polyphenol", "lycopene"],
  },
  {
    term: "ポリフェノール",
    kana: "ポリフェノール",
    slug: "polyphenol",
    category: "nutrition",
    description:
      "植物が紫外線などから身を守るためにつくる成分の総称。アントシアニン・カテキン・タンニンなどが含まれ、苦味・渋味・色の素になりやすいです。摂れば必ず健康になる、という意味ではありません。",
    related: ["anthocyanin", "lycopene"],
  },
  {
    term: "フィトケミカル",
    kana: "フィトケミカル",
    slug: "phytochemical",
    category: "nutrition",
    description:
      "ポリフェノール・カロテノイド・含硫化合物などをまとめて指す呼び方で、植物だけがつくる機能性成分の総称。栄養素（必須ではないが、食事の彩りや風味のもとになるもの）として語られます。",
    related: ["polyphenol", "glucosinolate"],
  },
  {
    term: "グルコシノレート",
    kana: "グルコシノレート",
    slug: "glucosinolate",
    category: "nutrition",
    description:
      "アブラナ科（ブロッコリー・キャベツ・大根・わさびなど）に多い含硫化合物。切る・噛むことで酵素が働き、独特の辛味やにおいのもとになります。加熱で減るので、生／加熱で味の出方が変わります。",
    related: ["phytochemical", "kumi"],
  },
  {
    term: "苦味成分",
    kana: "ニガミセイブン",
    slug: "kumi",
    category: "nutrition",
    description:
      "ゴーヤのモモルデシン、なすやじゃがいもの皮に含まれるアルカロイド類など、野菜・果物に含まれる苦味のもとを指す総称。下処理（塩・水・加熱）で和らぐもの、強く残るものがあります。",
    related: ["glucosinolate", "rentionine"],
  },
  {
    term: "レンチオン",
    kana: "レンチオン",
    slug: "rentionine",
    category: "nutrition",
    description:
      "しいたけの香りの主成分のひとつ。乾しいたけを水で戻したときに香りが強くなるのは、酵素の働きでこの成分がつくられやすいからだと一般に説明されます。",
  },
  {
    term: "エチレン",
    kana: "エチレン",
    slug: "echylene",
    category: "nutrition",
    description:
      "果実の追熟に関わる植物ホルモンで、気体の状態で出ます。りんご・バナナ・アボカドなどから多く出るため、葉物野菜と一緒に保存すると葉物が早くしおれることがあります。",
    related: ["tsuijuku"],
  },
  {
    term: "高糖度",
    kana: "コウトウド",
    slug: "kotodo",
    category: "nutrition",
    description:
      "通常品より糖度が高い品種・栽培法を指す呼び方。トマトやいちごなどで使われ、節水栽培など水分を制限することで実現することが多いとされます。値段はやや高めになりがちです。",
    related: ["todo", "brix"],
  },

  // --- 調理・下処理のことば ---
  {
    term: "塩のひとつまみ",
    kana: "シオノヒトツマミ",
    slug: "shio-hitotsumami",
    category: "cooking",
    description:
      "親指・人差し指・中指の3本でつまむ量で、おおむね小さじ 1/4 弱（0.5〜1g 程度）が目安。レシピで「ひとつまみ」と書かれているときは、味付けの仕上げや下味のニュアンスで使われます。",
  },
  {
    term: "塩もみ",
    kana: "シオモミ",
    slug: "shiomomi",
    category: "cooking",
    description:
      "薄く切った野菜に塩をふって軽くもみ、水気を出す下処理。きゅうり・キャベツ・大根などで定番で、ドレッシングがなじみやすくなり、保存性も少し上がります。",
  },
  {
    term: "アク抜き",
    kana: "アクヌキ",
    slug: "aku-nuki",
    category: "cooking",
    description:
      "野菜のえぐみ・渋み・色の濁りを軽くするために、水・塩水・酢水・湯にさらす下処理。ごぼう・れんこん・なす・ほうれん草など品目で「水・酢・湯のどれが向くか」が変わります。",
  },
  {
    term: "湯通し",
    kana: "ユドオシ",
    slug: "yudoshi",
    category: "cooking",
    description:
      "短時間（数秒〜30 秒程度）熱湯にくぐらせる下処理。臭みやぬめりを抑えたり、表面の色を鮮やかにするときに使います。ブロッコリー・小松菜・きのこなどで定番です。",
  },
  {
    term: "蒸し焼き",
    kana: "ムシヤキ",
    slug: "mushiyaki",
    category: "cooking",
    description:
      "フライパンに少量の水・酒・油と食材を入れ、ふたをして加熱する方法。葉野菜・きのこ・キャベツなど、量が多くて炒めにくい食材を一気にしんなりさせるのに向きます。",
  },

  // --- 市場・流通のことば ---
  {
    term: "卸売市場",
    kana: "オロシウリシジョウ",
    slug: "oroshiuri-shijo",
    category: "market",
    description:
      "全国・産地から集まった農産物を、仲卸・買出し人へ卸すために開設された市場のこと。東京の大田市場や築地・豊洲、各地方都市の中央卸売市場・地方卸売市場が代表例です。",
    related: ["aitai", "seri"],
  },
  {
    term: "相対取引",
    kana: "アイタイトリヒキ",
    slug: "aitai",
    category: "market",
    description:
      "卸売市場で、せり（競り）を行わず、卸と仲卸・買出し人が個別に値段と数量を決めて売買する方法。現在の青果市場では多くがこの方法で、当日の集荷量・前日比などをもとに値が決まります。",
    related: ["oroshiuri-shijo", "seri"],
  },
  {
    term: "せり",
    kana: "セリ",
    slug: "seri",
    category: "market",
    description:
      "卸売市場で、買い手が値段を提示しあって最も高い額をつけた人が買う取引方法。今は相対取引が中心ですが、価格指標づくりや希少品の値決めなどで一部に残っています。",
    related: ["aitai", "oroshiuri-shijo"],
  },
  {
    term: "JA（農協）",
    kana: "ジェイエー",
    slug: "ja",
    category: "market",
    description:
      "農業協同組合の略。農家の出荷・選果・販売・購買を共同で行う組織で、産地名のついた段ボールに JA マークが入っているのを売場で見かけます。市場出荷の主要なルートのひとつです",
    related: ["oroshiuri-shijo"],
  },
  {
    term: "高値・中値・安値",
    kana: "タカネ・ナカネ・ヤスネ",
    slug: "high-mid-low",
    category: "market",
    description:
      "卸売市場の日報で、その日のいちばん高い値・中央付近の値・いちばん安い値を指します。サイズ・等級・産地で値が散るため、平均ではなく「幅」を見るための指標として使われます。",
    related: ["oroshiuri-shijo", "aitai"],
  },
  {
    term: "等階級",
    kana: "トウカイキュウ",
    slug: "tokaikyu",
    category: "market",
    description:
      "卸売市場で扱う野菜・果物の格付けのこと。等級（秀・優・良など）と階級（サイズ：S・M・L・2L など）の組み合わせで、見た目の整いと大きさを示します。同じ品でも値段が分かれる理由になります。",
    related: ["high-mid-low", "oroshiuri-shijo"],
  },
];

/** カテゴリ別に分類した配列を返す。並びは GLOSSARY_CATEGORY_ORDER と各カテゴリ内の入力順を尊重。 */
export function glossaryByCategory(): readonly {
  category: GlossaryCategory;
  entries: readonly GlossaryEntry[];
}[] {
  return GLOSSARY_CATEGORY_ORDER.map((category) => ({
    category,
    entries: glossaryEntries.filter((entry) => entry.category === category),
  }));
}

/** ページ内アンカーに使う id を返す（slug の前に "g-" をつける）。 */
export const glossaryAnchorId = (slug: string): string => `g-${slug}`;
