export const PROFILE = {
  name: "Piyush Yadav",
  tagline: "Backend Developer · Automation Engineer",
  github: "https://github.com/pyd-07",
  githubUser: "pyd-07",
  linkedin: "https://www.linkedin.com/in/am-piyush-wby/",
  email: "yaduvanshi.piyush.9a@gmail.com",
  resume: "/resume.docx",
};

export const SELECTED_REPOS = ["Uptor", "api-test-suite"];

// Per-repo enrichment: bullets (problem → solution) and tech tags.
export const REPO_DETAILS: Record<
  string,
  { bullets: string[]; tags: string[] }
> = {
  Uptor: {
    bullets: [
      "Uptime monitoring with configurable check intervals and retry logic",
      "Alert workflows over webhooks — no noisy false positives",
      "Lightweight footprint, single-binary deploy",
    ],
    tags: ["Next.js","typescript","Axios","Node.js","Express","MongoDB"],
  },
  "api-test-suite": {
    bullets: [
      "CLI testing engine with concurrency, retries, and structured reporting",
      "Declarative YAML test definitions — readable in PRs",
      "JSON report generation with summary, metrics, and per-test results"
    ],
    tags: ["typescript","Node.js","TurboRepo","Zod"],
  },
};

export const TYPING_PHRASES = [
  "I build backend systems.",
  "I work with APIs and automation.",
  "I create tools for real use.",
];

export const SKILLS: Record<string, { name: string; context: string }[]> = {
  Languages: [
    { name: "Python", context: "Automation, scraping, and scripting" },
    { name: "TypeScript", context: "APIs, CLI tools, and backend logic" },
    { name: "JavaScript", context: "Frontend and general scripting" },
  ],
  Backend: [
    { name: "Node.js", context: "APIs, webhooks, and backend services" },
    { name: "REST APIs", context: "Designing and testing endpoints" },
    { name: "MongoDB", context: "Storing and querying application data" },
    { name: "PostgreSQL", context: "Relational data and structured queries" },
  ],
  Automation: [
    { name: "Selenium", context: "Browser automation and testing" },
    { name: "BeautifulSoup", context: "Parsing and extracting web data" },
    { name: "GitHub Actions", context: "CI/CD and scheduled workflows" },
  ],
  Tools: [
    { name: "Git", context: "Version control and collaboration" },
    { name: "Linux", context: "Daily development environment" },
    { name: "Postman", context: "API testing and debugging" },
    { name: "Docker", context: "Containerized development and deployment" },
  ],
};

// Proof of work — concrete systems shipped.
export const PROOF = [
  {
    title: "API testing CLI",
    detail:
      "Built a CLI tool to run YAML-defined API tests with parallel execution, retries, and structured reporting.",
    keywords: ["typeScript", "concurrency", "CLI"],
  },
  {
    title: "Uptime monitoring system",
    detail:
      "Designed end-to-end monitoring with alert workflows over webhooks and quiet hours.",
    keywords: ["alerting", "webhooks", "reliability"],
  },
  {
    title: "Job scraping pipelines",
    detail:
      "Scraped job listings across sites and exported structured data to CSV with handling for popups and bot detection.",
    keywords: ["Selenium", "BeautifulSoup", "automation"],
  },
  {
    title: "Broken link checker",
    detail:
      "Built a script to detect broken links and images, handling redirects and logging results with timestamps.",
    keywords: ["Selenium", "requests", "debugging"],
  },
  {
    title: "E-commerce automation",
    detail:
      "Automated end-to-end purchase flow with login, cart, and checkout, including logs and screenshots.",
    keywords: ["Selenium", "testing", "automation"],
  },
];
