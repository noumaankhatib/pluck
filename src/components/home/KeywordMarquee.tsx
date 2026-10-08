import { cn } from "@/lib/cn";

const WORDS = ["Data", "Research", "Tools", "Execution"] as const;
const STARS = ["text-copper", "text-saffron", "text-teal", "text-rose"] as const;

/** Drifting keyword strip directly at the foot of the hero's single-screen view, on the same ivory surface. */
export function KeywordMarquee({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden border-y border-forest/10 bg-ivory py-2.5 md:py-3", className)} aria-hidden>
      <div className="marquee font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.28em] md:text-sm">
        {[0, 1].map((n) => (
          <span key={n} className="flex shrink-0 items-center gap-10 pr-10">
            {[0, 1].flatMap(() => WORDS).map((w, i) => (
              <span key={`${w}-${i}`} className="flex items-center gap-10">
                <span className={STARS[i % STARS.length]}>{w}</span>
                <span className={`${STARS[i % STARS.length]} text-base leading-none`}>✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
