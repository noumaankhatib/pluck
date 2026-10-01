"use client";

import { Fragment, type ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { intro } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { PinnedScene } from "@/components/motion/PinnedScene";
import { useBeat } from "@/components/motion/useBeat";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { cn } from "@/lib/cn";

/* ─── Sifting field: many leads → a few right customers ───────── */

const COLS = 15;
const ROWS = 9;
const GAP = 20;
/** The few that matter — scattered so they read as "found", not arranged. */
const CHOSEN = [19, 47, 71, 98, 122];
const DOTS = Array.from({ length: COLS * ROWS }, (_, i) => ({
  i,
  cx: 10 + (i % COLS) * GAP,
  cy: 10 + Math.floor(i / COLS) * GAP,
}));
const NOISE = DOTS.filter((d) => !CHOSEN.includes(d.i));

function NoiseGroup({
  band,
  sift,
  reduce,
}: {
  band: number;
  sift: MotionValue<number>;
  reduce: boolean | null;
}) {
  /* Three bands fade at slightly different moments so the field thins organically */
  const opacity = useTransform(sift, [band * 0.18, 0.55 + band * 0.18], [0.55, 0.08]);
  return (
    <motion.g style={{ opacity: reduce ? 0.07 : opacity }}>
      {NOISE.filter((d) => d.i % 3 === band).map((d) => (
        <circle key={d.i} cx={d.cx} cy={d.cy} r={2.2} fill="var(--color-sage-light)" />
      ))}
    </motion.g>
  );
}

function SiftingField({ sift, reduce }: { sift: MotionValue<number>; reduce: boolean | null }) {
  const chosenR = useTransform(sift, [0.35, 0.85], [2.2, 5.5]);
  const chosenFill = useTransform(sift, [0.3, 0.7], ["#b4c2b6", "#e5895a"]);
  const ringOpacity = useTransform(sift, [0.7, 0.95], [0, 1]);
  const beforeOpacity = useTransform(sift, [0.25, 0.5], [1, 0]);
  const afterOpacity = useTransform(sift, [0.55, 0.85], [0, 1]);

  return (
    <figure className="relative">
      <svg
        viewBox={`0 0 ${COLS * GAP} ${ROWS * GAP}`}
        className="w-full overflow-visible"
        aria-hidden
      >
        {[0, 1, 2].map((band) => (
          <NoiseGroup key={band} band={band} sift={sift} reduce={reduce} />
        ))}
        {DOTS.filter((d) => CHOSEN.includes(d.i)).map((d, k) => (
          <g key={d.i}>
            <motion.circle
              cx={d.cx}
              cy={d.cy}
              r={11}
              fill="none"
              stroke="#e5895a"
              strokeWidth={1}
              style={{ opacity: reduce ? 1 : ringOpacity }}
            />
            {!reduce && (
              <motion.g style={{ opacity: ringOpacity }}>
                <motion.circle
                  cx={d.cx}
                  cy={d.cy}
                  r={11}
                  fill="none"
                  stroke="#e5895a"
                  strokeWidth={1}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: k * 0.35 }}
                />
              </motion.g>
            )}
            <motion.circle
              cx={d.cx}
              cy={d.cy}
              r={reduce ? 5.5 : chosenR}
              fill={reduce ? "#e5895a" : chosenFill}
            />
          </g>
        ))}
      </svg>

      {/* Caption crossfades as the field sifts */}
      <figcaption className="mt-6 grid font-mono text-[0.75rem] uppercase tracking-[0.16em]">
        <motion.span
          className="col-start-1 row-start-1 text-sage-light"
          style={{ opacity: reduce ? 0 : beforeOpacity }}
        >
          Thousands of leads
        </motion.span>
        <motion.span
          className="col-start-1 row-start-1 flex items-center gap-3 text-copper-soft"
          style={{ opacity: reduce ? 1 : afterOpacity }}
        >
          <span className="h-px w-6 bg-copper-soft" aria-hidden />
          A few of the right customers
        </motion.span>
      </figcaption>
    </figure>
  );
}

/* ─── Inline emphasis: a phrase gets struck through or underlined as it's read ─── */

function markPhrase(
  text: string,
  phrase: string,
  render: (phrase: string) => ReactNode,
): ReactNode {
  const at = text.indexOf(phrase);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      {render(phrase)}
      {text.slice(at + phrase.length)}
    </>
  );
}

function Marked({
  children,
  variant,
  draw,
}: {
  children: ReactNode;
  variant: "strike" | "underline";
  /** 0 → 1: how much of the mark is drawn (driven by scroll). */
  draw: MotionValue<number>;
}) {
  const fade = useTransform(draw, [0.4, 1], [1, 0.5]);
  return (
    <span className="relative inline-block whitespace-nowrap">
      <motion.span className="inline-block" style={variant === "strike" ? { opacity: fade } : undefined}>
        {children}
      </motion.span>
      <motion.span
        className={
          variant === "strike"
            ? "absolute inset-x-[-2px] top-[55%] h-[2px] origin-left rounded-full bg-copper-soft"
            : "absolute inset-x-0 bottom-[-0.08em] h-[2px] origin-left rounded-full bg-copper-soft"
        }
        style={{ scaleX: draw }}
        aria-hidden
      />
    </span>
  );
}

/** One word of the payoff, rising through its own mask on cue. */
function PayoffWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.72 + (index / total) * 0.12;
  const y = useTransform(progress, [start, start + 0.08], ["105%", "0%"]);
  const isPayoff = index === total - 1;
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        className={isPayoff ? "text-copper-metal inline-block italic" : "inline-block"}
        style={{ y }}
      >
        {word}
      </motion.span>
    </span>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */

const METHOD = ["Examine", "Reach"] as const;

