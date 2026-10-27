"use client";

import { useEffect, useRef } from "react";
import { aboutStory as story } from "@/content/about";

/** Three disciplines on a connecting line that fills (and lights each step) as the section scrolls into view. */
export function ApproachFlow({ after = 0 }: { after?: number }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const steps = Array.from(el.querySelectorAll<HTMLElement>(".ab-flow__step"));
    const apply = (p: number) => {
      el.style.setProperty("--p", String(p));
      steps.forEach((st, i) => st.classList.toggle("is-on", p >= i / (steps.length - 1) - 0.001));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      el.classList.add("is-in");
      return;
    }
    const top = el.parentElement?.querySelector<HTMLElement>(".ab-approach-top");
    let topAt = top?.dataset.inview === "in" ? performance.now() : 0;
    const mo = new MutationObserver(() => { if (!topAt && top?.dataset.inview === "in") topAt = performance.now(); });
    if (top) mo.observe(top, { attributes: true, attributeFilter: ["data-inview"] });
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const wait = topAt ? Math.max(0, after - (performance.now() - topAt) / 1000) : 0;
      el.style.setProperty("--base", `${wait.toFixed(2)}s`);
      el.classList.add("is-in");
      io.disconnect();
    }, { threshold: 0.15 });
    io.observe(el);
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const vertical = window.matchMedia("(max-width: 1023px)").matches;
      const span = vertical ? Math.max(r.height, vh * 0.4) : vh * 0.35;
      const next = Math.min(1, Math.max(0, (vh * 0.78 - r.top) / span));
      apply(next);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      mo.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [after]);

  const items = story.approach.disciplines;
  return (
    <ol ref={ref} className="ab-flow" aria-label="Three connected disciplines">
      <span className="ab-flow__track" aria-hidden="true"><span className="ab-flow__fill" /></span>
      {items.map((d, i) => {
        return (
          <li key={d.label} className={"ab-flow__step" + (i === 0 ? " is-on" : "")} style={{ ["--n" as string]: i }}>
            <span className="ab-flow__num" style={{ ["--n" as string]: i }} aria-hidden="true">{i + 1}</span>
            <h3 className="ab-flow__title">{d.label}</h3>
            <p className="ab-flow__role">{d.role}</p>
            <p className="ab-flow__text">{d.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
