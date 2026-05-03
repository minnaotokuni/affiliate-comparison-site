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
      <div className="flex-1 leading-relaxed text-emerald-950 antialiased dark:text-emerald-50">{children}</div>
      <SiteFooter />
    </div>
  );
}
