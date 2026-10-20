import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { aboutSeo, site } from "@/content/site";
import {
  aboutIntro,
  aboutWhyTogether,
  aboutUnderstanding,
  aboutTeam,
  aboutBeliefs,
  aboutCta,
} from "@/content/about";

export const metadata: Metadata = {
  title: aboutSeo.title,
  description: aboutSeo.description,
  keywords: aboutSeo.keywords,
  openGraph: {
    title: aboutSeo.title,
    description: aboutSeo.description,
    url: `${site.domain}/about`,
    siteName: site.name,
  },
  twitter: {
    title: aboutSeo.title,
    description: aboutSeo.description,
  },
  alternates: {
    canonical: `${site.domain}/about`,
  },
};

function SplitSection({
  title,
  body,
}: {
  title: string;
  body: string[];
}) {
  return (
    <section className="bg-ivory py-[var(--section-space-loose)]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-forest">
              {title}
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-6 lg:col-start-6">
            {body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-charcoal/78 md:text-[1.0625rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main aria-label="About Pluck">
      <section className="bg-forest py-20 text-ivory md:py-28">
        <Container>
          <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper">
            About
          </p>
          <h1 className="font-display max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.06] tracking-[-0.03em] text-ivory">
            {aboutIntro.headline}
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-[0.9375rem] leading-relaxed text-ivory/80 md:text-base">
            {aboutIntro.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <SplitSection title={aboutWhyTogether.title} body={aboutWhyTogether.body} />

      <section className="border-t border-forest/10 bg-ivory pb-[var(--section-space-loose)] pt-0">
        <Container>
          <div className="grid gap-10 border-t border-forest/10 pt-[var(--section-space-loose)] lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-forest">
                {aboutUnderstanding.title}
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-6">
              {aboutUnderstanding.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-charcoal/78 md:text-[1.0625rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ivory pb-[var(--section-space-loose)] pt-0">
        <Container>
          <div className="border-t border-forest/10 pt-14 mb-14">
            <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-forest">
              {aboutTeam.headline}
            </h2>
          </div>
          <ul className="grid gap-12 md:grid-cols-3 md:gap-10">
            {aboutTeam.people.map((person) => (
              <li key={person.name} className="border-t border-forest/10 pt-8">
                <h3 className="font-display text-xl font-medium text-forest">
                  {person.name}
                </h3>
                <p className="mb-5 mt-1 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-copper">
                  {person.role}
                </p>
                <div className="space-y-4">
                  {person.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[0.9375rem] leading-relaxed text-charcoal/75"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-forest py-[var(--section-space-loose)] text-ivory">
        <Container className="max-w-3xl">
          <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ivory">
            {aboutBeliefs.title}
          </h2>
          <div className="mt-8 space-y-5">
            {aboutBeliefs.intro.map((paragraph, i) => (
              <p
                key={paragraph}
                className={
                  i === 0
                    ? "font-display text-[clamp(1.35rem,2.5vw,1.875rem)] font-medium leading-[1.15] tracking-[-0.02em] text-ivory"
                    : "text-[0.9375rem] leading-relaxed text-ivory/78 md:text-base"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
          <ul
            className="my-10 space-y-0 border-y border-ivory/12"
            aria-label="The questions we care about"
          >
            {aboutBeliefs.questions.map((q) => (
              <li
                key={q}
                className="border-b border-ivory/12 py-4 font-display text-[clamp(1rem,2vw,1.25rem)] leading-snug text-ivory last:border-b-0"
              >
                {q}
              </li>
            ))}
          </ul>
          <div className="space-y-5">
            {aboutBeliefs.closing.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[0.9375rem] leading-relaxed text-ivory/78 md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-[var(--section-space-loose)]">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-forest">
              {aboutCta.title}
            </h2>
            <div className="mt-6 space-y-5">
              {aboutCta.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-charcoal/78 md:text-[1.0625rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <Button href={aboutCta.ctaHref}>{aboutCta.cta}</Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
