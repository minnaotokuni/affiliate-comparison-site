import { ImageResponse } from "next/og";

export const alt = "野菜・果物の旬と相場メモ — 直近の相場・旬・市況メモ";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://affiliate-comparison-site-alpha.vercel.app";

const displayUrl = siteUrl.replace(/^https?:\/\//, "");

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "72px 96px",
          background: "linear-gradient(135deg, #064e3b 0%, #047857 55%, #10b981 100%)",
          color: "#ecfdf5",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            fontSize: 96,
            lineHeight: 1,
          }}
        >
          <span>🥕</span>
          <span>🍅</span>
          <span>🍓</span>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          野菜・果物の旬と相場メモ
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            fontWeight: 500,
            color: "#a7f3d0",
            textAlign: "center",
          }}
        >
          直近の相場・旬・市況メモ
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 56,
            fontSize: 26,
            color: "#d1fae5",
            letterSpacing: "0.02em",
          }}
        >
          {displayUrl}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
