"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/content/home";
import { HeroVideoLoader } from "@/components/home/HeroVideoLoader";

/** Web delivery encode (~3MB, faststart). Master: hero-section-background-master.mp4 */
const HERO_VIDEO = "/videos/hero-section-background.web.mp4";

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

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-chapter hero-viewport relative isolate flex mt-[var(--header-h)] h-[calc(100dvh-var(--header-h))] max-h-[calc(100dvh-var(--header-h))] w-full flex-col overflow-hidden bg-forest"
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
        <div className="hero-copy-zone grid min-h-0 flex-1 grid-cols-1 items-center lg:grid-cols-12 lg:gap-x-8">
          <div className="min-w-0 lg:col-span-8 lg:col-start-1">
            <div className="hero-copy-stack">
              <h1
                ref={headlineRef}
                id="hero-heading"
                className="hero-headline hero-headline--viewport font-display font-normal"
              >
                <span className="sr-only">{hero.headline}</span>
                <span data-hero-line className="block">
                  <span data-hero-line-inner className="hero-reveal block" style={{ "--d": "0.15s" } as React.CSSProperties}>
                    There&apos;s{" "}
                    <span className="hero-headline__emphasis">business</span>
                  </span>
                </span>
                <span data-hero-line className="block">
                  <span data-hero-line-inner className="hero-reveal block" style={{ "--d": "0.3s" } as React.CSSProperties}>
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
                  <span data-hero-sub-inner className="hero-reveal block" style={{ "--d": "0.6s" } as React.CSSProperties}>
                    {hero.subheading}
                  </span>
                </span>
              </p>

              <div
                ref={accentRef}
                data-hero-accent
                className="hero-accent-rule hero-reveal mt-3 h-px w-14 origin-left bg-gradient-to-r from-[#e69a61] via-[#e69a61]/70 to-transparent sm:mt-3.5 sm:w-16"
                aria-hidden
              />

              <p
                ref={sublineRef}
                className="hero-body-copy hero-body-copy--viewport hero-reveal mt-3 sm:mt-3.5"
                style={{ "--d": "0.85s" } as React.CSSProperties}
              >
                {hero.subline}
              </p>

              <div ref={ctaRef} className="hero-reveal mt-5 sm:mt-6" style={{ "--d": "1.1s" } as React.CSSProperties}>
                <motion.div
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.992 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                >
                  <Link
                    href="/#contact"
                    className="hero-cta cta-glass"
                  >
                    Talk to us
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
