import Image from "next/image";
import { InView } from "@/components/case-study/InView";
import { AboutParallax } from "./AboutParallax";
import { aboutStory as story } from "@/content/about";

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Wobbly closed contour line. */
function contour(cx: number, cy: number, R: number, seed: number, sx = 1) {
  const pts: string[] = [];
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const r = R * (1 + 0.12 * Math.sin(3 * a + seed) + 0.07 * Math.sin(5 * a + seed * 1.7));
    pts.push(`${r1(cx + r * Math.cos(a) * sx)} ${r1(cy + r * Math.sin(a))}`);
  }
  return `M${pts.join("L")}Z`;
}

export function Topo({ cx, cy, count, step, seed = 1, sx = 1.4, className }: {
  cx: number; cy: number; count: number; step: number; seed?: number; sx?: number; className?: string;
}) {
  return (
    <g className={className} fill="none" stroke="currentColor" strokeWidth="1">
      {Array.from({ length: count }, (_, i) => (
        <path key={i} d={contour(cx, cy, step * (i + 1), seed + i * 0.35, sx)} />
      ))}
    </g>
  );
}

function ridge(seed: number, base: number, amp: number) {
  let d = `M0 700 L0 ${r1(base)}`;
  for (let x = 0; x <= 1440; x += 24) {
    const y = base - amp * (Math.sin(x * 0.0042 + seed) + 0.5 * Math.sin(x * 0.011 + seed * 2.1) + 0.25 * Math.sin(x * 0.027 + seed));
    d += ` L${x} ${r1(y)}`;
  }
  return `${d} L1440 700 Z`;
}

/* ─── Hero ─── */

const PATH_MARKERS = [{ x: 170, y: 320 }, { x: 330, y: 240 }, { x: 520, y: 80 }];

export function HeroLandscape() {
  return (
    <AboutParallax className="ab-landscape">
      <svg viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        <g className="ab-topo ab-layer ab-layer--1" style={{ color: "var(--color-sage-light)" }}>
          <Topo cx={1120} cy={230} count={9} step={46} seed={2} sx={1.7} />
          <Topo cx={260} cy={160} count={5} step={40} seed={5} sx={1.5} />
        </g>
        <path className="ab-layer ab-layer--1" d={ridge(1, 470, 38)} fill="#00443a" />
        <path className="ab-layer ab-layer--2" d={ridge(3.2, 540, 42)} fill="#003a30" />
        <path className="ab-layer ab-layer--3" d={ridge(5.4, 610, 36)} fill="#002f27" />
        <path d={ridge(7.1, 670, 20)} fill="#002d25" />
      </svg>
    </AboutParallax>
  );
}

export function HeroPathway() {
  return (
    <div className="cs-hero-visual ab-pathway" role="img" aria-label="A copper pathway rising through customer insight, untapped demand and business growth">
      <svg viewBox="0 0 600 480" className="h-full w-full" aria-hidden="true">
        <g style={{ color: "var(--color-sage-light)", opacity: 0.16 }}>
          <Topo cx={380} cy={190} count={7} step={34} seed={3} sx={1.6} />
        </g>
        <path d="M40 420 C 110 400, 120 330, 170 320" pathLength={1} className="cs-hero-path" style={{ ["--d" as string]: "1s" }} />
        <path d="M170 320 C 230 310, 270 300, 330 240" pathLength={1} className="cs-hero-path" style={{ ["--d" as string]: "1.7s" }} />
        <path d="M330 240 C 400 170, 450 150, 520 80" pathLength={1} className="cs-hero-path" style={{ ["--d" as string]: "2.4s" }} />
        {PATH_MARKERS.map((p, i) => (
          <g key={i} className="cs-hero-node" style={{ ["--d" as string]: `${0.9 + i * 0.75}s` }}>
            <circle cx={p.x} cy={p.y} r={i === 2 ? 22 : 15} fill="none" stroke="var(--color-copper-soft)" strokeOpacity="0.45" className={i === 2 ? "cs-signal" : undefined} />
            <circle cx={p.x} cy={p.y} r={i === 2 ? 10 : 6.5} fill="var(--color-copper-soft)" />
          </g>
        ))}
      </svg>
      {story.hero.markers.map((label, i) => (
        <span
          key={label}
          className="cs-hero-label"
          style={{
            left: `${(PATH_MARKERS[i].x / 600) * 100}%`,
            top: `${(PATH_MARKERS[i].y / 480) * 100}%`,
            ["--d" as string]: `${1.1 + i * 0.75}s`,
          }}
        >
          <span aria-hidden="true">0{i + 1}</span> {label}
        </span>
      ))}
    </div>
  );
}

/* ─── Belief: business · customer · market ─── */

const TRI = [{ x: 240, y: 56 }, { x: 64, y: 340 }, { x: 416, y: 340 }];
const CENTRE = { x: 240, y: 244 };

