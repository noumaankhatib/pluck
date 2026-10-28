import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/case-study/InView";
import { SplitHeading } from "@/components/case-study/SplitHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactPage } from "@/content/contact";
import { site } from "@/content/site";

export function ContactContent() {
  const bookingUrl = site.bookingUrl;

  return (
    <div id="contact" className="cs ct scroll-mt-[var(--header-h)]">
      {/* Hero */}
      <InView
        as="section"
        margin="0px 0px -8% 0px"
        className="cs-hero ct-hero"
        aria-labelledby="ct-title"
      >
        <div className="ct-hero__glow" aria-hidden="true" />
        <Container className="ct-hero__grid relative">
          <div className="ct-hero__media ct-r" style={{ ["--i" as string]: 0 }} aria-hidden="true">
            <div className="ct-hero__photo">
              <Image
                src="/images/contact-section-workspace.webp"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-left"
              />
            </div>
          </div>
          <div className="ct-hero__content">
            <p className="cs-kicker ct-kicker ct-r" style={{ ["--i" as string]: 1, color: "var(--color-copper-soft)" }}>
              Contact
            </p>
            <h2 id="ct-title" className="cs-hero__title ct-hero__title mt-5">
              <span className="ct-r ct-hero__word" style={{ ["--i" as string]: 2 }}>Let&apos;s</span>{" "}
              <span className="ct-r ct-hero__word cs-hero__accent" style={{ ["--i" as string]: 3 }}>talk.</span>
            </h2>
            <div className="ct-hero__intro">
              {contactPage.intro.map((paragraph, i) => (
                <p key={paragraph} className="ct-r" style={{ ["--i" as string]: i + 4 }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <a href="#ct-form-section" className="ct-link ct-hero__cta ct-r" style={{ ["--i" as string]: 7 }}>
              {contactPage.form.title}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Container>
      </InView>

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
      <section id="ct-form-section" className="cs-section cs-section--paper ct-form-section scroll-mt-[var(--header-h)]" aria-labelledby="ct-form">
        <Container>
          <InView className="ct-form-head">
            <p className="cs-kicker cs-rise">Write to us</p>
            <SplitHeading id="ct-form" text={contactPage.form.title} className="cs-h2 mt-3" />
          </InView>
          <div className="ct-split ct-split--form ct-form-grid">
            <InView>
              <div className="ct-card cs-rise" style={{ ["--i" as string]: 3 }}>
                <ContactForm />
              </div>
            </InView>

            <InView as="div" className="ct-aside-wrap">
              <aside className="ct-aside cs-rise" style={{ ["--i" as string]: 3 }} aria-label="Contact details">
                <p className="ct-aside__lead">{contactPage.form.preferDirect}</p>
                <ul className="ct-aside__list">
                  <li className="cs-rise" style={{ ["--i" as string]: 5 }}>
                    <span className="ct-aside__label">{contactPage.form.emailLabel}</span>
                    <a href={`mailto:${site.contactEmail}`} className="ct-link">
                      {site.contactEmail}
                      <span aria-hidden="true">→</span>
                    </a>
                  </li>
                  <li className="cs-rise" style={{ ["--i" as string]: 6 }}>
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
          </div>
        </Container>
      </section>
    </div>
  );
}
