/**
 * Fallback portfolio copy.
 * Live edits happen in /admin and are stored in Supabase.
 * This file is used when the database is empty or unavailable.
 * Section layout lives in components/home and components/views.
 */

export const profile = {
  name: "Arslan Sabir",
  wordmark: "ARSLAN",
  role: "UI/UX & Product Designer",
  location: "Lahore, Punjab, Pakistan",
  phone: "+92 323 6586188",
  phoneHref: "tel:+923236586188",
  email: "marslansabir3322@gmail.com",
  resume: "/Arslan-Sabir.pdf",
  portrait: "/arslan.jpg",
  portraitFallback: "/arslan.png",
  availability: "Available for work",
  eyebrow: "Available globally",
  tagline: "Designing products that people remember.",
  hours: ["Monday – Saturday", "10:00 AM – 7:00 PM PKT"],
  intro:
    "UI/UX and product designer with 3 years of experience turning ideas into clear digital products. I design SaaS, fintech, eCommerce, websites, web apps, and mobile apps — from user flows and wireframes to responsive interfaces and interactive Figma prototypes.",
  about:
    "I focus on products that are useful for people, visually consistent, and aligned with the goal of the business. My work includes shaping flows, building reusable components, and preparing files a developer can build from without guesswork.",
  socials: [
    { label: "BE", name: "Behance", href: "https://www.behance.net/marslansabir" },
    { label: "IN", name: "LinkedIn", href: "https://www.linkedin.com/in/marslansabir/" },
    { label: "DR", name: "Dribbble", href: "https://dribbble.com/marslansabir" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
];

export const footerNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/pricing" },
];

export const resourceNav = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
];

export const tools = [
  "Figma",
  "UI/UX",
  "Product Design",
  "Mobile Apps",
  "SaaS",
  "Fintech",
  "Web Design",
  "Ecommerce",
  "Adobe XD",
  "Photoshop",
  "Prototyping",
  "HTML & CSS",
];

export const stats = [
  { value: "14+", label: "Selected case studies" },
  { value: "3", label: "Years designing" },
  { value: "4", label: "Product teams" },
  { value: "6", label: "Core focus areas" },
];

export const services = [
  {
    number: "01.",
    title: "UI/UX Design",
    image: "/work/02.jpg",
    description:
      "Interfaces with a clear hierarchy, comfortable spacing, and interactions that match how people actually move through a task.",
    tags: ["User flows", "Interface design", "Usability", "Visual systems"],
  },
  {
    number: "02.",
    title: "Product Design",
    image: "/work/04.jpg",
    description:
      "Product screens shaped from requirements: structure first, then a visual system a team can extend.",
    tags: ["Product thinking", "Feature flows", "Components", "Handoff"],
  },
  {
    number: "03.",
    title: "Web & Landing Pages",
    image: "/work/03.jpg",
    description:
      "Marketing sites and landing pages that explain the offer quickly and give the next step an obvious place to live.",
    tags: ["Landing pages", "Responsive layout", "Websites", "Content structure"],
  },
  {
    number: "04.",
    title: "Mobile App Design",
    image: "/work/09.jpg",
    description:
      "Phone interfaces for fintech, delivery, tasks, and everyday tools — designed for one-hand use and short sessions.",
    tags: ["iOS & Android", "App flows", "Prototypes", "UI kits"],
  },
  {
    number: "05.",
    title: "SaaS & Dashboards",
    image: "/work/14.jpg",
    description:
      "Dense information made readable. Dashboards, settings, and multi-step tools with patterns a team can reuse.",
    tags: ["Dashboards", "Data layout", "SaaS UI", "Design patterns"],
  },
  {
    number: "06.",
    title: "Prototype & Handoff",
    image: "/work/07.jpg",
    description:
      "Clickable Figma prototypes, organized components, and notes so development can match the design.",
    tags: ["Figma prototype", "Specs", "Components", "Developer handoff"],
  },
];