export function BeliefDiagram() {
  return (
    <InView className="ab-belief">
      <div className="ab-belief__stage">
        <svg viewBox="0 0 480 400" className="h-full w-full" role="img" aria-label="Business, customer and market perspectives overlapping to reveal opportunity">
          <polygon points={TRI.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="var(--color-forest)" strokeOpacity="0.22" strokeWidth="1.5" pathLength={1} className="cs-draw" />
          {TRI.map((p, i) => (
            <path key={i} d={`M${p.x} ${p.y} L${CENTRE.x} ${CENTRE.y}`} pathLength={1} className="cs-draw ab-copper-line" style={{ ["--d" as string]: `${0.9 + i * 0.2}s` }} />
          ))}
          {TRI.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="9" fill="var(--color-forest)" className="cs-pop" style={{ ["--d" as string]: `${i * 0.15}s` }} />
          ))}
          <g className="cs-pop" style={{ ["--d" as string]: "1.7s" }}>
            <circle cx={CENTRE.x} cy={CENTRE.y} r="30" fill="none" stroke="var(--color-copper)" strokeOpacity="0.4" />
            <circle cx={CENTRE.x} cy={CENTRE.y} r="13" fill="var(--color-copper)" />
          </g>
        </svg>
        {story.belief.nodes.map((n, i) => (
          <span
            key={n.label}
            className={`ab-node-label ab-node-label--${i}`}
            style={{ left: `${(TRI[i].x / 480) * 100}%`, top: `${(TRI[i].y / 400) * 100}%` }}
          >
            {n.label}
          </span>
        ))}
        <span className="ab-node-label ab-node-label--centre" style={{ left: `${(CENTRE.x / 480) * 100}%`, top: `${(CENTRE.y / 400) * 100}%` }}>
          {story.belief.centre}
        </span>
      </div>
      <dl className="ab-belief__legend">
        {story.belief.nodes.map((n, i) => (
          <div key={n.label} className="cs-rise" style={{ ["--i" as string]: i + 3 }}>
            <dt>{n.label}</dt>
            <dd>{n.text}</dd>
          </div>
        ))}
      </dl>
    </InView>
  );
}

/* ─── Approach ─── */

export function ApproachSteps() {
  return (
    <InView as="ol" className="cs-steps cs-steps--3 ab-approach" aria-label="Three connected disciplines">
      {story.approach.disciplines.map((d, i) => (
        <li key={d.label} className="cs-step cs-rise" style={{ ["--i" as string]: i + 1 }}>
          <span className="cs-marker" aria-hidden="true">{i + 1}</span>
          <h3 className="type-display-m text-forest">{d.label}</h3>
          <p className="mt-2 type-caption ab-role">{d.role}</p>
          <p className="mt-3 type-body text-ink-soft">{d.text}</p>
        </li>
      ))}
    </InView>
  );
}

/* ─── Team ─── */

const PHOTOS: Record<string, { src: string; position: string }> = {
  "Michael Simkin": { src: "/images/team/michael-simkin.webp", position: "50% 6%" },
  "Junaid Kazi": { src: "/images/team/junaid-kazi.webp", position: "50% 6%" },
  "Noumaan Khatib": { src: "/images/team/noumaan-khatib.webp", position: "50% 6%" },
};

export function TeamGrid({ people }: { people: readonly { name: string; role: string; body: readonly string[] }[] }) {
  return (
    <InView as="ul" className="ab-team" margin="0px 0px -8% 0px">
      {people.map((p, i) => (
        <li key={p.name} className="ab-person cs-rise" style={{ ["--i" as string]: i + 1 }}>
          <div className="ab-person__portrait">
            <Image
              src={PHOTOS[p.name].src}
              alt={`${p.name}, ${p.role}`}
              width={900}
              height={1125}
              sizes="(max-width: 519px) 100vw, (max-width: 899px) 38vw, 33vw"
              className="ab-person__img"
              style={{ objectPosition: PHOTOS[p.name].position }}
              priority={i === 0}
            />
          </div>
          <div className="ab-person__body">
            <h3 className="type-display-m text-forest">{p.name}</h3>
            <p className="mt-1.5 mb-3 type-caption ab-role">{p.role}</p>
            <div className="grid gap-2.5">
              {p.body.map((para) => (
                <p key={para} className="type-small text-ink-soft">{para}</p>
              ))}
            </div>
          </div>
        </li>
      ))}
    </InView>
  );
}

/* ─── Together: three paths, one objective ─── */

export function TogetherDiagram() {
  const xs = [16.7, 50, 83.3];
  return (
    <InView className="ab-together">
      <ul className="ab-together__chips">
        {story.approach.disciplines.map((d, i) => (
          <li key={d.label} className="cs-rise" style={{ ["--i" as string]: i }}>{d.label}</li>
        ))}
      </ul>
      <svg viewBox="0 0 600 150" preserveAspectRatio="none" className="ab-together__lines" aria-hidden="true">
        {xs.map((x, i) => (
          <path key={x} d={`M${x * 6} 0 C ${x * 6} 90, 300 60, 300 150`} pathLength={1} className="cs-draw ab-copper-line" style={{ ["--d" as string]: `${0.6 + i * 0.25}s` }} />
        ))}
      </svg>
      <p className="ab-together__objective cs-rise" style={{ ["--i" as string]: 5 }}>
        <span className="type-caption">One shared objective</span>
        {story.together.objective}
      </p>
    </InView>
  );
}

/* ─── Advice: slow copper line ─── */

export function AdviceLine() {
  return (
    <InView className="ab-advice-line">
      <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        <path d="M-10 210 C 200 210, 260 60, 520 120 S 860 230, 1040 130 S 1280 40, 1360 70" pathLength={1} className="cs-draw ab-copper-line ab-slow" />
      </svg>
      <span className="ab-advice-line__dot cs-pop" aria-hidden="true" />
    </InView>
  );
}

/* ─── CTA ─── */

export function CtaTopography() {
  return (
    <div className="ab-cta-topo" aria-hidden="true">
      <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <g style={{ color: "var(--color-sage-light)" }} className="ab-topo">
          <Topo cx={300} cy={330} count={10} step={44} seed={4} sx={1.8} />
          <Topo cx={1150} cy={200} count={9} step={42} seed={9} sx={1.8} />
        </g>
      </svg>
      {[["18%", "42%", 0], ["71%", "26%", 1], ["88%", "68%", 2], ["46%", "78%", 3]].map(([x, y, i]) => (
        <i key={String(i)} className="ab-glow" style={{ left: x as string, top: y as string, ["--i" as string]: i }} />
      ))}
    </div>
  );
}
