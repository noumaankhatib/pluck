import {
  AnimatePresence,
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { hero } from "@/content/home";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/cn";

const STEP_COLORS = [
  "#7a8b7e",
  "#4f7a66",
  "#1b3d2f",
  "#e5895a",
  "#c45c26",
] as const;

type HeroDiscoveryPathProps = {
  activeStep: number;
  pathProgress: MotionValue<number>;
  reduce: boolean | null;
  leadIn?: boolean;
  embedded?: boolean;
  /** Dark hero panel — ivory type for legibility on photography */
  panelSurface?: boolean;
  className?: string;
};

function Segment({
  index,
  total,
  progress,
  reduce,
  panelSurface,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
  panelSurface: boolean;
}) {
  const fill = useTransform(progress, (p) =>
    Math.min(1, Math.max(0, p * (total - 1) - index)),
  );

  return (
    <span
      className={cn(
        "absolute left-[7px] top-[calc(50%+8px)] h-[calc(100%-16px)] w-[2px] overflow-hidden rounded-full",
        panelSurface ? "bg-ivory/14" : "bg-forest/10",
      )}
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

export function HeroDiscoveryPath({
  activeStep,
  pathProgress,
  reduce,
  leadIn = false,
  embedded = false,
  panelSurface = false,
  className,
}: HeroDiscoveryPathProps) {
  const total = hero.journey.length;
  const step = hero.journey[activeStep];
  const activeColor = STEP_COLORS[activeStep] ?? STEP_COLORS[0];
  const onPhoto = embedded && !panelSurface;

  const railLabel = (isActive: boolean, lit: boolean) => {
    if (panelSurface) {
      if (isActive) return "text-ivory";
      if (lit) return "text-ivory/82";
      return "text-ivory/48";
    }
    if (onPhoto) {
      if (isActive) return "hero-text-legibility";
      if (lit) return "text-ink-soft";
      return "text-ink-soft/70";
    }
    if (isActive) return "text-forest";
    if (lit) return "text-forest/80";
    return "text-forest/55";
  };

  return (
    <div className={cn("relative", className)} aria-label="From demand to business">
      {leadIn && (
        <motion.span
          className={cn(
            "absolute -top-10 left-[7px] h-[calc(2.5rem+0.75rem)] w-[2px] origin-top bg-gradient-to-b from-transparent",
            panelSurface ? "to-[#e5895a]/85" : "to-[#7a8b7e]",
          )}
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.9, ease: motionEase, delay: 0.4 }}
          aria-hidden
        />
      )}

      <div
        className={cn(
          "hidden grid-cols-[auto_minmax(0,1fr)] items-stretch gap-x-5 lg:grid lg:gap-x-6",
          embedded && "lg:gap-x-7",
        )}
      >
        <ol aria-hidden className="py-0.5">
          {hero.journey.map((item, index) => {
            const isActive = index === activeStep;
            const lit = index <= activeStep;
            const color = STEP_COLORS[index];

            return (
              <li key={item.id} className="relative flex h-9 items-center gap-2.5 lg:h-[2.625rem] lg:gap-3">
                {index < total - 1 && (
                  <Segment
                    index={index}
                    total={total}
                    progress={pathProgress}
                    reduce={reduce}
                    panelSurface={panelSurface}
                  />
                )}

                <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                  {isActive && !reduce && (
                    <motion.span
                      key={`pulse-${index}`}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ scale: 1, opacity: 0.4 }}
                      animate={{ scale: 2.4, opacity: 0 }}
                      transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
                    />
                  )}
                  <motion.span
                    className="relative block rounded-full border-2"
                    initial={false}
                    animate={{
                      width: isActive ? 13 : 8,
                      height: isActive ? 13 : 8,
                      backgroundColor: lit ? color : panelSurface ? "#2a2622" : "#f7f4ef",
                      borderColor: lit ? color : panelSurface ? "rgb(250 249 243 / 0.22)" : "rgba(27,61,47,0.28)",
                    }}
                    transition={{ duration: 0.45, ease: motionEase }}
                  />
                </span>

                <span
                  className={cn(
                    "whitespace-nowrap font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-500 lg:text-[0.72rem]",
                    railLabel(isActive, lit),
                  )}
                >
                  {item.label}
                </span>

                {isActive && (
                  <motion.span
                    layoutId={reduce ? undefined : "hero-step-marker"}
                    className="hidden h-[2px] w-5 rounded-full sm:block"
                    style={{ backgroundColor: color }}
                    transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div
          className={cn(
            "flex min-w-0 flex-col justify-center border-l pl-5 sm:pl-7",
            panelSurface ? "border-ivory/14 pl-6 sm:pl-8" : embedded ? "border-ink/15 pl-6 sm:pl-9" : "border-forest/10",
          )}
        >
          <p
            className={cn(
              "font-mono text-[0.72rem] font-semibold tabular-nums tracking-[0.04em]",
              panelSurface ? "text-ivory/70" : onPhoto ? "hero-text-legibility" : "text-forest",
            )}
            aria-hidden
          >
            <motion.span animate={{ color: activeColor }} transition={{ duration: 0.5 }}>
              {String(activeStep + 1).padStart(2, "0")}
            </motion.span>
            <span className={panelSurface ? "text-ivory/45" : onPhoto ? "text-ink-soft/80" : "text-forest/40"}>
              {" "}/ {String(total).padStart(2, "0")}
            </span>
          </p>

          <div className="relative mt-2 overflow-hidden pb-2 pt-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={step.id}
                className={cn(
                  "font-display text-[clamp(1.5rem,1.15rem+1.4vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.02em]",
                  panelSurface ? "text-ivory" : onPhoto ? "hero-text-legibility" : "text-forest",
                )}
                initial={reduce ? { opacity: 0 } : { y: "108%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                exit={reduce ? { opacity: 0 } : { y: "-108%" }}
                transition={{ duration: 0.52, ease: motionEase }}
              >
                {step.label}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.span
            className="mt-2.5 block h-[2px] w-12 rounded-full"
            animate={{ backgroundColor: activeColor }}
            transition={{ duration: 0.5 }}
            aria-hidden
          />

          <div className="mt-3 min-h-[3rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={step.id}
                className={cn(
                  "max-w-[20rem] font-sans text-[0.9375rem] leading-[1.45] lg:max-w-[18rem] lg:text-[1rem]",
                  panelSurface
                    ? "text-ivory/86"
                    : embedded
                      ? "text-charcoal lg:text-[1rem] [text-shadow:0_1px_12px_color-mix(in_srgb,var(--color-ivory)_65%,transparent)]"
                      : "text-[1rem] text-charcoal/85 lg:text-[1.0625rem]",
                )}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: motionEase, delay: reduce ? 0 : 0.06 }}
              >
                {step.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className={cn("lg:hidden", embedded && !panelSurface && "text-ink")} aria-hidden>
        <div className="relative flex items-center justify-between py-2">
          <span
            className={cn(
              "absolute inset-x-[7px] top-1/2 h-[2px] -translate-y-1/2 rounded-full",
              panelSurface ? "bg-ivory/14" : "bg-forest/10",
            )}
          />
          <motion.span
            className="absolute inset-x-[7px] top-1/2 h-[2px] origin-left -translate-y-1/2 rounded-full"
            style={{
              backgroundImage: `linear-gradient(90deg, ${STEP_COLORS.join(", ")})`,
              scaleX: reduce ? 1 : pathProgress,
            }}
          />
          {hero.journey.map((item, index) => {
            const isActive = index === activeStep;
            const lit = index <= activeStep;
            const color = STEP_COLORS[index];
            return (
              <span key={item.id} className="relative flex h-4 w-4 items-center justify-center">
                {isActive && !reduce && (
                  <motion.span
                    key={`row-pulse-${index}`}
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
                  />
                )}
                <motion.span
                  className="relative block rounded-full border-2"
                  initial={false}
                  animate={{
                    width: isActive ? 13 : 8,
                    height: isActive ? 13 : 8,
                    backgroundColor: lit ? color : panelSurface ? "#2a2622" : "#f7f4ef",
                    borderColor: lit ? color : panelSurface ? "rgb(250 249 243 / 0.22)" : "rgba(27,61,47,0.28)",
                  }}
                  transition={{ duration: 0.45, ease: motionEase }}
                />
              </span>
            );
          })}
        </div>
        <div className="mt-3 flex items-baseline gap-3">
          <span
            className={cn(
              "font-mono text-[0.75rem] font-medium tabular-nums",
              panelSurface ? "text-ivory/70" : "",
            )}
          >
            <motion.span animate={{ color: activeColor }} transition={{ duration: 0.5 }}>
              {String(activeStep + 1).padStart(2, "0")}
            </motion.span>
            <span className={panelSurface ? "text-ivory/45" : "text-forest/35"}>
              {" "}/ {String(total).padStart(2, "0")}
            </span>
          </span>
          <span className="relative overflow-hidden py-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`row-${step.id}`}
                className={cn(
                  "block font-display text-[1.45rem] font-semibold leading-[1.15]",
                  panelSurface ? "text-ivory" : embedded ? "hero-text-legibility" : "text-forest",
                )}
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                exit={reduce ? { opacity: 0 } : { y: "-110%" }}
                transition={{ duration: 0.45, ease: motionEase }}
              >
                {step.label}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`row-d-${step.id}`}
            className={cn(
              "mt-1.5 text-[0.9375rem] leading-[1.45]",
              panelSurface ? "text-ivory/86" : "text-charcoal",
            )}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: motionEase }}
          >
            {step.description}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="sr-only" aria-live="polite">
        From demand to business — step {activeStep + 1} of {total}: {step.label}.{" "}
        {step.description}
      </p>
    </div>
  );
}
