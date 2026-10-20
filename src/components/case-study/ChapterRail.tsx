"use client";

import { useEffect, useState } from "react";

export type Chapter = { id: string; label: string };

/**
 * Slim sticky strip that tracks which chapter of the story is on screen.
 * Plain anchor links, so it works without JS; the active state is progressive enhancement.
 */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = chapters
      .map((c) => document.querySelector(`section[aria-labelledby="${c.id}"]`))
      .filter((el): el is Element => !!el);
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("aria-labelledby");
            const idx = chapters.findIndex((c) => c.id === id);
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav className="cs-rail" aria-label="Case study chapters">
      <ol>
        {chapters.map((c, i) => (
          <li key={c.id} className={i === active ? "is-active" : i < active ? "is-done" : undefined}>
            <a href={`#${c.id}`} aria-current={i === active ? "location" : undefined}>
              <span className="cs-rail__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="cs-rail__label">{c.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
