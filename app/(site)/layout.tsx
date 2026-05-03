import { AffiliateRakutenBanner } from "@/components/AffiliateRakutenBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col bg-[#f7faf7] dark:bg-[#0c110e]">
      <SiteHeader />
      <aside
        aria-label="スポンサーなど（楽天市場）"
        className="border-b border-amber-400/35 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 shadow-md shadow-black/25 dark:from-emerald-950 dark:via-emerald-950 dark:to-emerald-950"
      >
        <div className="mx-auto flex w-full max-w-[min(100%,100rem)] justify-center px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <AffiliateRakutenBanner variant="featured" />
        </div>
      </aside>
      <div className="flex-1 leading-relaxed text-emerald-950 antialiased dark:text-emerald-50">{children}</div>
      <SiteFooter />
    </div>
  );
}
