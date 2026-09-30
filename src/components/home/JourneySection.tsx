"use client";

import { useRef } from "react";
import {
  useReducedMotion,
  motion,
  useScroll,
  useTransform,
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

function SearchQueryIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <circle cx="4" cy="4" r="2.75" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 6.5 9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function StageColumn({
  stage,
  index,
  reduce,
}: {
  stage: (typeof journey.stages)[0];
  index: number;
  reduce: boolean | null;
}) {
  const isReach = index === 2;
  const isLearn = index === 3;

  return (
    <motion.div
      className="relative flex flex-col pl-10 md:pl-0"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.6, ease: motionEase, delay: reduce ? 0 : (index % 4) * 0.08 }}
    >
      {/* Node on the thread — vertical on mobile, horizontal on desktop */}
      <div className="mb-4 flex items-center gap-3 md:mb-6">
        <span
          className="absolute left-[3px] top-[0.3rem] z-[1] h-3 w-3 rounded-full border-2 border-ivory bg-copper ring-1 ring-copper md:static md:h-2.5 md:w-2.5 md:border-0 md:ring-0"
          aria-hidden
        />
        <span className="relative z-[1] bg-ivory pr-3 font-mono text-[0.75rem] tracking-[0.2em] text-copper">
          {stage.step}
        </span>
      </div>

      <h3 className="type-display-m text-forest">{stage.title}</h3>

      <p className="type-small mt-3 text-ink-soft">{stage.body}</p>

      {/* Reach — channels as tags; other stages as the questions we ask */}
      {isReach ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Reach channels">
          {stage.prompts.map((c) => (
            <li
              key={c}
              className="border border-copper/35 px-3 py-1.5 font-mono text-[0.75rem] text-copper-hover"
            >
              {c}
            </li>
          ))}
        </ul>
      ) : (
        <ul
          className={cn(
            "mt-5 flex flex-col",
            isLearn ? "border-t border-forest/10" : "gap-y-2.5",
          )}
          aria-label={`${stage.title} questions`}
        >
          {stage.prompts.map((p, i) => (
            <li
              key={p}
              className={cn(
                "flex items-start gap-2.5 text-[0.9375rem] leading-snug text-forest",
                isLearn && "border-b border-forest/8 py-2",
              )}
            >
              {isLearn ? (
                <span className="mt-[3px] w-5 shrink-0 font-mono text-[0.6875rem] tabular-nums text-copper">
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : (
                <span className="mt-[0.5em] block h-1 w-1 shrink-0 rounded-full bg-copper/60" />
              )}
              {p}
            </li>
          ))}
        </ul>
      )}

      {/* Find — search query visual */}
      {index === 1 && (
        <div className="mt-5 space-y-2" aria-hidden>
          {FIND_QUERIES.map((q) => (
            <div
              key={q}
              className="flex min-w-0 items-center gap-2 border border-forest/10 bg-surface/60 px-3 py-2"
            >
              <span className="shrink-0 text-forest/40">
                <SearchQueryIcon />
              </span>
              <span className="truncate font-mono text-[0.75rem] text-ink-soft">{q}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const stages = journey.stages;

  /* The thread fills as the four stages pass through the viewport */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const thread = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className="bg-ivory py-[var(--section-space-loose)]"
      aria-labelledby="journey-heading"
    >
      <Container>
        {/* Intro row */}
        <div className="mb-12 grid gap-5 md:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionLabel index={homeSections.journey.index} className="mb-5">
              {homeSections.journey.name}
            </SectionLabel>
            <h2 id="journey-heading" className="type-display-l text-forest">
              Understand. Find.
              <br />
              Reach. <span className="italic text-copper">Learn.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="type-lead text-ink-soft">
              A connected journey from insight to opportunity.
            </p>
          </div>
        </div>

        <div ref={ref} className="relative">
          {/* Thread — vertical on mobile */}
          <div
            className="absolute bottom-2 left-[8px] top-2 w-px bg-forest/12 md:hidden"
            aria-hidden
          >
            <motion.div
              className="h-full w-full origin-top bg-copper"
              style={reduce ? undefined : { scaleY: thread }}
            />
          </div>
          {/* Thread — horizontal across all four columns on desktop */}
          <div
            className="absolute left-0 right-0 top-[5px] hidden h-px bg-forest/12 lg:block"
            aria-hidden
          >
            <motion.div
              className="h-full w-full origin-left bg-copper"
              style={reduce ? undefined : { scaleX: thread }}
            />
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:grid-cols-4 lg:gap-8 xl:gap-10">
            {stages.map((stage, i) => (
              <StageColumn key={stage.step} stage={stage} index={i} reduce={reduce} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
