"use client";

import { type RefObject, useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap/register";

export function useSearchChapterAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();

    const headline = section.querySelector<HTMLElement>("[data-search-headline]");
    const lead = section.querySelector<HTMLElement>("[data-search-lead]");
    const label = section.querySelector<HTMLElement>("[data-search-label]");
    const scene = section.querySelector<HTMLElement>("[data-search-scene]");
    const board = section.querySelector<HTMLElement>("[data-search-board]");
    const rail = section.querySelector<HTMLElement>("[data-search-rail]");

    const ctx = gsap.context(() => {
      const show = () => {
        gsap.set([label, headline, lead, board, rail], {
          opacity: 1,
          y: 0,
          x: 0,
        });
        if (scene) gsap.set(scene, { y: 0 });
      };

      if (reducedMotion) {
        show();
        return;
      }

      if (label) gsap.set(label, { opacity: 0, y: 10 });
      if (headline) gsap.set(headline, { opacity: 0, y: 22 });
      if (lead) gsap.set(lead, { opacity: 0, y: 14 });
      if (board) gsap.set(board, { opacity: 0, y: 28 });
      if (rail) gsap.set(rail, { opacity: 0, y: 8 });

      const enter = gsap.timeline({
        scrollTrigger: {
          id: "search-chapter-enter",
          trigger: section,
          start: "top 86%",
          end: "top 42%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      if (label) enter.to(label, { opacity: 1, y: 0, duration: 0.5 }, 0);
      if (headline) enter.to(headline, { opacity: 1, y: 0, duration: 0.65 }, 0.05);
      if (lead) enter.to(lead, { opacity: 1, y: 0, duration: 0.55 }, 0.1);
      if (rail) enter.to(rail, { opacity: 1, y: 0, duration: 0.5 }, 0.14);
      if (board) enter.to(board, { opacity: 1, y: 0, duration: 0.7 }, 0.08);
    }, section);

    return () => {
      ScrollTrigger.getById("search-chapter-enter")?.kill();
      ctx.revert();
    };
  }, [sectionRef, reducedMotion]);
}
