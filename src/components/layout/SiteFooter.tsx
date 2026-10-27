"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { navigation, site } from "@/content/site";
import { intro } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { PluckLogo } from "@/components/brand/PluckLogo";
import { Reveal, stagger } from "@/components/motion/Reveal";
import { motionEase, motionDurations } from "@/lib/motion";

const linkClass =
  "site-footer__link inline-flex min-h-10 items-center text-[0.9375rem] leading-snug outline-none";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();

  return (
    <footer className="site-footer relative isolate w-full bg-[#123d32] text-[#faf9f3]">
      <motion.div
        className="site-footer__rule pointer-events-none absolute inset-x-0 top-0 h-px origin-left"
        aria-hidden
        initial={reduce ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.6 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-4% 0px" }}
        transition={{ duration: motionDurations.base, ease: motionEase }}
      />

      <Container className="site-footer__main relative">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:items-start lg:gap-x-10 xl:gap-x-14">
          <Reveal as="div" className="min-w-0 md:col-span-2 lg:col-span-6">
            <Link
              href="/"
              className="site-footer__brand-link inline-block rounded-sm outline-none"
            >
              <PluckLogo variant="footer" />
            </Link>
            <p className="site-footer__tagline mt-3 max-w-[26rem] font-tagline text-[1.25rem] italic leading-[1.35] sm:mt-4 sm:text-[1.375rem]">
              {intro.anchor}
            </p>
            <p className="site-footer__description mt-3.5 max-w-[28rem] text-[0.9375rem] leading-[1.65] sm:mt-4">
              {site.description}
            </p>
          </Reveal>

          <Reveal as="div" delay={stagger(1, 0.05)} className="min-w-0 lg:col-span-3 lg:col-start-8">
            <nav aria-label="Footer navigation">
              <p className="site-footer__heading" aria-hidden="true">Explore</p>
              <ul className="flex flex-col">
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
            className="min-w-0 lg:col-span-3 lg:col-start-11"
          >
            <div className="flex flex-col items-start">
              <p className="site-footer__heading" aria-hidden="true">Start a conversation</p>
              <Link href="/#contact" className="site-footer__cta">
                Talk to us
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="site-footer__bar">
        <Container className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
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
