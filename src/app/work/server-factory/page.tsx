import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { serverFactoryCaseStudySeo, site } from "@/content/site";
import { serverFactoryCaseStudy, serverFactoryStory as story } from "@/content/server-factory-case-study";
import { SplitHeading } from "@/components/case-study/SplitHeading";
import { ChapterRail } from "@/components/case-study/ChapterRail";
import { ReadingProgress } from "@/components/case-study/ReadingProgress";
import { InView } from "@/components/case-study/InView";
import {
  BuyerCards,
  ClosingSignal,
  DisciplinesDiagram,
  HeroNetwork,
  NextTimeline,
  OpportunityVisual,
  ProcessTimeline,
  ResultsStory,
  SearchFlow,
  WebsiteStructure,
} from "@/components/case-study/visuals";

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
const [opportunity, customer, buyers, website, paid] = sections;
const [difference, next] = afterResults;

const chapters = [
  { id: "opportunity", label: "Challenge" },
  { id: "customer", label: "Research" },
  { id: "buyers", label: "Buyers" },
  { id: "website", label: "Website" },
  { id: "paid", label: "Paid search" },
  { id: "results", label: "Results" },
  { id: "difference", label: "Difference" },
  { id: "next", label: "Next" },
  { id: "cta", label: "Your market" },
];

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="cs-prose">
      {paragraphs.map((p, i) => (
        <p
          key={p}
          className={`cs-rise ${p.endsWith("?") ? "cs-prose__question" : ""}`}
          style={{ ["--i" as string]: i + 2 }}
        >
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
      <SplitHeading id={id} text={title} className="cs-h2" />
    </header>
  );
}

export default function ServerFactoryPage() {
  const [client, ...restTitle] = serverFactoryCaseStudy.headline.split(": ");
  const title = restTitle.join(": ");
  const emphasis = "They Were Missing";
  const lead = title.replace(emphasis, "");

  return (
    <main aria-label="Server Factory case study" className="cs">
      <ReadingProgress />

      <section className="cs-hero" aria-labelledby="cs-title">
        <Container className="cs-hero__grid">
          <div>
            <ul className="cs-meta" aria-label="Project type">
              {story.heroMeta.map((m, i) => (
                <li key={m} className="cs-hero-in" style={{ ["--i" as string]: i }}>
                  {m}
                </li>
              ))}
            </ul>
            <h1 id="cs-title" className="cs-hero__title">
              <span className="cs-hero-in cs-hero__client" style={{ ["--i" as string]: 2 }}>
                {client}:
              </span>
              <span className="cs-hero-in" style={{ ["--i" as string]: 3 }}>{lead}</span>
              <span className="cs-hero-in cs-hero__accent" style={{ ["--i" as string]: 4 }}>{emphasis}</span>
            </h1>
            <p className="cs-hero__deck cs-hero-in" style={{ ["--i" as string]: 6 }}>
              {serverFactoryCaseStudy.deck}
            </p>
            <a href="#opportunity" className="cs-scroll cs-hero-in" style={{ ["--i" as string]: 8 }}>
              <span className="cs-scroll__line" aria-hidden="true" />
              Read the story
            </a>
          </div>
          <HeroNetwork />
        </Container>
      </section>

      <ChapterRail chapters={chapters} />

      <section className="cs-section cs-section--ivory" aria-labelledby="opportunity">
        <Container className="cs-split">
          <InView>
            <Head kicker="01 · The challenge" title={story.opportunity.headline} id="opportunity" />
            <Prose paragraphs={opportunity.paragraphs} />
          </InView>
          <OpportunityVisual />
        </Container>
      </section>

      <section className="cs-section cs-section--paper" aria-labelledby="customer">
        <Container>
          <InView>
            <Head kicker="02 · The research" title={story.customer.headline} id="customer" />
            <div className="cs-prose-grid">
              <Prose paragraphs={customer.paragraphs} />
            </div>
          </InView>
          <div className="mt-8">
            <ProcessTimeline />
          </div>
        </Container>
      </section>

      <section className="cs-section cs-section--ivory" aria-labelledby="buyers">
        <Container>
          <InView>
            <Head kicker="03 · The buyers" title={story.buyers.headline} id="buyers" />
            <div className="cs-prose-grid">
              <Prose paragraphs={buyers.paragraphs} />
            </div>
          </InView>
          <BuyerCards />
        </Container>
      </section>

      <section className="cs-section cs-section--paper" aria-labelledby="website">
        <Container>
          <InView>
            <Head kicker="04 · The website" title={story.website.headline} id="website" />
            <div className="cs-prose-grid">
              <Prose paragraphs={website.paragraphs} />
            </div>
          </InView>
          <div className="mt-8">
            <WebsiteStructure />
          </div>
        </Container>
      </section>

      <section className="cs-section cs-section--ivory" aria-labelledby="paid">
        <Container>
          <InView>
            <Head kicker="05 · Paid search" title={story.paid.headline} id="paid" />
            <div className="cs-prose-grid">
              <Prose paragraphs={paid.paragraphs} />
            </div>
          </InView>
          <SearchFlow />
        </Container>
      </section>

      <section className="cs-section cs-section--forest" aria-labelledby="results">
        <Container>
          <InView>
            <header className="cs-head">
              <p className="cs-kicker cs-rise">06 · {story.results.kicker}</p>
              <SplitHeading id="results" text={results.title} className="cs-h2" />
            </header>
          </InView>
          <ResultsStory metrics={results.metrics} highlight={results.highlight} body={results.body} />
        </Container>
      </section>

      <section className="cs-section cs-section--ivory" aria-labelledby="difference">
        <Container>
          <InView>
            <Head kicker="07 · The difference" title={story.difference.headline} id="difference" />
            <div className="cs-prose-grid">
              <Prose paragraphs={difference.paragraphs.slice(1)} />
            </div>
          </InView>
          <DisciplinesDiagram />
        </Container>
      </section>

      <section className="cs-section cs-section--paper cs-section--pending" aria-labelledby="next">
        <Container>
          <InView>
            <Head kicker="08 · What comes next" title={story.next.headline} id="next" />
            <div className="cs-prose-grid">
              <Prose paragraphs={next.paragraphs} />
            </div>
          </InView>
          <NextTimeline />
        </Container>
      </section>

      <section className="cs-section cs-section--ink" aria-labelledby="cta">
        <Container className="cs-split cs-split--cta">
          <InView>
            <p className="cs-kicker cs-rise">09 · Your market</p>
            <SplitHeading id="cta" text={cta.title} className="cs-h2" />
            <div className="cs-prose mt-6">
              {cta.body.map((paragraph, i) => (
                <p key={paragraph} className="cs-rise cs-prose--dark" style={{ ["--i" as string]: i + 2 }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10 cs-rise" style={{ ["--i" as string]: 4 }}>
              <Button href={cta.href} className="cs-cta">
                {cta.label}
                <span aria-hidden="true" className="ml-3">→</span>
              </Button>
            </div>
          </InView>
          <ClosingSignal />
        </Container>
      </section>
    </main>
  );
}
