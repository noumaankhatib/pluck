"use client";

import { type RefObject, useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap/register";
import { parseMetricCounter } from "@/components/home/caseStudyMetricFormat";

function animateMetricValue(el: HTMLElement, finalText: string): gsap.core.Tween {
  const parsed = parseMetricCounter(finalText);
  if (parsed.kind === "static") {
    el.textContent = finalText;
    return gsap.to({}, { duration: 0 });
  }

  if (el.dataset.caseCounted === "true") {
    el.textContent = finalText;
    return gsap.to({}, { duration: 0 });
  }

  el.dataset.caseCounted = "true";
  const proxy = { n: 0 };
  el.textContent = parsed.format(0);

  return gsap.to(proxy, {
    n: parsed.end,
    duration: 0.92,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = parsed.format(proxy.n);
    },
    onComplete: () => {
      el.textContent = finalText;
    },
  });
}

function setMarkerActive(marker: HTMLElement | null, active: boolean) {
  if (!marker) return;
  const dot = marker.querySelector<HTMLElement>("[data-case-flow-dot]");
  const node = marker.querySelector<HTMLElement>("[data-case-flow-node]");
  dot?.classList.toggle("case-chapter__flow-dot--active", active);
  node?.classList.toggle("case-chapter__flow-node--active", active);
}

