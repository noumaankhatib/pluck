"use client";

import { type RefObject, useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap/register";

const DISCIPLINE_COUNT = 3;

function prepareLine(path: SVGPathElement) {
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  return length;
}

export type DisciplinesStoryState = {
  activeIndex: number;
  hubLit: boolean;
};

export function useDisciplinesChapterAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
  onStoryChange: (state: DisciplinesStoryState) => void,
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();

    const intro = section.querySelector<HTMLElement>("[data-disc-intro]");
    const profiles = section.querySelectorAll<HTMLElement>("[data-disc-profile]");
    const closing = section.querySelector<HTMLElement>("[data-disc-closing]");
    const diagram = section.querySelector<HTMLElement>("[data-disc-diagram]");
    const nodes = section.querySelectorAll<HTMLElement>("[data-disc-node]");
    const lines = section.querySelectorAll<SVGPathElement>("[data-disc-line]");
    const lineGlows = section.querySelectorAll<SVGPathElement>("[data-disc-line-glow]");
    const hubRing = section.querySelector<SVGElement>("[data-disc-hub-ring]");
    const hubCore = section.querySelector<SVGElement>("[data-disc-hub-core]");
    const objective = section.querySelector<HTMLElement>("[data-disc-objective]");

    const emit = (activeIndex: number, hubLit: boolean) => {
      onStoryChange({
        activeIndex: Math.min(DISCIPLINE_COUNT - 1, Math.max(0, activeIndex)),
        hubLit,
      });
    };

    const ctx = gsap.context(() => {
      const showAll = () => {
        gsap.set([intro, closing, diagram, objective], { opacity: 1, y: 0 });
        gsap.set(profiles, { opacity: 1, y: 0 });
        gsap.set(nodes, { opacity: 1, scale: 1 });
        gsap.set([hubRing, hubCore], { opacity: 1, scale: 1 });
        lines.forEach((line) => gsap.set(line, { strokeDashoffset: 0, opacity: 0.75 }));
        lineGlows.forEach((g) => gsap.set(g, { opacity: 0 }));
        emit(DISCIPLINE_COUNT - 1, true);
      };

      if (reducedMotion) {
        showAll();
        return;
      }

      gsap.set(intro, { opacity: 0, y: 14 });
      gsap.set(profiles, { opacity: 0, y: 16 });
      gsap.set(closing, { opacity: 0, y: 12 });
      gsap.set(diagram, { opacity: 0, y: 10 });
      gsap.set(nodes, { opacity: 0, scale: 0.9, transformOrigin: "center center" });
      gsap.set([hubRing, hubCore], { opacity: 0, scale: 0.65, transformOrigin: "center center" });
      gsap.set(objective, { opacity: 0, y: 8 });
      const lineLengths = Array.from(lines).map((line) => {
        const len = prepareLine(line);
        gsap.set(line, { opacity: 0.4 });
        return len;
      });
      lineGlows.forEach((g, i) => {
        const len = lineLengths[i] ?? prepareLine(g);
        gsap.set(g, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      });
      emit(0, false);

      const enter = gsap.timeline({
        scrollTrigger: {
          id: "disc-chapter-enter",
          trigger: section,
          start: "top 86%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      if (intro) enter.to(intro, { opacity: 1, y: 0, duration: 0.48 }, 0);
      if (diagram) enter.to(diagram, { opacity: 1, y: 0, duration: 0.44 }, 0.06);
      if (profiles.length) {
        enter.to(profiles, { opacity: 1, y: 0, duration: 0.42, stagger: 0.09 }, 0.12);
      }
      if (closing) enter.to(closing, { opacity: 1, y: 0, duration: 0.4 }, 0.28);

      if (diagram && lines.length) {
        const story = gsap.timeline({
          scrollTrigger: {
            id: "disc-chapter-story",
            trigger: diagram,
            start: "top 76%",
            end: "bottom 40%",
            scrub: 0.32,
            onUpdate(self) {
              const p = self.progress;
              const segment = 1 / (DISCIPLINE_COUNT + 0.85);
              if (p >= segment * DISCIPLINE_COUNT) {
                emit(DISCIPLINE_COUNT - 1, true);
                return;
              }
              const idx = Math.min(
                DISCIPLINE_COUNT - 1,
                Math.max(0, Math.floor(p / segment)),
              );
              emit(idx, false);
            },
          },
        });

        const segment = 1 / (DISCIPLINE_COUNT + 1);

        lines.forEach((line, i) => {
          const node = nodes[i];
          const glow = lineGlows[i];
          const t0 = i * segment;
          const tMid = t0 + segment * 0.42;
          const tPulse = t0 + segment * 0.52;

          if (node) {
            story.to(
              node,
              { opacity: 1, scale: 1, duration: segment * 0.4, ease: "power2.out" },
              t0,
            );
          }
          story.to(
            line,
            { strokeDashoffset: 0, opacity: 0.8, duration: segment * 0.62, ease: "none" },
            t0 + segment * 0.06,
          );
          if (glow) {
            story.to(
              glow,
              {
                strokeDashoffset: 0,
                opacity: 0.75,
                duration: segment * 0.28,
                ease: "power2.out",
              },
              tPulse,
            );
            story.to(glow, { opacity: 0, duration: segment * 0.2, ease: "power2.in" }, tPulse + segment * 0.22);
          }
          story.call(() => emit(i, false), undefined, tMid);
        });

        const hubStart = DISCIPLINE_COUNT * segment;
        if (hubRing) {
          story.to(hubRing, { opacity: 1, scale: 1, duration: segment * 0.48 }, hubStart);
        }
        if (hubCore) {
          story.to(hubCore, { opacity: 1, scale: 1, duration: segment * 0.42 }, hubStart + segment * 0.06);
        }
        if (objective) {
          story.to(objective, { opacity: 1, y: 0, duration: segment * 0.45 }, hubStart + segment * 0.1);
        }
        story.call(() => emit(DISCIPLINE_COUNT - 1, true), undefined, hubStart + segment * 0.38);
      }
    }, section);

    return () => {
      ScrollTrigger.getById("disc-chapter-enter")?.kill();
      ScrollTrigger.getById("disc-chapter-story")?.kill();
      ctx.revert();
    };
  }, [sectionRef, reducedMotion, onStoryChange]);
}
