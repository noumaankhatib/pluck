"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { qualification } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { homeSections } from "@/content/home-sections";
import { ensureGsapPlugins, gsap } from "@/lib/gsap/register";

const EMPHASIS = "every business.";

function CriterionIcon({ index }: { index: number }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {index === 0 && (
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </>
      )}
      {index === 1 && (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" />
        </>
      )}
      {index === 2 && (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </>
      )}
      {index === 3 && (
        <>
          <polygon points="12 2 19 9 12 16 5 9" />
          <line x1="12" y1="16" x2="12" y2="22" />
        </>
      )}
      {index === 4 && <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />}
      {index === 5 && (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

export function QualificationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reduce) return;
    ensureGsapPlugins();
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(s));
    const ctx = gsap.context(() => {
      const head = q("[data-fit-head]");
      const lines = q("[data-fit-line]");
      const emph = q("[data-fit-em]");
      const tags = q("[data-fit-tag]");
      const items = q("[data-fit-item]");
      const guide = q("[data-fit-guide]");
      const rules = q("[data-fit-rule]");
      gsap.set(head, { opacity: 0, y: 12 });
      gsap.set(lines, { opacity: 0, y: 24 });
      gsap.set(emph, { "--g": 0 });
      gsap.set(tags, { opacity: 0, y: 8 });
      gsap.set(items, { opacity: 0, y: 14 });
      gsap.set(guide, { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(rules, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        })
        .to(head, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0)
        .to(lines, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, 0.1)
        .to(emph, { "--g": 1, duration: 1.1 }, 0.45)
        .to(tags, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, 0.55)
        .to(guide, { scaleY: 1, duration: 1.1, ease: "power1.inOut" }, 0.35)
        .to(rules, { scaleX: 1, duration: 0.8, stagger: 0.12 }, 0.5)
        .to(items, { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 }, 0.5);
      gsap.to(emph, { "--g": 0.72, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 });
    }, section);
    return () => ctx.revert();
  }, [reduce]);

  const [lead, tail] = qualification.headline.split(EMPHASIS);

  return (
    <section
      ref={sectionRef}
      id="qualification"
      aria-labelledby="qual-heading"
      className="fit scroll-mt-[var(--header-h)]"
    >
      <div className="fit__bg" aria-hidden />
      <Container className="fit__inner">
        <header className="fit__head">
          <p data-fit-head className="fit__eyebrow">
            <i aria-hidden />
            {homeSections.qualification.name}
          </p>
          <h2 id="qual-heading" className="fit__title">
            <span data-fit-line className="block">
              {lead}
              <em data-fit-em>{EMPHASIS}</em>
              {tail}
            </span>
          </h2>
        </header>

        <div className="fit__body">
          <div className="fit__aside">
            <p data-fit-head className="fit__label">
              {qualification.intro}
            </p>
            <p data-fit-head className="fit__lead">
              {qualification.industriesIntro}
            </p>
            <ul className="fit__tags" aria-label="Example industries">
              {qualification.industries.map((industry) => (
                <li key={industry} data-fit-tag>
                  <span>{industry}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="fit__signals">
            <span className="fit__guide" aria-hidden>
              <span data-fit-guide />
            </span>
            <ol className="fit__list" aria-label="When this approach works well">
              {qualification.criteria.map((item, i) => (
                <li key={item} data-fit-item className="fit__item">
                  <span data-fit-rule className="fit__rule" aria-hidden />
                  <span className="fit__marker" aria-hidden>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="fit__icon">
                    <CriterionIcon index={i} />
                  </span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
