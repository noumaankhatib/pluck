"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { journey } from "@/content/home";
import { homeSections } from "@/content/home-sections";
import { howWeWorkHero, howWeWorkSteps } from "@/content/how-we-work";
import { disciplinesPageConclusion } from "@/content/disciplines-page";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { motionEase } from "@/lib/motion";

/** Search-term examples shown with the "Find" stage. */
const FIND_QUERIES = [
  "industrial cooling systems",
  "data centre cooling",
  "process cooling systems",
];

const FIND = 1;
const AUTOPLAY_MS = 9000;
const C = 160;
const R = 118;
const NODES = [
  { x: C, y: C - R, pos: "top" },
  { x: C + R, y: C, pos: "right" },
  { x: C, y: C + R, pos: "bottom" },
  { x: C - R, y: C, pos: "left" },
] as const;

function SearchIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 8 10.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function HowWeFindSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const visible = useInView(ref, { amount: 0.35 });
  const entered = useInView(ref, { amount: 0.15, once: true });

  const stages = journey.stages;
  const total = stages.length;
  const [turns, setTurns] = useState(0); // signed step count: autoplay moves forward, clicks take the shortest path
  const [hold, setHold] = useState(false); // hover / focus
  const [manual, setManual] = useState(false); // user picked a stage: stop autoplay
  const active = ((turns % total) + total) % total;
  const [intro, statement] = disciplinesPageConclusion.paragraphs;

  const pick = (i: number) => {
    setManual(true);
    // Take the shortest way round the ring (−1, 0, +1 or +2 steps) so a click never spins the long way.
    setTurns((t) => {
      const cur = ((t % total) + total) % total;
      const delta = ((i - cur + total + 1) % total) - 1;
      return t + delta;
    });
  };

  useEffect(() => {
    if (reduce || manual || hold || !visible) return;
    const id = window.setTimeout(() => setTurns((t) => t + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [reduce, manual, hold, visible, turns]);

  const show = entered || reduce;
  const fade = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 14 },
          animate: show ? { opacity: 1, y: 0 } : undefined,
          transition: { duration: 0.55, delay, ease: motionEase },
        };

  return (
    <section
      ref={ref}
      id="how-we-work"
      aria-labelledby="hwf-heading"
      className="hwf scroll-mt-[var(--header-h)]"
    >
      <span id="approach" className="hwf__anchor" aria-hidden />
      <div className="hwf__bg" aria-hidden />
      <Container className="hwf__inner">
        <header className="hwf__head">
          <motion.p className="hwf__eyebrow" {...fade(0)}>
            <i aria-hidden />
            {homeSections.journey.name}
          </motion.p>
          <motion.h2 id="hwf-heading" className="hwf__title" {...fade(0.08)}>
            {intro}
          </motion.h2>
          <motion.p className="hwf__statement" {...fade(0.18)}>
            {statement}
          </motion.p>
        </header>

        <div
          className="hwf__grid"
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={() => setHold(false)}
        >
          {/* Left — circular process diagram (compact selector on small screens) */}
          <div className="hwf__orbit-col">
            <nav className="hwf__steps" aria-label="Process stages">
              {stages.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => pick(i)}
                  aria-current={i === active ? "step" : undefined}
                  className={cn("hwf__step", i === active && "is-active")}
                >
                  <span>{s.step}</span>
                  {s.title}
                </button>
              ))}
            </nav>

            <div className="hwf__orbit">
              <div className="hwf__orbit-box">
                <svg viewBox="0 0 320 320" className="hwf__svg" aria-hidden>
                  <defs>
                    <linearGradient id="hwf-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#d9672b" />
                      <stop offset="100%" stopColor="#f39a52" />
                    </linearGradient>
                  </defs>
                  <circle cx={C} cy={C} r={R + 22} fill="none" stroke="rgb(196 216 198 / 0.07)" strokeWidth="1" />
                  <circle cx={C} cy={C} r={R} fill="none" stroke="rgb(196 216 198 / 0.18)" strokeWidth="1.5" />
                  <motion.circle
                    cx={C}
                    cy={C}
                    r={R}
                    fill="none"
                    stroke="url(#hwf-grad)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    pathLength={1}
                    transform={`rotate(-90 ${C} ${C})`}
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={show ? { pathLength: 1 } : undefined}
                    style={{ opacity: 0.45 }}
                    transition={{ duration: 1.4, ease: motionEase }}
                  />
                  <g
                    style={{
                      transform: `rotate(${turns * 90}deg)`,
                      transformOrigin: `${C}px ${C}px`,
                      transition: reduce ? "none" : "transform 0.9s cubic-bezier(.65,0,.35,1)",
                    }}
                  >
                    <circle
                      cx={C}
                      cy={C}
                      r={R}
                      fill="none"
                      stroke="url(#hwf-grad)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      pathLength={100}
                      strokeDasharray="9 91"
                      transform={`rotate(-122 ${C} ${C})`}
                    />
                    <circle cx={C} cy={C - R} r="15" fill="rgb(243 154 82 / 0.16)" />
                  </g>
                </svg>

                {NODES.map((n, i) => (
                  <button
                    key={stages[i].title}
                    type="button"
                    onClick={() => pick(i)}
                    aria-current={i === active ? "step" : undefined}
                    aria-label={`${stages[i].step} ${stages[i].title}`}
                    className={cn("hwf__node", `hwf__node--${n.pos}`, i === active && "is-active")}
                    style={{ left: `${(n.x / 320) * 100}%`, top: `${(n.y / 320) * 100}%` }}
                  >
                    <span className="hwf__dot" />
                    <span className="hwf__lbl">
                      <b>{stages[i].step}</b> {stages[i].title}
                    </span>
                  </button>
                ))}

                <div className="hwf__center" aria-hidden>
                  <span className="hwf__center-num">{stages[active].step}</span>
                  <span className="hwf__center-title">{stages[active].title}</span>
                </div>
              </div>
            </div>

            <p className="hwf__loop">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              …and back to {stages[0].title}, continuously.
            </p>
          </div>

          {/* Right — one panel per stage, stacked in a single grid cell so the height never jumps */}
          <div className="hwf__panels">
            {stages.map((s, i) => {
              const isActive = i === active;
              const outro = "outro" in s ? s.outro : undefined;
              return (
                <article
                  key={s.title}
                  className={cn("hwf__panel", isActive && "is-active")}
                  aria-hidden={!isActive}
                  aria-labelledby={`hwf-t-${i}`}
                >
                  <div className="hwf__panel-top">
                    <span className="hwf__num">
                      {s.step}
                      <span> / {String(total).padStart(2, "0")}</span>
                    </span>
                    <span className="hwf__rule" aria-hidden />
                  </div>
                  <h3 id={`hwf-t-${i}`} className={cn("hwf__stage-title", i === total - 1 && "is-last")}>
                    {s.title}
                  </h3>
                  <p className="hwf__question">{howWeWorkSteps[i].question}</p>
                  <p className="hwf__body">{s.body}</p>

                  {i === 2 ? (
                    <ul className="hwf__chips" aria-label="Ways we reach customers">
                      {s.prompts.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="hwf__prompts" aria-label={`${s.title} questions`}>
                      {s.prompts.map((p, k) => (
                        <li key={p}>
                          {i === 3 ? <span className="hwf__idx">{String(k + 1).padStart(2, "0")}</span> : <span className="hwf__bullet" aria-hidden />}
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  {outro ? <p className="hwf__outro">{outro}</p> : null}

                  {i === FIND && (
                    <ul className="hwf__queries" aria-label="Example searches">
                      {FIND_QUERIES.map((q) => (
                        <li key={q}>
                          <SearchIcon />
                          {q}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
            <p className="hwf__cycle">{howWeWorkHero.cycleNote}</p>
          </div>
        </div>

        <div className="hwf__cta">
          <Button href={journey.ctaHref} className="hwf__btn">
            {journey.cta}
            <span className="hwf__btn-arrow" aria-hidden>
              →
            </span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