export const projects = [
  {
    slug: "working-trust",
    title: "Working Trust",
    client: "Product design",
    category: "Freelance platform",
    year: "2026",
    services: "UI/UX Design · Product flows",
    image: "/work/01.jpg",
    summary: "A freelance workspace for profile, proposals, jobs, and earnings — designed so the next action stays obvious.",
  },
  {
    slug: "todo-task-app",
    title: "TODO Task App",
    client: "Case study",
    category: "Mobile app",
    year: "2026",
    services: "UI/UX Design · Mobile interface",
    image: "/work/02.jpg",
    summary: "A task app organized around capturing work quickly and seeing the day at a glance.",
  },
  {
    slug: "moko-mattress",
    title: "MoKo Mattress",
    client: "Case study",
    category: "Landing page",
    year: "2025",
    services: "Landing page · UI/UX Design",
    image: "/work/03.jpg",
    summary: "A product landing page that leads with the offer, the proof, and a clear way to buy.",
  },
  {
    slug: "nexpay",
    title: "NexPay",
    client: "Case study",
    category: "Fintech app",
    year: "2025",
    services: "Fintech UI · Mobile product design",
    image: "/work/04.jpg",
    summary: "A finance app focused on balances, transfers, and trust at the moment of payment.",
  },
  {
    slug: "frenco",
    title: "Frenco",
    client: "Frenco.ae",
    category: "Agency website",
    year: "2025",
    services: "Website UI/UX Design",
    image: "/work/05.jpg",
    summary: "An eCommerce agency site for services, proof, and a clear way to start a project.",
  },
  {
    slug: "portfolio-landing",
    title: "Portfolio Landing",
    client: "Case study",
    category: "Portfolio website",
    year: "2025",
    services: "Portfolio UI · Web design",
    image: "/work/06.jpg",
    summary: "A personal landing page that introduces the work before the biography.",
  },
  {
    slug: "saas-landing",
    title: "SaaS Landing Page",
    client: "Case study",
    category: "SaaS website",
    year: "2025",
    services: "SaaS UI · Landing page",
    image: "/work/07.jpg",
    summary: "A product homepage that explains the tool, the audience, and the first action.",
  },
  {
    slug: "fine-dining",
    title: "Fine Dining",
    client: "Case study",
    category: "Restaurant website",
    year: "2025",
    services: "Web design · UI/UX",
    image: "/work/08.jpg",
    summary: "A restaurant site paced like a menu: atmosphere first, then hours, dishes, and a reservation.",
  },
  {
    slug: "food-delivery-app",
    title: "Food Delivery App",
    client: "Case study",
    category: "Mobile app",
    year: "2024",
    services: "Mobile UI/UX Design",
    image: "/work/09.jpg",
    summary: "Browse, customize, and track an order in a flow that stays short on a phone.",
  },
  {
    slug: "supplement-hydration",
    title: "Supplement & Hydration",
    client: "Case study",
    category: "E-commerce",
    year: "2024",
    services: "E-commerce UI/UX",
    image: "/work/10.jpg",
    summary: "A storefront for supplements with product proof, variants, and a straightforward cart.",
  },
  {
    slug: "food-delivery-web",
    title: "Food Delivery Website",
    client: "Case study",
    category: "Web design",
    year: "2024",
    services: "Web design · UI/UX",
    image: "/work/11.jpg",
    summary: "A delivery website that keeps restaurants, dishes, and checkout in one readable path.",
  },
  {
    slug: "drone-website",
    title: "Drone Website",
    client: "Case study",
    category: "Web design",
    year: "2024",
    services: "Web design · UI/UX",
    image: "/work/12.jpg",
    summary: "A product site for drones, built around specs, use cases, and a strong first impression.",
  },
  {
    slug: "travel-booking",
    title: "Travel Booking",
    client: "Case study",
    category: "Web design",
    year: "2024",
    services: "Web design · UI/UX",
    image: "/work/13.jpg",
    summary: "Search, compare, and book travel with filters that stay visible while the results change.",
  },
  {
    slug: "vaultex",
    title: "Vaultex",
    client: "Case study",
    category: "Finance dashboard",
    year: "2025",
    services: "Dashboard · Fintech UI",
    image: "/work/14.jpg",
    summary: "A finance dashboard where balance, cash flow, and spending stay readable at a glance.",
  },
];

