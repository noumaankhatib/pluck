"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { howWeWorkHero, howWeWorkSteps } from "@/content/how-we-work";
import { useHowWeWorkChapterAnimation } from "@/components/how-we-work/useHowWeWorkChapterAnimation";
import { cn } from "@/lib/cn";

const HEADING_WORDS = ["How", "we"];

export function HowWeWorkPageContent() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  useHowWeWorkChapterAnimation(rootRef, Boolean(reduce));

  return (
    <main ref={rootRef} aria-label="How we work" className="hww-chapter">
      <section
        data-hww-hero
        className="relative overflow-hidden bg-espresso py-20 text-ivory md:py-28"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-copper/18 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 left-1/3 h-[22rem] w-[22rem] rounded-full bg-teal/10 blur-3xl"
          aria-hidden
        />
        <Container className="relative">
          <SectionLabel tone="dark" className="mb-5">
            {howWeWorkHero.label}
          </SectionLabel>

          <div
            data-hww-hero-rule
            className="mb-5 h-px w-16 origin-left bg-gradient-to-r from-copper/80 to-copper/20"
            aria-hidden
          />

          <h1 className="font-display max-w-3xl text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.028em] text-ivory">
            {HEADING_WORDS.map((word) => (
              <span key={word} className="text-mask text-mask--gap">
                <span data-hww-heading-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
            <span className="text-mask">
              <span data-hww-heading-word className="inline-block text-copper-soft italic">
                {howWeWorkHero.titleEmphasis}
              </span>
            </span>
          </h1>

          <p
            data-hww-hero-intro
            className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ivory/85"
          >
            {howWeWorkHero.intro}
          </p>

          <div className="mt-10 md:mt-12">
            <ul className="flex flex-wrap gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] sm:gap-3 sm:text-[0.7rem]">
              {howWeWorkSteps.map((s) => (
                <li
                  key={s.number}
                  data-hww-stage-pill
                  className="flex items-center gap-2 rounded-full border border-ivory/18 bg-ivory/[0.04] px-3.5 py-2 text-ivory/82 sm:px-4"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-copper" aria-hidden />
                  {s.title}
                </li>
              ))}
            </ul>
            <div className="mt-4 h-px w-full max-w-md overflow-hidden bg-ivory/12">
              <div
                data-hww-hero-progress
                className="h-full w-full origin-left bg-gradient-to-r from-copper via-copper-soft to-copper/30"
                aria-hidden
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        data-hww-process
        className="relative bg-ivory py-[var(--section-space-loose)]"
      >
        <Container>
          <p
            data-hww-process-intro
            className="mb-12 max-w-2xl text-lg leading-relaxed text-charcoal/82 md:mb-16"
          >
            {howWeWorkHero.processIntro}
          </p>

          <div className="relative">
            <div
              className="pointer-events-none absolute left-0 right-0 top-[4.25rem] hidden h-px overflow-hidden bg-forest/10 lg:block"
              aria-hidden
            >
              <div
                data-hww-connector-fill
                className="h-full w-full origin-left bg-gradient-to-r from-copper/40 via-copper to-copper/70"
              />
            </div>

            <div
              className="pointer-events-none absolute bottom-8 left-3 top-8 w-px overflow-hidden bg-forest/10 lg:hidden"
              aria-hidden
            >
              <div
                data-hww-connector-fill-v
                className="h-full w-full origin-top bg-gradient-to-b from-copper/40 via-copper to-copper/70"
              />
            </div>

            <ol className="relative grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-5">
              {howWeWorkSteps.map((step, i) => (
                <li key={step.number} className="min-h-0">
                  <article
                    data-hww-card
                    data-hww-card-index={i}
                    className={cn(
                      "hww-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-[transform,box-shadow,border-color] duration-400 sm:p-7",
                      `hww-card--stage-${i}`,
                    )}
                  >
                    <span
                      className="hww-card__top-bar absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-copper transition-transform duration-500"
                      aria-hidden
                    />
                    <span
                      className={cn(
                        step.accent,
                        "hww-card__number font-display text-[4rem] font-medium leading-none tracking-[-0.04em] sm:text-[4.5rem]",
                      )}
                      aria-hidden
                    >
                      {step.number}
                    </span>

                    {i === 0 && (
                      <span className="hww-card__focus pointer-events-none absolute inset-0 rounded-2xl opacity-0" aria-hidden />
                    )}
                    {i === 1 && (
                      <span className="hww-card__sweep pointer-events-none absolute inset-y-6 left-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-copper/25 to-transparent opacity-0" aria-hidden />
                    )}
                    {i === 2 && (
                      <span className="hww-card__rings pointer-events-none absolute right-4 top-16 h-16 w-16 rounded-full border border-copper/0 opacity-0" aria-hidden />
                    )}
                    {i === 3 && (
                      <span className="hww-card__pulse pointer-events-none absolute bottom-6 right-6 h-8 w-8 rounded-full border border-copper/30 opacity-0" aria-hidden />
                    )}

                    <h2 className="mt-5 font-display text-[1.5rem] font-medium leading-snug text-espresso sm:mt-6 sm:text-[1.625rem]">
                      {step.title}
                    </h2>
                    <p
                      className={cn(
                        step.accent,
                        "mt-1 font-mono text-[0.65rem] uppercase tracking-[0.16em]",
                      )}
                    >
                      {step.question}
                    </p>
                    <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-charcoal/78 sm:mt-5">
                      {step.body}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>

          <div
            data-hww-cycle
            className="relative mt-12 flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft md:mt-14"
          >
            <span className="h-px flex-1 bg-forest/15" aria-hidden />
            <span className="relative flex items-center gap-3">
              <svg
                width="36"
                height="20"
                viewBox="0 0 36 20"
                fill="none"
                className="hidden shrink-0 sm:block"
                aria-hidden
              >
                <path
                  data-hww-cycle-loop
                  d="M2 10 H26 A6 6 0 0 1 26 4 H10 A6 6 0 0 0 10 16 H30"
                  stroke="#bd6c36"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              {howWeWorkHero.cycleNote}
            </span>
            <span className="h-px w-10 bg-forest/15" aria-hidden />
          </div>
        </Container>
      </section>

      <section
        data-hww-closing
        className="relative overflow-hidden bg-espresso py-[var(--section-space-loose)] text-ivory"
      >
        <div
          data-hww-closing-divider
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-copper/55 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 top-0 h-[24rem] w-[24rem] rounded-full bg-copper/12 blur-3xl"
          aria-hidden
        />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <p
              data-hww-closing-body
              className="text-lg leading-relaxed text-ivory/85 lg:col-span-6"
            >
              {howWeWorkHero.commitment}
            </p>
            <div className="lg:col-span-5 lg:col-start-8">
              <p
                data-hww-closing-climax
                className="font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ivory"
              >
                <span data-hww-climax-part className="inline-block">
                  {howWeWorkHero.climaxLead}
                </span>
                <span
                  data-hww-climax-part
                  className="inline-block text-copper-soft italic"
                >
                  {howWeWorkHero.climaxEmphasis}
                </span>
              </p>
              <div data-hww-closing-cta className="mt-8">
                <Link
                  href={howWeWorkHero.ctaHref}
                  className="group inline-flex min-h-11 items-center justify-center gap-2.5 bg-ivory px-7 py-3 text-sm font-medium tracking-wide text-forest transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-px hover:bg-[#FFF8EC] hover:shadow-[0_10px_28px_rgb(0_0_0/0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-copper"
                >
                  {howWeWorkHero.cta}
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  >
                    <path
                      d="M1 5h12M8 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
