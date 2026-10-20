"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { hero } from "@/content/home";
import { HeroJourneyTimeline } from "@/components/home/HeroJourneyTimeline";
import { HeroVideoLoader } from "@/components/home/HeroVideoLoader";
import { ensureGsapPlugins, gsap } from "@/lib/gsap/register";

/** Web delivery encode (~3MB, faststart). Master: hero-background-pluck.mp4 */
const HERO_VIDEO = "/videos/hero-background-pluck.web.mp4";

export function HeroSection() {
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  const pathProgress = useMotionValue(reduce ? 1 : 0);
  const [activeStep, setActiveStep] = useState(reduce ? hero.journey.length - 1 : 0);

  useEffect(() => {
    if (reduce) return;

    const video = videoRef.current;
    if (!video) return;

    const markReady = () => setVideoReady(true);

    const syncReadyState = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        markReady();
      }
    };

    const tryPlay = () => {
      syncReadyState();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked — still show the loaded frame.
          syncReadyState();
        });
      }
    };

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("playing", markReady);
    video.addEventListener("error", markReady);

    syncReadyState();
    tryPlay();

    const revealFallback = window.setTimeout(markReady, 1500);

    return () => {
      window.clearTimeout(revealFallback);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("playing", markReady);
      video.removeEventListener("error", markReady);
    };
  }, [reduce]);

  useLayoutEffect(() => {
    if (reduce) {
      pathProgress.set(1);
      setActiveStep(hero.journey.length - 1);
      return;
    }

    ensureGsapPlugins();

    const section = sectionRef.current;
    const timeline = timelineRef.current;

    if (!section) return;

    const progressProxy = { p: 0 };
    const stepDuration = 1.28;

    const ctx = gsap.context(() => {
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
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#002a23]">
        {!reduce ? (
          <>
            <video
              ref={videoRef}
              className={`hero-video hero-video-focal absolute inset-0 h-full w-full object-cover ${videoReady ? "hero-video--ready" : ""}`}
              src={HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
            />
            <HeroVideoLoader show={!videoReady} />
          </>
        ) : (
          <div className="h-full w-full bg-forest" aria-hidden />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="hero-scrim-left hero-scrim-left--viewport absolute inset-y-0 left-0 w-[min(100%,32rem)] sm:w-[min(100%,38rem)] lg:w-[min(52%,42rem)]" />
        <div className="hero-scrim-top hero-scrim-top--viewport absolute inset-x-0 top-0 h-[min(18vh,8rem)]" />
        <div className="hero-scrim-timeline hero-scrim-timeline--viewport absolute inset-x-0 bottom-0" />
      </div>

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
                <span data-hero-line className="block">
                  <span data-hero-line-inner className="block">
                    There&apos;s{" "}
                    <span className="hero-headline__emphasis">business</span>
                  </span>
                </span>
                <span data-hero-line className="block">
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
                <span className="block">
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
                    className="hero-cta cta-glass"
                  >
                    Talk to us
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
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
              className="type-caption shrink-0 text-center tracking-[0.2em] text-ivory/58 sm:pb-0.5 sm:text-right"
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