export const process = {
  titleLead: "The process",
  titleRest: "behind every project",
  steps: [
    {
      number: "01.",
      title: "Discover",
      image: "/process/01.jpg",
      text: "Goals, audience, content, and constraints — so the design starts from the product, not a moodboard.",
    },
    {
      number: "02.",
      title: "Structure",
      image: "/process/02.jpg",
      text: "Flows, wireframes, and the order of screens. This is where the product becomes understandable.",
    },
    {
      number: "03.",
      title: "Design",
      image: "/process/03.jpg",
      text: "High-fidelity UI in Figma: type, color, components, and states that feel like one product.",
    },
    {
      number: "04.",
      title: "Handoff",
      image: "/process/04.jpg",
      text: "A clickable prototype, named components, and notes for the people who will build it.",
    },
  ],
};

export const plans = [
  {
    name: "Foundation",
    blurb: "A focused design engagement for a landing page, a key flow, or a small product.",
    project: 1200,
    retainer: 960,
    features: [
      "One core user flow",
      "Up to 8 high-fidelity screens",
      "Wireframes before visual design",
      "Clickable Figma prototype",
      "Basic component styles",
      "2 rounds of revisions",
      "10 days of follow-up questions",
    ],
  },
  {
    name: "Studio",
    popular: true,
    blurb: "End-to-end product design for a startup, a feature set, or a growing app.",
    project: 2800,
    retainer: 2240,
    features: [
      "End-to-end product UI",
      "Up to 25 high-fidelity screens",
      "Flows, wireframes, and UI",
      "Starter design system",
      "Interactive prototype",
      "Developer-ready handoff",
      "Revisions during the design window",
      "30 days of handoff support",
    ],
  },
];

export const extraServices = [
  "User flows",
  "Wireframes",
  "High-fidelity UI",
  "Design systems",
  "Figma prototypes",
  "Mobile app design",
  "SaaS product UI",
  "Dashboard design",
  "Landing pages",
  "E-commerce UI",
  "Fintech interfaces",
  "Responsive websites",
  "UX audits",
  "Component libraries",
  "Developer handoff",
  "Pitch deck screens",
  "Icon & visual sets",
  "Design QA",
];

export const principles = [
  {
    quote: "A marketplace only works when posting work, comparing people, and hiring feel obvious on the first pass.",
    name: "Working Trust",
    role: "Web application · UI/UX",
    image: "/work/01.jpg",
  },
  {
    quote: "Fintech screens should make the balance, the action, and the consequence visible before anyone taps confirm.",
    name: "NexPay",
    role: "Fintech app · Product design",
    image: "/work/04.jpg",
  },
  {
    quote: "A dashboard is successful when someone can answer ‘what needs me?’ without reading every number.",
    name: "Vaultex",
    role: "SaaS · Interface design",
    image: "/work/14.jpg",
  },
  {
    quote: "Mobile flows should finish the job in a few taps. If a step needs an explanation, the step is still too heavy.",
    name: "Food Delivery App",
    role: "Mobile app · UI/UX",
    image: "/work/09.jpg",
  },
];

