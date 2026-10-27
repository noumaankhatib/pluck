"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Smooth in-page navigation on the homepage. Links to "/#id" (or "/" for the logo) scroll without a reload;
 * from any other page Next.js navigates to "/" and scrolls to the hash once the section exists.
 */
export function SectionScroll() {
  const pathname = usePathname();
  const router = useRouter();

  // Arriving with a hash (direct load, or from another page): wait for the target, scroll to it, and keep
  // re-aligning while pinned scenes and images settle, until the visitor scrolls themselves.
  useEffect(() => {
    if (pathname !== "/") return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const timers: number[] = [];
    let cancelled = false;
    const cancel = () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
    const events = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    events.forEach((ev) => window.addEventListener(ev, cancel, { passive: true, once: true }));
    const align = () => {
      if (cancelled) return;
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    };
    let tries = 0;
    const poll = window.setInterval(() => {
      tries++;
      if (document.getElementById(id) || tries > 40) {
        window.clearInterval(poll);
        align();
        [250, 600, 1200, 2200, 3500].forEach((ms) => timers.push(window.setTimeout(align, ms)));
      }
    }, 100);
    return () => {
      window.clearInterval(poll);
      cancel();
      events.forEach((ev) => window.removeEventListener(ev, cancel));
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== "/") return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior = reduce ? "auto" : "smooth";
      if (!url.hash) {
        e.preventDefault();
        router.push("/", { scroll: false });
        window.setTimeout(() => window.scrollTo({ top: 0, behavior }), 0);
        return;
      }
      const el = document.getElementById(url.hash.slice(1));
      if (!el) return;
      e.preventDefault();
      router.push(`/${url.hash}`, { scroll: false });
      window.setTimeout(() => el.scrollIntoView({ behavior, block: "start" }), 0);
      // Pinned scenes and lazy images can shift the layout during a long scroll; settle onto the target afterwards.
      const timers: number[] = [];
      const stop = () => timers.forEach((t) => window.clearTimeout(t));
      (["wheel", "touchstart", "keydown"] as const).forEach((ev) =>
        window.addEventListener(ev, stop, { passive: true, once: true }),
      );
      [900, 1700, 2800, 4300, 6500].forEach((ms) =>
        timers.push(
          window.setTimeout(() => {
            const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
            if (Math.abs(el.getBoundingClientRect().top - header) > 6) {
              el.scrollIntoView({ behavior: "auto", block: "start" });
            }
          }, ms),
        ),
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, router]);

  return null;
}
