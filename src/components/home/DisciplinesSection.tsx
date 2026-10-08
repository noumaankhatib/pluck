"use client";

import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { useState } from "react";
import { disciplines } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { PinnedScene } from "@/components/motion/PinnedScene";
import { useBeat } from "@/components/motion/useBeat";
import { cn } from "@/lib/cn";

const DISCIPLINE_LABELS = [
  "Commercial Strategy",
  "Paid Search",
  "Search & Technology",
] as const;

/* Three-node SVG viewBox positions — triangle formation */
const NODES = [
  { cx: 150, cy: 250, labelX: 150, labelY: 290 }, // bottom-left: Commercial Strategy
  { cx: 400, cy: 70, labelX: 400, labelY: 30 }, // top-center: Paid Search
  { cx: 650, cy: 250, labelX: 650, labelY: 290 }, // bottom-right: Search & Technology
] as const;

const HUB = { cx: 400, cy: 190 } as const;

/* Beat timing for the people (beat two) */
const personStart = (i: number) => 0.5 + i * 0.08;

function Diagram({ p, lit, isStatic }: { p: MotionValue<number>; lit: number; isStatic: boolean }) {
  /* Beat one: the three disciplines converge on one objective */
  const merge = useTransform(p, [0.04, 0.38], [0, 1]);
  const lineOpacity = useTransform(merge, [0, 0.3], [0.2, 0.7]);
  const linePathLength = useTransform(merge, [0, 0.75], [0, 1]);
  const hubScale = useTransform(merge, [0.45, 1], [0, 1]);
  const hubOpacity = useTransform(merge, [0.4, 0.8], [0, 1]);
  const objectiveOpacity = useTransform(merge, [0.6, 1], [0, 1]);
  const nodeOpacity = useTransform(merge, [0, 0.3], [0.45, 1]);

  return (
    <div className="relative mx-auto mb-9 aspect-[800/330] w-[86%] max-w-[34rem] sm:mb-0 sm:w-full" aria-hidden>
      <svg viewBox="0 0 800 330" className="absolute inset-0 h-full w-full overflow-visible">
        {NODES.map((node, i) => (
          <motion.path
            key={i}
            d={`M ${node.cx} ${node.cy} L ${HUB.cx} ${HUB.cy}`}
            fill="none"
            stroke="var(--chapter-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            style={isStatic ? { opacity: 0.6 } : { opacity: lineOpacity, pathLength: linePathLength }}
          />
        ))}

        {NODES.map((node, i) => {
          const isLit = i === lit;
          return (
            <motion.g key={i} style={isStatic ? undefined : { opacity: nodeOpacity }}>
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                initial={false}
                animate={{
                  r: isLit ? 32 : 26,
                  fill: isLit ? "#f3e2d6" : "#f7f4ef",
                  stroke: isLit ? "#b04a63" : "rgba(27,61,47,0.35)",
                }}
                strokeWidth={1.5}
                transition={{ duration: 0.4 }}
              />
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={7}
                initial={false}
                animate={{ fill: isLit ? "#b04a63" : "#1b3d2f" }}
                transition={{ duration: 0.4 }}
              />
            </motion.g>
          );
        })}

        <motion.circle
          cx={HUB.cx}
          cy={HUB.cy}
          r="30"
          fill="var(--chapter-accent)"
          opacity="0.15"
          style={isStatic ? undefined : { scale: hubScale }}
        />
        <motion.circle
          cx={HUB.cx}
          cy={HUB.cy}
          r="12"
          fill="var(--chapter-accent)"
          style={isStatic ? { opacity: 1 } : { scale: hubScale, opacity: hubOpacity }}
        />
      </svg>

      {NODES.map((node, i) => (
        <motion.span
          key={i}
          className={cn(
            "absolute w-max max-w-[7rem] -translate-x-1/2 text-center text-[0.6875rem] font-medium uppercase leading-snug tracking-[0.14em] transition-colors duration-300 sm:max-w-none sm:text-xs",
            i === lit ? "text-accent" : "text-forest",
          )}
          style={{
            left: `${(node.labelX / 800) * 100}%`,
            top: `${(node.labelY / 330) * 100}%`,
            translateY: i === 1 ? "-100%" : "0%",
            opacity: isStatic ? 1 : nodeOpacity,
          }}
        >
          {DISCIPLINE_LABELS[i]}
        </motion.span>
      ))}

      <motion.span
        className="absolute top-[calc(100%+1.75rem)] w-max -translate-x-1/2 bg-ivory px-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-accent sm:top-[var(--hub-label-top)] sm:text-xs"
        style={{
          left: `${(HUB.cx / 800) * 100}%`,
          /* Beneath the hub on wider screens; below the whole diagram on phones */
          ["--hub-label-top" as string]: `${((HUB.cy + 48) / 330) * 100}%`,
          opacity: isStatic ? 1 : objectiveOpacity,
        }}
      >
        {disciplines.objective}
      </motion.span>
    </div>
  );
}

