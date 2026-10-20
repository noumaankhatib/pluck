"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { disciplines } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import {
  useDisciplinesChapterAnimation,
  type DisciplinesStoryState,
} from "@/components/home/useDisciplinesChapterAnimation";
import { cn } from "@/lib/cn";

const DISCIPLINE_LABELS = [
  "Commercial Strategy",
  "Paid Search",
  "Search & Technology",
] as const;

const NODES = [
  { cx: 148, cy: 248, labelX: 148, labelY: 288 },
  { cx: 400, cy: 68, labelX: 400, labelY: 26 },
  { cx: 652, cy: 248, labelX: 652, labelY: 288 },
] as const;

const HUB = { cx: 400, cy: 188 } as const;

function DisciplineDiagram({
  activeIndex,
  hubLit,
  reduce,
}: {
  activeIndex: number;
  hubLit: boolean;
  reduce: boolean | null;
}) {
  return (
    <div
      className="disc-chapter__diagram relative mx-auto w-full max-w-[34rem] lg:max-w-none"
      aria-hidden
    >
      <div className="relative aspect-[800/340] w-full">
        <svg
          viewBox="0 0 800 340"
          className="absolute inset-0 h-full w-full overflow-visible"
          role="presentation"
        >
          <defs>
            <linearGradient id="disc-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(27 61 47 / 0.55)" />
              <stop offset="100%" stopColor="rgb(189 108 54 / 0.65)" />
            </linearGradient>
          </defs>

          {NODES.map((node, i) => (
            <g key={`line-${i}`}>
              <path
                data-disc-line={i}
                d={`M ${node.cx} ${node.cy} L ${HUB.cx} ${HUB.cy}`}
                fill="none"
                stroke="rgb(27 61 47 / 0.38)"
                strokeWidth="1.75"
                strokeLinecap="round"
                style={reduce ? { strokeDashoffset: 0 } : undefined}
              />
              <path
                data-disc-line-glow={i}
                d={`M ${node.cx} ${node.cy} L ${HUB.cx} ${HUB.cy}`}
                fill="none"
                stroke="url(#disc-line-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity={0}
              />
            </g>
          ))}

          {NODES.map((node, i) => {
            const isActive = !hubLit && activeIndex === i;
            const isJoined = hubLit;
            return (
              <g
                key={`node-${i}`}
                data-disc-node={i}
                className={cn(
                  "disc-chapter__node",
                  isActive && "disc-chapter__node--lit",
                  (isJoined || i <= activeIndex) && "disc-chapter__node--seen",
                  isJoined && "disc-chapter__node--joined",
                )}
              >
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={isActive ? 30 : 26}
                  className="disc-chapter__node-ring transition-[r] duration-300"
                  fill="var(--color-ivory)"
                  stroke="rgb(27 61 47 / 0.42)"
                  strokeWidth="1.5"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={7}
                  className="disc-chapter__node-core transition-colors duration-300"
                  fill="var(--color-forest)"
                />
              </g>
            );
          })}

          <circle
            data-disc-hub-ring
            cx={HUB.cx}
            cy={HUB.cy}
            r={34}
            className={cn(
              "disc-chapter__hub-ring fill-copper/14 transition-opacity duration-300",
              hubLit && "disc-chapter__hub--lit",
            )}
            data-disc-hub
          />
          <circle
            data-disc-hub-core
            cx={HUB.cx}
            cy={HUB.cy}
            r={11}
            className={cn(
              "fill-copper transition-transform duration-300",
              hubLit && "disc-chapter__hub--lit",
            )}
          />
        </svg>

        {NODES.map((node, i) => (
          <span
            key={`label-${i}`}
            data-disc-label={i}
            className={cn(
              "absolute w-max max-w-[8.5rem] -translate-x-1/2 text-center font-mono text-[0.625rem] uppercase leading-snug tracking-[0.14em] transition-colors duration-300 sm:max-w-none sm:text-[0.6875rem]",
              i === 1 ? "-translate-y-full" : "",
              !hubLit && activeIndex === i
                ? "disc-chapter__label--lit text-copper"
                : "text-forest/78",
            )}
            style={{
              left: `${(node.labelX / 800) * 100}%`,
              top: `${(node.labelY / 340) * 100}%`,
            }}
          >
            {DISCIPLINE_LABELS[i]}
          </span>
        ))}

        <p
          data-disc-objective
          className={cn(
            "absolute left-1/2 top-[calc(100%+0.65rem)] w-max max-w-[min(100%,18rem)] -translate-x-1/2 text-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-forest/55 transition-colors duration-300 sm:text-xs",
            hubLit && "disc-chapter__objective--lit text-copper",
          )}
        >
          {disciplines.objective}
        </p>
      </div>
    </div>
  );
}

