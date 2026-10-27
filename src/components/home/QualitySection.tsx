"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { quality } from "@/content/home";
import { homeSections } from "@/content/home-sections";
import { Button } from "@/components/ui/Button";
import { ensureGsapPlugins, gsap } from "@/lib/gsap/register";

const IMAGE = "/images/right-leads-section-target.webp";

const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Node offsets (rem) that sit each dot on the connecting arc. */
const NODE_LEFT = ["-0.58rem", "-1.56rem", "-1.56rem", "-0.58rem"];

const benefits: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Higher Relevance",
    text: "Reach people who truly match what you offer.",
    icon: (
      <svg {...iconProps}>
        <rect x="6" y="28" width="9" height="14" rx="1" />
        <rect x="19.5" y="12" width="9" height="30" rx="1" />
        <rect x="33" y="22" width="9" height="20" rx="1" />
      </svg>
    ),
  },
  {
    title: "Qualified Enquiries",
    text: "Conversations with genuine business interest.",
    icon: (
      <svg {...iconProps}>
        <circle cx="24" cy="15" r="6" />
        <path d="M12 40v-3a8 8 0 0 1 8-8h8a8 8 0 0 1 8 8v3" />
        <circle cx="9" cy="21" r="4" />
        <circle cx="39" cy="21" r="4" />
      </svg>
    ),
  },
  {
    title: "Real Opportunities",
    text: "Leads that can convert into measurable revenue.",
    icon: (
      <svg {...iconProps}>
        <circle cx="22" cy="26" r="15" />
        <circle cx="22" cy="26" r="8" />
        <circle cx="22" cy="26" r="1.5" />
        <path d="M23 25l15-15M33 10h5v5" />
      </svg>
    ),
  },
  {
    title: "Business Value",
    text: "Fewer, better leads that drive long-term growth.",
    icon: (
      <svg {...iconProps}>
        <path d="M24 7l17 9-17 9-17-9 17-9z" />
        <path d="M7 24l17 9 17-9" />
        <path d="M7 32l17 9 17-9" />
      </svg>
    ),
  },
];

export function QualitySection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reduce) return;
    ensureGsapPlugins();
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(s));
    const ctx = gsap.context(() => {
      const media = q("[data-rl-media]");
      const bg = q("[data-rl-bg]");
      const img = q("[data-rl-img]");
      const copy = q("[data-rl-copy]");
      const lines = q("[data-rl-line]");
      const cards = q("[data-rl-card]");
      const icons = q("[data-rl-icon]");
      const nodes = q("[data-rl-node]");
      const path = q("[data-rl-path]");

      gsap.set(bg, { opacity: 0 });
      gsap.set(media, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(img, { scale: 1.03 });
      gsap.set(copy, { opacity: 0, y: 12 });
      gsap.set(lines, { opacity: 0, y: 18 });
      gsap.set(cards, { opacity: 0, x: 28 });
      gsap.set(icons, { scale: 0.8, opacity: 0 });
      gsap.set(nodes, { scale: 0, transformOrigin: "50% 50%" });
      path.forEach((p) => {
        const el = p as unknown as SVGGeometryElement;
        const len = el.getTotalLength?.() ?? 0;
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      });

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        })
        .to(bg, { opacity: 1, duration: 0.8, ease: "power1.out" }, 0)
        .to(media, { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power2.inOut" }, 0)
        .to(img, { scale: 1, duration: 0.9 }, 0)
        .to(copy, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.15)
        .to(lines, { opacity: 1, y: 0, duration: 0.55, stagger: 0.14 }, 0.25)
        .to(path, { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" }, 0.35)
        .to(cards, { opacity: 1, x: 0, duration: 0.55, stagger: 0.08 }, 0.35)
        .to(icons, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.08 }, 0.45)
        .to(nodes, { scale: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)" }, 0.4);
    }, section);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="quality"
      aria-labelledby="quality-heading"
      className="rl scroll-mt-[var(--header-h)]"
    >
      <div data-rl-bg className="rl__glow" aria-hidden />
      <figure data-rl-media className="rl__media" aria-hidden>
        <div data-rl-img className="rl__img">
          <Image
            src={IMAGE}
            alt=""
            width={1060}
            height={819}
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="rl__photo"
          />
        </div>
      </figure>

      <div className="rl__inner">
        <div className="rl__copy">
          <p data-rl-copy className="rl__eyebrow">
            <i aria-hidden />
            {homeSections.quality.name}
          </p>
          <h2 id="quality-heading" className="rl__title">
            <span data-rl-line className="block">{quality.headlineLead}</span>
            <span data-rl-line className="rl__em block">{quality.headlineTurn}</span>
          </h2>
          <p data-rl-copy className="rl__sub">
            {quality.subheading}
          </p>
          <details data-rl-copy className="rl__details group">
            <summary className="rl__more">
              <span className="rl__arrow" aria-hidden>
                →
              </span>
              <span className="group-open:hidden">Read more</span>
              <span className="hidden group-open:inline">Hide detail</span>
            </summary>
            <div className="rl__detail-body">
              {quality.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        </div>

        <div className="rl__cards">
          <div className="rl__stack">
          <svg
            className="rl__path"
            viewBox="0 0 40 362"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              data-rl-path
              d="M40.0 0.0 L34.7 18.1 L29.5 36.2 L24.6 54.3 L20.0 72.4 L16.0 90.5 L12.5 108.6 L9.7 126.7 L7.7 144.8 L6.4 162.9 L6.0 181.0 L6.4 199.1 L7.7 217.2 L9.7 235.3 L12.5 253.4 L16.0 271.5 L20.0 289.6 L24.6 307.7 L29.5 325.8 L34.7 343.9 L40.0 362.0"
              fill="none"
              stroke="rgb(230 154 97 / 0.55)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ol className="rl__list" aria-label="What the right leads bring">
            {benefits.map((b, i) => (
              <li key={b.title} data-rl-card className="rl__card">
                <span
                  data-rl-node
                  className="rl__node"
                  style={{ left: NODE_LEFT[i] }}
                  aria-hidden
                />
                <span data-rl-icon className="rl__icon">
                  {b.icon}
                </span>
                <span className="rl__divider" aria-hidden />
                <span className="rl__text">
                  <strong>{b.title}</strong>
                  <span>{b.text}</span>
                </span>
              </li>
            ))}
          </ol>
          </div>
          <div data-rl-copy className="rl__cta">
            <Button href={quality.ctaHref} className="rl__btn">
              {quality.cta}
              <span className="rl__btn-arrow" aria-hidden>
                →
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
