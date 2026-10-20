"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { qualification } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { useQualificationChapterAnimation } from "@/components/home/useQualificationChapterAnimation";

function CriterionIcon({ index }: { index: number }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-copper)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {index === 0 && (
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </>
      )}
      {index === 1 && (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" />
        </>
      )}
      {index === 2 && (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </>
      )}
      {index === 3 && (
        <>
          <polygon points="12 2 19 9 12 16 5 9" />
          <line x1="12" y1="16" x2="12" y2="22" />
        </>
      )}
      {index === 4 && (
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      )}
      {index === 5 && (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

function Criterion({ item, index }: { item: string; index: number }) {
  return (
    <li
      data-qual-criterion
      data-qual-criterion-index={index}
      className="qual-chapter__criterion relative flex gap-3 border-b border-forest/10 py-3 pl-1 sm:gap-3.5 sm:py-3.5 lg:py-4"
    >
      <span
        data-qual-icon
        className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-forest/10 bg-paper/90"
      >
        <CriterionIcon index={index} />
        <svg viewBox="0 0 24 24" className="absolute -bottom-1 -right-1 h-4 w-4" aria-hidden>
          <circle cx="12" cy="12" r="11" fill="var(--color-ivory)" />
          <path
            data-qual-check-path
            d="M6.5 12.5l3.5 3.5 7.5-8"
            fill="none"
            stroke="var(--color-copper)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="min-w-0 pt-0.5 text-[0.98rem] leading-[1.58] text-charcoal sm:text-base lg:text-[1.0625rem]">
        {item}
      </p>
    </li>
  );
}

function IndustryTags() {
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Example industries">
      {qualification.industries.map((industry) => (
        <li key={industry} data-qual-industry-tag>
          <span className="qual-chapter__industry-tag inline-block border border-forest/16 bg-paper/85 px-3 py-1.5 font-mono text-[0.75rem] tracking-[0.02em] text-forest sm:px-3.5 sm:py-2 sm:text-[0.8125rem]">
            {industry}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function QualificationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  useQualificationChapterAnimation(sectionRef, Boolean(reduce));

  return (
    <section
      ref={sectionRef}
      id="qualification"
      className="qual-chapter accent-copper relative scroll-mt-[var(--header-h)] overflow-x-clip bg-ivory pb-[clamp(1.75rem,1.35rem+1.6vw,3.25rem)] pt-[clamp(1.75rem,1.35rem+1.6vw,3.25rem)] text-forest md:pb-[clamp(2rem,1.55rem+1.8vw,3.75rem)] md:pt-[clamp(2.1rem,1.65rem+2vw,4rem)]"
      aria-labelledby="qual-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/10 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_38%_at_0%_0%,rgb(189_108_54/0.04),transparent_55%)]"
        aria-hidden
      />
      <div
        className="qual-chapter__foot-fade pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-forest/[0.04]"
        aria-hidden
      />

      <Container className="qual-chapter__container relative">
        <div className="qual-chapter__story relative lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10">
          <div
            className="qual-chapter__signal-bridge-wrap pointer-events-none absolute left-[38%] right-[58%] top-[42%] hidden h-px lg:block"
            aria-hidden
          >
            <div className="absolute inset-0 bg-forest/10" />
            <div
              data-qual-signal-bridge
              className="absolute inset-0 origin-left bg-gradient-to-r from-copper/70 to-copper/35"
            />
          </div>

          <div className="min-w-0 lg:col-span-5">
            <div data-qual-label>
              <SectionLabel className="mb-1.5">
                {homeSections.qualification.name}
              </SectionLabel>
            </div>

            <h2
              id="qual-heading"
              data-qual-headline
              className="font-display text-balance text-[clamp(1.6rem,1rem+2vw,2.85rem)] font-medium leading-[1.14] tracking-[-0.02em] text-forest"
            >
              {qualification.headline}
            </h2>
            <p
              data-qual-intro
              className="mt-2.5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-copper"
            >
              {qualification.intro}
            </p>

            <div
              data-qual-industries-block
              className="mt-5 rounded-sm border border-forest/10 bg-paper/40 px-4 py-4 sm:mt-6 sm:px-5"
            >
              <p
                data-qual-industries-intro
                className="text-[0.98rem] leading-[1.58] text-charcoal sm:text-base lg:max-w-[26rem] lg:text-[1.0625rem]"
              >
                {qualification.industriesIntro}
              </p>
              <IndustryTags />
            </div>
          </div>

          <div className="relative mt-6 min-w-0 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:pt-1">
            <div
              data-qual-criteria-panel
              className="qual-chapter__criteria-panel relative border border-forest/12 bg-paper/35"
            >
              <div
                className="pointer-events-none absolute bottom-3 left-[1.65rem] top-3 w-px bg-forest/10"
                aria-hidden
              />
              <div
                data-qual-signal-criteria
                className="pointer-events-none absolute bottom-3 left-[1.65rem] top-3 w-[2px] origin-top bg-gradient-to-b from-copper via-copper/75 to-copper/25"
                aria-hidden
              />

              <ul
                className="qual-chapter__criteria relative grid grid-cols-1 sm:grid-cols-2"
                aria-label="When this approach works well"
              >
                {qualification.criteria.map((item, i) => (
                  <Criterion key={item} item={item} index={i} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
