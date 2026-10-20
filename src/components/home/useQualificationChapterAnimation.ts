"use client";

import { type RefObject, useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap/register";

function setCriterionActive(el: HTMLElement | null, active: boolean) {
  if (!el) return;
  el.classList.toggle("qual-chapter__criterion--active", active);
}

export function useQualificationChapterAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();

    const label = section.querySelector<HTMLElement>("[data-qual-label]");
    const headline = section.querySelector<HTMLElement>("[data-qual-headline]");
    const intro = section.querySelector<HTMLElement>("[data-qual-intro]");
    const industriesBlock = section.querySelector<HTMLElement>("[data-qual-industries-block]");
    const industriesIntro = section.querySelector<HTMLElement>("[data-qual-industries-intro]");
    const industryTags = section.querySelectorAll<HTMLElement>("[data-qual-industry-tag]");
    const criteriaPanel = section.querySelector<HTMLElement>("[data-qual-criteria-panel]");
    const criteria = section.querySelectorAll<HTMLElement>("[data-qual-criterion]");
    const checkPaths = section.querySelectorAll<SVGPathElement>("[data-qual-check-path]");
    const signalBridge = section.querySelector<HTMLElement>("[data-qual-signal-bridge]");
    const signalCriteria = section.querySelector<HTMLElement>("[data-qual-signal-criteria]");

    const ctx = gsap.context(() => {
      const show = () => {
        gsap.set([label, headline, intro, industriesBlock, industriesIntro, criteriaPanel], {
          opacity: 1,
          y: 0,
        });
        gsap.set(criteria, { opacity: 1, y: 0 });
        gsap.set(industryTags, { opacity: 1, scale: 1 });
        if (signalBridge) gsap.set(signalBridge, { scaleX: 1 });
        if (signalCriteria) gsap.set(signalCriteria, { scaleY: 1 });
        checkPaths.forEach((path) => gsap.set(path, { strokeDashoffset: 0 }));
        criteria.forEach((c) => setCriterionActive(c, true));
      };

      if (reducedMotion) {
        show();
        return;
      }

      gsap.set([label, headline, intro], { opacity: 0, y: 12 });
      gsap.set(industriesBlock, { opacity: 0, y: 10 });
      gsap.set(industriesIntro, { opacity: 0, y: 8 });
      gsap.set(industryTags, { opacity: 0, scale: 0.98 });
      gsap.set(criteriaPanel, { opacity: 0, y: 8 });
      gsap.set(criteria, { opacity: 0, y: 10 });
      if (signalBridge) gsap.set(signalBridge, { scaleX: 0, transformOrigin: "left center" });
      if (signalCriteria) gsap.set(signalCriteria, { scaleY: 0, transformOrigin: "top center" });
      criteria.forEach((c) => setCriterionActive(c, false));
      checkPaths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      const enter = gsap.timeline({
        scrollTrigger: {
          id: "qual-chapter-enter",
          trigger: section,
          start: "top 84%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      let t = 0;
      if (label) enter.to(label, { opacity: 1, y: 0, duration: 0.4 }, t);
      if (headline) enter.to(headline, { opacity: 1, y: 0, duration: 0.52 }, t + 0.05);
      if (intro) enter.to(intro, { opacity: 1, y: 0, duration: 0.44 }, t + 0.1);
      t += 0.18;

      if (industriesBlock) enter.to(industriesBlock, { opacity: 1, y: 0, duration: 0.38 }, t);
      if (industriesIntro) enter.to(industriesIntro, { opacity: 1, y: 0, duration: 0.36 }, t + 0.04);
      if (industryTags.length) {
        enter.to(
          industryTags,
          { opacity: 1, scale: 1, duration: 0.32, stagger: 0.045 },
          t + 0.08,
        );
      }
      t += 0.28;

      if (signalBridge) {
        enter.to(signalBridge, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, t);
      }
      if (criteriaPanel) enter.to(criteriaPanel, { opacity: 1, y: 0, duration: 0.36 }, t + 0.06);

      criteria.forEach((row, i) => {
        const step = t + 0.14 + i * 0.09;
        const path = row.querySelector<SVGPathElement>("[data-qual-check-path]");
        const icon = row.querySelector<HTMLElement>("[data-qual-icon]");

        enter.call(() => setCriterionActive(row, true), undefined, step);
        enter.to(row, { opacity: 1, y: 0, duration: 0.38 }, step);
        if (icon) {
          enter.fromTo(icon, { scale: 0.92 }, { scale: 1, duration: 0.32, ease: "back.out(1.4)" }, step);
        }
        if (signalCriteria) {
          enter.to(
            signalCriteria,
            { scaleY: (i + 1) / criteria.length, duration: 0.28, ease: "power2.out" },
            step,
          );
        }
        if (path) {
          enter.to(path, { strokeDashoffset: 0, duration: 0.32, ease: "power2.out" }, step + 0.04);
        }
      });
    }, section);

    return () => {
      ScrollTrigger.getById("qual-chapter-enter")?.kill();
      ctx.revert();
    };
  }, [sectionRef, reducedMotion]);
}
