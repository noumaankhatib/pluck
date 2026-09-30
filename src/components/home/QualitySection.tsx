"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { quality } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/cn";

/* ─── Layout helpers ──────────────────────────────────────────── */

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeDesktop(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** Desktop pins the scene and scrubs it with scroll; smaller screens let it play. */
function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

/** Loose cloud positions for the volume words — scattered, like noise. */
const CLOUD = [
  { left: "2%", top: "14%", rest: "74%", rotate: -3 },
  { left: "36%", top: "0%", rest: "78%", rotate: 2 },
  { left: "70%", top: "22%", rest: "72%", rotate: -2 },
  { left: "14%", top: "56%", rest: "80%", rotate: 3 },
  { left: "54%", top: "60%", rest: "76%", rotate: -4 },
];

/* ─── Scene pieces ────────────────────────────────────────────── */

/** A volume word drifts down onto the filter, blurs and is held back there. */
function NoiseWord({
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
  const start = 0.04 + (index / total) * 0.3;
  const end = start + 0.26;
  const pos = CLOUD[index % CLOUD.length];

  /* Settles in a loose pile resting on the filter line — sediment, not deleted */
  const top = useTransform(progress, [start, end], [pos.top, pos.rest]);
  const rotate = useTransform(progress, [start, end], [pos.rotate, pos.rotate * 2.5]);
  const opacity = useTransform(progress, [start, end], [1, 0.22]);
  const blur = useTransform(progress, [start + 0.06, end], [0, 2.5]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.span
      className="absolute whitespace-nowrap font-display text-[clamp(1.375rem,1rem+1.6vw,2.375rem)] capitalize leading-none tracking-[-0.01em] text-forest/40"
      style={{ left: pos.left, top, rotate, opacity, filter }}
    >
      {word}
    </motion.span>
  );
}

/** A signal that matters rises out of the filter and settles into the list. */
function SignalRow({
  label,
  index,
  total,
  progress,
}: {
  label: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.42 + index * 0.1;
  const end = start + 0.16;
  const isPayoff = index === total - 1;

  const y = useTransform(progress, [start, end], [-26, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const rule = useTransform(progress, [start + 0.04, end + 0.06], [0, 1]);

  return (
    <motion.li className="relative" style={{ y, opacity }}>
      <div className="flex items-baseline gap-4 py-2.5 md:py-3">
        <span className="w-6 shrink-0 font-mono text-[0.75rem] tabular-nums text-copper">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "font-display leading-tight",
            isPayoff
              ? "text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] italic text-copper"
              : "type-title text-forest",
          )}
        >
          {label}
        </span>
      </div>
      <motion.span
        className={cn(
          "absolute bottom-0 left-10 right-0 h-px origin-left",
          isPayoff ? "bg-copper/60" : "bg-forest/12",
        )}
        style={{ scaleX: rule }}
        aria-hidden
      />
    </motion.li>
  );
}

function FilterScene({ progress }: { progress: MotionValue<number> }) {
  const words = quality.moreSignals;
  const signals = quality.rightSignals;

  const glow = useTransform(progress, [0.08, 0.35, 0.7], [0.15, 1, 0.45]);
  const moreFade = useTransform(progress, [0.2, 0.6], [1, 0.35]);
  const rightIn = useTransform(progress, [0.34, 0.5], [0, 1]);
  const rightY = useTransform(progress, [0.34, 0.5], [18, 0]);

  return (
    <div className="relative">
      {/* Above the filter: volume */}
      <motion.p
        className="flex items-baseline gap-3 type-eyebrow text-ink-soft"
        style={{ opacity: moreFade }}
      >
        Volume
        <span className="font-display text-[1.375rem] normal-case tracking-[-0.01em] text-forest/45">
          {quality.more}
        </span>
      </motion.p>

      <div className="relative mt-4 h-[9.5rem] sm:h-[10.5rem] md:h-[11.5rem]" aria-hidden>
        {words.map((w, i) => (
          <NoiseWord key={w} word={w} index={i} total={words.length} progress={progress} />
        ))}
      </div>

      {/* The filter */}
      <div className="relative my-6 md:my-8" aria-hidden>
        <motion.div
          className="absolute -inset-x-4 -inset-y-6 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(196,92,38,0.18),transparent_70%)]"
          style={{ opacity: glow }}
        />
        <div className="relative flex items-center gap-4">
          <span className="whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-copper">
            Relevance filter
          </span>
          <motion.span
            className="h-[2px] flex-1 bg-[repeating-linear-gradient(90deg,var(--color-copper)_0_14px,transparent_14px_22px)]"
            style={{ opacity: glow }}
          />
        </div>
      </div>

      {/* Below the filter: what matters */}
      <motion.p
        className="font-display text-[clamp(2.5rem,1.6rem+3.4vw,4.25rem)] font-semibold leading-none tracking-[-0.02em] text-forest"
        style={{ opacity: rightIn, y: rightY }}
      >
        {quality.right}
      </motion.p>
      <ol className="mt-4 md:mt-5" aria-label="What remains">
        {signals.map((s, i) => (
          <SignalRow key={s} label={s} index={i} total={signals.length} progress={progress} />
        ))}
      </ol>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */

export function QualitySection() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const stageInView = useInView(stageRef, { once: true, amount: 0.35 });

  /* Desktop: scrubbed across the pinned stretch */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scrubbed = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

  /* Mobile/tablet: plays once when the scene arrives */
  const played = useMotionValue(0);
  useEffect(() => {
    if (isDesktop) return;
    if (reduce) {
      played.set(1);
      return;
    }
    if (!stageInView) return;
    const controls = animate(played, 1, { duration: 3.6, ease: [0.4, 0, 0.2, 1] });
    return () => controls.stop();
  }, [isDesktop, reduce, stageInView, played]);

  const finished = useMotionValue(1);
  const progress = reduce ? finished : isDesktop ? scrubbed : played;

  const dot = quality.statement.indexOf(". ");
  const lead = dot === -1 ? quality.statement : quality.statement.slice(0, dot + 1);
  const turn = dot === -1 ? "" : quality.statement.slice(dot + 2);

  return (
    <section
      id="quality"
      ref={ref}
      className="relative scroll-mt-[var(--header-h)] bg-ivory py-[var(--section-space-loose)] lg:h-[220vh] lg:py-0"
      aria-labelledby="quality-heading"
    >
      <div className="lg:sticky lg:top-[var(--header-h)] lg:flex lg:h-[calc(100svh-var(--header-h))] lg:items-center">
        <Container>
          <div className="grid gap-12 md:gap-14 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="md:max-w-[36rem] lg:col-span-5 lg:max-w-none">
              <SectionLabel index={homeSections.quality.index} className="mb-5">
                {homeSections.quality.name}
              </SectionLabel>
              <motion.h2
                id="quality-heading"
                className="type-display-l text-forest"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease: motionEase }}
              >
                {lead}{" "}
                {turn ? <span className="italic text-copper">{turn}</span> : null}
              </motion.h2>
              <motion.p
                className="type-lead mt-5 text-ink-soft md:mt-6"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, ease: motionEase, delay: 0.12 }}
              >
                {quality.narrative}
              </motion.p>
            </div>

            <div
              ref={stageRef}
              className="border-y border-forest/10 py-8 md:py-10 lg:col-span-6 lg:col-start-7 lg:border-y-0 lg:border-l lg:py-2 lg:pl-12"
            >
              <FilterScene progress={progress} />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
