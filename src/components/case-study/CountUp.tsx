"use client";

import { useEffect, useRef } from "react";
import {
  finalMetricDisplay,
  parseMetricCounter,
} from "@/components/home/caseStudyMetricFormat";

type CountUpProps = {
  /** Display string, e.g. "$1.2m", "100+", "$15,000". */
  value: string;
  /** Delay before counting starts once visible, in ms. */
  delay?: number;
  duration?: number;
  className?: string;
};

/**
 * Server-renders the final value. Only after the element scrolls into view (and
 * motion is allowed) does it count up from zero, then it settles on the exact value.
 */
export function CountUp({ value, delay = 0, duration = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = finalMetricDisplay(value);

  useEffect(() => {
    const el = ref.current;
    const parsed = parseMetricCounter(value);
    if (!el || parsed.kind === "static") return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    let raf = 0;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.textContent = parsed.format(0);
        timer = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = parsed.format(parsed.end * eased);
            if (t < 1) raf = requestAnimationFrame(tick);
            else el.textContent = final;
          };
          raf = requestAnimationFrame(tick);
        }, delay);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      el.textContent = final;
    };
  }, [value, delay, duration, final]);

  return (
    <>
      <span className="sr-only">{final}</span>
      <span ref={ref} className={className} aria-hidden="true">
        {final}
      </span>
    </>
  );
}
