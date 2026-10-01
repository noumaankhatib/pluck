"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { plainEnglish } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { PinnedScene } from "@/components/motion/PinnedScene";
import { useBeat } from "@/components/motion/useBeat";

/** A question lights as the reader scrolls to it: brightens, its dot turns copper. */
function Question({
  text,
  index,
  progress,
}: {
  text: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.04 + index * 0.075;
  const lit = useTransform(progress, [start, start + 0.06], [0, 1]);
  const opacity = useTransform(lit, [0, 1], [0.32, 1]);
  const x = useTransform(lit, [0, 1], [0, 6]);
  const dot = useTransform(lit, [0, 1], ["rgba(180,194,182,0.35)", "rgba(196,92,38,1)"]);
  const dotScale = useTransform(lit, [0, 1], [1, 1.35]);

  return (
    <motion.li
      className="flex items-baseline gap-4 border-b border-ivory/10 py-2 sm:py-3 lg:gap-5 lg:py-4"
      style={{ opacity }}
    >
      <motion.span
        className="relative z-[1] block h-[7px] w-[7px] shrink-0 -translate-y-[0.15em] rounded-full"
        style={{ backgroundColor: dot, scale: dotScale }}
        aria-hidden
      />
      <motion.span
        className="font-display text-[clamp(1.125rem,0.95rem+0.9vw,1.75rem)] leading-snug text-ivory"
        style={{ x }}
      >
        {text}
      </motion.span>
    </motion.li>
  );
}

/** 08 — one pinned screen: the questions light one by one, then the resolution answers them. */
function PlainScene({ p }: { p: MotionValue<number> }) {
  const qs = plainEnglish.questions;
  const label = useBeat(p, [0, 0.04]);
  const thread = useTransform(p, [0.04, 0.04 + qs.length * 0.075], [0, 1]);
  const climax = useBeat(p, [0.6, 0.7], undefined, 32);
  const support = useBeat(p, [0.66, 0.76], undefined, 16);
  const rule = useTransform(p, [0.58, 0.68], [0, 1]);

  return (
    <Container>
      <motion.div style={label}>
        <SectionLabel index={homeSections.plainEnglish.index} tone="dark" className="mb-4 lg:mb-12">
          {homeSections.plainEnglish.name}
        </SectionLabel>
      </motion.div>
      <h2 id="plain-heading" className="sr-only">
        {plainEnglish.headline}
      </h2>

      <div className="grid gap-6 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="relative lg:col-span-6">
          <div className="absolute bottom-0 left-[3px] top-0 w-px bg-ivory/12" aria-hidden>
            <motion.div className="h-full w-full origin-top bg-copper" style={{ scaleY: thread }} />
          </div>
          <ul aria-label="Plain English questions">
            {qs.map((q, i) => (
              <Question key={q} text={q} index={i} progress={p} />
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <motion.span
            className="mb-4 block h-px w-12 origin-left bg-copper lg:mb-6"
            style={{ scaleX: rule }}
            aria-hidden
          />
          <motion.p
            className="font-display text-[clamp(1.875rem,1.2rem+3vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.015em] text-balance text-ivory"
            style={climax}
          >
            {plainEnglish.climax}
          </motion.p>
          <motion.p
            className="mt-3 max-w-[28rem] text-[0.9375rem] leading-[1.55] text-ivory/80 sm:text-base lg:mt-6 lg:text-[1.1875rem]"
            style={support}
          >
            We handle the data, tools, research and execution so you can focus on running your business.
          </motion.p>
        </div>
      </div>
    </Container>
  );
}

export function PlainEnglishSection() {
  return (
    <PinnedScene length={2} className="surface-espresso" labelledBy="plain-heading">
      {(p) => <PlainScene p={p} />}
    </PinnedScene>
  );
}
