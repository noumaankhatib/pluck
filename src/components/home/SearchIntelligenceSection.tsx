"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { searchIntelligence } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { homeSections } from "@/content/home-sections";
import { motionEase } from "@/lib/motion";

const SEARCH_QUERIES = [
  "industrial cooling systems",
  "data centre cooling",
  "industrial cooling system manufacturers",
  "industrial cooling solutions for data centres",
  "how much does industrial cooling cost",
];

function SearchIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 8 10.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIntelligenceSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const stages = searchIntelligence.stages;
  const stageCount = stages.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });

  const lineProgress = useTransform(scrollYProgress, [0.08, 0.92], [0.04, 1]);
  const queryReveal = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(stageCount - 1, Math.max(0, Math.floor(v * stageCount * 1.02)));
    setActive(index);
  });

  return (
    <section
      ref={ref}
      className="relative bg-paper py-[var(--section-space-loose)] text-forest"
      aria-labelledby="search-heading"
    >
      <Container>
        <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left: editorial headline + search query visual */}
          <div className="lg:col-span-5">
            <SectionLabel index={homeSections.search.index} className="mb-5">
              {homeSections.search.name}
            </SectionLabel>
            <Reveal>
              <h2
                id="search-heading"
                className="type-display-l"
              >
                {searchIntelligence.headline}
              </h2>
            </Reveal>
            <p className="type-lead mt-5 max-w-[32rem] text-ink-soft md:mt-6">
              {searchIntelligence.intro}
            </p>

            {/* Search query visualization */}
            <motion.div
              className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 [&>*:nth-child(n+4)]:hidden sm:[&>*:nth-child(n+4)]:flex"
              style={reduce ? undefined : { opacity: queryReveal }}
              aria-hidden
            >
              {SEARCH_QUERIES.map((q, i) => (
                <motion.div
                  key={q}
                  className="flex min-w-0 items-center gap-3 border border-forest/10 bg-surface/70 px-3.5 py-3 shadow-[0_1px_0_rgba(27,61,47,0.04)]"
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.45, ease: motionEase }}
                >
                  <span className="shrink-0 text-copper">
                    <SearchIcon />
                  </span>
                  <span className="truncate font-mono text-[0.8125rem] text-charcoal/80">{q}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: investigation stage trace */}
          <div className="lg:col-span-7">

            {/* Progress thread */}
            <div className="relative mb-6 hidden md:block" aria-hidden>
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-forest/12" />
              <motion.div
                className="absolute left-0 top-1/2 h-px w-full origin-left -translate-y-1/2 bg-copper/70"
                style={reduce ? { scaleX: 1 } : { scaleX: lineProgress }}
              />
              <div className="relative flex items-center justify-between">
                {stages.map((stage, index) => {
                  const lit = index <= active;
                  const isActive = index === active;
                  return (
                    <button
                      key={stage.label}
                      type="button"
                      className={cn(
                        "relative z-[1] min-h-11 bg-paper px-2 font-display text-[0.9375rem] transition-colors duration-300 first:pl-0 last:pr-0",
                        lit ? "text-forest" : "text-forest/55",
                        isActive && "text-copper",
                      )}
                      onClick={() => setActive(index)}
                    >
                      {stage.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage list */}
            <ol className="divide-y divide-forest/10 border-y border-forest/12" aria-label="Investigation stages">
              {stages.map((stage, index) => {
                const isActive = index === active;
                const isPast = index < active;
                return (
                  <li key={stage.label}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "relative grid min-h-14 w-full grid-cols-[2.25rem_1fr] items-baseline gap-x-3 py-4 pl-4 text-left transition-colors duration-300 md:grid-cols-[2.75rem_9rem_1fr] md:gap-x-4 md:py-5",
                        isActive ? "bg-surface/70" : "hover:bg-surface/40",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute inset-y-0 left-0 w-[2px] origin-top bg-copper transition-transform duration-500",
                          isActive ? "scale-y-100" : "scale-y-0",
                        )}
                        aria-hidden
                      />
                      <span
                        className={cn(
                          "font-mono text-[0.75rem] tabular-nums",
                          isActive || isPast ? "text-copper" : "text-forest/45",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "type-title block transition-colors duration-300 md:text-2xl",
                          isActive ? "text-forest" : "text-forest/60",
                        )}
                      >
                        {stage.label}
                      </span>
                      {isActive ? (
                        <motion.span
                          className="type-small col-start-2 mt-1 block text-ink-soft md:col-start-3 md:mt-0"
                          initial={reduce ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.35, ease: motionEase }}
                          aria-live="polite"
                        >
                          {stage.description}
                        </motion.span>
                      ) : (
                        <span className="hidden md:col-start-3 md:block" aria-hidden />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
