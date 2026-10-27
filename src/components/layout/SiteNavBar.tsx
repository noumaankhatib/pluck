"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { navigation } from "@/content/site";
import { cn } from "@/lib/cn";
import { PluckLogo } from "@/components/brand/PluckLogo";

/** "Our Work" points at the homepage work section; it stays active on the case-study route too. */
const isActivePath = (pathname: string, href: string, section: string) =>
  href.startsWith("/#")
    ? pathname === "/"
      ? section === href.slice(2)
      : pathname.startsWith("/work") && href === "/#our-work"
    : pathname.startsWith(href);

type SiteNavBarProps = {
  /** Hero: fixed above the homepage hero. Page: sticky document header. Same cream bar either way. */
  variant: "hero" | "page";
};

export function SiteNavBar({ variant }: SiteNavBarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState("");
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHero = variant === "hero";
  const menuId = isHero ? "mobile-nav-hero" : "mobile-nav";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = navigation.map((n) => n.href.slice(2));
    const update = () => {
      let current = "";
      let best = -Infinity;
      const all = [...ids, "contact"];
      for (const id of all) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.4 && top > best) {
          best = top;
          current = id;
        }
      }
      setSection(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const bar = "block h-0.5 w-6 bg-forest transition-transform duration-300";

  return (
    <header
      className={cn("site-nav z-50", isHero ? "fixed inset-x-0 top-0" : "sticky top-0")}
      data-scrolled={scrolled}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-[var(--content-max)] items-center justify-between gap-6 px-[var(--gutter)]">
        <Link
          href="/"
          aria-label="Pluck Media — home"
          className="flex shrink-0 items-center rounded-sm py-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
        >
          <PluckLogo variant="nav" priority />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex xl:gap-11" aria-label="Primary">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={isActivePath(pathname, item.href, section) ? "location" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="nav-cta ml-2">
            Talk to us
          </Link>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className={cn(bar, open && "translate-y-2 rotate-45")} />
          <span className={cn(bar, "transition-opacity", open && "opacity-0")} />
          <span className={cn(bar, open && "-translate-y-2 -rotate-45")} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id={menuId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-forest/10 bg-ivory lg:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col px-[var(--gutter)] pb-6 pt-3">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-forest/10">
                  <Link
                    href={item.href}
                    className="flex min-h-14 items-center font-display text-xl text-forest"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-5">
                <Link
                  href="/#contact"
                  className="nav-cta w-full"
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