/**
 * The premise as one pinned screen, played in beats:
 * setup (strike) → pivot (underline) + the field sifts → the method →
 * the argument lifts away and the payoff takes the screen.
 */
function PremiseScene({ p, isStatic }: { p: MotionValue<number>; isStatic: boolean }) {
  const isDesktop = useIsDesktop();
  const [setup, pivot, ...method] = intro.sentences;
  const words = intro.anchor.split(" ");

  const label = useBeat(p, [0, 0.04]);
  const setupIn = useBeat(p, [0, 0.06]);
  const strike = useTransform(p, [0.06, 0.16], [0, 1]);
  const pivotIn = useBeat(p, [0.13, 0.22]);
  const underline = useTransform(p, [0.2, 0.3], [0, 1]);
  const sift = useTransform(p, [0.16, 0.56], [0, 1]);
  const m0 = useBeat(p, [0.42, 0.5]);
  const m1 = useBeat(p, [0.47, 0.55]);
  const methodIn = [m0, m1];

  /* On phones the method takes the field's place; on desktop they sit side by side */
  const fieldSwap = useTransform(p, [0.38, 0.44], [1, 0]);

  /* The argument steps back as the payoff arrives */
  const argOut = useTransform(p, [0.64, 0.72], [1, 0]);
  const argY = useTransform(p, [0.64, 0.72], [0, -40]);
  const fieldDim = useTransform(p, [0.64, 0.74], [1, 0.22]);
  const fieldScale = useTransform(p, [0.64, 0.74], [1, 0.92]);
  const rule = useTransform(p, [0.7, 0.8], [0, 1]);

  return (
    <Container className="relative h-full">
      {/* The argument + the field */}
      <motion.div
        className="relative flex h-full flex-col justify-center"
        style={isStatic ? undefined : { opacity: argOut, y: argY }}
      >
        <motion.div style={label}>
          <SectionLabel index={homeSections.intro.index} tone="dark" className="mb-5 lg:mb-10">
            {homeSections.intro.name}
          </SectionLabel>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.p
              className="text-[clamp(1.125rem,0.95rem+1vw,1.75rem)] leading-[1.42] text-ivory"
              style={setupIn}
            >
              {markPhrase(setup, "thousands of new leads", (ph) => (
                <Marked variant="strike" draw={strike}>
                  {ph}
                </Marked>
              ))}
            </motion.p>

            <motion.p
              className="text-copper-metal mt-4 font-display text-[clamp(1.75rem,1.1rem+3vw,3.75rem)] italic leading-[1.08] tracking-[-0.015em] lg:mt-8"
              style={pivotIn}
            >
              {markPhrase(pivot, "right customers", (ph) => (
                <Marked variant="underline" draw={underline}>
                  {ph}
                </Marked>
              ))}
            </motion.p>

            {/* Desktop: the method under the argument */}
            <ol className="mt-12 hidden gap-10 border-t border-sage-light/20 pt-8 lg:grid lg:grid-cols-2">
              {method.map((sentence, i) => (
                <MethodItem key={sentence} index={i} sentence={sentence} style={methodIn[i]} />
              ))}
            </ol>
          </div>

          {/* The field — and, on phones, the method in the same spot */}
          <div className="relative grid lg:col-span-4 lg:col-start-9 lg:self-center">
            <motion.div
              className="col-start-1 row-start-1 mx-auto w-full max-w-[22rem] lg:max-w-none"
              style={isStatic ? undefined : { opacity: isDesktop ? fieldDim : fieldSwap, scale: fieldScale }}
            >
              <SiftingField sift={sift} reduce={isStatic} />
            </motion.div>
            <ol
              className={cn(
                "grid content-start gap-5 border-t border-sage-light/20 pt-5 lg:hidden",
                isStatic ? "mt-8" : "col-start-1 row-start-1",
              )}
            >
              {method.map((sentence, i) => (
                <MethodItem key={sentence} index={i} sentence={sentence} style={methodIn[i]} />
              ))}
            </ol>
          </div>
        </div>
      </motion.div>

      {/* The payoff takes the screen */}
      <div
        className={cn(
          "pointer-events-none flex flex-col justify-center",
          isStatic ? "relative mt-16" : "absolute inset-0 px-[var(--gutter)]",
        )}
      >
        <motion.span
          className="mb-6 block h-px w-full max-w-[14rem] origin-left bg-copper/70 md:mb-8"
          style={{ scaleX: rule }}
          aria-hidden
        />
        <h2
          id="intro-heading"
          className="font-display max-w-[22ch] text-balance text-[clamp(2.5rem,1.3rem+5vw,5.75rem)] font-medium leading-[1.03] tracking-[-0.02em] text-ivory"
        >
          {words.map((word, i) => (
            <Fragment key={i}>
              <PayoffWord word={word} index={i} total={words.length} progress={p} />
              {i < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h2>
      </div>
    </Container>
  );
}

function MethodItem({
  index,
  sentence,
  style,
}: {
  index: number;
  sentence: string;
  style: { opacity: MotionValue<number>; y: MotionValue<number> };
}) {
  return (
    <motion.li style={style}>
      <p className="flex items-center gap-3 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-sage-light">
        <span className="tabular-nums text-copper-soft">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-6 bg-sage-light/40" aria-hidden />
        {METHOD[index] ?? ""}
      </p>
      <p className="mt-2 text-[0.9375rem] leading-[1.55] text-ivory/90 lg:mt-3 lg:text-base">{sentence}</p>
    </motion.li>
  );
}

export function IntroNarrativeSection() {
  return (
    <PinnedScene length={2.5} className="surface-espresso" stageClassName="items-stretch" labelledBy="intro-heading">
      {(p, _ref, isStatic) => <PremiseScene p={p} isStatic={isStatic} />}
    </PinnedScene>
  );
}
