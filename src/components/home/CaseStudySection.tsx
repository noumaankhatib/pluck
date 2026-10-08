"use client";

import Link from "next/link";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { caseStudy } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { PinnedScene } from "@/components/motion/PinnedScene";
import { useBeat } from "@/components/motion/useBeat";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { cn } from "@/lib/cn";

/** A metric like "$4.7m" or "100+" that counts up as the reader scrolls through [from, to]. */
function ScrollCount({
  value,
  progress,
  range,
}: {
  value: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const [, prefix = "", num = "0", suffix = ""] = match ?? [];
  const target = parseFloat(num);
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  const shown = useTransform(progress, range, [0, target], { clamp: true });
  const text = useTransform(shown, (v) => (match ? `${prefix}${v.toFixed(decimals)}${suffix}` : value));
  return <motion.span>{text}</motion.span>;
}

function Metric({
  metric,
  index,
  progress,
}: {
  metric: (typeof caseStudy.metrics)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.24 + index * 0.09;
  const beat = useBeat(progress, [start - 0.04, start + 0.02], undefined, 16);
  return (
    <motion.li className="relative bg-ivory px-4 py-4 sm:px-6 sm:py-6 lg:px-7 lg:py-7 lg:[@media(max-height:760px)]:py-5" style={beat}>
      <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-soft">
        <span className="tabular-nums text-accent">{String(index + 1).padStart(2, "0")}</span>
        {metric.label}
      </p>
      <p className="font-display mt-2 text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] font-medium leading-none tracking-[-0.02em] tabular-nums text-forest lg:mt-3">
        <ScrollCount value={metric.value} progress={progress} range={[start, start + 0.12]} />
      </p>
      {index < 3 && (
        <div
          className="absolute -right-[7px] top-1/2 z-10 hidden h-3.5 w-3.5 -translate-y-1/2 items-center justify-center bg-ivory text-accent md:flex"
          aria-hidden
        >
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
            <path d="M0.5 5.5H5.5M3 2L6 5.5L3 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </motion.li>
  );
}

/**
 * 06 — one pinned screen. The story arrives, then the commercial chain counts
 * up in order (spend → leads → quoted → sales) and the return lands last.
 * Phones show the story and the numbers as two beats in the same space.
 */
function CaseScene({ p, isStatic }: { p: MotionValue<number>; isStatic: boolean }) {
  const isDesktop = useIsDesktop();
  const flow = caseStudy.metrics.slice(0, 4);
  const ret = caseStudy.metrics[4];

  const head = useBeat(p, [0, 0.05]);
  const context = useBeat(p, [0.05, 0.13]);
  /* Phones: the story steps aside for the numbers */
  const storyOut = useTransform(p, [0.18, 0.24], [1, 0]);
  const storyY = useTransform(p, [0.18, 0.24], [0, -30]);
  const returnIn = useBeat(p, [0.62, 0.7]);
  const linkIn = useBeat(p, [0.74, 0.8], undefined, 10);
  const swap = !isDesktop && !isStatic;

  return (
    <Container className="relative">
      <div className={cn("grid", swap && "[&>*]:col-start-1 [&>*]:row-start-1")}>
        {/* The story */}
        <motion.div
          className="grid gap-4 sm:gap-8 lg:grid-cols-12 lg:items-end lg:gap-12"
          style={swap ? { opacity: storyOut, y: storyY } : undefined}
        >
          <motion.div className="lg:col-span-6" style={head}>
            <SectionLabel index={homeSections.caseStudy.index} className="mb-3 lg:mb-5">
              {homeSections.caseStudy.name}
            </SectionLabel>
            <p className="type-eyebrow text-accent">{caseStudy.client}</p>
            <h2
              id="case-heading"
              className="mt-2 font-display text-[clamp(1.875rem,1.2rem+2.8vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.015em] text-balance text-forest lg:mt-3"
            >
              {caseStudy.headline}
            </h2>
            <p className="mt-3 font-display text-[clamp(1.25rem,1rem+1.2vw,2rem)] italic leading-[1.2] text-forest/80 lg:mt-5">
              {caseStudy.supporting}
            </p>
          </motion.div>

          <motion.div className="md:max-w-[38rem] lg:col-span-5 lg:col-start-8 lg:max-w-none" style={context}>
            <p className="type-eyebrow flex items-center gap-3 text-ink-soft">
              <span className="h-px w-6 bg-accent" aria-hidden />
              {caseStudy.timeline}
            </p>
            <p className="mt-2 text-[0.9375rem] leading-[1.55] text-charcoal/85 lg:mt-4 lg:text-base">
              {caseStudy.context}
            </p>
            <p className="mt-2 text-[0.9375rem] leading-[1.55] text-ink-soft lg:mt-3 lg:text-base">
              {caseStudy.workDescription}
            </p>
          </motion.div>
        </motion.div>

        {/* The numbers */}
        <div className={cn("self-center", !swap && "mt-8 lg:mt-12 [@media(max-height:760px)]:mt-6")}>
          {/* Phones: keep the reader oriented once the story has stepped aside */}
          {swap && (
            <p className="type-eyebrow mb-3 flex items-center gap-3 text-ink-soft">
              <span className="text-accent">{caseStudy.client}</span>
              <span className="h-px w-5 bg-forest/20" aria-hidden />
              {caseStudy.timeline}
            </p>
          )}
          <ol className="grid grid-cols-2 gap-px border border-forest/10 bg-forest/10 md:grid-cols-4">
            {flow.map((m, i) => (
              <Metric key={m.label} metric={m} index={i} progress={p} />
            ))}
          </ol>

          <motion.div className="surface-espresso" style={returnIn}>
            <div className="grid gap-2 px-5 py-5 sm:px-8 sm:py-7 md:grid-cols-12 md:items-center md:gap-8 md:px-12 lg:py-9 lg:[@media(max-height:760px)]:py-6">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ivory/65 md:col-span-3">
                {ret.label}
              </p>
              <p className="font-display text-[clamp(1.75rem,1.2rem+2.6vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ivory md:col-span-9">
                <ScrollCount value={ret.value} progress={p} range={[0.62, 0.76]} />
              </p>
            </div>
          </motion.div>

          <motion.div className="mt-4 flex lg:mt-7" style={linkIn}>
            <Link
              href={caseStudy.link}
              className="group inline-flex min-h-11 items-center gap-3 border-b border-forest/30 text-[0.9375rem] font-medium text-forest transition-colors hover:border-forest"
            >
              {caseStudy.linkLabel}
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </Container>
  );
}

export function CaseStudySection() {
  return (
    <PinnedScene length={2} className="accent-teal bg-ivory" labelledBy="case-heading">
      {(p, _ref, isStatic) => <CaseScene p={p} isStatic={isStatic} />}
    </PinnedScene>
  );
}
