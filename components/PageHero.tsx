import type { ReactNode } from "react";

type Tone = "emerald" | "amber" | "sky" | "rose";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  illustration?: ReactNode;
  anchorId?: string;
  tone?: Tone;
};

const TONE_STYLE: Record<
  Tone,
  {
    container: string;
    eyebrow: string;
    description: string;
    blob: string;
  }
> = {
  emerald: {
    container:
      "border-emerald-900/10 bg-white shadow-emerald-900/5 dark:border-emerald-100/10 dark:bg-emerald-950 dark:shadow-black/30",
    eyebrow: "text-emerald-700 dark:text-emerald-300",
    description: "text-emerald-800/90 dark:text-emerald-200/85",
    blob: "bg-emerald-400/15 dark:bg-emerald-500/10",
  },
  amber: {
    container:
      "border-amber-900/10 bg-white shadow-amber-900/5 dark:border-amber-100/10 dark:bg-emerald-950 dark:shadow-black/30",
    eyebrow: "text-amber-700 dark:text-amber-300",
    description: "text-emerald-800/90 dark:text-emerald-200/85",
    blob: "bg-amber-300/20 dark:bg-amber-500/10",
  },
  sky: {
    container:
      "border-sky-900/10 bg-white shadow-sky-900/5 dark:border-sky-100/10 dark:bg-emerald-950 dark:shadow-black/30",
    eyebrow: "text-sky-700 dark:text-sky-300",
    description: "text-emerald-800/90 dark:text-emerald-200/85",
    blob: "bg-sky-300/20 dark:bg-sky-500/10",
  },
  rose: {
    container:
      "border-rose-900/10 bg-white shadow-rose-900/5 dark:border-rose-100/10 dark:bg-emerald-950 dark:shadow-black/30",
    eyebrow: "text-rose-700 dark:text-rose-300",
    description: "text-emerald-800/90 dark:text-emerald-200/85",
    blob: "bg-rose-300/20 dark:bg-rose-500/10",
  },
};

/**
 * 共通のヒーロー帯。新4コラム（storage / calendar / select / nutrition）の見出し統一に使う。
 * 既存ページの h1 は触らず、これは新4コラムでのみ採用する想定。
 * Server Component（"use client" 不要）。
 */
export function PageHero({
  eyebrow,
  title,
  description,
  illustration,
  anchorId,
  tone = "emerald",
}: Props) {
  const style = TONE_STYLE[tone];
  return (
    <section
      id={anchorId}
      className={[
        "relative overflow-hidden rounded-3xl border px-6 py-8 shadow-sm sm:px-10 sm:py-10",
        style.container,
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute -right-16 -top-16 size-48 rounded-full blur-3xl",
          style.blob,
        ].join(" ")}
        aria-hidden
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <p
              className={[
                "text-xs font-semibold uppercase tracking-[0.22em]",
                style.eyebrow,
              ].join(" ")}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-emerald-950 dark:text-emerald-50 sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <div
              className={[
                "mt-3 text-sm leading-relaxed",
                style.description,
              ].join(" ")}
            >
              {description}
            </div>
          ) : null}
        </div>

        {illustration ? (
          <div
            className="pointer-events-none flex shrink-0 items-center justify-center sm:justify-end"
            aria-hidden
          >
            {illustration}
          </div>
        ) : null}
      </div>
    </section>
  );
}
