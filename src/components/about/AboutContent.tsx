import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { InView } from "@/components/case-study/InView";
import {
  TeamGrid,
} from "@/components/about/visuals";
import { BeliefSection } from "@/components/about/BeliefSection";
import { TogetherSection } from "@/components/about/TogetherSection";
import { AdviceSection } from "@/components/about/AdviceSection";
import { ApproachSection } from "@/components/about/ApproachSection";
import { CtaIllustration } from "@/components/about/CtaIllustration";
import { HeroGoldenRoad } from "@/components/about/HeroGoldenRoad";
import {
  aboutIntro,
  aboutTeam,
  aboutCta,
  aboutStory as story,
} from "@/content/about";

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

export function AboutContent() {
  return (
    <div id="about" className="cs ab scroll-mt-[var(--header-h)]">
      <section className="cs-hero ab-hero" aria-labelledby="ab-title">
        <Container className="cs-hero__grid ab-hero__grid">
          <div>
            <p className="cs-kicker cs-hero-in" style={{ ["--i" as string]: 0, color: "var(--color-copper-soft)" }}>
              {story.hero.kicker}
            </p>
            <h2 id="ab-title" className="cs-hero__title mt-6">
              <span className="cs-hero-in" style={{ ["--i" as string]: 1 }}>Three disciplines.</span>
              <span className="cs-hero-in" style={{ ["--i" as string]: 2 }}>
                One commercial <span className="cs-hero__accent">objective.</span>
              </span>
            </h2>
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
          <HeroGoldenRoad />
        </Container>
      </section>

      <BeliefSection />

      <ApproachSection />

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

      <TogetherSection />

      <AdviceSection />

      <section className="cs-section cs-section--ink ab-cta" aria-labelledby="about-cta">
        <CtaIllustration />
        <Container className="relative">
          <InView className="ab-cta__text">
            <h2 id="about-cta" className="ab-cta__title">
              {(() => {
                const w = story.cta.headline.split(" ");
                const h = Math.ceil(w.length / 2);
                return [w.slice(0, h).join(" "), w.slice(h).join(" ")].map((l, i) => (
                  <span key={i} className="ab-cta__mask">
                    <span className="cs-rise ab-cta__word" style={{ ["--i" as string]: i + 1 }}>{l}</span>
                  </span>
                ));
              })()}
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
    </div>
  );
}
