"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { plainEnglish } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { motionEase } from "@/lib/motion";

/* A question "lights" once it crosses the reading line (~60% down the viewport) */
const readingLine = { once: true, margin: "0px 0px -40% 0px" } as const;

export function PlainEnglishSection() {
  const listRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();

  /* Signal thread down the questions */
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.6", "end 0.6"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className="surface-espresso relative py-[var(--section-space-loose)]"
      aria-labelledby="plain-heading"
    >
      <Container>
        <SectionLabel index={homeSections.plainEnglish.index} tone="dark" className="mb-8 md:mb-12">
          {homeSections.plainEnglish.name}
        </SectionLabel>
        <h2 id="plain-heading" className="sr-only">
          {plainEnglish.headline}
        </h2>

        <div className="grid gap-12 md:gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Questions — left column */}
          <div className="relative lg:col-span-6">
            <div className="absolute bottom-0 left-[3px] top-0 w-px bg-ivory/12" aria-hidden>
              <motion.div
                className="h-full w-full origin-top bg-copper"
                style={reduce ? undefined : { scaleY: lineProgress }}
              />
            </div>

            <ul ref={listRef} aria-label="Plain English questions">
              {plainEnglish.questions.map((q) => (
                <motion.li
                  key={q}
                  className="group relative flex items-baseline gap-5 border-b border-ivory/10 py-4 pl-0 md:py-5"
                  initial={reduce ? false : "dim"}
                  whileInView="lit"
                  viewport={readingLine}
                  variants={{ dim: { opacity: 0.4 }, lit: { opacity: 1 } }}
                  transition={{ duration: 0.5, ease: motionEase }}
                >
                  <motion.span
                    className="relative z-[1] block h-[7px] w-[7px] shrink-0 -translate-y-[0.15em] rounded-full"
                    variants={{
                      dim: { backgroundColor: "rgba(247,244,239,0.3)", scale: 1 },
                      lit: { backgroundColor: "var(--color-copper)", scale: 1.25 },
                    }}
                    transition={{ duration: 0.4 }}
                    aria-hidden
                  />
                  <span className="font-display text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] leading-snug text-ivory">
                    {q}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resolution — holds beside the questions on desktop */}
          <motion.div
            className="lg:sticky lg:top-[calc(50svh-6rem)] lg:col-span-5 lg:col-start-8 lg:self-start"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: motionEase }}
          >
            <span className="mb-6 block h-px w-12 bg-copper" aria-hidden />
            <p className="type-display-l text-ivory">{plainEnglish.climax}</p>
            <p className="type-lead mt-6 max-w-[28rem] text-ivory/80">
              We handle the data, tools, research and execution so you can focus on running your business.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
