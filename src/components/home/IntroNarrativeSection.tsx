"use client";

import { Fragment, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { intro } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { motionEase } from "@/lib/motion";

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
  const opacity = useTransform(sift, [band * 0.18, 0.55 + band * 0.18], [0.4, 0.07]);
  return (
    <motion.g style={{ opacity: reduce ? 0.07 : opacity }}>
      {NOISE.filter((d) => d.i % 3 === band).map((d) => (
        <circle key={d.i} cx={d.cx} cy={d.cy} r={2.2} fill="var(--color-ivory)" />
      ))}
    </motion.g>
  );
}

function SiftingField({ sift, reduce }: { sift: MotionValue<number>; reduce: boolean | null }) {
  const chosenR = useTransform(sift, [0.35, 0.85], [2.2, 5.5]);
  const chosenFill = useTransform(sift, [0.3, 0.7], ["#f7f4ef", "#e5895a"]);
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
          className="col-start-1 row-start-1 text-ivory/70"
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
  reduce,
  delay = 0.5,
}: {
  children: ReactNode;
  variant: "strike" | "underline";
  reduce: boolean | null;
  delay?: number;
}) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <motion.span
        className="inline-block"
        initial={false}
        whileInView={variant === "strike" ? { opacity: 0.55 } : undefined}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      >
        {children}
      </motion.span>
      <motion.span
        className={
          variant === "strike"
            ? "absolute inset-x-[-2px] top-[55%] h-[2px] origin-left rounded-full bg-copper-soft"
            : "absolute inset-x-0 bottom-[-0.08em] h-[2px] origin-left rounded-full bg-copper-soft"
        }
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.7, ease: motionEase, delay }}
        aria-hidden
      />
    </span>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */

const METHOD = ["Examine", "Reach"] as const;

export function IntroNarrativeSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.65"],
  });
  const sift = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [setup, pivot, ...method] = intro.sentences;
  const anchorWords = intro.anchor.split(" ");

  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { duration: 0.6, ease: motionEase, delay: reduce ? 0 : i * 0.12 },
  });

  return (
    <section
      ref={ref}
      className="surface-ink relative overflow-hidden py-[var(--section-space-loose)]"
      aria-labelledby="intro-heading"
    >

      <Container className="relative">
        <SectionLabel index={homeSections.intro.index} tone="dark" className="mb-10 md:mb-14">
          {homeSections.intro.name}
        </SectionLabel>

        <div className="grid gap-12 md:gap-14 lg:grid-cols-12 lg:gap-10">
          {/* The argument */}
          <div className="lg:col-span-7">
            <motion.p
              className="text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-[1.45] text-ivory/90"
              {...rise(0)}
            >
              {markPhrase(setup, "thousands of new leads", (p) => (
                <Marked variant="strike" reduce={reduce}>
                  {p}
                </Marked>
              ))}
            </motion.p>

            <motion.p
              className="type-display-l text-copper-metal mt-6 !font-normal italic md:mt-8"
              {...rise(1)}
            >
              {markPhrase(pivot, "right customers", (p) => (
                <Marked variant="underline" reduce={reduce} delay={0.8}>
                  {p}
                </Marked>
              ))}
            </motion.p>

            {/* How — the method as two numbered moves */}
            <ol className="mt-10 grid gap-8 border-t border-ivory/12 pt-8 sm:grid-cols-2 sm:gap-10 md:mt-14">
              {method.map((sentence, i) => (
                <motion.li key={sentence} {...rise(i + 2)}>
                  <p className="flex items-center gap-3 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-copper-soft">
                    <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-6 bg-ivory/25" aria-hidden />
                    {METHOD[i] ?? ""}
                  </p>
                  <p className="type-body mt-3 text-ivory/85">{sentence}</p>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* The picture of it */}
          <motion.div
            className="mx-auto w-full max-w-[26rem] lg:col-span-4 lg:col-start-9 lg:mx-0 lg:max-w-none lg:self-center"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8 }}
          >
            <SiftingField sift={sift} reduce={reduce} />
          </motion.div>
        </div>

        {/* The payoff — words rise into place */}
        <div className="mt-16 border-t border-copper/60 pt-8 md:mt-20 md:pt-10">
          <h2
            id="intro-heading"
            className="font-display max-w-[22ch] text-balance text-[clamp(2.25rem,1.2rem+4.4vw,5rem)] font-medium leading-[1.04] tracking-[-0.02em] text-ivory"
          >
            {anchorWords.map((word, i) => {
              const isPayoff = i === anchorWords.length - 1;
              return (
                <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className={isPayoff ? "text-copper-metal inline-block italic" : "inline-block"}
                    initial={reduce ? false : { y: "105%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.7, ease: motionEase, delay: reduce ? 0 : i * 0.07 }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < anchorWords.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </h2>
        </div>
      </Container>
    </section>
  );
}
