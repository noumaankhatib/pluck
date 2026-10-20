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

const ctaClass = cn(
  "closing-chapter__cta group inline-flex min-h-12 w-full items-center justify-center gap-3 px-9 py-3 font-sans text-[0.9375rem] font-medium tracking-[0.05em] sm:w-auto",
  "bg-[#F5F0E7] text-[#092F28] transition-[background-color,color,transform,box-shadow] duration-300",
  "hover:bg-[#faf9f3] hover:shadow-[0_12px_32px_-16px_rgb(0_0_0/0.55)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper/70 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal/80",
  "active:scale-[0.99]",
);

export function ClosingCTASection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useClosingChapterAnimation(ref, Boolean(reduce));

  return (
    <section
      ref={ref}
      id="how-we-work"
      className="closing-chapter accent-copper relative overflow-hidden scroll-mt-[var(--header-h)] bg-charcoal"
      aria-labelledby="closing-heading"
    >
      <div
        data-closing-bg
        className="pointer-events-none absolute inset-0 will-change-transform"
        aria-hidden
      >
        <Image
          src="/images/hero-infrastructure.png"
          alt=""
          fill
          className="object-cover object-[62%_42%] saturate-[1.05] contrast-[1.04]"
          sizes="100vw"
          quality={88}
          priority={false}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-charcoal/88 via-charcoal/52 to-[#003c32]/22"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-[#C87945]/10"
          aria-hidden
        />
        <div className="absolute inset-y-0 left-0 w-[min(58%,28rem)] bg-gradient-to-r from-charcoal/55 to-transparent" aria-hidden />
      </div>

      <div className="absolute left-0 right-0 top-0 z-10 h-px overflow-hidden bg-ivory/10">
        <div
          data-closing-top-rule
          className="h-full w-full origin-left bg-gradient-to-r from-copper/20 via-copper/55 to-copper/25"
          aria-hidden
        />
      </div>

      <Container className="relative z-10 py-[clamp(2.75rem,2rem+3vw,5.25rem)] md:py-[clamp(3rem,2.25rem+3.5vw,5.75rem)]">
        <div data-closing-label className="mb-3 lg:mb-4">
          <SectionLabel tone="dark">
            {homeSections.closing.name}
          </SectionLabel>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8 xl:gap-x-14">
          <div className="min-w-0 lg:col-span-7">
            <h2
              id="closing-heading"
              data-closing-heading
              className="font-display text-[clamp(1.65rem,1.1rem+2vw,2.65rem)] font-medium leading-[1.12] tracking-[-0.02em] text-[#F5F0E7]"
            >
              {closing.title}
            </h2>

            <div className="relative mt-6 sm:mt-7 lg:mt-8">
              <div
                className="absolute bottom-0 left-[3px] top-0 w-px bg-ivory/14"
                aria-hidden
              >
                <div className="relative h-full w-full">
                  <div
                    data-closing-thread
                    className="h-full w-full origin-top bg-gradient-to-b from-copper/35 via-copper/55 to-copper/30"
                  />
                  <div
                    data-closing-thread-sweep
                    className="closing-chapter__thread-sweep absolute inset-0 w-full origin-top bg-gradient-to-b from-copper-soft/90 via-copper/50 to-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4 pl-6 sm:space-y-[1.15rem] sm:pl-7 lg:max-w-[34rem]">
                {bodyLead.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    data-closing-paragraph
                    className={
                      i === 0
                        ? "text-[1.02rem] leading-[1.62] text-[#F5F0E7]/94 sm:text-[1.0625rem] lg:text-[1.1rem]"
                        : "text-[0.98rem] leading-[1.6] text-[#F5F0E7]/86 sm:text-[1.02rem] lg:text-[1.0625rem]"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center lg:col-span-5 lg:pt-6 xl:pt-10">
            <span
              className="mb-4 hidden h-px w-12 origin-left bg-copper/55 lg:block"
              aria-hidden
            />
            <p
              data-closing-climax
              className="closing-chapter__climax font-display text-balance text-[clamp(2rem,1.25rem+3.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.025em] text-[#F5F0E7]"
            >
              {bodyClimax}
            </p>

            <div data-closing-cta className="mt-7 sm:mt-8">
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

            <p
              data-closing-secondary
              className="mt-5 text-[0.8125rem] leading-relaxed text-[#F5F0E7]/68 sm:mt-6"
            >
              <Link
                href="/how-we-work"
                className="closing-chapter__secondary-link underline-offset-4 outline-none transition-colors hover:text-[#F5F0E7] focus-visible:text-[#F5F0E7] focus-visible:ring-2 focus-visible:ring-copper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Read our full approach
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
