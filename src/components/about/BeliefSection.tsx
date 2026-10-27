"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { aboutBeliefs, aboutStory as story } from "@/content/about";
import { ensureGsapPlugins, gsap } from "@/lib/gsap/register";

/** Triangle geometry (viewBox 520 × 430). Labels are positioned from the same numbers, so lines and text can't drift. */
const VB = { w: 520, h: 430 };
const NODES = [
  { x: 260, y: 72 },
  { x: 92, y: 302 },
  { x: 428, y: 302 },
] as const;
const CENTRE = { x: 260, y: 214 };
const R = 31;

const ICONS = [
  <g key="b" fill="none" stroke="#faf9f3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="-10" y="-6" width="20" height="14" rx="2" /><path d="M-4 -6V-9h8v3M-10 1h20" /></g>,
  <g key="c" fill="none" stroke="#faf9f3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="0" cy="-5" r="3.2" /><circle cx="-8" cy="-3" r="2.4" /><circle cx="8" cy="-3" r="2.4" /><path d="M-5.5 8c0-3.2 2.4-5 5.5-5s5.5 1.8 5.5 5M-12 6c0-2.4 1.6-3.8 3.8-3.8M12 6c0-2.4-1.6-3.8-3.8-3.8" /></g>,
  <g key="m" fill="none" stroke="#faf9f3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M-10 9h20M-8 9V0h4v9M-2 9V-5h4v14M4 9V-9h4v18" transform="translate(-1 0)" /></g>,
];

const pct = (v: number, t: number) => `${((v / t) * 100).toFixed(3)}%`;

