"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { navigation, site } from "@/content/site";
import { intro } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { PluckLogo } from "@/components/brand/PluckLogo";
import { Reveal, stagger } from "@/components/motion/Reveal";
import { motionEase, motionDurations } from "@/lib/motion";
import { cn } from "@/lib/cn";

const linkClass =
  "site-footer__link inline-flex min-h-11 items-center text-[0.9375rem] leading-snug outline-none";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();

  return (
    <footer className="site-footer relative isolate w-full bg-[#003D32] text-[#F7F3EA]">
      <motion.div
        className="site-footer__rule pointer-events-none absolute inset-x-0 top-0 h-px origin-left"
        aria-hidden
        initial={reduce ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.6 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-4% 0px" }}
        transition={{ duration: motionDurations.base, ease: motionEase }}
      />

      <Container className="site-footer__main relative">
        <div className="grid gap-8 sm:gap-9 md:grid-cols-2 lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-6 xl:gap-x-14">
          <Reveal as="div" className="min-w-0 lg:col-span-5">
            <Link
              href="/"
              className="site-footer__brand-link inline-block rounded-sm outline-none"
            >
              <PluckLogo variant="footer" />
            </Link>
            <p className="site-footer__tagline mt-3 max-w-[22rem] font-tagline text-[1.02rem] italic leading-[1.45] sm:mt-3.5 sm:text-[1.0625rem]">
              {intro.anchor}
            </p>
            <p className="site-footer__description mt-3.5 max-w-[26rem] text-[0.9375rem] leading-[1.62] sm:mt-4 sm:text-[0.95rem]">
              {site.description}
            </p>
          </Reveal>

          <Reveal as="div" delay={stagger(1, 0.05)} className="min-w-0 lg:col-span-3 lg:col-start-7">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-0.5">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal
            as="div"
            delay={stagger(2, 0.05)}
            className="min-w-0 md:col-span-2 lg:col-span-4 lg:col-start-10"
          >
            <div className="flex flex-col gap-4 md:items-start lg:items-end">
              <Link
                href="/contact"
                className={cn(
                  "site-footer__cta inline-flex min-h-[2.75rem] w-full items-center justify-center px-7 text-sm font-medium tracking-[0.04em] sm:w-auto",
                  "bg-[#F7F3EA] text-[#003D32] transition-[color,background-color,transform,box-shadow] duration-300",
                  "hover:bg-[#FFF8EC] hover:shadow-[0_10px_28px_-14px_rgb(0_0_0/0.55)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8783F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003D32]",
                  "active:scale-[0.99]",
                )}
              >
                Talk to us
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="site-footer__bar">
        <Container className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="site-footer__meta font-mono text-[0.6875rem] uppercase tracking-[0.22em]">
            &copy; {year} {site.name}.media
          </p>
          <p className="site-footer__meta font-mono text-[0.6875rem] uppercase tracking-[0.22em] sm:text-right">
            Finding business others miss
          </p>
        </Container>
      </div>
    </footer>
  );
}
