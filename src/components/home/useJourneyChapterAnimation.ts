"use client";

import { type RefObject, useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap/register";

export function useJourneyChapterAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();

    const label = section.querySelector<HTMLElement>("[data-journey-label]");
    const headline = section.querySelector<HTMLElement>("[data-journey-headline]");
    const enter = section.querySelector<HTMLElement>("[data-journey-enter]");
    const panel = section.querySelector<HTMLElement>("[data-journey-panel]");

    const ctx = gsap.context(() => {
      const show = () => {
        gsap.set([label, headline, enter, panel], { opacity: 1, y: 0 });
      };

      if (reducedMotion) {
        show();
        return;
      }

      gsap.set([label, headline, enter, panel], { opacity: 0, y: 16 });

      gsap
        .timeline({
          scrollTrigger: {
            id: "journey-chapter-enter",
            trigger: section,
            start: "top 88%",
            end: "top 52%",
            toggleActions: "play none none none",
          },
          defaults: { ease: "power3.out" },
        })
        .to(label, { opacity: 1, y: 0, duration: 0.48 }, 0)
        .to(headline, { opacity: 1, y: 0, duration: 0.62 }, 0.05)
        .to(enter, { opacity: 1, y: 0, duration: 0.68 }, 0.1)
        .to(panel, { opacity: 1, y: 0, duration: 0.55 }, 0.12);
    }, section);

    return () => {
      ScrollTrigger.getById("journey-chapter-enter")?.kill();
      ctx.revert();
    };
  }, [sectionRef, reducedMotion]);
}
