"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { aboutStory as story, aboutUnderstanding } from "@/content/about";
import { ensureGsapPlugins, gsap } from "@/lib/gsap/register";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ICONS = [
  <svg key="a" viewBox="0 0 32 32" aria-hidden="true" {...stroke}><circle cx="14" cy="14" r="7.5" /><path d="m20 20 7 7" /></svg>,
  <svg key="b" viewBox="0 0 32 32" aria-hidden="true" {...stroke}><path d="M5 26V6M5 26h22" /><path d="m9 20 5-6 4 3 7-9" /></svg>,
  <svg key="c" viewBox="0 0 32 32" aria-hidden="true" {...stroke}><path d="M16 5a8 8 0 0 0-4.5 14.6c.8.7 1.2 1.5 1.2 2.4h6.6c0-.9.4-1.7 1.2-2.4A8 8 0 0 0 16 5Z" /><path d="M13 26h6M14 29h4" /></svg>,
  <svg key="d" viewBox="0 0 32 32" aria-hidden="true" {...stroke}><circle cx="16" cy="16" r="10.5" /><path d="M16 10v12M19.5 12.5c-.8-1-2-1.5-3.5-1.5-2 0-3.2 1-3.2 2.4 0 3.4 7 1.8 7 5.2 0 1.4-1.4 2.4-3.8 2.4-1.5 0-2.8-.5-3.7-1.5" /></svg>,
];

export function AdviceSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsapPlugins();
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
    const ctx = gsap.context(() => {
      const eyebrow = q("[data-ad-eyebrow]");
      const lines = q("[data-ad-line]");
      const rows = q("[data-ad-row]");
      const icons = q("[data-ad-icon]");
      const rules = q("[data-ad-rule]");
      const paras = q("[data-ad-para]");
      const wave = q("[data-ad-wave]");
      const dot = q("[data-ad-dot]");
      gsap.set(eyebrow, { opacity: 0, y: 12 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set(icons, { opacity: 0, scale: 0.7 });
      gsap.set(rules, { scaleX: 0, transformOrigin: "left" });
      gsap.set(paras, { opacity: 0, y: 16 });
      gsap.set(wave, { strokeDashoffset: 1 });
      gsap.set(dot, { opacity: 0, scale: 0.4 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
        defaults: { ease: "power2.out", duration: 0.5 },
      });
      tl.to(eyebrow, { opacity: 1, y: 0 }, 0)
        .to(lines, { yPercent: 0, duration: 0.6, stagger: 0.09 }, 0.06);
      rows.forEach((_, i) => {
        const t = 0.2 + i * 0.14;
        tl.to(rules[i], { scaleX: 1, duration: 0.5 }, t)
          .to(icons[i], { opacity: 1, scale: 1, duration: 0.45 }, t + 0.05)
          .to(paras[i], { opacity: 1, y: 0 }, t + 0.2);
      });
      tl.to(wave, { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" }, 0.3)
        .to(dot, { opacity: 1, scale: 1, duration: 0.4 }, 0.95);
    }, el);
    return () => ctx.revert();
  }, []);

  const words = story.advice.headline.split(" ");
  const half = Math.ceil(words.length / 2);
  const headLines = [words.slice(0, half).join(" "), words.slice(half).join(" ")];

  return (
    <section ref={root} className="cs-section ad" aria-labelledby="advice">
      <div className="ad__bg" aria-hidden="true" />
      <Container className="ad__inner">
        <div className="ad__left">
          <p data-ad-eyebrow className="ad__eyebrow"><i aria-hidden="true" />{story.advice.kicker}</p>
          <h2 id="advice" className="ad__title">
            {headLines.map((l, i) => (
              <span key={i} className="ad__mask"><span data-ad-line className="ad__line">{l}</span></span>
            ))}
          </h2>
        </div>
        <div className="ad__right">
          <ul className="ad__rows">
            {aboutUnderstanding.body.map((p, i) => (
              <li key={p} data-ad-row className="ad__row">
                <span data-ad-rule className="ad__rule" aria-hidden="true" />
                <span data-ad-icon className="ad__icon">{ICONS[i]}</span>
                <p data-ad-para className="ad__p">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <svg className="ad__wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
        <path data-ad-wave d="M-10 112 C 180 112, 260 52, 470 62 S 800 122, 1010 88 S 1260 36, 1330 44" pathLength={1} fill="none" stroke="#b65320" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ strokeDasharray: 1 }} />
      </svg>
      <span data-ad-dot className="ad__dot" aria-hidden="true" />
    </section>
  );
}
