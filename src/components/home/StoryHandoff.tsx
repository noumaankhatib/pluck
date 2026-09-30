"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { motionEase } from "@/lib/motion";

type StoryHandoffProps = {
  /** The question the next chapter answers. */
  label: string;
  /** Match the background of the section that follows. */
  tone?: "light" | "paper" | "dark";
  className?: string;
};

/**
 * Chapter bridge — the question that carries the reader from one
 * section into the next. Sits on the next section's background so
 * the page reads as one continuous surface rather than stacked bands.
 */
export function StoryHandoff({ label, tone = "light", className }: StoryHandoffProps) {
  const reduce = useReducedMotion();
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "story-handoff relative pt-[clamp(2.5rem,1.75rem+2.5vw,4rem)]",
        dark ? "surface-ink" : tone === "paper" ? "bg-paper text-forest" : "bg-ivory text-forest",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[var(--content-max)] items-center gap-4 px-[var(--gutter)] md:gap-6">
        <motion.span
          className="h-px w-10 shrink-0 origin-left bg-copper md:w-20"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: motionEase }}
          aria-hidden
        />
        <motion.p
          className={cn(
            "font-display text-[clamp(1.0625rem,0.95rem+0.5vw,1.3125rem)] italic leading-snug",
            dark ? "text-ivory/80" : "text-forest/80",
          )}
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: motionEase, delay: 0.2 }}
        >
          {label}
        </motion.p>
      </div>
    </div>
  );
}
