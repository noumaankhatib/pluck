"use client";

import { type RefObject, useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap/register";
import { quality } from "@/content/home";

/** Scatter positions (% of volume box) — noisy, non-overlapping. */
const SCATTER = [
  { x: 24, y: 56 },
  { x: 71, y: 44 },
  { x: 34, y: 76 },
  { x: 76, y: 70 },
] as const;

/** Ordered grid anchors after convergence. */
const GRID = [
  { x: 30, y: 64 },
  { x: 70, y: 64 },
  { x: 30, y: 84 },
  { x: 70, y: 84 },
] as const;

const FLOW_EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [1, 2],
];

const STAGE_COUNT = quality.rightSignals.length;

export function useQualitySignalAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  signalRootRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const root = signalRootRef.current;
    if (!section || !root) return;

    ensureGsapPlugins();

    const metrics = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-quality-metric-wrap]"),
    );
    const metricLabels = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-quality-metric-label]"),
    );
    const flowLines = gsap.utils.toArray<SVGLineElement>(
      root.querySelectorAll("[data-quality-flow-line]"),
    );
    const flowParticles = gsap.utils.toArray<SVGCircleElement>(
      root.querySelectorAll("[data-quality-flow-particle]"),
    );
    const copperFill = root.querySelector<HTMLElement>("[data-quality-copper-fill]");
    const copperDot = root.querySelector<HTMLElement>("[data-quality-copper-dot]");
    const rightLabel = root.querySelector<HTMLElement>("[data-quality-right-label]");
    const stages = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-quality-stage]"),
    );
    const stageRules = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-quality-stage-rule]"),
    );
    const stageNumbers = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-quality-stage-number]"),
    );
    const volumeWash = root.querySelector<HTMLElement>("[data-quality-volume-wash]");

    const setEndState = () => {
      metrics.forEach((wrap, i) => {
        gsap.set(wrap, {
          left: `${GRID[i].x}%`,
          top: `${GRID[i].y}%`,
          xPercent: -50,
          yPercent: -50,
          opacity: 0.52,
          scale: 0.97,
        });
      });
      metricLabels.forEach((label) => gsap.set(label, { x: 0, y: 0 }));
      gsap.set(flowLines, { opacity: 0.12, strokeDashoffset: 0 });
      gsap.set(flowParticles, { opacity: 0.35 });
      if (copperFill) gsap.set(copperFill, { scaleX: 1, opacity: 0.9 });
      if (copperDot) gsap.set(copperDot, { left: "100%", opacity: 1 });
      if (rightLabel) gsap.set(rightLabel, { opacity: 1, y: 0 });
      if (volumeWash) gsap.set(volumeWash, { opacity: 0.04 });
      stages.forEach((stage, i) => {
        gsap.set(stage, { opacity: 1, y: 0 });
        stage.classList.toggle("is-active", i === STAGE_COUNT - 1);
        stage.classList.toggle("is-complete", i < STAGE_COUNT - 1);
      });
      stageRules.forEach((rule) => gsap.set(rule, { scaleX: 1 }));
      stageNumbers.forEach((num) => gsap.set(num, { opacity: 1 }));
    };

    const ctx = gsap.context(() => {
      metrics.forEach((wrap, i) => {
        gsap.set(wrap, {
          left: `${SCATTER[i].x}%`,
          top: `${SCATTER[i].y}%`,
          xPercent: -50,
          yPercent: -50,
          opacity: 0.92,
          scale: 0.97,
        });
      });
      const drifts = [
        { x: 5, y: -3 },
        { x: -4, y: 4 },
        { x: 4, y: 3 },
        { x: -5, y: -2 },
      ];
      metricLabels.forEach((label, i) => {
        gsap.set(label, { x: 0, y: 0 });
        if (!reducedMotion) {
          const d = drifts[i % drifts.length];
          gsap.to(label, {
            x: d.x,
            y: d.y,
            duration: 2.15 + i * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.16,
          });
        }
      });

      flowLines.forEach((line, i) => {
        const len = line.getTotalLength?.() ?? 40;
        gsap.set(line, {
          strokeDasharray: len,
          strokeDashoffset: len * 0.65,
          opacity: 0.22,
        });
        if (!reducedMotion) {
          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 2.4 + i * 0.15,
            repeat: -1,
            yoyo: true,
            ease: "none",
            delay: 0.2 + i * 0.12,
          });
        }
      });

      if (!reducedMotion && flowParticles.length) {
        gsap.to(flowParticles, {
          opacity: 0.55,
          duration: 1.6,
          stagger: 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (copperFill) {
        gsap.set(copperFill, { scaleX: 0, transformOrigin: "left center", opacity: 0.35 });
      }
      if (copperDot) {
        gsap.set(copperDot, { left: "0%", opacity: 0 });
      }
      if (rightLabel) gsap.set(rightLabel, { opacity: 0.88, y: 4 });
      stages.forEach((stage) => {
        gsap.set(stage, { opacity: 0.88, y: 5 });
        stage.classList.remove("is-active", "is-complete");
      });
      stageRules.forEach((rule) =>
        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" }),
      );
      stageNumbers.forEach((num) => gsap.set(num, { opacity: 0.72 }));
      if (volumeWash) gsap.set(volumeWash, { opacity: 0 });

      if (reducedMotion) {
        setEndState();
        return;
      }

      const story = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          id: "quality-signal-story",
          trigger: section,
          start: "top 88%",
          end: "bottom 32%",
          scrub: 0.42,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const active = Math.min(
              STAGE_COUNT - 1,
              Math.max(-1, Math.floor((p - 0.33) / 0.085)),
            );
            stages.forEach((stage, i) => {
              stage.classList.toggle("is-active", i === active);
              stage.classList.toggle("is-complete", i < active);
            });
          },
        },
      });

      story.to(
        metrics,
        {
          opacity: 0.96,
          scale: 1,
          duration: 0.1,
          stagger: { each: 0.025, from: "start" },
        },
        0,
      );

      metrics.forEach((wrap, i) => {
        story.to(
          wrap,
          {
            left: `${GRID[i].x}%`,
            top: `${GRID[i].y}%`,
            duration: 0.38,
            ease: "power3.inOut",
          },
          0.08 + i * 0.04,
        );
      });

      story.to(
        metrics,
        {
          opacity: 0.5,
          scale: 0.96,
          duration: 0.22,
        },
        0.48,
      );

      story.to(flowLines, { opacity: 0.32, duration: 0.12 }, 0.04);
      story.to(flowLines, { opacity: 0.1, duration: 0.2 }, 0.5);
      story.to(flowParticles, { opacity: 0.15, duration: 0.2 }, 0.5);

      if (volumeWash) {
        story.to(volumeWash, { opacity: 0.04, duration: 0.25 }, 0.42);
      }

      if (copperFill) {
        story.to(
          copperFill,
          { scaleX: 1, opacity: 0.92, duration: 0.3, ease: "power2.out" },
          0.26,
        );
      }
      if (copperDot) {
        story.to(copperDot, { left: "100%", opacity: 1, duration: 0.3 }, 0.26);
      }

      if (rightLabel) {
        story.to(rightLabel, { opacity: 1, y: 0, duration: 0.12 }, 0.3);
      }

      stages.forEach((stage, i) => {
        const t = 0.34 + i * 0.085;
        story.to(stage, { opacity: 1, y: 0, duration: 0.09 }, t);
        if (stageRules[i]) {
          story.to(stageRules[i], { scaleX: 1, duration: 0.08, ease: "power2.out" }, t + 0.02);
        }
        if (stageNumbers[i]) {
          story.to(stageNumbers[i], { opacity: 1, duration: 0.08 }, t);
        }
      });
    }, root);

    return () => {
      ScrollTrigger.getById("quality-signal-story")?.kill();
      ctx.revert();
    };
  }, [sectionRef, signalRootRef, reducedMotion]);
}

export { SCATTER, GRID, FLOW_EDGES };
