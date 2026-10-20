"use client";

import { type RefObject, useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap/register";

export function useClosingChapterAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();

    const label = section.querySelector<HTMLElement>("[data-closing-label]");
    const heading = section.querySelector<HTMLElement>("[data-closing-heading]");
    const paragraphs = section.querySelectorAll<HTMLElement>("[data-closing-paragraph]");
    const thread = section.querySelector<HTMLElement>("[data-closing-thread]");
    const threadSweep = section.querySelector<HTMLElement>("[data-closing-thread-sweep]");
    const topRule = section.querySelector<HTMLElement>("[data-closing-top-rule]");
    const climax = section.querySelector<HTMLElement>("[data-closing-climax]");
    const cta = section.querySelector<HTMLElement>("[data-closing-cta]");
    const secondary = section.querySelector<HTMLElement>("[data-closing-secondary]");
    const bg = section.querySelector<HTMLElement>("[data-closing-bg]");

    const ctx = gsap.context(() => {
      const showAll = () => {
        gsap.set([label, heading, climax, cta, secondary, topRule], { opacity: 1, y: 0, scaleX: 1, scaleY: 1 });
        gsap.set(paragraphs, { opacity: 1, y: 0 });
        if (thread) gsap.set(thread, { scaleY: 1 });
        if (threadSweep) gsap.set(threadSweep, { scaleY: 1, opacity: 0 });
        if (bg) gsap.set(bg, { y: 0 });
      };

      if (reducedMotion) {
        showAll();
        return;
      }

      gsap.set(label, { opacity: 0, y: 10 });
      gsap.set(heading, { opacity: 0, y: 14 });
      gsap.set(paragraphs, { opacity: 0, y: 12 });
      gsap.set(thread, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(threadSweep, { scaleY: 0, opacity: 0.85, transformOrigin: "top center" });
      gsap.set(topRule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(climax, { opacity: 0, y: 18 });
      gsap.set(cta, { opacity: 0, y: 14 });
      gsap.set(secondary, { opacity: 0, y: 8 });

      const enter = gsap.timeline({
        scrollTrigger: {
          id: "closing-chapter-enter",
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      if (topRule) enter.to(topRule, { scaleX: 1, duration: 0.55, ease: "power2.out" }, 0);
      if (label) enter.to(label, { opacity: 1, y: 0, duration: 0.4 }, 0.04);
      if (heading) enter.to(heading, { opacity: 1, y: 0, duration: 0.48 }, 0.1);
      if (paragraphs.length) {
        enter.to(paragraphs, { opacity: 1, y: 0, duration: 0.42, stagger: 0.07 }, 0.16);
      }
      if (thread) {
        enter.to(thread, { scaleY: 1, duration: 0.65, ease: "power2.inOut" }, 0.22);
      }
      if (threadSweep) {
        enter.to(
          threadSweep,
          { scaleY: 1, duration: 0.5, ease: "power2.out" },
          0.28,
        );
        enter.to(threadSweep, { opacity: 0, duration: 0.35, ease: "power2.in" }, 0.62);
      }
      if (climax) enter.to(climax, { opacity: 1, y: 0, duration: 0.52 }, 0.52);
      if (cta) enter.to(cta, { opacity: 1, y: 0, duration: 0.44 }, 0.62);
      if (secondary) enter.to(secondary, { opacity: 1, y: 0, duration: 0.38 }, 0.7);

      if (bg) {
        gsap.to(bg, {
          y: "-3%",
          ease: "none",
          scrollTrigger: {
            id: "closing-chapter-parallax",
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, section);

    return () => {
      ScrollTrigger.getById("closing-chapter-enter")?.kill();
      ScrollTrigger.getById("closing-chapter-parallax")?.kill();
      ctx.revert();
    };
  }, [sectionRef, reducedMotion]);
}
