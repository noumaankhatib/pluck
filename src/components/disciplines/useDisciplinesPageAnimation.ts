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
    const vLabels = root.querySelectorAll<HTMLElement>("[data-disc-page-vlabel]");
    const chartBars = root.querySelectorAll<SVGElement>("[data-disc-bar]");
    const chartArrow = root.querySelector<SVGPathElement>("[data-disc-arrow]");
    const chartHead = root.querySelector<SVGElement>("[data-disc-arrow-head]");
    const growth = root.querySelector<HTMLElement>("[data-disc-growth]");
    const heroLines = root.querySelectorAll<HTMLElement>("[data-disc-line]");
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
          [heroEyebrow, heroHeadline, heroBody, heroDiagram, conclusionRule, conclusionCta, bridge].filter(Boolean),
          { opacity: 1, y: 0, scaleX: 1, scaleY: 1 },
        );
        gsap.set(conclusionParas, { opacity: 1, y: 0 });
        gsap.set(profileCards, { opacity: 1, y: 0 });
        gsap.set(profileBars, { scaleX: 1 });
        gsap.set(vLabels, { opacity: 1, y: 0 });
        gsap.set(chartBars, { scaleY: 1 });
        gsap.set(chartHead, { opacity: 1 });
        gsap.set(growth, { opacity: 1, y: 0 });
        if (chartArrow) gsap.set(chartArrow, { strokeDasharray: 1, strokeDashoffset: 0 });
        if (hubRing && hubCore) gsap.set([hubRing, hubCore], { opacity: 1, scale: 1 });
        lines.forEach((l) => gsap.set(l, { strokeDashoffset: 0 }));
        emit(PROFILE_COUNT - 1, true);
      };

      if (reducedMotion) {
        showAll();
        return;
      }

      gsap.set(heroEyebrow, { y: 10 });
      gsap.set(heroLines, { yPercent: 110 });
      gsap.set(heroBody, { opacity: 0 });
      gsap.set(heroBody, { y: 12 });
      gsap.set(heroDiagram, { y: 10 });
      gsap.set(vLabels, { opacity: 0, y: 16 });
      gsap.set(chartBars, { scaleY: 0, transformBox: "fill-box", transformOrigin: "50% 100%" });
      if (chartArrow) gsap.set(chartArrow, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(chartHead, { opacity: 0 });
      gsap.set(growth, { opacity: 0, y: 8 });
      gsap.set(profileCards, { opacity: 0, y: 12 });
      gsap.set(profileBars, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(conclusionParas, { opacity: 0, y: 28 });
      gsap.set(conclusionCta, { opacity: 0, y: 10 });
      gsap.set(conclusionRule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(bridge, { scaleY: 0, transformOrigin: "top center" });
      if (threadV) gsap.set(threadV, { scaleY: 0, transformOrigin: "top center" });
      if (hubRing && hubCore) gsap.set([hubRing, hubCore], { opacity: 0, scale: 0.75, transformOrigin: "center center" });
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
        if (heroLines.length) heroTl.to(heroLines, { yPercent: 0, duration: 0.9, stagger: 0.14, ease: "power4.out" }, 0.18);
        if (heroBody) heroTl.to(heroBody, { y: 0, opacity: 1, duration: 0.8 }, 0.7);
        if (heroDiagram) {
          heroTl.to(heroDiagram, { y: 0, duration: 0.48 }, 0.08);
          if (hubRing) heroTl.to(hubRing, { opacity: 1, scale: 1, duration: 0.45 }, 0.3);
          if (hubCore) heroTl.to(hubCore, { opacity: 1, scale: 1, duration: 0.4 }, 0.36);
          heroTl.to(vLabels, { opacity: 1, y: 0, duration: 0.8, stagger: 0.22, ease: "power3.out" }, 0.45);
          heroTl.to(chartBars, { scaleY: 1, duration: 0.7, stagger: 0.16, ease: "power3.out" }, 1.3);
          if (chartArrow) heroTl.to(chartArrow, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 1.9);
          heroTl.to(chartHead, { opacity: 1, duration: 0.3 }, 2.7);
          heroTl.to(growth, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 2.9);
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

      if (heroDiagram && hero) {
        gsap.to(heroDiagram, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5 },
        });
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
        const img = card.querySelector<HTMLElement>("[data-disc-page-img]");
        const imgInner = card.querySelector<HTMLElement>("[data-disc-page-img-inner]");
        if (img && imgInner) {
          gsap.set(img, { clipPath: "inset(0 0 100% 0)" });
          gsap.set(imgInner, { scale: 1.12 });
          tl.to(img, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.inOut" }, 0.05);
          tl.to(imgInner, { scale: 1, duration: 1.2 }, 0.05);
        }
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
          closeTl.to(conclusionParas, { opacity: 1, y: 0, duration: 0.8, stagger: 0.25, ease: "power3.out" }, 0.15);
        }
        if (conclusionCta) closeTl.to(conclusionCta, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.75);
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
