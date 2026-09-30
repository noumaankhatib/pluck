import Link from "next/link";
import { navigation, site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory">

      {/* Main footer body */}
      <Container className="grid gap-12 py-16 md:grid-cols-2 md:gap-8 md:py-20 lg:grid-cols-12 lg:gap-12">

        {/* Brand block */}
        <div className="lg:col-span-5">
          <p className="font-display text-[1.5rem] font-medium tracking-[-0.02em] text-ivory">
            {site.name}
          </p>
          <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ivory/55">
            Commercial intelligence
          </p>
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-ivory/70">
            {site.description}
          </p>
        </div>

        {/* Nav + CTA */}
        <div className="flex flex-col justify-between gap-8 lg:col-span-7 lg:flex-row lg:items-end">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
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
            className="inline-flex min-h-[2.75rem] items-center border border-ivory/20 px-7 text-sm font-medium tracking-wide text-ivory transition-all hover:border-ivory/50 hover:bg-ivory hover:text-forest"
          >
            Talk to us
          </Link>
        </div>
      </Container>

      {/* Copyright strip */}
      <div className="border-t border-ivory/10">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-5">
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
