"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionEase, motionDurations, revealOffset } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "footer";
  /** Where the content enters from. Defaults to rising up. */
  direction?: "up" | "left" | "right" | "scale";
};

const from = {
  up: { opacity: 0, y: revealOffset },
  left: { opacity: 0, x: -revealOffset },
  right: { opacity: 0, x: revealOffset },
  scale: { opacity: 0, scale: 0.94 },
} as const;

/** Delay for the i-th item of a staggered group. */
export const stagger = (i: number, step = 0.08) => i * step;

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  direction = "up",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1 } : from[direction]}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: reduce ? 0 : motionDurations.base,
        ease: motionEase,
        delay,
      }}
    >
      {children}
    </Component>
  );
}
