"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { quality } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { PinnedScene } from "@/components/motion/PinnedScene";
import { useBeat } from "@/components/motion/useBeat";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { cn } from "@/lib/cn";

/** Loose cloud positions for the volume words — scattered, like noise. */
const CLOUD = [
  { left: "2%", top: "14%", rotate: -3 },
  { left: "36%", top: "0%", rotate: 2 },
  { left: "70%", top: "22%", rotate: -2 },
  { left: "14%", top: "56%", rotate: 3 },
  { left: "54%", top: "60%", rotate: -4 },
];
/** Where held-back words come to rest on the filter: one row on desktop, two on smaller screens. */
const REST_WIDE = [0, 1, 2, 3, 4].map((i) => ({ left: `${[0, 19, 40, 59, 78][i]}%`, top: "84%" }));
const REST_NARROW = [
  { left: "0%", top: "60%" },
  { left: "34%", top: "60%" },
  { left: "68%", top: "60%" },
  { left: "0%", top: "84%" },
  { left: "34%", top: "84%" },
];

/* ─── Scene pieces ────────────────────────────────────────────── */

/** A volume word drifts down onto the filter and is held back there — struck out, but still legible. */
function NoiseWord({
  word,
  index,
  total,
  progress,
  wide,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  wide: boolean;
}) {
  const start = 0.04 + (index / total) * 0.3;
  const end = start + 0.26;
  const pos = CLOUD[index % CLOUD.length];
  const rest = (wide ? REST_WIDE : REST_NARROW)[index % 5];

  const top = useTransform(progress, [start, end], [pos.top, rest.top]);
  const left = useTransform(progress, [start, end], [pos.left, rest.left]);
  const rotate = useTransform(progress, [start, end], [pos.rotate, 0]);
  const scale = useTransform(progress, [start, end], [1, wide ? 0.46 : 0.62]);
  const opacity = useTransform(progress, [start, end], [1, 0.55]);
  const strike = useTransform(progress, [end - 0.02, end + 0.08], [0, 1]);

  return (
    <motion.span
      className="absolute origin-top-left whitespace-nowrap font-display text-[clamp(1.375rem,1rem+1.6vw,2.375rem)] capitalize leading-none tracking-[-0.01em] text-forest/45"
      style={{ left, top, rotate, scale, opacity }}
    >
      {word}
      <motion.span
        className="absolute inset-x-[-4%] top-[55%] h-[3px] origin-left rounded-full bg-copper/70"
        style={{ scaleX: strike }}
        aria-hidden
      />
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
      <div className="flex items-baseline gap-4 py-1.5 md:py-3">
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

/** A copper spark dropping through the filter as each signal that matters passes. */
function Spark({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const start = 0.38 + index * 0.1;
  const y = useTransform(progress, [start, start + 0.12], [-14, 26]);
  const opacity = useTransform(progress, [start, start + 0.03, start + 0.1, start + 0.12], [0, 1, 1, 0]);
  return (
    <motion.span
      className="absolute top-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-copper shadow-[0_0_10px_2px_rgba(196,92,38,0.45)]"
      style={{ left: `${22 + index * 18}%`, y, opacity }}
    />
  );
}

/** A live readout of the filter — counts that climb as the scene plays. */
function Meter({
  label,
  count,
  fill,
  accent,
}: {
  label: string;
  count: MotionValue<number>;
  fill: MotionValue<number>;
  accent?: boolean;
}) {
  const shown = useTransform(count, (c) => String(Math.round(c)).padStart(2, "0"));
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="type-eyebrow text-ink-soft">{label}</span>
        <motion.span
          className={cn(
            "font-display text-[1.75rem] leading-none tabular-nums",
            accent ? "text-copper" : "text-forest/45",
          )}
        >
          {shown}
        </motion.span>
      </div>
      <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-forest/10">
        <motion.div
          className={cn("h-full origin-left rounded-full", accent ? "bg-copper" : "bg-forest/35")}
          style={{ scaleX: fill }}
        />
      </div>
    </div>
  );
}

function FilterScene({ progress, wide }: { progress: MotionValue<number>; wide: boolean }) {
  const words = quality.moreSignals;
  const signals = quality.rightSignals;

  const glow = useTransform(progress, [0.08, 0.35, 0.7], [0.15, 1, 0.45]);
  const moreFade = useTransform(progress, [0.2, 0.6], [1, 0.5]);
  const rightIn = useTransform(progress, [0.34, 0.5], [0, 1]);
  const rightY = useTransform(progress, [0.34, 0.5], [18, 0]);
  const heldCaption = useTransform(progress, [0.4, 0.55], [0, 1]);

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

      <div className="relative mt-3 h-[6.5rem] sm:h-[8.5rem] md:mt-4 md:h-[11.5rem] max-lg:[@media(max-height:760px)]:h-[5rem]" aria-hidden>
        {words.map((w, i) => (
          <NoiseWord key={w} word={w} index={i} total={words.length} progress={progress} wide={wide} />
        ))}
        <motion.span
          className="absolute left-0 top-[calc(60%-1.5rem)] font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-forest/55 lg:top-[calc(84%-1.75rem)]"
          style={{ opacity: heldCaption }}
        >
          Held back
        </motion.span>
      </div>

      {/* The filter */}
      <div className="relative my-3 md:my-8" aria-hidden>
        <motion.div
          className="absolute -inset-x-4 -inset-y-6 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(196,92,38,0.18),transparent_70%)]"
          style={{ opacity: glow }}
        />
        <div className="relative flex items-center gap-4">
          <span className="whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-copper">
            Relevance filter
          </span>
          <div className="relative h-[3px] flex-1">
            <motion.span
              className="absolute inset-0 rounded-full bg-[repeating-linear-gradient(90deg,var(--color-copper)_0_18px,transparent_18px_26px)]"
              style={{ opacity: glow }}
            />
            {signals.map((_, i) => (
              <Spark key={i} index={i} progress={progress} />
            ))}
          </div>
        </div>
      </div>

      {/* Below the filter: what matters */}
      <motion.p
        className="font-display text-[clamp(2rem,1.3rem+3.4vw,4.25rem)] font-semibold leading-none tracking-[-0.02em] text-forest"
        style={{ opacity: rightIn, y: rightY }}
      >
        {quality.right}
      </motion.p>
      <ol className="mt-2 md:mt-5" aria-label="What remains">
        {signals.map((s, i) => (
          <SignalRow key={s} label={s} index={i} total={signals.length} progress={progress} />
        ))}
      </ol>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */

function QualityScene({ scrubbed }: { scrubbed: MotionValue<number> }) {
  const isDesktop = useIsDesktop();
  const progress = useTransform(scrubbed, [0.04, 0.92], [0, 1]);

  /* Readout — same timeline as the scene */
  const heldFill = useTransform(progress, [0.04, 0.62], [0, 1]);
  const heldCount = useTransform(heldFill, [0, 1], [0, quality.moreSignals.length]);
  const keptFill = useTransform(progress, [0.42, 0.92], [0, 1]);
  const keptCount = useTransform(keptFill, [0, 1], [0, quality.rightSignals.length]);
  const headIn = useBeat(scrubbed, [0, 0.05]);

  const dot = quality.statement.indexOf(". ");
  const lead = dot === -1 ? quality.statement : quality.statement.slice(0, dot + 1);
  const turn = dot === -1 ? "" : quality.statement.slice(dot + 2);

  return (
    <Container>
      <div className="grid gap-5 sm:gap-8 max-lg:[@media(max-height:760px)]:gap-3 lg:grid-cols-12 lg:items-center lg:gap-14">
        <motion.div className="md:max-w-[36rem] lg:col-span-5 lg:max-w-none" style={headIn}>
          <SectionLabel index={homeSections.quality.index} className="mb-3 lg:mb-5">
            {homeSections.quality.name}
          </SectionLabel>
          <h2
            id="quality-heading"
            className="font-display text-[clamp(1.75rem,1.1rem+2.8vw,3.75rem)] max-lg:[@media(max-height:760px)]:text-[1.625rem] font-medium leading-[1.06] tracking-[-0.015em] text-balance text-forest"
          >
            {lead}
            {turn ? <span className="block italic text-copper">{turn}</span> : null}
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-[1.5] text-ink-soft sm:text-base lg:mt-6 lg:text-[1.1875rem]">
            {quality.narrative}
          </p>

          <div className="mt-4 grid max-w-[26rem] grid-cols-2 gap-5 max-lg:[@media(max-height:760px)]:mt-3 lg:mt-12 lg:grid-cols-1 lg:gap-6">
            <Meter label="Noise held back" count={heldCount} fill={heldFill} />
            <Meter label="Signals that matter" count={keptCount} fill={keptFill} accent />
          </div>
        </motion.div>

        <div className="border-t border-forest/10 pt-4 lg:col-span-6 lg:col-start-7 lg:border-l lg:border-t-0 lg:py-2 lg:pl-12">
          <FilterScene progress={progress} wide={isDesktop} />
        </div>
      </div>
    </Container>
  );
}

/** 03 — one pinned screen at every size; scroll runs the relevance filter. */
export function QualitySection() {
  return (
    <PinnedScene length={2} id="quality" className="scroll-mt-[var(--header-h)] bg-ivory" labelledBy="quality-heading">
      {(p) => <QualityScene scrubbed={p} />}
    </PinnedScene>
  );
}
