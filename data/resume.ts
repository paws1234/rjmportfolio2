export const resume = {
  name: "Reyvand Jasper Medrano",
  handle: "Pawsmedz",
  title: "Software Engineer | Full Stack Developer",
  location: "Consolacion, Central Visayas, Philippines",
  email: "Pawsmedz@gmail.com",
  phone: "09912106474",
  portfolio: "medrano.free.nf/Medrano",
  badges: ["Full-Stack", "Software Engineer"],
about: [
  "Skilled software engineer with extensive experience delivering high-quality, production-ready web applications in remote and collaborative team environments.",
  "Experienced across frontend and backend development, with a strong emphasis on designing scalable, maintainable, and performance-oriented systems using modern frameworks, clean architecture, and well-defined API contracts.",
  "Proven ability to own features and services end-to-end—translating business requirements into technical designs, implementing robust solutions, applying testing and quality standards, and supporting deployments in live production environments.",
  "Actively focused on system reliability, code quality, and long-term maintainability, with hands-on experience in refactoring legacy modules, improving performance bottlenecks, and reducing technical debt through thoughtful architectural decisions.",
  "Passionate about building user-centric solutions that align technical excellence with real business outcomes, while also prioritizing developer experience through clear documentation, consistent patterns, and collaborative engineering practices."
],
 tech: {
  frontend: [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue.js",
    "Next.js",
    "Nuxt",
    "jQuery",
    "Tailwind CSS",
    "Bootstrap",
  ],

  backend: [
    "PHP",
    "Laravel",
    "Node.js",
    "Express",
    "REST",
    "GraphQL",
    "Python",
    "FastAPI",
    "django",
  ],

  database: [
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
  ],

  devops: [
    "Docker",
    "Kubernetes",
    "NGINX",
    "GitHub Actions",
    "GitLab CI/CD",
    "AWS CLI",
    "Environment-based Deployments"
  ],

  cloud: [
    "AWS (EC2, S3, RDS, Lambda)",
    "DigitalOcean",
    "Firebase",
    "Render",
    "Vercel"
  ],

  testing: [
    "PHPUnit",
    "Jest",
    "Laravel Pint",
    "Mocking / Stubbing",
    "E2E Testing",
    "TDD",
    "Code Coverage"
  ],

  other: [
    "MVC",
    "Microservices",
    "Domain-Driven Design (DDD)",
    "SOLID",
    "Event-Driven Architecture",
    "Git (GitHub, GitLab, Bitbucket)",
    "Pull Requests",
    "Merge Strategies",
    "Code Reviews",
    "Agile (Scrum / Kanban)",
    "Lighthouse Auditing",
    "Webpack / Vite"
  ]
},
 experience: [
    {
      role: "Software Engineer",
      company: "Creatives Online",
      period: "Aug 2024 – Jan 2025 (Remote)",
          highlights: [
        "Delivered end-to-end web applications based on client requirements.",
        "Translated business needs into practical technical solutions.",
        "Performed testing/debugging and provided ongoing maintenance & support."
      ]
    
    },
    {
      role: "Software Engineer",
      company: "ICOPY legal",
      period: "May 2025 – Present (Remote)",
      highlights: [
        "Built and maintained web apps using Laravel and React.js.",
        "Refactored backend modules for maintainability and performance.", 
        "Developed and consumed RESTful APIs with clean contracts and best practices.",
        "Collaborated with cross-functional teams; troubleshot and resolved production issues."
      ]
    }
  ], 
  education: [
    {
      degree: "BS Information Technology",
      school: "Cebu Technological University",
      period: "Sep 2021 – 2024"
    },
    {
      degree: "Senior High School Diploma",
      school: "Saint Louis College Cebu",
      period: "2015 – 2021"
    }
  ],
  // projects: [
  //   {
  //     name: "ICopy (Legal-tech Platform)",
  //     desc: "Laravel-based platform integrating third-party systems and webhooks with UX-aligned admin tooling.",
  //     tags: ["Laravel", "MySQL", "REST", "Docker"]
  //   },
  //   {
  //     name: "Docu OCR Engine",
  //     desc: "Document processing service with structured extraction, tests, and containerized runtime.",
  //     tags: ["Python", "FastAPI", "Docker"]
  //   },
  //   {
  //     name: "Financial Planning App",
  //     desc: "React Native + Laravel API + MongoDB app for budgeting, tracking, and planning.",
  //     tags: ["React Native", "Laravel", "MongoDB"]
  //   }
  // ],
  community: {
    speaking: "Available for speaking at events about software development and emerging technologies."
  },
  links: [
    { label: "Portfolio", href: "https://medrano.free.nf/Medrano" }
  ]
} as const;
