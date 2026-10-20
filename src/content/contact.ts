export const contactPage = {
  headline: "Let's talk.",
  intro: [
    "If you have a product or service and suspect you're not reaching all the customers you should be, we'd be glad to hear from you.",
    "Tell us a little about your business, what you're trying to achieve and what has brought you here.",
    "You don't need to arrive with a marketing brief or know which services you need. We can explore that together.",
  ],
  nextSteps: {
    title: "What happens next?",
    body: [
      "We'll arrange a conversation to understand your business, your customers, what you're doing now and where there may be opportunities worth investigating.",
      "If we think we can help, we'll explain how we'd approach the work.",
      "If we don't think we're the right people, we'll say so.",
      "We don't begin with a generic package or try to sell you services you don't need.",
    ],
  },
  form: {
    title: "Get in touch",
    fields: {
      name: { label: "Name", required: true },
      company: { label: "Company", required: true },
      email: { label: "Email", required: true },
      website: { label: "Website (optional)", required: false },
      message: {
        label: "What would you like to tell us about your business?",
        required: true,
      },
    },
    submit: "Send your message",
    preferDirect: "Or, if you'd prefer to speak directly:",
    emailLabel: "Email",
    calendarLabel: "Calendar",
    calendarLinkText: "Book a conversation",
  },
  closing: {
    title: "Let's see what's out there.",
    tagline: "We find the business you're missing.",
  },
};
