"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { plainEnglish } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { PLAIN_ENGLISH_JOURNEY_STAGES } from "@/components/home/plainEnglishJourney";
import { usePlainEnglishChapterAnimation } from "@/components/home/usePlainEnglishChapterAnimation";
import { cn } from "@/lib/cn";

export function PlainEnglishSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const total = plainEnglish.questions.length;
  const [active, setActive] = useState(0);

  const onActiveChange = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    if (reduce) setActive(total - 1);
  }, [reduce, total]);

  usePlainEnglishChapterAnimation(sectionRef, Boolean(reduce), onActiveChange);

  const qs = plainEnglish.questions;
  const stage = PLAIN_ENGLISH_JOURNEY_STAGES[active] ?? PLAIN_ENGLISH_JOURNEY_STAGES[0];
  const isFinal = active === total - 1;

  return (
    <section
      ref={sectionRef}
      id="plain-english"
      className="plain-chapter accent-copper surface-espresso relative scroll-mt-[var(--header-h)] overflow-x-clip py-[clamp(1.65rem,1.3rem+1.5vw,3.25rem)] md:py-[clamp(2rem,1.55rem+1.8vw,3.75rem)]"
      aria-labelledby="plain-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent"
        aria-hidden
      />
      <div
        className="plain-chapter__wash pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_8%_0%,rgb(189_108_54/0.1),transparent_55%)]"
        aria-hidden
      />

      <Container className="plain-chapter__container relative">
        <div data-plain-label className="mb-4 lg:mb-5">
          <SectionLabel tone="dark">
            {homeSections.plainEnglish.name}
          </SectionLabel>
        </div>

        <h2 id="plain-heading" className="sr-only">
          {plainEnglish.headline}
        </h2>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8 xl:gap-10">
          <div className="relative min-w-0 lg:col-span-7" data-plain-questions>
            <div
              className="pointer-events-none absolute bottom-0 left-[6px] top-0 w-px bg-ivory/18"
              aria-hidden
            >
              <div
                data-plain-thread
                className="plain-chapter__thread h-full w-[2px] origin-top bg-gradient-to-b from-copper-soft via-copper/80 to-copper/40"
              />
            </div>

            <ul
              aria-label="Plain English questions"
              className="plain-chapter__list relative space-y-0 pl-0.5"
              role="list"
            >
              {qs.map((q, i) => (
                <li
                  key={q}
                  data-plain-question
                  data-plain-question-index={i}
                  role="listitem"
                  tabIndex={0}
                  aria-current={active === i ? "step" : undefined}
                  className="plain-chapter__question relative flex cursor-pointer items-start gap-3 border-b border-ivory/12 py-2.5 outline-none sm:gap-3.5 sm:py-3 lg:py-3.5 focus-visible:ring-2 focus-visible:ring-copper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-espresso)]"
                >
                  <span
                    className="plain-chapter__glow pointer-events-none absolute inset-y-1 left-0 w-[calc(100%-0.25rem)] rounded-sm opacity-0"
                    aria-hidden
                  />
                  <span
                    className="plain-chapter__dot relative z-[2] mt-[0.45em] block h-2.5 w-2.5 shrink-0 rounded-full border border-ivory/25 bg-ivory/50"
                    aria-hidden
                  />
                  <span className="plain-chapter__qtext relative z-[2] min-w-0 flex-1 font-display text-[clamp(1.05rem,0.9rem+0.65vw,1.55rem)] leading-[1.32] text-ivory/78">
                    <span className="mb-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ivory/45">
                      {PLAIN_ENGLISH_JOURNEY_STAGES[i]}
                    </span>
                    {q}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside
            data-plain-aside
            className="plain-chapter__aside relative min-w-0 lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+1rem)]"
          >
            <div
              data-plain-aside-glow
              className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-sm opacity-0"
              aria-hidden
            />

            <div
              data-plain-journey-meta
              className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ivory/55"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="tabular-nums text-copper-soft">
                {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="text-ivory/35" aria-hidden>·</span>
              <span className="text-ivory/70">{stage}</span>
            </div>

            <div className="mb-4 space-y-2 sm:mb-5">
              {plainEnglish.intro.map((line, i) => (
                <p
                  key={line}
                  data-plain-intro-line
                  className={
                    i === 0
                      ? "font-display text-[clamp(1.25rem,1rem+1.1vw,1.85rem)] font-medium leading-[1.22] tracking-[-0.02em] text-ivory"
                      : "text-[0.98rem] leading-[1.55] text-ivory/82 sm:text-[1.02rem]"
                  }
                >
                  {line}
                </p>
              ))}
            </div>

            <span
              data-plain-rule
              className="mb-3 block h-px w-11 origin-left bg-copper-soft/85 sm:mb-4 sm:w-12"
              aria-hidden
            />

            <p
              data-plain-bridge
              className="plain-chapter__bridge text-[0.98rem] leading-[1.56] text-ivory/84 sm:text-[1.02rem]"
            >
              {plainEnglish.bridge}
            </p>
            <p
              data-plain-climax
              className={cn(
                "plain-chapter__climax mt-3 font-display text-[clamp(1.5rem,1.05rem+1.9vw,2.55rem)] font-medium leading-[1.12] tracking-[-0.02em] text-balance text-ivory sm:mt-4",
                isFinal && "plain-chapter__climax--peak",
              )}
            >
              {plainEnglish.climax}
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
