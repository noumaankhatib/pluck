/** Parse case-study metric display strings for count-up animation. */

export type MetricCounter =
  | {
      kind: "currency";
      end: number;
      format: (n: number) => string;
    }
  | {
      kind: "plus";
      end: number;
      format: (n: number) => string;
    }
  | {
      kind: "millions";
      end: number;
      format: (n: number) => string;
    }
  | {
      kind: "static";
      format: () => string;
    };

export function parseMetricCounter(display: string): MetricCounter {
  const trimmed = display.trim();

  if (trimmed.endsWith("+")) {
    const end = Number.parseInt(trimmed.replace(/\D/g, ""), 10);
    return {
      kind: "plus",
      end,
      format: (n) => `${Math.round(n)}+`,
    };
  }

  if (/m$/i.test(trimmed)) {
    const end = Number.parseFloat(trimmed.replace(/[$,m]/gi, ""));
    return {
      kind: "millions",
      end,
      format: (n) => `$${n.toFixed(1)}m`,
    };
  }

  if (trimmed.startsWith("$")) {
    const end = Number.parseInt(trimmed.replace(/[$,]/g, ""), 10);
    return {
      kind: "currency",
      end,
      format: (n) => `$${Math.round(n).toLocaleString("en-US")}`,
    };
  }

  return { kind: "static", format: () => trimmed };
}

export function finalMetricDisplay(display: string): string {
  const parsed = parseMetricCounter(display);
  if (parsed.kind === "static") return parsed.format();
  return parsed.format(parsed.end);
}
