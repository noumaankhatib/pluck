"use client";

import { type RefObject, useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap/register";

function applyQuestionState(questions: HTMLElement[], index: number) {
  questions.forEach((el, i) => {
    el.classList.toggle("plain-chapter__question--active", i <= index);
    el.classList.toggle("plain-chapter__question--current", i === index);
  });
}

export function usePlainEnglishChapterAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
  onActiveChange: (index: number) => void,
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();

    const label = section.querySelector<HTMLElement>("[data-plain-label]");
    const introLines = section.querySelectorAll<HTMLElement>("[data-plain-intro-line]");
    const questions = section.querySelectorAll<HTMLElement>("[data-plain-question]");
    const thread = section.querySelector<HTMLElement>("[data-plain-thread]");
    const aside = section.querySelector<HTMLElement>("[data-plain-aside]");
    const bridge = section.querySelector<HTMLElement>("[data-plain-bridge]");
    const climax = section.querySelector<HTMLElement>("[data-plain-climax]");
    const rule = section.querySelector<HTMLElement>("[data-plain-rule]");
    const glow = section.querySelector<HTMLElement>("[data-plain-aside-glow]");

    const setActive = (index: number) => {
      const clamped = Math.min(questions.length - 1, Math.max(0, index));
      applyQuestionState(Array.from(questions), clamped);
      onActiveChange(clamped);
      if (thread && questions.length) {
        gsap.to(thread, {
          scaleY: (clamped + 1) / questions.length,
          duration: reducedMotion ? 0 : 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      }
      climax?.classList.toggle("plain-chapter__climax--peak", clamped === questions.length - 1);
      aside?.classList.toggle("plain-chapter__aside--lit", clamped >= 2);
      if (glow) {
        gsap.to(glow, {
          opacity: clamped === questions.length - 1 ? 1 : 0.25 + (clamped / questions.length) * 0.35,
          duration: reducedMotion ? 0 : 0.38,
          ease: "power2.out",
          overwrite: true,
        });
      }
      if (bridge && !reducedMotion) {
        gsap.to(bridge, {
          opacity: 0.72 + (clamped / questions.length) * 0.28,
          y: 0,
          duration: 0.32,
          overwrite: true,
        });
      }
    };

    const ctx = gsap.context(() => {
      const showAll = () => {
        gsap.set([label, aside, bridge, climax, rule, glow], {
          opacity: 1,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        });
        gsap.set(introLines, { opacity: 1, y: 0 });
        gsap.set(questions, { opacity: 1, y: 0 });
        if (thread) gsap.set(thread, { scaleY: 1 });
        setActive(questions.length - 1);
      };

      if (reducedMotion) {
        showAll();
        return;
      }

      gsap.set(label, { opacity: 0, y: 10 });
      gsap.set(introLines, { opacity: 0, y: 8 });
      gsap.set(questions, { opacity: 1, y: 6 });
      if (thread) gsap.set(thread, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(aside, { opacity: 0, y: 8 });
      gsap.set(bridge, { opacity: 0, y: 6 });
      gsap.set(climax, { opacity: 0, y: 8 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(glow, { opacity: 0 });
      setActive(0);

      const enter = gsap.timeline({
        scrollTrigger: {
          id: "plain-chapter-enter",
          trigger: section,
          start: "top 86%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      if (label) enter.to(label, { opacity: 1, y: 0, duration: 0.4 }, 0);
      if (aside) enter.to(aside, { opacity: 1, y: 0, duration: 0.42 }, 0.04);
      if (rule) enter.to(rule, { scaleX: 1, duration: 0.48, ease: "power2.out" }, 0.08);
      if (introLines.length) {
        enter.to(introLines, { opacity: 1, y: 0, duration: 0.44, stagger: 0.06 }, 0.06);
      }
      if (bridge) enter.to(bridge, { opacity: 1, y: 0, duration: 0.42 }, 0.12);
      if (climax) enter.to(climax, { opacity: 1, y: 0, duration: 0.48 }, 0.16);

      if (questions.length) {
        enter.to(
          questions,
          { opacity: 1, y: 0, duration: 0.38, stagger: 0.045 },
          0.1,
        );
      }

      const list = section.querySelector<HTMLElement>("[data-plain-questions]");
      if (list && questions.length) {
        ScrollTrigger.create({
          id: "plain-chapter-progress",
          trigger: list,
          start: "top 80%",
          end: "bottom 38%",
          scrub: 0.28,
          onUpdate(self) {
            const idx = Math.min(
              questions.length - 1,
              Math.max(0, Math.floor(self.progress * questions.length)),
            );
            setActive(idx);
          },
        });
      }

      questions.forEach((q) => {
        q.addEventListener("click", () => {
          const idx = Number(q.getAttribute("data-plain-question-index"));
          if (!Number.isNaN(idx)) setActive(idx);
        });
        q.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const idx = Number(q.getAttribute("data-plain-question-index"));
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      });
    }, section);

    return () => {
      ScrollTrigger.getById("plain-chapter-enter")?.kill();
      ScrollTrigger.getById("plain-chapter-progress")?.kill();
      ctx.revert();
    };
  }, [sectionRef, reducedMotion, onActiveChange]);
}