export const faqs = [
  {
    question: "What kinds of products do you design?",
    answer:
      "SaaS platforms, fintech and eCommerce interfaces, marketing sites, web apps, and mobile apps. Recent work includes a freelancing marketplace, a finance app, dashboards, and landing pages.",
  },
  {
    question: "What do you need to start?",
    answer:
      "A short brief is enough: who the product is for, what success looks like, and any screens or references you already have. Content can arrive while the structure is taking shape.",
  },
  {
    question: "How does a project usually run?",
    answer:
      "Discover the goal, structure the flow, design the interface in Figma, then hand off a prototype and components. You review at each step instead of waiting for a surprise at the end.",
  },
  {
    question: "Which tools do you use?",
    answer:
      "Figma is the main tool for flows, UI, components, and prototypes. I also use Adobe XD, Photoshop, and Canva, and I understand HTML and CSS well enough to collaborate with developers.",
  },
  {
    question: "Can you work with an existing product team?",
    answer:
      "Yes. At DevArion I design alongside a team for Transporta, Working Trust, and SkillVexa. I am used to feedback, shared files, and handing work to engineering.",
  },
  {
    question: "Do you work with clients outside Pakistan?",
    answer:
      "Yes. I am based in Lahore and available for remote work worldwide. Calls can be scheduled around PKT and overlapping US or EU hours.",
  },
];

export const values = [
  {
    title: "Clarity first",
    text: "Every project starts by making the task obvious. Decoration comes after the flow can stand on its own.",
    image: "/process/01.jpg",
  },
  {
    title: "Honest collaboration",
    text: "I share work early, take feedback directly, and keep files organized so a team can move without a meeting for every spacing decision.",
    image: "/process/02.jpg",
  },
  {
    title: "Care in the details",
    text: "States, type, and components matter. A product feels finished when the small screens match the hero screens.",
    image: "/process/03.jpg",
  },
  {
    title: "Steady improvement",
    text: "Three years in, the work is still about learning the product in front of me — SaaS, fintech, commerce, or a mobile tool.",
    image: "/process/04.jpg",
  },
];

export const experience = [
  {
    company: "DevArion Solution",
    role: "UI/UX & Product Designer",
    when: "Aug 2026 – Present",
    place: "On-site · Lahore",
    text: "Product design for the Transporta mobile app, Working Trust, and the SkillVexa website. I turn requirements into flows, wireframes, responsive UI, and Figma prototypes, then prepare files for developer handoff.",
  },
  {
    company: "MilestoneZero",
    role: "UI/UX Designer",
    when: "May 2026 – Jul 2026",
    place: "Remote",
    text: "Designed SaaS platforms, dashboards, and web applications. Focused on layout, user flows, components, and brand guidelines with a cross-functional team.",
  },
  {
    company: "Frenco.ae",
    role: "UI/UX Designer",
    when: "Feb 2024 – Apr 2026",
    place: "On-site",
    text: "Designed eCommerce websites, mobile applications, and responsive interfaces across industries. Worked with developers on implementation that stayed close to the Figma file.",
  },
  {
    company: "Frenco.ae",
    role: "UI/UX Design Intern",
    when: "Aug 2023 – Feb 2024",
    place: "On-site",
    text: "Supported live client work: wireframes, UI components, prototypes, and the beginnings of a design system. This is where Figma became a daily practice.",
  },
];

export const credentials = [
  { year: "2024 – Now", title: "BBIT", detail: "Business & Information Technology", org: "STEP" },
  { year: "Certificate", title: "UI/UX Design", detail: "ID JCX31196", org: "KFP, Government of Punjab" },
  { year: "Daily", title: "Figma", detail: "Flows, UI, prototypes", org: "Primary tool" },
  { year: "Also", title: "Adobe XD", detail: "Photoshop · Canva", org: "Supporting tools" },
];

export const highlights = [
  { kicker: "Now", title: "DevArion Solution", text: "Product design for Transporta, Working Trust, and SkillVexa." },
  { kicker: "Range", title: "SaaS to storefronts", text: "Fintech, dashboards, eCommerce, websites, and mobile apps." },
  { kicker: "Craft", title: "Figma, end to end", text: "Flows, components, prototypes, and a file engineering can use." },
];