export function BeliefSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsapPlugins();
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
    const ctx = gsap.context(() => {
      const eyebrowLine = q("[data-bl-eline]");
      const eyebrow = q("[data-bl-eyebrow]");
      const lines = q("[data-bl-line]");
      const swoosh = q("[data-bl-swoosh]");
      const paras = q("[data-bl-para]");
      const rows = q("[data-bl-row]");
      const badges = q("[data-bl-badge]");
      const qtext = q("[data-bl-qtext]");
      const arrows = q("[data-bl-arrow]");
      const tri = q("[data-bl-tri]");
      const nodes = q("[data-bl-node]");
      const spokes = q("[data-bl-spoke]");
      const centre = q("[data-bl-centre]");
      const nLabels = q("[data-bl-nlabel]");
      const cLabel = q("[data-bl-clabel]");
      const lTitles = q("[data-bl-ltitle]");
      const lTexts = q("[data-bl-ltext]");
      const lCols = q("[data-bl-lcol]");

      gsap.set(eyebrowLine, { scaleX: 0, transformOrigin: "left" });
      gsap.set(eyebrow, { opacity: 0, x: -18 });
      gsap.set(lines, { yPercent: 115 });
      gsap.set(swoosh, { strokeDashoffset: 1 });
      gsap.set(paras, { opacity: 0, y: 18 });
      gsap.set(rows, { opacity: 0, y: 14 });
      gsap.set(badges, { opacity: 0, scale: 0.7 });
      gsap.set(qtext, { opacity: 0, x: -14 });
      gsap.set(arrows, { opacity: 0, x: -14 });
      gsap.set(tri, { strokeDashoffset: 1 });
      gsap.set(nodes, { opacity: 0, scale: 0.5 });
      gsap.set(spokes, { strokeDashoffset: 1 });
      gsap.set(centre, { opacity: 0, scale: 0.5 });
      gsap.set([...nLabels, ...cLabel], { opacity: 0, y: 10 });
      gsap.set([...lTitles, ...lTexts], { opacity: 0, y: 14 });
      gsap.set(lCols, { scaleY: 0, transformOrigin: "top" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.to(eyebrowLine, { scaleX: 1, duration: 0.5 }, 0)
        .to(eyebrow, { opacity: 1, x: 0, duration: 0.6 }, 0.05)
        .to(lines, { yPercent: 0, duration: 0.85, stagger: 0.14 }, 0.3)
        .to(swoosh, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.9)
        .to(paras, { opacity: 1, y: 0, duration: 0.65, stagger: 0.18 }, 1.0)
        .to(rows, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, 1.55)
        .to(badges, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.12 }, 1.6)
        .to(qtext, { opacity: 1, x: 0, duration: 0.55, stagger: 0.12 }, 1.7)
        .to(arrows, { opacity: 1, x: 0, duration: 0.5, stagger: 0.12 }, 1.85)
        // diagram
        .to(tri, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0.6)
        .to(nodes, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2 }, 0.9)
        .to(nLabels, { opacity: 1, y: 0, duration: 0.55, stagger: 0.2 }, 1.0)
        .to(spokes, { strokeDashoffset: 0, duration: 0.9, stagger: 0.18, ease: "power2.inOut" }, 1.9)
        .to(centre, { opacity: 1, scale: 1, duration: 0.8 }, 2.6)
        .to(cLabel, { opacity: 1, y: 0, duration: 0.6 }, 2.8)
        .to(lCols, { scaleY: 1, duration: 0.6, stagger: 0.15 }, 3.0)
        .to(lTitles, { opacity: 1, y: 0, duration: 0.55, stagger: 0.2 }, 3.0)
        .to(lTexts, { opacity: 1, y: 0, duration: 0.55, stagger: 0.2 }, 3.15);
    }, el);
    return () => ctx.revert();
  }, []);

  const words = story.belief.headline.split(" ");
  const half = Math.ceil(words.length / 2);
  const headLines = [words.slice(0, half).join(" "), words.slice(half).join(" ")];
  const polygon = `M${NODES[0].x} ${NODES[0].y} L${NODES[2].x} ${NODES[2].y} L${NODES[1].x} ${NODES[1].y} Z`;

  return (
    <section ref={root} className="bl" aria-labelledby="belief">
      <div className="bl__bg" aria-hidden="true" />
      <Container className="bl__inner">
        <div className="bl__left">
          <p className="bl__eyebrow"><i data-bl-eline aria-hidden="true" /><span data-bl-eyebrow>{story.belief.kicker}</span></p>
          <h2 id="belief" className="bl__title">
            {headLines.map((l, i) => (
              <span key={i} className="bl__mask"><span data-bl-line className="bl__line">{l}</span></span>
            ))}
          </h2>
          <svg className="bl__swoosh" viewBox="0 0 280 16" aria-hidden="true"><path data-bl-swoosh d="M2 12 C 70 4, 170 3, 278 8" pathLength={1} fill="none" stroke="#b65320" strokeWidth="2.2" strokeLinecap="round" style={{ strokeDasharray: 1 }} /></svg>
          <div className="bl__intro">
            {aboutBeliefs.intro.map((p) => (
              <p key={p} data-bl-para>{p}</p>
            ))}
          </div>
          <ol className="bl__rows" aria-label="The questions we care about">
            {aboutBeliefs.questions.map((q, i) => (
              <li key={q} data-bl-row className="bl__row">
                <span data-bl-badge className="bl__badge" aria-hidden="true">0{i + 1}</span>
                <span data-bl-qtext className="bl__q">{q}</span>
                <svg data-bl-arrow className="bl__arrow" viewBox="0 0 24 16" aria-hidden="true"><path d="M1 8h21M15 1.5 22 8l-7 6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </li>
            ))}
          </ol>
        </div>

        <div className="bl__right">
          <div className="bl__stage">
            <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="bl__svg" role="img" aria-label="Business, customer and market perspectives overlapping to reveal opportunity">
              <defs>
                <radialGradient id="bl-glow"><stop offset="0" stopColor="#e69a61" stopOpacity="0.5" /><stop offset="1" stopColor="#e69a61" stopOpacity="0" /></radialGradient>
                <linearGradient id="bl-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#faf9f3" stopOpacity="0" /><stop offset="1" stopColor="#f3d8c4" stopOpacity="0.55" /></linearGradient>
                <radialGradient id="bl-node" cx="0.35" cy="0.3"><stop offset="0" stopColor="#1f6a56" /><stop offset="1" stopColor="#0c3128" /></radialGradient>
                <radialGradient id="bl-core" cx="0.35" cy="0.3"><stop offset="0" stopColor="#f4b678" /><stop offset="1" stopColor="#d9792b" /></radialGradient>
              </defs>
              <path d={polygon} fill="url(#bl-fill)" />
              <path data-bl-tri d={polygon} pathLength={1} fill="none" stroke="#a7b49d" strokeOpacity="0.75" strokeWidth="2" strokeLinejoin="round" style={{ strokeDasharray: 1 }} />
              {NODES.map((n, i) => (
                <path key={i} data-bl-spoke d={`M${n.x} ${n.y} L${CENTRE.x} ${CENTRE.y}`} pathLength={1} fill="none" stroke="#b65320" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: 1 }} />
              ))}
              {NODES.map((n, i) => (
                <g key={i} data-bl-node style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                  <circle cx={n.x} cy={n.y} r={R} fill="url(#bl-node)" stroke="#a7b49d" strokeOpacity="0.5" strokeWidth="3" />
                  <g transform={`translate(${n.x} ${n.y})`}>{ICONS[i]}</g>
                </g>
              ))}
              <g data-bl-centre style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                <circle cx={CENTRE.x} cy={CENTRE.y} r="46" fill="url(#bl-glow)" />
                <circle cx={CENTRE.x} cy={CENTRE.y} r="30" fill="none" stroke="#e69a61" strokeOpacity="0.45" className="bl__ring" />
                <circle cx={CENTRE.x} cy={CENTRE.y} r="17" fill="url(#bl-core)" />
              </g>
            </svg>
            {story.belief.nodes.map((n, i) => (
              <span
                key={n.label}
                data-bl-nlabel
                className={`bl__nlabel bl__nlabel--${i}`}
                style={{ left: pct(NODES[i].x, VB.w), top: pct(i === 0 ? NODES[i].y - R - 22 : NODES[i].y + R + 24, VB.h) }}
              >
                {n.label}
              </span>
            ))}
            <span data-bl-clabel className="bl__nlabel bl__nlabel--c" style={{ left: pct(CENTRE.x, VB.w), top: pct(CENTRE.y + 62, VB.h) }}>
              {story.belief.centre}
            </span>
          </div>
          <dl className="bl__legend">
            {story.belief.nodes.map((n) => (
              <div key={n.label} className="bl__lcol">
                <span data-bl-lcol className="bl__lrule" aria-hidden="true" />
                <dt data-bl-ltitle>{n.label}</dt>
                <dd data-bl-ltext>{n.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
