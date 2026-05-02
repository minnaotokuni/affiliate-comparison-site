/** 日本時間の暦日（YYYY-MM-DD） */
export function isoDateInJapan(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
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
