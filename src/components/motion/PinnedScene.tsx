import { useRef, type ReactNode, type RefObject } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/cn";

type PinnedSceneProps = {
  /** How many screens of scrolling the scene plays across (the pinned screen is extra). */
  length?: number;
  className?: string;
  /** Classes for the pinned, one-screen stage. */
  stageClassName?: string;
  labelledBy?: string;
  id?: string;
  /**
   * Render prop. `isStatic` is true with reduced motion: the scene isn't pinned
   * and should lay everything out in its finished state, nothing hidden by exits.
   */
  children: (
    progress: MotionValue<number>,
    sectionRef: RefObject<HTMLElement | null>,
    isStatic: boolean,
  ) => ReactNode;
};

/**
 * One screen, held still while the reader scrolls — the story plays in place.
 * Children receive a 0 → 1 progress across the pinned stretch.
 * With reduced motion the scene isn't pinned: it renders statically at progress 1.
 */
export function PinnedScene({
  length = 2,
  className,
  stageClassName,
  labelledBy,
  id,
  children,
}: PinnedSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scrubbed = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const finished = useMotionValue(1);
  const isStatic = !!reduce;

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={labelledBy}
      className={cn(isStatic ? "relative" : "pinned-scene relative", className)}
      style={isStatic ? undefined : { height: `calc(${length + 1} * (100svh - var(--header-h)))` }}
    >
      <div
        className={cn(
          isStatic
            ? "relative py-[var(--section-space-loose)]"
            : "screen sticky top-[var(--header-h)] flex items-center overflow-hidden",
          !isStatic && stageClassName,
        )}
      >
        {children(isStatic ? finished : scrubbed, ref, isStatic)}
      </div>
    </section>
  );
}

/** Scroll to a point in a pinned scene (0 → 1), e.g. to jump to a beat. */
export function scrollSceneTo(section: HTMLElement | null, at: number, smooth = true) {
  if (!section) return;
  const top = section.getBoundingClientRect().top + window.scrollY;
  /* Matches the progress range: section top at viewport top → section bottom at viewport bottom */
  const run = section.offsetHeight - window.innerHeight;
  window.scrollTo({ top: top + run * at, behavior: smooth ? "smooth" : "auto" });
}
