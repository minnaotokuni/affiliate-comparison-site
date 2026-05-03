<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## サイト構成（公開前ベースライン）

編集で構成を変えたあと「元の並び・メインの置き場所」に戻す必要があれば、まず [`docs/SITE_STRUCTURE_SNAPSHOT.md`](docs/SITE_STRUCTURE_SNAPSHOT.md) を参照すること。メインコンテンツは **直近の相場からのおすすめ品**（`/column/market`）、ナビ順は [`lib/site-nav.ts`](lib/site-nav.ts) の `primaryNav` に集約されている。

## 本番公開（「公開して」と言われたとき）

エージェントは推測で止めず、**確認してから**次を実行する。

1. `npm run build` が通ることを確認する。  
2. 未コミットがあればコミットし、`main` を `origin` に push する。  
3. `npx vercel@latest whoami` で CLI ログインを確認する。  
4. 未リンクなら `npx vercel@latest link --yes --project affiliate-comparison-site`。  
5. `npx vercel@latest deploy --prod --yes` で本番デプロイする。  
6. 可能なら `https://affiliate-comparison-site-alpha.vercel.app` の表示で反映を確認する。

**共有 URL:** https://affiliate-comparison-site-alpha.vercel.app  

GitHub だけ push しても本番が古いままになることがあるため、**完了の目安は CLI の Production デプロイ成功**とする。詳細は [`.cursor/rules/public-deploy-vercel.mdc`](.cursor/rules/public-deploy-vercel.mdc)。
