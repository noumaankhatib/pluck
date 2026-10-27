import { Container } from "@/components/ui/Container";
import { InView } from "@/components/case-study/InView";
import { SplitHeading } from "@/components/case-study/SplitHeading";
import { Topo } from "@/components/about/visuals";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactPage } from "@/content/contact";
import { site } from "@/content/site";

export function ContactContent() {
  const bookingUrl = site.bookingUrl;

  return (
    <div id="contact" className="cs ct scroll-mt-[var(--header-h)]">
      {/* Hero */}
      <section className="cs-hero ct-hero" aria-labelledby="ct-title">
        <div className="ct-hero__topo" aria-hidden="true">
          <svg viewBox="0 0 1440 560" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
            <g style={{ color: "var(--color-sage-light)" }} className="ct-topo">
              <Topo cx={1120} cy={270} count={11} step={40} seed={6} sx={1.8} />
            </g>
          </svg>
          <i className="ct-ping" />
        </div>
        <Container className="relative">
          <p className="cs-kicker cs-hero-in" style={{ ["--i" as string]: 0, color: "var(--color-copper-soft)" }}>
            Contact
          </p>
          <h2 id="ct-title" className="cs-hero__title mt-5">
            <span className="cs-hero-in" style={{ ["--i" as string]: 1 }}>
              Let&apos;s <span className="cs-hero__accent">talk.</span>
            </span>
          </h2>
          <div className="ct-hero__intro">
            {contactPage.intro.map((paragraph, i) => (
              <p key={paragraph} className="cs-hero-in" style={{ ["--i" as string]: i + 3 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* What happens next */}
      <section className="cs-section cs-section--ivory" aria-labelledby="ct-next">
        <Container className="ct-split">
          <InView>
            <p className="cs-kicker cs-rise">The process</p>
            <SplitHeading id="ct-next" text={contactPage.nextSteps.title} className="cs-h2 mt-3" />
          </InView>
          <InView as="ol" className="ct-steps" aria-label="What happens after you get in touch">
            {contactPage.nextSteps.body.map((paragraph, i) => (
              <li key={paragraph} className="ct-step cs-rise" style={{ ["--i" as string]: i + 1 }}>
                <span className="cs-marker" aria-hidden="true">{i + 1}</span>
                <p>{paragraph}</p>
              </li>
            ))}
          </InView>
        </Container>
      </section>

      {/* Form */}
      <section className="cs-section cs-section--paper ct-form-section" aria-labelledby="ct-form">
        <Container className="ct-split ct-split--form">
          <InView>
            <p className="cs-kicker cs-rise">Write to us</p>
            <SplitHeading id="ct-form" text={contactPage.form.title} className="cs-h2 mt-3" />
            <div className="ct-card cs-rise" style={{ ["--i" as string]: 3 }}>
              <ContactForm />
            </div>
          </InView>

          <InView as="div" className="ct-aside-wrap">
            <aside className="ct-aside cs-rise" style={{ ["--i" as string]: 2 }} aria-label="Contact details">
              <p className="type-caption ct-aside__lead">{contactPage.form.preferDirect}</p>
              <ul className="ct-aside__list">
                <li>
                  <span className="ct-aside__label">{contactPage.form.emailLabel}</span>
                  <a href={`mailto:${site.contactEmail}`} className="ct-link">
                    {site.contactEmail}
                    <span aria-hidden="true">→</span>
                  </a>
                </li>
                <li>
                  <span className="ct-aside__label">{contactPage.form.calendarLabel}</span>
                  {bookingUrl ? (
                    <a href={bookingUrl} className="ct-link" target="_blank" rel="noopener noreferrer">
                      {contactPage.form.calendarLinkText}
                      <span aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <span className="ct-aside__soon">
                      {contactPage.form.calendarLinkText} (link coming soon)
                    </span>
                  )}
                </li>
              </ul>
            </aside>
          </InView>
        </Container>
      </section>

      {/* Closing */}
      <section className="cs-section cs-section--ink ct-closing" aria-label="Closing">
        <div className="ct-hero__topo ct-closing__topo" aria-hidden="true">
          <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
            <g style={{ color: "var(--color-sage-light)" }} className="ct-topo">
              <Topo cx={260} cy={220} count={9} step={38} seed={3} sx={1.9} />
            </g>
          </svg>
        </div>
        <Container className="relative">
          <InView>
            <SplitHeading text={contactPage.closing.title} className="ct-closing__title" as="h2" />
            <span className="ct-closing__line cs-draw-bar" aria-hidden="true" />
            <p className="ct-closing__tag cs-rise" style={{ ["--i" as string]: 6 }}>
              {contactPage.closing.tagline}
            </p>
          </InView>
        </Container>
      </section>
    </div>
  );
}
