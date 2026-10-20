"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { journey } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Container } from "@/components/ui/Container";
import { homeSections } from "@/content/home-sections";
import { Button } from "@/components/ui/Button";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useJourneyActiveStep } from "@/components/home/useJourneyActiveStep";
import { useJourneyChapterAnimation } from "@/components/home/useJourneyChapterAnimation";

const FIND_QUERIES = [
  "industrial cooling systems",
  "data centre cooling",
  "process cooling systems",
];

const STAGE_COLORS = ["#7a8b7e", "#4f7a66", "#1b3d2f", "#e5895a"] as const;
const STAGE_COPPER = "#bd6c36";

const R = 118;
const C = 160;
const RING_C = 2 * Math.PI * R;
const NODE_ANGLES = [-90, 0, 90, 180];
const pointAt = (deg: number, r = R) => ({
  x: C + r * Math.cos((deg * Math.PI) / 180),
  y: C + r * Math.sin((deg * Math.PI) / 180),
});

const LABEL_POS = [
  "left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+0.5rem)]",
  "left-full top-1/2 -translate-y-1/2 translate-x-3",
  "left-1/2 top-full -translate-x-1/2 translate-y-3",
  "right-full top-1/2 -translate-y-1/2 -translate-x-3",
];

function SearchQueryIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <circle cx="4" cy="4" r="2.75" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 6.5 9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function lit(i: number, active: number) {
  return i <= active;
}

