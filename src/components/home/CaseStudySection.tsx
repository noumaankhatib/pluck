"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { caseStudy } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { homeSections } from "@/content/home-sections";
import { motionEase } from "@/lib/motion";

/** Counts a metric like "$4.7m" or "100+" up from zero once it's on screen. */
function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!node || !inView || reduce || !match) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration: 1.4,
      delay,
      ease: motionEase,
      onUpdate: (v) => {
        node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, delay]);

  return <span ref={ref}>{value}</span>;
}

export function CaseStudySection() {
  const reduce = useReducedMotion();

  /* Flow metrics (Spend → Leads → Quoted → Sales) and the return payoff */
  const flowMetrics = caseStudy.metrics.slice(0, 4);
  const returnMetric = caseStudy.metrics[4];

  return (
    <section
      className="relative bg-ivory py-[var(--section-space-loose)]"
      aria-labelledby="case-heading"
    >
      <Container>
        <div className="grid gap-8 md:gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <SectionLabel index={homeSections.caseStudy.index} className="mb-5">
              {homeSections.caseStudy.name}
            </SectionLabel>
            <p className="type-eyebrow text-copper">{caseStudy.client}</p>
            <Reveal>
              <h2 id="case-heading" className="type-display-l mt-3 text-forest">
                {caseStudy.headline}
              </h2>
            </Reveal>
            <p className="type-display-m mt-5 !font-normal italic text-forest/80">
              {caseStudy.supporting}
            </p>
          </div>

          <div className="md:max-w-[38rem] lg:col-span-5 lg:col-start-8 lg:max-w-none">
            <p className="type-eyebrow flex items-center gap-3 text-ink-soft">
              <span className="h-px w-6 bg-copper" aria-hidden />
              {caseStudy.timeline}
            </p>
            <p className="type-body mt-4 text-charcoal/85">{caseStudy.context}</p>
            <p className="type-body mt-3 text-ink-soft">{caseStudy.workDescription}</p>
          </div>
        </div>

        {/* Commercial chain: Spend → Leads → Quoted → Sales */}
        <div className="mt-12 md:mt-16">
          <ol className="grid grid-cols-2 gap-px border border-forest/10 bg-forest/10 md:grid-cols-4">
            {flowMetrics.map((metric, i) => (
              <motion.li
                key={metric.label}
                className="relative bg-ivory px-5 py-6 sm:px-6 md:px-8 md:py-9"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.55, ease: motionEase, delay: reduce ? 0 : i * 0.12 }}
              >
                <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-soft">
                  <span className="tabular-nums text-copper">{String(i + 1).padStart(2, "0")}</span>
                  {metric.label}
                </p>
                <p className="font-display mt-3 text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] font-medium leading-none tracking-[-0.02em] tabular-nums text-forest">
                  <CountUp value={metric.value} delay={i * 0.12} />
                </p>

                {/* Connector arrow — desktop only */}
                {i < 3 && (
                  <div
                    className="absolute -right-[7px] top-1/2 z-10 hidden h-3.5 w-3.5 -translate-y-1/2 items-center justify-center bg-ivory text-copper md:flex"
                    aria-hidden
                  >
                    <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                      <path
                        d="M0.5 5.5H5.5M3 2L6 5.5L3 9"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </motion.li>
            ))}
          </ol>

          {/* Return metric — the dark commercial payoff */}
          <motion.div
            className="surface-ink"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: motionEase, delay: reduce ? 0 : 0.45 }}
          >
            <div className="grid gap-3 px-5 py-8 sm:px-8 md:grid-cols-12 md:items-center md:gap-8 md:px-12 md:py-12">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ivory/65 md:col-span-3">
                {returnMetric.label}
              </p>
              <p className="font-display text-[clamp(2rem,1.3rem+3vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ivory md:col-span-9">
                {returnMetric.value}
              </p>
            </div>
          </motion.div>

          <div className="mt-8 flex">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
