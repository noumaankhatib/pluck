"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import { intro } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeSections } from "@/content/home-sections";
import { ensureGsapPlugins, gsap } from "@/lib/gsap/register";
import { cn } from "@/lib/cn";

const PREMISE_IMAGE = "/images/premise-section-visual.jpg";

const OPPORTUNITY_POINTS = [
  { cx: 23, cy: 57 },
  { cx: 39, cy: 33 },
  { cx: 57, cy: 29 },
  { cx: 76, cy: 41 },
] as const;

const NETWORK_HUB = { cx: 47, cy: 44 };

function hubPathTo(point: { cx: number; cy: number }): string {
  const { cx, cy } = point;
  const { cx: hx, cy: hy } = NETWORK_HUB;
  const mx = (hx + cx) / 2;
  const my = (hy + cy) / 2 - 4;
  return `M ${hx} ${hy} Q ${mx} ${my} ${cx} ${cy}`;
}

type PremiseNetworkOverlayProps = {
  reduce: boolean | null;
  triggerRef: RefObject<HTMLElement | null>;
};

function PremiseNetworkOverlay({ reduce, triggerRef }: PremiseNetworkOverlayProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    if (reduce || !svgRef.current || !trigger) return;

    ensureGsapPlugins();

    const paths = svgRef.current.querySelectorAll<SVGPathElement>("[data-network-path]");
    const rings = svgRef.current.querySelectorAll<SVGCircleElement>("[data-network-ring]");
    const cores = svgRef.current.querySelectorAll<SVGCircleElement>("[data-network-core]");

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 0,
        });
      });
      gsap.set(rings, { opacity: 0 });
      gsap.set(cores, { opacity: 0 });

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top 70%",
          end: "center 50%",
          scrub: 0.3,
        },
      });

      reveal.to(
        paths,
        {
          strokeDashoffset: 0,
          opacity: 0.4,
          duration: 1,
          stagger: 0.16,
          ease: "none",
        },
        0,
      );

      reveal.to(
        rings,
        {
          opacity: 0.48,
          duration: 0.32,
          stagger: 0.14,
          ease: "power2.out",
        },
        0.1,
      );

      reveal.to(
        cores,
        {
          opacity: 0.72,
          duration: 0.28,
          stagger: 0.14,
          ease: "power2.out",
        },
        0.18,
      );

      reveal.eventCallback("onComplete", () => {
        gsap.to(cores, {
          opacity: 0.5,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.5, from: "random" },
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, [reduce, triggerRef]);

  if (reduce) return null;

  return (
    <svg
      ref={svgRef}
      className="intro-chapter__network pointer-events-none absolute inset-0 z-[2] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {OPPORTUNITY_POINTS.map((point, i) => (
        <path
          key={`path-${i}`}
          data-network-path
          d={hubPathTo(point)}
          fill="none"
          stroke="#e69a61"
          strokeWidth={0.22}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {OPPORTUNITY_POINTS.map((point, i) => (
        <g key={`node-${i}`}>
          <circle
            data-network-ring
            cx={point.cx}
            cy={point.cy}
            r={1.35}
            fill="none"
            stroke="#e69a61"
            strokeWidth={0.28}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            data-network-core
            cx={point.cx}
            cy={point.cy}
            r={0.45}
            fill="#e69a61"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
      <circle
        data-network-ring
        cx={NETWORK_HUB.cx}
        cy={NETWORK_HUB.cy}
        r={0.9}
        fill="none"
        stroke="#e69a61"
        strokeWidth={0.22}
        strokeOpacity={0.4}
        vectorEffect="non-scaling-stroke"
      />
      <circle
        data-network-core
        cx={NETWORK_HUB.cx}
        cy={NETWORK_HUB.cy}
        r={0.35}
        fill="#e69a61"
        fillOpacity={0.6}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function IntroNarrativeSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLQuoteElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const mediaInnerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (reduce) return;

    ensureGsapPlugins();

    const section = sectionRef.current;
    const label = labelRef.current;
    const copy = copyRef.current;
    const close = closeRef.current;
    const anchor = anchorRef.current;
    const media = mediaRef.current;
    const mediaInner = mediaInnerRef.current;

    if (!section || !copy) return;

    const lineInners = copy.querySelectorAll<HTMLElement>("[data-intro-line-inner]");
    const anchorInner = anchor?.querySelector<HTMLElement>("[data-intro-anchor-inner]");
    const copperRule = anchor?.querySelector<HTMLElement>("[data-intro-anchor-rule]");
    const closeLine = close?.querySelector<HTMLElement>("[data-intro-close-line]");

    const ctx = gsap.context(() => {
      if (label) gsap.set(label, { opacity: 0, y: 10 });
      gsap.set(lineInners, { yPercent: 105, opacity: 0 });
      if (close) gsap.set(close, { opacity: 0 });
      if (anchorInner) gsap.set(anchorInner, { y: 10, opacity: 0 });
      if (copperRule) gsap.set(copperRule, { scaleY: 0, transformOrigin: "top center" });
      if (closeLine) gsap.set(closeLine, { scaleX: 0, transformOrigin: "left center" });
      if (media) gsap.set(media, { opacity: 0, y: 12 });
      if (mediaInner) gsap.set(mediaInner, { scale: 1.03 });

      const enter = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "top 34%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      if (label) enter.to(label, { opacity: 1, y: 0, duration: 0.58 }, 0);

      enter.to(
        lineInners,
        { yPercent: 0, opacity: 1, duration: 0.74, stagger: 0.09 },
        0.05,
      );

      if (media) {
        enter.to(media, { opacity: 1, y: 0, duration: 0.85 }, 0.08);
      }

      if (closeLine) {
        enter.to(closeLine, { scaleX: 1, duration: 0.65, ease: "power2.out" }, 0.28);
      }

      if (close) {
        enter.to(close, { opacity: 1, duration: 0.4 }, 0.3);
      }

      if (copperRule) {
        enter.to(copperRule, { scaleY: 1, duration: 0.48, ease: "power2.out" }, 0.34);
      }

      if (anchorInner) {
        enter.to(anchorInner, { y: 0, opacity: 1, duration: 0.68 }, 0.38);
      }

      if (mediaInner) {
        gsap.to(mediaInner, {
          yPercent: 3.5,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.45,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="opportunity"
      className="intro-chapter relative overflow-hidden bg-[#faf9f3] text-[#123d32]"
      aria-labelledby="intro-heading"
    >

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#123d32]/15 to-transparent"
        aria-hidden
      />

      <Container className="relative z-[2] py-14 md:py-20 lg:py-24">
        <div ref={labelRef} className={cn(!reduce && "will-change-transform")}>
          <SectionLabel
            className="mb-8 !text-[#123d32]/70 md:mb-10 [&_span.font-mono]:text-[#b65320]"
          >
            {homeSections.intro.name}
          </SectionLabel>
        </div>

        <div
          className="intro-chapter__stage grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-x-12 xl:gap-x-16"
        >
          <div
            className="intro-chapter__copy-column flex min-w-0 flex-col lg:col-span-5 lg:col-start-1 lg:border-r lg:border-[#123d32]/15 lg:pr-12 xl:pr-14"
          >
            <div ref={copyRef} className="intro-chapter__copy flex flex-col justify-center">
              <div className="intro-chapter__prose space-y-5 md:space-y-6">
                {intro.sentences.map((sentence, index) => (
                  <p
                    key={sentence}
                    data-intro-line
                    className={cn(
                      "overflow-hidden",
                      index === 0 && "intro-chapter__lead",
                      index === 1 && "intro-chapter__emphasis",
                      index >= 2 && "intro-chapter__body",
                    )}
                  >
                    <span data-intro-line-inner className="block">
                      {sentence}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            <div
              ref={closeRef}
              className="intro-chapter__close intro-chapter__close--integrated relative mt-8 pt-7 md:mt-10"
            >
              <span
                data-intro-close-line
                className="absolute left-0 top-0 block h-px w-full max-w-[10rem] origin-left bg-gradient-to-r from-[#b65320]/70 via-[#b65320]/30 to-transparent"
                aria-hidden
              />
              <blockquote
                id="intro-heading"
                ref={anchorRef}
                className="intro-chapter__anchor relative pt-1"
              >
                <span
                  data-intro-anchor-rule
                  className="absolute left-0 top-1 bottom-1 w-[2px] origin-top rounded-full bg-[#b65320]"
                  aria-hidden
                />
                <span
                  data-intro-anchor-inner
                  className="intro-chapter__anchor-text block pl-4 md:pl-5"
                >
                  <span className="text-[#b65320]">{intro.anchor}</span>
                </span>
              </blockquote>
            </div>
          </div>

          <div
            ref={mediaRef}
            className={cn(
              "intro-chapter__media relative min-h-[clamp(18rem,56vw,26rem)] w-full lg:col-span-7 lg:col-start-6 lg:min-h-[32rem] lg:self-stretch",
              "lg:-mr-[calc(var(--gutter)+max(0px,(100vw-var(--content-max))/2))]",
              "lg:w-[calc(100%+var(--gutter)+max(0px,(100vw-var(--content-max))/2))]",
              !reduce && "will-change-transform",
            )}
          >
            <figure className="intro-chapter__figure relative h-full min-h-[inherit] w-full">
              <div className="intro-chapter__frame relative h-full min-h-[inherit] w-full overflow-hidden rounded-sm bg-[#123d32]">
                <div
                  ref={mediaInnerRef}
                  className="intro-chapter__media-inner absolute inset-0 will-change-transform"
                >
                  <Image
                    src={PREMISE_IMAGE}
                    alt="Person surveying a landscape with markers for hidden insights, potential customers, market opportunities, and the right customers"
                    fill
                    unoptimized
                    className="intro-chapter__photo object-cover object-[52%_42%]"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority={false}
                  />
                </div>

                <PremiseNetworkOverlay reduce={reduce} triggerRef={sectionRef} />
                <div className="intro-chapter__scrim-foot pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[14%]" aria-hidden />
              </div>
              <figcaption className="sr-only">
                From broad landscape to specific commercial opportunities: hidden insights,
                potential customers, market opportunities, and the right customers
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
