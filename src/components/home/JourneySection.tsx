"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { journey } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Container } from "@/components/ui/Container";
import { homeSections } from "@/content/home-sections";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/cn";

const FIND_QUERIES = [
  "industrial cooling systems",
  "data centre cooling",
  "process cooling systems",
];

/* Ring geometry — four stages at 12, 3, 6 and 9 o'clock */
const R = 130;
const C = 160;
const NODE_ANGLES = [-90, 0, 90, 180];
const pointAt = (deg: number, r = R) => ({
  x: C + r * Math.cos((deg * Math.PI) / 180),
  y: C + r * Math.sin((deg * Math.PI) / 180),
});
/** Label placement outside the ring, per node (percent of the 320 box). */
const LABEL_POS = [
  "left-1/2 top-0 -translate-x-1/2 -translate-y-full",
  "left-full top-1/2 -translate-y-1/2 translate-x-3",
  "left-1/2 top-0 -translate-x-1/2 translate-y-[35%]",
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

/* ─── The loop (desktop, pinned beside the stages) ─────────────── */

function Loop({
  active,
  progress,
  reduce,
  onPick,
}: {
  active: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
  onPick: (index: number) => void;
}) {
  const stages = journey.stages;
  const angle = useTransform(progress, (p) => -90 + p * 360);
  const sparkX = useTransform(angle, (a) => pointAt(a).x);
  const sparkY = useTransform(angle, (a) => pointAt(a).y);

  return (
    <div className="relative mx-auto aspect-square w-[min(8.75rem,30svh)] sm:w-[min(12rem,30svh)] lg:w-[min(20rem,36svh)] xl:w-[min(22rem,40svh)]">
      <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--color-forest)" strokeOpacity={0.1} strokeWidth={2} />
        {/* The loop fills as you read, starting at 12 o'clock */}
        <motion.circle
          cx={C}
          cy={C}
          r={R}
          fill="none"
          stroke="var(--color-copper)"
          strokeWidth={2.5}
          strokeLinecap="round"
          transform={`rotate(-90 ${C} ${C})`}
          style={{ pathLength: reduce ? 1 : progress }}
        />
        {NODE_ANGLES.map((deg, i) => {
          const { x, y } = pointAt(deg);
          const lit = i <= active;
          const isActive = i === active;
          return (
            <g key={i}>
              {isActive && !reduce && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r={14}
                  fill="var(--color-copper)"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  initial={{ scale: 1, opacity: 0.35 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <motion.circle
                cx={x}
                cy={y}
                initial={false}
                animate={{
                  r: isActive ? 11 : 7,
                  fill: lit ? "#c45c26" : "#f7f4ef",
                  stroke: lit ? "#c45c26" : "rgba(27,61,47,0.3)",
                }}
                strokeWidth={2}
                transition={{ duration: 0.4, ease: motionEase }}
              />
            </g>
          );
        })}
        {!reduce && (
          <motion.circle
            r={5}
            cx={sparkX}
            cy={sparkY}
            fill="#f5c6a0"
            style={{ filter: "drop-shadow(0 0 6px rgba(196,92,38,0.8))" }}
          />
        )}
      </svg>

      {/* Stage names around the ring */}
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
                "absolute whitespace-nowrap px-1 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-500 hover:text-copper lg:text-[0.75rem] lg:tracking-[0.16em]",
                LABEL_POS[i],
                i === active ? "text-copper" : i < active ? "text-forest" : "text-forest/50",
              )}
            >
              {s.title}
            </button>
          </span>
        );
      })}

      {/* Centre: the active stage */}
      <div className="absolute inset-[22%] flex flex-col items-center justify-center text-center">
        <p className="font-mono text-[0.6875rem] tabular-nums text-forest/50 lg:text-[0.75rem]">
          <span className="text-copper">{stages[active].step}</span> / {String(stages.length).padStart(2, "0")}
        </p>
        <div className="relative mt-0.5 h-[1.75rem] w-full overflow-hidden lg:mt-1 lg:h-[3.25rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active}
              className="font-display text-[1.125rem] leading-[1.5] text-forest lg:text-[2.25rem] lg:leading-[1.3]"
              initial={reduce ? { opacity: 0 } : { y: "100%" }}
              animate={reduce ? { opacity: 1 } : { y: "0%" }}
              exit={reduce ? { opacity: 0 } : { y: "-100%" }}
              transition={{ duration: 0.5, ease: motionEase }}
            >
              {stages[active].title}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Stage content ───────────────────────────────────────────── */