export function useCaseStudyChapterAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();

    const label = section.querySelector<HTMLElement>("[data-case-label]");
    const client = section.querySelector<HTMLElement>("[data-case-client]");
    const headline = section.querySelector<HTMLElement>("[data-case-headline]");
    const supporting = section.querySelector<HTMLElement>("[data-case-supporting]");
    const paragraphs = section.querySelectorAll<HTMLElement>("[data-case-paragraph]");
    const outcomes = section.querySelector<HTMLElement>("[data-case-outcomes]");
    const bridge = section.querySelector<HTMLElement>("[data-case-bridge]");
    const timeline = section.querySelector<HTMLElement>("[data-case-timeline]");
    const flowRail = section.querySelector<HTMLElement>("[data-case-flow-rail]");
    const flowLine = section.querySelector<HTMLElement>("[data-case-flow-line]");
    const pipelineCols = section.querySelectorAll<HTMLElement>("[data-case-pipeline-col]");
    const returnBand = section.querySelector<HTMLElement>("[data-case-return]");
    const returnGlow = section.querySelector<HTMLElement>("[data-case-return-glow]");
    const returnSweep = section.querySelector<HTMLElement>("[data-case-return-sweep]");
    const returnRule = section.querySelector<HTMLElement>("[data-case-return-rule]");
    const returnText = section.querySelector<HTMLElement>("[data-case-return-text]");
    const link = section.querySelector<HTMLElement>("[data-case-link]");

    const ctx = gsap.context(() => {
      const resetMarkers = () => {
        section.querySelectorAll<HTMLElement>("[data-case-flow-marker]").forEach((m) => {
          setMarkerActive(m, false);
        });
      };

      const showAll = () => {
        gsap.set(
          [
            label,
            client,
            headline,
            supporting,
            outcomes,
            bridge,
            timeline,
            flowRail,
            returnBand,
            returnGlow,
            returnSweep,
            returnRule,
            returnText,
            link,
          ],
          { opacity: 1, y: 0, scaleX: 1, scaleY: 1, x: 0 },
        );
        gsap.set(paragraphs, { opacity: 1, y: 0 });
        gsap.set(pipelineCols, { opacity: 1, y: 0 });
        pipelineCols.forEach((col) => {
          const labelEl = col.querySelector<HTMLElement>("[data-case-metric-label]");
          const valueEl = col.querySelector<HTMLElement>("[data-case-metric-value]");
          const final = valueEl?.getAttribute("data-case-final");
          if (labelEl) gsap.set(labelEl, { opacity: 1 });
          if (valueEl && final) valueEl.textContent = final;
        });
        if (flowLine) gsap.set(flowLine, { scaleX: 1 });
        resetMarkers();
        const last = section.querySelector<HTMLElement>(
          `[data-case-flow-marker][data-case-flow-index="${pipelineCols.length - 1}"]`,
        );
        setMarkerActive(last, true);
      };

      if (reducedMotion) {
        showAll();
        return;
      }

      gsap.set([label, client, headline, supporting], { opacity: 0, y: 12 });
      gsap.set(paragraphs, { opacity: 0, y: 10 });
      gsap.set(outcomes, { opacity: 0, y: 8 });
      gsap.set([bridge, timeline], { opacity: 0, y: 6 });
      gsap.set(flowRail, { opacity: 0 });
      gsap.set(flowLine, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(pipelineCols, { opacity: 0, y: 8 });
      pipelineCols.forEach((col) => {
        const labelEl = col.querySelector<HTMLElement>("[data-case-metric-label]");
        if (labelEl) gsap.set(labelEl, { opacity: 0.4 });
      });
      gsap.set(returnBand, { opacity: 0, y: 8 });
      gsap.set(returnGlow, { opacity: 0 });
      gsap.set(returnSweep, { opacity: 0, x: "-30%" });
      gsap.set(returnRule, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(returnText, { opacity: 0, y: 6 });
      gsap.set(link, { opacity: 0, y: 4 });
      resetMarkers();

      const intro = gsap.timeline({
        scrollTrigger: {
          id: "case-chapter-intro",
          trigger: section,
          start: "top 86%",
          end: "top 54%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      if (label) intro.to(label, { opacity: 1, y: 0, duration: 0.4 }, 0);
      if (client) intro.to(client, { opacity: 1, y: 0, duration: 0.38 }, 0.04);
      if (headline) intro.to(headline, { opacity: 1, y: 0, duration: 0.52 }, 0.07);
      if (supporting) intro.to(supporting, { opacity: 1, y: 0, duration: 0.46 }, 0.12);
      if (paragraphs.length) {
        intro.to(paragraphs, { opacity: 1, y: 0, duration: 0.42, stagger: 0.06 }, 0.11);
      }
      if (outcomes) intro.to(outcomes, { opacity: 1, y: 0, duration: 0.45 }, 0.16);

      if (!outcomes) return;

      const stepCount = pipelineCols.length || 4;
      const stepGap = 0.3;

      const outcomesTl = gsap.timeline({
        scrollTrigger: {
          id: "case-chapter-outcomes",
          trigger: outcomes,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      let cursor = 0.05;
      if (bridge) outcomesTl.to(bridge, { opacity: 1, y: 0, duration: 0.32 }, cursor);
      if (timeline) outcomesTl.to(timeline, { opacity: 1, y: 0, duration: 0.34 }, cursor + 0.02);
      if (flowRail) outcomesTl.to(flowRail, { opacity: 1, duration: 0.3 }, cursor + 0.06);

      pipelineCols.forEach((col, i) => {
        const marker = section.querySelector<HTMLElement>(
          `[data-case-flow-marker][data-case-flow-index="${i}"]`,
        );
        const labelEl = col.querySelector<HTMLElement>("[data-case-metric-label]");
        const valueEl = col.querySelector<HTMLElement>("[data-case-metric-value]");
        const final = valueEl?.getAttribute("data-case-final");
        const stepTime = cursor + 0.14 + i * stepGap;

        outcomesTl.call(() => {
          resetMarkers();
          setMarkerActive(marker, true);
        }, undefined, stepTime);

        if (flowLine) {
          outcomesTl.to(
            flowLine,
            {
              scaleX: (i + 1) / stepCount,
              duration: 0.34,
              ease: "power2.out",
            },
            stepTime,
          );
        }

        outcomesTl.to(col, { opacity: 1, y: 0, duration: 0.34 }, stepTime);
        if (labelEl) outcomesTl.to(labelEl, { opacity: 1, duration: 0.26 }, stepTime);

        if (valueEl && final) {
          outcomesTl.call(() => animateMetricValue(valueEl, final), undefined, stepTime + 0.05);
        }
      });

      const afterMetrics = cursor + 0.14 + stepCount * stepGap + 0.8;

      if (returnBand) outcomesTl.to(returnBand, { opacity: 1, y: 0, duration: 0.45 }, afterMetrics);
      if (returnGlow) outcomesTl.to(returnGlow, { opacity: 1, duration: 0.5 }, afterMetrics + 0.03);
      if (returnRule) {
        outcomesTl.to(returnRule, { scaleY: 1, duration: 0.48, ease: "power2.out" }, afterMetrics + 0.05);
      }
      if (returnText) {
        outcomesTl.to(returnText, { opacity: 1, y: 0, duration: 0.5 }, afterMetrics + 0.08);
      }
      if (returnSweep) {
        outcomesTl.fromTo(
          returnSweep,
          { opacity: 0, x: "-35%" },
          { opacity: 0.35, x: "35%", duration: 0.85, ease: "power2.inOut" },
          afterMetrics + 0.06,
        );
        outcomesTl.to(returnSweep, { opacity: 0, duration: 0.35 }, afterMetrics + 0.5);
      }
      if (link) outcomesTl.to(link, { opacity: 1, y: 0, duration: 0.36 }, afterMetrics + 0.16);
    }, section);

    return () => {
      ScrollTrigger.getById("case-chapter-intro")?.kill();
      ScrollTrigger.getById("case-chapter-outcomes")?.kill();
      ctx.revert();
    };
  }, [sectionRef, reducedMotion]);
}
