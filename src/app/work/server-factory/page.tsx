import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Server Factory Case Study | Pluck",
  description:
    "How customer research, website strategy and targeted paid search helped Server Factory generate 100+ qualified leads and $1.2m in sales from a $15k media spend.",
};

const metrics = [
  { label: "Campaign duration", value: "3 months" },
  { label: "Media spend", value: "$15,000" },
  { label: "Qualified leads", value: "100+" },
  { label: "Quoted", value: "$4.7m" },
  { label: "Sales", value: "$1.2m" },
];

const sections = [
  {
    label: "The opportunity",
    paragraphs: [
      "Server Factory supplies enterprise IT infrastructure to organisations with demanding technical requirements. Its customers range from universities and research institutions to companies that need powerful computing systems for specialist applications.",
      "Like many growing businesses, Server Factory wanted more enquiries, more opportunities and more sales. But before recommending what to build or where to spend, we needed to understand something more important: How do organisations actually choose a server supplier?",
    ],
  },
  {
    label: "Starting with the customer",
    paragraphs: [
      "Michael began by speaking with members of the Server Factory team and researching the business from different perspectives. He developed a customer questionnaire, which Server Factory sent to existing clients. The responses revealed what customers valued, what built confidence, and where their frustrations lay.",
      "The research also examined Server Factory's competitors: how they presented their products, how they communicated their strengths and how they helped customers make decisions.",
    ],
  },
  {
    label: "Two different buyers",
    paragraphs: [
      "Some customers know exactly what they want. They understand the specifications and need a supplier who can provide the right hardware, availability and price. Others know what they need to achieve but require advice on the best system for the job.",
      "Many competitors presented their products primarily as catalogues. For less experienced buyers, that left much of the decision-making burden with the customer. Server Factory had an opportunity to communicate something more valuable than the hardware alone: the expertise and guidance that help customers make confident technology decisions.",
    ],
  },
  {
    label: "What made the difference",
    paragraphs: [
      "The campaign did not begin with a list of keywords and a budget. It began with understanding the business, its customers and the decisions they needed to make. That understanding informed the positioning, website, landing pages and paid-search strategy. The work then continued through measurement, learning and optimisation.",
      "The project also demonstrated the value of bringing different disciplines together. Commercial research and communication helped establish the direction. Paid-search expertise identified and reached promising demand. SEO and technical development supported the website and the wider customer-acquisition infrastructure.",
    ],
  },
];

export default function ServerFactoryPage() {
  return (
    <main aria-label="Server Factory case study">
      {/* Hero */}
      <section className="bg-forest py-20 text-ivory md:py-28">
        <Container>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper mb-4">
            Case study
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ivory/55 mb-3">
            Server Factory
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.06] tracking-[-0.03em] text-ivory max-w-3xl">
            Finding the Business They Were Missing
          </h1>
          <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-ivory/80">
            Customer research, website strategy, SEO and paid search for a UK enterprise IT infrastructure supplier.
          </p>
        </Container>
      </section>

      {/* Results bar */}
      <section className="bg-ivory py-[var(--section-space)]" aria-label="Campaign results">
        <Container>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper mb-10">
            The results
          </p>
          <div className="grid grid-cols-2 gap-px bg-forest/10 md:grid-cols-5">
            {metrics.map((m) => (
              <div key={m.label} className="bg-ivory px-6 py-8 md:px-8 md:py-10">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-sage mb-3">
                  {m.label}
                </p>
                <p className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-none tracking-[-0.03em] text-forest">
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* Return highlight */}
          <div className="mt-px bg-forest px-8 py-10 md:px-12 md:py-12">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ivory/55 mb-3">
              Return
            </p>
            <p className="font-display text-[clamp(1.875rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ivory">
              $80 in sales for every $1 of advertising spend
            </p>
          </div>

          <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-charcoal/75">
            The results represent $80 in sales for every $1 of advertising spend, with an advertising cost of $150 or less per qualified lead. Approximately 25.5% of the quoted value converted into sales during the reported period.
          </p>
          <p className="mt-3 max-w-2xl text-[0.8125rem] leading-relaxed text-charcoal/55">
            Media spend excludes strategy, campaign management, creative/landing-page work and other associated costs. These figures describe the reported campaign results and should not be interpreted as net profit or return on total investment.
          </p>
        </Container>
      </section>

      {/* Narrative sections */}
      <section className="bg-ivory py-[var(--section-space-loose)]">
        <Container>
          <div className="grid gap-16 lg:gap-20">
            {sections.map((section) => (
              <div key={section.label} className="border-t border-forest/10 pt-10 grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-copper">
                    {section.label}
                  </p>
                </div>
                <div className="space-y-4 lg:col-span-7 lg:col-start-5">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-charcoal/78">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="bg-forest py-[var(--section-space)] text-ivory">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ivory">
              What might be happening in your market?
            </h2>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-ivory/80">
              If you sell specialist or high-value products, potential customers may already be searching for what you offer but not finding you. We can help you investigate where that opportunity may exist and whether it makes commercial sense to pursue it.
            </p>
            <div className="mt-10">
              <Button href="/contact" className="bg-ivory text-forest hover:bg-copper hover:text-ivory">
                Talk to us about your market
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
