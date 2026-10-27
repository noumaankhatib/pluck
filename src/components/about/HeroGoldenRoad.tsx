"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { aboutStory as story } from "@/content/about";

/** Road centreline, traced from the lane dashes of the supplied artwork (1672 × 941 space). */
const ROAD = "M572 735 C575.0 732.2 584.5 723.5 590 718 C595.5 712.5 600.3 707.0 605 702 C609.7 697.0 610.8 693.7 618 688 C625.2 682.3 636.5 674.0 648 668 C659.5 662.0 670.3 656.8 687 652 C703.7 647.2 731.7 642.2 748 639 C764.3 635.8 773.8 635.0 785 633 C796.2 631.0 805.0 629.2 815 627 C825.0 624.8 830.8 622.3 845 620 C859.2 617.7 880.8 615.0 900 613 C919.2 611.0 938.3 609.3 960 608 C981.7 606.7 1010.0 607.0 1030 605 C1050.0 603.0 1065.0 598.8 1080 596 C1095.0 593.2 1108.3 591.0 1120 588 C1131.7 585.0 1141.3 581.3 1150 578 C1158.7 574.7 1165.0 571.7 1172 568 C1179.0 564.3 1187.2 560.7 1192 556 C1196.8 551.3 1200.2 545.7 1201 540 C1201.8 534.3 1199.7 526.8 1197 522 C1194.3 517.2 1189.5 514.7 1185 511 C1180.5 507.3 1175.5 504.0 1170 500 C1164.5 496.0 1156.0 491.7 1152 487 C1148.0 482.3 1146.3 476.7 1146 472 C1145.7 467.3 1146.0 462.8 1150 459 C1154.0 455.2 1163.3 451.7 1170 449 C1176.7 446.3 1182.2 445.2 1190 443 C1197.8 440.8 1207.0 438.2 1217 436 C1227.0 433.8 1239.2 431.7 1250 430 C1260.8 428.3 1270.0 427.5 1282 426 C1294.0 424.5 1309.0 423.0 1322 421 C1335.0 419.0 1350.3 416.3 1360 414 C1369.7 411.7 1374.2 409.7 1380 407 C1385.8 404.3 1392.2 400.8 1395 398 C1397.8 395.2 1397.8 393.5 1397 390 C1396.2 386.5 1393.7 380.5 1390 377 C1386.3 373.5 1381.7 372.3 1375 369 C1368.3 365.7 1361.7 360.7 1350 357 C1338.3 353.3 1318.0 350.5 1305 347 C1292.0 343.5 1282.3 339.7 1272 336 C1261.7 332.3 1251.0 328.0 1243 325 C1235.0 322.0 1226.2 320.3 1224 318 C1221.8 315.7 1225.7 313.0 1230 311 C1234.3 309.0 1240.8 307.7 1250 306 C1259.2 304.3 1270.0 302.5 1285 301 C1300.0 299.5 1330.8 297.7 1340 297";
const BEACONS = [
  { x: 283, y: 695 },
  { x: 744, y: 490 },
  { x: 1221, y: 306 },
] as const;
const GROWTH = { x: 1385, y: 255 };

const TRAVEL = 7600;
const FINALE = 2000;
const FADE = 1400;
const CYCLE = TRAVEL + FINALE + FADE;

const ease = (t: number) => t * t * (3 - 2 * t) * 0.6 + t * 0.4;
const bump = (p: number, f: number, w: number) => Math.max(0, 1 - Math.abs(p - f) / w);

