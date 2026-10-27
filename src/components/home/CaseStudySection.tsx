"use client";

import Link from "next/link";
import { Fragment, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { caseStudy } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { cn } from "@/lib/cn";
import { finalMetricDisplay } from "@/components/home/caseStudyMetricFormat";
import { useCaseStudyChapterAnimation } from "@/components/home/useCaseStudyChapterAnimation";

function MetricCardBody({
  metric,
  index,
  flowLabel,
}: {
  metric: (typeof caseStudy.metrics)[number];
  index: number;
  flowLabel: string;
}) {
  const displayValue = finalMetricDisplay(metric.value);

  return (
    <div
      data-case-metric
      className="case-chapter__metric group/metric relative grid h-full min-h-[8rem] grid-rows-[auto_1fr_auto] px-4 py-4 sm:px-5 sm:py-4 lg:min-h-[8.75rem] lg:px-5 lg:py-5"
    >
      <p className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-copper/90 lg:hidden">
        {flowLabel}
      </p>
      <p
        data-case-metric-label
        className="font-mono text-[0.6875rem] uppercase leading-snug tracking-[0.14em] text-charcoal/75"
      >
        <span className="mr-2 tabular-nums text-copper">{String(index + 1).padStart(2, "0")}</span>
        {metric.label}
      </p>
      <div aria-hidden className="min-h-1" />
      <p
        data-case-metric-value
        data-case-final={metric.value}
        className="case-chapter__metric-value self-end font-display text-[clamp(1.38rem,0.95rem+1.45vw,2.2rem)] font-medium leading-[1.04] tracking-[-0.02em] text-forest tabular-nums"
        aria-label={metric.value}
      >
        {displayValue}
      </p>
      {index < 3 && (
        <div
          data-case-arrow
          className="case-chapter__metric-arrow pointer-events-none absolute -right-[6px] top-1/2 z-10 hidden -translate-y-1/2 text-copper/70 lg:flex"
          aria-hidden
        >
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
            <path
              d="M0.5 5.5H5.5M3 2L6 5.5L3 9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export function CaseStudySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  useCaseStudyChapterAnimation(sectionRef, Boolean(reduce));

  const flow = caseStudy.metrics.slice(0, 4);
  const ret = caseStudy.metrics[4];

  return (
    <section
      ref={sectionRef}
      id="our-work"
      className="case-chapter accent-copper relative scroll-mt-[var(--header-h)] overflow-x-clip overflow-y-visible bg-ivory py-[clamp(1.75rem,1.35rem+1.6vw,3.5rem)] text-forest md:py-[clamp(2.1rem,1.65rem+2vw,4rem)]"
      aria-labelledby="case-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/10 to-transparent"
        aria-hidden
      />

      <Container className="case-chapter__container relative overflow-visible">
        <div className="case-chapter__intro grid items-start gap-5 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
          <div className="min-w-0 lg:col-span-5 xl:max-w-[28rem]">
            <div data-case-label>
              <SectionLabel className="mb-1.5">
                {homeSections.caseStudy.name}
              </SectionLabel>
            </div>

            <p
              data-case-client
              className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-copper"
            >
              {caseStudy.client}
            </p>
            <h2
              id="case-heading"
              data-case-headline
              className="mt-1.5 font-display text-balance text-[clamp(1.65rem,1.02rem+2vw,2.85rem)] font-medium leading-[1.14] tracking-[-0.02em] text-forest"
            >
              {caseStudy.headline.split(" ").map((w, i, all) => (
                <Fragment key={`${w}-${i}`}>
                  <span className="case-chapter__wm">
                    <span data-case-word className="inline-block">
                      {w}
                    </span>
                  </span>
                  {i < all.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </h2>
            <p
              data-case-supporting
              className="case-chapter__supporting mt-2.5 font-display text-[clamp(1.06rem,0.96rem+0.5vw,1.5rem)] italic leading-[1.38]"
            >
              {caseStudy.supporting}
            </p>
          </div>

          <div
            data-case-narrative
            className="min-w-0 lg:col-span-6 lg:col-start-7 lg:pt-[1.55rem] xl:pt-[1.7rem]"
          >
            <div className="relative pl-4 sm:pl-5">
              <span className="absolute inset-y-0 left-0 w-[2px] bg-copper/25" aria-hidden>
                <span data-case-narrative-line className="block h-full w-full origin-top bg-copper/70" />
              </span>
              <div className="space-y-2.5 sm:space-y-3">
                {caseStudy.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    data-case-paragraph
                    className="text-[0.98rem] leading-[1.6] text-charcoal sm:text-base lg:text-[1.0625rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          data-case-outcomes
          className="case-chapter__outcomes mt-6 rounded-sm border border-forest/10 bg-gradient-to-b from-paper/50 to-paper/30 pt-4 sm:mt-7 sm:pt-5 lg:mt-8"
        >
          <div data-case-bridge className="case-chapter__bridge px-4 sm:px-5">
            <div
              data-case-timeline
              className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 border-b border-forest/10 pb-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-charcoal/72"
            >
              <span className="font-display text-[1rem] normal-case italic tracking-normal text-copper sm:text-[1.125rem]">
                {caseStudy.timeline}
              </span>
              <span className="hidden h-px w-6 bg-forest/14 sm:block" aria-hidden />
              <span>Commercial outcomes</span>
            </div>
          </div>

          <div
            data-case-pipeline
            className="case-chapter__pipeline relative overflow-visible border-t border-forest/8 bg-forest/[0.06]"
          >
            <ol
              className="case-chapter__stage-grid relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div
                data-case-flow-rail
                className="case-chapter__flow-rail pointer-events-none absolute inset-x-0 top-0 z-[1] hidden h-[var(--case-rail-h)] lg:block"
                aria-hidden
              >
                <div className="case-chapter__flow-track absolute left-[6.25%] right-[6.25%] top-[calc(var(--case-rail-h)-0.75rem)] h-px bg-forest/14" />
                <div
                  data-case-flow-line
                  className="case-chapter__flow-progress absolute left-[6.25%] top-[calc(var(--case-rail-h)-0.75rem)] h-[2px] w-[87.5%] -translate-y-1/2 origin-left bg-gradient-to-r from-copper via-copper/85 to-copper/50"
                />
              </div>

              {flow.map((m, i) => (
                <li
                  key={m.label}
                  data-case-pipeline-col
                  data-case-pipeline-index={i}
                  className="case-chapter__pipeline-col flex min-w-0 flex-col"
                >
                  <div
                    data-case-flow-marker
                    data-case-flow-index={i}
                    className="case-chapter__marker relative z-[2] hidden flex-col items-center justify-start px-2 pt-3 lg:flex lg:h-[var(--case-rail-h)]"
                  >
                    <span
                      data-case-flow-dot
                      className={cn(
                        "relative z-[2] inline-flex max-w-full items-center justify-center rounded-full border border-forest/16 bg-ivory px-2.5 py-1 text-center font-mono text-[0.6875rem] uppercase leading-tight tracking-[0.12em] text-forest/58",
                        i === 0 && "border-copper/28 text-copper",
                      )}
                    >
                      {caseStudy.flow[i]}
                    </span>
                    <span
                      data-case-flow-node
                      className="mt-auto mb-[0.4rem] h-2 w-2 shrink-0 rounded-full border border-copper/35 bg-ivory"
                      aria-hidden
                    />
                  </div>
                  <MetricCardBody metric={m} index={i} flowLabel={caseStudy.flow[i]} />
                </li>
              ))}
            </ol>
          </div>

          <div
            data-case-return
            className="case-chapter__return surface-espresso relative overflow-visible border-t border-forest/12"
          >
            <div
              data-case-return-glow
              className="pointer-events-none absolute inset-0"
              aria-hidden
            />
            <div
              data-case-return-sweep
              className="pointer-events-none absolute inset-0 opacity-0"
              aria-hidden
            />
            <div
              data-case-return-rule
              className="absolute left-0 top-0 h-full w-[3px] origin-top bg-gradient-to-b from-copper via-copper/60 to-transparent"
              aria-hidden
            />
            <div className="relative grid gap-3 px-5 py-5 sm:px-7 sm:py-6 md:grid-cols-12 md:items-center md:gap-6 md:px-8 lg:py-6">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ivory/60 md:col-span-3">
                {ret.label}
              </p>
              <p
                data-case-return-text
                className="font-display text-[clamp(1.12rem,0.9rem+0.95vw,1.9rem)] font-medium leading-[1.3] tracking-[-0.02em] text-ivory md:col-span-9"
              >
                {ret.value}
              </p>
            </div>
          </div>

          <div data-case-link className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
            <Link
              href={caseStudy.link}
              className="group inline-flex min-h-11 items-center gap-3 border-b border-forest/30 pb-0.5 text-[0.9375rem] font-medium text-forest transition-colors hover:border-copper hover:text-copper"
            >
              {caseStudy.linkLabel}
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
      </Container>
    </section>
  );
}
