"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { aboutStory as story, aboutWhyTogether } from "@/content/about";
import { ensureGsapPlugins, gsap } from "@/lib/gsap/register";

export function ApproachSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsapPlugins();
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
    const ctx = gsap.context(() => {
      const eyebrow = q("[data-ap-eyebrow]");
      const lines = q("[data-ap-line]");
      const paras = q("[data-ap-para]");
      const steps = q("[data-ap-step]");
      const nums = q("[data-ap-num]");
      const titles = q("[data-ap-title]");
      const roles = q("[data-ap-role]");
      const texts = q("[data-ap-text]");
      const fill = q("[data-ap-fill]");
      const branches = q("[data-ap-branch]");

      gsap.set(eyebrow, { opacity: 0, y: 12 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set(paras, { opacity: 0, y: 16 });
      gsap.set([...titles, ...roles, ...texts], { opacity: 0, y: 14 });
      gsap.set(nums, { opacity: 0, scale: 0.7 });
      gsap.set(fill, { scaleY: 0, transformOrigin: "top" });
      gsap.set(branches, { scaleX: 0, transformOrigin: "right" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
        defaults: { ease: "power2.out", duration: 0.5 },
      });
      tl.to(eyebrow, { opacity: 1, y: 0 }, 0)
        .to(lines, { yPercent: 0, duration: 0.6, stagger: 0.09 }, 0.06)
        .to(paras, { opacity: 1, y: 0, stagger: 0.08 }, 0.2);
      const at = 0.35;
      steps.forEach((step, i) => {
        const t = at + i * 0.38;
        tl.to(fill, { scaleY: (i + 1) / steps.length, duration: 0.45, ease: "power1.inOut" }, t - 0.1)
          .to(branches[i], { scaleX: 1, duration: 0.35, ease: "power2.out" }, t - 0.15)
          .to(nums[i], { opacity: 1, scale: 1, duration: 0.4 }, t)
          .add(() => step.classList.add("is-on"), t + 0.1)
          .to(titles[i], { opacity: 1, y: 0 }, t + 0.05)
          .to(roles[i], { opacity: 1, y: 0 }, t + 0.13)
          .to(texts[i], { opacity: 1, y: 0 }, t + 0.21);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const words = story.approach.headline.split(" ");
  const half = Math.ceil(words.length / 2);
  const headLines = [words.slice(0, half).join(" "), words.slice(half).join(" ")];

  return (
    <section ref={root} className="cs-section ap" aria-labelledby="about-approach">
      <Container className="ap__inner">
        <div className="ap__left">
          <p data-ap-eyebrow className="ap__eyebrow"><i aria-hidden="true" />{story.approach.kicker}</p>
          <h2 id="about-approach" className="ap__title">
            {headLines.map((l, i) => (
              <span key={i} className="ap__mask"><span data-ap-line className="ap__line">{l}</span></span>
            ))}
          </h2>
          <div className="ap__copy">
            {aboutWhyTogether.body.map((p) => (
              <p key={p} data-ap-para>{p}</p>
            ))}
          </div>
        </div>

        <ol className="ap__steps" aria-label="Three connected disciplines">
          <span className="ap__track" aria-hidden="true"><span data-ap-fill className="ap__fill" /></span>
          {story.approach.disciplines.map((d, i) => (
            <li key={d.label} data-ap-step className="ap__step">
              <span data-ap-branch className="ap__branch" aria-hidden="true" />
              <span data-ap-num className="ap__num" aria-hidden="true">{i + 1}</span>
              <h3 data-ap-title className="ap__h">{d.label}</h3>
              <p data-ap-role className="ap__role">{d.role}</p>
              <p data-ap-text className="ap__text">{d.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
