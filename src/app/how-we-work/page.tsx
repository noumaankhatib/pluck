import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How We Work | Pluck",
  description:
    "Pluck's approach to finding commercially valuable business opportunities — understanding your market, identifying demand and reaching the right customers.",
};

const steps = [
  {
    number: "01",
    title: "Understand",
    body: "Before we think about advertising, we look at your business. What do you sell? Who buys it? Why do they choose you? What is a new customer worth? Where might there be room to grow?",
  },
  {
    number: "02",
    title: "Find",
    body: "Then we investigate the market. What are potential customers searching for? Where are they searching? How many people are searching? Which searches suggest genuine buying interest? Where are competitors strong? Where might competitors be leaving opportunities open?",
  },
  {
    number: "03",
    title: "Reach",
    body: "When we find a worthwhile opportunity, we work out the best way to reach it. Depending on the opportunity, that may include targeted search or social advertising, SEO, dedicated landing pages or other approaches designed to reach the right people.",
  },
  {
    number: "04",
    title: "Learn",
    body: "Then we follow what happens. Not simply who clicked. We want to know: Did they enquire? Was the enquiry any good? Did it become a quotation? Did it become a customer? Did it make money? Then we do more of what works and less of what doesn't.",
  },
];

export default function HowWeWorkPage() {
  return (
    <main aria-label="How we work">
      {/* Hero */}
      <section className="bg-forest py-20 text-ivory md:py-28">
        <Container>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper mb-4">
            Our approach
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.06] tracking-[-0.03em] text-ivory max-w-3xl">
            How we work
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ivory/80">
            If you have a valuable product or service and suspect you're missing customers, we'll be glad to talk.
          </p>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-ivory py-[var(--section-space-loose)]">
        <Container>
          <p className="max-w-2xl text-base leading-relaxed text-charcoal/78 mb-14 md:mb-16">
            We'll start by discussing your business, your customers, what you're doing now and where there may be opportunities worth investigating.
          </p>

          <ol className="grid gap-0 border-t border-forest/10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li
                key={step.number}
                className="border-b border-r-0 border-forest/10 px-0 py-10 pr-0 md:border-b-0 md:border-r md:pr-10 md:last:border-r-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
              >
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper mb-4">
                  {step.number}
                </p>
                <h2 className="font-display text-[1.375rem] font-medium leading-snug text-forest mb-4">
                  {step.title}
                </h2>
                <p className="text-[0.9375rem] leading-relaxed text-charcoal/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Commitment */}
      <section className="bg-ivory py-[var(--section-space)]">
        <Container>
          <div className="border-t border-forest/10 pt-14 max-w-2xl">
            <p className="text-base leading-relaxed text-charcoal/78">
              We won't begin by trying to sell you a package. And we won't pretend to know the answer before we've looked. Sometimes we may conclude that paid search isn't actually the right opportunity. That's useful to know too.
            </p>
            <p className="mt-8 font-display text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-forest">
              Let's see what's out there.
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
