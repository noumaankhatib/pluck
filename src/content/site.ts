export const site = {
  name: "Pluck",
  domain: "https://pluck.media",
  description:
    "Pluck helps specialist and high-value B2B businesses find customers they're missing through commercial research, targeted digital campaigns and expert execution.",
  tagline: "There's business you're missing. We'll find it.",
  contactEmail: "talktous@pluck.media",
  /** Set `NEXT_PUBLIC_BOOKING_URL` when the calendar link is live. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
};

export const contactSeo = {
  title: "Talk to us | Pluck",
  description:
    "If you suspect you're not reaching all the customers you should be, tell us about your business. We'll explore the opportunity together — no generic package required.",
  keywords: [
    "contact Pluck",
    "B2B customer acquisition",
    "commercial strategy consultation",
    "paid search enquiry",
  ],
};

export const homeSeo = {
  title: "B2B Customer Acquisition & Digital Marketing | Pluck",
  description: site.description,
  keywords: [
    "B2B customer acquisition",
    "B2B digital marketing",
    "high-value lead generation",
    "paid media",
    "commercial strategy",
  ],
};

export const aboutSeo = {
  title: "About Pluck | Commercial Strategy & Digital Acquisition",
  description:
    "Meet the specialists behind Pluck, who help B2B businesses find new customers and opportunities by combining commercial strategy, paid media, SEO and technology.",
  keywords: [
    "Pluck Media",
    "B2B customer acquisition team",
    "commercial strategy",
    "paid media specialists",
    "SEO and development",
  ],
};

export const serverFactoryCaseStudySeo = {
  title: "Server Factory: B2B Customer Acquisition Case Study | Pluck",
  description:
    "How customer research, website strategy and targeted paid search helped Server Factory generate 100+ qualified leads and $1.2m in sales from a $15k media spend.",
  keywords: [
    "B2B customer acquisition case study",
    "enterprise hardware marketing",
    "B2B website strategy",
    "paid search",
    "technical SEO",
  ],
};

export const navigation = [
  { label: "How we work", href: "/how-we-work" },
  { label: "Disciplines", href: "/disciplines" },
  { label: "Work", href: "/work/server-factory" },
  { label: "About", href: "/about" },
] as const;
