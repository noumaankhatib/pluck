import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { InView } from "@/components/case-study/InView";
import {
  AdviceLine,
  ApproachSteps,
  BeliefDiagram,
  CtaTopography,
  HeroLandscape,
  HeroPathway,
  TeamGrid,
  TogetherDiagram,
} from "@/components/about/visuals";
import { aboutSeo, site } from "@/content/site";
import {
  aboutIntro,
  aboutWhyTogether,
  aboutUnderstanding,
  aboutTeam,
  aboutBeliefs,
  aboutCta,
  aboutStory as story,
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

function Prose({ paragraphs, start = 2 }: { paragraphs: readonly string[]; start?: number }) {
  return (
    <div className="cs-prose">
      {paragraphs.map((p, i) => (
        <p key={p} className="cs-rise" style={{ ["--i" as string]: i + start }}>
          {p}
        </p>
      ))}
    </div>
  );
}

function Head({ kicker, title, id }: { kicker: string; title: string; id: string }) {
  return (
    <header className="cs-head">
      <p className="cs-kicker cs-rise">{kicker}</p>
      <h2 id={id} className="cs-h2 cs-rise" style={{ ["--i" as string]: 1 }}>
        {title}
      </h2>
    </header>
  );
}

export default function AboutPage() {
  return (
    <main aria-label="About Pluck" className="cs ab">
      <section className="cs-hero ab-hero" aria-labelledby="ab-title">
        <HeroLandscape />
        <Container className="cs-hero__grid ab-hero__grid">
          <div>
            <p className="cs-kicker cs-hero-in" style={{ ["--i" as string]: 0, color: "var(--color-copper-soft)" }}>
              {story.hero.kicker}
            </p>
            <h1 id="ab-title" className="cs-hero__title mt-6">
              <span className="cs-hero-in" style={{ ["--i" as string]: 1 }}>We look beyond</span>
              <span className="cs-hero-in" style={{ ["--i" as string]: 2 }}>
                the <span className="cs-hero__accent">obvious.</span>
              </span>
            </h1>
            <div className="ab-hero__body">
              {aboutIntro.body.map((p, i) => (
                <p key={p} className="cs-hero-in" style={{ ["--i" as string]: i + 4 }}>
                  {p}
                </p>
              ))}
            </div>
            <div className="cs-hero-in mt-8" style={{ ["--i" as string]: 8 }}>
              <Button href={aboutCta.ctaHref} className="cs-cta">
                {aboutCta.cta}
                <span aria-hidden="true" className="ml-3">→</span>
              </Button>
            </div>
          </div>
          <HeroPathway />
        </Container>
      </section>

      <section className="cs-section cs-section--ivory" aria-labelledby="belief">
        <Container className="cs-split ab-split-top">
          <InView>
            <Head kicker={story.belief.kicker} title={story.belief.headline} id="belief" />
            <div className="mt-8">
              <Prose paragraphs={aboutBeliefs.intro} />
            </div>
            <ol className="ab-questions" aria-label="The questions we care about">
              {aboutBeliefs.questions.map((q, i) => (
                <li key={q} className="cs-rise" style={{ ["--i" as string]: i + 5 }}>
                  <span aria-hidden="true">0{i + 1}</span>
                  {q}
                </li>
              ))}
            </ol>
          </InView>
          <BeliefDiagram />
        </Container>
      </section>

      <section className="cs-section cs-section--paper" aria-labelledby="approach">
        <Container>
          <InView>
            <Head kicker={story.approach.kicker} title={story.approach.headline} id="approach" />
            <div className="mt-8">
              <Prose paragraphs={aboutWhyTogether.body} />
            </div>
          </InView>
          <div className="mt-14">
            <ApproachSteps />
          </div>
        </Container>
      </section>

      <section className="cs-section cs-section--ivory ab-people" aria-labelledby="people">
        <Container>
          <InView>
            <Head kicker={story.people.kicker} title={story.people.headline} id="people" />
          </InView>
          <div className="mt-9">
            <TeamGrid people={aboutTeam.people} />
          </div>
        </Container>
      </section>

      <section className="cs-section cs-section--forest" aria-labelledby="together">
        <Container className="cs-split ab-split-top">
          <InView>
            <Head kicker={story.together.kicker} title={story.together.headline} id="together" />
            <p className="ab-sub cs-rise" style={{ ["--i" as string]: 2 }}>{aboutIntro.headline}</p>
            <div className="mt-6 ab-prose-dark">
              <Prose paragraphs={aboutBeliefs.closing} start={3} />
            </div>
          </InView>
          <TogetherDiagram />
        </Container>
      </section>

      <section className="cs-section cs-section--ivory ab-advice" aria-labelledby="advice">
        <AdviceLine />
        <Container className="relative">
          <InView>
            <p className="cs-kicker cs-rise">{story.advice.kicker}</p>
            <h2 id="advice" className="ab-advice__title cs-rise" style={{ ["--i" as string]: 1 }}>
              {story.advice.headline}
            </h2>
            <div className="ab-advice__body">
              <h3 className="sr-only">{aboutUnderstanding.title}</h3>
              <Prose paragraphs={aboutUnderstanding.body} start={3} />
            </div>
          </InView>
        </Container>
      </section>

      <section className="cs-section cs-section--ink ab-cta" aria-labelledby="about-cta">
        <CtaTopography />
        <Container className="relative">
          <InView>
            <p className="cs-kicker cs-rise">{story.cta.kicker}</p>
            <h2 id="about-cta" className="ab-cta__title cs-rise" style={{ ["--i" as string]: 1 }}>
              {story.cta.headline}
            </h2>
            <div className="cs-prose mt-8">
              {aboutCta.body.map((p, i) => (
                <p key={p} className="cs-rise" style={{ ["--i" as string]: i + 2 }}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10 cs-rise" style={{ ["--i" as string]: 6 }}>
              <Button href={aboutCta.ctaHref} className="cs-cta">
                {aboutCta.cta}
                <span aria-hidden="true" className="ml-3">→</span>
              </Button>
            </div>
          </InView>
        </Container>
      </section>
    </main>
  );
}
