"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { aboutBeliefs, aboutIntro } from "@/content/about";
import { aboutStory as story } from "@/content/about";
import { ensureGsapPlugins, gsap } from "@/lib/gsap/register";

const OBJECTIVE_LINES = ["Finding the", "business", "customers are", "missing"];

const ICONS = [
  <svg key="r" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="17" width="5" height="9" /><rect x="13.5" y="11" width="5" height="15" /><rect x="22" y="5" width="5" height="21" /></svg>,
  <svg key="s" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true"><circle cx="13.5" cy="13.5" r="8" /><path d="M19.5 19.5 27 27" /></svg>,
  <svg key="t" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 5 28 11 16 17 4 11Z" /><path d="m4 16 12 6 12-6" /><path d="m4 21 12 6 12-6" /></svg>,
];

/** Dotted wave mesh for the lower-right corner (deterministic, so SSR and client match). */
const DOTS = (() => {
  const out: string[] = [];
  for (let k = 0; k < 9; k++) {
    for (let i = 0; i < 70; i++) {
      const x = 80 + i * 10.4;
      const y = 330 - i * 2.6 + Math.sin(i * 0.16 + k * 0.5) * (22 + k * 5) + k * 11;
      out.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
  }
  return out;
})();

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}><span className="tg__wm"><span data-tg-word className="tg__w">{w}</span></span>{" "}</span>
      ))}
    </>
  );
}

type Geo = { w: number; h: number; paths: string[]; node: { x: number; y: number } };