function Person({
  person,
  index,
  p,
}: {
  person: (typeof disciplines.people)[number];
  index: number;
  p: MotionValue<number>;
}) {
  const start = personStart(index);
  /* Each person arrives from the side their node sits on */
  const dir = index === 0 ? -1 : index === 2 ? 1 : 0;
  const opacity = useTransform(p, [start, start + 0.06], [0, 1]);
  const x = useTransform(p, [start, start + 0.08], [dir * 24, 0]);
  const y = useTransform(p, [start, start + 0.08], [dir === 0 ? 18 : 0, 0]);
  return (
    <motion.li className="border-b border-forest/12 py-2.5 sm:py-4 lg:py-5" style={{ opacity, x, y }}>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">{DISCIPLINE_LABELS[index]}</p>
      <h3 className="mt-1 font-display text-[1.25rem] leading-tight text-forest sm:text-[1.5rem] lg:mt-2 lg:text-[1.875rem]">
        {person.name}
      </h3>
      <p className="mt-0.5 text-[0.875rem] leading-snug text-ink-soft sm:text-[0.9375rem] lg:mt-1.5">{person.role}</p>
    </motion.li>
  );
}

/**
 * 09 — one pinned screen in two beats. The disciplines converge on the
 * diagram; then the claim steps aside and the three people arrive in its
 * place, each lighting their node.
 */
function DisciplinesScene({ p, isStatic }: { p: MotionValue<number>; isStatic: boolean }) {
  const [lit, setLit] = useState(-1);
  useMotionValueEvent(p, "change", (v) => {
    const next = [2, 1, 0].find((i) => v >= personStart(i) + 0.02) ?? -1;
    setLit(v > 0.86 ? -1 : next);
  });

  const head = useBeat(p, [0, 0.05], isStatic ? undefined : [0.42, 0.48]);
  const collective = useBeat(p, [0.76, 0.84], undefined, 16);

  return (
    <Container>
      <div className="grid gap-4 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className={cn("lg:col-span-5", !isStatic && "grid [&>*]:col-start-1 [&>*]:row-start-1")}>
          {/* Beat one: the claim */}
          <motion.div className="self-center md:max-w-[36rem] lg:max-w-none" style={head}>
            <SectionLabel index={homeSections.disciplines.index} className="mb-3 lg:mb-5">
              {homeSections.disciplines.name}
            </SectionLabel>
            <h2
              id="disciplines-heading"
              className="font-display text-[clamp(1.75rem,1.1rem+2.8vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.015em] text-balance text-forest"
            >
              {disciplines.headline}
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-[1.5] text-ink-soft sm:text-base lg:mt-6 lg:text-[1.1875rem]">
              {disciplines.intro}
            </p>
          </motion.div>

          {/* Beat two: who they are */}
          <div className={cn("self-center", isStatic && "mt-8")}>
            <ul className="border-t border-forest/12">
              {disciplines.people.map((person, i) => (
                <Person key={person.name} person={person} index={i} p={p} />
              ))}
            </ul>
            <motion.p
              className="mt-3 max-w-[34rem] text-[0.9375rem] leading-[1.5] text-forest sm:mt-5 sm:text-[1.0625rem] lg:mt-6 lg:text-[1.1875rem]"
              style={collective}
            >
              {disciplines.collective}
            </motion.p>
          </div>
        </div>

        {/* The diagram holds through both beats */}
        <div className="order-first lg:order-none lg:col-span-6 lg:col-start-7">
          <Diagram p={p} lit={isStatic ? -1 : lit} isStatic={isStatic} />
        </div>
      </div>
    </Container>
  );
}

export function DisciplinesSection() {
  return (
    <PinnedScene length={2} className="accent-rose bg-ivory" labelledBy="disciplines-heading">
      {(p, _ref, isStatic) => <DisciplinesScene p={p} isStatic={isStatic} />}
    </PinnedScene>
  );
}
