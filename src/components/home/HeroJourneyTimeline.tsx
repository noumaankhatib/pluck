"use client";

import { useEffect, useState } from "react";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { hero } from "@/content/home";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/cn";

const COPPER = "#D8783E";

function stepIndexFromProgress(p: number, stepCount: number): number {
  const clamped = Math.min(1, Math.max(0, p));
  if (clamped >= 1) return stepCount - 1;
  return Math.min(stepCount - 1, Math.floor(clamped * stepCount));
}

type HeroJourneyTimelineProps = {
  activeStep: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
};

export function HeroJourneyTimeline({
  activeStep,
  progress,
  reduce,
}: HeroJourneyTimelineProps) {
  const steps = hero.journey;
  const [displayStep, setDisplayStep] = useState(
    reduce ? steps.length - 1 : activeStep,
  );

  useEffect(() => {
    setDisplayStep(activeStep);
  }, [activeStep]);

  useMotionValueEvent(progress, "change", (p) => {
    if (reduce) return;
    setDisplayStep(stepIndexFromProgress(p, steps.length));
  });

  const lineScale = useTransform(progress, (p) => Math.min(1, Math.max(0, p)));
  const indicatorLeft = useTransform(progress, (p) => `${3 + Math.min(1, Math.max(0, p)) * 94}%`);

  return (
    <div className="hero-journey-rail w-full" aria-label="From demand to business">
      <ul className="sr-only">
        {steps.map((step) => (
          <li key={step.id}>
            {step.label}: {step.description}
          </li>
        ))}
      </ul>

      <div className="relative min-w-0 px-0.5" aria-live="polite" aria-atomic="true">
        <div
          className="pointer-events-none absolute left-[3%] right-[3%] top-[0.55rem] h-px bg-[#FFF8EC]/22"
          aria-hidden
        />
        {reduce ? (
          <div
            className="pointer-events-none absolute left-[3%] top-[0.48rem] h-[1.5px] w-[94%] origin-left rounded-full bg-gradient-to-r from-[#D8783E]/25 via-[#D8783E] to-[#D8783E]/85"
            aria-hidden
          />
        ) : (
          <>
            <motion.div
              className="pointer-events-none absolute left-[3%] top-[0.48rem] h-[1.5px] w-[94%] origin-left rounded-full bg-gradient-to-r from-[#D8783E]/20 via-[#D8783E] to-[#D8783E]/80"
              style={{ scaleX: lineScale }}
              aria-hidden
            />
            <motion.div
              className="pointer-events-none absolute top-[0.42rem] z-[1] h-2 w-2 -translate-x-1/2 rounded-full border border-[#FFF8EC]/35 bg-[#D8783E] shadow-[0_0_0_2px_rgb(16_37_29/0.45)]"
              style={{ left: indicatorLeft }}
              aria-hidden
            />
          </>
        )}

        <ol className="relative grid grid-cols-5 gap-0.5">
          {steps.map((step, index) => {
            const lit = index <= displayStep;
            const isActive = index === displayStep;

            return (
              <li
                key={step.id}
                className="relative flex min-w-0 flex-col items-center pb-0.5 text-center"
              >
                <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                  {isActive && (
                    <motion.span
                      className="absolute -inset-1 rounded-full border border-[#D8783E]/80"
                      layoutId={reduce ? undefined : "hero-copper-ring"}
                      transition={{ type: "spring", stiffness: 340, damping: 30 }}
                      aria-hidden
                    />
                  )}
                  <motion.span
                    className="relative z-[1] block shrink-0 rounded-full border-2"
                    initial={false}
                    animate={{
                      width: isActive ? 10 : 7,
                      height: isActive ? 10 : 7,
                      backgroundColor: isActive
                        ? COPPER
                        : lit
                          ? "rgb(255 248 236 / 0.55)"
                          : "rgb(255 248 236 / 0.18)",
                      borderColor: isActive
                        ? COPPER
                        : lit
                          ? "rgb(216 120 62 / 0.65)"
                          : "rgb(255 248 236 / 0.35)",
                    }}
                    transition={{ duration: 0.38, ease: motionEase }}
                  />
                </span>
                <span
                  className={cn(
                    "mt-1 w-full px-0.5 font-sans text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.08em] sm:text-[0.5625rem] md:text-[0.625rem]",
                    isActive && "text-[#FFF8EC]",
                    !isActive && lit && "text-[#FFF8EC]/82",
                    !isActive && !lit && "text-[#FFF8EC]/52",
                  )}
                >
                  <span
                    className={cn(
                      "inline-block border-b-2 border-transparent pb-px transition-colors duration-300",
                      isActive && "border-[#D8783E] font-bold",
                    )}
                  >
                    {step.label}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
