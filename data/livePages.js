/** The words currently on the live pages. Admin edits replace these in place. */
export const liveDefaults = {
  home: {
    heroLines: [
      { text: "Designing Digital" },
      { text: "Products That Connect," },
      { text: "Scale, and Create" },
      { text: "Meaningful Experiences." },
    ],
    pageTitle: "Arslan Sabir | UI/UX Designer & Framer",
    metaDescription: "Arslan Sabir - UI/UX Designer focused on product design, mobile apps, and modern digital experiences.",
    wordmark: "arslan",
    wordmarkMark: "®",
    ticker: ["FRAMER DEVELOPMENT", "uiux", "Web Design", "APP DESIGN"],
    numbersTitle: "My work speaks through numbers. Here’s what I’ve achieved so far.",
    numbers: [
      { value: "20", suffix: "+", title: "Projects Done", text: "Helping startups and businesses transform ideas into intuitive digital experiences." },
      { value: "5", suffix: "+", title: "Years of Experience", text: "Designing products, interfaces, and systems with a focus on usability and clarity." },
      { value: "98", suffix: "%", title: "Client satisfaction rate", text: "Delivering thoughtful design solutions through collaboration and attention to detail." },
      { value: "1000", suffix: "+", title: "Screens Designed", text: "From websites, mobile apps to SaaS platforms, crafted with consistency and purpose." },
    ],
    goalsKicker: "Design that’s built to last and grow with your business",
    goalsFrom: "From ordinary",
    goalsTo: "to extraordinary",
    goalsTitle: "Your goals, my priority",
    goalsText: "From concept to launch, I'm committed to your success with rapid response times and personalized attention to detail.",
    goals: [
      {
        from: "24/7 priority care",
        title: "24/7 priority care",
        title2: "",
        text: "Receive priority treatment for urgent tasks, with an average response time of 24 hours for high-priority clients.",
        parts: ["Receive priority treatment for urgent tasks, with an", "average response time of 24 hours", "for high-priority clients."],
      },
      {
        from: "Tailored tweaks for perfection",
        title: "Tailored tweaks for perfection",
        title2: "",
        text: "Request custom revisions at any time. I provide up to 5 minor revisions post-launch to keep things looking fresh.",
        parts: ["Request custom revisions at any time. I provide", "up to 5 minor revisions", "post-launch to keep things looking fresh."],
      },
      {
        from: "Brand kit at your fingertips",
        title: "Brand kit at your fingertips",
        title2: "",
        text: "Receive a full branding toolkit, from logos to color schemes and typography, download all assets or share them with your team.",
        parts: ["Receive a full branding toolkit, from logos to color schemes and typography,", "download all assets", "or share them with your team."],
      },
      {
        from: "Real-Time",
        title: "Real-Time",
        title2: "Support",
        text: "UX research complete, ready for your review!",
      },
    ],
    goalNotes: [
      "Post-Launch requests",
      "Align text margins properly",
      "Increase mobile menu font size",
      "Replace images",
      "Fix button color: #F9452D",
      "Speed up page loading",
      "Valid for 3 months after launch",
      "Download brand kit",
      "10:45",
      "Jonnah",
      "Today 09:17",
    ].map((line) => ({ from: line, text: line })),
    workLabel: "Selected work",
    workTitle: "Proven results,",
    workTitleRest: "stunning designs",
    bio: "I'm Arslan Sabir, a UI/UX Designer and Framer Designer based in Lahore. I design intuitive websites and digital products with a focus on user experience, modern interfaces, and scalable design systems.",
    statement: "From concept to launch, I craft digital solutions that not only look exceptional but also drive results, building connections that last.",
    designerHeading: "UI UX DESIGNER HELPING STARTUPS AND PRODUCT TEAMS DESIGN CLEAR, USABLE, AND SCALABLE DIGITAL INTERFACES.",
    designerHeadingParts: ["UI", "UX", "DESIGNER", "HELPING", "STARTUPS", "AND", "PRODUCT", "TEAMS", "DESIGN", "CLEAR,", "USABLE,", "AND", "SCALABLE", "DIGITAL", "INTERFACES."],
    statementRole: "UI/UX Designer | App & Website Interface Design",
    statementRoleLong: "UI/UX Designer | App & Website Interface Design | Design Systems | Product Designer",
    resumeButton: "Download Resume",
    storyStats: [
      { from: "+32%", value: "+32%", label: "Customer retention" },
      { from: "+59%", value: "+59%", label: "Conversion rate" },
      { from: "+19%", value: "+19%", label: "Customer retention" },
      { from: "+46%", value: "+46%", label: "Conversion rate" },
    ],
    servicesLabel: "Services",
    servicesIntro: "I create impactful brand identities that differentiate your business and connect with your audience.",
    services: [
      { number: "01", title: "Branding" },
      { number: "02", title: "Framer Design" },
      { number: "03", title: "Websites" },
      { number: "04", title: "Design support" },
    ],
    servicesButton: "See pricing",
    pricingTitle: "BIG OR SMALL? I HAVE A PLAN.",
    pricingTitleParts: ["BIG OR SMALL?", "I HAVE A PLAN."],
    pricingText: "Choose the plan that best fits your needs. From a solid foundation to a fully optimized solution",
    pricingTextParts: ["Choose the plan that best fits your needs.", "From a solid foundation to a fully optimized solution"],
    pricingButton: "Choose this plan",
    pricingIncluded: "What's Included:",
    plans: [
      {
        name: "Project based",
        price: "$499",
        unit: "/project",
        blurb: "Best for startups, founders, and teams with a clearly defined scope.",
        features: ["End to end ui ux design", "Websites, apps, or dashboards", "Figma first and framer ready files", "Structured components and clean handoff"],
      },
      {
        name: "Hourly Plan",
        price: "$20",
        unit: "/hour",
        badge: "Recommended",
        blurb: "Ideal for ongoing support, iterations, or flexible design needs.",
        features: ["UI/UX design and improvements", "Design system updates", "Rapid iterations and fixes", "Pay only for time used"],
      },
      {
        name: "Retainer Plan",
        price: "Custom",
        unit: "/month",
        blurb: "Best for teams that need consistent design support.",
        features: ["Ongoing ui ux design support", "Priority tasks and iterations", "Design system maintenance", "Predictable monthly workload"],
      },
    ],
    processTitle: "My process",
    processText: "My four-step process keeps you informed and involved at every stage, ensuring the final result meets your goals and resonates with your audience.",
    processButton: "Schedule a consultation",
    steps: [
      { number: "01", title: "Discovery & Strategy", text: "Choose the plan that best fits your needs. From a solid foundation to a fully optimized solution" },
      { number: "02", title: "Design & Prototyping", text: "Our designers bring your vision to life with wireframes and prototypes, focusing on an engaging user experience." },
      { number: "03", title: "Development & Integration", text: "Choose the plan that best fits your needs. From a solid foundation to a fully optimized solution." },
      { number: "04", title: "Launch & Support", text: "After testing and final approvals, we launch the site and provide ongoing support." },
    ],
    storiesTitle: "Success stories",
    storiesTitleParts: ["Success", "stories"],
    storiesText: "My work speaks for itself, but my clients say it even better.",
    stories: [
      { quote: "Arslan helped us revamp our UI from scratch, giving us a website that perfectly reflects our values.", name: "Ananya Rao", role: "Founder of a SaaS Startup" },
      { quote: "We needed a better product experience, and Arslan delivered beyond expectations. From UX to the final UI, every screen feels intuitive, polished, and easy to use.", name: "Anna Karenina", role: "Founder of an AI Startup" },
      { quote: "Working with Arslan was a pleasure! Our sales increased by 30% in the first month. Thank you for the amazing job!", name: "Andy Styles", role: "Product Manager, Fintech" },
    ],
    faqTitle: "FAQ",
    faqText: "We’ve heard it all. Here’s everything you need to know before working with us.",
    faqButton: "Ask a question",
    faqs: [
      { question: "What do I need to get started?", answer: "You only need a clear idea of your product, website, or problem you want to solve. I handle research, structure, and design direction so you do not need everything figured out upfront." },
      { question: "What kind of projects do you usually work on?", answer: "I work on websites, landing pages, dashboards, and product interfaces. Most projects involve ui ux design, design systems, and scalable layouts built in figma and framer." },
      { question: "How involved will i be during the design process?", answer: "You are involved at key decision points. I share progress regularly, explain design choices clearly, and collect feedback early so the final outcome aligns with your goals." },
      { question: "What tools do you use for ui design?", answer: "I primarily use figma for ui ux design, design systems, and structured layouts. For advanced projects, I use framer to present the UI with interactions and motion." },
      { question: "What will i receive after the project is completed?", answer: "You will receive clean figma files with structured components, auto layouts, and design systems if applicable. For small projects, you may also receive a framer link showcasing the UI." },
    ],
    contactTitle: "Let’s bring your vision to life",
    contactText: "Looking for a UI/UX Designer for your next app, website, SaaS platform, or digital product? I'm here to help transform ideas into intuitive user experiences that drive engagement and business growth.",
    contactName: "Arslan Sabir",
    contactRole: "UI/UX Designer & Product Designer",
    contactButton: "Get in touch",
    contactLabel: "Contact me",
  },
  about: {
    nameFirst: "Arslan",
    nameSecond: "Sabir",
    opening: "From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design.",
    openingParts: ["From", "idea", "to", "launch.", "Clean,", "scalable", "digital", "products", "built", "to", "move", "fast,", "stay", "simple,", "and", "perform", "in", "real-world", "use,", "driven", "by", "clarity,", "structured", "systems,", "and", "intentional", "design."],
    kicker: "SPECIALIZED in BRAND, UX/UI DESIGN, AND MOTION.",
    roleLine: "UI/UX DESIGNER & PRODUCT DESIGNER",
    toolsTitle: "Stack & Tools",
    toolsText: "Strategic design services crafted to create clarity, consistency, and growth.",
    philosophyTitle: "My Design Philosophy",
    philosophyLead: "Great digital products aren't just beautiful. They're intuitive, scalable, and built around real user needs.",
    philosophy: "Every project begins with understanding the people who will use it. I combine user experience research, interface design, product thinking, and modern design systems to create digital products that solve real problems. Whether it's a SaaS platform, mobile application, or marketing website, my goal is to design experiences that feel simple, purposeful, and memorable.",
    jobs: [
      { number: "01", company: "The Hindu", role: "Graphic Designer" },
      { number: "02", company: "Optimeye", role: "Graphic Designer" },
      { number: "03", company: "Freelancer", role: "UI/UX Designer" },
      { number: "04", company: "Kraftbase", role: "UI/UX Designer" },
      { number: "05", company: "Coinfantasy", role: "Senior UI/UX Designer" },
      { number: "06", company: "Kraftbase", role: "UI/UX Designer" },
    ],
  },
  projects: {
    title: "Projects",
    text: "Every project I deliver is a reflection of our commitment to quality, designed to inspire and drive success.",
    filterAll: "All",
    filterDashboard: "Dashboard",
    filterApp: "App",
    filterWebsite: "Website",
  },
  contact: {
    title: "Let's talk",
    kicker: "Whether it’s a new project or a quick question, I'm here to connect.",
    intro: "I’d love to hear from you. Whether you’re starting a new project, need help refining an idea, or just want to say hello, we’re here to help.",
    formNote: "Fill out the form below or reach out via email. I’ll get back to you as soon as possible. Let’s create something great together.",
    locationLabel: "Address",
    location: "Lahore, Punjab, Pakistan",
    hoursLabel: "Availability",
    hours: "Monday – Saturday 9:00 AM – 9:00 PM (IST)",
    nameLabel: "Name *",
    emailLabel: "E-mail *",
    messageLabel: "Tell me about your app, website, SaaS platform, or product idea.",
    phoneLabel: "Phone",
    pageMessage: "Message (Tell me about your project)",
    formHeading: "Get in Touch",
    button: "Get in touch",
  },
  menu: {
    links: [
      { from: "Home", label: "Home", href: "/" },
      { from: "About", label: "About", href: "/about" },
      { from: "Projects", label: "Projects", href: "/projects" },
      { from: "Contact", label: "Contact", href: "/contact" },
    ],
    menuLabel: "MENU",
    talk: "Let’s talk",
    allCases: "All cases",
  },
  site: {
    footerTitle: "Stay connected",
    footerNewsletter: "Join our newsletter and stay updated on the latest trends in digital design",
    footerBlurb: "Designing thoughtful digital experiences where usability, clarity, and product strategy come together.",
    footerRights: "© 2026 Arslan Sabir. All rights reserved.",
    loaderLine: "All rights reserved ©",
    loaderName: "Arslan Sabir™",
    emailPlaceholder: "E-mail",
    socials: [
      { from: "X", label: "X", href: "https://www.linkedin.com/in/marslansabir/" },
      { from: "LinkedIn", label: "LinkedIn", href: "https://www.linkedin.com/in/marslansabir/" },
      { from: "Behance", label: "Behance", href: "https://www.behance.net/marslansabir" },
      { from: "Instagram", label: "Instagram", href: "https://www.behance.net/marslansabir" },
      { from: "Dribbble", label: "Dribbble", href: "https://dribbble.com/marslansabir" },
    ],
  },
};

function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

export function mergeLive(saved) {
  if (!isObject(saved)) return liveDefaults;
  const out = {};
  Object.keys(liveDefaults).forEach((key) => {
    if (Array.isArray(liveDefaults[key])) {
      out[key] = Array.isArray(saved[key]) ? saved[key] : liveDefaults[key];
      return;
    }
    const base = liveDefaults[key];
    const next = isObject(saved[key]) ? saved[key] : {};
    const merged = { ...base, ...next };
    Object.keys(base).forEach((field) => {
      if (Array.isArray(base[field]) && !Array.isArray(next[field])) merged[field] = base[field];
    });
    out[key] = merged;
  });
  return out;
}
