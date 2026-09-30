"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Persistent narrative thread along the scroll axis. A single copper
 * line fills as the reader moves through the story (wide desktop;
 * smaller screens get the header's progress hairline instead).
 */
export function HomeStoryShell({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative">
      {!reduce && (
        <div
          className="pointer-events-none fixed left-[max(0.75rem,calc((100vw-var(--content-max))/2+0.75rem))] top-[calc(var(--header-h)+2rem)] z-40 hidden h-[calc(100svh-var(--header-h)-4rem)] w-px bg-forest/10 mix-blend-multiply xl:block"
          aria-hidden
        >
          <motion.div
            className="h-full w-full origin-top bg-copper"
            style={{ scaleY: progress }}
          />
        </div>
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
