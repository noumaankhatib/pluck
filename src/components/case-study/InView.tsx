"use client";

import { useEffect, useRef, type ReactNode } from "react";

type InViewProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ol" | "ul";
  /** IntersectionObserver rootMargin. */
  margin?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/**
 * Marks a subtree as `data-inview="armed"` (hidden start state) once mounted and
 * `"in"` when scrolled into view. With no JS, or reduced motion, the attribute is
 * never "armed" so content is always visible in its final state.
 */
export function InView({
  children,
  className,
  as = "div",
  margin = "0px 0px -12% 0px",
  ...rest
}: InViewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.dataset.inview = "in";
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
      el.dataset.inview = "in";
      return;
    }
    el.dataset.inview = "armed";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.inview = "in";
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  const Tag = as as "div";
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className} {...rest}>
      {children}
    </Tag>
  );
}
