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
import { cn } from "@/lib/cn";
import { homeSections } from "@/content/home-sections";
import { motionEase } from "@/lib/motion";
import { useSearchChapterAnimation } from "@/components/home/useSearchChapterAnimation";

/** One real query per stage — each search is the clue that reveals it. */
const SEARCH_QUERIES = [
  "industrial cooling systems",
  "data centre cooling",
  "industrial cooling system manufacturers",
  "industrial cooling solutions for data centres",
  "how much does industrial cooling cost",
];

const TYPE_MS = 34;
const TYPE_MS_SPACE = 44;
const HOLD_MS = 2600;

const STAGE_COLORS = [
  "#a7b49d",
  "#545c3b",
  "#123d32",
  "#e69a61",
  "#b65320",
] as const;

const STAGE_COPPER = "#e69a61";

function typingDelay(char: string, manualStage: boolean) {
  const base = manualStage ? 22 : TYPE_MS;
  const space = manualStage ? 30 : TYPE_MS_SPACE;
  if (char === " ") return space;
  if (char === "." || char === ",") return base + 12;
  return base;
}

function SearchIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none" aria-hidden>
      <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 8 10.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIntelligenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useSearchChapterAnimation(sectionRef, !!reduce);

  const sectionInView = useInView(sectionRef, { amount: 0.18, once: true });
  const runSequence = reduce || sectionInView;

  const stages = searchIntelligence.stages;
  const total = stages.length;

  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [manualStage, setManualStage] = useState(false);

  const active = reduce ? total - 1 : step;

  const query = SEARCH_QUERIES[active] ?? "";
  const doneTyping = reduce || typed >= query.length;

  // 0 → first node centre, 1 → last node centre
  const stageProgress = Math.min(
    1,
    Math.max(0, (active - (doneTyping ? 0 : 0.55)) / (total - 1)),
  );
  // trail pulse sits on the centre of the active row
  const trailPulse = ((active + 0.5) / total) * 100;

  useEffect(() => {
    if (!runSequence || reduce) return;
    if (!doneTyping) {
      const id = window.setTimeout(
        () => setTyped((t) => Math.min(t + 1, query.length)),
        typed === 0 ? 320 : typingDelay(query[typed] ?? "", manualStage),
      );
      return () => window.clearTimeout(id);
    }
    if (active === total - 1) return;
    const id = window.setTimeout(() => {
      setManualStage(false);
      setTyped(0);
      setStep((s) => Math.min(s + 1, total - 1));
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [runSequence, reduce, doneTyping, typed, active, total, query, manualStage]);

  const jumpTo = (index: number) => {
    setManualStage(true);
    setTyped(0);
    setStep(index);
  };

  const headWords = searchIntelligence.headline.split(" ");
  const headLast = headWords.pop();

  const stage = stages[active];
  const shown = reduce ? query : query.slice(0, typed);
  const storyBeat = `${active}-${doneTyping ? "done" : "type"}`;

  return (
    <section
      ref={sectionRef}
      id="search"
      className="search-chapter accent-copper relative scroll-mt-[var(--header-h)] overflow-x-clip bg-paper py-[clamp(2.25rem,1.65rem+2.2vw,4.25rem)] text-forest md:py-[clamp(2.65rem,2rem+2.5vw,4.75rem)]"
      aria-labelledby="search-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/10 to-transparent"
        aria-hidden
      />
      <Container className="search-chapter__container relative overflow-visible">
        <div
          className="search-chapter__grid grid items-start gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-10"
        >
          <div className="search-chapter__copy flex min-w-0 flex-col overflow-visible lg:col-span-5 lg:pr-2">
            <div data-search-label>
              <SectionLabel className="mb-2">
                {homeSections.search.name}
              </SectionLabel>
            </div>

            <h2
              id="search-heading"
              data-search-headline
              className="font-display text-balance text-[clamp(1.65rem,1.05rem+2.15vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.02em] text-forest"
            >
              {headWords.join(" ")}{" "}
              <span className="italic text-copper">{headLast}</span>
            </h2>



            <p
              data-search-lead
              className="search-chapter__clue mt-3 font-display text-[clamp(1.1rem,0.95rem+0.6vw,1.45rem)] italic leading-[1.3] text-copper"
            >
              {searchIntelligence.clue}
            </p>

            <div className="search-chapter__rail mt-4 w-full" data-search-rail>
              <div
                className="search-chapter__rail-grid relative w-full border-y border-forest/10 py-3.5 sm:py-4"
              >
                <div
                  className="pointer-events-none absolute left-[10%] right-[10%] top-[0.6rem] h-px bg-forest/16"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute left-[10%] right-[10%] top-[0.52rem] h-[2px]"
                  aria-hidden
                >
                  <motion.div
                    className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#a7b49d] via-[#e69a61] to-[#b65320]"
                    initial={false}
                    animate={{ scaleX: reduce ? 1 : stageProgress }}
                    transition={{ duration: 0.7, ease: motionEase }}
                  />
                  {!reduce && (
                    <motion.span
                      className="absolute top-1/2 h-1.5 w-6 -translate-x-full -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent to-[#e69a61] blur-[1px]"
                      initial={false}
                      animate={{ left: `${stageProgress * 100}%`, opacity: doneTyping ? 0.35 : 0.95 }}
                      transition={{ duration: 0.7, ease: motionEase }}
                    />
                  )}
                </div>
                <ol
                  className="relative grid grid-cols-5 gap-0.5 sm:gap-1"
                  aria-label="Investigation stages"
                >
                  {stages.map((s, i) => {
                    const lit = i <= active;
                    const isActive = i === active;
                    const color = STAGE_COLORS[i];
                    return (
                      <li key={s.label} className="min-w-0">
                        <button
                          type="button"
                          onClick={() => jumpTo(i)}
                          aria-current={isActive ? "step" : undefined}
                          aria-label={`${String(i + 1).padStart(2, "0")} ${s.label}`}
                          className={cn(
                            "group flex w-full flex-col items-center justify-center gap-1.5 rounded-sm px-0.5 py-1 text-center transition-colors duration-300",
                            isActive && "bg-[#a7b49d]/25",
                          )}
                        >
                          <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                            {isActive && (
                              <motion.span
                                className="absolute -inset-1 rounded-full border border-[#e69a61]/60"
                                layoutId={reduce ? undefined : "search-stage-ring"}
                                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                                aria-hidden
                              />
                            )}
                            <motion.span
                              className="relative z-[1] block shrink-0 rounded-full border-2"
                              initial={false}
                              animate={{
                                width: isActive ? 11 : 7,
                                height: isActive ? 11 : 7,
                                boxShadow: isActive
                                  ? "0 0 0 4px rgb(230 154 97 / 0.2), 0 0 12px 2px rgb(230 154 97 / 0.55)"
                                  : "0 0 0 0 rgb(230 154 97 / 0)",
                                backgroundColor: isActive
                                  ? STAGE_COPPER
                                  : lit
                                    ? color
                                    : "#e5e9dd",
                                borderColor: isActive
                                  ? STAGE_COPPER
                                  : lit
                                    ? color
                                    : "rgb(0 60 50 / 0.22)",
                              }}
                              transition={{ duration: 0.38, ease: motionEase }}
                              aria-hidden
                            />
                          </span>
                          <span
                            className={cn(
                              "w-full px-0.5 text-center font-display text-[0.6875rem] leading-snug sm:text-[0.78rem] md:text-[0.84rem]",
                              !lit && "text-forest/62 group-hover:text-forest/75",
                            )}
                          >
                            <span
                              className={cn(
                                "inline-block max-w-full border-b-2 border-transparent pb-px",
                                isActive && "border-[#e69a61] font-medium text-forest",
                                lit && !isActive && "text-forest/88",
                              )}
                            >
                              {s.label}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <details className="search-chapter__details group mt-4 max-w-[36rem] sm:mt-4">
              <summary
                className="flex min-h-9 cursor-pointer list-none items-center gap-2 rounded-sm py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-forest transition-colors duration-300 hover:text-copper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper/70 [&::-webkit-details-marker]:hidden sm:text-[0.75rem]"
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
                className="search-chapter__detail-body mt-3 space-y-3.5 border-l-2 border-copper/35 pl-4 sm:space-y-4 sm:pl-5"
              >
                {searchIntelligence.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-pretty text-[0.9375rem] leading-[1.62] text-ink-soft sm:text-base lg:text-[1.0625rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </details>
          </div>

          <div
            ref={sceneRef}
            data-search-scene
            className="search-chapter__scene min-w-0 lg:col-span-7 lg:col-start-6"
          >
            <div
              data-search-board
              className="search-chapter__board relative overflow-visible rounded-2xl border border-forest/12 bg-ivory/85 p-3.5 shadow-[0_24px_50px_-26px_rgb(18_61_50/0.35),0_0_60px_-20px_rgb(230_154_97/0.35)] sm:p-4"
            >
              <div
                className="search-chapter__search-bar flex gap-3 rounded-xl border border-copper/45 bg-paper shadow-[0_0_0_3px_rgb(230_154_97/0.12),0_0_22px_rgb(230_154_97/0.18)] px-3.5 py-2.5 sm:px-4 sm:py-3"
              >
                <span className="mt-1 shrink-0 text-copper sm:mt-0.5">
                  <SearchIcon size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="font-display text-[1rem] leading-[1.45] text-charcoal sm:text-[1.0625rem]"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {shown}
                    {!reduce && runSequence && (
                      <motion.span
                        className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.1em] bg-copper"
                        animate={{ opacity: [1, 1, 0, 0] }}
                        transition={{ duration: 0.95, repeat: Infinity, times: [0, 0.45, 0.45, 1] }}
                        aria-hidden
                      />
                    )}
                  </p>
                </div>
                <span className="shrink-0 self-start pt-0.5 font-mono text-[0.6875rem] tabular-nums text-forest/58 sm:self-center sm:pt-0 sm:text-[0.75rem]">
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <div className="search-chapter__clue relative mt-3 overflow-visible pl-4 sm:pl-5">
                <div
                  className="absolute bottom-0 left-0 top-0 w-px bg-forest/14"
                  aria-hidden
                />
                <motion.div
                  className="absolute bottom-0 left-0 top-0 w-[2px] origin-top bg-copper/80"
                  initial={false}
                  animate={{ scaleY: reduce ? 1 : doneTyping ? 1 : 0.3 }}
                  transition={{ duration: 0.45, ease: motionEase }}
                  aria-hidden
                />
                {!reduce && runSequence && (
                  <motion.span
                    key={`clue-pulse-${active}`}
                    className="pointer-events-none absolute -left-px w-[3px] rounded-full bg-gradient-to-b from-transparent via-[#e69a61] to-transparent"
                    style={{ height: "28%" }}
                    initial={{ top: "-28%", opacity: 0 }}
                    animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.1, ease: motionEase }}
                    aria-hidden
                  />
                )}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={storyBeat}
                    className="relative pl-3 sm:pl-4"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.36, ease: motionEase }}
                  >
                    <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-copper sm:text-[0.75rem]">
                      Clue {String(active + 1).padStart(2, "0")}
                    </p>
                    <div className="search-chapter__clue-body mt-1.5 overflow-visible">
                      {doneTyping ? (
                        <motion.div
                          key={`reveal-${active}-${stage.label}`}
                          initial={reduce ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.34, ease: motionEase }}
                        >
                          <p
                            className={cn(
                              "font-display text-[clamp(1.4rem,1.02rem+1.5vw,2.25rem)] leading-[1.08] tracking-[-0.015em]",
                              active === total - 1 ? "italic text-copper" : "text-forest",
                            )}
                          >
                            {stage.label}
                          </p>
                          <p className="mt-1.5 text-[0.9375rem] leading-[1.52] text-charcoal/88 sm:text-[1.02rem]">
                            {stage.description}
                          </p>
                        </motion.div>
                      ) : (
                        <p className="sr-only">
                          {stage.label}: {stage.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 border-t border-forest/10 pt-3.5 sm:mt-4 sm:pt-4">
                <p className="type-eyebrow text-forest/65">The trail</p>
                <div className="search-chapter__trail-wrap relative mt-2.5 pl-3 sm:pl-3.5">
                  <div
                    className="pointer-events-none absolute bottom-1 left-0 top-1 w-px bg-forest/14"
                    aria-hidden
                  />
                  <motion.div
                    className="pointer-events-none absolute left-0 top-1 w-[2px] origin-top rounded-full bg-gradient-to-b from-[#a7b49d] via-[#e69a61] to-[#b65320]"
                    initial={false}
                    animate={{ scaleY: reduce ? 1 : stageProgress }}
                    transition={{ duration: 0.48, ease: motionEase }}
                    style={{ height: "calc(100% - 0.5rem)" }}
                    aria-hidden
                  />
                  {!reduce && runSequence && (
                    <motion.span
                      className="pointer-events-none absolute -left-[1px] z-[1] h-8 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#e69a61] to-transparent"
                      initial={false}
                      animate={{ top: `${trailPulse}%`, opacity: doneTyping ? 1 : 0.5 }}
                      transition={{ duration: 0.7, ease: motionEase }}
                      aria-hidden
                    />
                  )}
                  <ol className="search-chapter__trail relative">
                    {SEARCH_QUERIES.map((q, i) => {
                      const logged = i < active || (i === active && doneTyping);
                      const isActive = i === active;
                      const upcoming = !logged;
                      const stageColor = STAGE_COLORS[i];
                      return (
                        <motion.li
                          key={q}
                          className={cn(
                            "search-chapter__trail-row relative flex flex-col gap-1 border-b border-forest/10 py-2.5 sm:flex-row sm:items-center sm:gap-3 sm:py-2.5",
                            isActive && logged && "search-chapter__trail-row--active",
                          )}
                          initial={
                            reduce || i < active
                              ? false
                              : { opacity: 0.78, y: 5 }
                          }
                          animate={{
                            opacity: upcoming ? 0.76 : 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.38,
                            delay: logged && i === active ? 0.05 : logged ? i * 0.04 : 0,
                            ease: motionEase,
                          }}
                        >
                          <motion.span
                            className="absolute -left-3 top-3 h-1.5 w-1.5 rounded-full sm:top-1/2 sm:-translate-y-1/2"
                            initial={false}
                            animate={{
                              scale: logged ? 1 : 0.75,
                              backgroundColor: logged ? stageColor : "#cdd5c3",
                              boxShadow:
                                isActive && logged
                                  ? "0 0 0 3px rgb(230 154 97 / 0.25), 0 0 10px 2px rgb(230 154 97 / 0.55)"
                                  : "0 0 0 0 rgb(230 154 97 / 0)",
                            }}
                            transition={{ duration: 0.32 }}
                            aria-hidden
                          />
                          <div className="flex min-w-0 flex-1 items-start gap-2 sm:items-center">
                            <span
                              className={cn(
                                "shrink-0 pt-0.5 sm:pt-0",
                                "transition-[color,transform] duration-300",
                                logged ? "text-copper" : "text-forest/50",
                                isActive && logged && "scale-110",
                              )}
                            >
                              <SearchIcon />
                            </span>
                            <span
                              className={cn(
                                "min-w-0 flex-1 break-words font-mono text-[0.75rem] leading-snug sm:text-[0.8125rem]",
                                isActive && logged
                                  ? "font-medium text-charcoal"
                                  : logged
                                    ? "text-charcoal/90"
                                    : "text-charcoal/70",
                              )}
                            >
                              {q}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "pl-6 font-display text-[0.8125rem] leading-snug sm:shrink-0 sm:pl-0 sm:text-right sm:text-[0.875rem]",
                              upcoming
                                ? "text-forest/58"
                                : i === total - 1 && logged
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
          </div>
        </div>
      </Container>
    </section>
  );
}