export const legal = {
  privacy: {
    title: "Privacy Policy",
    updated: "November 2026",
    lede: "This policy explains how Arslan Sabir handles information shared through this portfolio and by email.",
    sections: [
      {
        heading: "Who this covers",
        text: "This site is the portfolio of Muhammad Arslan Sabir, a UI/UX and product designer in Lahore, Pakistan. Contact: marslansabir3322@gmail.com.",
      },
      {
        heading: "Information you send",
        text: "If you email me or use the contact form, I receive the details you choose to include: your name, email address, and whatever you write about the project. I use that information to reply and, if we work together, to do the work.",
      },
      {
        heading: "What this site stores",
        text: "Messages sent through the contact form are saved in the studio admin so I can read them and reply. The site does not ask you to create an account. A basic host may record technical data such as browser type and pages visited.",
      },
      {
        heading: "How long it stays",
        text: "Form messages stay in the studio admin, and email threads stay with me, for as long as the conversation or the work is relevant. You can ask me to delete a message that is no longer needed.",
      },
      {
        heading: "Sharing",
        text: "I do not sell personal information. I only share project details with a collaborator when the work requires it, such as a developer building a screen we have discussed.",
      },
      {
        heading: "Your questions",
        text: "To ask what I hold, or to request a correction or deletion, email marslansabir3322@gmail.com. I may update this page when the site or the law changes. The date above is the latest version.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    updated: "November 2026",
    lede: "These terms cover the use of this portfolio and the way design projects with Arslan Sabir are scoped.",
    sections: [
      {
        heading: "Using this website",
        text: "You may browse the work and get in touch about a project. Case studies are shown as design samples. Please do not copy the files, layouts, or writing and present them as your own.",
      },
      {
        heading: "Design services",
        text: "I design user flows, wireframes, interfaces, and Figma prototypes for digital products. The scope, timeline, and price are agreed in writing before the work starts. Starting prices on the pricing page are guides, not a fixed quote.",
      },
      {
        heading: "Your part of the work",
        text: "Projects move when feedback, content, and approvals arrive on time. A long pause on your side can move the delivery date.",
      },
      {
        heading: "Payment",
        text: "A project usually starts with a deposit, then a final payment at handoff. Work outside the agreed scope is estimated separately before I design it.",
      },
      {
        heading: "Revisions",
        text: "Each engagement includes the revision rounds named in the proposal. A new direction after approval is new work.",
      },
      {
        heading: "Files and credit",
        text: "After the final payment, you receive the agreed Figma files and the right to use the design for the product we discussed. I may show the work in this portfolio unless we agree otherwise in writing.",
      },
      {
        heading: "Ending a project",
        text: "Either of us can stop a project if we say so clearly. You pay for the work completed up to that point, and I hand over the files that payment covers.",
      },
    ],
  },
};

export const certificates = [
  {
    title: "Introduction to Figma",
    issuer: "Simplilearn SkillUp",
    date: "26 September 2026",
    code: "10789862",
    image: "https://certificates.simplicdn.net/share/10789862_10491764_1790413557055.png",
    href: "https://certificates.simplicdn.net/share/10789862_10491764_1790413557055.png",
  },
  {
    title: "UI/UX Design",
    issuer: "Kamyaab Freelancer Program",
    date: "23 August 2025",
    code: "JCX31196",
    image: "/certificates/kfp-uiux.png",
    href: "https://kfpprogram.pk/verify-certificate/JCX31196",
  },
];

export const copy = {
  navCta: "Book a call",
  heroStudio: "STUDIO",
  introStatement:
    "From the first conversation to the final handoff, every project focuses on clear flows, usable interfaces, and products that leave a lasting impression.",
  toolsLabel: "Tools I design with",
  servicesTitle: "Creative solutions built around clarity and use",
  servicesPageLead: "Creative solutions built ",
  servicesPageRest: "around clarity and use",
  servicesButton: "View all services",
  projectsTitle: "Featured projects that reflect strategy, style and detail",
  projectsPageTitle: "Selected work across product, web, and mobile",
  projectsPageText:
    "Case studies from SaaS, fintech, eCommerce, websites, and apps. Each frame is interface design: flows, layout, and a screen someone can use.",
  projectsLoadMore: "Load more",
  projectsViewAll: "View all projects",
  projectLive: "View live link",
  projectOverviewTitle: "Project overview",
  projectChallengeTitle: "The challenge",
  projectSolutionTitle: "Our solution",
  projectImpactTitle: "Project impact",
  projectMoreTitle: "More projects",
  metaClient: "Client",
  metaCategory: "Category",
  metaYear: "Year",
  metaServices: "Services",
  processTitleLead: "The process",
  processTitleRest: "behind every project",
  pricingTitle: "Flexible plans for every product",
  pricingIntro:
    "Foundation covers a focused flow. Studio covers a fuller product. Retainers keep a designer with the team after launch.",
  pricingExtraTitle: "Beyond the two plans",
  pricingNote: "Starting points in USD. Final price follows the scope we agree on.",
  pricingPer: "Per project",
  pricingRetainer: "Retainer",
  pricingSave: "(Save 20%)",
  pricingIncluded: "What's included",
  pricingPopular: "Popular",
  pricingStart: "Start your project",
  pricingMonth: "/ month",
  pricingProject: "/ project",
  faqTitle: "Frequently asked questions",
  contactTitle: "Ready to bring your next idea to life?",
  contactPageTitle: "Let's build your next digital product",
  contactPageText:
    "Tell me what you are making. I reply with questions, a likely shape for the work, and whether the timing fits.",
  contactEmailLabel: "Email",
  contactPhoneLabel: "Phone",
  contactLocationLabel: "Location",
  contactHoursLabel: "Business hours",
  contactStart: "Start a conversation",
  formName: "Name*",
  formEmail: "Email*",
  formMessage: "Message",
  formNamePlaceholder: "Your name",
  formEmailPlaceholder: "you@company.com",
  formMessagePlaceholder: "Tell me about the product",
  formMessagePagePlaceholder: "Enter your message here",
  formSend: "Send message",
  formSentTitle: "Message received.",
  formSentBody: "It is saved in the studio admin. Arslan will reply to the email you entered.",
  formMailSubject: "Project inquiry from",
  aboutLead: "Designing products,",
  aboutRest: "interfaces & digital experiences",
  aboutName: "Muhammad Arslan Sabir",
  aboutImage: "/work/05.jpg",
  aboutImageAlt: "Selected interface work",
  aboutKicker: "About",
  aboutResume: "Download resume",
  aboutTogether: "Let's work together",
  experienceTitle: "Experience",
  studyTitle: "Study & tools",
  studyNote: "KFP certificate",
  studyNoteCode: "JCX31196",
  studyNoteHref: "https://kfpprogram.pk/verify-certificate/JCX31196",
  valuesLead: "How the work ",
  valuesRest: "stays clear",
  principlesTitle: "Work shaped for products that need to feel clear",
  principlesNote: "14 selected studies",
  certificatesLead: "Certificates",
  certificatesRest: "& credentials",
  newsletterTitle: "Join the\nnewsletter",
  footerPages: "Pages",
  footerResources: "Resources",
  footerFollow: "Follow",
  footerEmail: "Email",
  footerRights: "All rights reserved.",
  footerPlaceholder: "you@company.com",
  footerNote: "Opens an email to Arslan. No list is stored on this site.",
  footerNoteDone: "Your email app should open with the note ready.",
  footerSend: "Send email",
  footerMailSubject: "Portfolio newsletter",
  footerMailBody: "Please keep me posted.",
  legalUpdated: "Last updated",
  skipToContent: "Skip to content",
  notFoundKicker: "404",
  notFoundTitle: "This page is not in the file",
  notFoundButton: "Back home",
  certificates,
};
