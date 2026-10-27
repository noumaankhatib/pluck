"use client";

import Image from "next/image";
import { Fragment, useId, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { disciplineColumns, disciplines } from "@/content/home";
import { disciplinesPageHero, disciplinesPagePeople } from "@/content/disciplines-page";
import { homeSections } from "@/content/home-sections";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { ensureGsapPlugins, gsap } from "@/lib/gsap/register";

const PORTRAITS: Record<string, string> = {
  "Michael Simkin": "/images/team/michael-simkin.webp",
  "Junaid Kazi": "/images/team/junaid-kazi.webp",
  "Noumaan Khatib": "/images/team/noumaan-khatib.webp",
};

const EMPHASIS = "commercial objective.";

/* Diagram geometry (viewBox 560 × 400). Index order matches the three disciplines. */
const CX = 280;
const CY = 215;
const NODES = [
  { x: 100, y: 215, label: ["Commercial", "Strategy"], pos: "left" }, // 01 Commercial Strategy
  { x: 280, y: 65, label: ["Paid Search"], pos: "top" }, // 02 Paid Search
  { x: 460, y: 215, label: ["Search &", "Technology"], pos: "right" }, // 03 Search & Technology
] as const;

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};
const ICONS = [
  <svg key="s" {...iconProps}>
    <path d="M12 3 3 8l9 5 9-5-9-5z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 16 9 5 9-5" />
  </svg>,
  <svg key="p" {...iconProps}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m20 20-4.9-4.9" />
  </svg>,
  <svg key="t" {...iconProps}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 5l-4 14" />
  </svg>,
];

