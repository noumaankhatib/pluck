"use client";

import { motion, useReducedMotion } from "framer-motion";
import { qualification } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { motionEase } from "@/lib/motion";

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

export function QualificationSection() {
  const reduce = useReducedMotion();
  const words = qualification.centerStatement.split(" ");
  const questionLast = words.pop();
  const questionLead = words.join(" ");

  return (
    <section
      className="bg-ivory pt-[var(--section-space-loose)]"
      aria-labelledby="qual-heading"
    >
      <Container>
        <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: headline + context */}
          <div className="md:max-w-[36rem] lg:col-span-5 lg:max-w-none lg:self-start">
            <SectionLabel index={homeSections.qualification.index} className="mb-5">
              {homeSections.qualification.name}
            </SectionLabel>
            <h2 id="qual-heading" className="type-display-l text-forest">
              {qualification.headline}
            </h2>
            <p className="type-lead mt-5 max-w-[30rem] text-ink-soft md:mt-6">
              {qualification.intro}
            </p>
          </div>

          {/* Right: criteria */}
          <div className="lg:col-span-7">
            <ul
              className="grid grid-cols-1 border-t border-forest/12 sm:grid-cols-2 sm:gap-x-10"
              aria-label="Qualification criteria"
            >
              {qualification.criteria.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex gap-4 border-b border-forest/12 py-5 md:py-7"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.5, ease: motionEase, delay: reduce ? 0 : (i % 2) * 0.1 }}
                >
                  <div className="mt-1 shrink-0">
                    <CriterionIcon index={i} />
                  </div>
                  <div>
                    <p className="type-title text-forest">{item}</p>
                    <p className="type-small mt-1.5 text-ink-soft">
                      {CRITERION_DESCRIPTIONS[i]}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Industry examples */}
            <motion.div
              className="mt-10 md:mt-12"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.5, ease: motionEase }}
            >
              <p className="type-body max-w-[34rem] text-ink-soft">
                {qualification.industriesIntro}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Example industries">
                {qualification.industries.map((industry) => (
                  <li
                    key={industry}
                    className="border border-forest/20 bg-surface/50 px-3 py-2 font-mono text-[0.75rem] text-forest"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* The self-selection question — the bridge into Plain English */}
        <motion.div
          className="mt-[clamp(3.5rem,2.5rem+4vw,6rem)] flex flex-col items-center pb-[clamp(2.5rem,2rem+2vw,3.5rem)] text-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: motionEase }}
        >
          <p className="font-display text-[clamp(2.25rem,1.3rem+4vw,4.75rem)] font-medium leading-[1.04] tracking-[-0.02em] text-balance text-forest">
            {questionLead}{" "}
            <span className="italic text-copper">{questionLast}</span>
          </p>
          <motion.span
            className="mt-8 block h-14 w-px origin-top bg-copper md:h-20"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: motionEase, delay: 0.3 }}
            aria-hidden
          />
        </motion.div>
      </Container>
    </section>
  );
}
