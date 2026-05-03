/** 日本時間の暦日（YYYY-MM-DD） */
export function isoDateInJapan(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/** 暦日 iso（JST の日付として解釈）から n 日前の暦日（JST） */
export function subtractCalendarDaysIso(iso: string, deltaDays: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const noonUtc = Date.UTC(y, m - 1, d, 12, 0, 0);
  return isoDateInJapan(new Date(noonUtc - deltaDays * 86400000));
}

export function longDateLabelJa(iso: string): string {
  const [y, m, day] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, day));
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(dt);
}
