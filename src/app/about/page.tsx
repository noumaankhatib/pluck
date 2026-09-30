import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About | Pluck",
  description:
    "Meet the specialists behind Pluck, who help B2B businesses find new customers and opportunities by combining commercial strategy, paid media, SEO and technology.",
};

const team = [
  {
    name: "Michael Jack Simkin",
    role: "Commercial strategy, positioning & customer understanding",
    body: "Michael has more than a decade of experience helping businesses understand their markets and customers. He identifies what makes propositions valuable and where commercial opportunities may lie. His work includes research, positioning, communication, copywriting, art direction and the commercial conversations that turn opportunities into projects.",
  },
  {
    name: "Junaid Kazi",
    role: "Paid search & performance",
    body: "Junaid brings extensive experience in paid-media strategy, campaign development and optimisation, including work for Thomas Cook and high-value international B2B campaigns. He works across Google Ads, Meta, and LinkedIn, investigating how prospective customers search and engage online, identifying commercially valuable opportunities, and building targeted campaigns to reach the right people.",
  },
  {
    name: "Noumaan Khatib",
    role: "Search, technology & conversion",
    body: "Noumaan brings more than ten years of experience across development, SEO and landing-page optimisation. He connects customer-acquisition strategy with the technical work needed to make it effective: websites, landing pages, search infrastructure, tracking and ongoing improvement.",
  },
];

const questions = [
  "Where are your potential customers?",
  "What are they looking for?",
  "Can we reach them?",
  "What will it cost?",
  "Are the enquiries any good?",
  "Are they becoming customers?",
  "Is this making you money?",
];

export default function AboutPage() {
  return (
    <main aria-label="About Pluck">
      {/* Hero */}
      <section className="bg-forest py-20 text-ivory md:py-28">
        <Container>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper mb-4">
            About
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.06] tracking-[-0.03em] text-ivory max-w-3xl">
            Three disciplines. One commercial objective.
          </h1>
          <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-ivory/80">
            Pluck brings together commercial strategy, paid-search expertise and digital execution to help businesses find customers and opportunities they may be missing. We work particularly well with companies selling specialist, technical, complex or high-value products and services. In these markets, a relatively small number of the right customers can represent substantial business.
          </p>
        </Container>
      </section>

      {/* Approach */}
      <section className="bg-ivory py-[var(--section-space-loose)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper mb-3">
                Our approach
              </p>
              <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-forest">
                We start by understanding
              </h2>
            </div>
            <div className="space-y-4 lg:col-span-6 lg:col-start-6">
              <p className="text-base leading-relaxed text-charcoal/78">
                Before recommending a campaign, we want to understand what you sell, who buys it and why they choose you. We look at your market, your competitors and the way potential customers search for what you offer. We ask what a new customer is worth, what you have already tried and where there may be room to grow.
              </p>
              <p className="text-base leading-relaxed text-charcoal/78">
                Sometimes the opportunity is clear. Sometimes the research changes our assumptions. Occasionally, it may show that paid search is not the right investment. We would rather discover that before you spend money.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-ivory py-[var(--section-space-loose)]">
        <Container>
          <div className="border-t border-forest/10 pt-14 mb-14">
            <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-forest">
              The people behind Pluck
            </h2>
          </div>
          <ul className="grid gap-12 md:grid-cols-3 md:gap-10">
            {team.map((person) => (
              <li key={person.name} className="border-t border-forest/10 pt-8">
                <h3 className="font-display text-xl font-medium text-forest">
                  {person.name}
                </h3>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-copper mt-1 mb-5">
                  {person.role}
                </p>
                <p className="text-[0.9375rem] leading-relaxed text-charcoal/75">
                  {person.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What we believe */}
      <section className="bg-forest py-[var(--section-space-loose)] text-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper mb-4">
                What we believe
              </p>
              <p className="font-display text-[clamp(1.5rem,3vw,2.125rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ivory">
                You don't just need more leads. You need the right ones.
              </p>
              <p className="mt-8 text-[0.9375rem] leading-relaxed text-ivory/78">
                The technical complexity sits with us.
              </p>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-ivory/78">
                Pluck is a collaboration between three independent professionals. We bring different expertise to each project, but work together around one agreed commercial objective. We don't believe every client needs every service we can provide. The work should be shaped by the opportunity, not by a predetermined package.
              </p>
            </div>
            <ul className="space-y-0 lg:col-span-6 lg:col-start-7" aria-label="The questions we care about">
              {questions.map((q) => (
                <li
                  key={q}
                  className="border-b border-ivory/12 py-4 font-display text-[clamp(1rem,2vw,1.25rem)] leading-snug text-ivory"
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-ivory py-[var(--section-space)]">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-forest">
              Let's see what we might find.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal/78">
              If you have a product or service and suspect there are customers you're not currently reaching, we'd be glad to talk.
            </p>
            <div className="mt-8">
              <Button href="/contact">Talk to us</Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
