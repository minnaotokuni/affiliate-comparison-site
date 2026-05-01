type Props = {
  title?: string;
  children: string;
  variant?: "muted" | "warn";
};

export function LegalNotice({
  title = "ご利用上の注意",
  children,
  variant = "muted",
}: Props) {
  const box =
    variant === "warn"
      ? "border-amber-200/90 bg-amber-50/90 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100"
      : "border-emerald-900/10 bg-emerald-50/40 text-emerald-950 dark:border-emerald-100/10 dark:bg-emerald-950/40 dark:text-emerald-50";

  return (
    <aside
      className={`rounded-xl border px-4 py-3 text-xs leading-relaxed ${box}`}
      role="note"
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-2 whitespace-pre-line">{children}</p>
    </aside>
  );
}