function StageBody({ stage, index }: { stage: (typeof journey.stages)[0]; index: number }) {
  if (index === 2) {
    return (
      <ul className="mt-4 flex flex-wrap gap-2 lg:mt-6" aria-label="Reach channels">
        {stage.prompts.map((c) => (
          <li
            key={c}
            className="border border-copper/35 bg-surface/50 px-3.5 py-2 font-mono text-[0.8125rem] text-copper-hover"
          >
            {c}
          </li>
        ))}
      </ul>
    );
  }

  const learn = index === 3;
  return (
    <>
      <p className="type-eyebrow mt-4 text-ink-soft lg:mt-7">{learn ? "What we measure" : "What we ask"}</p>
      <ul className={cn("mt-2 lg:mt-3", learn ? "border-t border-forest/10" : "grid gap-1.5 lg:gap-2.5")} aria-label={`${stage.title} questions`}>
        {stage.prompts.map((p, i) => (
          <li
            key={p}
            className={cn(
              "flex items-start gap-3 text-[0.9375rem] leading-snug text-forest lg:text-[1.0625rem]",
              learn && "border-b border-forest/8 py-1 sm:py-1.5 lg:py-2.5",
            )}
          >
            {learn ? (
              <span className="mt-[3px] w-6 shrink-0 font-mono text-[0.75rem] tabular-nums text-copper">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : (
              <span className="mt-[0.55em] block h-1.5 w-1.5 shrink-0 rounded-full bg-copper/70" />
            )}
            {p}
          </li>
        ))}
      </ul>
      {index === 1 && (
        <div className="mt-6 hidden gap-2 md:grid md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3" aria-hidden>
          {FIND_QUERIES.map((q) => (
            <div key={q} className="flex min-w-0 items-center gap-2 border border-forest/10 bg-surface/60 px-3 py-2">
              <span className="shrink-0 text-copper">
                <SearchQueryIcon />
              </span>
              <span className="truncate font-mono text-[0.75rem] text-ink-soft">{q}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */

export function JourneySection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const stages = journey.stages;
  const total = stages.length;
  const [active, setActive] = useState(0);

  /* One screen, pinned: scrolling through the section walks the loop */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, [0.02, 0.96], [0, 1]);
  const closing = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(total - 1, Math.max(0, Math.floor(v * total))));
  });

  /** Jump to a stage by scrolling to the middle of its stretch. */
  const pick = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const run = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + run * ((i + 0.5) / total), behavior: reduce ? "auto" : "smooth" });
  };

  const stage = stages[active];

  return (
    <section
      ref={ref}
      className="relative h-[300svh] bg-ivory"
      aria-labelledby="journey-heading"
    >
      <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] items-start overflow-hidden pt-[clamp(0.75rem,4svh,3.5rem)] lg:items-center lg:pt-0">
        <Container>
          <div className="grid gap-5 sm:gap-7 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* Left: the chapter + the loop */}
            <div className="lg:col-span-5">
              <SectionLabel index={homeSections.journey.index} className="mb-3 lg:mb-5">
                {homeSections.journey.name}
              </SectionLabel>
              <h2
                id="journey-heading"
                className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.015em] text-forest"
              >
                Understand. Find.
                <br />
                Reach. <span className="italic text-copper">Learn.</span>
              </h2>
              <p className="type-lead mt-4 hidden max-w-[26rem] text-ink-soft lg:block">
                A connected journey from insight to opportunity.
              </p>

              {/* Padding reserves room for the stage names that sit outside the ring */}
              <div className="mt-6 pb-7 sm:mt-10 lg:mt-10 lg:pb-7">
                <Loop active={active} progress={progress} reduce={reduce} onPick={pick} />
              </div>
              <motion.p
                className="mt-4 hidden items-center justify-center gap-3 font-display text-[1.125rem] italic text-forest lg:flex"
                style={{ opacity: reduce ? 1 : closing }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0 text-copper" aria-hidden>
                  <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                …and back to {stages[0].title}, continuously.
              </motion.p>
            </div>

            {/* Right: the stage being walked — swaps in place */}
            <div className="relative min-w-0 lg:col-span-6 lg:col-start-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={stage.step}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: motionEase }}
                  aria-live="polite"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[0.8125rem] tracking-[0.2em] text-copper">
                      {stage.step} <span className="text-forest/40">/ {String(total).padStart(2, "0")}</span>
                    </span>
                    <span className="h-px w-10 bg-forest/15" aria-hidden />
                  </div>
                  <h3
                    className={cn(
                      "mt-2 font-display text-[clamp(2rem,1.3rem+3vw,3.75rem)] leading-[1.02] tracking-[-0.02em] lg:mt-4",
                      active === total - 1 ? "italic text-copper" : "text-forest",
                    )}
                  >
                    {stage.title}
                  </h3>
                  <p className="mt-2 max-w-[34rem] text-[1rem] leading-[1.5] text-ink-soft lg:mt-4 lg:text-[1.1875rem]">
                    {stage.body}
                  </p>
                  <StageBody stage={stage} index={active} />
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