export function TogetherSection() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const node = useRef<HTMLSpanElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const ready = geo !== null;

  const measure = useCallback(() => {
    const st = stage.current;
    const nd = node.current;
    if (!st || !nd) return;
    const sr = st.getBoundingClientRect();
    const nr = nd.getBoundingClientRect();
    const n = { x: nr.left + nr.width / 2 - sr.left, y: nr.top + nr.height / 2 - sr.top };
    const paths = Array.from(st.querySelectorAll<HTMLElement>("[data-tg-pill]")).map((p) => {
      const r = p.getBoundingClientRect();
      const x1 = r.right - sr.left;
      const y1 = r.top + r.height / 2 - sr.top;
      const dx = (n.x - x1) * 0.55;
      return `M${x1.toFixed(2)} ${y1.toFixed(2)} C${(x1 + dx).toFixed(2)} ${y1.toFixed(2)} ${(n.x - dx).toFixed(2)} ${n.y.toFixed(2)} ${n.x.toFixed(2)} ${n.y.toFixed(2)}`;
    });
    setGeo({ w: sr.width, h: sr.height, paths, node: n });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    const ro = new ResizeObserver(measure);
    ro.observe(st);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsapPlugins();
    const q = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
    let stopped = false;
    const live: gsap.core.Animation[] = [];
    const ctx = gsap.context(() => {
      const eyebrow = q("[data-tg-eyebrow]");
      const lines = q("[data-tg-line]");
      const sub = q("[data-tg-sub]");
      const words = q("[data-tg-word]");
      const pIcons = q("[data-tg-pi]");
      const pNums = q("[data-tg-pn]");
      const pLabels = q("[data-tg-pl]");
      const pills = q("[data-tg-pill]");
      const paths = q<SVGPathElement>("[data-tg-path]");
      const glows = q("[data-tg-glow]");
      const dots = q("[data-tg-dot]");
      const parts = q<SVGCircleElement>("[data-tg-particle]");
      const nodeEl = q("[data-tg-node]");
      const objLabel = q("[data-tg-obj-label]");
      const objRule = q("[data-tg-obj-rule]");
      const objLines = q("[data-tg-obj-line]");

      gsap.set(eyebrow, { opacity: 0, y: 14 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set(sub, { opacity: 0, y: 18 });
      gsap.set(words, { opacity: 0, y: 14 });
      gsap.set(pIcons, { opacity: 0, scale: 0.8 });
      gsap.set(pNums, { opacity: 0, y: 8 });
      gsap.set(pLabels, { opacity: 0, x: -12 });
      gsap.set(pills, { opacity: 0, x: -28 });
      gsap.set([...paths, ...glows], { strokeDashoffset: 1 });
      gsap.set(dots, { opacity: 0, scale: 0.4, transformOrigin: "center" });
      gsap.set(nodeEl, { opacity: 0, scale: 0.6 });
      gsap.set(parts, { opacity: 0 });
      gsap.set(objLabel, { opacity: 0, y: 12 });
      gsap.set(objRule, { scaleX: 0, transformOrigin: "left" });
      gsap.set(objLines, { yPercent: 110 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.6 }, 0)
        .to(lines, { yPercent: 0, duration: 0.9, stagger: 0.14 }, 0.15)
        .to(sub, { opacity: 1, y: 0, duration: 0.7 }, 0.7)
        .to(words, { opacity: 1, y: 0, duration: 0.55, stagger: 0.018 }, 0.95)
        .to(pills, { opacity: 1, x: 0, duration: 0.8, stagger: 0.22 }, 0.9)
        .to(pIcons, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.22 }, 1.1)
        .to(pNums, { opacity: 1, y: 0, duration: 0.5, stagger: 0.22 }, 1.25)
        .to(pLabels, { opacity: 1, x: 0, duration: 0.6, stagger: 0.22 }, 1.3)
        .to(paths, { strokeDashoffset: 0, duration: 1.1, stagger: 0.18, ease: "power2.inOut" }, 1.7)
        .to(glows, { strokeDashoffset: 0, duration: 1.1, stagger: 0.18, ease: "power2.inOut" }, 1.7)
        .to(dots, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 }, 1.7)
        .to(objLabel, { opacity: 1, y: 0, duration: 0.6 }, 2.3)
        .to(objRule, { scaleX: 1, duration: 0.6 }, 2.5)
        .to(objLines, { yPercent: 0, duration: 0.85, stagger: 0.12 }, 2.5);

      // Particles travel the exact SVG paths, then the node lights up.
      let arrived = 0;
      paths.forEach((path, i) => {
        const p = parts[i];
        if (!p) return;
        const proxy = { t: 0 };
        const run = () => {
          if (stopped) return;
          const len = path.getTotalLength();
          gsap.set(p, { opacity: 0 });
          live.push(gsap.to(proxy, {
            t: 1,
            duration: 1.5,
            delay: i * 0.18,
            ease: "power1.inOut",
            onStart: () => gsap.set(p, { opacity: 1 }),
            onUpdate: () => {
              const pt = path.getPointAtLength(proxy.t * len);
              p.setAttribute("cx", String(pt.x));
              p.setAttribute("cy", String(pt.y));
            },
            onComplete: () => {
              gsap.to(p, { opacity: 0, duration: 0.3 });
              proxy.t = 0;
              arrived++;
              if (arrived % 3 === 0) {
                gsap.fromTo(nodeEl, { scale: 1 }, { scale: 1.12, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" });
              }
              live.push(gsap.delayedCall(5.5, run));
            },
          }));
        };
        tl.add(run, 3.0);
      });
      tl.to(nodeEl, { opacity: 1, scale: 1, duration: 0.9 }, 3.2);
    }, el);
    return () => { stopped = true; live.forEach((a) => a.kill()); ctx.revert(); };
  }, [ready]);

  const disciplines = story.approach.disciplines;
  const headlineLines = story.together.headline.split(/(?<=\.)\s+/);
  const [lead, ...rest] = aboutBeliefs.closing;

  return (
    <section ref={root} className="tg" aria-labelledby="together">
      <div className="tg__bg" aria-hidden="true">
        <svg className="tg__wave tg__wave--tl" viewBox="0 0 600 420" preserveAspectRatio="xMinYMin slice">
          <defs>
            <linearGradient id="tg-g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1c8a63" stopOpacity="0.7" /><stop offset="1" stopColor="#0a4a39" stopOpacity="0" /></linearGradient>
          </defs>
          <path d="M-20 300 C 80 180, 190 120, 330 0 L -20 0 Z" fill="url(#tg-g1)" />
          <path d="M-20 340 C 120 200, 240 110, 420 -10" fill="none" stroke="#3fcf93" strokeOpacity="0.35" strokeWidth="1.2" />
        </svg>
        <svg className="tg__wave tg__wave--br" viewBox="0 0 900 520" preserveAspectRatio="xMaxYMax slice">
          <defs>
            <linearGradient id="tg-g2" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#0b5a43" stopOpacity="0" /><stop offset="0.7" stopColor="#1f9a6e" stopOpacity="0.55" /><stop offset="1" stopColor="#7ee6b4" stopOpacity="0.75" /></linearGradient>
          </defs>
          <path d="M120 520 C 360 330, 600 360, 900 120 L 900 520 Z" fill="url(#tg-g2)" opacity="0.55" />
          <path d="M60 520 C 340 360, 620 340, 900 90" fill="none" stroke="#9af0c6" strokeOpacity="0.55" strokeWidth="1.3" />
          <g fill="#b6f5d6" fillOpacity="0.55">
            {DOTS.map((d, i) => { const [x, y] = d.split(","); return <circle key={i} cx={x} cy={Number(y) + 130} r="1.1" />; })}
          </g>
        </svg>
        <span className="tg__glow" />
      </div>

      <Container className="tg__inner">
        <div className="tg__left">
          <p data-tg-eyebrow className="tg__eyebrow"><i aria-hidden="true" />{story.together.kicker}</p>
          <h2 id="together" className="tg__title">
            {headlineLines.map((l, i) => (
              <span key={i} className="tg__mask"><span data-tg-line className="tg__line">{l}</span></span>
            ))}
          </h2>
          <p data-tg-sub className="tg__sub">{aboutIntro.headline}</p>
          <p className="tg__lead"><Words text={lead} /></p>
          {rest.map((p) => (
            <p key={p} className="tg__p"><Words text={p} /></p>
          ))}
        </div>

        <div ref={stage} className="tg__stage">
          <ol className="tg__pills" aria-label="Three disciplines">
            {disciplines.map((d, i) => (
              <li key={d.label} data-tg-pill className="tg__pill">
                <span data-tg-pi className="tg__icon">{ICONS[i]}</span>
                <span data-tg-pn className="tg__num">0{i + 1}</span>
                <span data-tg-pl className="tg__label">{d.label}</span>
              </li>
            ))}
          </ol>
          <span ref={node} className="tg__node-anchor" aria-hidden="true" />
          {geo && (
            <svg className="tg__lines" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
              <defs>
                <filter id="tg-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" /></filter>
                <radialGradient id="tg-node"><stop offset="0" stopColor="#fff3cf" /><stop offset="0.35" stopColor="#f3a24f" /><stop offset="1" stopColor="#e69a61" stopOpacity="0" /></radialGradient>
              </defs>
              {geo.paths.map((d, i) => (
                <g key={i}>
                  <path d={d} pathLength={1} fill="none" stroke="#e69a61" strokeOpacity="0.5" strokeWidth="4" filter="url(#tg-glow)" data-tg-glow style={{ strokeDasharray: 1 }} />
                  <path d={d} pathLength={1} fill="none" stroke="#f5c27a" strokeWidth="1.5" strokeLinecap="round" data-tg-path style={{ strokeDasharray: 1 }} />
                  <circle data-tg-dot cx={d.split(" ")[0].slice(1)} cy={d.split(" ")[1]} r="3.2" fill="#ffd89a" />
                  <circle data-tg-particle r="3.4" fill="#fff3cf" filter="url(#tg-glow)" style={{ opacity: 0 }} />
                </g>
              ))}
              <g data-tg-node transform={`translate(${geo.node.x} ${geo.node.y})`} style={{ transformBox: "fill-box" }}>
                <circle r="30" fill="none" stroke="#e69a61" strokeOpacity="0.28" />
                <circle r="19" fill="url(#tg-node)" opacity="0.8" className="tg__pulse" />
                <circle r="6.5" fill="#f08a2e" stroke="#ffe3b0" strokeWidth="1.5" />
              </g>
            </svg>
          )}
        </div>

        <div className="tg__right">
          <p data-tg-obj-label className="tg__obj-label">One shared objective</p>
          <span data-tg-obj-rule className="tg__rule" aria-hidden="true" />
          <p className="tg__obj" aria-label={story.together.objective}>
            {OBJECTIVE_LINES.map((l) => (
              <span key={l} className="tg__mask" aria-hidden="true"><span data-tg-obj-line className="tg__line">{l}</span></span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
}
