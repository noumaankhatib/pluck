"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { ensureGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";

const AUTO_STEP_MS = 4200;
const USER_PAUSE_MS = 14_000;

function indexFromProgress(progress: number, total: number) {
  const p = Math.min(1, Math.max(0, progress));
  if (p >= 0.999) return total - 1;
  return Math.min(total - 1, Math.floor(p * total));
}

export function useJourneyActiveStep(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  total: number,
  reducedMotion: boolean,
) {
  const [active, setActive] = useState(0);
  const userPausedUntilRef = useRef(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const pick = useCallback(
    (index: number) => {
      const clamped = Math.min(total - 1, Math.max(0, index));
      userPausedUntilRef.current = Date.now() + USER_PAUSE_MS;
      setActive(clamped);
    },
    [total],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reducedMotion || total < 1) return;

    ensureGsapPlugins();

    let trigger: ScrollTrigger | undefined;

    const bind = () => {
      trigger?.kill();
      trigger = ScrollTrigger.create({
        id: "journey-progress",
        trigger: track,
        start: "top top+=76",
        end: "bottom bottom-=12%",
        onUpdate(self) {
          const idx = indexFromProgress(self.progress, total);
          if (idx !== activeRef.current) {
            userPausedUntilRef.current = Date.now() + USER_PAUSE_MS;
            setActive(idx);
          }
        },
      });
    };

    bind();
    const onResize = () => {
      bind();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      trigger?.kill();
      ScrollTrigger.getById("journey-progress")?.kill();
    };
  }, [trackRef, total, reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion || total < 1) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          if (intervalId) clearInterval(intervalId);
          intervalId = undefined;
          return;
        }

        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(() => {
          if (Date.now() < userPausedUntilRef.current) return;
          setActive((prev) => (prev + 1) % total);
        }, AUTO_STEP_MS);
      },
      { threshold: 0.4, rootMargin: "-8% 0px" },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, [sectionRef, total, reducedMotion]);

  return { active, pick };
}
