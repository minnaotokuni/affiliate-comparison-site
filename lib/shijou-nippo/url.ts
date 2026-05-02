/** 東京都中央卸売市場デジタル市場日報の青果CSV URL（公開パス規則） */
export function seiCsvUrl(dateIso: string, csvSuffix: string): string {
  const [y, m, d] = dateIso.split("-").map((x) => parseInt(x, 10));
  const ymd = `${y}${String(m).padStart(2, "0")}${String(d).padStart(2, "0")}`;
  const ym = `${y}${String(m).padStart(2, "0")}`;
  return `https://www.shijou-nippo.metro.tokyo.lg.jp/SN/${ym}/${ymd}/Sei/Sei_${csvSuffix}.csv`;
}

export function seiZenIndexUrl(dateIso: string): string {
  const [y, m, d] = dateIso.split("-").map((x) => parseInt(x, 10));
  const ymd = `${y}${String(m).padStart(2, "0")}${String(d).padStart(2, "0")}`;
  const ym = `${y}${String(m).padStart(2, "0")}`;
  return `https://www.shijou-nippo.metro.tokyo.lg.jp/SN/${ym}/${ymd}/Sei/SN_Sei_Zen_index.html`;
}
