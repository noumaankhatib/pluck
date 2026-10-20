import type { ReactNode } from "react";
import { InView } from "./InView";
import { CountUp } from "./CountUp";
import { serverFactoryStory as story } from "@/content/server-factory-case-study";

/* ─── Hero: network of search signals resolving into one path ─── */

const HERO_NODES: [number, number][] = [
  [60, 110], [150, 60], [250, 120], [340, 50], [430, 90], [510, 170],
  [70, 230], [190, 210], [330, 190], [500, 300], [60, 360], [230, 470],
  [380, 430], [500, 460], [150, 520], [320, 520],
];
const HERO_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [6, 7], [7, 2], [7, 8],
  [8, 5], [5, 9], [6, 10], [10, 11], [11, 12], [12, 13], [9, 13], [12, 8], [11, 14], [14, 15], [15, 12],
];
const HERO_PATH = [
  { x: 120, y: 420 },
  { x: 300, y: 300 },
  { x: 450, y: 130 },
];

export function HeroNetwork() {
  return (
    <div className="cs-hero-visual" role="img" aria-label="Network of search signals resolving into a path from discovery to enquiry to commercial opportunity">
      <svg viewBox="0 0 560 560" className="h-full w-full" aria-hidden="true">
        <g stroke="var(--color-sage-light)" strokeOpacity="0.2" strokeWidth="1">
          {HERO_EDGES.map(([a, b], i) => (
            <line key={i} x1={HERO_NODES[a][0]} y1={HERO_NODES[a][1]} x2={HERO_NODES[b][0]} y2={HERO_NODES[b][1]} />
          ))}
        </g>
        {HERO_NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="var(--color-sage-light)" className="cs-signal" style={{ ["--i" as string]: i % 5 }} />
        ))}
        <path d="M120 420 C 200 400, 220 330, 300 300" pathLength={1} className="cs-hero-path" style={{ ["--d" as string]: "1.3s" }} />
        <path d="M300 300 C 380 270, 400 200, 450 130" pathLength={1} className="cs-hero-path" style={{ ["--d" as string]: "2s" }} />
        {HERO_PATH.map((p, i) => (
          <g key={i} className="cs-hero-node" style={{ ["--d" as string]: `${1.1 + i * 0.75}s` }}>
            <circle cx={p.x} cy={p.y} r={i === 2 ? 20 : 14} fill="none" stroke="var(--color-copper-soft)" strokeOpacity="0.45" />
            <circle cx={p.x} cy={p.y} r={i === 2 ? 9 : 6} fill="var(--color-copper-soft)" />
          </g>
        ))}
      </svg>
      {story.heroPath.map((label, i) => (
        <span
          key={label}
          className="cs-hero-label"
          style={{
            left: `${(HERO_PATH[i].x / 560) * 100}%`,
            top: `${(HERO_PATH[i].y / 560) * 100}%`,
            ["--d" as string]: `${1.3 + i * 0.75}s`,
          }}
        >
          <span aria-hidden="true">0{i + 1}</span> {label}
        </span>
      ))}
    </div>
  );
}

/* ─── A: crowded field resolving to a clear path ─── */

const FIELD = Array.from({ length: 25 }, (_, i) => {
  const c = i % 5;
  const r = Math.floor(i / 5);
  return {
    x: 34 + c * 58 + Math.sin(i * 2.3) * 14,
    y: 40 + r * 62 + Math.cos(i * 1.7) * 14,
  };
});
const HITS = [6, 13, 21];

export function OpportunityVisual() {
  return (
    <InView className="cs-card-frame" aria-label="Illustration: a crowded field of generic choices resolving into a clear path to the right supplier">
      <svg viewBox="0 0 640 360" className="h-auto w-full" role="img" aria-label="Many generic product choices narrowing to one clear path to the right supplier">
        <line x1="320" y1="20" x2="320" y2="340" stroke="var(--color-forest)" strokeOpacity="0.2" strokeDasharray="3 6" />
        {HITS.map((h, i) => (
          <path
            key={h}
            d={`M${FIELD[h].x} ${FIELD[h].y} C 330 ${FIELD[h].y}, 360 180, 470 180`}
            pathLength={1}
            fill="none"
            stroke="var(--color-copper)"
            strokeWidth="1.5"
            className="cs-draw"
            style={{ ["--d" as string]: `${900 + i * 150}ms` }}
          />
        ))}
        {FIELD.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={HITS.includes(i) ? 7 : 5}
            className={HITS.includes(i) ? "cs-dot cs-dot--hit" : "cs-dot"}
            style={{ ["--i" as string]: i % 8 }}
          />
        ))}
        <g className="cs-pop" style={{ ["--d" as string]: "1.7s" }}>
          <circle cx="470" cy="180" r="30" fill="none" stroke="var(--color-copper)" strokeOpacity="0.4" />
          <circle cx="470" cy="180" r="14" fill="var(--color-copper)" />
        </g>
      </svg>
      <div className="cs-split-labels" aria-hidden="true">
        <span>{story.opportunity.crowded}</span>
        <span>{story.opportunity.resolved}</span>
      </div>
    </InView>
  );
}

