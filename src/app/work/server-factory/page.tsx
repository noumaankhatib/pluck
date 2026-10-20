import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { serverFactoryCaseStudySeo, site } from "@/content/site";
import { serverFactoryCaseStudy } from "@/content/server-factory-case-study";

export const metadata: Metadata = {
  title: serverFactoryCaseStudySeo.title,
  description: serverFactoryCaseStudySeo.description,
  keywords: serverFactoryCaseStudySeo.keywords,
  openGraph: {
    title: serverFactoryCaseStudySeo.title,
    description: serverFactoryCaseStudySeo.description,
    url: `${site.domain}/work/server-factory`,
    siteName: site.name,
  },
  twitter: {
    title: serverFactoryCaseStudySeo.title,
    description: serverFactoryCaseStudySeo.description,
  },
  alternates: {
    canonical: `${site.domain}/work/server-factory`,
  },
};

const { sections, results, afterResults, cta } = serverFactoryCaseStudy;

function NarrativeBlock({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <div className="grid gap-6 border-t border-forest/10 pt-10 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper">
          {title}
        </h2>
      </div>
      <div className="space-y-4 lg:col-span-7 lg:col-start-5">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className={
              paragraph.endsWith("?")
                ? "font-display text-[clamp(1.25rem,2vw,1.5rem)] font-medium leading-snug tracking-[-0.02em] text-forest"
                : "text-base leading-relaxed text-charcoal/78 md:text-[1.0625rem]"
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function ServerFactoryPage() {
  return (
    <main aria-label="Server Factory case study">
      <section className="bg-forest py-20 text-ivory md:py-28">
        <Container>
          <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper">
            Case study
          </p>
          <h1 className="font-display max-w-4xl text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.06] tracking-[-0.03em] text-ivory">
            {serverFactoryCaseStudy.headline}
          </h1>
          <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-ivory/80 md:text-base">
            {serverFactoryCaseStudy.deck}
          </p>
        </Container>
      </section>

      <section className="bg-ivory py-[var(--section-space-loose)]">
        <Container>
          <div className="grid gap-16 lg:gap-20">
            {sections.map((section) => (
              <NarrativeBlock
                key={section.title}
                title={section.title}
                paragraphs={section.paragraphs}
              />
            ))}
          </div>
        </Container>
      </section>

      <section
        className="border-t border-forest/10 bg-ivory py-[var(--section-space-loose)]"
        aria-label="Campaign results"
      >
        <Container>
          <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper">
            {results.title}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-px bg-forest/10 md:grid-cols-5">
            {results.metrics.map((m) => (
              <div key={m.label} className="bg-ivory px-6 py-8 md:px-8 md:py-10">
                <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-sage">
                  {m.label}
                </p>
                <p className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-none tracking-[-0.03em] text-forest">
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-px bg-forest px-8 py-10 md:px-12 md:py-12">
            <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ivory/55">
              Return
            </p>
            <p className="font-display text-[clamp(1.875rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ivory">
              {results.highlight}
            </p>
          </div>

          <div className="mt-8 max-w-2xl space-y-4">
            {results.body.map((paragraph, i) => (
              <p
                key={paragraph}
                className={
                  i < 2
                    ? "text-[0.9375rem] leading-relaxed text-charcoal/75 md:text-base"
                    : "text-[0.8125rem] leading-relaxed text-charcoal/55"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory pb-[var(--section-space-loose)] pt-0">
        <Container>
          <div className="grid gap-16 lg:gap-20">
            {afterResults.map((section) => (
              <NarrativeBlock
                key={section.title}
                title={section.title}
                paragraphs={section.paragraphs}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest py-[var(--section-space-loose)] text-ivory">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ivory">
              {cta.title}
            </h2>
            <div className="mt-6 space-y-4">
              {cta.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[0.9375rem] leading-relaxed text-ivory/80 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10">
              <Button
                href={cta.href}
                className="bg-ivory text-forest hover:bg-copper hover:text-ivory"
              >
                {cta.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
