import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactPage } from "@/content/contact";
import { contactSeo, site } from "@/content/site";

export const metadata: Metadata = {
  title: contactSeo.title,
  description: contactSeo.description,
  keywords: contactSeo.keywords,
  openGraph: {
    title: contactSeo.title,
    description: contactSeo.description,
    url: `${site.domain}/contact`,
    siteName: site.name,
  },
  twitter: {
    title: contactSeo.title,
    description: contactSeo.description,
  },
  alternates: {
    canonical: `${site.domain}/contact`,
  },
};

export default function ContactPage() {
  const bookingUrl = site.bookingUrl;

  return (
    <main aria-label="Contact Pluck">
      <section className="bg-forest py-20 text-ivory md:py-28">
        <Container>
          <p className="mb-4 type-eyebrow text-copper">
            Contact
          </p>
          <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-ivory">
            {contactPage.headline}
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-[0.9375rem] leading-relaxed text-ivory/80 md:text-base">
            {contactPage.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-[var(--section-space-loose)]">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-forest">
                {contactPage.nextSteps.title}
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-6">
              {contactPage.nextSteps.body.map((paragraph) => (
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

      <section className="border-t border-forest/10 bg-ivory pb-[var(--section-space-loose)] pt-0">
        <Container>
          <div className="grid gap-12 border-t border-forest/10 pt-[var(--section-space-loose)] lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-forest">
                {contactPage.form.title}
              </h2>
              <div className="mt-8 lg:mt-10">
                <ContactForm />
              </div>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9 lg:pt-2">
              <p className="type-caption text-charcoal/72">
                {contactPage.form.preferDirect}
              </p>
              <ul className="mt-6 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal/85 md:text-base">
                <li>
                  <span className="font-medium text-forest">{contactPage.form.emailLabel}:</span>{" "}
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="text-forest underline-offset-4 transition-colors hover:text-copper hover:underline"
                  >
                    {site.contactEmail}
                  </a>
                </li>
                <li>
                  <span className="font-medium text-forest">{contactPage.form.calendarLabel}:</span>{" "}
                  {bookingUrl ? (
                    <a
                      href={bookingUrl}
                      className="text-forest underline-offset-4 transition-colors hover:text-copper hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contactPage.form.calendarLinkText}
                    </a>
                  ) : (
                    <span className="text-charcoal/55">
                      {contactPage.form.calendarLinkText} (link coming soon)
                    </span>
                  )}
                </li>
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-forest py-[var(--section-space-loose)] text-ivory">
        <Container>
          <p className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ivory">
            {contactPage.closing.title}
          </p>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-ivory/75 md:text-base">
            {contactPage.closing.tagline}
          </p>
        </Container>
      </section>
    </main>
  );
}
