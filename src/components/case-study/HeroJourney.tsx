import Image from "next/image";
import { serverFactoryStory as story } from "@/content/server-factory-case-study";

/** Journey geometry in the artwork's own pixel space (1672 × 941); labels use the same numbers. */
const W = 1672;
const H = 941;
const PATH =
  "M500 742 C510.0 733.3 534.5 706.0 560 690 C585.5 674.0 621.3 654.7 653 646 C684.7 637.3 710.5 644.7 750 638 C789.5 631.3 848.3 620.7 890 606 C931.7 591.3 969.2 570.5 1000 550 C1030.8 529.5 1048.3 498.0 1075 483 C1101.7 468.0 1125.8 473.8 1160 460 C1194.2 446.2 1248.3 428.3 1280 400 C1311.7 371.7 1334.7 313.0 1350 290 C1365.3 267.0 1368.3 266.7 1372 262";
const STOPS = [
  { node: [653, 646], icon: [695, 622], label: [648, 690], at: 0.176 },
  { node: [1075, 483], icon: [1113, 457], label: [1080, 520], at: 0.625 },
  { node: [1352, 287], icon: [1405, 228], label: [1290, 338], at: 0.966, right: true },
] as const;
const DRAW = 2.2; // seconds for the whole path
const START = 0.5;

const ICONS = [
  <g key="d" fill="none" stroke="#faf9f3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="-19" y="-15" width="38" height="26" rx="2.5" /><path d="M-8 18h16M0 11v7" /><circle cx="-2" cy="-3" r="6" /><path d="m2.5 1.5 5 5" /></g>,
  <g key="e" fill="none" stroke="#faf9f3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M-13 -19h18l10 10v28h-28z" /><path d="M5 -19v10h10M-7 -4h12M-7 3h14M-7 10h8" /></g>,
  <g key="o" fill="none" stroke="#faf9f3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M-19 19v-9h8v9M-5 19V2h8v17M9 19V-6h8v25M-19 19h36" /><path d="m-16 -4 11-9 8 6 15-14M7 -21h8v8" /></g>,
];

export function HeroJourney() {
  return (
    <div className="sfh" aria-hidden={false}>
      <div className="sfh__stage" role="img" aria-label="Network of search signals resolving into a path from discovery to enquiry to commercial opportunity">
        <Image
          src="/images/case-study-hero-server-factory.webp"
          alt=""
          width={W}
          height={H}
          priority
          sizes="(max-width: 1023px) 100vw, 72vw"
          className="sfh__img"
        />
        <svg viewBox={`0 0 ${W} ${H}`} className="sfh__svg" aria-hidden="true">
          <defs>
            <filter id="sfh-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
            <radialGradient id="sfh-node"><stop offset="0" stopColor="#fff3cf" /><stop offset="0.45" stopColor="#e69a61" /><stop offset="1" stopColor="#e69a61" stopOpacity="0" /></radialGradient>
          </defs>
          <path d={PATH} pathLength={1} className="sfh__trail" filter="url(#sfh-glow)" style={{ ["--s" as string]: `${START}s`, ["--dur" as string]: `${DRAW}s` }} />
          <path id="sfh-path" d={PATH} pathLength={1} className="sfh__line" style={{ ["--s" as string]: `${START}s`, ["--dur" as string]: `${DRAW}s` }} />
          {STOPS.map((s, i) => {
            const delay = `${(START + s.at * DRAW).toFixed(2)}s`;
            return (
              <g key={i} className="sfh__stop" style={{ ["--d" as string]: delay }}>
                <circle cx={s.icon[0]} cy={s.icon[1]} r={i === 2 ? 52 : 48} className="sfh__ring" />
                <g transform={`translate(${s.icon[0]} ${s.icon[1]}) scale(0.9)`}>{ICONS[i]}</g>
                <circle cx={s.node[0]} cy={s.node[1]} r="26" fill="url(#sfh-node)" className={"sfh__halo" + (i === 2 ? " sfh__halo--end" : "")} />
                <circle cx={s.node[0]} cy={s.node[1]} r="7" fill="#ffd89a" />
              </g>
            );
          })}
          <circle r="7" className="sfh__pulse">
            <animateMotion dur="4.8s" begin="3s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath href="#sfh-path" />
            </animateMotion>
          </circle>
        </svg>
        {story.heroPath.map((label, i) => (
          <span
            key={label}
            className="sfh__label"
            style={{
              ...("right" in STOPS[i]
                ? { right: `${((W - STOPS[i].label[0]) / W) * 100}%`, textAlign: "right" as const }
                : { left: `${(STOPS[i].label[0] / W) * 100}%` }),
              top: `${(STOPS[i].label[1] / H) * 100}%`,
              ["--d" as string]: `${(START + STOPS[i].at * DRAW + 0.1).toFixed(2)}s`,
            }}
          >
            <b aria-hidden="true">0{i + 1}</b> {label}
          </span>
        ))}
      </div>
    </div>
  );
}
