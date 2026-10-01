"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { hero } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HeroDiscoveryPath } from "@/components/home/HeroDiscoveryPath";
import { homeSections } from "@/content/home-sections";
import { motionEase, motionDurations } from "@/lib/motion";

const HERO_IMAGE = "/images/hero-discovery.png";

function splitHeadline(text: string): [string, string] {
  const dot = text.indexOf(". ");
  if (dot === -1) return [text, ""];
  return [text.slice(0, dot + 1), text.slice(dot + 2)];
}

function splitHeadlineLead(lead: string): [string, string] | null {
  const breakAt = lead.indexOf(" you're ");
  if (breakAt === -1) return null;
  return [lead.slice(0, breakAt), lead.slice(breakAt + 1)];
}

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeDesktop(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** Desktop gets the sticky, scroll-driven hero; smaller screens scroll straight past it. */
function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

function scrollProgressToStep(progress: number, stepCount: number): number {
  if (stepCount <= 1) return 0;
  const scaled = progress * (stepCount + 0.08);
  return Math.min(stepCount - 1, Math.max(0, Math.floor(scaled)));
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const [headlineLead, headlineClose] = useMemo(
    () => splitHeadline(hero.headline),
    [],
  );
  const headlineLeadLines = useMemo(
    () => splitHeadlineLead(headlineLead),
    [headlineLead],
  );

  const stepCount = hero.journey.length;

  const isDesktop = useIsDesktop();
  const inView = useInView(ref, { amount: 0.35 });

  /* Progress runs across the sticky phase only, so the last step lands as the hero releases */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-2%"]);
  /* Fill reaches each node exactly as its step activates */
  const pathProgress = useTransform(scrollYProgress, (v) =>
    Math.min(1, (v * (stepCount + 0.08)) / Math.max(1, stepCount - 1)),
  );

  /* Mobile/tablet: no sticky phase to scroll through, so the path plays itself while visible */
  const stepFill = useSpring(0, { stiffness: 90, damping: 22 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (isDesktop) setActiveStep(scrollProgressToStep(v, stepCount));
  });

  useEffect(() => {
    if (isDesktop || reduce || !inView) return;
    const id = window.setInterval(
      () => setActiveStep((s) => (s + 1) % stepCount),
      2600,
    );
    return () => window.clearInterval(id);
  }, [isDesktop, reduce, inView, stepCount]);

  useEffect(() => {
    stepFill.set(activeStep / Math.max(1, stepCount - 1));
  }, [activeStep, stepCount, stepFill]);

  return (
    <section
      ref={ref}
      className="relative bg-ivory lg:h-[calc(100svh-var(--header-h)+55vh)] lg:min-h-[calc(640px+55vh)]"
      aria-labelledby="hero-heading"
    >
      {/*
        Layout
        - Mobile: copy → photo → path
        - Tablet: copy → full, uncropped photo → path
        - Desktop: copy left; full, uncropped photo right at mid-height with the
          path set beneath it — nothing covers the objects
      */}
      <div className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center pb-[clamp(0.75rem,3svh,3rem)] md:grid md:grid-cols-12 md:content-center md:gap-x-6 lg:sticky lg:top-[var(--header-h)] lg:h-[calc(100svh-var(--header-h))] lg:min-h-[640px] lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] xl:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-0 lg:overflow-hidden lg:pb-0">
        <div className="hero-plate relative order-2 mx-[var(--gutter)] aspect-[21/10] overflow-hidden sm:aspect-[16/9] md:col-span-12 md:row-start-2 md:mt-10 md:aspect-[1024/516] lg:col-start-2 lg:row-start-2 lg:mx-0 lg:mt-0">
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={reduce ? undefined : { scale: imageScale, y: imageY }}
            aria-hidden
          >
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              priority
              className="object-cover object-[58%_45%] md:object-center"
              sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 48vw, calc(100vw - 2.5rem)"
            />
          </motion.div>
        </div>

        <div className="relative z-10 order-1 flex w-full flex-col justify-center px-[var(--gutter)] pb-5 pt-[clamp(0.75rem,3svh,3rem)] sm:pb-8 md:col-span-12 md:row-start-1 md:pb-0 lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:py-12 lg:pl-[max(var(--gutter),calc((100vw-var(--content-max))/2+var(--gutter)))] lg:pr-[clamp(2rem,4vw,4.5rem)]">
          <SectionLabel index={homeSections.hero.index} className="mb-3 sm:mb-5 lg:mb-7">
            {homeSections.hero.name}
          </SectionLabel>
          <motion.h1
            id="hero-heading"
            className="type-display-xl text-forest max-sm:text-[2.125rem]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.slow, ease: motionEase }}
          >
            {headlineLeadLines ? (
              <>
                <span className="block">{headlineLeadLines[0]}</span>
                <span className="block">{headlineLeadLines[1]}</span>
              </>
            ) : (
              <span className="block">{headlineLead}</span>
            )}
            {headlineClose ? (
              <span className="mt-1 block italic text-copper lg:mt-2">
                {headlineClose}
              </span>
            ) : null}
          </motion.h1>

          <motion.p
            className="type-lead mt-3 max-w-[30rem] text-ink-soft sm:mt-5 lg:mt-7"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: motionDurations.base,
              ease: motionEase,
              delay: 0.08,
            }}
          >
            {hero.subline}
          </motion.p>

          <motion.div
            className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-0 sm:mt-7 lg:mt-9"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16, duration: motionDurations.base }}
          >
            <Button href="/contact" className="min-h-12 px-8 tracking-[0.04em]">
              Talk to us
            </Button>
            <a
              href="#quality"
              className="group inline-flex min-h-11 items-center justify-center gap-2 text-[0.9375rem] font-medium text-forest/80 transition-colors hover:text-forest sm:justify-start"
            >
              Why the right leads matter
              <span
                className="transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden
              >
                ↓
              </span>
            </a>
          </motion.div>
        </div>

        {/* Discovery path — set into the page, not boxed: beneath the photo (a thread
            drops out of it into the first stage) at every size */}
        <div className="relative z-10 order-3 mt-5 px-[var(--gutter)] sm:mt-8 md:col-span-12 md:mt-10 md:row-start-3 lg:col-start-2 lg:row-start-3 lg:mt-10 lg:self-start lg:pl-[clamp(1.5rem,3vw,3rem)]">
          <HeroDiscoveryPath
            activeStep={activeStep}
            pathProgress={isDesktop ? pathProgress : stepFill}
            reduce={reduce}
            leadIn
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
