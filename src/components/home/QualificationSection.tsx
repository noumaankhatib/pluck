"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { qualification } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { PinnedScene } from "@/components/motion/PinnedScene";
import { useBeat } from "@/components/motion/useBeat";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { cn } from "@/lib/cn";

/** Simple SVG icon paths — keyed by criteria index */
function CriterionIcon({ index }: { index: number }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-copper)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {index === 0 && (
        /* High-value customers — person */
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </>
      )}
      {index === 1 && (
        /* Active search demand — magnify */
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" />
        </>
      )}
      {index === 2 && (
        /* Specialist / complex — settings cog */
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </>
      )}
      {index === 3 && (
        /* Quality over volume — diamond */
        <>
          <polygon points="12 2 19 9 12 16 5 9" />
          <line x1="12" y1="16" x2="12" y2="22" />
        </>
      )}
      {index === 4 && (
        /* Meaningful sales conversation — speech */
        <>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </>
      )}
      {index === 5 && (
        /* Potentially missed opportunities — eye */
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

const CRITERION_DESCRIPTIONS = [
  "Businesses where each customer carries meaningful value.",
  "People are actively searching for what you offer.",
  "Products or services that require research or expertise.",
  "Fewer, better enquiries beat volume every time.",
  "Opportunities that can become real business conversations.",
  "Commercial opportunity being left on the table.",
];

/** A criterion checks in: rises, then a copper tick draws beside it. */
function Criterion({
  item,
  index,
  progress,
}: {
  item: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.06 + index * 0.06;
  const beat = useBeat(progress, [start, start + 0.05], undefined, 18);
  const tick = useTransform(progress, [start + 0.03, start + 0.08], [0, 1]);
  return (
    <motion.li className="flex gap-3 border-b border-forest/12 py-2 max-lg:[@media(max-height:760px)]:py-1.5 sm:py-4 lg:gap-4 lg:py-5" style={beat}>
      <span className="relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
        <CriterionIcon index={index} />
        <svg viewBox="0 0 24 24" className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5" aria-hidden>
          <circle cx="12" cy="12" r="11" fill="var(--color-ivory)" />
          <motion.path
            d="M6.5 12.5l3.5 3.5 7.5-8"
            fill="none"
            stroke="var(--color-copper)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: tick }}
          />
        </svg>
      </span>
      <div className="min-w-0">
        <p className="font-display text-[1.0625rem] leading-snug text-forest lg:text-[1.3125rem]">{item}</p>
        <p className="mt-0.5 text-[0.8125rem] leading-[1.4] text-ink-soft sm:text-[0.9375rem] lg:mt-1.5">
          {CRITERION_DESCRIPTIONS[index]}
        </p>
      </div>
    </motion.li>
  );
}

/**
 * 07 — a pinned checklist. The criteria check in one by one, the industries
 * follow, then everything lifts away and the question takes the screen —
 * the bridge into Plain English.
 */
function FitScene({ p, isStatic }: { p: MotionValue<number>; isStatic: boolean }) {
  const isDesktop = useIsDesktop();
  const swap = !isDesktop && !isStatic;

  const head = useBeat(p, [0, 0.05]);
  const industries = useBeat(p, [0.46, 0.54]);
  /* Phones: the industries take the criteria's place */
  const criteriaOut = useTransform(p, [0.42, 0.48], [1, 0]);
  /* Then the question takes the screen */
  const allOut = useTransform(p, [0.64, 0.72], [1, 0]);
  const allY = useTransform(p, [0.64, 0.72], [0, -36]);
  const question = useBeat(p, [0.7, 0.8], undefined, 40);
  const questionScale = useTransform(p, [0.7, 0.82], [0.94, 1]);
  const drop = useTransform(p, [0.82, 0.95], [0, 1]);

  const words = qualification.centerStatement.split(" ");
  const questionLast = words.pop();
  const questionLead = words.join(" ");

  const industriesBlock = (
    <motion.div style={industries} className={cn(swap && "col-start-1 row-start-1 self-start")}>
      <p className="max-w-[34rem] text-[0.9375rem] leading-[1.5] text-ink-soft lg:text-base">
        {qualification.industriesIntro}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2 lg:mt-5" aria-label="Example industries">
        {qualification.industries.map((industry) => (
          <li
            key={industry}
            className="border border-forest/20 bg-surface/50 px-3 py-1.5 font-mono text-[0.75rem] text-forest lg:py-2"
          >
            {industry}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <Container className="relative h-full">
      <motion.div
        className="flex h-full flex-col justify-center"
        style={isStatic ? undefined : { opacity: allOut, y: allY }}
      >
        <div className="grid gap-4 sm:gap-8 lg:grid-cols-12 lg:gap-14">
          <motion.div className="md:max-w-[36rem] lg:col-span-5 lg:max-w-none" style={head}>
            <SectionLabel index={homeSections.qualification.index} className="mb-3 lg:mb-5">
              {homeSections.qualification.name}
            </SectionLabel>
            <h2
              id="qual-heading"
              className="font-display text-[clamp(1.75rem,1.1rem+2.8vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.015em] text-balance text-forest max-lg:[@media(max-height:760px)]:text-[1.5rem]"
            >
              {qualification.headline}
            </h2>
            <p className="mt-2 max-w-[30rem] text-[0.9375rem] leading-[1.5] text-ink-soft sm:text-base lg:mt-6 lg:text-[1.1875rem]">
              {qualification.intro}
            </p>
            {/* Desktop: the industries under the claim */}
            <div className="mt-10 hidden lg:block">{industriesBlock}</div>
          </motion.div>

          <div className={cn("lg:col-span-7", swap && "grid")}>
            <motion.ul
              className={cn(
                "grid grid-cols-1 border-t border-forest/12 sm:grid-cols-2 sm:gap-x-8 lg:gap-x-10",
                swap && "col-start-1 row-start-1",
              )}
              style={swap ? { opacity: criteriaOut } : undefined}
              aria-label="Qualification criteria"
            >
              {qualification.criteria.map((item, i) => (
                <Criterion key={item} item={item} index={i} progress={p} />
              ))}
            </motion.ul>
            {/* Phones/tablets: the industries in the criteria's place (or below, when static) */}
            <div className={cn("lg:hidden", swap ? "col-start-1 row-start-1 grid" : "mt-8")}>{industriesBlock}</div>
          </div>
        </div>
      </motion.div>

      {/* The question takes the screen */}
      <motion.div
        className={cn(
          "pointer-events-none flex flex-col items-center justify-center text-center",
          isStatic ? "relative mt-16" : "absolute inset-0 px-[var(--gutter)]",
        )}
        style={isStatic ? undefined : { ...question, scale: questionScale }}
      >
        <p className="font-display text-[clamp(2.5rem,1.3rem+5vw,5.5rem)] font-medium leading-[1.03] tracking-[-0.02em] text-balance text-forest">
          {questionLead} <span className="italic text-copper">{questionLast}</span>
        </p>
        <motion.span
          className="mt-8 block h-16 w-px origin-top bg-copper md:h-24"
          style={{ scaleY: isStatic ? 1 : drop }}
          aria-hidden
        />
      </motion.div>
    </Container>
  );
}

export function QualificationSection() {
  return (
    <PinnedScene length={2.5} className="bg-ivory" stageClassName="items-stretch" labelledBy="qual-heading">
      {(p, _ref, isStatic) => <FitScene p={p} isStatic={isStatic} />}
    </PinnedScene>
  );
}
