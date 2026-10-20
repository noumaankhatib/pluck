"use client";

import { type RefObject, useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap/register";

const STAGE_COUNT = 4;

function setCardStates(cards: HTMLElement[], activeIndex: number) {
  cards.forEach((card, i) => {
    card.classList.toggle("hww-card--active", i === activeIndex);
    card.classList.toggle("hww-card--done", i < activeIndex);
  });
}

export function useHowWeWorkChapterAnimation(
  rootRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    ensureGsapPlugins();

    const hero = root.querySelector<HTMLElement>("[data-hww-hero]");
    const heroRule = root.querySelector<HTMLElement>("[data-hww-hero-rule]");
    const heroWords = root.querySelectorAll<HTMLElement>("[data-hww-heading-word]");
    const heroIntro = root.querySelector<HTMLElement>("[data-hww-hero-intro]");
    const heroPills = root.querySelectorAll<HTMLElement>("[data-hww-stage-pill]");
    const heroProgress = root.querySelector<HTMLElement>("[data-hww-hero-progress]");
    const process = root.querySelector<HTMLElement>("[data-hww-process]");
    const processIntro = root.querySelector<HTMLElement>("[data-hww-process-intro]");
    const cards = root.querySelectorAll<HTMLElement>("[data-hww-card]");
    const connectorFill = root.querySelector<HTMLElement>("[data-hww-connector-fill]");
    const connectorFillV = root.querySelector<HTMLElement>("[data-hww-connector-fill-v]");
    const cycle = root.querySelector<HTMLElement>("[data-hww-cycle]");
    const cycleLoop = root.querySelector<SVGPathElement>("[data-hww-cycle-loop]");
    const closing = root.querySelector<HTMLElement>("[data-hww-closing]");
    const closingBody = root.querySelector<HTMLElement>("[data-hww-closing-body]");
    const closingClimax = root.querySelector<HTMLElement>("[data-hww-closing-climax]");
    const closingCta = root.querySelector<HTMLElement>("[data-hww-closing-cta]");
    const closingDivider = root.querySelector<HTMLElement>("[data-hww-closing-divider]");

    const emit = (index: number) => {
      const clamped = Math.min(STAGE_COUNT - 1, Math.max(0, index));
      setCardStates(Array.from(cards), clamped);
      const progress = (clamped + 1) / STAGE_COUNT;
      if (connectorFill) gsap.set(connectorFill, { scaleX: progress });
      if (connectorFillV) {
        gsap.set(connectorFillV, {
          scaleY: progress,
          transformOrigin: "top center",
        });
      }
    };

    const ctx = gsap.context(() => {
      const showAll = () => {
        gsap.set(
          [
            heroRule,
            heroIntro,
            heroProgress,
            processIntro,
            cycle,
            closingBody,
            closingClimax,
            closingCta,
            closingDivider,
          ],
          { opacity: 1, y: 0, scaleX: 1, scaleY: 1 },
        );
        gsap.set(heroWords, { opacity: 1, y: 0 });
        gsap.set(heroPills, { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0 });
        if (cycleLoop) gsap.set(cycleLoop, { strokeDashoffset: 0, opacity: 1 });
        emit(STAGE_COUNT - 1);
      };

      if (reducedMotion) {
        showAll();
        return;
      }

      gsap.set(heroRule, { scaleX: 0, opacity: 0.7, transformOrigin: "left center" });
      gsap.set(heroWords, { opacity: 0, y: 14 });
      gsap.set(heroIntro, { opacity: 0, y: 12 });
      gsap.set(heroPills, { opacity: 0, y: 10 });
      gsap.set(heroProgress, { scaleX: 0, opacity: 0, transformOrigin: "left center" });
      gsap.set(processIntro, { opacity: 0, y: 12 });
      gsap.set(cards, { opacity: 0, y: 22 });
      gsap.set([connectorFill, connectorFillV], { scaleX: 0, scaleY: 0, transformOrigin: "left top" });
      gsap.set(cycle, { opacity: 0, y: 10 });
      if (cycleLoop) {
        const len = cycleLoop.getTotalLength();
        gsap.set(cycleLoop, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      }
      gsap.set(closingDivider, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(closingBody, { opacity: 0, y: 14 });
      gsap.set(closingClimax, { opacity: 0, y: 16 });
      gsap.set(closingCta, { opacity: 0, y: 10 });
      emit(0);

      if (hero) {
        const heroEnter = gsap.timeline({
          scrollTrigger: {
            id: "hww-hero-enter",
            trigger: hero,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });
        if (heroRule) heroEnter.to(heroRule, { scaleX: 1, opacity: 1, duration: 0.55 }, 0);
        if (heroWords.length) {
          heroEnter.to(heroWords, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.08);
        }
        if (heroIntro) heroEnter.to(heroIntro, { opacity: 1, y: 0, duration: 0.55 }, 0.22);
        if (heroPills.length) {
          heroEnter.to(heroPills, { opacity: 1, y: 0, duration: 0.42, stagger: 0.1 }, 0.32);
        }
        if (heroProgress) {
          heroEnter.to(heroProgress, { opacity: 1, scaleX: 1, duration: 0.75, ease: "power2.inOut" }, 0.48);
        }
      }

      if (process) {
        if (processIntro) {
          gsap.to(processIntro, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              id: "hww-process-intro",
              trigger: processIntro,
              start: "top 86%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }

        cards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            delay: i * 0.04,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        });

        ScrollTrigger.create({
          id: "hww-process-scrub",
          trigger: process,
          start: "top 55%",
          end: "bottom 35%",
          scrub: 0.35,
          onUpdate(self) {
            const idx = Math.min(
              STAGE_COUNT - 1,
              Math.max(0, Math.floor(self.progress * STAGE_COUNT)),
            );
            emit(idx);
          },
        });
      }

      if (cycle) {
        const cycleTl = gsap.timeline({
          scrollTrigger: {
            id: "hww-cycle",
            trigger: cycle,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        });
        cycleTl.to(cycle, { opacity: 1, y: 0, duration: 0.45 }, 0);
        if (cycleLoop) {
          cycleTl.to(cycleLoop, { strokeDashoffset: 0, opacity: 1, duration: 0.9, ease: "power2.inOut" }, 0.1);
        }
      }

      if (closing) {
        const closeTl = gsap.timeline({
          scrollTrigger: {
            id: "hww-closing",
            trigger: closing,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });
        if (closingDivider) closeTl.to(closingDivider, { scaleX: 1, duration: 0.5 }, 0);
        if (closingBody) closeTl.to(closingBody, { opacity: 1, y: 0, duration: 0.5 }, 0.08);
        if (closingClimax) {
          const words = closingClimax.querySelectorAll<HTMLElement>("[data-hww-climax-part]");
          gsap.set(words, { opacity: 0, y: 12 });
          closeTl.to(words, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0.18);
        }
        if (closingCta) closeTl.to(closingCta, { opacity: 1, y: 0, duration: 0.42 }, 0.38);
      }
    }, root);

    return () => {
      [
        "hww-hero-enter",
        "hww-process-intro",
        "hww-process-scrub",
        "hww-cycle",
        "hww-closing",
      ].forEach((id) => ScrollTrigger.getById(id)?.kill());
      ctx.revert();
    };
  }, [rootRef, reducedMotion]);
}
