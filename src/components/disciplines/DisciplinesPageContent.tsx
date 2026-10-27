"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  disciplinesPageConclusion,
  disciplinesPageHero,
  disciplinesPagePeople,
} from "@/content/disciplines-page";
import { useDisciplinesPageAnimation } from "@/components/disciplines/useDisciplinesPageAnimation";
import { cn } from "@/lib/cn";

const PORTRAITS: Record<string, string> = {
  "Michael Simkin": "/images/team/michael-simkin.webp",
  "Junaid Kazi": "/images/team/junaid-kazi.webp",
  "Noumaan Khatib": "/images/team/noumaan-khatib.webp",
};

export function DisciplinesPageContent({ embedded = false }: { embedded?: boolean } = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useDisciplinesPageAnimation(rootRef, Boolean(reduce));

  return (
    <div ref={rootRef} className="disc-page" id={embedded ? "disciplines-detail" : undefined}>
      <section
        data-disc-page-hero
        className="relative overflow-hidden bg-[#123d32] py-12 text-[#faf9f3] md:py-16"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_78%_15%,rgb(230_154_97/0.1),transparent_58%)]"
          aria-hidden
        />
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
            <div className="min-w-0 lg:col-span-5">
              {!embedded && (
                <>
              <p
                  data-disc-page-eyebrow
                  className="type-eyebrow mb-5 flex items-center gap-3 text-[#e69a61]"
                >
                  <span className="h-px w-8 bg-[#e69a61]" aria-hidden />
                  {disciplinesPageHero.eyebrow}
                </p>
                <h1
                  data-disc-page-headline
                  className="font-display text-[clamp(2.1rem,3.7vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#faf9f3]"
                >
                  <span className="disc-line"><span data-disc-line className="block">Three disciplines.</span></span>
                  <span className="disc-line"><span data-disc-line className="block italic text-[#e69a61]">One commercial objective.</span></span>
                </h1>
                  </>
              )}
              <span className="mt-7 block h-px w-14 bg-[#e69a61]/70" aria-hidden />
              <p
                data-disc-page-hero-body
                className="mt-6 max-w-[30rem] text-[0.9375rem] leading-[1.8] text-[#faf9f3]/80"
              >
                <span className="mb-3 block font-display text-[1.25rem] leading-[1.45] tracking-[-0.005em] text-[#faf9f3]">
                  {disciplinesPageHero.body.slice(0, disciplinesPageHero.body.indexOf(".") + 1)}
                </span>
                {disciplinesPageHero.body.slice(disciplinesPageHero.body.indexOf(".") + 1)}
              </p>
            </div>
            <div
              data-disc-page-hero-diagram
              className="flex min-w-0 items-center justify-center lg:col-span-7 lg:justify-end"
            >
              <div className="disc-visual w-full max-w-[48rem]">
                <Image
                  src="/images/three-disciplines-3d-v2.png"
                  alt=""
                  width={1600}
                  height={1214}
                  sizes="(max-width: 1024px) 92vw, 44rem"
                  className="disc-visual__img h-auto w-full"
                  priority
                />
                <p data-disc-page-vlabel className="disc-visual__label" style={{ left: "37%", top: "25%" }}>
                  Paid Search
                </p>
                <p data-disc-page-vlabel className="disc-visual__label" style={{ left: "37%", top: "49%" }}>
                  Commercial <br />Strategy
                </p>
                <p data-disc-page-vlabel className="disc-visual__label" style={{ left: "37%", top: "78%" }}>
                  Search &amp; <br />Technology
                </p>
                <svg
                  className="disc-chart"
                  viewBox="0 0 100 80"
                  aria-hidden
                  style={{ left: "80.8%", top: "46.5%" }}
                >
                  <defs>
                    <linearGradient id="disc-chart-grad" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0" stopColor="#b65320" />
                      <stop offset="0.55" stopColor="#e69a61" />
                      <stop offset="1" stopColor="#f5dda5" />
                    </linearGradient>
                  </defs>
                  {[
                    [4, 16],
                    [26, 28],
                    [48, 40],
                    [70, 54],
                  ].map(([x, h]) => (
                    <rect key={x} data-disc-bar x={x} y={78 - h} width="18" height={h} rx="1" fill="url(#disc-chart-grad)" />
                  ))}
                  <path
                    data-disc-arrow
                    d="M2 52 C 28 48, 52 36, 86 10"
                    pathLength={1}
                    fill="none"
                    stroke="#f5dda5"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path data-disc-arrow-head d="M96 2 L74 6 L90 22 Z" fill="#f5dda5" />
                </svg>
                <p data-disc-growth className="disc-visual__growth" style={{ left: "80.8%", top: "57%" }}>
                  Growth
                </p>
                <p
                  data-disc-page-vlabel
                  className="disc-visual__label disc-visual__label--objective"
                  style={{ left: "80.8%", top: "84%" }}
                >
                  {disciplinesPageHero.objective}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        data-disc-page-profiles
        className="relative bg-[#faf9f3] py-14 text-[#123d32] md:py-20"
      >
        <div
          data-disc-page-bridge
          className="pointer-events-none absolute left-1/2 top-0 z-10 h-10 w-px origin-top -translate-x-1/2 bg-[#b65320]"
          aria-hidden
        />
        <Container>
          <div className="relative">
            <div
              className="pointer-events-none absolute -left-3 bottom-0 top-0 hidden w-px overflow-hidden bg-[#123d32]/12 xl:block"
              aria-hidden
            >
              <div data-disc-page-thread-v className="h-full w-full origin-top bg-[#b65320]" />
            </div>

            <ul className="relative">
              {disciplinesPagePeople.map((person, i) => (
                <li key={person.name} className="border-t border-[#123d32]/15 last:border-b">
                  <article
                    data-disc-page-profile
                    data-disc-page-profile-index={i}
                    className="disc-page__profile relative grid items-center gap-6 py-10 md:grid-cols-12 md:gap-x-12 md:py-14"
                  >
                    <span
                      data-disc-page-profile-bar
                      className="disc-page__profile-bar absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[#b65320]"
                      aria-hidden
                    />
                    <div
                      className={cn(
                        "md:col-span-4",
                        i % 2 === 1 ? "md:order-2 md:col-start-9" : "md:col-start-1",
                      )}
                    >
                      <div
                        data-disc-page-img
                        className="relative aspect-[4/5] w-full max-w-[22rem] overflow-hidden bg-[#e5e9dd]"
                      >
                        <div data-disc-page-img-inner className="absolute inset-0">
                          <Image
                            src={PORTRAITS[person.name]}
                            alt={`Portrait of ${person.name}`}
                            fill
                            sizes="(max-width: 768px) 80vw, 352px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "md:col-span-7",
                        i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-6",
                      )}
                    >
                      <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#b65320]">
                        <span>0{i + 1}</span>
                        <span className="h-px w-8 bg-[#b65320]" aria-hidden />
                        {person.label}
                      </p>
                      <h2 className="mt-4 font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#123d32]">
                        {person.name}
                      </h2>
                      <p className="mt-2 text-[0.9375rem] font-medium tracking-[0.01em] text-[#545c3b]">
                        {person.role}
                      </p>
                      <p className="mt-5 max-w-xl text-base leading-[1.7] text-[#123d32]">
                        {person.body}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        data-disc-page-conclusion
        className="relative overflow-hidden bg-[#e5e9dd] py-12 text-[#123d32] md:py-16 lg:py-20"
      >
        <div
          data-disc-page-conclusion-rule
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-[#b65320]/60"
          aria-hidden
        />
        <Container>
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:gap-y-10">
            <div className="lg:col-span-9">
              <span className="mb-6 block h-px w-12 bg-[#b65320]" aria-hidden />
              <div className="disc-line">
                <p
                  data-disc-page-conclusion-p
                  className="font-display text-balance text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.14] tracking-[-0.02em] text-[#123d32]"
                >
                  {disciplinesPageConclusion.paragraphs[0]}
                </p>
              </div>
            </div>

            <div className="grid gap-8 border-t border-[#123d32]/20 pt-8 lg:col-span-12 lg:grid-cols-12 lg:items-center lg:gap-x-12">
            <div className="lg:col-span-7">
              <p
                data-disc-page-conclusion-p
                className="max-w-[34rem] text-[1.0625rem] leading-[1.75] text-[#123d32]"
              >
                {disciplinesPageConclusion.paragraphs[1]}
              </p>
            </div>
            <div
              data-disc-page-conclusion-cta
              className="lg:col-span-4 lg:col-start-9 lg:flex lg:justify-end"
            >
              <Link href={disciplinesPageConclusion.ctaHref} className="closing-chapter__cta group w-full justify-between sm:w-auto sm:min-w-[14rem]">
                {disciplinesPageConclusion.cta}
                <svg width="16" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
