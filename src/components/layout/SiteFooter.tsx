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

const TRAIL = "M-40 340 C 260 400, 520 270, 820 318 S 1260 210, 1500 262";
const [taglineLead, taglineEnd] = intro.anchor.split("missing");

export function SiteFooter() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();

  return (
    <footer className="site-footer relative isolate w-full overflow-hidden text-[#faf9f3]">
      <div className="site-footer__fx" aria-hidden>
        <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" className="site-footer__trail" focusable="false">
          <defs>
            <linearGradient id="sf-trail" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#087b50" stopOpacity="0" />
              <stop offset="0.3" stopColor="#087b50" stopOpacity="0.55" />
              <stop offset="0.75" stopColor="#0a4936" stopOpacity="0.5" />
              <stop offset="1" stopColor="#087b50" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="site-footer__trail-glow" d={TRAIL} fill="none" stroke="url(#sf-trail)" strokeWidth="14" />
          <path className="site-footer__trail-line" d={TRAIL} fill="none" stroke="url(#sf-trail)" strokeWidth="1.25" />
          <path className="site-footer__trail-light" d={TRAIL} pathLength={1} fill="none" stroke="#e69a61" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </div>
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
              {taglineLead}
              <em className="site-footer__missing">missing</em>
              {taglineEnd}
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
                      <span className="site-footer__arrow" aria-hidden>→</span>
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
