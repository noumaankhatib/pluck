"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Decorative closing illustration: fades into cream on its left edge, scales in once, drifts slightly on scroll. */
export function CtaIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = el.parentElement;
    if (!section) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
      el.style.setProperty("--py", `${(p * -18).toFixed(1)}px`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="ab-cta-art" aria-hidden="true">
      <Image
        src="/images/about-cta-guided.webp"
        alt=""
        width={1677}
        height={938}
        sizes="(max-width: 900px) 100vw, 68vw"
        className="ab-cta-art__img"
      />
    </div>
  );
}
