"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-ivory/92 backdrop-blur-md transition-[padding] duration-300",
        scrolled ? "py-0" : "",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[var(--content-max)] items-center justify-between gap-6 px-[var(--gutter)] transition-[padding] duration-300",
          scrolled ? "py-3" : "py-4",
        )}
      >
        <Link
          href="/"
          className={cn(
            "font-display font-medium tracking-tight text-forest transition-[font-size] duration-300",
            scrolled ? "text-lg" : "text-xl",
          )}
        >
          {site.name}
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/70 transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" className="!min-h-10 !px-5">
            Talk to us
          </Button>
        </nav>

        <button
          type="button"
          className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span
            className={cn(
              "block h-0.5 w-6 bg-foreground transition-transform",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-foreground transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-foreground transition-transform",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Reading progress — the story thread on screens without a side margin */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-copper xl:hidden"
          style={{ scaleX: scrollYProgress }}
          aria-hidden
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border lg:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1 px-[var(--gutter)] py-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block min-h-11 py-2 text-base"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button href="/contact" className="w-full">
                  Talk to us
                </Button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
