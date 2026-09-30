import {
  AnimatePresence,
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { hero } from "@/content/home";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * One colour per stage, drawn from the brand palette: cool, quiet
 * demand warms up into copper as it becomes business.
 */
const STEP_COLORS = [
  "#7a8b7e", // Demand — sage
  "#4f7a66", // Discovery — light forest
  "#1b3d2f", // Connection — forest
  "#e5895a", // Enquiry — copper soft
  "#c45c26", // Business — copper
] as const;

type HeroDiscoveryPathProps = {
  activeStep: number;
  /** 0 → 1 across the whole path; segments fill continuously between nodes. */
  pathProgress: MotionValue<number>;
  reduce: boolean | null;
  /** Draw a thread up into whatever sits above (the hero photo on desktop). */
  leadIn?: boolean;
  className?: string;
};

/** Connector from node `index` down to the next — fills with a colour gradient. */
function Segment({
  index,
  total,
  progress,
  reduce,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const fill = useTransform(progress, (p) =>
    Math.min(1, Math.max(0, p * (total - 1) - index)),
  );

  return (
    <span
      className="absolute left-[7px] top-[calc(50%+8px)] h-[calc(100%-16px)] w-[2px] overflow-hidden rounded-full bg-forest/10"
      aria-hidden
    >
      <motion.span
        className="block h-full w-full origin-top"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${STEP_COLORS[index]}, ${STEP_COLORS[index + 1]})`,
          scaleY: reduce ? 1 : fill,
        }}
      />
    </span>
  );
}

/**
 * The hero's discovery path — set straight into the page as typography
 * rather than a boxed widget: a vertical rail of stages on the left, the
 * active stage's word and message on the right.
 */
export function HeroDiscoveryPath({
  activeStep,
  pathProgress,
  reduce,
  leadIn = false,
  className,
}: HeroDiscoveryPathProps) {
  const total = hero.journey.length;
  const step = hero.journey[activeStep];
  const activeColor = STEP_COLORS[activeStep] ?? STEP_COLORS[0];

  return (
    <div className={cn("relative", className)} aria-label="From demand to business">
      {/* Thread dropping out of the photo into the first stage */}
      {leadIn && (
        <motion.span
          className="absolute -top-10 left-[7px] h-[calc(2.5rem+0.75rem)] w-[2px] origin-top bg-gradient-to-b from-transparent to-[#7a8b7e]"
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.9, ease: motionEase, delay: 0.4 }}
          aria-hidden
        />
      )}

      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 sm:gap-x-8">
        {/* Rail */}
        <ol aria-hidden>
          {hero.journey.map((item, index) => {
            const isActive = index === activeStep;
            const lit = index <= activeStep;
            const color = STEP_COLORS[index];

            return (
              <li key={item.id} className="relative flex h-9 items-center gap-3 lg:h-10">
                {index < total - 1 && (
                  <Segment index={index} total={total} progress={pathProgress} reduce={reduce} />
                )}

                {/* Node */}
                <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                  {isActive && !reduce && (
                    <motion.span
                      key={`pulse-${index}`}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ scale: 1, opacity: 0.45 }}
                      animate={{ scale: 2.6, opacity: 0 }}
                      transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity }}
                    />
                  )}
                  <motion.span
                    className="relative block rounded-full border-2"
                    initial={false}
                    animate={{
                      width: isActive ? 14 : 9,
                      height: isActive ? 14 : 9,
                      backgroundColor: lit ? color : "#f7f4ef",
                      borderColor: lit ? color : "rgba(27,61,47,0.28)",
                    }}
                    transition={{ duration: 0.4, ease: motionEase }}
                  />
                </span>

                <span
                  className={cn(
                    "whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors duration-500 lg:text-xs",
                    isActive ? "text-forest" : lit ? "text-forest/75" : "text-forest/50",
                  )}
                >
                  {item.label}
                </span>

                {/* Marker that glides to the active stage */}
                {isActive && (
                  <motion.span
                    layoutId={reduce ? undefined : "hero-step-marker"}
                    className="hidden h-[2px] w-4 rounded-full sm:block"
                    style={{ backgroundColor: color }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  />
                )}
              </li>
            );
          })}
        </ol>

        {/* Message */}
        <div className="flex min-w-0 flex-col justify-center border-l border-forest/10 pl-5 sm:pl-8">
          <p className="font-mono text-[0.75rem] font-medium tabular-nums" aria-hidden>
            <motion.span animate={{ color: activeColor }} transition={{ duration: 0.5 }}>
              {String(activeStep + 1).padStart(2, "0")}
            </motion.span>
            <span className="text-forest/35"> / {String(total).padStart(2, "0")}</span>
          </p>

          {/* The stage word rises into place through a mask */}
          <div className="relative mt-2 overflow-hidden pb-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={step.id}
                className="font-display text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] leading-[1.08] tracking-[-0.015em] text-forest"
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                exit={reduce ? { opacity: 0 } : { y: "-110%" }}
                transition={{ duration: 0.5, ease: motionEase }}
              >
                {step.label}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.span
            className="mt-2 block h-[2px] w-10 rounded-full"
            animate={{ backgroundColor: activeColor }}
            transition={{ duration: 0.5 }}
            aria-hidden
          />

          <div className="mt-3 min-h-[3.25rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={step.id}
                className="max-w-[19rem] text-[1rem] leading-snug text-charcoal/85 lg:text-[1.0625rem]"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: motionEase, delay: reduce ? 0 : 0.08 }}
              >
                {step.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        From demand to business — step {activeStep + 1} of {total}: {step.label}.{" "}
        {step.description}
      </p>
    </div>
  );
}
