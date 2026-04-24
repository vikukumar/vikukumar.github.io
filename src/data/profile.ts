export const PROFILE = {
  name: "Vikash Kumar",
  headline:
    "Senior Full Stack & AI Platform Developer (Infosys) — API gateways (Kong/Akana/Apigee), Kubernetes/DevSecOps, and LLM-enabled automation.",
  summary:
    "I design and build secure, scalable backend and platform systems across telecom and financial domains — from microservices and API governance to Kubernetes operations and automation. Recently, I’m focused on GenAI integration (RAG, prompt engineering, fine-tuning workflows) and developer-platform engineering.",
  location: "Noida, India",
  email: "vikashkumar0037@gmail.com",
  phone: "+91-7371017986",
  githubUsername: "vikukumar",
  avatarUrl: "https://github.com/vikukumar.png?size=240",
  now: "Building platform + GenAI systems • Open to backend/platform/AI engineering roles",
  links: {
    github: "https://github.com/vikukumar",
    linkedin: "https://linkedin.com/in/vikash-edude",
    portfolio: "https://linktr.ee/vikash.edude",
    resume: "/resume.pdf"
  },
  highlights: [
    { label: "Experience", value: "5 years (Infosys)" },
    { label: "Focus", value: "Python + Nextjs + API platforms + Kubernetes" },
    { label: "GenAI", value: "RAG • Agents • Fine-tuning" }
  ],
  keywords: [
    "Full-Stack Development",
    "Frontend Development",
    "Backend Engineering",
    "Platform Engineering",
    "API Platforms",
    "Microservices",
    "API Gateways",
    "Kubernetes",
    "DevSecOps",
    "GenAI Systems"
  ],
  skills: [
    {
      title: "Languages & Frameworks",
      items: [
        "Python (FastAPI/Flask)",
        "Node.js",
        "Next.js/React",
        "Angular",
        "TypeScript",
        "Go",
        "C#/.NET",
        "PHP",
        "Lua",
        "Rust (exploring)"
      ]
    },
    {
      title: "Platform / Cloud / DevSecOps",
      items: [
        "Kubernetes",
        "Docker",
        "Helm",
        "ArgoCD",
        "CI/CD (GitHub, Azure Pipelines)",
        "Secure SDLC",
        "Observability & Governance",
        "Azure",
        "AWS (exposure)",
        "GCP (exposure)"
      ]
    },
    {
      title: "API & Data",
      items: [
        "Kong Gateway / Mesh",
        "Akana API Platform",
        "Apigee",
        "Azure API Management",
        "Microservices Architecture",
        "REST APIs",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "SQL Server"
      ]
    },
    {
      title: "GenAI / ML",
      items: ["Generative AI integration", "RAG", "Prompt Engineering", "LLM Fine-Tuning", "PyTorch", "NumPy"]
    }
  ],
  experience: [
    {
      company: "Infosys Limited",
      role: "Technology Analyst",
      period: "Oct 2024 – Present",
      highlights: [
        "Architected AI-first API platforms integrating Generative AI and LLM workflows into enterprise systems.",
        "Designed high-performance microservices using Python (FastAPI) and Next.js across mortgage & telecom platforms.",
        "Engineered API gateway ecosystems (Kong, Akana, Apigee) with automated governance and traffic control.",
        "Implemented Kubernetes-based CI/CD pipelines improving deployment scalability and reliability.",
        "Built LLM fine-tuning workflows using MongoDB datasets to automate API development processes."
      ]
    },
    {
      company: "Infosys Limited",
      role: "Senior Systems Engineer",
      period: "Oct 2023 – Sep 2024",
      highlights: [
        "Designed secure APIs on Akana platform and automated gateway lifecycle management.",
        "Integrated DevSecOps controls into CI/CD pipelines improving security posture.",
        "Delivered full-stack data platform (Angular + Python + MongoDB) with encryption and observability.",
        "Helped deploy and manage Kong platform on Kubernetes using ArgoCD/Azure Pipelines."
      ]
    },
    {
      company: "Infosys Limited",
      role: "Systems Engineer",
      period: "Sep 2021 – Sep 2023",
      highlights: [
        "Developed backend services using Python and C# for telecom applications.",
        "Managed APIs via Akana and Azure API Management with automation workflows.",
        "Contributed to enterprise data platform development and security enhancements."
      ]
    },
    {
      company: "NASSCOM Foundation (Centum Learning)",
      role: "Java Developer Trainee",
      period: "Jun 2020 – Nov 2020",
      highlights: [
        "Completed full-stack Java training (Java, Spring Boot, JDBC, MySQL, HTML/CSS/JS).",
        "Built end-to-end web applications during apprenticeship program."
      ]
    }
  ],
  projects: {
    pinned: [
      {
        title: "Pushpaka — Self-Hosted Cloud Deployment Platform",
        stack: "Go • Next.js • Docker • Traefik • Postgres/Redis",
        description:
          "A production-grade self-hosted PaaS: deploy apps directly from Git repos with automated container builds, custom domains, and real-time logs.",
        points: [
          "Git-to-deploy pipeline with container builds and framework detection.",
          "Distributed worker engine + secure tunneling for remote deployments.",
          "Traefik routing with TLS and domain management."
        ],
        links: {
          repo: "https://github.com/vikukumar/pushpaka",
          demo: "https://pushpaka.vikshro.in/"
        },
        tags: ["Platform", "DevOps", "Go", "Next.js"]
      },
      {
        title: "Vichara AI — Distributed Task Orchestration",
        stack: "Go • Redis Streams • Cron • Dashboard",
        description:
          "Distributed task orchestration for background jobs and AI workloads with intelligent retries, scheduling, and real-time monitoring.",
        points: [
          "Single-binary architecture; run all roles or split services.",
          "Durable queues via Redis Streams + consumer groups.",
          "Cron scheduling + priority routing for workload control."
        ],
        links: {
          repo: "https://github.com/vikukumar/vichara-ai",
          demo: "https://vichara.vikshro.in"
        },
        tags: ["Distributed Systems", "Go", "Queues", "Scheduling"]
      },
      {
        title: "BullG — High-Performance API & AI Gateway",
        stack: "Rust • Plugins (Rust/Python/JS) • HTTP/WS",
        description:
          "A high-throughput gateway inspired by Kong/Tyk, designed for low tail-latency with an extensible plugin system.",
        points: [
          "Multi-protocol gateway (HTTP/HTTPS/WS/WSS) with extensible phases.",
          "Plugin authoring in Rust, Python, and JavaScript.",
          "Built for performance, safety, and future gRPC/TCP extensibility."
        ],
        links: {
          repo: "https://github.com/vikshrogit/BullGateway",
          demo: "https://bullg.vikshro.in"
        },
        tags: ["Rust", "API Gateway", "Performance", "Plugins"]
      },
      {
        title: "Cloudflare Tunnel UI (cf-tunnel-manager)",
        stack: "Go • React • Cloudflare Zero Trust",
        description:
          "Self-hosted UI to manage Cloudflare Tunnels, hostnames, DNS records, and private routes secured by Cloudflare Access.",
        points: [
          "Tunnel lifecycle management with copy-ready run tokens.",
          "Hostname routing + optional automatic DNS CNAME creation.",
          "Manage private network routes (CIDR) and DNS records across zones."
        ],
        links: {
          repo: "https://github.com/vikukumar/cf-tunnel-manager",
          demo: "https://vikukumar.github.io/cf-tunnel-manager/"
        },
        tags: ["Cloudflare", "Networking", "Go", "React"]
      },
      {
        title: "SMIGAI — Social Media Content + Image Agent",
        stack: "Python • Agentic AI • OpenRouter • HF/Stability",
        description:
          "Agent that generates social media posts and AI images for a brand by analyzing its website/domain using pluggable AI providers.",
        points: [
          "Post + idea generation via OpenRouter models.",
          "Image generation via Hugging Face Inference or Stability AI.",
          "Simple web UI for quick testing and iteration."
        ],
        links: {
          repo: "https://github.com/vikukumar/SMIGAI",
          demo: "https://smigai.vikshro.in/"
        },
        tags: ["GenAI", "Agents", "Python", "Content"]
      },
      {
        title: "NeuroSwift — MatMul-Free Hybrid State-Space Model",
        stack: "Python • Deep Learning • SSM/Hybrid Models",
        description:
          "Research-driven hybrid state-space model architecture focused on fast CPU inference and efficient training.",
        points: [
          "CPU-optimized training/inference focus with performance-oriented engineering.",
          "Explores dynamic depth scaling and hybrid SSM components.",
          "Designed for strong intelligence with low-latency inference."
        ],
        links: {
          repo: "https://github.com/vikukumar/neuroswift",
          demo: null
        },
        tags: ["Research", "ML", "Python"]
      }
    ],
    selected: [
      {
        title: "AI-Driven API Automation Platform (Enterprise)",
        stack: "LLM workflows • MongoDB datasets • API lifecycle governance",
        description:
          "LLM-assisted automation to streamline API lifecycle management, reduce manual engineering overhead, and accelerate platform onboarding.",
        points: [
          "Automated governance workflows and developer enablement.",
          "Focused on secure, repeatable platform operations and delivery velocity."
        ],
        links: { repo: null, demo: null },
        tags: ["Platform", "LLM", "Automation"]
      },
      {
        title: "Enterprise Data Platform (Datapark)",
        stack: "Angular • Python (Flask/FastAPI) • MongoDB • Nginx",
        description:
          "Secure full-stack system with custom encryption modules, observability, and scalable backend APIs for enterprise workflows.",
        points: [
          "Built encryption/decryption modules for sensitive data workflows.",
          "Improved engineering efficiency via automation and self-service tooling."
        ],
        links: { repo: null, demo: null },
        tags: ["Security", "Full Stack", "MongoDB"]
      },
      {
        title: "Cloud-Native API Gateway Deployment",
        stack: "Kubernetes • Kong Gateway/Mesh • Helm • ArgoCD • CI/CD",
        description:
          "Production-ready gateway and service-mesh deployments on Kubernetes with automated CI/CD and traffic governance policies.",
        points: ["Hardened ingress and policy orchestration.", "Automated deployments with GitOps practices and guardrails."],
        links: { repo: null, demo: null },
        tags: ["Kubernetes", "Kong", "DevSecOps"]
      },
      {
        title: "EDUDE Virtual Classroom Platform",
        stack: "PWA • PHP • MySQL • JS • Apache/Nginx",
        description:
          "Final-year project: a virtual classroom prototype with automated class timing, activity tracking, and permission workflows.",
        points: ["Designed a secure, structured online learning experience.", "Built as a prototype during COVID-19."],
        links: { repo: null, demo: "https://edude.vikshro.in" },
        tags: ["PWA", "EdTech"]
      }
    ]
  },
  certifications: [
    "Kong API Gateway Operations",
    "Kong Developer / Operations (Infosys)",
    "Kubernetes",
    "Microsoft Azure Fundamentals",
    "SnapLogic for Developers",
    "GitHub Copilot Fundamentals",
    "Developing AI First Web Applications",
    "Responsible AI — Foundation",
    "Geoprocessing Using Python (IIRS-ISRO)"
  ],
  awards: [
    "Insta Award (Infosys) for building secure automation platform work",
    "Insta Award for Application Security",
    "Coding contest winner (Techzooka 2021)",
    "Coding competition winner (DPS Bokaro)"
  ],
  education: {
    degree: "B.Tech — Computer Science & Engineering",
    institute: "Dr. A.P.J. Abdul Kalam Technical University",
    years: "2017 – 2021"
  },
  starSeed: 1337
} as const;
