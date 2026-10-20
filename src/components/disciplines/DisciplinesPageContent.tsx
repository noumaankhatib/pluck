"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  disciplinesPageConclusion,
  disciplinesPageHero,
  disciplinesPagePeople,
} from "@/content/disciplines-page";
import { DisciplinesPageDiagram } from "@/components/disciplines/DisciplinesPageDiagram";
import { useDisciplinesPageAnimation } from "@/components/disciplines/useDisciplinesPageAnimation";
import { cn } from "@/lib/cn";

const PROFILE_ACCENTS = [
  "disc-page__profile--accent-strategy",
  "disc-page__profile--accent-search",
  "disc-page__profile--accent-tech",
] as const;

export function DisciplinesPageContent() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  useDisciplinesPageAnimation(rootRef, Boolean(reduce));

  return (
    <main ref={rootRef} aria-label="Disciplines" className="disc-page">
      <section
        data-disc-page-hero
        className="relative overflow-hidden bg-[#003D32] py-12 text-[#F7F3EA] sm:py-14 md:py-16 lg:py-[4.5rem]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_78%_15%,rgb(216_120_63/0.11),transparent_58%)]"
          aria-hidden
        />
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
            <div className="min-w-0 lg:col-span-5 xl:col-span-5">
              <p
                data-disc-page-eyebrow
                className="type-eyebrow mb-3 text-[#D8783F]"
              >
                {disciplinesPageHero.eyebrow}
              </p>
              <h1
                data-disc-page-headline
                className="font-display max-w-[22rem] text-[clamp(2.05rem,4.2vw,3.15rem)] font-medium leading-[1.1] tracking-[-0.022em] text-[#F7F3EA] sm:max-w-xl lg:max-w-[24rem]"
              >
                {disciplinesPageHero.headline}
              </h1>
              <p
                data-disc-page-hero-body
                className="mt-5 max-w-[34rem] text-[0.96rem] leading-[1.65] text-[#F7F3EA]/90 sm:mt-6 sm:text-[1rem]"
              >
                {disciplinesPageHero.body}
              </p>
            </div>
            <div
              data-disc-page-hero-diagram
              className="flex min-w-0 items-center justify-center lg:col-span-7 lg:col-start-6 lg:justify-end"
            >
              <DisciplinesPageDiagram idPrefix="disc-page-hero" />
            </div>
          </div>
        </Container>
      </section>

      <section
        data-disc-page-profiles
        className="relative bg-[#F7F3EA] py-12 sm:py-14 md:py-16 lg:py-[var(--section-space)]"
      >
        <div
          data-disc-page-bridge
          className="pointer-events-none absolute left-1/2 top-0 z-10 h-10 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-[#D8783F] to-[#D8783F]/30"
          aria-hidden
        />
        <Container>
          <div className="relative pt-2">
            <div
              className="pointer-events-none absolute left-6 top-14 bottom-4 w-px overflow-hidden bg-[#003D32]/10 lg:hidden"
              aria-hidden
            >
              <div
                data-disc-page-thread-v
                className="h-full w-full origin-top bg-gradient-to-b from-[#D8783F]/35 via-[#D8783F] to-[#003D32]/25"
              />
            </div>
            <div
              className="pointer-events-none absolute left-[6%] right-[6%] top-14 hidden h-px overflow-hidden bg-[#003D32]/10 lg:block"
              aria-hidden
            >
              <div
                data-disc-page-thread-h
                className="h-full w-full origin-left bg-gradient-to-r from-[#D8783F]/30 via-[#D8783F] to-[#A8B9AC]/50"
              />
            </div>

            <ul className="relative grid gap-7 lg:grid-cols-3 lg:gap-5 xl:gap-7">
              {disciplinesPagePeople.map((person, i) => (
                <li key={person.name} className="flex min-h-0">
                  <article
                    data-disc-page-profile
                    data-disc-page-profile-index={i}
                    className={cn(
                      "disc-page__profile relative flex h-full min-h-[18rem] w-full flex-col border border-[#003D32]/12 bg-[#FDFBF7] px-6 py-8 sm:px-7 sm:py-9",
                      PROFILE_ACCENTS[i],
                    )}
                  >
                    <span
                      data-disc-page-profile-bar
                      className="disc-page__profile-bar absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0"
                      aria-hidden
                    />
                    <p className="type-eyebrow mb-3 text-[#D8783F]">
                      {person.label}
                    </p>
                    <h2 className="font-display text-[1.4rem] font-medium leading-[1.15] text-[#003D32] sm:text-[1.5rem]">
                      {person.name}
                    </h2>
                    <p className="mt-2 text-[0.8125rem] font-medium leading-snug tracking-[0.02em] text-[#5f7268]">
                      {person.role}
                    </p>
                    <p className="mt-4 flex-1 text-[0.95rem] leading-[1.68] text-[#1a1a18]/82 sm:mt-5 sm:text-[0.97rem]">
                      {person.body}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        data-disc-page-conclusion
        className="relative overflow-hidden bg-[#002D25] py-12 text-[#F7F3EA] sm:py-14 md:py-16 lg:py-[var(--section-space)]"
      >
        <div
          data-disc-page-conclusion-rule
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-[#D8783F]/55 to-transparent"
          aria-hidden
        />
        <Container>
          <div
            className="disc-page__conclusion-panel max-w-2xl border-l-2 border-[#D8783F]/45 py-1 pl-6 sm:pl-8"
          >
            {disciplinesPageConclusion.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                data-disc-page-conclusion-p
                className="text-[1.02rem] leading-[1.68] text-[#F7F3EA]/92 [&+&]:mt-4 sm:text-[1.0625rem]"
              >
                {paragraph}
              </p>
            ))}
            <div data-disc-page-conclusion-cta className="mt-9 sm:mt-10">
              <Link
                href={disciplinesPageConclusion.ctaHref}
                className={cn(
                  "group inline-flex min-h-11 items-center justify-center gap-2.5 px-8 py-3 text-sm font-medium tracking-wide",
                  "bg-[#F7F3EA] text-[#003D32] transition-[background-color,transform,box-shadow] duration-300",
                  "hover:-translate-y-px hover:bg-white hover:shadow-[0_8px_24px_rgb(0_0_0/0.22)]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D8783F]",
                )}
              >
                {disciplinesPageConclusion.cta}
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  <path
                    d="M1 5h12M8 1l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
