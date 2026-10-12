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
};

export const products: Product[] = [
  {
    slug: "ai-customer-support",
    name: "AI Customer Support",
    category: "CUSTOMER EXPERIENCE",
    icon: "message-square",
    summary:
      "Answer routine questions using your knowledge base. Route the exceptions to your team.",
    detailSummary:
      "Answer routine questions using your knowledge base. Route exceptions to your team.",
    input: "Customer question",
    output: "Relevant answer",
    workflow: "Customer question → Knowledge match → Answer or handoff",
    helps: [
      "Ground responses in your business knowledge",
      "Prepare relevant answers to recurring questions",
      "Hand off exceptions with context attached",
    ],
    cta: "Explore solution",
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
  },
  {
    slug: "ai-sales-agent",
    name: "AI Sales Agent",
    category: "SALES OPERATIONS",
    icon: "users",
    summary: "Qualify leads, capture context, and keep follow-ups moving without the busywork.",
    detailSummary: "Qualify leads, capture context, and keep follow-ups moving without the busywork.",
    input: "New inquiry",
    output: "Qualified lead",
    workflow: "New enquiry → Qualification → Sales-ready context",
    helps: [
      "Qualify enquiries against business criteria",
      "Capture useful context for your sales team",
      "Prepare follow-ups and handoffs",
    ],
    cta: "Explore solution",
  },
  {
    slug: "ai-appointment-management",
    name: "AI Appointment Management",
    category: "APPOINTMENT OPERATIONS",
    icon: "calendar",
    summary: "Schedule appointments, send reminders, and handle changes automatically.",
    detailSummary: "Schedule appointments, send reminders, and handle changes automatically.",
    input: "Booking request",
    output: "Confirmed slot",
    workflow: "Booking request → Availability check → Confirmed appointment",
    helps: [
      "Coordinate booking requests",
      "Prepare appointment reminders",
      "Handle rescheduling and changes",
    ],
    cta: "Explore solution",
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

export const footerSolutions = [
  { label: "AI Customer Support", to: "/products#ai-customer-support" },
  { label: "AI Email Agent", to: "/products#ai-email-agent" },
  { label: "AI Sales Agent", to: "/products#ai-sales-agent" },
  { label: "AI Appointment Management", to: "/products#ai-appointment-management" },
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
      "Validate a new product direction quickly with a focused, practical AI-powered proof of concept.",
    cta: "Enquire about MVP",
    briefPlaceholder: "What would you like to validate or build?",
  },
  {
    id: "agents",
    name: "AI Agents & Automation",
    icon: "bot",
    summary:
      "Build systems that understand, decide, and take action across customer, sales, and operational workflows.",
    cta: "Enquire about AI Agents",
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
    title: "AI Opportunity",
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
