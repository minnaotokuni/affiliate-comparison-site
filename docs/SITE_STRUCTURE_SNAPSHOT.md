# サイト構成スナップショット（公開前ベースライン）

**記録日**: 2026-05-01（公開直前の構成として保存）

このファイルは「いまの情報設計・ページ並び・メインコンテンツの置き場所」の記録です。大幅な編集のあとに元に戻したいときは、このドキュメントと Git の履歴をあわせて参照してください。  
今後 **アフィリエイト広告（A8 など）** を足す場合も、ここを起点に差分を追いやすくします。

---

## サイトの前提（ブランド・トーン）

- **サイト名（表示）**: 「野菜・果物の旬と相場メモ」
- **メインコンテンツ**: **直近の相場からのおすすめ品**（`/column/market`）— 野菜はレシピ複数、果物はそのまま食べるヒントのみ
- **読者**: 一般の買い物・献立向け（業務・POP・売場向けの語調は避けた状態）
- **メタデータ**: `app/layout.tsx` の `metadata`（`NEXT_PUBLIC_SITE_URL` で本番オリジン）

---

## ルート一覧（App Router）

| パス | 役割 |
|------|------|
| `/` | ホーム（ヒーロー → リード → 大田表 → 都日報表 → インデックス → コンテンツ一覧） |
| `/column/market` | **メインコラム** — `lib/columns/market-weekly.ts` 駆動 |
| `/column/season` | 旬ナビ — `lib/columns/season-deep-picks.ts` + `fruit-spotlights` |
| `/column/vegetables` | 野菜別ガイド — `lib/columns/vegetable-profiles.ts` + `VegetableGuideBody` |
| `/about` | サイトについて・運営・広告方針 |
| `_not-found` | 404 |

レイアウト: `app/(site)/layout.tsx` で `SiteHeader` / `SiteFooter` を共通表示。

---

## グローバルナビの並び（＝意図した優先度）

定義: `lib/site-nav.ts` の `primaryNav`

1. ホーム  
2. **直近の相場からのおすすめ品**  
3. **旬ナビ**  
4. 大田の市況（`/#market-ota`）  
5. 相場（都日報）（`/#market-shijou-sei`）  
6. 野菜別ガイド  
7. サイトについて  

ホーム内「コンテンツ一覧」グリッドも **同じ配列順**（`about` 除外）で描画されます。

---

## ホームページの縦の並び（`app/(site)/page.tsx`）

1. **ヒーローブロック**（h1・基準日・ページ内ジャンプ）
2. **`HomeTopLead`**（`id="top-lead"`）
   - `#home-market-main` … 相場おすすめカード（メイン）
   - `#home-season-lead` … 旬ナビカード
   - 週次スポットライト / 暦ベースの耳寄り（`data/weekly-spotlight.json`・`seasonal-picks`）
   - `#home-market-voice` … 市況のひとこと（大田ボイス）
   - ジャンプ: `#market-ota` / `#market-shijou-sei`
3. **`OtaMarketDashboard`**（`id="market-ota"`）
4. **`ShijouSeiDashboard`**（`id="market-shijou-sei"`）— 取得失敗時は履歴フォールバックあり（`lib/shijou-nippo/service.ts`）
5. **`HomeProduceIndex`**（野菜チップ・果物ジャンプ）
6. **コンテンツ一覧**（`primaryNav`）
7. **A8 予告ブロック**（収益化予定の説明）

トップの相場カード内容: `lib/columns/market-home-picks.ts` + `components/HomeMarketCardLink.tsx`

---

## メインコラム（相場おすすめ）のデータ構造

- **ソースオブ・トゥルース**: `lib/columns/market-weekly.ts`
  - `seasonBand` / `trendBlurb`（任意）で季節・トレンドを明示
  - `valueVegetables[]` … 各品目 `recipes[]`（目安3つ）
  - `seasonalFruits[]` … **レシピなし**、食べ方ヒントのみ
- **ページ**: `app/(site)/column/market/page.tsx`

エージェント向けルール: `.cursor/rules/agent-column-market.mdc`

---

## 旬・野菜データの主な置き場所

| 内容 | ファイル |
|------|-----------|
| 旬ナビ深掘り3品 | `lib/columns/season-deep-picks.ts` |
| 果物ダイジェスト | `lib/columns/fruit-spotlights.ts` |
| 野菜プロフィール | `lib/columns/vegetable-profiles.ts` |
| 週次スポットライト（任意） | `data/weekly-spotlight.json` |
| 都日報履歴スナップショット | `data/shijou-sei-history.json`（CLI / Actions で更新） |

---

## 市況・外部データ

- **大田**: `lib/ota-market/` + `components/OtaMarketDashboard.tsx`
- **東京都デジタル市場日報（青果）**: `lib/shijou-nippo/` + `components/ShijouSeiDashboard.tsx`

---

## 法的・声明テキスト

- `lib/legal-copy.ts` … `pharmaRelatedDisclaimer` / `marketDataDisclaimer` / `affiliateDisclaimer`
- コラム・フッター等から参照

---

## 「戻す」ときのおすすめ手順

1. **Git**: 公開前のコミットに `git checkout` するか、タグを打つ（例: `git tag site-v1-pre-affiliate`）。
2. **構造の意味合い**: このファイルと `lib/site-nav.ts` を見れば、意図した情報の順序が復元しやすいです。

---

## 今後のアフィリエイト追加メモ（予定）

- `about` および `lib/legal-copy.ts` の `affiliateDisclaimer` と整合させる
- 記事直下やサイドに載せる場合は、**メイン誘導（相場おすすめ）の邪魔にならない位置**を決めるとよい
