"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Sets --p (scroll px, capped) on a wrapper; CSS layers translate by small multiples. */
export function AboutParallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.setProperty("--p", String(Math.min(window.scrollY, 800)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