function PersonCard({
  person,
  index,
  lit,
  hubLit,
  onFocus,
}: {
  person: (typeof disciplines.people)[number];
  index: number;
  lit: boolean;
  hubLit: boolean;
  onFocus: (index: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-6% 0px" });

  useEffect(() => {
    if (inView && !hubLit) onFocus(index);
  }, [inView, index, onFocus, hubLit]);

  return (
    <li
      ref={ref}
      data-disc-profile
      data-disc-profile-index={index}
      className={cn(
        "disc-chapter__profile relative border-b border-forest/14 py-3.5 sm:py-4",
        lit && !hubLit && "disc-chapter__profile--lit",
      )}
    >
      <span
        className="disc-chapter__profile-signal pointer-events-none absolute left-0 top-3.5 bottom-3.5 w-0.5 origin-top scale-y-0 bg-copper/75 transition-transform duration-300 sm:top-4 sm:bottom-4"
        aria-hidden
      />
      <h3 className="font-display text-[clamp(1.28rem,1.05rem+0.75vw,1.65rem)] font-medium leading-[1.15] tracking-[-0.01em] text-forest">
        {person.name}
      </h3>
      <p className="mt-1 font-mono text-[0.6875rem] uppercase leading-snug tracking-[0.12em] text-forest/72 sm:text-[0.75rem]">
        {person.discipline}
      </p>

      <details className="group mt-2.5 sm:mt-3">
        <summary
          className="disc-chapter__bio-trigger flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm border border-forest/14 bg-paper/60 px-3 py-2.5 outline-none transition-colors hover:border-copper/40 focus-visible:ring-2 focus-visible:ring-copper/45 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory [&::-webkit-details-marker]:hidden"
          onMouseEnter={() => onFocus(index)}
          onFocus={() => onFocus(index)}
        >
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-forest/88 group-hover:text-copper">
            <span className="group-open:hidden">Read bio</span>
            <span className="hidden group-open:inline">Hide bio</span>
          </span>
          <span
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-forest/18 text-copper transition-transform duration-300 group-open:rotate-90 group-hover:border-copper/35"
            aria-hidden
          >
            →
          </span>
        </summary>
        <p className="mt-2.5 border-l-2 border-copper/35 pl-3.5 text-[0.95rem] leading-[1.58] text-charcoal/90 sm:mt-3 sm:pl-4 sm:text-[0.98rem]">
          {person.bio}
        </p>
      </details>
    </li>
  );
}

export function DisciplinesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [story, setStory] = useState<DisciplinesStoryState>({
    activeIndex: 0,
    hubLit: false,
  });

  const onStoryChange = useCallback((next: DisciplinesStoryState) => {
    setStory(next);
  }, []);

  useEffect(() => {
    if (reduce) {
      setStory({ activeIndex: disciplines.people.length - 1, hubLit: true });
    }
  }, [reduce]);

  useDisciplinesChapterAnimation(sectionRef, Boolean(reduce), onStoryChange);

  const focusDiscipline = useCallback((index: number) => {
    setStory({ activeIndex: index, hubLit: false });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="disciplines"
      className="disc-chapter accent-copper relative scroll-mt-[var(--header-h)] overflow-x-clip bg-ivory py-[clamp(1.75rem,1.35rem+1.6vw,3.5rem)] md:py-[clamp(2rem,1.5rem+1.8vw,4rem)]"
      aria-labelledby="disciplines-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/12 to-transparent"
        aria-hidden
      />

      <Container>
        <div className="grid gap-7 lg:grid-cols-12 lg:gap-x-9 lg:gap-y-6 xl:gap-x-11">
          <div data-disc-intro className="min-w-0 lg:col-span-6 lg:row-start-1">
            <SectionLabel className="mb-2.5 lg:mb-3">
              {homeSections.disciplines.name}
            </SectionLabel>
            <h2
              id="disciplines-heading"
              className="font-display text-[clamp(1.65rem,1.02rem+2.35vw,3.05rem)] font-medium leading-[1.08] tracking-[-0.015em] text-balance text-forest"
            >
              {disciplines.headline}
            </h2>
            <p className="mt-3 max-w-[38rem] text-[1.02rem] leading-[1.55] text-charcoal/90 sm:text-[1.0625rem] lg:mt-3.5">
              {disciplines.subheading}
            </p>
            <p className="mt-2.5 max-w-[36rem] text-[0.96rem] leading-[1.58] text-charcoal/82 sm:text-[0.98rem]">
              {disciplines.body}
            </p>
          </div>

          <div
            data-disc-diagram
            className="min-w-0 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:self-start"
          >
            <DisciplineDiagram
              activeIndex={story.activeIndex}
              hubLit={story.hubLit}
              reduce={reduce}
            />
          </div>

          <div data-disc-team className="min-w-0 lg:col-span-6 lg:row-start-2">
            <ul className="border-t border-forest/14" aria-label="The team">
              {disciplines.people.map((person, i) => (
                <PersonCard
                  key={person.name}
                  person={person}
                  index={i}
                  lit={story.activeIndex === i}
                  hubLit={story.hubLit}
                  onFocus={focusDiscipline}
                />
              ))}
            </ul>

            <p
              data-disc-closing
              className="mt-6 font-display text-[clamp(1.35rem,1rem+1.35vw,2.05rem)] font-medium italic leading-[1.18] tracking-[-0.015em] text-copper sm:mt-7"
            >
              {disciplines.closingLine}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
