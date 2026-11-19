export const emails = {
  info: "info@arsystems.dev",
  support: "support@arsystems.dev",
  billing: "billing@arsystems.dev",
} as const;

export type Product = {
  slug: string;
  name: string;
  category: string;
  icon: string;
  summary: string;
  detailSummary: string;
  input: string;
  output: string;
  workflow: string;
  helps: string[];
  cta: string;
  enquireDirectly?: boolean;
  href?: string;
  hrefLabel?: string;
  comingSoon?: boolean;
  subsections?: Subsection[];
};

export type Subsection = {
  name: string;
  icon: string;
  summary: string;
  helps: string[];
};

export const productAliases: Record<string, string> = {
  "ai-customer-support": "sophia",
  "ai-sales-agent": "sophia",
  "ai-appointment-management": "sophia",
};

export const products: Product[] = [
  {
    slug: "sophia",
    name: "Sophia",
    category: "HUMAN-CENTERED AUTOMATION",
    icon: "message-square",
    summary:
      "Replies to your customers on WhatsApp in your own words, answers their questions, and books appointments into your calendar.",
    detailSummary:
      "Replies to your customers on WhatsApp in your own words, answers their questions, and books appointments into your calendar.",
    input: "Customer message",
    output: "Reply or booking",
    workflow: "Customer message → Answer in your words → Booked appointment",
    helps: [
      "Answer customer questions in your own words and tone",
      "Book appointments into the times you are open",
      "Keep your calendar in sync while you stay in control",
    ],
    cta: "Meet Sophia",
    href: "https://sophia.arsystems.dev",
    hrefLabel: "Visit Sophia",
    subsections: [
      {
        name: "Sales",
        icon: "users",
        summary:
          "Answers the questions that come before a booking, like prices, timing, and what to expect, and guides interested customers to book.",
        helps: [
          "Answer questions about your services, prices, and policies",
          "Guide interested customers to a booking",
          "Notify you about every new booking",
        ],
      },
      {
        name: "Appointment management",
        icon: "calendar",
        summary: "Offers your open times, books appointments, and keeps your calendar in order.",
        helps: [
          "Offer only the times you are open",
          "Book appointments into your calendar",
          "See your day, week, or month, and add appointments yourself",
        ],
      },
    ],
  },
  {
    slug: "ai-email-agent",
    name: "AI Email Agent",
    category: "INBOX OPERATIONS",
    icon: "mail",
    summary: "Organize incoming messages, draft replies, and move the next action forward.",
    detailSummary: "Organize incoming messages, draft replies, and move the next action forward.",
    input: "Incoming email",
    output: "Action-ready reply",
    workflow: "Incoming email → Understand intent → Action-ready reply",
    helps: [
      "Sort messages by intent and priority",
      "Draft context-aware responses",
      "Route next actions to the right team",
    ],
    cta: "Explore solution",
    comingSoon: true,
  },
  {
    slug: "custom-ai-workflow-automation",
    name: "Custom AI Workflow Automation",
    category: "AUTOMATION PLATFORM",
    icon: "search",
    summary:
      "Automate repetitive processes from start to finish. Let AI handle the work across your systems.",
    detailSummary:
      "Automate repetitive processes from start to finish. Let AI handle the work across your systems.",
    input: "Workflow trigger",
    output: "Automated action",
    workflow: "Workflow trigger → Automated action",
    helps: [],
    cta: "Tell us your workflow",
    enquireDirectly: true,
  },
];

export const footerSolutions: { label: string; to: string; external?: boolean }[] = [
  { label: "Sophia", to: "https://sophia.arsystems.dev", external: true },
  { label: "AI Email Agent (coming soon)", to: "/products#ai-email-agent" },
  { label: "AI Workflow Automation", to: "/products#custom-ai-workflow-automation" },
];

export type Service = {
  id: string;
  name: string;
  icon: string;
  summary: string;
  cta: string;
  briefPlaceholder: string;
};

export const services: Service[] = [
  {
    id: "mvp",
    name: "MVP & Rapid Prototyping",
    icon: "rocket",
    summary:
      "Validate a new product direction quickly with a focused, practical proof of concept.",
    cta: "Enquire about MVP",
    briefPlaceholder: "What would you like to validate or build?",
  },
  {
    id: "agents",
    name: "Automation & AI Agents",
    icon: "bot",
    summary:
      "Build systems that understand, decide, and take action across customer, sales, and operational workflows, with your people in control.",
    cta: "Enquire about Automation",
    briefPlaceholder: "What would you like to validate or build?",
  },
  {
    id: "websites",
    name: "Websites & Systems",
    icon: "globe",
    summary:
      "Build internal tools, public websites, and connected systems that support your business operations and customer experience.",
    cta: "Enquire about Websites & Systems",
    briefPlaceholder: "What would you like to validate or build?",
  },
];

export const analysisSteps = [
  {
    icon: "building",
    title: "Business",
    text: "Your people, tools & workflows",
    tone: "light" as const,
  },
  {
    icon: "search",
    title: "Analysis",
    text: "Map the repetitive work",
    tone: "light" as const,
  },
  {
    icon: "focus",
    title: "Opportunity",
    text: "Find the highest-value starting point",
    tone: "light" as const,
  },
  {
    icon: "workflow",
    title: "Automation",
    text: "Build a system that does the work",
    tone: "light" as const,
  },
  {
    icon: "chart-bar",
    title: "Time & Cost Savings",
    text: "Turn less work into business value",
    tone: "blue" as const,
  },
];

export const founders = [
  {
    name: "Aviya Alfasi",
    role: "Co-Founder & Software Engineer",
    bio: "Software engineer with 5+ years of experience designing and building complex, end-to-end production systems at General Motors (GM) and startups. Combines strong engineering expertise with business analysis and product thinking to understand business operations. Translates business challenges into practical, reliable software solutions, taking projects from problem discovery and system architecture through development and production.",
  },
  {
    name: "Robert Gordon",
    role: "Co-Founder & Software Engineer",
    bio: "Software engineer with 6+ years of combined experience in software development, including 3 years at General Motors (GM) on the self-driving team and 3+ years as a freelance developer. Combines strong engineering expertise with a product-focused approach to building MVPs for startups and developing websites and applications for businesses. Experienced in taking projects from initial concepts through design, development, and delivery.",
  },
];

export function openMail(to: string, subject: string, body: string) {
  const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export const sampleDays = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
export const sampleTimes = ["10:00", "10:30", "11:00"];

export function formatSampleDate(day: number) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2026, 9, day)));
}

export function formatSampleTime(time: string) {
  const [hour, minute] = time.split(":");
  return `${hour}:${minute} AM`;
}
