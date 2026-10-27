export const hero = {
  headline: "There's business you're missing.",
  subheading: "We'll find it.",
  subline:
    "Pluck finds commercially valuable opportunities businesses are currently missing.",
  journey: [
    { id: "demand", label: "Demand", description: "Need exists in the market." },
    {
      id: "discovery",
      label: "Discovery",
      description: "Search and behaviour leave traces.",
    },
    {
      id: "connection",
      label: "Connection",
      description: "The right message meets the right moment.",
    },
    {
      id: "enquiry",
      label: "Enquiry",
      description: "A conversation worth having begins.",
    },
    {
      id: "business",
      label: "Business",
      description: "Commercial value, not vanity metrics.",
    },
  ],
};

export const intro = {
  sentences: [
    "If you sell a specialist, technical or high-value product, you probably don't need thousands of new leads.",
    "You need a relatively small number of the right customers.",
    "We examine your business, your market and how potential customers look for what you sell.",
    "Then, where the opportunity makes commercial sense, we help you reach them.",
  ],
  anchor: "We find the business you're missing.",
};

export const quality = {
  headlineLead: "You don't just need more leads.",
  headlineTurn: "You need the right ones.",
  subheading:
    "For many B2B companies, one good customer can be worth a great deal.",
  paragraphs: [
    "Much digital marketing is still built around volume.",
    "More traffic. More impressions. More clicks. More leads.",
    "Those numbers only matter if they eventually become business.",
    "If your sales depend on valuable contracts, specialist equipment, enterprise technology or complex services, a handful of the right customers may be worth far more than hundreds of irrelevant enquiries.",
    "The challenge is finding them. This is where we come in.",
  ],
  volumeSignals: ["traffic", "impressions", "clicks", "leads"],
  rightSignals: [
    "relevant customer",
    "commercial opportunity",
    "qualified enquiry",
    "business",
  ],
  cta: "Talk to us",
  ctaHref: "/#contact",
};

export const searchIntelligence = {
  headline: "The way potential customers search tells you what they need.",
  lead: "The way potential customers search tells you what they need.",
  clue: "Search leaves clues.",
  body: [
    "Some search for a particular product.",
    "Others search for a specification, a supplier or a problem they need to solve.",
    "The keywords and phrases they use leave clues.",
    "They tell us what people are looking for, where demand exists, what competitors are doing and where opportunities may have been left open.",
    "Before we design any advertising campaign, we begin by asking where there is an opportunity worth pursuing.",
  ],
  stages: [
    { label: "Search", description: "Behaviour leaves a trail." },
    { label: "Demand", description: "Need becomes visible in the data." },
    { label: "Intent", description: "What people are trying to do." },
    { label: "Competition", description: "Who else is in the conversation." },
    { label: "Opportunity", description: "Where business is waiting." },
  ],
};

export const journey = {
  title: "How we find the business",
  cta: "Talk to us",
  ctaHref: "/#contact",
  stages: [
    {
      step: "01",
      title: "Understand",
      body: "Before we think about advertising, we look at your business.",
      prompts: [
        "What do you sell?",
        "Who buys it?",
        "Why do they choose you?",
        "What is a new customer worth?",
        "Where might there be room to grow?",
      ],
    },
    {
      step: "02",
      title: "Find",
      body: "Then we investigate the market.",
      prompts: [
        "What are potential customers searching for?",
        "Where are they searching?",
        "How many people are searching?",
        "Which searches suggest genuine buying interest?",
        "Where are competitors strong?",
        "Where might competitors be leaving opportunities open?",
      ],
    },
    {
      step: "03",
      title: "Reach",
      body:
        "When we find a worthwhile opportunity, we work out the best way to reach it. Depending on the opportunity, that may include targeted search or social advertising, SEO, dedicated landing pages or other approaches designed to reach the right people.",
      prompts: [
        "Search advertising",
        "Social advertising",
        "SEO",
        "Landing pages",
        "Other approaches",
      ],
    },
    {
      step: "04",
      title: "Learn",
      body: "Then we follow what happens. Not simply who clicked. We want to know:",
      outro: "Then we do more of what works and less of what doesn't.",
      prompts: [
        "Did they enquire?",
        "Was the enquiry any good?",
        "Did it become a quotation?",
        "Did it become a customer?",
        "Did it make money?",
      ],
    },
  ],
};

