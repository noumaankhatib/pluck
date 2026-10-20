"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { navigation } from "@/content/site";
import { cn } from "@/lib/cn";
import { PluckLogo } from "@/components/brand/PluckLogo";

const navLinkHero =
  "rounded-sm text-[0.9375rem] font-medium tracking-[0.02em] text-ivory/92 [text-shadow:0_1px_14px_rgb(0_0_0/0.55)] transition-[color,opacity] duration-300 hover:text-ivory focus-visible:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper/80";

type SiteNavBarProps = {
  /** Hero: fixed over full-screen media. Page: sticky document header. */
  variant: "hero" | "page";
};

export function SiteNavBar({ variant }: SiteNavBarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const isHero = variant === "hero";
  const onHero = isHero && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300",
        isHero
          ? cn(
              "fixed inset-x-0 top-0",
              onHero
                ? "!border-0 !bg-transparent !shadow-none"
                : "border-b border-border/60 bg-ivory/92 shadow-sm backdrop-blur-md",
            )
          : cn(
              "sticky top-0 border-b",
              scrolled
                ? "border-border/60 bg-ivory/92 backdrop-blur-md"
                : "border-transparent bg-ivory",
            ),
      )}
    >
      <div
        className={cn(
          "relative mx-auto h-[var(--header-h)] max-w-[var(--content-max)] px-[var(--gutter)]",
          isHero
            ? "grid grid-cols-12 items-center gap-x-6 lg:gap-x-10 xl:gap-x-14"
            : "flex items-center justify-between gap-6 sm:gap-8 lg:gap-10",
        )}
      >
        <Link
          href="/"
          aria-label="Pluck Media — home"
          className={cn(
            "flex items-center self-center py-0.5",
            isHero ? "col-span-7 lg:col-span-5" : "shrink-0",
          )}
        >
          <PluckLogo variant="nav" priority onVideo={onHero} />
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-8 lg:flex xl:gap-9",
            isHero && "col-span-5 justify-end lg:col-span-6 lg:col-start-7 lg:justify-end",
          )}
          aria-label="Primary"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors",
                onHero
                  ? navLinkHero
                  : "text-sm text-foreground/70 hover:text-forest",
              )}
            >
              {item.label}
            </Link>
          ))}
          {/* Over the hero the hero's own CTA is the single "Talk to us"; the nav one takes over once you scroll. */}
          {!onHero && (
            <Link href="/contact" className="cta-glass cta-glass--light cta-glass--sm cta-appear">
              Talk to us
            </Link>
          )}
        </nav>

        <button
          type="button"
          className={cn(
            "flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 lg:hidden",
            isHero && "col-span-5 justify-self-end",
          )}
          aria-expanded={open}
          aria-controls={isHero ? "mobile-nav-hero" : "mobile-nav"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span
            className={cn(
              "block h-0.5 w-6 transition-transform",
              onHero ? "bg-ivory shadow-[0_0_10px_rgb(0_0_0/0.55)]" : "bg-foreground",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 transition-opacity",
              onHero ? "bg-ivory shadow-[0_0_10px_rgb(0_0_0/0.55)]" : "bg-foreground",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 transition-transform",
              onHero ? "bg-ivory shadow-[0_0_10px_rgb(0_0_0/0.55)]" : "bg-foreground",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </div>

      {!reduce && !onHero && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-copper xl:hidden"
          style={{ scaleX: scrollYProgress }}
          aria-hidden
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.nav
            id={isHero ? "mobile-nav-hero" : "mobile-nav"}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={cn(
              "overflow-hidden lg:hidden",
              onHero
                ? "bg-charcoal/94 backdrop-blur-md"
                : "border-t border-border bg-ivory",
            )}
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-0.5 px-[var(--gutter)] py-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block min-h-11 py-2.5 text-base",
                      onHero ? "text-ivory/95" : "text-foreground",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex min-h-11 w-full items-center justify-center px-6 text-sm font-medium tracking-wide",
                    onHero ? "bg-ivory text-forest" : "bg-forest text-ivory",
                  )}
                  onClick={() => setOpen(false)}
                >
                  Talk to us
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
