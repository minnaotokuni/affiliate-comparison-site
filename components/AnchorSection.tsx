import type { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

/** アンカーリンク時にヘッダーと干渉しにくいよう scroll-margin を統一 */
export function AnchorSection({ id, children, className = "" }: Props) {
  return (
    <section id={id} className={`scroll-mt-[var(--site-scroll-padding)] ${className}`.trim()}>
      {children}
    </section>
  );
}