export const caseStudy = {
  client: "Server Factory",
  headline: "What does success look like?",
  supporting: "It isn't a dashboard full of green arrows. It's business.",
  body: [
    "For Server Factory, a UK enterprise IT infrastructure company, the opportunity was to reach organisations actively searching for high-value enterprise hardware.",
    "The work went beyond simply running Google Ads.",
    "It included understanding the business and its customers, researching the market and competitors, identifying valuable searches, developing landing pages and continually learning from what happened.",
  ],
  timeline: "3 months",
  metrics: [
    { label: "Media spend", value: "$15,000" },
    { label: "Qualified leads", value: "100+" },
    { label: "Quoted", value: "$4.7m" },
    { label: "In sales", value: "$1.2m" },
    {
      label: "Return",
      value: "$80 in sales for every $1 of advertising spend",
    },
  ],
  flow: ["Spend", "Leads", "Quotes", "Sales"],
  link: "/work/server-factory",
  linkLabel: "Read the Server Factory case study",
};

export const qualification = {
  headline: "This approach isn't right for every business.",
  intro: "It works particularly well when:",
  criteria: [
    "one new customer is worth a significant amount to your business",
    "potential customers actively search online for what you sell or the problems you solve",
    "your product or service is specialist, technical or complex",
    "quality matters more than lead volume",
    "a sales conversation normally follows an enquiry",
    "you suspect there are customers, markets or opportunities you're currently missing",
  ],
  industriesIntro:
    "We work especially well with businesses selling things people think carefully about before they buy.",
  industries: [
    "Enterprise technology",
    "Specialist equipment",
    "Infrastructure",
    "Engineering",
    "Scientific and medical equipment",
    "High-value services",
  ],
};

export const plainEnglish = {
  headline: "Plain English",
  intro: [
    "You shouldn't need to become a PPC expert.",
    "You should be able to ask much simpler questions.",
  ],
  questions: [
    "Where are our potential customers?",
    "What are they looking for?",
    "Can we reach them?",
    "What will it cost?",
    "Are the enquiries any good?",
    "Are they becoming customers?",
    "Is this making us money?",
  ],
  bridge: "Those are the questions we care about too.",
  climax: "The technical complexity sits with us.",
};

/** Column copy for the three disciplines (supplied in the approved layout reference). */
export const disciplineColumns = [
  {
    heading: "Understand the opportunity.",
    text: "We help you understand the market, your customers and the commercial opportunity, so you can focus on what will make a difference.",
  },
  {
    heading: "Capture relevant demand.",
    text: "We identify and reach people actively searching for what you sell, using paid search to generate high-quality enquiries and commercial results.",
  },
  {
    heading: "Build the right foundations.",
    text: "We use search, data and technology to support performance, improve visibility and make it easier for the right customers to find and enquire.",
  },
] as const;

export const disciplines = {
  headline: "Three disciplines. One commercial objective.",
  subheading:
    "Finding new customers online requires more than knowing how to operate Google Ads.",
  body: "We bring together three different ways of looking at the same problem.",
  people: [
    {
      name: "Michael Simkin",
      discipline: "Commercial strategy, positioning & customer understanding",
      bio:
        "Michael works with businesses to understand their market, their customers, what makes them valuable and where commercial opportunities may lie.",
    },
    {
      name: "Junaid Kazi",
      discipline: "Paid search & performance",
      bio:
        "Junaid identifies how prospective customers search and builds tightly targeted campaigns designed to reach them at the right moment.",
    },
    {
      name: "Noumaan Khatib",
      discipline: "Search, technology & conversion",
      bio:
        "Noumaan brings more than ten years of experience across development, SEO and landing-page optimisation, connecting customer acquisition with the technology needed to turn interest into enquiries.",
    },
  ],
  objective: "One commercial objective",
  closingLine: "Find the business you're missing.",
};

export const closing = {
  title: "How we work",
  body: [
    "If you have a valuable product or service and suspect you're missing customers, we'll be glad to talk.",
    "We'll start by discussing your business, your customers, what you're doing now and where there may be opportunities worth investigating.",
    "We won't begin by trying to sell you a package. And we won't pretend to know the answer before we've looked.",
    "Sometimes we may conclude that paid search isn't actually the right opportunity.",
    "That's useful to know too.",
    "Let's see what's out there.",
  ],
  cta: "Talk to us",
  ctaHref: "/#contact",
};
