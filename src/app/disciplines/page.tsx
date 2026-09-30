import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Disciplines | Pluck",
  description:
    "Three disciplines — commercial strategy, paid search and digital technology — working together around one commercial objective.",
};

const people = [
  {
    label: "Commercial Strategy",
    name: "Michael Simkin",
    role: "Commercial strategy, positioning & customer understanding",
    body: "Michael works with businesses to understand their market, their customers, what makes them valuable and where commercial opportunities may lie. His work includes research, positioning, communication, copywriting, art direction and the commercial conversations that turn opportunities into projects.",
  },
  {
    label: "Paid Search",
    name: "Junaid Kazi",
    role: "Paid search & performance",
    body: "Junaid brings extensive experience in paid-media strategy, campaign development and optimisation. He works across Google Ads, Meta, and LinkedIn, investigating how prospective customers search and engage online, identifying commercially valuable opportunities, and building targeted campaigns to reach the right people. His focus is not simply on generating traffic or leads, but on understanding which campaigns produce worthwhile enquiries and business.",
  },
  {
    label: "Search & Technology",
    name: "Noumaan Khatib",
    role: "Search, technology & conversion",
    body: "Noumaan brings more than ten years of experience across development, SEO and landing-page optimisation. He connects customer-acquisition strategy with the technical work needed to make it effective: websites, landing pages, search infrastructure, tracking and ongoing improvement. His expertise helps ensure that the experience after somebody clicks is as carefully considered as the campaign that brought them there.",
  },
];

export default function DisciplinesPage() {
  return (
    <main aria-label="Disciplines">
      {/* Hero */}
      <section className="bg-forest py-20 text-ivory md:py-28">
        <Container>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper mb-4">
            Three disciplines
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.06] tracking-[-0.03em] text-ivory max-w-3xl">
            Three disciplines. One commercial objective.
          </h1>
          <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-ivory/80">
            Finding new customers online requires a range of skills. It's far more than knowing how to operate Google Ads. You need to understand not only the business but what matters to customers. You need to know how people search, where competitors are strong and where opportunities may have been left open. You also need the technical ability to turn that knowledge into campaigns, websites and landing pages that work. Those disciplines are often separated. We bring them together.
          </p>
        </Container>
      </section>

      {/* People */}
      <section className="bg-ivory py-[var(--section-space-loose)]">
        <Container>
          <ul className="grid gap-0 border-t border-forest/10 md:grid-cols-3 md:divide-x md:divide-forest/10">
            {people.map((person) => (
              <li
                key={person.name}
                className="border-b border-forest/10 py-10 md:border-b-0 md:px-10 md:first:pl-0 md:last:pr-0"
              >
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper mb-5">
                  {person.label}
                </p>
                <h2 className="font-display text-xl font-medium text-forest">
                  {person.name}
                </h2>
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

      {/* Result */}
      <section className="bg-ivory py-[var(--section-space)]">
        <Container>
          <div className="border-t border-forest/10 pt-14 max-w-2xl">
            <p className="text-base leading-relaxed text-charcoal/78">
              The result is a more complete view of the problem, from the first commercial question through to the enquiry, quotation and sale.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal/78">
              Together, we connect commercial thinking with the expertise needed to identify, reach and convert worthwhile opportunities.
            </p>
            <div className="mt-10">
              <Button href="/contact">Talk to us</Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
