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
      const strip = q("[data-ad-strip]");
      const net = q("[data-ad-net]") as unknown as SVGGeometryElement[];
      const pts = q("[data-ad-pt]");
      const vline = q("[data-ad-vline]");
      const curves = q("[data-ad-curve]") as unknown as SVGGeometryElement[];
      const runner = q("[data-ad-runner]");
      const underline = q("[data-ad-underline]");
      const layers = q("[data-ad-layer]");
      gsap.set(strip, { yPercent: -100 });
      net.concat(curves).forEach((p) => {
        const len = p.getTotalLength?.() ?? 0;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(pts, { opacity: 0 });
      gsap.set(vline, { scaleY: 0, transformOrigin: "top" });
      gsap.set(runner, { opacity: 0 });
      gsap.set(underline, { scaleX: 0, transformOrigin: "left", opacity: 1 });
      gsap.set(layers, { opacity: 0, y: 18 });
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
      tl.to(strip, { yPercent: 0, duration: 0.6 }, 0)
        .to(net, { strokeDashoffset: 0, duration: 1.1, stagger: 0.1, ease: "power1.inOut" }, 0.2)
        .to(pts, { opacity: 1, duration: 0.5, stagger: 0.06 }, 0.5)
        .to(vline, { scaleY: 1, duration: 0.7, ease: "power2.inOut" }, 0.15)
        .to(eyebrow, { opacity: 1, y: 0 }, 0.2)
        .to(lines, { yPercent: 0, duration: 0.6, stagger: 0.09 }, 0.06);
      rows.forEach((_, i) => {
        const t = 0.2 + i * 0.14;
        tl.to(rules[i], { scaleX: 1, duration: 0.5 }, t)
          .to(icons[i], { opacity: 1, scale: 1, duration: 0.45 }, t + 0.05)
          .to(paras[i], { opacity: 1, y: 0 }, t + 0.2);
      });
      tl.to(wave, { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" }, 0.3)
        .to(dot, { opacity: 1, scale: 1, duration: 0.4 }, 0.95)
        .to(underline, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.55)
        .to(underline, { opacity: 0.45, duration: 0.9 }, 1.4)
        .to(curves, { strokeDashoffset: 0, duration: 1.4, stagger: 0.18, ease: "power1.inOut" }, 0.5)
        .to(runner, { opacity: 1, duration: 0.6 }, 1.6)
        .to(layers, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0.7);
    }, el);
    return () => ctx.revert();
  }, []);

  const words = story.advice.headline.split(" ");
  const half = Math.ceil(words.length / 2);
  const headLines = [words.slice(0, half).join(" "), words.slice(half).join(" ")];

  return (
    <section ref={root} className="cs-section ad" aria-labelledby="advice">
      <div data-ad-strip className="ad__strip" aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path data-ad-net d="M0 62 L120 38 L260 54 L400 22 L560 48 L720 18 L880 44 L1040 16 L1200 40 L1330 24 L1440 46" fill="none" stroke="rgb(167 180 157 / 0.35)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path data-ad-net d="M0 78 L180 60 L340 72 L520 58 L700 70 L900 52 L1100 66 L1300 56 L1440 68" fill="none" stroke="rgb(167 180 157 / 0.2)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path data-ad-net d="M260 54 L400 22 M720 18 L880 44 M1040 16 L1200 40" fill="none" stroke="rgb(230 154 97 / 0.55)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        {[[8, 42], [18, 60], [28, 24], [39, 53], [50, 20], [61, 49], [72, 18], [83, 45], [92, 27]].map(([x, y], i) => (
          <i key={i} data-ad-pt className={`ad__pt${i % 3 === 0 ? " ad__pt--warm" : ""}`} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.7}s` }} />
        ))}
      </div>
      <div className="ad__bg" aria-hidden="true" />
      <Container className="ad__inner">
        <div className="ad__left">
          <span data-ad-vline className="ad__vline" aria-hidden="true" />
          <svg className="ad__curves" viewBox="0 0 520 380" aria-hidden="true">
            <path id="ad-curve-a" data-ad-curve d="M-10 330 C 120 330, 170 150, 300 140 S 470 190, 540 90" fill="none" stroke="rgb(167 180 157 / 0.55)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path data-ad-curve d="M-10 372 C 160 360, 230 230, 360 224 S 480 260, 540 190" fill="none" stroke="rgb(167 180 157 / 0.35)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <g data-ad-runner className="ad__runner">
              <circle r="8" fill="rgb(230 154 97 / 0.3)"><animateMotion dur="12s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1"><mpath href="#ad-curve-a" /></animateMotion></circle>
              <circle r="2.8" fill="#b65320"><animateMotion dur="12s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1"><mpath href="#ad-curve-a" /></animateMotion></circle>
            </g>
          </svg>
          <p data-ad-eyebrow className="ad__eyebrow"><i aria-hidden="true" />{story.advice.kicker}</p>
          <h2 id="advice" className="ad__title">
            {headLines.map((l, i) => (
              <span key={i} className="ad__mask"><span data-ad-line className="ad__line">{l}</span></span>
            ))}
          </h2>
          <span data-ad-underline className="ad__ul" aria-hidden="true" />
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
        <g data-ad-layer className="ad__layer ad__layer--a"><path d="M-10 98 C 180 98, 260 38, 470 48 S 800 108, 1010 74 S 1260 22, 1330 30 S 1440 34, 1460 30 V 140 H -10 Z" fill="rgb(167 180 157 / 0.35)" /></g>
        <g data-ad-layer className="ad__layer ad__layer--b"><path d="M-10 112 C 180 112, 260 52, 470 62 S 800 122, 1010 88 S 1260 36, 1330 44 S 1440 48, 1460 44 V 140 H -10 Z" fill="#2a6b57" /></g>
        <g data-ad-layer className="ad__layer ad__layer--c"><path d="M-10 124 C 180 124, 270 74, 480 84 S 800 134, 1010 106 S 1250 62, 1460 70 V 140 H -10 Z" fill="#123d32" /></g>
        <g data-ad-layer className="ad__layer ad__layer--d"><path d="M-10 136 C 200 136, 300 104, 520 112 S 860 140, 1100 124 S 1340 100, 1460 108 V 140 H -10 Z" fill="#0b2c25" /></g>
        <path data-ad-wave d="M-10 112 C 180 112, 260 52, 470 62 S 800 122, 1010 88 S 1260 36, 1330 44" pathLength={1} fill="none" stroke="#b65320" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ strokeDasharray: 1 }} />
      </svg>
      <span className="ad__glow" aria-hidden="true" />
      <span data-ad-dot className="ad__dot" aria-hidden="true" />
    </section>
  );
}
