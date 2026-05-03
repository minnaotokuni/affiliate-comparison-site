<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## サイト構成（公開前ベースライン）

編集で構成を変えたあと「元の並び・メインの置き場所」に戻す必要があれば、まず [`docs/SITE_STRUCTURE_SNAPSHOT.md`](docs/SITE_STRUCTURE_SNAPSHOT.md) を参照すること。メインコンテンツは **直近の相場からのおすすめ品**（`/column/market`）、ナビ順は [`lib/site-nav.ts`](lib/site-nav.ts) の `primaryNav` に集約されている。
