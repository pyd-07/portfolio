export const PROFILE = {
  name: "Piyush Yadav",
  tagline: "Software Engineer · Go · Kubernetes · Open Source",
  github: "https://github.com/pyd-07",
  githubUser: "pyd-07",
  linkedin: "https://www.linkedin.com/in/am-piyush-wby/",
  email: "piyush.24448@knit.ac.in",
  resume: "/resume.docx",
};

export const SELECTED_REPOS = [
  "Kyverno",
  "Uptor",
  "api-test-suite",
];

// Map repo name → GitHub owner (for repos not under your own account)
export const REPO_OWNERS: Record<string, string> = {
  Kyverno: "kyverno",
};

// Per-repo enrichment: bullets (problem → solution) and tech tags.
export const REPO_DETAILS: Record<
  string,
  { bullets: string[]; tags: string[] }
> = {
  Kyverno: {
    bullets: [
      "Contributed to the Kubernetes policy engine across CEL evaluation, policy autogen, webhooks, background scanning, and engine paths",
      "Fixed production issues involving CEL validation, webhook reconciliation, PolicyReport behavior, and generated policy rules",
      "Built a proof of concept for CEL evaluation tracing using EvalState, AST correlation, and real ValidatingPolicy execution",
    ],
    tags: [
      "Go",
      "Kubernetes",
      "CEL",
      "Kyverno",
      "Open Source",
    ],
  },

  Uptor: {
    bullets: [
      "Built an uptime monitoring system with configurable checks, retries, and webhook-based alerting",
      "Designed alert handling to reduce noisy notifications and false positives",
      "Kept the service lightweight with a simple deployable architecture",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Axios",
    ],
  },

  "api-test-suite": {
    bullets: [
      "Built a CLI testing engine for YAML-defined API test suites with concurrency and retries",
      "Added structured JSON reporting with summaries, metrics, and per-test results",
      "Designed declarative test definitions that are easy to review and maintain in Git",
    ],
    tags: [
      "TypeScript",
      "Node.js",
      "CLI",
      "Zod",
      "Turborepo",
    ],
  },
};

export const TYPING_PHRASES = [
  "I build backend and systems software.",
  "I work with Go, Kubernetes, and open source.",
  "I debug real systems and ship fixes.",
  "I build tools that solve practical problems.",
];

export const SKILLS: Record<string, { name: string; context: string }[]> = {
  Languages: [
    { name: "Go", context: "Backend systems, open source along with DSA and problem solving" },
    { name: "Python", context: "Automation, scripting, and web tooling" },
    { name: "TypeScript", context: "Backend services, APIs, and CLI tools" },
    { name: "JavaScript", context: "Web development and scripting" },
  ],

  Backend: [
    { name: "Go", context: "Production code and systems-oriented backend work" },
    { name: "Node.js", context: "APIs, services, and backend tooling" },
    { name: "REST APIs", context: "Designing, integrating, and debugging APIs" },
    { name: "MongoDB", context: "Application data and querying" },
    { name: "PostgreSQL", context: "Relational data and structured queries" },
  ],

  "Kubernetes & Open Source": [
    {
      name: "Kubernetes",
      context: "Policy engines, controllers, and cloud-native systems",
    },
    {
      name: "Kyverno",
      context: "Policy evaluation, CEL, engine internals, and contributions",
    },
    {
      name: "CEL",
      context: "Policy evaluation and expression tracing",
    },
    {
      name: "GitHub",
      context: "Open-source collaboration, reviews, and pull requests",
    },
  ],

  Tools: [
    { name: "Git", context: "Version control and open-source collaboration" },
    { name: "Linux", context: "Daily development and systems work" },
    { name: "Docker", context: "Containerized development and deployment" },
    { name: "Postman", context: "API testing and debugging" },
  ],
};

// Proof of work
export const PROOF = [
  {
    title: "Kyverno open-source contributions",
    detail:
      "Contributed multiple merged fixes across the Kyverno engine, CEL evaluation, webhooks, background scanning, and autogen paths.",
    keywords: ["Go", "Kubernetes", "Kyverno", "Open Source"],
  },
  {
    title: "API testing CLI",
    detail:
      "Built a CLI tool for YAML-defined API tests with parallel execution, retries, and structured reporting.",
    keywords: ["TypeScript", "CLI", "Concurrency"],
  },
  {
    title: "Uptime monitoring system",
    detail:
      "Built end-to-end monitoring with configurable checks, retries, webhook alerts, and noise reduction.",
    keywords: ["Node.js", "Webhooks", "Reliability"],
  },
  {
    title: "Automation tooling",
    detail:
      "Built practical automation tools for web scraping, broken-link detection, browser workflows, and structured data extraction.",
    keywords: ["Python", "Selenium", "BeautifulSoup", "Automation"],
  },
];

export const INTERNSHIPS = [
  {
    role: "Software Development Intern",
    company: "E-Nest",
    duration: "May 2026 - August 2026",
    location: "Remote",
    bullets: [
      "Developed and integrated full-stack features across Next.js, React, Node.js, Express, and MongoDB for E-Nest's Industry Connect platform.",
      "Built and integrated Industry Connect candidate profiles, Browse Talent workflows, student-company interactions, and profile data aggregation across User, Student, and IndustryConnectProfile models.",
      "Implemented backend APIs and data-merging logic for candidate discovery, profile retrieval, search, filtering, pagination, and student-company workflows.",
      "Integrated frontend applications with backend REST APIs, authentication proxies, and server-side cookie-based JWT forwarding.",
      "Worked on payment and purchase workflows, including Razorpay integration analysis, coupon-aware cart processing, purchase receipts, and transactional email flows using SendGrid.",
      "Debugged and resolved production issues across Next.js, MongoDB, API integrations, DNS, authentication, and deployment environments while collaborating through Git and GitHub."
    ]
  }
];