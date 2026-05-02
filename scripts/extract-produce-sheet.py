#!/usr/bin/env python3
"""
参照シート PNG を 16列×7行で分割し public/produce-art に書き出す。
レイアウト: 横に第1〜第4列が並び、各列ブロック内でアイコンが 4列×7行。
"""

from __future__ import annotations

import json
import re
from pathlib import Path

from PIL import Image

# (macro_col M, row R, subcol S) は画面上 row R の左から M*4+S 番目のアイコン
# R=0 が一番上のデータ行（バナー下）
LABEL_GRID: list[list[list[str]]] = [
    # 第1列 M=0
    [
        ["温州ミカン", "リンゴ", "バナナ", "イチゴ"],
        ["メロン", "スイカ", "カキ", "ナシ"],
        ["パイナップル", "キウイフルーツ", "ブルーベリー", "さくらんぼ"],
        ["ゆず", "マンゴー", "プルーン", "レモン"],
        ["温州ミカン", "リンゴ", "栗", "いちじく"],
        ["いちじく", "すもも", "ビワ", "アボカド"],
        ["ビワ", "プルーン", "グレープフルーツ", "すだち"],
    ],
    # 第2列 M=1
    [
        ["大根", "人参", "キャベツ", "玉ねぎ"],
        ["トマト", "ナス", "じゃがいも", "サツマイモ"],
        ["キュウリ", "人参", "サツマイモ", "白菜"],
        ["ほうれん草", "ブロッコリー", "レタス", "ピーマン"],
        ["南瓜", "ねぎ", "小松菜", "オクラ"],
        ["ねぎ", "小松菜", "レンコン", "ゴボウ"],
        ["もやし", "とうもろこし", "ニンニク", "生姜"],
    ],
    # 第3列 M=2
    [
        ["ザクロ", "パッションフルーツ", "ドラゴンフルーツ", "スターフルーツ"],
        ["ライチ", "ランブータン", "グアバ", "デーツ"],
        ["アプリコット", "カンタロープ", "クレメンタイン", "ジャックフルーツ"],
        ["キンカン", "パパイヤ", "タマリンド", "アスパラガス"],
        ["カリフラワー", "カリフラワー", "芽キャベツ", "アーティチョーク"],
        ["ケール", "赤キャベツ", "赤キャベツ", "スイスチャード"],
        ["フェンネル", "フェンネル", "セロリルート", "ルタバガ"],
    ],
    # 第4列 M=3
    [
        ["かぶ", "パースニップ", "ホースラディッシュ", "クレソン"],
        ["ルッコラ", "からし菜", "コールラビ", "西洋ゴボウ"],
        ["サヤエンドウ", "ソラマメ", "インゲンマメ", "ニラ"],
        ["エシャロット", "ミョウガ", "タケノコ", "シシトウ"],
        ["シシトウ", "シソ", "シソ", "ニンニクの芽"],
        ["山芋", "キャッサバ", "シイタケ", "エノキ"],
        ["エノキ", "マイタケ", "シメジ", "キクラゲ"],
    ],
]


def slugify_label(jp: str, used: dict[str, int]) -> str:
    base = re.sub(r"[^\w\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]+", "-", jp.strip())
    base = base.strip("-") or "item"
    n = used.get(base, 0)
    used[base] = n + 1
    return f"{base}-{n}" if n else base


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    src = root / "assets" / "reference-produce-sheet.png"
    if not src.is_file():
        src = Path(
            "/Users/watanabetakuya/.cursor/projects/Users-watanabetakuya-Desktop/assets/"
            "IMG_0818-a5328954-679a-49cd-8118-40f216605366.png"
        )
    out_dir = root / "public" / "produce-art"
    out_dir.mkdir(parents=True, exist_ok=True)

    im = Image.open(src).convert("RGBA")
    w, h = im.size
    scale = 3
    im = im.resize((w * scale, h * scale), Image.Resampling.LANCZOS)
    w, h = im.size

    # バナー調整: 元画像でおおよそ上端〜82px がタイトル帯（3倍で 246）
    top_ratio = 82 / 571
    top_px = int(h * top_ratio)
    rows, cols = 7, 16
    cell_h = (h - top_px) / rows
    cell_w = w / cols
    # 隣セルのラベルが入り込むのを抑える（セル内へのインボックス）
    inset_x_frac = 0.14
    inset_top_frac = 0.05
    inset_bottom_frac = 0.09

    used: dict[str, int] = {}
    manifest: list[dict[str, str]] = []

    for r in range(rows):
        for macro in range(4):
            for sub in range(4):
                c = macro * 4 + sub
                label = LABEL_GRID[macro][r][sub]
                file_slug = slugify_label(label, used)
                x0 = int(c * cell_w + cell_w * inset_x_frac)
                x1 = int((c + 1) * cell_w - cell_w * inset_x_frac)
                y0 = int(top_px + r * cell_h + cell_h * inset_top_frac)
                y1 = int(top_px + (r + 1) * cell_h - cell_h * inset_bottom_frac)
                if x1 <= x0 or y1 <= y0:
                    raise RuntimeError("crop insets too large for cell size")
                crop = im.crop((x0, y0, x1, y1))
                fn = f"{file_slug}.webp"
                crop.save(out_dir / fn, format="WEBP", quality=88, method=6)
                manifest.append({"label": label, "file": fn, "row": str(r), "col": str(c)})

    (out_dir / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {len(manifest)} crops to {out_dir}")


if __name__ == "__main__":
    main()
