import Link from "next/link";
import { navigation, site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-espresso relative text-ivory">
      {/* Spectrum hairline ties the footer to the chapter accents */}
      <div className="h-px bg-gradient-to-r from-copper via-saffron to-teal opacity-70" aria-hidden />

      {/* Main footer body */}
      <Container className="grid items-end gap-8 py-10 md:grid-cols-2 md:py-12 lg:grid-cols-12 lg:gap-12">

        {/* Brand block */}
        <div className="lg:col-span-5">
          <p className="font-display text-[1.5rem] font-medium tracking-[-0.02em] text-ivory">
            {site.name}
          </p>
          <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ivory/55">
            Commercial intelligence
          </p>
          <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-ivory/70">
            {site.description}
          </p>
        </div>

        {/* Nav + CTA */}
        <div className="flex flex-col justify-between gap-6 lg:col-span-7 lg:flex-row lg:items-end">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-7 gap-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/contact"
            className="inline-flex min-h-[2.75rem] items-center border border-ivory/20 px-7 text-sm font-medium tracking-wide text-ivory transition-all hover:-translate-y-0.5 hover:border-copper hover:bg-copper hover:text-ivory"
          >
            Talk to us
          </Link>
        </div>
      </Container>

      {/* Copyright strip */}
      <div className="border-t border-ivory/10">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-4">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ivory/50">
            &copy; {year} {site.name}.media
          </p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ivory/50">
            Finding business others miss
          </p>
        </Container>
      </div>
    </footer>
  );
}
