"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { searchIntelligence } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { homeSections } from "@/content/home-sections";
import { motionEase } from "@/lib/motion";

/** One real query per stage — each search is the clue that reveals it. */
const SEARCH_QUERIES = [
  "industrial cooling systems",
  "data centre cooling",
  "industrial cooling system manufacturers",
  "industrial cooling solutions for data centres",
  "how much does industrial cooling cost",
];

const TYPE_MS = 42;
const HOLD_MS = 1900;
const RESTART_MS = 3200;

function SearchIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none" aria-hidden>
      <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 8 10.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIntelligenceSection() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(sceneRef, { amount: 0.35 });
  const stages = searchIntelligence.stages;
  const total = stages.length;

  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [picked, setPicked] = useState(false);

  /* Reduced motion: no loop — show the finished trail until the reader picks a stage */
  const active = reduce && !picked ? total - 1 : step;

  const query = SEARCH_QUERIES[active] ?? "";
  const doneTyping = reduce || typed >= query.length;

  /* Type the current query, hold on its clue, then move to the next — loop while visible */
  useEffect(() => {
    if (!inView || reduce) return;
    if (!doneTyping) {
      const id = window.setTimeout(() => setTyped((t) => t + 1), TYPE_MS);
      return () => window.clearTimeout(id);
    }
    const last = active === total - 1;
    const id = window.setTimeout(
      () => {
        setStep(last ? 0 : active + 1);
        setTyped(0);
      },
      last ? RESTART_MS : HOLD_MS,
    );
    return () => window.clearTimeout(id);
  }, [inView, reduce, doneTyping, typed, active, total]);

  const jumpTo = (index: number) => {
    setPicked(true);
    setStep(index);
    setTyped(0);
  };

  const headWords = searchIntelligence.headline.split(" ");
  const headLast = headWords.pop();

  const stage = stages[active];
  const shown = reduce ? query : query.slice(0, typed);

  return (
    <section
      className="screen-fit relative bg-paper text-forest"
      aria-labelledby="search-heading"
    >
      <Container>
        <div className="grid gap-5 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Left: the claim + the trail so far */}
          <div className="min-w-0 md:max-w-[36rem] lg:col-span-5 lg:max-w-none">
            <SectionLabel index={homeSections.search.index} className="mb-3 lg:mb-5">
              {homeSections.search.name}
            </SectionLabel>
            <Reveal>
              <h2 id="search-heading" className="type-display-l max-lg:[@media(max-height:760px)]:text-[1.875rem]">
                {headWords.join(" ")} <span className="italic text-copper">{headLast}</span>
              </h2>
            </Reveal>
            <p className="mt-3 max-w-[32rem] text-[0.9375rem] leading-[1.5] text-ink-soft sm:text-base lg:mt-6 lg:text-[1.1875rem]">
              {searchIntelligence.intro}
            </p>

            {/* Stage progress — segmented, tappable */}
            <div className="mt-3 sm:mt-8 lg:mt-12">
              <ol className="grid grid-cols-5 gap-1.5" aria-label="Investigation stages">
                {stages.map((s, i) => {
                  const lit = i <= active;
                  const isActive = i === active;
                  return (
                    <li key={s.label}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        aria-current={isActive ? "step" : undefined}
                        aria-label={`${String(i + 1).padStart(2, "0")} ${s.label}`}
                        className="group flex min-h-11 w-full flex-col justify-center gap-2 text-left"
                      >
                        <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-forest/12">
                          <motion.span
                            className={cn(
                              "absolute inset-0 origin-left rounded-full",
                              i === total - 1 ? "bg-copper" : "bg-forest",
                            )}
                            initial={false}
                            animate={{ scaleX: lit ? 1 : 0 }}
                            transition={{ duration: 0.6, ease: motionEase }}
                          />
                        </span>
                        <span
                          className={cn(
                            "hidden truncate font-display text-[0.9375rem] transition-colors duration-300 md:block",
                            isActive ? "text-forest" : lit ? "text-forest/70" : "text-forest/45 group-hover:text-forest/70",
                          )}
                        >
                          {s.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Right: the live scene — a search, the clue it leaves, the evidence log */}
          <div ref={sceneRef} className="min-w-0 lg:col-span-7">
            {/* Search field */}
            <div className="relative flex min-h-12 items-center gap-4 border border-forest/15 bg-surface/85 px-4 sm:min-h-16 sm:px-5 shadow-[0_18px_40px_-28px_rgba(27,61,47,0.45)] md:min-h-[4.5rem] md:px-6">
              <span className="shrink-0 text-copper">
                <SearchIcon size={16} />
              </span>
              <p className="min-w-0 flex-1 truncate text-[1.0625rem] text-charcoal md:text-[1.1875rem]" aria-hidden>
                {shown}
                {!reduce && (
                  <motion.span
                    className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.18em] bg-copper"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                  />
                )}
              </p>
              <span className="hidden shrink-0 font-mono text-[0.75rem] tabular-nums text-forest/45 sm:block">
                {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>

            {/* The clue it leaves */}
            <div className="relative ml-5 border-l border-forest/15 pb-1 pl-6 pt-4 sm:pl-8 sm:pt-8 md:ml-6 md:pl-10 md:pt-10">
              <motion.span
                key={`thread-${active}`}
                className="absolute -left-px top-0 h-full w-[2px] origin-top bg-copper"
                initial={reduce ? false : { scaleY: 0 }}
                animate={{ scaleY: doneTyping ? 1 : 0 }}
                transition={{ duration: 0.6, ease: motionEase }}
                aria-hidden
              />
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-copper">
                Clue {String(active + 1).padStart(2, "0")}
              </p>
              <div className="relative mt-1 min-h-[4.75rem] overflow-hidden sm:mt-2 md:min-h-[6rem]" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  {doneTyping && (
                    <motion.div
                      key={stage.label}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.5, ease: motionEase }}
                    >
                      <p
                        className={cn(
                          "font-display text-[clamp(1.75rem,1.2rem+2.4vw,3.25rem)] leading-[1.02] tracking-[-0.015em]",
                          active === total - 1 ? "italic text-copper" : "text-forest",
                        )}
                      >
                        {stage.label}
                      </p>
                      <p className="mt-1 text-[0.9375rem] leading-[1.45] text-ink-soft sm:mt-2 sm:text-[1.0625rem] lg:text-[1.1875rem]">{stage.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Evidence log — the trail builds up */}
            <div className="mt-4 sm:mt-8 md:mt-10">
              <p className="type-eyebrow text-ink-soft">The trail</p>
              <ol className="mt-2 border-t border-forest/12 sm:mt-3">
                {SEARCH_QUERIES.map((q, i) => {
                  const logged = i < active || (i === active && doneTyping);
                  const isActive = i === active;
                  return (
                    <motion.li
                      key={q}
                      className="flex items-center gap-3 border-b border-forest/10 py-1.5 max-lg:[@media(max-height:760px)]:py-1 sm:py-2.5 md:gap-4 md:py-3"
                      initial={false}
                      animate={{ opacity: logged ? 1 : 0.28 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className={cn("shrink-0", logged ? "text-copper" : "text-forest/40")}>
                        <SearchIcon />
                      </span>
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate font-mono text-[0.75rem] md:text-[0.8125rem]",
                          isActive ? "text-charcoal" : "text-charcoal/70",
                        )}
                      >
                        {q}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 font-display text-[0.9375rem] transition-colors duration-300",
                          !logged
                            ? "text-transparent"
                            : i === total - 1
                              ? "italic text-copper"
                              : "text-forest",
                        )}
                      >
                        {stages[i]?.label}
                      </span>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
