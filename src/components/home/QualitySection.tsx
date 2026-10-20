"use client";

import { useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import { quality } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  FLOW_EDGES,
  SCATTER,
  useQualitySignalAnimation,
} from "@/components/home/useQualitySignalAnimation";

function SignalStage({
  sectionRef,
  staticDone,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  staticDone: boolean;
}) {
  const signalRootRef = useRef<HTMLDivElement>(null);
  useQualitySignalAnimation(sectionRef, signalRootRef, staticDone);

  return (
    <div ref={signalRootRef} className="quality-chapter__signal relative w-full">
      <div
        className="quality-chapter__signal-panel relative flex flex-col rounded-sm border border-forest/12 bg-paper shadow-[inset_0_1px_0_rgb(255_255_255/0.55)]"
      >
        <div
          className="quality-chapter__volume relative h-[8rem] shrink-0 overflow-hidden rounded-t-sm border-b border-forest/10 bg-ivory sm:h-[8.5rem]"
          aria-hidden
        >
          <div
            className="pointer-events-none absolute inset-0 bg-forest"
            data-quality-volume-wash
            aria-hidden
          />
          <p className="absolute left-3.5 top-3 z-[2] font-mono text-[0.625rem] font-medium uppercase tracking-[0.18em] text-forest/80 sm:left-4 sm:top-3.5 sm:text-[0.6875rem]">
            Volume
          </p>

          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full text-forest/22"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {FLOW_EDGES.map(([a, b]) => (
              <line
                key={`${a}-${b}`}
                data-quality-flow-line
                x1={SCATTER[a].x}
                y1={SCATTER[a].y}
                x2={SCATTER[b].x}
                y2={SCATTER[b].y}
                stroke="currentColor"
                strokeWidth="0.35"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {SCATTER.map((point, i) => (
              <circle
                key={`p-${i}`}
                data-quality-flow-particle
                cx={point.x}
                cy={point.y}
                r="0.55"
                fill="currentColor"
                className="text-copper/45"
              />
            ))}
          </svg>

          <div className="quality-chapter__volume-metrics relative z-[2] h-full w-full">
            {quality.volumeSignals.map((word, index) => (
              <div
                key={word}
                data-quality-metric-wrap
                className="quality-chapter__volume-metric-wrap absolute will-change-transform"
              >
                <span
                  data-quality-metric-label
                  className="quality-chapter__volume-metric block font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-forest sm:text-[0.8125rem]"
                >
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 px-3.5 py-1.5 sm:px-5 sm:py-2" aria-hidden>
          <p className="mb-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.18em] text-copper sm:text-[0.6875rem]">
            Relevance
          </p>
          <div className="relative h-px w-full">
            <div className="absolute inset-0 bg-forest/14" />
            <div
              data-quality-copper-fill
              className="absolute inset-0 origin-left bg-gradient-to-r from-forest/25 via-copper/80 to-copper/60"
            />
            <div
              data-quality-copper-dot
              className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper shadow-[0_0_0_2px_rgb(250_249_243/0.9)]"
            />
          </div>
        </div>

        <div className="quality-chapter__relevance shrink-0 border-t border-forest/8 px-3.5 pb-3 pt-1.5 sm:px-5 sm:pb-3.5 sm:pt-2">
          <div className="quality-chapter__relevance-head grid grid-cols-[1.5rem_1fr] items-end gap-x-2.5 md:gap-x-3">
            <p
              data-quality-right-label
              className="col-span-2 font-display text-[clamp(1.45rem,1rem+1.65vw,2.05rem)] font-semibold leading-none tracking-[-0.02em] text-forest"
            >
              Right
            </p>
            <span
              className="col-span-2 mb-0.5 mt-1 hidden h-px bg-forest/10 sm:block"
              aria-hidden
            />
          </div>
          <ol
            className="quality-chapter__relevance-list relative mt-1 md:mt-1.5"
            aria-label="Signals that matter"
          >
            {quality.rightSignals.map((label, index) => {
              const isPayoff = index === quality.rightSignals.length - 1;
              return (
                <li
                  key={label}
                  data-quality-stage
                  className="quality-chapter__stage relative"
                >
                  <div className="grid grid-cols-[1.5rem_1fr] grid-rows-[auto_auto] items-baseline gap-x-2.5 py-0.5 md:gap-x-3 md:py-1">
                    <span
                      data-quality-stage-number
                      className="row-start-1 font-mono text-[0.6875rem] tabular-nums text-copper md:text-[0.75rem]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "row-start-1 min-w-0 font-display leading-snug tracking-[-0.01em]",
                        isPayoff
                          ? "text-[clamp(1.15rem,0.9rem+1vw,1.65rem)] italic text-copper"
                          : "text-[clamp(1rem,0.94rem+0.35vw,1.2rem)] text-forest",
                      )}
                    >
                      {label}
                    </span>
                    <span
                      data-quality-stage-rule
                      className={cn(
                        "col-start-2 row-start-2 mt-0.5 h-px origin-left",
                        isPayoff ? "bg-copper/55" : "bg-forest/14",
                      )}
                      aria-hidden
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

function CopyColumn({ onDetailToggle }: { onDetailToggle: (open: boolean) => void }) {
  return (
    <div className="quality-chapter__copy flex min-w-0 flex-col justify-start overflow-visible">
      <h2
        id="quality-heading"
        className="font-display text-balance text-[clamp(1.65rem,1rem+2.35vw,3.1rem)] font-medium leading-[1.12] tracking-[-0.018em] text-forest"
      >
        <span className="block">{quality.headlineLead}</span>
        <span className="mt-2 block italic text-copper">{quality.headlineTurn}</span>
      </h2>

      <p
        className="quality-chapter__sub mt-3 max-w-[32rem] text-[clamp(1.02rem,0.98rem+0.3vw,1.15rem)] leading-[1.58] text-ink-soft md:mt-3.5 lg:max-w-[34rem]"
      >
        {quality.subheading}
      </p>

      <details
        className="quality-chapter__details group mt-4 w-full max-w-[36rem] md:mt-5"
        onToggle={(e) => onDetailToggle(e.currentTarget.open)}
      >
        <summary
          className="flex min-h-9 cursor-pointer list-none items-center gap-2 rounded-sm py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-forest transition-colors duration-300 hover:text-copper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper/70 [&::-webkit-details-marker]:hidden sm:text-[0.75rem]"
        >
          <span
            className="inline-block text-copper transition-transform duration-300 group-open:rotate-90"
            aria-hidden
          >
            →
          </span>
          <span className="group-open:hidden">Read more</span>
          <span className="hidden group-open:inline">Hide detail</span>
        </summary>
        <div
          className="quality-chapter__detail-body mt-3 space-y-3.5 border-l-2 border-copper/35 pl-4 pr-0 sm:pr-1 md:mt-3.5 md:space-y-4 md:pl-5"
        >
          {quality.paragraphs.map((paragraph, i) => (
            <p
              key={paragraph}
              className={cn(
                "text-pretty text-[clamp(0.96rem,0.92rem+0.18vw,1.06rem)] leading-[1.65]",
                i === 1
                  ? "font-mono text-[0.68rem] font-medium uppercase leading-[1.55] tracking-[0.08em] text-forest/62 sm:text-[0.72rem]"
                  : "text-charcoal/88",
                i === quality.paragraphs.length - 1 && "font-medium text-forest",
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </details>

      <div className="mt-5 md:mt-6">
        <Button href={quality.ctaHref}>{quality.cta}</Button>
      </div>
    </div>
  );
}

function QualityScene({
  sectionRef,
  isStatic,
  detailOpen,
  onDetailToggle,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  isStatic: boolean;
  detailOpen: boolean;
  onDetailToggle: (open: boolean) => void;
}) {
  return (
    <Container className="quality-chapter__container relative w-full overflow-visible">
      <header className="quality-chapter__header mb-5 max-w-[var(--measure-wide)] md:mb-6">
        <SectionLabel
          index={homeSections.quality.index}
          tone="light"
          className="mb-0"
        >
          {homeSections.quality.name}
        </SectionLabel>
      </header>

      <div
        className={cn(
          "quality-chapter__grid grid items-start gap-7 md:gap-8 lg:grid-cols-12 lg:gap-x-9 xl:gap-x-10",
          detailOpen && "quality-chapter__grid--expanded",
        )}
      >
        <div className="min-w-0 overflow-visible lg:col-span-5 lg:col-start-1 lg:min-h-0">
          <CopyColumn onDetailToggle={onDetailToggle} />
        </div>
        <div
          className="min-w-0 lg:col-span-7 lg:col-start-6 lg:min-h-0 lg:border-l lg:border-forest/10 lg:pl-9 lg:self-start xl:pl-10"
        >
          <div className="border-t border-forest/10 pt-5 lg:border-t-0 lg:pt-0">
            <SignalStage sectionRef={sectionRef} staticDone={isStatic} />
          </div>
        </div>
      </div>
    </Container>
  );
}

const sectionClass =
  "quality-chapter relative accent-copper scroll-mt-[var(--header-h)] overflow-visible bg-ivory text-forest";

/** 03 — GSAP ScrollTrigger scrubs volume → relevance signal stage. */
export function QualitySection() {
  const reduce = useReducedMotion();
  const [detailOpen, setDetailOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="quality"
      aria-labelledby="quality-heading"
      className={sectionClass}
      data-detail-open={detailOpen ? "true" : "false"}
    >
      <div className="quality-chapter__inner relative overflow-visible pt-6 pb-10 md:pt-7 md:pb-11 lg:pb-12">
        <QualityScene
          sectionRef={sectionRef}
          isStatic={!!reduce}
          detailOpen={detailOpen}
          onDetailToggle={setDetailOpen}
        />
      </div>
    </section>
  );
}