/* ─── B: research process timeline ─── */

export function ProcessTimeline() {
  return (
    <InView as="ol" className="cs-steps cs-steps--5" aria-label="Research process">
      {story.customer.steps.map((s, i) => (
        <li key={s.title} className="cs-step cs-rise" style={{ ["--i" as string]: i + 1 }}>
          <span className="cs-marker" aria-hidden="true">{i + 1}</span>
          <h3 className="type-title text-forest">{s.title}</h3>
          <p className="mt-2 type-small text-ink-soft">{s.text}</p>
        </li>
      ))}
    </InView>
  );
}

/* ─── C: two buyers converging ─── */

export function BuyerCards() {
  return (
    <InView className="mt-8">
      <div className="grid gap-6 md:grid-cols-2">
        {story.buyers.cards.map((c, i) => (
          <article key={c.title} className={`cs-buyer cs-rise ${i === 1 ? "cs-buyer--b" : ""}`} style={{ ["--i" as string]: i }}>
            <p className="type-caption cs-buyer__tag">{c.tag}</p>
            <h3 className="type-display-m mt-3 text-forest">{c.title}</h3>
            <p className="mt-4 type-body text-ink-soft">{c.text}</p>
            <ol className="cs-chain mt-8">
              {c.path.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="cs-converge cs-wipe" aria-hidden="true">
        <path d="M25 0 C 25 24, 50 16, 50 40" pathLength={1} className="cs-converge__line" />
        <path d="M75 0 C 75 24, 50 16, 50 40" pathLength={1} className="cs-converge__line" />
      </svg>
      <p className="cs-converge-node cs-rise" style={{ ["--i" as string]: 4 }}>
        <span className="cs-converge-node__dot" aria-hidden="true" />
        {story.buyers.converge}
      </p>
    </InView>
  );
}

/* ─── D: website as a connected system ─── */

export function WebsiteStructure() {
  return (
    <InView className="cs-site" aria-label="Website structure illustration and improvements">
      <div className="cs-frames" aria-hidden="true">
        {[2, 1, 0].map((layer) => (
          <div key={layer} className={`cs-frame cs-frame--${layer}`}>
            <div className="cs-frame__bar"><i /><i /><i /></div>
            <div className="cs-frame__body">
              <b className="cs-frame__hero" />
              <b /><b /><b />
            </div>
          </div>
        ))}
      </div>
      <div>
        <ol className="cs-system">
          {story.website.items.map((item, i) => (
            <li key={item} className="cs-rise" style={{ ["--i" as string]: i + 2 }}>
              <span className="cs-system__n" aria-hidden="true">0{i + 1}</span>
              {item}
            </li>
          ))}
        </ol>
        <p className="cs-pill cs-rise" style={{ ["--i" as string]: 8 }}>
          <span aria-hidden="true" />
          {story.website.status}
        </p>
      </div>
    </InView>
  );
}

/* ─── E: search-to-sale flow ─── */

export function SearchFlow() {
  return (
    <InView className="mt-8">
      <ul className="cs-queries" aria-label="Illustrative search intent">
        {story.paid.signals.map((s, i) => (
          <li
            key={s}
            className={`cs-query cs-rise ${i === story.paid.highlighted ? "cs-query--hit" : ""}`}
            style={{ ["--i" as string]: i }}
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5 14 14" />
            </svg>
            {s}
            {i === story.paid.highlighted && <span className="cs-query__flag">Commercial intent</span>}
          </li>
        ))}
      </ul>
      <ol className="cs-steps cs-steps--6 mt-10" aria-label="Search to sale journey">
        {story.paid.flow.map((s, i) => (
          <li key={s} className="cs-step cs-rise" style={{ ["--i" as string]: i + 3 }}>
            <span className={`cs-marker ${i === story.paid.flow.length - 1 ? "cs-marker--end" : ""}`} aria-hidden="true">{i + 1}</span>
            <h3 className="type-title text-forest">{s}</h3>
          </li>
        ))}
      </ol>
      <p className="mt-5 type-small text-ink-soft">{story.paid.note}</p>
    </InView>
  );
}

/* ─── F: results ─── */

type Metric = { label: string; value: string };

export function ResultsStory({
  metrics,
  highlight,
  body,
}: {
  metrics: Metric[];
  highlight: string;
  body: string[];
}) {
  const get = (label: string) => metrics.find((m) => m.label === label)!;
  const duration = get("Campaign duration");
  const spend = get("Media spend");
  const leads = get("Qualified leads");
  const quotes = get("Quotations");
  const sales = get("Sales");
  const [ratioText, convertedText, qualification] = [body[0], body[1], body[2]];
  const ratioMatch = highlight.match(/^(\$\d+)\s+(.*?)(\$1)(.*)$/);

  return (
    <InView className="cs-results">
      <p className="cs-results__group cs-rise">{story.results.inputLabel}</p>
      <div className="cs-results__inputs">
        {[
          { m: spend, i: 1 },
          { m: leads, i: 3 },
          { m: duration, i: 4 },
        ].map(({ m, i }) => (
          <div key={m.label} className="cs-stat cs-rise" style={{ ["--i" as string]: i }}>
            <p className="type-caption cs-stat__label">{m.label}</p>
            <p className="cs-stat__value"><CountUp value={m.value} delay={i * 150} duration={1100} /></p>
          </div>
        ))}
      </div>

      <p className="cs-results__group cs-rise" style={{ ["--i" as string]: 6 }}>{story.results.outputLabel}</p>
      <div className="cs-quote-sales">
        <div className="cs-quote-sales__sales cs-rise" style={{ ["--i" as string]: 11 }}>
          <p className="type-caption cs-stat__label">{sales.label}</p>
          <p className="cs-sales-figure"><CountUp value={sales.value} delay={11 * 150} duration={1500} /></p>
        </div>
        <div className="cs-quote-sales__bar cs-rise" style={{ ["--i" as string]: 8 }}>
          <div className="flex items-baseline justify-between gap-4">
            <p className="type-caption cs-stat__label">{quotes.label}</p>
            <p className="cs-quote-figure"><CountUp value={quotes.value} delay={8 * 150} duration={1300} /></p>
          </div>
          <div className="cs-bar" role="img" aria-label={`${sales.value} of ${quotes.value} quoted converted into sales, roughly 25.5%`}>
            <span className="cs-bar__sales" />
          </div>
          <div className="cs-bar__legend">
            <span><i aria-hidden="true" /> {sales.value} sales</span>
            <span>of {quotes.value} quoted</span>
          </div>
          <p className="mt-4 type-small cs-results__muted">
            {convertedText}
          </p>
        </div>
      </div>

      <div className="cs-ratio cs-rise" style={{ ["--i" as string]: 14 }}>
        <p className="type-caption cs-stat__label">{story.results.ratioLead}</p>
        <p className="cs-ratio__text" aria-label={highlight}>
          {ratioMatch ? (
            <>
              <strong>{ratioMatch[1]}</strong> {ratioMatch[2]}<strong>{ratioMatch[3]}</strong>{ratioMatch[4]}
            </>
          ) : (
            highlight
          )}
        </p>
        <p className="mt-4 type-small cs-results__muted">{ratioText}</p>
      </div>

      <p className="cs-qualification cs-rise" style={{ ["--i" as string]: 15 }}>
        <span className="type-caption" aria-hidden="true">Please note</span>
        {qualification}
      </p>
    </InView>
  );
}

/* ─── G: three disciplines, one outcome ─── */

export function DisciplinesDiagram() {
  return (
    <InView className="mt-8">
      <div className="cs-disc">
        {story.difference.disciplines.map((d, i) => (
          <article key={d.title} className="cs-disc__card cs-rise" style={{ ["--i" as string]: i }}>
            <span className="cs-disc__n" aria-hidden="true">0{i + 1}</span>
            <h3 className="type-title text-forest">{d.title}</h3>
            <p className="mt-3 type-small text-ink-soft">{d.text}</p>
          </article>
        ))}
      </div>
      <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="cs-disc__lines cs-wipe" aria-hidden="true">
        {[16.6, 50, 83.4].map((x) => (
          <path key={x} d={`M${x} 0 C ${x} 22, 50 14, 50 36`} pathLength={1} className="cs-converge__line" />
        ))}
      </svg>
      <p className="cs-outcome cs-rise" style={{ ["--i" as string]: 6 }}>
        <span className="type-caption">Shared outcome</span>
        {story.difference.outcome}
      </p>
    </InView>
  );
}

/* ─── H: what happens next ─── */

export function NextTimeline() {
  return (
    <InView className="mt-8">
      <p className="cs-pill cs-pill--pending">
        <span aria-hidden="true" />
        {story.next.status}
      </p>
      <ol className="cs-steps cs-steps--5 cs-steps--pending mt-10" aria-label="Future measurement plan">
        {story.next.steps.map((s, i) => (
          <li key={s} className="cs-step cs-rise" style={{ ["--i" as string]: i + 1 }}>
            <span className="cs-marker" aria-hidden="true">{i + 1}</span>
            <h3 className="type-title text-forest">{s}</h3>
          </li>
        ))}
      </ol>
    </InView>
  );
}

/* ─── I: closing signal ─── */

export function ClosingSignal(): ReactNode {
  return (
    <InView className="cs-closing-signal">
      <svg viewBox="0 0 400 220" className="h-full w-full" aria-hidden="true">
        <path d="M10 190 C 90 190, 110 60, 200 110 S 320 60, 350 40" pathLength={1} fill="none" stroke="var(--color-copper-soft)" strokeWidth="1.5" className="cs-draw" style={{ ["--d" as string]: "200ms" }} />
        <circle cx="10" cy="190" r="4" fill="var(--color-sage-light)" />
        <g className="cs-pop" style={{ ["--d" as string]: "1.4s" }}>
          <circle cx="350" cy="40" r="24" fill="none" stroke="var(--color-copper-soft)" strokeOpacity="0.4" className="cs-signal" />
          <circle cx="350" cy="40" r="9" fill="var(--color-copper-soft)" />
        </g>
      </svg>
    </InView>
  );
}
