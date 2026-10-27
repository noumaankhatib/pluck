"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { closing } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { useClosingChapterAnimation } from "@/components/home/useClosingChapterAnimation";
import { cn } from "@/lib/cn";

const bodyLead = closing.body.slice(0, -1);
const bodyClimax = closing.body[closing.body.length - 1];
const CLIMAX_EM = "out there.";
const [climaxLead] = bodyClimax.split(CLIMAX_EM);

const ctaClass = "closing-chapter__cta group";

export function ClosingCTASection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useClosingChapterAnimation(ref, Boolean(reduce));

  return (
    <section
      ref={ref}
      className="closing-chapter relative overflow-hidden scroll-mt-[var(--header-h)] bg-[#e5e9dd] text-[#123d32]"
      aria-labelledby="closing-heading"
    >
      <div className="absolute left-0 right-0 top-0 z-10 h-px overflow-hidden bg-[#123d32]/10">
        <div
          data-closing-top-rule
          className="h-full w-full origin-left bg-[#b65320]/60"
          aria-hidden
        />
      </div>

      <Container className="relative z-10 pb-10 pt-[clamp(3rem,2rem+3vw,5.5rem)] md:pb-12">
        <div data-closing-label className="mb-6">
          <SectionLabel className="!text-[#123d32]/70">{homeSections.closing.name}</SectionLabel>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-x-12 xl:gap-x-16">
          <div className="min-w-0 lg:col-span-6">
            <h2
              id="closing-heading"
              data-closing-heading
              className="font-display text-[clamp(2rem,1.3rem+2.4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[#123d32]"
            >
              {closing.title}
            </h2>

            <div className="relative mt-7 lg:mt-9">
              <div className="absolute bottom-0 left-[3px] top-0 w-px bg-[#123d32]/15" aria-hidden>
                <div className="relative h-full w-full">
                  <div
                    data-closing-thread
                    className="h-full w-full origin-top bg-[#b65320]"
                  />
                  <div
                    data-closing-thread-sweep
                    className="closing-chapter__thread-sweep absolute inset-0 w-full origin-top bg-gradient-to-b from-[#b65320] to-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4 pl-6 sm:pl-8 lg:max-w-[34rem]">
                {bodyLead.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    data-closing-paragraph
                    className={cn(
                      "text-[#123d32]",
                      i === 0
                        ? "text-[1.0625rem] leading-[1.65] sm:text-[1.125rem]"
                        : "text-[1rem] leading-[1.65] sm:text-[1.0625rem]",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex min-w-0 flex-col lg:col-span-5 lg:col-start-8 lg:justify-center lg:border-l lg:border-[#123d32]/15 lg:pl-12 lg:pt-1">
            <div className="closing-chapter__glow" aria-hidden />
            <svg className="closing-chapter__orbit" viewBox="0 0 420 400" preserveAspectRatio="none" aria-hidden>
              <path
                id="closing-orbit-path"
                data-closing-arc
                d="M 175 283 C 270 283, 370 250, 414 160"
                fill="none"
                stroke="rgb(182 83 32 / 0.4)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <g data-closing-node>
                <circle cx="260" cy="273" r="3" fill="#b65320" />
                <circle cx="361" cy="226" r="3" fill="#b65320" />
                <circle cx="414" cy="160" r="3" fill="#b65320" />
              </g>
              <g data-closing-node className="closing-chapter__runner">
                <circle r="10" fill="rgb(230 154 97 / 0.35)">
                  <animateMotion dur="14s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1">
                    <mpath href="#closing-orbit-path" />
                  </animateMotion>
                </circle>
                <circle r="3.2" fill="#b65320">
                  <animateMotion dur="14s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1">
                    <mpath href="#closing-orbit-path" />
                  </animateMotion>
                </circle>
              </g>
            </svg>
            <span className="mb-5 block h-px w-12 bg-[#b65320]" aria-hidden />
            <p
              data-closing-climax
              className="closing-chapter__climax font-display text-balance text-[clamp(2.25rem,1.4rem+3.4vw,4rem)] font-medium leading-[1.02] tracking-[-0.025em] text-[#123d32]"
            >
              <span className="closing-chapter__mask">
                <span data-closing-climax-part className="inline-block">
                  {climaxLead}
                </span>
              </span>
              <span className="closing-chapter__mask">
                <span data-closing-climax-part className="closing-chapter__em inline-block italic">
                  {CLIMAX_EM}
                </span>
              </span>
            </p>

            <div data-closing-cta className="mt-8">
              <Link href={closing.ctaHref} className={ctaClass}>
                {closing.cta}
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

            <p data-closing-secondary className="mt-5 text-[0.875rem] leading-relaxed text-[#123d32]">
              <Link
                href="#how-we-work"
                className="closing-chapter__secondary-link underline-offset-4 outline-none transition-colors hover:text-[#b65320] focus-visible:text-[#b65320] focus-visible:ring-2 focus-visible:ring-[#b65320]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#e5e9dd]"
              >
                Read our full approach
              </Link>
            </p>
          </div>
        </div>
      </Container>

      <Container className="pb-[clamp(3rem,2rem+3vw,5.5rem)]">
        <div data-closing-media className="relative h-[clamp(11rem,22vw,18rem)] overflow-hidden bg-[#123d32]" aria-hidden>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-gradient-to-b from-[#e5e9dd]/35 to-transparent" aria-hidden />
          <div data-closing-bg className="absolute -inset-y-[10%] inset-x-0 will-change-transform">
            <Image
              src="/images/how-we-work-section-infrastructure.png"
              alt=""
              fill
              className="object-cover object-[62%_42%]"
              sizes="(max-width: 1400px) 100vw, 1400px"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
