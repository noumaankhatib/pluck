"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionEase, motionDurations, revealOffset } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "footer";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: revealOffset }}
      whileInView={{ opacity: 1, y: 0 }}
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
