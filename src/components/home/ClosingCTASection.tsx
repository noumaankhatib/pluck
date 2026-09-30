"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { closing } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { motionDurations, motionEase } from "@/lib/motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";

export function ClosingCTASection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-5%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const separatorScale = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-charcoal"
      aria-labelledby="closing-heading"
    >
      {/* Cinematic background */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={reduce ? undefined : { y: imageY }}
        aria-hidden
      >
        <Image
          src="/images/hero-infrastructure.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          quality={75}
        />
        {/* Dark overlay — forest-tinted so brand colours survive */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/75 to-charcoal/90" />
        <div className="absolute inset-0 bg-forest/30 mix-blend-multiply" />
      </motion.div>

      {/* Copper top rule */}
      <div className="absolute left-0 right-0 top-0 h-px overflow-hidden bg-ivory/8">
        <motion.div
          className="h-full bg-copper/50"
          style={
            reduce
              ? { scaleX: 1, transformOrigin: "left" }
              : { scaleX: separatorScale, transformOrigin: "left" }
          }
        />
      </div>

      <Container className="relative z-10 flex min-h-[min(66svh,640px)] flex-col justify-between gap-14 py-[var(--section-space-loose)] md:min-h-[min(86svh,860px)]">

        {/* Top label */}
        <div>
          <SectionLabel index={homeSections.closing.index} tone="dark">
            {homeSections.closing.name}
          </SectionLabel>
          <Link
            href="/how-we-work"
            className="mt-2 inline-flex min-h-11 items-center text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-ivory/70 underline-offset-4 transition-colors hover:text-ivory hover:underline"
          >
            {closing.howWeWork}
          </Link>
        </div>

        {/* Main headline */}
        <motion.div style={reduce ? undefined : { y: textY }}>
          <motion.h2
            id="closing-heading"
            className="font-display max-w-5xl text-balance text-[clamp(3rem,1.5rem+6.5vw,7.5rem)] font-medium leading-[0.98] tracking-[-0.025em] text-ivory"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: motionDurations.slow, ease: motionEase }}
          >
            {closing.headline}
          </motion.h2>

          <motion.p
            className="type-lead mt-6 max-w-[30rem] text-ivory/85"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: motionDurations.base }}
          >
            Find commercially valuable opportunities for ambitious businesses.
          </motion.p>

          <motion.div
            className="mt-9 md:mt-10"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: motionDurations.base }}
          >
            <Link
              href={closing.ctaHref}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 bg-ivory px-10 py-3 font-sans text-[0.9375rem] font-medium tracking-[0.06em] text-forest transition-colors hover:bg-copper hover:text-ivory sm:w-auto"
            >
              {closing.cta}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

      </Container>
    </section>
  );
}