export function HeroGoldenRoad() {
  const wrap = useRef<HTMLDivElement>(null);
  const road = useRef<SVGPathElement>(null);
  const lit = useRef<SVGPathElement>(null);
  const trailSoft = useRef<SVGPathElement>(null);
  const trailHot = useRef<SVGPathElement>(null);
  const orb = useRef<SVGGElement>(null);
  const car = useRef<SVGGElement>(null);
  const beacons = useRef<(SVGCircleElement | null)[]>([]);
  const growth = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = road.current;
    if (!path || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const L = path.getTotalLength();

    // Where along the road each milestone sits (nearest road point to its beacon).
    const frac = BEACONS.map((b, i) => {
      if (i === 0) return 0;
      if (i === BEACONS.length - 1) return 1;
      let best = 0;
      let bd = Infinity;
      for (let s = 0; s <= 400; s++) {
        const pt = path.getPointAtLength((s / 400) * L);
        const d = Math.hypot(pt.x - b.x, pt.y - b.y);
        if (d < bd) { bd = d; best = s / 400; }
      }
      return best;
    });

    const trailLen = L * 0.07;
    let heading = 0;
    let raf = 0;
    let start = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.1 });
    if (wrap.current) io.observe(wrap.current);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) { start = 0; return; }
      if (!start) start = now;
      const t = (now - start) % CYCLE;
      const travelT = Math.min(1, t / TRAVEL);
      const p = ease(travelT);
      const len = p * L;
      const pt = path.getPointAtLength(len);
      const fade = t > TRAVEL + FINALE ? 1 - (t - TRAVEL - FINALE) / FADE : 1;
      const moving = t < TRAVEL;

      const a = path.getPointAtLength(Math.max(0, len - 14));
      const z = path.getPointAtLength(Math.min(L, len + 14));
      const target = (Math.atan2(z.y - a.y, z.x - a.x) * 180) / Math.PI;
      let diff = target - heading;
      diff = ((diff + 540) % 360) - 180;
      heading += diff * 0.25;
      orb.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      car.current?.setAttribute("transform", `rotate(${heading}) scale(0.72)`);
      orb.current?.setAttribute("opacity", String(t < 260 ? t / 260 : fade));
      if (lit.current) {
        lit.current.style.strokeDashoffset = String(L - len);
        lit.current.style.opacity = String(0.55 * fade);
      }
      const tl = Math.min(trailLen, len);
      for (const [el, k] of [[trailSoft.current, 1], [trailHot.current, 0.4]] as const) {
        if (!el) continue;
        const seg = tl * k;
        el.style.strokeDasharray = `${seg} ${L}`;
        el.style.strokeDashoffset = String(-(len - seg));
        el.style.opacity = String((moving ? 1 : 0) * fade);
      }
      beacons.current.forEach((el, i) => {
        if (!el) return;
        const b = bump(p, frac[i], 0.07) * (t < TRAVEL + 300 ? 1 : 0);
        el.style.opacity = String(b);
        el.style.transform = `scale(${0.6 + b * 0.6})`;
      });
      if (growth.current) {
        const ft = (t - TRAVEL) / FINALE;
        const g = t >= TRAVEL && ft <= 1 ? Math.sin(ft * Math.PI) : 0;
        growth.current.style.opacity = String(g * fade);
        growth.current.style.transform = `scale(${0.85 + g * 0.25})`;
      }
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  return (
    <div
      ref={wrap}
      className="ab-road"
      role="img"
      aria-label={`A golden road winding past three milestones: ${story.hero.markers.join(", ")}`}
    >
      <Image
        src="/images/about-hero-golden-road.webp"
        alt=""
        width={1672}
        height={941}
        sizes="(max-width: 1024px) 94vw, 56vw"
        priority
        className="ab-road__img"
      />
      <svg viewBox="0 0 1672 941" className="ab-road__fx" aria-hidden="true">
        <defs>
          <radialGradient id="ab-glow">
            <stop offset="0" stopColor="#f5dda5" stopOpacity="0.95" />
            <stop offset="0.35" stopColor="#e69a61" stopOpacity="0.55" />
            <stop offset="1" stopColor="#e69a61" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ab-beam" x1="0" x2="1">
            <stop offset="0" stopColor="#fff3cf" stopOpacity="0.7" />
            <stop offset="1" stopColor="#f5dda5" stopOpacity="0" />
          </linearGradient>
          <filter id="ab-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <path ref={road} d={ROAD} fill="none" stroke="none" />
        <path
          ref={lit}
          d={ROAD}
          pathLength={undefined}
          fill="none"
          stroke="#f5dda5"
          strokeWidth="22"
          strokeLinecap="round"
          filter="url(#ab-blur)"
          style={{ strokeDasharray: 99999, strokeDashoffset: 99999, opacity: 0 }}
        />
        <path ref={trailSoft} d={ROAD} fill="none" stroke="#e69a61" strokeWidth="14" strokeLinecap="round" filter="url(#ab-blur)" style={{ opacity: 0 }} />
        <path ref={trailHot} d={ROAD} fill="none" stroke="#fff3cf" strokeWidth="6" strokeLinecap="round" style={{ opacity: 0 }} />
        {BEACONS.map((b, i) => (
          <circle
            key={i}
            ref={(el) => { beacons.current[i] = el; }}
            cx={b.x}
            cy={b.y}
            r="58"
            fill="url(#ab-glow)"
            style={{ opacity: 0, transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
        <circle
          ref={growth}
          cx={GROWTH.x}
          cy={GROWTH.y}
          r="170"
          fill="url(#ab-glow)"
          style={{ opacity: 0, transformBox: "fill-box", transformOrigin: "center" }}
        />
        <g ref={orb} opacity="0">
          <circle r="64" fill="url(#ab-glow)" />
          <g ref={car}>
            <path d="M46 -22 L190 -70 L190 70 L46 22 Z" fill="url(#ab-beam)" />
            <rect x="-34" y="-17" width="68" height="34" rx="13" fill="#f5dda5" stroke="#fff3cf" strokeWidth="3" />
            <rect x="-6" y="-12" width="22" height="24" rx="6" fill="#123d32" opacity="0.85" />
            <circle cx="30" cy="-10" r="5" fill="#ffffff" />
            <circle cx="30" cy="10" r="5" fill="#ffffff" />
            <circle cx="-30" cy="-11" r="3.5" fill="#b65320" />
            <circle cx="-30" cy="11" r="3.5" fill="#b65320" />
          </g>
        </g>
      </svg>
    </div>
  );
}
