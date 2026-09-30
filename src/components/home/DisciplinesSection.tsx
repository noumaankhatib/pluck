"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { disciplines } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";

const DISCIPLINE_LABELS = [
  "Commercial Strategy",
  "Paid Search",
  "Search & Technology",
] as const;


/* Three-node SVG viewBox positions — triangle formation */
const NODES = [
  { cx: 150, cy: 250, labelX: 150, labelY: 290 }, // bottom-left: Commercial Strategy
  { cx: 400, cy: 70, labelX: 400, labelY: 30 },   // top-center: Paid Search
  { cx: 650, cy: 250, labelX: 650, labelY: 290 }, // bottom-right: Search & Technology
] as const;

const HUB = { cx: 400, cy: 190 } as const;

export function DisciplinesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.45"],
  });

  const merge = useTransform(scrollYProgress, [0.1, 0.88], [0, 1]);

  /* Lines draw in as convergence progresses */
  const lineOpacity = useTransform(merge, [0, 0.3], [0.2, 0.7]);
  const linePathLength = useTransform(merge, [0, 0.75], [0, 1]);

  /* Hub dot grows in as lines meet */
  const hubScale = useTransform(merge, [0.45, 1], [0, 1]);
  const hubOpacity = useTransform(merge, [0.4, 0.8], [0, 1]);

  /* Objective label fades in when hub is visible */
  const objectiveOpacity = useTransform(merge, [0.6, 1], [0, 1]);

  /* Node dots and labels */
  const nodeOpacity = useTransform(merge, [0, 0.3], [0.45, 1]);

  return (
    <section
      className="bg-ivory pb-[var(--section-space-loose)] pt-[var(--section-space)]"
      aria-labelledby="disciplines-heading"
    >
      <Container>
        <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="md:max-w-[36rem] lg:col-span-5 lg:max-w-none">
            <SectionLabel index={homeSections.disciplines.index} className="mb-5">
              {homeSections.disciplines.name}
            </SectionLabel>
            <Reveal>
              <h2 id="disciplines-heading" className="type-display-l text-forest">
                {disciplines.headline}
              </h2>
            </Reveal>
            <p className="type-lead mt-5 text-ink-soft md:mt-6">{disciplines.intro}</p>
          </div>

          {/* Convergence diagram — labels are HTML so they stay legible at every width */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div ref={ref} className="relative mx-auto mb-10 aspect-[800/330] w-full max-w-[34rem] sm:mb-0" aria-hidden>
              <svg viewBox="0 0 800 330" className="absolute inset-0 h-full w-full overflow-visible">
                {NODES.map((node, i) => (
                  <motion.path
                    key={i}
                    d={`M ${node.cx} ${node.cy} L ${HUB.cx} ${HUB.cy}`}
                    fill="none"
                    stroke="var(--color-copper)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={
                      reduce
                        ? { opacity: 0.6 }
                        : { opacity: lineOpacity, pathLength: linePathLength }
                    }
                  />
                ))}

                {NODES.map((node, i) => (
                  <motion.g key={i} style={reduce ? undefined : { opacity: nodeOpacity }}>
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="26"
                      fill="var(--color-ivory)"
                      stroke="var(--color-forest)"
                      strokeWidth="1.5"
                      strokeOpacity="0.35"
                    />
                    <circle cx={node.cx} cy={node.cy} r="7" fill="var(--color-forest)" />
                  </motion.g>
                ))}

                <motion.circle
                  cx={HUB.cx}
                  cy={HUB.cy}
                  r="30"
                  fill="var(--color-copper)"
                  opacity="0.15"
                  style={reduce ? undefined : { scale: hubScale }}
                />
                <motion.circle
                  cx={HUB.cx}
                  cy={HUB.cy}
                  r="12"
                  fill="var(--color-copper)"
                  style={
                    reduce ? { opacity: 1 } : { scale: hubScale, opacity: hubOpacity }
                  }
                />
              </svg>

              {NODES.map((node, i) => (
                <motion.span
                  key={i}
                  className="absolute w-max max-w-[7rem] -translate-x-1/2 text-center text-[0.6875rem] font-medium uppercase leading-snug tracking-[0.14em] text-forest sm:max-w-none sm:text-xs"
                  style={{
                    left: `${(node.labelX / 800) * 100}%`,
                    top: `${(node.labelY / 330) * 100}%`,
                    translateY: i === 1 ? "-100%" : "0%",
                    opacity: reduce ? 1 : nodeOpacity,
                  }}
                >
                  {DISCIPLINE_LABELS[i]}
                </motion.span>
              ))}

              <motion.span
                className="absolute top-[calc(100%+1.75rem)] w-max -translate-x-1/2 bg-ivory px-2 font-mono sm:top-[var(--hub-label-top)] text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-copper sm:text-xs"
                style={{
                  left: `${(HUB.cx / 800) * 100}%`,
                  /* Beneath the hub on wider screens; below the whole diagram on phones */
                  ["--hub-label-top" as string]: `${((HUB.cy + 48) / 330) * 100}%`,
                  opacity: reduce ? 1 : objectiveOpacity,
                }}
              >
                {disciplines.objective}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Three discipline columns */}
        <ul className="mt-12 grid border-t border-forest/12 md:mt-16 md:grid-cols-3 md:divide-x md:divide-forest/12">
          {disciplines.people.map((person, i) => (
            <motion.li
              key={person.name}
              className="border-b border-forest/12 py-6 md:border-b-0 md:px-8 md:py-8 md:first:pl-0 md:last:pr-0"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.1 }}
            >
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-copper">
                {DISCIPLINE_LABELS[i]}
              </p>
              <h3 className="type-display-m mt-3 text-forest">{person.name}</h3>
              <p className="type-small mt-2 text-ink-soft">{person.role}</p>
            </motion.li>
          ))}
        </ul>
        <p className="type-lead mt-8 max-w-[40rem] text-forest md:mt-12">
          {disciplines.collective}
        </p>
      </Container>
    </section>
  );
}
