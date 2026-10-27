"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { howWeWorkHero, howWeWorkSteps } from "@/content/how-we-work";
import { useHowWeWorkChapterAnimation } from "@/components/how-we-work/useHowWeWorkChapterAnimation";
import { cn } from "@/lib/cn";

const HEADING_WORDS = ["How", "we"];

export function HowWeWorkPageContent({ embedded = false }: { embedded?: boolean } = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useHowWeWorkChapterAnimation(rootRef, Boolean(reduce));

  return (
    <div ref={rootRef} className="hww-chapter">
      {!embedded && (
      <section data-hww-hero className="relative overflow-hidden bg-ivory pb-10 pt-10 text-forest md:pb-14 md:pt-14">
          <Container className="relative">
            <SectionLabel className="mb-4 !text-forest/70 [&_span.font-mono]:text-copper">
              {howWeWorkHero.label}
            </SectionLabel>
  
            <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-7">
                <div
                  data-hww-hero-rule
                  className="mb-5 h-px w-14 origin-left bg-copper"
                  aria-hidden
                />
                <h1 className="font-display text-[clamp(2.5rem,5.6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-forest">
                  {HEADING_WORDS.map((word) => (
                    <span key={word} className="text-mask text-mask--gap">
                      <span data-hww-heading-word className="inline-block">
                        {word}
                      </span>
                    </span>
                  ))}
                  <span className="text-mask">
                    <span data-hww-heading-word className="inline-block italic text-copper">
                      {howWeWorkHero.titleEmphasis}
                    </span>
                  </span>
                </h1>
              </div>
              <p
                data-hww-hero-intro
                className="max-w-md text-base leading-relaxed text-forest/90 lg:col-span-5 lg:pb-2"
              >
                {howWeWorkHero.intro}
              </p>
            </div>
  
            <div className="mt-8 md:mt-10">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-forest/15 pt-5 sm:grid-cols-4">
                {howWeWorkSteps.map((s) => (
                  <li
                    key={s.number}
                    data-hww-stage-pill
                    className="flex items-baseline gap-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-forest"
                  >
                    <span className="text-copper">{s.number}</span>
                    {s.title}
                  </li>
                ))}
              </ul>
              <div className="mt-5 h-px w-full overflow-hidden bg-forest/10">
                <div
                  data-hww-hero-progress
                  className="h-full w-full origin-left bg-copper"
                  aria-hidden
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      <section data-hww-process className="relative bg-sage-pale py-12 text-forest md:py-16">
        <Container>
          {!embedded && <p
            data-hww-process-intro
            className="mb-8 max-w-3xl font-display text-[clamp(1.25rem,1.9vw,1.625rem)] leading-snug text-forest md:mb-10"
          >
            {howWeWorkHero.processIntro}
          </p>}

          <div className="relative">
            <div
              className="pointer-events-none absolute bottom-0 left-0 top-0 w-px overflow-hidden bg-forest/15"
              aria-hidden
            >
              <div data-hww-connector-fill-v className="h-full w-full origin-top bg-copper" />
            </div>

            <ol className="relative">
              {howWeWorkSteps.map((step, i) => (
                <li key={step.number} className="min-h-0">
                  <article
                    data-hww-card
                    data-hww-card-index={i}
                    className={cn(
                      "hww-card group relative grid gap-x-8 gap-y-3 border-b border-forest/15 py-6 pl-7 md:grid-cols-12 md:py-8 md:pl-12",
                      i === 0 && "border-t",
                    )}
                  >
                    <span
                      className="hww-card__dot absolute left-0 top-8 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-copper bg-sage-pale md:top-11"
                      aria-hidden
                    />
                    <div className="md:col-span-5">
                      <div className="flex items-baseline gap-4">
                        <span
                          className="hww-card__number inline-block w-14 shrink-0 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-medium leading-none tracking-[-0.03em] text-copper"
                          aria-hidden
                        >
                          {step.number}
                        </span>
                        <h2 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight text-forest">
                          {step.title}
                        </h2>
                      </div>
                      <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-copper md:pl-[4.5rem]">
                        {step.question}
                      </p>
                    </div>
                    <p className="max-w-2xl text-base leading-[1.7] text-forest md:col-span-7">
                      {step.body}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>

          <div
            data-hww-cycle
            className="relative mt-8 flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-forest/80 md:mt-10"
          >
            <span className="h-px flex-1 bg-forest/20" aria-hidden />
            <span className="relative flex items-center gap-3">
              <svg width="36" height="20" viewBox="0 0 36 20" fill="none" className="hidden shrink-0 sm:block" aria-hidden>
                <path
                  data-hww-cycle-loop
                  d="M2 10 H26 A6 6 0 0 1 26 4 H10 A6 6 0 0 0 10 16 H30"
                  stroke="#b65320"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              {howWeWorkHero.cycleNote}
            </span>
            <span className="h-px w-10 bg-forest/20" aria-hidden />
          </div>
        </Container>
      </section>

      {!embedded && (
      <section data-hww-closing className="relative overflow-hidden bg-ivory text-forest">
          <div
            data-hww-closing-divider
            className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-copper/60"
            aria-hidden
          />
          <Container className="relative pb-10 pt-12 md:pb-12 md:pt-16">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
              <p data-hww-closing-body className="max-w-xl text-[1.0625rem] leading-[1.7] text-forest lg:col-span-6">
                {howWeWorkHero.commitment}
              </p>
              <div className="lg:col-span-5 lg:col-start-8 lg:border-l lg:border-forest/15 lg:pl-12">
                <span className="mb-5 block h-px w-12 bg-copper" aria-hidden />
                <p
                  data-hww-closing-climax
                  className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-forest"
                >
                  <span data-hww-climax-part className="inline-block">
                    {howWeWorkHero.climaxLead}
                  </span>
                  <span data-hww-climax-part className="inline-block italic text-copper">
                    {howWeWorkHero.climaxEmphasis}
                  </span>
                </p>
                <div data-hww-closing-cta className="mt-7">
                  <Link href={howWeWorkHero.ctaHref} className="closing-chapter__cta group">
                    {howWeWorkHero.cta}
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                      <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
  
          <Container className="pb-12 md:pb-16">
            <div className="relative h-[clamp(10rem,20vw,16rem)] overflow-hidden bg-forest" aria-hidden>
              <div data-hww-closing-media className="absolute -inset-y-[10%] inset-x-0">
                <Image
                  src="/images/hero-infrastructure.png"
                  alt=""
                  fill
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className="object-cover object-[62%_42%]"
                />
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