function Loop({
  active,
  reduce,
  onPick,
}: {
  active: number;
  reduce: boolean | null;
  onPick: (index: number) => void;
}) {
  const stages = journey.stages;
  const total = stages.length;
  const ringProgress = Math.min(1, (active + 1) / total);
  const sparkDeg = -90 + ((active + 0.5) / total) * 360;
  const spark = pointAt(sparkDeg);

  return (
    <div className="journey-chapter__loop-shell relative mx-auto w-full max-w-[19rem] px-5 py-9 sm:px-6 sm:py-10">
      <div
        className="relative mx-auto aspect-square w-full max-w-[15.5rem] sm:max-w-[16.5rem]"
        data-journey-loop
      >
        <svg
          viewBox="0 0 320 320"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
        >
          <circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="var(--color-forest)"
            strokeOpacity={0.14}
            strokeWidth={2}
          />
          <motion.circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="url(#journey-copper-gradient)"
            strokeWidth={2.75}
            strokeLinecap="round"
            strokeDasharray={RING_C}
            transform={`rotate(-90 ${C} ${C})`}
            initial={false}
            animate={{
              strokeDashoffset: reduce ? 0 : RING_C * (1 - ringProgress),
            }}
            transition={{ duration: reduce ? 0 : 0.5, ease: motionEase }}
          />
          <defs>
            <linearGradient id="journey-copper-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7a8b7e" />
              <stop offset="45%" stopColor="#4f7a66" />
              <stop offset="100%" stopColor="#e5895a" />
            </linearGradient>
          </defs>
          {NODE_ANGLES.map((deg, i) => {
            const { x, y } = pointAt(deg);
            const isLit = lit(i, active);
            const isActive = i === active;
            const color = STAGE_COLORS[i];
            return (
              <g key={i}>
                {isActive && !reduce && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={14}
                    fill={STAGE_COPPER}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    initial={{ scale: 1, opacity: 0.25 }}
                    animate={{ scale: 1.9, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <motion.circle
                  cx={x}
                  cy={y}
                  initial={false}
                  animate={{
                    r: isActive ? 11 : isLit ? 8 : 7,
                    fill: isActive ? STAGE_COPPER : isLit ? color : "#f0ede4",
                    stroke: isActive ? STAGE_COPPER : isLit ? color : "rgba(27,61,47,0.28)",
                  }}
                  strokeWidth={2}
                  transition={{ duration: 0.45, ease: motionEase, delay: isActive ? 0 : i * 0.04 }}
                />
              </g>
            );
          })}
          {!reduce && (
            <motion.circle
              r={5}
              fill="#e5895a"
              initial={false}
              animate={{ cx: spark.x, cy: spark.y }}
              transition={{ duration: 0.55, ease: motionEase }}
              style={{ filter: "drop-shadow(0 0 4px rgba(189,108,54,0.4))" }}
            />
          )}
        </svg>

        {stages.map((s, i) => {
          const { x, y } = pointAt(NODE_ANGLES[i]);
          return (
            <span
              key={s.step}
              className="absolute h-0 w-0"
              style={{ left: `${(x / 320) * 100}%`, top: `${(y / 320) * 100}%` }}
            >
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-current={i === active ? "step" : undefined}
                className={cn(
                  "absolute max-w-[5.5rem] whitespace-nowrap px-1 py-1 text-center font-mono text-[0.625rem] uppercase leading-tight tracking-[0.12em] transition-colors duration-300 hover:text-copper sm:max-w-[6.5rem] sm:text-[0.6875rem] lg:text-[0.75rem]",
                  LABEL_POS[i],
                  i === active
                    ? "font-semibold text-copper"
                    : lit(i, active)
                      ? "text-forest"
                      : "text-forest/62",
                )}
              >
                {s.title}
              </button>
            </span>
          );
        })}

        <div className="absolute inset-[28%] flex flex-col items-center justify-center text-center">
          <p
            key={`step-${active}`}
            className="font-mono text-[0.6875rem] tabular-nums text-forest/55 lg:text-[0.75rem]"
          >
            <span className="text-copper">{stages[active].step}</span> /{" "}
            {String(stages.length).padStart(2, "0")}
          </p>
          <p
            key={`title-${active}`}
            className="mt-1 font-display text-[1.05rem] leading-[1.3] text-forest sm:text-[1.15rem] lg:text-[1.45rem]"
          >
            {stages[active].title}
          </p>
        </div>
      </div>
    </div>
  );
}

function StageBody({ stage, index }: { stage: (typeof journey.stages)[0]; index: number }) {
  if (index === 2) {
    return (
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Reach channels">
        {stage.prompts.map((c) => (
          <li
            key={c}
            className="border border-copper/35 bg-ivory/80 px-3 py-1.5 font-mono text-[0.8125rem] text-forest"
          >
            {c}
          </li>
        ))}
      </ul>
    );
  }

  const learn = index === 3;
  const outro = "outro" in stage ? stage.outro : undefined;
  return (
    <>
      <ul
        className={cn("mt-4", learn ? "border-t border-forest/10" : "grid gap-2.5")}
        aria-label={`${stage.title} questions`}
      >
        {stage.prompts.map((p, i) => (
          <li
            key={p}
            className={cn(
              "flex items-start gap-2.5 text-[0.9375rem] leading-[1.52] text-charcoal lg:text-[1.0625rem]",
              learn && "border-b border-forest/8 py-2 lg:py-2.5",
            )}
          >
            {learn ? (
              <span className="mt-0.5 w-6 shrink-0 font-mono text-[0.75rem] tabular-nums text-copper">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : (
              <span className="mt-[0.55em] block h-1.5 w-1.5 shrink-0 rounded-full bg-copper/75" />
            )}
            {p}
          </li>
        ))}
      </ul>
      {outro ? (
        <p className="mt-4 text-[0.9375rem] leading-[1.58] text-charcoal/90 lg:text-[1.0625rem]">
          {outro}
        </p>
      ) : null}
      {index === 1 && (
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {FIND_QUERIES.map((q) => (
            <div
              key={q}
              className="flex min-w-0 items-center gap-2 border border-forest/12 bg-paper/80 px-3 py-2"
            >
              <span className="shrink-0 text-copper">
                <SearchQueryIcon />
              </span>
              <span className="font-mono text-[0.75rem] leading-snug text-charcoal/85">{q}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function ActiveStagePanel({
  index,
  total,
}: {
  index: number;
  total: number;
}) {
  const stage = journey.stages[index];
  const reduce = useReducedMotion();

  return (
    <motion.article
      data-journey-panel-inner
      id={`journey-stage-${index}`}
      className="journey-chapter__stage overflow-visible rounded-sm border border-copper/45 bg-paper/95 p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.55),0_12px_36px_-28px_rgb(27_61_47/0.2)] sm:p-6"
      aria-labelledby={`journey-stage-title-${index}`}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: motionEase }}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.75rem] tracking-[0.16em] text-copper">
          {stage.step}
          <span className="text-forest/40"> / {String(total).padStart(2, "0")}</span>
        </span>
        <span className="h-px max-w-14 flex-1 bg-forest/12" aria-hidden />
      </div>

      <h3
        id={`journey-stage-title-${index}`}
        className={cn(
          "mt-2 font-display text-[clamp(1.55rem,1.1rem+1.8vw,2.35rem)] leading-[1.08] tracking-[-0.02em]",
          index === total - 1 ? "italic text-copper" : "text-forest",
        )}
      >
        <span className="text-forest/42">{index + 1}.</span> {stage.title}
      </h3>

      <p className="mt-3 text-[1rem] leading-[1.58] text-charcoal sm:text-[1.0625rem]">{stage.body}</p>

      <div className="journey-chapter__detail-body mt-4 overflow-visible border-l-2 border-copper/35 pl-4 sm:pl-5">
        <StageBody stage={stage} index={index} />
      </div>
    </motion.article>
  );
}

export function JourneySection() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const stages = journey.stages;
  const total = stages.length;

  const { active, pick } = useJourneyActiveStep(ref, trackRef, total, !!reduce);

  useJourneyChapterAnimation(ref, !!reduce);

  return (
    <section
      ref={ref}
      id="journey"
      className="journey-chapter accent-copper relative scroll-mt-[var(--header-h)] overflow-visible bg-ivory text-forest"
      aria-labelledby="journey-heading"
    >
      <div
        ref={trackRef}
        className="journey-chapter__track relative py-[clamp(2.25rem,1.65rem+2.5vw,4.5rem)] md:py-[clamp(2.75rem,2rem+3vw,5rem)] min-h-[min(200vh,1700px)]"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/10 to-transparent"
          aria-hidden
        />
        <Container
          className="journey-chapter__container relative overflow-visible lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:z-[1]"
        >
          <div className="mb-6 lg:mb-8">
            <div data-journey-label>
              <SectionLabel className="mb-2">
                {homeSections.journey.name}
              </SectionLabel>
            </div>
            <h2
              id="journey-heading"
              data-journey-headline
              className="max-w-[28rem] font-display text-balance text-[clamp(1.65rem,1.05rem+2.2vw,2.9rem)] font-medium leading-[1.1] tracking-[-0.02em] text-forest lg:max-w-none"
            >
              {journey.title}
            </h2>
          </div>

          <div className="journey-chapter__grid grid items-start gap-8 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
            <div data-journey-enter className="flex min-w-0 flex-col lg:col-span-5 lg:self-start">
              <Loop active={active} reduce={reduce} onPick={pick} />
              <p
                className="journey-chapter__closing mx-auto mt-2 max-w-[16rem] px-2 text-center font-display text-[0.9375rem] italic leading-snug text-forest/82 sm:mt-4 sm:max-w-[18rem] sm:text-[1rem] lg:mt-6 lg:text-[1.0625rem]"
              >
                <span className="inline-flex items-center justify-center gap-2.5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0 text-copper"
                    aria-hidden
                  >
                    <path
                      d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  …and back to {stages[0].title}, continuously.
                </span>
              </p>
            </div>

            <div
              data-journey-panel
              className="flex min-w-0 flex-col gap-5 sm:gap-6 lg:col-span-7 lg:col-start-6"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait" initial={false}>
                <ActiveStagePanel key={active} index={active} total={total} />
              </AnimatePresence>

              <div className="journey-chapter__cta rounded-sm border border-forest/10 bg-paper/90 px-5 py-5 sm:px-6">
                <Button href={journey.ctaHref}>{journey.cta}</Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
