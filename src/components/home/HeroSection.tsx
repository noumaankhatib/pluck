"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { useMotionValue, useReducedMotion } from "framer-motion";
import { motion } from "motion/react";
import { hero } from "@/content/home";
import { SiteNavBar } from "@/components/layout/SiteNavBar";
import { HeroJourneyTimeline } from "@/components/home/HeroJourneyTimeline";
import { ensureGsapPlugins, gsap } from "@/lib/gsap/register";

const HERO_VIDEO = "/videos/hero-background-pluck.mp4";

export function HeroSection() {
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  const pathProgress = useMotionValue(reduce ? 1 : 0);
  const [activeStep, setActiveStep] = useState(reduce ? hero.journey.length - 1 : 0);

  useLayoutEffect(() => {
    if (reduce) {
      pathProgress.set(1);
      setActiveStep(hero.journey.length - 1);
      return;
    }

    ensureGsapPlugins();

    const section = sectionRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const accent = accentRef.current;
    const subline = sublineRef.current;
    const cta = ctaRef.current;
    const timeline = timelineRef.current;
    const scrollCue = scrollCueRef.current;

    if (!section || !headline || !sub || !subline || !cta) return;

    const headlineInners = headline.querySelectorAll<HTMLElement>("[data-hero-line-inner]");
    const subInner = sub.querySelector<HTMLElement>("[data-hero-sub-inner]");
    const progressProxy = { p: 0 };
    const stepDuration = 1.28;

    const ctx = gsap.context(() => {
      gsap.set([subline, cta, timeline, scrollCue, accent], { opacity: 0 });
      gsap.set(headlineInners, { yPercent: 108, opacity: 0 });
      if (subInner) gsap.set(subInner, { yPercent: 110, opacity: 0 });
      gsap.set([subline], { y: 12 });
      gsap.set(cta, { y: 10 });
      if (accent) gsap.set(accent, { scaleX: 0, opacity: 0, transformOrigin: "left center" });
      if (timeline) gsap.set(timeline, { y: 8, opacity: 0 });
      if (scrollCue) gsap.set(scrollCue, { opacity: 0 });

      const open = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.12 });

      open.to(headlineInners, {
        yPercent: 0,
        opacity: 1,
        duration: 0.92,
        stagger: 0.12,
      });

      if (subInner) {
        open.to(
          subInner,
          { yPercent: 0, opacity: 1, duration: 0.78, ease: "power3.out" },
          "-=0.35",
        );
      } else {
        open.to(sub, { opacity: 1, duration: 0.5 }, "-=0.3");
      }

      if (accent) {
        open.to(accent, { opacity: 1, scaleX: 1, duration: 0.55, ease: "power2.inOut" }, "-=0.2");
      }

      open.to(subline, { y: 0, opacity: 1, duration: 0.72 }, "-=0.28");
      open.to(cta, { y: 0, opacity: 1, duration: 0.58 }, "-=0.42");

      if (timeline) {
        open.to(timeline, { y: 0, opacity: 1, duration: 0.62 }, "-=0.38");
      }

      if (scrollCue) {
        open.to(scrollCue, { opacity: 1, duration: 0.35 }, "-=0.32");
      }

      const journeyDuration = hero.journey.length * stepDuration;
      const pauseAtEnd = 1.75;
      const stepCount = hero.journey.length;

      const syncJourneyProgress = (p: number) => {
        const clamped = Math.min(1, Math.max(0, p));
        pathProgress.set(clamped);
        const idx =
          clamped >= 1
            ? stepCount - 1
            : Math.min(stepCount - 1, Math.floor(clamped * stepCount));
        setActiveStep(idx);
      };

      const runJourneyCycle = () => {
        progressProxy.p = 0;
        syncJourneyProgress(0);

        gsap.to(progressProxy, {
          p: 1,
          duration: journeyDuration,
          ease: "none",
          onUpdate: () => syncJourneyProgress(progressProxy.p),
          onComplete: () => {
            syncJourneyProgress(1);
            gsap.delayedCall(pauseAtEnd, runJourneyCycle);
          },
        });
      };

      gsap.delayedCall(1.05, runJourneyCycle);
    }, section);

    return () => ctx.revert();
  }, [reduce, pathProgress]);

  return (
    <section
      ref={sectionRef}
      className="hero-chapter hero-viewport relative isolate flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-forest"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0">
        {!reduce ? (
          <video
            ref={videoRef}
            className="hero-video hero-video-focal h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        ) : (
          <div className="h-full w-full bg-forest" aria-hidden />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="hero-scrim-left hero-scrim-left--viewport absolute inset-y-0 left-0 w-[min(100%,32rem)] sm:w-[min(100%,38rem)] lg:w-[min(52%,42rem)]" />
        <div className="hero-scrim-top hero-scrim-top--viewport absolute inset-x-0 top-0 h-[min(18vh,8rem)]" />
        <div className="hero-scrim-timeline hero-scrim-timeline--viewport absolute inset-x-0 bottom-0" />
      </div>

      <SiteNavBar variant="hero" />

      <div className="relative z-[2] mx-auto flex min-h-0 w-full max-w-[var(--content-max)] flex-1 flex-col px-[var(--gutter)]">
        <div className="h-[var(--header-h)] shrink-0" aria-hidden />

        <div className="hero-copy-zone grid min-h-0 flex-1 grid-cols-1 items-center lg:grid-cols-12 lg:gap-x-8">
          <div className="min-w-0 lg:col-span-5 lg:col-start-1 xl:col-span-5">
            <div className="hero-copy-stack">
              <h1
                ref={headlineRef}
                id="hero-heading"
                className="hero-headline hero-headline--viewport font-display font-normal"
              >
                <span className="sr-only">{hero.headline}</span>
                <span data-hero-line className="block overflow-hidden">
                  <span data-hero-line-inner className="block">
                    There&apos;s{" "}
                    <span className="hero-headline__emphasis">business</span>
                  </span>
                </span>
                <span data-hero-line className="block overflow-hidden">
                  <span data-hero-line-inner className="block">
                    you&apos;re{" "}
                    <span className="hero-headline__emphasis">missing.</span>
                  </span>
                </span>
              </h1>

              <p
                ref={subRef}
                className="hero-subheading hero-subheading--viewport mt-2 font-display font-medium sm:mt-2.5"
              >
                <span className="block overflow-hidden">
                  <span data-hero-sub-inner className="block">
                    {hero.subheading}
                  </span>
                </span>
              </p>

              <div
                ref={accentRef}
                data-hero-accent
                className="hero-accent-rule mt-3 h-px w-14 origin-left bg-gradient-to-r from-[#D8783E] via-[#D8783E]/70 to-transparent sm:mt-3.5 sm:w-16"
                aria-hidden
              />

              <p
                ref={sublineRef}
                className="hero-body-copy hero-body-copy--viewport mt-3 sm:mt-3.5"
              >
                {hero.subline}
              </p>

              <div ref={ctaRef} className="mt-4 sm:mt-5">
                <motion.div
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.992 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                >
                  <Link
                    href="/contact"
                    className="hero-cta inline-flex min-h-11 items-center justify-center bg-ivory px-8 py-3 text-sm font-medium tracking-[0.06em] text-forest shadow-[0_6px_20px_rgb(0_0_0/0.22)] transition-[background-color,color,box-shadow,transform] duration-300 ease-out hover:-translate-y-px hover:bg-[#FFF8EC] hover:text-charcoal hover:shadow-[0_10px_28px_rgb(0_0_0/0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D8783E] active:translate-y-0 sm:min-h-12 sm:px-9"
                  >
                    Talk to us
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="hidden min-h-0 lg:col-span-7 lg:block" aria-hidden />
        </div>

        <footer
          ref={timelineRef}
          className="hero-viewport__footer mt-1 shrink-0 px-2 py-1.5 sm:mt-2 sm:px-3 sm:py-2"
        >
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="min-w-0 flex-1">
              <HeroJourneyTimeline
                activeStep={activeStep}
                progress={pathProgress}
                reduce={reduce}
              />
            </div>
            <p
              ref={scrollCueRef}
              className="shrink-0 text-center font-mono text-[0.5625rem] uppercase tracking-[0.26em] text-ivory/45 sm:pb-0.5 sm:text-right sm:text-[0.625rem]"
              aria-hidden
            >
              Scroll
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