export function DisciplinesSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const uid = useId();
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section || reduce) return;
    ensureGsapPlugins();
    const q = (sel: string) => Array.from(section.querySelectorAll<SVGGeometryElement | HTMLElement>(sel));
    const ctx = gsap.context(() => {
      const head = q("[data-dsc-head]");
      const words = q("[data-dsc-w]");
      const emWords = q("[data-dsc-ew]");
      const sub = q("[data-dsc-sub]");
      const arcs = q("[data-dsc-arc]") as SVGGeometryElement[];
      const spokes = q("[data-dsc-path]") as SVGGeometryElement[];
      const ring = q("[data-dsc-ring]");
      const nodes = q("[data-dsc-node]");
      const icons = q("[data-dsc-node] svg");
      const centre = q("[data-dsc-centre]");
      const runner = q("[data-dsc-runner]");
      const colsWrap = q("[data-dsc-cols]");
      const hideLine = (p: SVGGeometryElement) => {
        const len = p.getTotalLength?.() ?? 0;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      };
      gsap.set(head, { opacity: 0, y: 12 });
      gsap.set(words, { yPercent: 110 });
      gsap.set(emWords, { yPercent: 110, opacity: 0 });
      gsap.set(sub, { opacity: 0, y: 14 });
      [...arcs, ...spokes].forEach(hideLine);
      gsap.set(ring, { opacity: 0 });
      gsap.set(nodes, { opacity: 0, scale: 0.8 });
      gsap.set(icons, { opacity: 0, y: 6 });
      gsap.set(centre, { opacity: 0, scale: 0.88, transformOrigin: "50% 50%" });
      gsap.set(runner, { opacity: 0 });

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        })
        .to(head, { opacity: 1, y: 0, duration: 0.45 }, 0)
        .to(words, { yPercent: 0, duration: 0.65, stagger: 0.09 }, 0.1)
        .to(emWords, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, 0.55)
        .to(sub, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 }, 0.7)
        .to(centre, { opacity: 1, scale: 1, duration: 0.8 }, 0.25)
        .to(ring, { opacity: 1, duration: 0.8 }, 0.4)
        .to(spokes, { strokeDashoffset: 0, duration: 0.8, stagger: 0.14, ease: "power1.inOut" }, 0.6)
        .to(arcs, { strokeDashoffset: 0, duration: 1.1, stagger: 0.15, ease: "power1.inOut" }, 0.7)
        .to(nodes, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.16 }, 0.9)
        .to(icons, { opacity: 1, y: 0, duration: 0.45, stagger: 0.16 }, 1.05)
        .to(runner, { opacity: 1, duration: 0.6 }, 1.8);

      // Columns: each one builds in on its own as it scrolls into view.
      q("[data-dsc-col]").forEach((col, k) => {
        const part = (sel: string) => Array.from(col.querySelectorAll<HTMLElement>(sel));
        const rule = part("[data-dsc-crule]");
        const body = part("[data-dsc-ch], [data-dsc-cp]");
        const photo = part("[data-dsc-cphoto]");
        const who = part("[data-dsc-cwho]");
        const line = part("[data-dsc-cdiv]");
        gsap.set(col, { opacity: 1 });
        gsap.set(rule, { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.set(body, { opacity: 0, y: 16 });
        gsap.set(line, { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.set(photo, { opacity: 0, scale: 0.85 });
        gsap.set(who, { opacity: 0, x: 10 });
        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: { trigger: colsWrap[0] ?? col, start: "top 82%", once: true },
            delay: k * 0.14,
          })
          .to(rule, { scaleX: 1, duration: 0.6 }, 0)
          .to(body, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, 0.1)
          .to(line, { scaleX: 1, duration: 0.6 }, 0.45)
          .to(photo, { opacity: 1, scale: 1, duration: 0.6 }, 0.55)
          .to(who, { opacity: 1, x: 0, duration: 0.5 }, 0.7);
      });
    }, section);
    return () => ctx.revert();
  }, [reduce]);

  const [lead] = disciplines.headline.split(EMPHASIS);

  return (
    <section
      ref={ref}
      id="disciplines"
      aria-labelledby="dsc-heading"
      className="dsc scroll-mt-[var(--header-h)]"
    >
      <svg className="dsc__waves" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden>
        <path d="M0 120 C 240 60, 480 150, 760 110 S 1200 40, 1440 100 V220 H0Z" fill="rgb(167 180 157 / 0.14)" />
        <path d="M0 160 C 300 110, 560 190, 880 150 S 1250 100, 1440 150 V220 H0Z" fill="rgb(167 180 157 / 0.16)" />
        <path d="M0 195 C 360 160, 640 215, 960 190 S 1300 160, 1440 190 V220 H0Z" fill="rgb(167 180 157 / 0.18)" />
      </svg>

      <Container className="dsc__inner">
        <div className="dsc__top">
          <header className="dsc__head">
            <span className="dsc__accent" aria-hidden />
            <p data-dsc-head className="dsc__eyebrow">
              {homeSections.disciplines.name}
            </p>
            <h2 id="dsc-heading" className="dsc__title">
              {lead.trim().split(" ").map((w, k) => (
                <Fragment key={`${w}-${k}`}>
                  <span className="dsc__wm">
                    <span data-dsc-w className="dsc__w">
                      {w}
                    </span>
                  </span>{" "}
                </Fragment>
              ))}
              <em>
                {EMPHASIS.split(" ").map((w, k, all) => (
                  <Fragment key={`${w}-${k}`}>
                    <span className="dsc__wm">
                      <span data-dsc-ew className="dsc__w">
                        {w}
                      </span>
                    </span>
                    {k < all.length - 1 ? " " : ""}
                  </Fragment>
                ))}
              </em>
            </h2>
            <p data-dsc-sub className="dsc__sub">
              {disciplines.subheading}
            </p>
            <p data-dsc-sub className="dsc__body">
              {disciplines.body}
            </p>
            <details data-dsc-sub className="dsc__more">
              <summary>
                <span aria-hidden>→</span>
                <em>Read more</em>
                <em className="dsc__less">Hide detail</em>
              </summary>
              <p>{disciplinesPageHero.body}</p>
            </details>
          </header>

          <div className="dsc__diagram">
            <div className="dsc__diagram-box">
              <svg viewBox="0 0 560 400" className="dsc__svg" aria-hidden>
                <defs>
                  <radialGradient id={`${uid}-core`} cx="35%" cy="30%" r="80%">
                    <stop offset="0%" stopColor="#1f5a48" />
                    <stop offset="100%" stopColor="#0d3329" />
                  </radialGradient>
                  <radialGradient id={`${uid}-halo`}>
                    <stop offset="55%" stopColor="rgb(230 154 97 / 0.28)" />
                    <stop offset="100%" stopColor="rgb(230 154 97 / 0)" />
                  </radialGradient>
                </defs>
                <circle data-dsc-ring cx={CX} cy={CY} r="170" fill="none" stroke="rgb(167 180 157 / 0.35)" strokeWidth="1" strokeDasharray="2 5" />
                <path data-dsc-arc d={`M ${NODES[0].x} ${NODES[0].y} A 180 150 0 0 1 ${NODES[1].x} ${NODES[1].y}`} fill="none" stroke="rgb(182 83 32 / 0.55)" strokeWidth="1" />
                <path data-dsc-arc d={`M ${NODES[1].x} ${NODES[1].y} A 180 150 0 0 1 ${NODES[2].x} ${NODES[2].y}`} fill="none" stroke="rgb(182 83 32 / 0.55)" strokeWidth="1" />
                {NODES.map((n, i) => (
                  <path
                    key={i}
                    data-dsc-path
                    d={`M ${CX + (n.x < CX ? -76 : n.x > CX ? 76 : 0)} ${CY + (n.y < CY ? -76 : 0)} L ${n.x + (n.x < CX ? 30 : n.x > CX ? -30 : 0)} ${n.y + (n.y < CY ? 30 : 0)}`}
                    fill="none"
                    stroke={active === i ? "#b65320" : "rgb(84 92 59 / 0.5)"}
                    strokeWidth="1"
                    style={{ transition: "stroke 0.3s" }}
                  />
                ))}
                <circle cx="153" cy="120" r="3.5" fill="#d9672b" />
                <circle cx="407" cy="120" r="3.5" fill="#d9672b" />
                <path id={`${uid}-orbit`} d={`M ${NODES[0].x} ${NODES[0].y} A 180 150 0 0 1 ${NODES[1].x} ${NODES[1].y} A 180 150 0 0 1 ${NODES[2].x} ${NODES[2].y}`} fill="none" stroke="none" />
                {!reduce && (
                  <g data-dsc-runner>
                    <circle r="9" fill="rgb(230 154 97 / 0.3)">
                      <animateMotion dur="11s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1" rotate="auto" keyPoints="0;1">
                        <mpath href={`#${uid}-orbit`} />
                      </animateMotion>
                    </circle>
                    <circle r="3" fill="#d9672b">
                      <animateMotion dur="11s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1" keyPoints="0;1">
                        <mpath href={`#${uid}-orbit`} />
                      </animateMotion>
                    </circle>
                  </g>
                )}
                <g data-dsc-centre>
                  <circle className="dsc__halo" cx={CX} cy={CY} r="118" fill={`url(#${uid}-halo)`} />
                  <circle cx={CX} cy={CY} r="76" fill={`url(#${uid}-core)`} />
                  <text x={CX} y={CY - 16} textAnchor="middle" className="dsc__ct">ONE</text>
                  <text x={CX} y={CY + 2} textAnchor="middle" className="dsc__ct">COMMERCIAL</text>
                  <text x={CX} y={CY + 20} textAnchor="middle" className="dsc__ct">OBJECTIVE</text>
                  <line x1={CX - 16} x2={CX + 16} y1={CY + 34} y2={CY + 34} stroke="#e69a61" strokeWidth="1.5" />
                </g>
              </svg>

              {NODES.map((n, i) => (
                <button
                  key={disciplinesPagePeople[i].label}
                  type="button"
                  data-dsc-node
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className={cn("dsc__node", `dsc__node--${n.pos}`, active === i && "is-active")}
                  style={{ left: `${(n.x / 560) * 100}%`, top: `${(n.y / 400) * 100}%` }}
                  aria-label={disciplinesPagePeople[i].label}
                >
                  <span className="dsc__ico">{ICONS[i]}</span>
                  <span className="dsc__nlabel" aria-hidden>
                    {n.label.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <ol data-dsc-cols className="dsc__cols" aria-label="The three disciplines and the team">
          {disciplinesPagePeople.map((person, i) => {
            const col = disciplineColumns[i];
            const isOpen = open === i;
            const panelId = `${uid}-bio-${i}`;
            return (
              <li
                key={person.name}
                data-dsc-col
                className={cn("dsc__col", active === i && "is-active")}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <p className="dsc__tag">
                  <span>0{i + 1}</span>
                  <i data-dsc-crule aria-hidden />
                  {person.label}
                </p>
                <h3 data-dsc-ch className="dsc__h">{col.heading}</h3>
                <p data-dsc-cp className="dsc__p">{col.text}</p>
                <div className="dsc__profile">
                  <span data-dsc-cdiv className="dsc__pdiv" aria-hidden />
                  <div data-dsc-cphoto className="dsc__photo">
                    <Image
                      src={PORTRAITS[person.name]}
                      alt={`Portrait of ${person.name}`}
                      fill
                      sizes="104px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div data-dsc-cwho className="dsc__who">
                    <p className="dsc__name">{person.name}</p>
                    <p className="dsc__role">{person.role}</p>
                    <button
                      type="button"
                      className="dsc__toggle"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      {isOpen ? "Hide bio" : "Read bio"}
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
                <div className={cn("dsc__panel", isOpen && "is-open")} id={panelId} inert={!isOpen}>
                  <div>
                    <p>{person.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p data-dsc-sub className="dsc__closing">
          {disciplines.closingLine}
        </p>
      </Container>
    </section>
  );
}
