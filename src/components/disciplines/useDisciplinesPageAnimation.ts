"use client";

import { type RefObject, useLayoutEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap/register";

const PROFILE_COUNT = 3;

function setProfileStates(cards: HTMLElement[], index: number, hubLit: boolean) {
  cards.forEach((card, i) => {
    card.classList.toggle("disc-page__profile--active", !hubLit && i === index);
    card.classList.toggle("disc-page__profile--done", hubLit || i < index);
  });
}

function setDiagramState(root: HTMLElement, index: number, hubLit: boolean) {
  const nodes = root.querySelectorAll<HTMLElement>("[data-disc-page-node]");
  const labels = root.querySelectorAll<HTMLElement>("[data-disc-page-label]");
  const objective = root.querySelector<HTMLElement>("[data-disc-page-objective]");
  const hubRing = root.querySelector<SVGElement>("[data-disc-page-hub-ring]");
  const hubCore = root.querySelector<SVGElement>("[data-disc-page-hub-core]");
  hubRing?.classList.toggle("disc-page__hub--lit", hubLit);
  hubCore?.classList.toggle("disc-page__hub--lit", hubLit);
  nodes.forEach((node, i) => {
    node.classList.toggle("disc-page__node--active", !hubLit && i === index);
    node.classList.toggle("disc-page__node--seen", hubLit || i <= index);
    node.classList.toggle("disc-page__node--joined", hubLit);
  });
  labels.forEach((label, i) => {
    label.classList.toggle("disc-page__label--active", !hubLit && i === index);
    label.classList.toggle("disc-page__label--lit", hubLit || i <= index);
  });
  objective?.classList.toggle("disc-page__objective--lit", hubLit);
}

function prepareLine(path: SVGPathElement) {
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  return length;
}

function pulseAlongPath(
  timeline: gsap.core.Timeline,
  path: SVGPathElement,
  signal: SVGCircleElement | null,
  at: number,
) {
  if (!signal) return;
  const length = path.getTotalLength();
  const proxy = { d: 0 };
  timeline.set(signal, { opacity: 0 }, at);
  timeline.to(
    proxy,
    {
      d: length,
      duration: 0.42,
      ease: "power2.inOut",
      onUpdate: () => {
        const pt = path.getPointAtLength(proxy.d);
        gsap.set(signal, { attr: { cx: pt.x, cy: pt.y }, opacity: 0.95 });
      },
      onComplete: () => gsap.set(signal, { opacity: 0 }),
    },
    at,
  );
}

export function useDisciplinesPageAnimation(
  rootRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    ensureGsapPlugins();

    const hero = root.querySelector<HTMLElement>("[data-disc-page-hero]");
    const heroEyebrow = root.querySelector<HTMLElement>("[data-disc-page-eyebrow]");
    const heroHeadline = root.querySelector<HTMLElement>("[data-disc-page-headline]");
    const heroBody = root.querySelector<HTMLElement>("[data-disc-page-hero-body]");
    const heroDiagram = root.querySelector<HTMLElement>("[data-disc-page-hero-diagram]");
    const profiles = root.querySelector<HTMLElement>("[data-disc-page-profiles]");
    const profileCards = root.querySelectorAll<HTMLElement>("[data-disc-page-profile]");
    const profileBars = root.querySelectorAll<HTMLElement>("[data-disc-page-profile-bar]");
    const threadH = root.querySelector<HTMLElement>("[data-disc-page-thread-h]");
    const threadV = root.querySelector<HTMLElement>("[data-disc-page-thread-v]");
    const bridge = root.querySelector<HTMLElement>("[data-disc-page-bridge]");
    const lines = root.querySelectorAll<SVGPathElement>("[data-disc-page-line]");
    const lineGlows = root.querySelectorAll<SVGPathElement>("[data-disc-page-line-glow]");
    const signals = root.querySelectorAll<SVGCircleElement>("[data-disc-page-signal]");
    const hubRing = root.querySelector<SVGElement>("[data-disc-page-hub-ring]");
    const hubCore = root.querySelector<SVGElement>("[data-disc-page-hub-core]");
    const conclusion = root.querySelector<HTMLElement>("[data-disc-page-conclusion]");
    const conclusionRule = root.querySelector<HTMLElement>("[data-disc-page-conclusion-rule]");
    const conclusionParas = root.querySelectorAll<HTMLElement>("[data-disc-page-conclusion-p]");
    const conclusionCta = root.querySelector<HTMLElement>("[data-disc-page-conclusion-cta]");

    const emit = (index: number, hubLit: boolean) => {
      const clamped = Math.min(PROFILE_COUNT - 1, Math.max(0, index));
      setProfileStates(Array.from(profileCards), clamped, hubLit);
      setDiagramState(root, clamped, hubLit);
      const progress = hubLit ? 1 : (clamped + 1) / PROFILE_COUNT;
      if (threadH) gsap.set(threadH, { scaleX: progress });
      if (threadV) gsap.set(threadV, { scaleY: progress });
      if (bridge) gsap.set(bridge, { scaleY: hubLit ? 1 : progress });
      lines.forEach((line, i) => {
        const len = line.getTotalLength();
        const lineProgress = hubLit ? 1 : Math.min(1, Math.max(0, progress * PROFILE_COUNT - i));
        gsap.set(line, {
          strokeDashoffset: len * (1 - lineProgress),
          opacity: 0.45 + lineProgress * 0.4,
        });
      });
    };

    const ctx = gsap.context(() => {
      const showAll = () => {
        gsap.set(
          [heroEyebrow, heroHeadline, heroBody, heroDiagram, conclusionRule, conclusionCta, bridge],
          { opacity: 1, y: 0, scaleX: 1, scaleY: 1 },
        );
        gsap.set(conclusionParas, { opacity: 1, y: 0 });
        gsap.set(profileCards, { opacity: 1, y: 0 });
        gsap.set(profileBars, { scaleX: 1 });
        gsap.set([hubRing, hubCore], { opacity: 1, scale: 1 });
        lines.forEach((l) => gsap.set(l, { strokeDashoffset: 0 }));
        emit(PROFILE_COUNT - 1, true);
      };

      if (reducedMotion) {
        showAll();
        return;
      }

      gsap.set(heroEyebrow, { y: 10 });
      gsap.set(heroHeadline, { y: 14 });
      gsap.set(heroBody, { y: 12 });
      gsap.set(heroDiagram, { y: 10 });
      gsap.set(profileCards, { opacity: 0, y: 12 });
      gsap.set(profileBars, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(conclusionParas, { opacity: 0, y: 12 });
      gsap.set(conclusionCta, { opacity: 0, y: 10 });
      gsap.set(conclusionRule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(bridge, { scaleY: 0, transformOrigin: "top center" });
      gsap.set([threadH, threadV], { scaleX: 0, scaleY: 0, transformOrigin: "left top" });
      gsap.set([hubRing, hubCore], { opacity: 0, scale: 0.75, transformOrigin: "center center" });
      signals.forEach((s) => gsap.set(s, { opacity: 0 }));
      const lengths = Array.from(lines).map((line) => {
        const len = prepareLine(line);
        gsap.set(line, { opacity: 0.35 });
        return len;
      });
      lineGlows.forEach((g, i) => {
        const len = lengths[i] ?? prepareLine(g);
        gsap.set(g, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      });
      emit(0, false);

      if (hero) {
        // Hero is in view on load — do not gate entrance on scroll.
        const heroTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.06,
        });
        if (heroEyebrow) heroTl.to(heroEyebrow, { y: 0, duration: 0.4 }, 0);
        if (heroHeadline) heroTl.to(heroHeadline, { y: 0, duration: 0.52 }, 0.06);
        if (heroBody) heroTl.to(heroBody, { y: 0, duration: 0.5 }, 0.14);
        if (heroDiagram) {
          heroTl.to(heroDiagram, { y: 0, duration: 0.48 }, 0.08);
          heroTl.to(hubRing, { opacity: 1, scale: 1, duration: 0.45 }, 0.3);
          heroTl.to(hubCore, { opacity: 1, scale: 1, duration: 0.4 }, 0.36);
          lines.forEach((line, i) => {
            const glow = lineGlows[i];
            const signal = signals[i];
            const len = lengths[i] ?? line.getTotalLength();
            const t = 0.26 + i * 0.14;
            heroTl.to(
              line,
              { strokeDashoffset: 0, opacity: 0.8, duration: 0.48, ease: "power2.inOut" },
              t,
            );
            if (glow) {
              heroTl.fromTo(
                glow,
                { strokeDashoffset: len, opacity: 0 },
                { strokeDashoffset: 0, opacity: 0.75, duration: 0.28, ease: "power2.out" },
                t + 0.38,
              );
              heroTl.to(glow, { opacity: 0, duration: 0.22, ease: "power2.in" }, t + 0.58);
            }
            pulseAlongPath(heroTl, line, signal ?? null, t + 0.4);
          });
          heroTl.add(() => setDiagramState(root, PROFILE_COUNT - 1, true), 0.75);
        }
      }

      profileCards.forEach((card, i) => {
        const bar = card.querySelector<HTMLElement>("[data-disc-page-profile-bar]");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            toggleActions: "play none none none",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });
        tl.to(card, { opacity: 1, y: 0, duration: 0.48 }, 0);
        if (bar) tl.to(bar, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, 0.08);
      });

      if (profiles) {
        ScrollTrigger.create({
          id: "disc-page-profiles-scrub",
          trigger: profiles,
          start: "top 48%",
          end: "bottom 38%",
          scrub: 0.28,
          onUpdate(self) {
            const p = self.progress;
            if (p >= 0.9) {
              emit(PROFILE_COUNT - 1, true);
              return;
            }
            const idx = Math.min(
              PROFILE_COUNT - 1,
              Math.max(0, Math.floor(p * PROFILE_COUNT)),
            );
            emit(idx, false);
          },
        });
      }

      if (conclusion) {
        const closeTl = gsap.timeline({
          scrollTrigger: {
            id: "disc-page-conclusion",
            trigger: conclusion,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });
        if (bridge) closeTl.to(bridge, { scaleY: 1, duration: 0.5, ease: "power2.inOut" }, 0);
        if (conclusionRule) closeTl.to(conclusionRule, { scaleX: 1, duration: 0.55 }, 0.06);
        if (conclusionParas.length) {
          closeTl.to(conclusionParas, { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, 0.12);
        }
        if (conclusionCta) closeTl.to(conclusionCta, { opacity: 1, y: 0, duration: 0.4 }, 0.3);
      }
    }, root);

    ScrollTrigger.refresh();

    return () => {
      ["disc-page-profiles-scrub", "disc-page-conclusion"].forEach((id) =>
        ScrollTrigger.getById(id)?.kill(),
      );
      ctx.revert();
    };
  }, [rootRef, reducedMotion]);
}
