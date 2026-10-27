"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { intro } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { homeSections } from "@/content/home-sections";
import { ensureGsapPlugins, gsap } from "@/lib/gsap/register";

const PREMISE_IMAGE = "/images/premise-section-valley.webp";
const EMPHASIS = "right customers.";

export function IntroNarrativeSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reduce) return;
    ensureGsapPlugins();
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(s));
    const ctx = gsap.context(() => {
      const eyebrow = q("[data-pm-eyebrow]");
      const lead = q("[data-pm-lead]");
      const lines = q("[data-pm-line]");
      const emphasis = q("[data-pm-emphasis]");
      const paras = q("[data-pm-para]");
      const media = q("[data-pm-media]");
      const img = q("[data-pm-img]");

      gsap.set(eyebrow, { opacity: 0, x: -18 });
      gsap.set(lead, { opacity: 0, y: 16 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set(emphasis, { yPercent: 110 });
      gsap.set(paras, { opacity: 0, y: 14 });
      gsap.set(media, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(img, { scale: 1.02 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.to(eyebrow, { opacity: 1, x: 0, duration: 0.5 }, 0)
        .to(lead, { opacity: 1, y: 0, duration: 0.55 }, 0.1)
        .to(lines, { yPercent: 0, duration: 0.7 }, 0.25)
        .to(emphasis, { yPercent: 0, duration: 0.7 }, 0.45)
        .to(paras, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 }, 0.7)
        .to(media, { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power2.inOut" }, 0.15)
        .to(img, { scale: 1, duration: 0.9 }, 0.15);
    }, section);
    return () => ctx.revert();
  }, [reduce]);

  const [lead, headline, ...rest] = intro.sentences;
  const cut = headline.indexOf(EMPHASIS);
  const headlineLead = cut >= 0 ? headline.slice(0, cut).trimEnd() : headline;
  const headlineEmphasis = cut >= 0 ? headline.slice(cut) : "";

  return (
    <section
      ref={sectionRef}
      id="opportunity"
      className="intro-chapter pm relative overflow-hidden bg-[#faf9f3] text-[#123d32]"
      aria-labelledby="intro-heading"
    >
      <Container className="pm__inner">
        <div className="pm__copy">
          <p data-pm-eyebrow className="pm__eyebrow">
            <i aria-hidden="true" />
            {homeSections.intro.name}
          </p>
          <p data-pm-lead className="pm__lead">{lead}</p>
          <h2 id="intro-heading" className="pm__title">
            <span className="pm__mask"><span data-pm-line className="pm__line">{headlineLead}</span></span>
            {headlineEmphasis && (
              <span className="pm__mask"><span data-pm-emphasis className="pm__line pm__em">{headlineEmphasis}</span></span>
            )}
          </h2>
          {rest.map((s) => (
            <p key={s} data-pm-para className="pm__p">{s}</p>
          ))}
          <p data-pm-para className="pm__anchor">{intro.anchor}</p>
        </div>

      </Container>
      <figure data-pm-media className="pm__media">
        <div data-pm-img className="pm__img">
          <Image
            src={PREMISE_IMAGE}
            alt="A person on a hilltop at sunrise looking across a valley, with glowing connections linking hidden insights, potential customers and market opportunities"
            width={1672}
            height={941}
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="pm__photo"
          />
        </div>
      </figure>
    </section>
  );
}
