"use client";

import { disciplinesPageHero } from "@/content/disciplines-page";

/** Spacious layout — labels live in SVG to avoid overlap at any scale. */
const NODES = [
  { id: 0, cx: 96, cy: 278, label: "Commercial", labelLine2: "Strategy", labelY: 308 },
  { id: 1, cx: 260, cy: 108, label: "Paid Search", labelLine2: null, labelY: 72 },
  { id: 2, cx: 424, cy: 278, label: "Search &", labelLine2: "Technology", labelY: 308 },
] as const;

const HUB = { cx: 260, cy: 198, labelY: 232 } as const;

type Props = {
  idPrefix: string;
};

export function DisciplinesPageDiagram({ idPrefix }: Props) {
  const gradId = `${idPrefix}-line-grad`;

  return (
    <div
      className="disc-page__diagram relative mx-auto w-full max-w-[32rem] lg:mx-0 lg:max-w-none"
      aria-hidden
    >
      <div className="relative aspect-[520/380] w-full min-h-[17.5rem] sm:min-h-[19rem] lg:min-h-[21rem]">
        <svg
          viewBox="0 0 520 380"
          className="absolute inset-0 h-full w-full overflow-visible"
          role="presentation"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A8B9AC" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#D8783F" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {NODES.map((node) => (
            <g key={`line-${node.id}`}>
              <path
                data-disc-page-line={node.id}
                d={`M ${node.cx} ${node.cy} L ${HUB.cx} ${HUB.cy}`}
                fill="none"
                stroke="#A8B9AC"
                strokeOpacity={0.4}
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <path
                data-disc-page-line-glow={node.id}
                d={`M ${node.cx} ${node.cy} L ${HUB.cx} ${HUB.cy}`}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="2.75"
                strokeLinecap="round"
                opacity={0}
              />
              <circle
                data-disc-page-signal={node.id}
                r="4"
                fill="#D8783F"
                opacity={0}
              />
            </g>
          ))}

          {NODES.map((node) => (
            <g key={`node-${node.id}`} data-disc-page-node={node.id} className="disc-page__node">
              <circle
                cx={node.cx}
                cy={node.cy}
                r={22}
                className="disc-page__node-ring fill-[#003D32] stroke-[#A8B9AC]"
                strokeWidth="1.5"
                strokeOpacity={0.55}
              />
              <circle cx={node.cx} cy={node.cy} r={5.5} className="disc-page__node-core fill-[#F7F3EA]" />
            </g>
          ))}

          <g data-disc-page-hub>
            <circle
              data-disc-page-hub-ring
              cx={HUB.cx}
              cy={HUB.cy}
              r={28}
              className="fill-[#D8783F]"
              fillOpacity={0.16}
            />
            <circle data-disc-page-hub-core cx={HUB.cx} cy={HUB.cy} r={9} className="fill-[#D8783F]" />
          </g>

          {NODES.map((node) => (
            <g key={`lbl-${node.id}`} className="disc-page__label-group">
              <text
                data-disc-page-label={node.id}
                x={node.cx}
                y={node.labelY}
                textAnchor="middle"
                className="disc-page__svg-label fill-[#A8B9AC] font-mono text-[11px] uppercase tracking-[0.12em]"
              >
                {node.label}
              </text>
              {node.labelLine2 ? (
                <text
                  x={node.cx}
                  y={node.labelY + 14}
                  textAnchor="middle"
                  className="disc-page__svg-label fill-[#A8B9AC] font-mono text-[11px] uppercase tracking-[0.12em]"
                >
                  {node.labelLine2}
                </text>
              ) : null}
            </g>
          ))}

          <text
            data-disc-page-objective
            x={HUB.cx}
            y={HUB.labelY}
            textAnchor="middle"
            className="disc-page__svg-label fill-[#A8B9AC] font-mono text-[10px] uppercase tracking-[0.14em]"
          >
            {disciplinesPageHero.objective}
          </text>
        </svg>
      </div>
    </div>
  );
}
